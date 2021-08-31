import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'core/filters/http-exception.filter';
import { ArticlesModule } from 'modules/articles/articles.module';
import { AuthModule } from 'modules/auth/auth.module';
import { CategoriesModule } from 'modules/categories/categories.module';
import { ChannelsModule } from 'modules/channels/channels.module';
import { MessagesModule } from 'modules/messages/messages.module';
import { UserChannelsModule } from 'modules/user-channels/user-channels.module';
import { UsersModule } from 'modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { AnswersModule } from './modules/answers/answers.module';
import { OptionsModule } from './modules/options/options.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { SetsModule } from './modules/sets/sets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000).required(),
        ORIGIN_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ChannelsModule,
    MessagesModule,
    UserChannelsModule,
    CategoriesModule,
    ArticlesModule,
    QuestionsModule,
    OptionsModule,
    AnswersModule,
    SetsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
