import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: { type: String, unique: true, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const Todos = new mongoose.model('Todos', TodoSchema);

export default Todos;
