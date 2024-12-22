import dbConnect from '@/lib/dbConnect';
import Item from '@/models/Item';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

// this is the page that should fetch comments according to chatGPT

export async function GET(request, { params }) {
  const { id } = params;

  try {
    await dbConnect();

    // Validate and cast `id` to an ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid ID format' }, { status: 400 });
    }

    // const item = await Item.findById(id);
    const item = await Item.findById(id).populate('comments');


    if (!item) {
      return NextResponse.json({ success: false, message: 'Item not fucking found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
