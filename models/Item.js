import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the item
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to the category
});

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
