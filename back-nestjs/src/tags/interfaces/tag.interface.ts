import { Document } from 'mongoose';

export interface Tag extends Document {
  readonly _id: string;
  readonly color: string;
}
