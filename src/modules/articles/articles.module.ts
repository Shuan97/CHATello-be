import { Module } from '@nestjs/common';
import { ARTICLE_REPOSITORY } from 'core/constants';
import { Article } from './article.entity';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [],
  exports: [ArticlesModule],
  providers: [
    ArticlesService,
    {
      provide: ARTICLE_REPOSITORY,
      useValue: Article,
    },
  ],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
