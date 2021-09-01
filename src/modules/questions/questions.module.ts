import { Module } from '@nestjs/common';
import { QUESTION_REPOSITORY } from 'core/constants';
import { Question } from 'modules/questions/question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  providers: [
    QuestionsService,
    {
      provide: QUESTION_REPOSITORY,
      useValue: Question,
    },
  ],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
