import { Document } from 'mongoose';

export interface Techno extends Document {
  readonly _id: string;
  readonly title: string;
  readonly desc: string;
  readonly type: string;
  readonly imgUrl: string;
}
