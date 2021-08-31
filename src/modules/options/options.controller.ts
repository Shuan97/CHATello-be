import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { OptionDto } from './option.dto';
import { OptionsService } from './options.service';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Get()
  async findAll() {
    return await this.optionsService.findAll();
  }

  @Get(':questionUUID')
  async findAllByQuestion(@Param('questionUUID') questionUUID: string) {
    return await this.optionsService.findAllByQuestion(questionUUID);
  }

  @Post('/new')
  async create(@Body() option: OptionDto) {
    return await this.optionsService.create(option).catch((err) => {
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
