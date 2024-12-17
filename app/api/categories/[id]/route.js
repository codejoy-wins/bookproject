import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Item from '@/models/Item';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  const { id } = params;

  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ID format' },
        { status: 400 }
      );
    }

    // Fetch the item only
    const item = await Item.findById(new mongoose.Types.ObjectId(id));
    if (!item) {
      return NextResponse.json(
        { success: false, message: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: { item } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching item:', error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
