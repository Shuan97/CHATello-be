import { ArticleDto } from './article.dto';
import { Article } from './article.entity';
import { ARTICLE_REPOSITORY } from '../../core/constants/index';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject(ARTICLE_REPOSITORY)
    private readonly articlesRepository: typeof Article,
  ) {
    // Article.sync({ force: true });
  }

  async findAll(): Promise<Article[]> {
    return await this.articlesRepository.findAll<Article>({
      order: [['createdAt', 'DESC']],
    });
  }

  async findOneByArticleByUUID(UUID: string): Promise<Article> {
    return await this.articlesRepository.findOne<Article>({
      where: { UUID },
      attributes: ['UUID', 'title', 'body', 'createdAt'],
    });
  }

  async create(article: ArticleDto, createdBy: string): Promise<Article> {
    const newArticle = await this.articlesRepository.create<Article>({
      ...article,
      createdBy,
    });
    return newArticle;
  }
}
