import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
});

export default mongoose.model('Board', BoardSchema);