import { Expose, Exclude } from 'class-transformer';

export class TagDto {
  @Exclude()
  readonly _id: string;
  @Expose()
  get name(): string {
    return this._id;
  }
  readonly color: string;

  constructor(partial: Partial<TagDto>) {
    Object.assign(this, { _id: partial._id, color: partial.color });
  }
}
