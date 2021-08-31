import { Inject, Injectable } from '@nestjs/common';
import { OPTION_REPOSITORY } from 'core/constants';
import { Option } from 'modules/options/option.entity';
import { OptionDto } from './option.dto';

@Injectable()
export class OptionsService {
  constructor(
    @Inject(OPTION_REPOSITORY)
    private readonly optionsRepository: typeof Option,
  ) {
    // Option.sync({ force: true });
  }

  async findAll(): Promise<Option[]> {
    return await this.optionsRepository.findAll<Option>();
  }

  async findAllByQuestion(questionUUID: string): Promise<Option[]> {
    return await this.optionsRepository.findAll<Option>({
      where: { questionUUID },
      // order descendent nested association by 'createdAt'
      // order: [['articles', 'createdAt', 'DESC']],
      // attributes: ['UUID', 'name', 'description'],
    });
  }

  async create(option: OptionDto): Promise<Option> {
    const newOption = await this.optionsRepository.create<Option>({
      ...option,
    });
    return newOption;
  }
}
