import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const category = await Category.create({
            name: body.name,
            createdBy: body.createdBy,
        });

        return new Response(JSON.stringify(category), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}
