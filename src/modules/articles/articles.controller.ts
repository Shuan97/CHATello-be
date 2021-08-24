import { ArticleDto } from './article.dto';
import { ArticlesService } from './articles.service';
import { Controller, Post, Body, Request, Get, Param } from '@nestjs/common';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll() {
    return await this.articlesService.findAll();
  }

  @Get(':UUID')
  async findOneByArticleByUUID(@Param('UUID') UUID: string) {
    return await this.articlesService.findOneByArticleByUUID(UUID);
  }

  @Post('/new')
  async create(@Body() article: ArticleDto, @Request() req) {
    return await this.articlesService.create(article, req.user.UUID);
  }
}
