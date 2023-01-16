import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from '../../books/entities/book.entity';

@Table({ tableName: 'categories' })
export class Category extends Model {
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
  name: string;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
  })
  book_id: number;

  @BelongsTo(() => Book)
  book: Book;
}
