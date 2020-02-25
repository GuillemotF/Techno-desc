import * as mongoose from 'mongoose';

export const TechnoSchema = new mongoose.Schema({
  title: String,
  _id: String,
  type: String,
  imgUrl: String,
  desc: String,
});
