import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

  @Column({
    type: DataType.SMALLINT,
  })
  socials_id: number;

  @Column({
    type: DataType.SMALLINT,
  })
  photo_file: number;

  @Column({
    type: DataType.INTEGER,
  })
  book_id: number;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
}
