import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly image: string;
}
