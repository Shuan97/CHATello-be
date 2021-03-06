import { Answer } from 'modules/answers/answer.entity';
import {
  Table,
  Column,
  Model,
  DataType,
  IsUUID,
  BelongsToMany,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Channel } from './../channels/channel.entity';
import { UserChannel } from './../user-channels/user-channel.entity';

@Table
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
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
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  nickname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: false,
  })
  role: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  image: string;

  // @BeforeCreate
  // static removePrivileges(instance: User) {
  //   instance.isAdmin = false;
  //   instance.isRootAdmin = false;
  // }

  // @BelongsToMany(() => Channel, {
  //   foreignKey: 'channelUUID',
  //   otherKey: 'userUUID',
  //   through: () => UserChannel,
  // })

  @HasMany(() => Answer)
  answers: Answer[];

  @BelongsToMany(() => Channel, () => UserChannel, 'userUUID', 'channelUUID')
  channels: (Channel & { UserChannel: UserChannel })[];
  // @BelongsToMany(() => Channel, { through: 'UserChannel' })
  // channels: Channel[];
}
