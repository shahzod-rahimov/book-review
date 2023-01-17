import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdminDto } from './dto';
import { UpdateAdminDto } from './dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { LoginAdminDto } from './dto';
import { JwtPayload } from './types';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  async register(createAdminDto: CreateAdminDto, res: Response) {
    const condidate = await this.adminModel.findOne({
      where: {
        phone_number: createAdminDto.phone_number,
      },
    });

    if (condidate) {
      throw new BadRequestException('Bunday telefon raqam mavjud');
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.hashed_password, 7);
    createAdminDto.hashed_password = hashedPassword;

    const newUser = await this.adminModel.create({ ...createAdminDto });

    return this.getCookies(newUser, res);
  }

  async login(loginDto: LoginAdminDto, res: Response) {
    const { phone_number, password } = loginDto;
    const user = await this.adminModel.findOne({ where: { phone_number } });

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
    await this.adminModel.update(
      { hashed_refresh_token: null },
      { where: { id: adminId } },
    );

    return 'You successfully logout';
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    const user = await this.adminModel.findOne({
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
    return this.adminModel.findAll();
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findOne({
      where: { id },
    });
    if (!admin) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.update(
      { ...updateAdminDto },
      { where: { id } },
    );

    if (!admin[0]) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Updated';
  }

  async remove(id: number) {
    const admin = await this.adminModel.destroy({ where: { id } });

    if (!admin) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

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
    await this.adminModel.update(
      { hashed_refresh_token: hashedRefreshToken },
      { where: { id: userId } },
    );
  }

  private async getCookies(admin: Admin, res: Response) {
    const tokens = await this.getTokens(
      admin.id,
      admin.phone_number,
      admin.role,
    );
    await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }
}
