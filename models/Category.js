import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Category name
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }], // References to items
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
