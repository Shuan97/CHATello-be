import { Category } from 'modules/categories/category.entity';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  IsUUID,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table
export class Article extends Model {
  @IsUUID(4)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    defaultValue: () => {
      return uuidv4();
    },
  })
  UUID: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  createdBy: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  categoryUUID: string;

  @BelongsTo(() => Category)
  category: Category;
}
