import { IsNotEmpty } from 'class-validator';

export class CreateTechnoDto {
  @IsNotEmpty()
  readonly id: string;
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly desc: string;
  @IsNotEmpty()
  readonly type: string;
  @IsNotEmpty()
  readonly imgUrl: string;
}
