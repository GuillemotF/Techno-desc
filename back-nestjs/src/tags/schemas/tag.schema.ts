import * as mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
  _id: String,
  color: String,
});
