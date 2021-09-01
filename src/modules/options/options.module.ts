import { Module } from '@nestjs/common';
import { OPTION_REPOSITORY } from 'core/constants';
import { Option } from './option.entity';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';

@Module({
  providers: [
    OptionsService,
    {
      provide: OPTION_REPOSITORY,
      useValue: Option,
    },
  ],
  controllers: [OptionsController],
})
export class OptionsModule {}
