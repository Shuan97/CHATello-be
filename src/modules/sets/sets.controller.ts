import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { SetDto } from './set.dto';
import { SetsService } from './sets.service';

@Controller('sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Get()
  async findAll(@Query() query) {
    return await this.setsService.findAll(query);
  }

  @Get(':UUID')
  async findOneByUUID(@Param('UUID') UUID: string) {
    return await this.setsService.findOneByUUID(UUID);
  }

  // @Get('by-category/:categoryUUID')
  // async findAllByCategory(@Param('categoryUUID') categoryUUID: string) {
  //   return await this.setsService.findAllByCategory(categoryUUID);
  // }

  @Post('new')
  async create(@Body() set: SetDto, @Request() req) {
    return await this.setsService.create(set, req.user.UUID);
  }
}
