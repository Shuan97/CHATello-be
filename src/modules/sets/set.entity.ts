import { Question } from 'modules/questions/question.entity';
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
import { Category } from 'modules/categories/category.entity';
import { Answer } from 'modules/answers/answer.entity';

@Table
export class Set extends Model {
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
  name: string;

  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  description: string;

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

  @HasMany(() => Question)
  questions: Question[];

  @HasMany(() => Answer)
  answers: Answer[];
}
