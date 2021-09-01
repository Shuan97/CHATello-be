import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from 'core/constants';
import { Article } from 'modules/articles/article.entity';
import { CategoryDto } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoriesRepository: typeof Category,
  ) {
    // Category.sync({ force: true });
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.findAll<Category>();
  }

  async findOneByCategoryWithArticles(categoryUUID: string): Promise<Category> {
    return await this.categoriesRepository.findOne<Category>({
      where: { UUID: categoryUUID },
      include: [
        {
          model: Article,
          attributes: ['UUID', 'title', 'createdBy', 'createdAt'],
        },
      ],
      // order descendent nested association by 'createdAt'
      order: [['articles', 'createdAt', 'DESC']],
      attributes: ['UUID', 'name', 'description'],
    });
  }

  async create(category: CategoryDto, createdBy: string): Promise<Category> {
    const newCategory = await this.categoriesRepository.create<Category>({
      ...category,
      createdBy,
    });
    return newCategory;
  }
}
