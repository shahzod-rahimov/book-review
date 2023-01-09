import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book) private bookModel: typeof Book) {}

  create(createBookDto: CreateBookDto) {
    return this.bookModel.create({ ...createBookDto });
  }

  findAll() {
    return this.bookModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const book = await this.bookModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookModel.update(
      { ...updateBookDto },
      { where: { id } },
    );

    if (!book[0]) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Updated';
  }

  async remove(id: number) {
    const book = await this.bookModel.destroy({ where: { id } });

    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Deleted';
  }
}
