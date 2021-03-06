import { Channel } from './../channels/channel.entity';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Message extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userUUID: string;

  @ForeignKey(() => Channel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  channelUUID: string;

  @BelongsTo(() => User, { foreignKey: 'userUUID' })
  user: User;

  @BelongsTo(() => Channel)
  channel: Channel;
}
