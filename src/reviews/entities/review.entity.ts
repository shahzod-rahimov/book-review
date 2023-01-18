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

@Table({ tableName: 'reviews' })
export class Review extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'qwerty', description: 'Review title' })
  @Column({
    type: DataType.STRING,
    validate: {
      min: 7,
    },
  })
  title: string;

  @ApiProperty({
    example: 'qwertyuiop asdfghjkl zxcvbnm',
    description: 'Review text',
  })
  @Column({
    type: DataType.STRING,
  })
  text: string;

  @ApiProperty({ example: 'true', description: 'Is review checked' })
  @Column({
    type: DataType.STRING,
  })
  is_checked: string;

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

  @BelongsTo(() => Book)
  book: Book;

  @BelongsTo(() => User)
  user: User;
}
