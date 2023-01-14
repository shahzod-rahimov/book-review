import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({}),
    FilesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
