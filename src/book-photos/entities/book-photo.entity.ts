import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from '../../books/entities/book.entity';

@Table({ tableName: 'book-photos' })
export class BookPhoto extends Model {
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
  photo_file_name: string;

  @Column({
    type: DataType.STRING,
  })
  photo_alt_string: string;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
  })
  book_id: number;

  @BelongsTo(() => Book)
  book: Book;
}
