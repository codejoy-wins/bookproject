import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide the title of the book'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    author: {
        type: String,
        required: [true, 'Please provide the author of the book'],
        trim: true,
        maxlength: [100, 'Author name cannot be more than 100 characters']
    },
    review: {
        type: String,
        maxlength: [500, 'Review cannot be more than 500 characters']
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: true,
        default: null,
    },
});

// Export the model if it exists, or create it if it doesn’t
export default mongoose.models.Book || mongoose.model('Book', BookSchema);
