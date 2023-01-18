import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'faq' })
export class Faq extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'poiuytrewq?', description: 'Question' })
  @Column({ type: DataType.STRING })
  question: string;

  @ApiProperty({ example: 'qwertyuiop!', description: 'Answer' })
  @Column({ type: DataType.STRING })
  answer: string;
}
