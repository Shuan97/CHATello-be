import { Inject, Injectable } from '@nestjs/common';
import { SET_REPOSITORY } from 'core/constants';
import { Option } from 'modules/options/option.entity';
import { Question } from 'modules/questions/question.entity';
import { transformQueryWildcardParams } from 'utils/transformer';
import { SetDto } from './set.dto';
import { Set } from './set.entity';

@Injectable()
export class SetsService {
  constructor(
    @Inject(SET_REPOSITORY)
    private readonly setsRepository: typeof Set,
  ) {
    // Set.sync({ force: true });
  }

  async findAll(query = null): Promise<Set[]> {
    const whereQuery = transformQueryWildcardParams(query);
    return await this.setsRepository.findAll<Set>({
      where: whereQuery,
    });
  }

  async findOneByUUID(UUID: string): Promise<Set> {
    return await this.setsRepository.findOne<Set>({
      where: { UUID },
      include: [
        {
          model: Question,
          attributes: ['UUID', 'questionText', 'description'],
          include: [
            {
              model: Option,
              attributes: ['UUID', 'optionText', 'type', 'isPositive'],
            },
          ],
        },
      ],
    });
  }

  // async findAllByCategory(categoryUUID: string): Promise<Set[]> {
  //   return await this.setsRepository.findAll<Set>({
  //     where: { categoryUUID },
  //   });
  // }

  async create(set: SetDto, createdBy: string): Promise<Set> {
    const newSet = await this.setsRepository.create<Set>({
      ...set,
      createdBy,
    });
    return newSet;
  }
}
