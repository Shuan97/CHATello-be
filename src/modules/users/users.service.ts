import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../core/constants';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneByUUID(UUID: string): Promise<UserDto> {
    const user = await this.userRepository.findOne<User>({
      where: { UUID },
      attributes: { exclude: ['password'] },
    });
    // return toUserDto(user); // TODO
    return user;
  }
}
