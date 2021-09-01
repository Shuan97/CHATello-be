import { Module } from '@nestjs/common';
import { AuthModule } from './../auth/auth.module';
import { MessagesController } from './messages.controller';
import { MessagesGateway } from './messages.gateway';
import { messagesProviders } from './messages.providers';
import { MessagesService } from './messages.service';

@Module({
  imports: [AuthModule],
  providers: [...messagesProviders, MessagesService, MessagesGateway],
  controllers: [MessagesController],
})
export class MessagesModule {}
