import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a category name'],
        trim: true,
        maxlength: [50, 'Category name cannot be more than 50 characters']
    },
    createdBy: {
        type: String, // Store the user who created it, if applicable
        required: true,
        default: null,
    },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] // Link to books
});

// Export the model if it exists, or create it if it doesn’t
export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
