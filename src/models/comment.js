import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postId: { type: String, required: true },
  body: { type: String, required: true },
  userId: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const Comment = new mongoose.model('Comments', CommentSchema);

export default Comment;
