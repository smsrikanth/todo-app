import mongoose from 'mongoose';
import Comment from './comment.js';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  userId: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },

  //comments: { type: Array },
});

const Posts = new mongoose.model('Posts', PostSchema);

export default Posts;
