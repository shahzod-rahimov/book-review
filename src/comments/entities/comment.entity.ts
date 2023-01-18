import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from '../../books/entities/book.entity';
import { User } from '../../users/entities/user.entity';

@Table({ tableName: 'comments' })
export class Comment extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'some comment', description: 'Comment text' })
  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @ApiProperty({ example: '1', description: 'Book id' })
  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
  })
  book_id: number;

  @ApiProperty({ example: '2', description: 'User id' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @ApiProperty({ example: '3', description: 'Comment id' })
  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
  })
  reply_comment_id: number;

  @BelongsTo(() => Book)
  book: Book;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Comment)
  reply_comment: Comment;
}
