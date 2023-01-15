import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
  RefreshTokenCookieStrategy,
} from './strategies';

@Module({
  imports: [SequelizeModule.forFeature([Admin]), JwtModule.register({})],
  controllers: [AdminController],
  providers: [
    AdminService,
    AccessTokenStrategy,
    RefreshTokenCookieStrategy,
    // RefreshTokenStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],
})
export class AdminModule {}
