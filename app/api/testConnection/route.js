import dbConnect from '../../../lib/dbConnect';

export async function GET(request) {
    await dbConnect();
    return new Response(JSON.stringify({ message: 'Cloudland Database connected successfully!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
