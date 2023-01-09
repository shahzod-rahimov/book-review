import { Module } from '@nestjs/common';
import { BookPhotosService } from './book-photos.service';
import { BookPhotosController } from './book-photos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookPhoto } from './entities/book-photo.entity';

@Module({
  imports: [SequelizeModule.forFeature([BookPhoto])],
  controllers: [BookPhotosController],
  providers: [BookPhotosService]
})
export class BookPhotosModule {}
