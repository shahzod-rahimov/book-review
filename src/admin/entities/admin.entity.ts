import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'admin' })
export class Admin extends Model {
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
  first_name: string;

  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    validate: {
      len: [9, 12],
    },
  })
  phone_number: string;

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
  hashed_refresh_token: string;
}
