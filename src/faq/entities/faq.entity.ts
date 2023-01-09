import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'faq' })
export class Faq extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  question: string;

  @Column({ type: DataType.STRING })
  answer: string;
}
