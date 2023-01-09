import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentModel: typeof Comment) {}
  create(createCommentDto: CreateCommentDto) {
    return this.commentModel.create({ ...createCommentDto });
  }

  findAll() {
    return this.commentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const comment = await this.commentModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!comment) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentModel.update(
      { ...updateCommentDto },
      { where: { id } },
    );

    if (!comment[0]) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Updated';
  }

  async remove(id: number) {
    const comment = await this.commentModel.destroy({ where: { id } });

    if (!comment) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return 'Deleted';
  }
}
