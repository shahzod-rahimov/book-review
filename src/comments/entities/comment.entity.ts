import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'comments' })
export class Comment extends Model {
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
  comment: string;

  @Column({
    type: DataType.INTEGER,
  })
  book_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  reply_comment_id: number;
}
