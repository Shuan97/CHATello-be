import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';

export class QuestionDto {
  @Length(10, 1000)
  @IsNotEmpty()
  readonly questionText: string;

  @Length(0, 1000)
  @IsOptional()
  readonly description: string;

  @IsOptional()
  @MaxLength(640000)
  readonly image: string;

  @IsUUID('4')
  @IsNotEmpty()
  readonly setUUID: string;
}
