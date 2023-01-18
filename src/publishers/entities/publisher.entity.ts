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
import { Social } from '../../socials/entities/social.entity';

@Table({ tableName: 'publishers' })
export class Publisher extends Model {
  @ApiProperty({ example: '1!', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Azon Kitoblar', description: 'Publisher name' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: '991234567', description: 'Publisher phone number' })
  @Column({
    type: DataType.STRING,
    validate: {
      len: [9, 12],
    },
  })
  phone_number: string;

  @ApiProperty({ example: 'azon@gmail.com', description: 'Publisher email' })
  @Column({
    type: DataType.STRING,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @ApiProperty({ example: '1234567', description: 'Publisher password' })
  @Column({
    type: DataType.STRING,
    validate: {
      min: 5,
    },
  })
  hashed_password: string;

  @ApiProperty({ example: 'location', description: 'Publisher location' })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ApiProperty({ example: '1', description: 'Socials id' })
  @ForeignKey(() => Social)
  @Column({
    type: DataType.SMALLINT,
  })
  socials_id: number;

  @ApiProperty({ example: 'publisher.jpg', description: 'Publisher photo' })
  @Column({
    type: DataType.STRING,
  })
  photo_file: string;

  @ApiProperty({ example: '2', description: 'Book id' })
  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
  })
  book_id: number;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @BelongsTo(() => Social)
  social: Social;

  @BelongsTo(() => Book)
  book: Book;

  @Column({ type: DataType.STRING, defaultValue: 'PUBLISHER' })
  role: string;
}
