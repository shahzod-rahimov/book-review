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
  first_name: string;

  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
  })
  username: string;

  @Column({
    type: DataType.DATEONLY,
  })
  birthday: Date;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
    validate: {
      isIn: [['ayol', 'erkak']],
    },
  })
  gender: string;

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
}
