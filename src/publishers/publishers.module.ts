import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Publisher } from './entities/publisher.entity';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Publisher]),
    JwtModule.register({}),
    FilesModule,
  ],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublishersModule {}
