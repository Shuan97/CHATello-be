import { IsNotEmpty } from 'class-validator';
import { User } from './../users/user.entity';

export class ChannelDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly type: string;

  users: User[];
}
