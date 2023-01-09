import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review) private reviewModel: typeof Review) {}
  create(createReviewDto: CreateReviewDto) {
    return this.reviewModel.create({ ...createReviewDto });
  }

  findAll() {
    return this.reviewModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const review = await this.reviewModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!review) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewModel.update(
      { ...updateReviewDto },
      { where: { id } },
    );

    if (!review[0]) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Updated';
  }

  async remove(id: number) {
    const review = await this.reviewModel.destroy({ where: { id } });

    if (!review) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Deleted';
  }
}
