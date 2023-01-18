import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Social } from '../../socials/entities/social.entity';

@Table({ tableName: 'users' })
export class User extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user', description: "Users's first name" })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({ example: 'userov', description: "Users's last name" })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({ example: 'userbek', description: "Users's username" })
  @Column({
    type: DataType.STRING,
  })
  username: string;

  @ApiProperty({ example: '12/01/2000', description: "Users's birthday" })
  @Column({
    type: DataType.DATEONLY,
  })
  birthday: Date;

  @ApiProperty({ example: '991234567', description: "Users's phone number" })
  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @ApiProperty({ example: 'user@gmail.com', description: "Users's email" })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({ example: '1234567', description: "Users's password" })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({ example: 'erkak', description: "Users's gender" })
  @Column({
    type: DataType.STRING,
    validate: {
      isIn: [['ayol', 'erkak']],
    },
  })
  gender: string;

  @ApiProperty({ example: '1', description: "Users's social id" })
  @ForeignKey(() => Social)
  @Column({
    type: DataType.INTEGER,
  })
  socials_id: number;

  @Column({
    type: DataType.STRING,
  })
  photo_file_name: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @BelongsTo(() => Social)
  social: Social;

  @Column({ type: DataType.STRING, defaultValue: 'USER' })
  role: string;
}
