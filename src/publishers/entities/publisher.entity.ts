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

  @Column({
    type: DataType.STRING,
    validate: {
      len: [9, 12],
    },
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    validate: {
      min: 5,
    },
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ForeignKey(() => Social)
  @Column({
    type: DataType.SMALLINT,
  })
  socials_id: number;

  @Column({
    type: DataType.STRING,
  })
  photo_file: string;

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
