import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true, lowercase: true },
  email: { type: String, lowercase: true, unique: true },
  password: String,
  roles: { type: [String], default: ['user'] },
});

const User = new mongoose.model('User', userSchema);

export default User;
