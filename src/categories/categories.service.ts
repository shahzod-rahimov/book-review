import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create({ ...createCategoryDto });
  }

  findAll() {
    return this.categoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!category) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.update(
      { ...updateCategoryDto },
      { where: { id } },
    );

    if (!category[0]) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Updated';
  }

  async remove(id: number) {
    const category = await this.categoryModel.destroy({ where: { id } });

    if (!category) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Deleted';
  }
}
