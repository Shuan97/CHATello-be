import { Module } from '@nestjs/common';
import { SET_REPOSITORY } from 'core/constants';
import { Set } from './set.entity';
import { SetsController } from './sets.controller';
import { SetsService } from './sets.service';

@Module({
  providers: [
    SetsService,
    {
      provide: SET_REPOSITORY,
      useValue: Set,
    },
  ],
  controllers: [SetsController],
})
export class SetsModule {}
