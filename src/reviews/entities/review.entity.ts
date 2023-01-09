import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'reviews' })
export class Review extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    validate: {
      min: 7
    }
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  text: string;

  @Column({
    type: DataType.STRING,
  })
  is_checked: string;

  @Column({
    type: DataType.INTEGER,
  })
  book_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;
}
