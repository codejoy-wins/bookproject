import dbConnect from '@/lib/dbConnect';
import Comment from '@/models/Comment';
import Item from '@/models/Item';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();

    // Parse the request body
    const { text, itemId } = await request.json();
    if (!text || !itemId) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Create the new comment
    const comment = await Comment.create({ text, author: 'Anonymous' });

    // Associate the comment with the item
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { $push: { comments: comment._id } }, // Push the comment ID to the item's comments array
      { new: true } // Return the updated item
    );

    if (!updatedItem) {
      return NextResponse.json({ success: false, message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, data: { comment, updatedItem } },
      { 
        status: 201,
        headers: {
          'Cache-Control': 'no-store',
        }
      }
    );
  } catch (error) {
    console.error('Error creating comment:', error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
