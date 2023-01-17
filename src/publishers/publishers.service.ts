import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from './entities/publisher.entity';
import * as bcrypt from 'bcryptjs';
import { LoginPublisherDto } from './dto/login-publisher.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { FilesService } from '../files/files.service';
import { JwtPayload } from './types';

@Injectable()
export class PublishersService {
  constructor(
    @InjectModel(Publisher) private publisherModel: typeof Publisher,
    private readonly jwtService: JwtService,
    private readonly fileService: FilesService,
  ) {}

  async register(
    createPublisherDto: CreatePublisherDto,
    image: any,
    res: Response,
  ) {
    const img = await this.fileService.createFile(image);

    const condidate = await this.publisherModel.findOne({
      where: {
        phone_number: createPublisherDto.phone_number,
      },
    });

    if (condidate) {
      throw new BadRequestException('Bunday telefon raqam mavjud');
    }

    const hashedPassword = await bcrypt.hash(
      createPublisherDto.hashed_password,
      7,
    );
    createPublisherDto.hashed_password = hashedPassword;

    const newUser = await this.publisherModel.create({
      ...createPublisherDto,
      photo_file: img,
    });

    return this.getCookies(newUser, res);
  }

  async login(loginPublisherDto: LoginPublisherDto, res: Response) {
    const { phone_number, password } = loginPublisherDto;
    const user = await this.publisherModel.findOne({ where: { phone_number } });

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
    await this.publisherModel.update(
      { hashed_refresh_token: null },
      { where: { id: adminId } },
    );

    return 'You successfully logout';
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    const user = await this.publisherModel.findOne({
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
    return this.publisherModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const publisher = await this.publisherModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!publisher) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return publisher;
  }

  async update(id: number, updatePublisherDto: UpdatePublisherDto) {
    const publisher = await this.publisherModel.update(
      { ...updatePublisherDto },
      { where: { id } },
    );

    if (!publisher[0]) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Updated';
  }

  async remove(id: number) {
    const publisher = await this.publisherModel.findOne({ where: { id } });

    if (!publisher) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.fileService.deleteFile(publisher.dataValues.photo_file);
    publisher.destroy();
    return 'Deleted';
  }

  private async getTokens(id: number, phone_number: string, role: string) {
    const jwtPayload: JwtPayload = {
      id,
      phone_number,
      role,
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
    await this.publisherModel.update(
      { hashed_refresh_token: hashedRefreshToken },
      { where: { id: userId } },
    );
  }

  private async getCookies(publisher: Publisher, res: Response) {
    const tokens = await this.getTokens(
      publisher.id,
      publisher.phone_number,
      publisher.role,
    );
    await this.updateRefreshTokenHash(publisher.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }
}
