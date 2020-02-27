import { Expose, Exclude } from 'class-transformer';

export class TechnoDto {
  @Exclude()
  readonly _id: string;
  @Expose()
  get id(): string {
    return this._id.toString();
  }
  readonly title: string;
  readonly type: string;
  readonly imgUrl: string;
  readonly desc: string;
  readonly tags: string[];
  constructor(partial: Partial<TechnoDto>) {
    Object.assign(this, {
      _id: partial._id,
      title: partial.title,
      type: partial.type,
      imgUrl: partial.imgUrl,
      desc: partial.desc,
      tags: partial.tags,
    });
  }
}
