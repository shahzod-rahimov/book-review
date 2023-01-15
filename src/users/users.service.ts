import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { FilesService } from '../files/files.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly fileService: FilesService,
  ) {}

  async register(createUserDto: CreateUserDto, image: any, res: Response) {
    const img = await this.fileService.createFile(image);

    const user_phone = await this.userModel.findOne({
      where: {
        phone_number: createUserDto.phone_number,
      },
    });

    const username = await this.userModel.findOne({
      where: { username: createUserDto.username },
    });

    if (user_phone)
      throw new BadRequestException('Bunday telefon raqam mavjud');

    if (username) {
      throw new BadRequestException('Bunday username mavjud');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.hashed_password, 7);
    createUserDto.hashed_password = hashedPassword;

    const newUser = await this.userModel.create({
      ...createUserDto,
      photo_file_name: img,
    });

    return this.getCookies(newUser, res);
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { phone_number, password } = loginUserDto;
    const user = await this.userModel.findOne({ where: { phone_number } });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.hashed_password,
    );

    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    return this.getCookies(user, res);
  }

  async logout(adminId: number) {
    await this.userModel.update(
      { hashed_refresh_token: null },
      { where: { id: adminId } },
    );

    return 'You successfully logout';
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    const user = await this.userModel.findOne({
      where: { id: userId },
    });

    if (!user || !user.hashed_refresh_token) {
      throw new ForbiddenException('Access Denied');
    }

    const rtMatches = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    return this.getCookies(user, res);
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.update(
      { ...updateUserDto },
      { where: { id } },
    );

    if (!user[0]) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Updated';
  }

  async remove(id: number) {
    const user = await this.userModel.findOne({ where: { id } });
    // const user = await this.userModel.destroy({ where: { id } });

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.fileService.deleteFile(user.dataValues.photo_file_name);
    user.destroy();
    return 'Deleted';
  }

  private async getTokens(id: number, phone_number: string) {
    const jwtPayload = {
      id,
      phone_number,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.userModel.update(
      { hashed_refresh_token: hashedRefreshToken },
      { where: { id: userId } },
    );
  }

  private async getCookies(user: User, res: Response) {
    const tokens = await this.getTokens(user.id, user.phone_number);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }
}
