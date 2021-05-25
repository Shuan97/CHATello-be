import { GetUserDto } from 'modules/users/dto/getUser.dto';
import { User } from 'modules/users/user.entity';

export const toUserDto = (data: User): GetUserDto => {
  const { name, email, nickname, role } = data;
  const userDto: GetUserDto = { name, email, nickname, role };
  return userDto;
};
