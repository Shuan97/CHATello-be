import { Set } from 'modules/sets/set.entity';
import { User } from 'modules/users/user.entity';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table
export class Answer extends Model {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userUUID: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Set)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  setUUID: string;

  @BelongsTo(() => Set)
  questionsSet: Set;
}
