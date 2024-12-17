import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Item from '@/models/Item';

export async function POST(request, { params }) {
  try {
    // Ensure ID is valid
    const { id } = params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid or missing item ID' },
        { status: 400 }
      );
    }

    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (err) {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const { text, author } = body;
    if (!text) {
      return NextResponse.json(
        { success: false, message: 'Comment text is required' },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Create the new comment object
    const newComment = {
      text,
      author: author || 'Anonymous',
      createdAt: new Date(),
    };

    // Update the item with the new comment
    const item = await Item.findByIdAndUpdate(
      id,
      { $push: { comments: newComment } },
      { new: true, runValidators: true }
    );

    if (!item) {
      return NextResponse.json(
        { success: false, message: 'Item not found' },
        { status: 404 }
      );
    }

    // Return the updated comments
    return NextResponse.json(
      { success: true, data: item.comments },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
