import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateTechnoDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly desc: string;
  @IsNotEmpty()
  readonly type: string;
  readonly tags: string[];
  @Exclude()
  public imgUrl: string;
}
