import { IsJSON, IsString } from 'class-validator';

export class GetTechnosQuery {
  @IsJSON()
  tags: string;
  @IsString()
  type: string;
}
