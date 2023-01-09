import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

  @Column({
    type: DataType.INTEGER,
  })
  book_id: number;
}
