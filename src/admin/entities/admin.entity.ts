import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'admin' })
export class Admin extends Model {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'admin', description: "Admin's first name" })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({ example: 'adminov', description: "Admin's last name" })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({ example: '991234567', description: "Admin's phone number" })
  @Column({
    type: DataType.STRING,
    unique: true,
    validate: {
      len: [9, 12],
    },
  })
  phone_number: string;

  @ApiProperty({ example: '1234567', description: "Admin's password" })
  @Column({
    type: DataType.STRING,
    validate: {
      min: 5,
    },
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({ type: DataType.STRING, defaultValue: 'ADMIN' })
  role: string;
}
