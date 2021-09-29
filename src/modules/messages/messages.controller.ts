import { Body, Controller, Get, Logger, Post, Request } from '@nestjs/common';
import { MessageDto } from './message.dto';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly messagesGateway: MessagesGateway,
  ) {}

  private messageLogger: Logger = new Logger('MessageController');

  @Get()
  async findAll() {
    return await this.messagesService.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<Message> {
  //   // find the message with this id
  //   const message = await this.messagesService.findOne(id);

  //   // if the message doesn't exit in the db, throw a 404 error
  //   if (!message) {
  //     throw new NotFoundException('"This message doesn\'t exist"');
  //   }

  //   // if message exist, return the message
  //   return message;
  // }

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() message: MessageDto, @Request() req) {
    // create a new message and return the newly created message
    this.messageLogger.log(`User: ${req.user.UUID}`);
    this.messageLogger.log(`Authorization: ${req.headers.authorization}`);
    return await this.messagesService.create(message, req.user.UUID);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() message: MessageDto,
  //   @Request() req,
  // ): Promise<Message> {
  //   // get the number of row affected and the updated message
  //   const {
  //     numberOfAffectedRows,
  //     updatedMessage,
  //   } = await this.messagesService.update(id, message, req.user.id);

  //   // if the number of row affected is zero,
  //   // it means the message doesn't exist in our db
  //   if (numberOfAffectedRows === 0) {
  //     throw new NotFoundException('"This message doesn\'t exist"');
  //   }

  //   // return the updated message
  //   return updatedMessage;
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Delete(':id')
  // async remove(@Param('id') id: number, @Request() req) {
  //   // delete the message with this id
  //   const deleted = await this.messagesService.delete(id, req.user.id);

  //   // if the number of row affected is zero,
  //   // then the message doesn't exist in our db
  //   if (deleted === 0) {
  //     throw new NotFoundException('"This message doesn\'t exist"');
  //   }

  //   // return success message
  //   return 'Successfully deleted';
  // }
}
