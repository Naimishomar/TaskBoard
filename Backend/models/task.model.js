import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: String,
  status: { 
    type: String, 
    enum: ['Pending', 'Completed'], 
    default: 'Pending' 
  },
  dueDate: Date,
  boardId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Board', 
    required: true 
  },
});

export default mongoose.model('Task', TaskSchema);