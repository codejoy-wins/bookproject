import dbConnect from '@/lib/dbConnect';
import Item from '@/models/Item';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';

// POST: Add a new item to a category
export async function POST(request) {
    try {
        await dbConnect();
        const { name, categoryId } = await request.json();

        if (!name || !categoryId) {
            throw new Error('Name and categoryId are required');
        }

        // Create the new item
        const newItem = new Item({ name, category: categoryId });
        await newItem.save();

        // Add the item to the corresponding category
        await Category.findByIdAndUpdate(
            categoryId,
            { $push: { items: newItem._id } }, // Add the item's ID to the category's items array
            { new: true } // Return the updated category
        );

        console.log('Added new item:', newItem);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error('Error adding item:', error.message);
        return NextResponse.json({ error: 'Error adding item' }, { status: 500 });
    }
}