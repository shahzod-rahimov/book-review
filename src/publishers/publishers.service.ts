import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublishersService {
  constructor(
    @InjectModel(Publisher) private publisherModel: typeof Publisher,
  ) {}

  create(createPublisherDto: CreatePublisherDto) {
    return;
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
    const publisher = await this.publisherModel.destroy({ where: { id } });

    if (!publisher) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Deleted';
  }
}
