import { Column, DataType, Model, Table } from 'sequelize-typescript';

const date = new Date();
date.setDate(date.getDate() + 30);

@Table({ tableName: 'subscriptions', timestamps: false })
export class Subscription extends Model {
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
  table_name: string;

  @Column({
    type: DataType.INTEGER,
  })
  subscriber_id: number;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  start_sub_date: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: date,
  })
  end_sub_date: Date;
}
