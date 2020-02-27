import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: String,
  email: String,
  password: String,
});
