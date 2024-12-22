import Background from '@/components/Background';
import CategoryMagic from '@/components/CategoryMagic';
import CommentForm from '@/components/CommentForm';
import Link from 'next/link';

export default async function ItemPage({ params }) {
  const { id } = params; // Do not use `await` here since params are already resolved

  let item = null;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    // Fetch item data from the API
    const res = await fetch(`${baseUrl}/api/items/${id}`);
    if (res.ok) {
      const { data } = await res.json();
      item = data;
    } else {
      console.error(`Failed to fetch item. Status: ${res.status}`);
    }
  } catch (error) {
    console.error(`Fetch failed for ${baseUrl}/api/items/${id}:`, error.message);
  }

  if (!item) {
    return (
      <div>
        <h1>Item Not Found</h1>
        <p>No item exists with ID: {id}</p>
      </div>
    );
  }

  return (
    <>
      <Background />
      <div>
        <h1>{item.name}</h1>
        <Link href={`/`}>
          <div className="pikachu">Return To Roost</div>
        </Link>
        <div className="review">
          <h2>Comments</h2>
          {item.comments && item.comments.length > 0 ? (
            item.comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p><strong>{comment.author}:</strong> {comment.text}</p>
                <p><small>{new Date(comment.createdAt).toLocaleString()}</small></p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}

          <CommentForm itemId={id} />
          <p>
            This is where the item comments / review will go for {item.name}
          </p>
        </div>
      </div>
      <CategoryMagic elam={item.category} />
    </>
  );
}
