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

@Table({ tableName: 'book-photos' })
export class BookPhoto extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'book.jpg', description: 'Book photo file name' })
  @Column({
    type: DataType.STRING,
  })
  photo_file_name: string;

  @ApiProperty({ example: 'qwertyuiop', description: 'Info about book photo' })
  @Column({
    type: DataType.STRING,
  })
  photo_alt_string: string;

  @ApiProperty({ example: '2', description: 'Book ID' })
  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
  })
  book_id: number;

  @BelongsTo(() => Book)
  book: Book;
}
