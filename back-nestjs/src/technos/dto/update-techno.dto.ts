import { IsNotEmpty } from 'class-validator';

export class UpdateTechnoDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly desc: string;
  @IsNotEmpty()
  readonly type: string;
  public imgUrl: string;
  @IsNotEmpty()
  readonly tags: string[];
}
