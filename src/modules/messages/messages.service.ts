import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from './../../core/constants/index';
import { User } from './../users/user.entity';
import { MessageDto } from './message.dto';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: typeof Message,
  ) {
    // Message.sync({ force: true });
  }

  async create(message: MessageDto, userUUID): Promise<Message> {
    const data = {
      ...message,
      userUUID,
    };
    return await this.messageRepository.create<Message>({
      ...data,
    });
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.findAll<Message>({
      include: [
        {
          model: User,
          attributes: ['UUID', 'name', 'email', 'nickname', 'image'],
        },
      ],
    });
  }

  async findOne(id: number): Promise<Message> {
    return await this.messageRepository.findOne({
      where: { id },
      include: [
        {
          model: User,
          // attributes: { include: ['UUID', 'name', 'email', 'nickname'] },
          attributes: ['UUID', 'name', 'email', 'nickname', 'image'],
        },
      ],
    });
  }

  // async delete(id, userId) {
  //   return await this.messageRepository.destroy({ where: { id, userId } });
  // }

  async update(id, data, userId) {
    const [
      numberOfAffectedRows,
      [updatedMessage],
    ] = await this.messageRepository.update(
      { ...data },
      { where: { id, userId }, returning: true },
    );

    return { numberOfAffectedRows, updatedMessage };
  }
}
