import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'socials' })
export class Social extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'telegram.jpg',
    description: 'Social icon file name',
  })
  @Column({
    type: DataType.STRING,
  })
  social_icon_file_name: string;

  @ApiProperty({ example: 'Telegram', description: 'Telegram' })
  @Column({
    type: DataType.STRING,
  })
  social_name: string;

  @ApiProperty({
    example: 'https://t.me',
    description: 'Telegram account link',
  })
  @Column({
    type: DataType.STRING,
  })
  social_link: string;
}
