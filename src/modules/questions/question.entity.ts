import { Option } from 'modules/options/option.entity';
import { Set } from 'modules/sets/set.entity';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  IsUUID,
  Model,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table
export class Question extends Model {
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
    type: DataType.STRING(1000),
    allowNull: false,
  })
  questionText: string;

  @Column({
    type: DataType.STRING(1000),
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  image: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  createdBy: string;

  @ForeignKey(() => Set)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  setUUID: string;

  @BelongsTo(() => Set)
  questionsSet: Set;

  @HasMany(() => Option)
  options: Option[];
}
