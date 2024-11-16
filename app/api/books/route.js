import dbConnect from '../../../lib/dbConnect';
import Book from '../../../models/Book';

export async function POST(request) {
    await dbConnect();

    try {
        const data = await request.json();
        const book = await Book.create(data);
        return new Response(JSON.stringify(book), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function GET() {
    await dbConnect();

    try {
        const books = await Book.find({});
        return new Response(JSON.stringify(books), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
