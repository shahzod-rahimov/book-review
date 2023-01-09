import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Faq } from './entities/faq.entity';

@Injectable()
export class FaqService {
  constructor(@InjectModel(Faq) private faqModel: typeof Faq) {}
  create(createFaqDto: CreateFaqDto) {
    return this.faqModel.create({ ...createFaqDto });
  }

  findAll() {
    return this.faqModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const faq = await this.faqModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!faq) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return faq;
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    const faq = await this.faqModel.update(
      { ...updateFaqDto },
      { where: { id } },
    );

    if (!faq[0]) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Updated';
  }

  async remove(id: number) {
    const faq = await this.faqModel.destroy({ where: { id } });

    if (!faq) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Deleted';
  }
}
