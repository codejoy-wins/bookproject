import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';
import { NextResponse } from 'next/server';
import Item from '@/models/Item';

// GET: Fetch all categories
export async function GET() {
    try {
        await dbConnect();
        const categories = await Category.find().populate('items'); // Fetch categories with items
        console.log('Fetched categories:', categories);
        return NextResponse.json(categories || []);
    } catch (error) {
        console.error('Error fetching categories on the serverside:', error.message);
        return NextResponse.json({ error: 'Error fetching categories 2' }, { status: 500 });
    }
}

// POST: Add a new category
export async function POST(request) {
    try {
        await dbConnect();
        const { name } = await request.json(); // Extract category name from request body

        if (!name) {
            throw new Error('Name is required to create a category');
        }

        const newCategory = new Category({ name, items: [] }); // Create new category with empty items array
        await newCategory.save();

        console.log('Created new category:', newCategory);
        return NextResponse.json(newCategory, { status: 201 }); // Return the created category
    } catch (error) {
        console.error('Error creating category:', error.message);
        return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
    }
}
