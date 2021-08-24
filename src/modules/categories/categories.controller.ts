import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':categoryUUID')
  async findOneByCategoryWithArticles(
    @Param('categoryUUID') categoryUUID: string,
  ) {
    return await this.categoriesService.findOneByCategoryWithArticles(
      categoryUUID,
    );
  }

  @Post('/new')
  async create(@Body() category: CategoryDto, @Request() req) {
    return await this.categoriesService.create(category, req.user.UUID);
  }
}
