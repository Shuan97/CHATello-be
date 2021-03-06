import {
  BelongsToMany,
  Column,
  DataType,
  IsUUID,
  Model,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/user.entity';
import { UserChannel } from './../user-channels/user-channel.entity';

@Table
export class Channel extends Model {
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
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.UUID,
  })
  createdBy: string;

  // @ForeignKey(() => UserChannel)
  // @Column({
  //   type: DataType.UUID,
  //   allowNull: false,
  // })
  // userUUID: string;

  // @BelongsTo(() => User)
  // user: User;

  // @BelongsToMany(() => User, {
  //   foreignKey: 'userUUID',
  //   otherKey: 'channelUUID',
  //   through: () => UserChannel,
  // })

  @BelongsToMany(() => User, () => UserChannel)
  users: (User & { UserChannel: UserChannel })[];
  // @BelongsToMany(() => User, { through: 'UserChannel' })
  // users: User[];
}
