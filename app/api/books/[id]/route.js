import mongoose from 'mongoose';
import dbConnect from '../../../../lib/dbConnect';
import Book from '../../../../models/Book';
/// export edit

export async function PUT(req, context) {
    const { params } = context;
    const { id } = await params; // Await the params object

    console.log('Received ID for update:', id);

    // Retrieve the userId from the headers
    const userId = req.headers.get('user-id');
    console.log('User ID:', userId);

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error('Invalid ObjectId:', id);
        return new Response(JSON.stringify({ success: false, message: 'Invalid ID format' }), {
            status: 400,
        });
    }

    await dbConnect();

    try {
        const objectId = new mongoose.Types.ObjectId(id);

        // Find the book to verify ownership
        const book = await Book.findById(objectId);
        if (!book) {
            console.log('Book not found');
            return new Response(JSON.stringify({ success: false, message: 'Book not found' }), {
                status: 404,
            });
        }

        // Check if the book is editable by this user
        if (book.createdBy === userId || book.createdBy === null) {
            // Parse the request body for updated data
            const updatedData = await req.json();

            const updatedBook = await Book.findByIdAndUpdate(
                objectId,
                { $set: updatedData },
                { new: true } // Return the updated document
            );

            console.log('Book updated:', updatedBook);
            return new Response(JSON.stringify({ success: true, data: updatedBook }), {
                status: 200,
            });
        } else {
            console.log('Unauthorized update attempt');
            return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
                status: 403,
            });
        }
    } catch (error) {
        console.error('Error updating book:', error);
        return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
            status: 500,
        });
    }
}



/// export delete

export async function DELETE(req, context) {
    const { params } = context;
    const { id } = await params; // Await the params object

    console.log('Received ID:', id);

    // Retrieve userId from the headers
    const userId = req.headers.get('user-id');
    console.log('User ID:', userId);

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error('Invalid ObjectId:', id);
        return new Response(JSON.stringify({ success: false, message: 'Invalid ID format' }), {
            status: 400,
        });
    }

    await dbConnect();

    try {
        const objectId = new mongoose.Types.ObjectId(id);

        // Find the book to verify the `createdBy` field
        const book = await Book.findById(objectId);
        if (!book) {
            console.log('Book not found');
            return new Response(JSON.stringify({ success: false, message: 'Book not found' }), {
                status: 404,
            });
        }

        // Check if the `createdBy` matches the user's ID
        if (book.createdBy !== userId && book.createdBy !== null) {
            console.log('Unauthorized delete attempt');
            return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
                status: 403,
            });
        }

        // Proceed with deletion if authorized
        const deletedBook = await Book.findByIdAndDelete(objectId);

        console.log('Book deleted:', deletedBook);
        return new Response(JSON.stringify({ success: true, message: 'Book deleted' }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error deleting book:', error);
        return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
            status: 500,
        });
    }
}
