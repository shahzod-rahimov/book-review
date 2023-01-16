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
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
  })
  book_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

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
