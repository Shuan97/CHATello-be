import { IsNotEmpty, IsOptional } from 'class-validator';

export class OptionDto {
  @IsNotEmpty()
  readonly optionText: string;

  @IsOptional()
  readonly type: string;

  @IsNotEmpty()
  readonly isPositive: boolean;

  @IsNotEmpty()
  readonly questionUUID: string;
}
