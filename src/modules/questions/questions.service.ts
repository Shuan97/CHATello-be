import { Inject, Injectable } from '@nestjs/common';
import { QUESTION_REPOSITORY } from 'core/constants';
import { Option } from 'modules/options/option.entity';
import { QuestionDto } from './question.dto';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(QUESTION_REPOSITORY)
    private readonly questionsRepository: typeof Question,
  ) {
    // Question.sync({ force: true });
  }

  async findAll(): Promise<Question[]> {
    return await this.questionsRepository.findAll<Question>();
  }

  async findAllByCategory(setUUID: string): Promise<Question[]> {
    return await this.questionsRepository.findAll<Question>({
      where: { setUUID },
      include: [
        {
          model: Option,
          // attributes: ['UUID', 'title', 'createdBy', 'createdAt'],
        },
      ],
      // order descendent nested association by 'createdAt'
      // order: [['articles', 'createdAt', 'DESC']],
      // attributes: ['UUID', 'name', 'description'],
    });
  }

  async create(question: QuestionDto, createdBy: string): Promise<Question> {
    const newQuestion = await this.questionsRepository.create<Question>({
      ...question,
      createdBy,
    });
    return newQuestion;
  }
}
