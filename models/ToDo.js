import mongoose from 'mongoose';

const ToDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('ToDo', ToDoSchema);
