import { HttpException } from '@nestjs/common';
import { Answer } from 'modules/answers/answer.entity';
import { Article } from 'modules/articles/article.entity';
import { Category } from 'modules/categories/category.entity';
import { Message } from 'modules/messages/message.entity';
import { Option } from 'modules/options/option.entity';
import { Question } from 'modules/questions/question.entity';
import { Set } from 'modules/sets/set.entity';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../../modules/users/user.entity';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../constants';
import { Channel } from './../../modules/channels/channel.entity';
import { UserChannel } from './../../modules/user-channels/user-channel.entity';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const originalQuery = Sequelize.prototype.query;
      Sequelize.prototype.query = function () {
        // eslint-disable-next-line prefer-rest-params
        return originalQuery.apply(this, arguments).catch((err: any) => {
          // tslint:disable-next-line: no-console
          console.error(err?.original?.sqlMessage);
          throw new HttpException(err, 400);
        });
      };
      const sequelize = new Sequelize({ ...config, logging: false });

      // Tables to be generated in database
      sequelize.addModels([
        User,
        Message,
        Channel,
        UserChannel,
        Category,
        Article,
        Question,
        Option,
        Set,
        Answer,
      ]);

      // Force tables to drop and re-create with no data
      // await sequelize.sync({ force: true });
      await sequelize.sync();
      return sequelize;
    },
  },
];
