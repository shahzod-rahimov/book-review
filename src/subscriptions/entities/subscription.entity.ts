import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

const date = new Date();
date.setDate(date.getDate() + 30);

@Table({ tableName: 'subscriptions', timestamps: false })
export class Subscription extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'User/Publisher',
    description: 'Subscriber table name',
  })
  @Column({
    type: DataType.STRING,
  })
  table_name: string;

  @ApiProperty({ example: '1', description: 'Subscriber id' })
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
