import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({ tableName: 'books' })
export class Book extends Model {
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
  })
  author: string;

  @Column({
    type: DataType.STRING,
  })
  info: string;

  @Column({
    type: DataType.SMALLINT,
  })
  pages_number: number;

  @Column({
    type: DataType.FLOAT,
  })
  price: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_exists: boolean;
}
