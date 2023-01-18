import { ApiProperty } from '@nestjs/swagger';
import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({ tableName: 'books' })
export class Book extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Molxona', description: 'Book name' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: 'Jorj Oruell', description: 'Book author name' })
  @Column({
    type: DataType.STRING,
  })
  author: string;

  @ApiProperty({
    example: 'qwertyuiop asdfghjkl zxcvbnm',
    description: 'Info about book',
  })
  @Column({
    type: DataType.STRING,
  })
  info: string;

  @ApiProperty({ example: '100', description: 'Book pages_number' })
  @Column({
    type: DataType.SMALLINT,
  })
  pages_number: number;

  @ApiProperty({ example: '15.000', description: 'Book price' })
  @Column({
    type: DataType.FLOAT,
  })
  price: number;

  @ApiProperty({ example: 'true', description: 'Is book exists' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_exists: boolean;
}
