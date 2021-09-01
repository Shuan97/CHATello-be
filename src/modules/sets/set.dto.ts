import { IsNotEmpty } from 'class-validator';

export class SetDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly categoryUUID: string;
}
