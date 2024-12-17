import mongoose from 'mongoose';
import Comment from './Comment'; // Import the Comment schema

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', // Reference to the Comment model
    },
  ],
});

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
