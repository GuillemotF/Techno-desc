import { IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  readonly id: string;
  @IsNotEmpty()
  readonly color: string;
}
