import { Module } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from 'core/constants';
import { Category } from './category.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [],
  exports: [CategoriesModule],
  providers: [
    CategoriesService,
    {
      provide: CATEGORY_REPOSITORY,
      useValue: Category,
    },
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
