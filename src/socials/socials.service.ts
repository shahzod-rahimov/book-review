import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { Social } from './entities/social.entity';

@Injectable()
export class SocialsService {
  constructor(
    @InjectModel(Social) private socialModel: typeof Social,
    private readonly fileService: FilesService,
  ) {}

  async create(createSocialDto: CreateSocialDto, image: any) {
    const img = await this.fileService.createFile(image);

    return this.socialModel.create({
      ...createSocialDto,
      social_icon_file_name: img,
    });
  }

  findAll() {
    return this.socialModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const subscription = await this.socialModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!subscription) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return subscription;
  }

  async update(id: number, updateSocialDto: UpdateSocialDto) {
    const subscription = await this.socialModel.update(
      { ...updateSocialDto },
      { where: { id } },
    );

    if (!subscription[0]) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Updated';
  }

  async remove(id: number) {
    const subscription = await this.socialModel.destroy({
      where: { id },
    });

    if (!subscription) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Deleted';
  }
}
