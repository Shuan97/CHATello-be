import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { QuestionDto } from './question.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async findAll() {
    return await this.questionsService.findAll();
  }

  @Get(':setUUID')
  async findAllByCategory(@Param('setUUID') setUUID: string) {
    return await this.questionsService.findAllByCategory(setUUID);
  }

  @Post('/new')
  async create(@Body() question: QuestionDto, @Request() req) {
    return await this.questionsService
      .create(question, req.user.UUID)
      .catch((err) => {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: err.message,
            error: err.name,
            fields: err?.fields,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
