import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'socials' })
export class Social extends Model {
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
  social_icon_file_name: string;

  @Column({
    type: DataType.STRING,
  })
  social_name: string;

  @Column({
    type: DataType.STRING,
  })
  social_link: string;
}
