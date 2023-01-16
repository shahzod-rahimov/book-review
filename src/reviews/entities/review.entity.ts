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

@Table({ tableName: 'reviews' })
export class Review extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    validate: {
      min: 7,
    },
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  text: string;

  @Column({
    type: DataType.STRING,
  })
  is_checked: string;

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

  @BelongsTo(() => Book)
  book: Book;

  @BelongsTo(() => User)
  user: User;
}
