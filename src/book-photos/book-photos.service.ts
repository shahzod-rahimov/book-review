import { Injectable } from '@nestjs/common';
import { CreateBookPhotoDto } from './dto/create-book-photo.dto';
import { UpdateBookPhotoDto } from './dto/update-book-photo.dto';

@Injectable()
export class BookPhotosService {
  create(createBookPhotoDto: CreateBookPhotoDto) {
    return 'This action adds a new bookPhoto';
  }

  findAll() {
    return `This action returns all bookPhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookPhoto`;
  }

  update(id: number, updateBookPhotoDto: UpdateBookPhotoDto) {
    return `This action updates a #${id} bookPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookPhoto`;
  }
}
