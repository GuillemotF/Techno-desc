import * as mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  color: { type: String, required: true },
});
