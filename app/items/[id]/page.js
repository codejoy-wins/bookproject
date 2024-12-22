import Background from '@/components/Background';
import CategoryMagic from '@/components/CategoryMagic';
import CommentForm from '@/components/CommentForm';
import Link from 'next/link';

export default async function ItemPage({ params }) {
  // Await params destructuring (as it's async)
  const { id } = await params;

  console.log('Page loaded with params:', params); // Debug params
  console.log('ID extracted from params:', id);    // Debug ID

  let item = null; // Initialize item data

  // Use the environment variable for the base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  console.log('Base URL being used:', baseUrl);    // Debug base URL

  try {
    // Validate the ID format
    if (!/^[a-f\d]{24}$/i.test(id)) {
      throw new Error("Invalid ID format. ID must be a 24-character hex string.");
    }

    // Fetch item data from the API
    const res = await fetch(`${baseUrl}/api/items/${id}`);
    console.log('Fetch response status:', res.status); // Debug response status

    if (res.ok) {
      const { data } = await res.json();
      console.log('Data received from API:', data); // Debug API data
      item = data;
    } else {
      console.error(`Failed to fetch item. Status: ${res.status}`);
    }
  } catch (error) {
    console.error(`Fetch failed for ${baseUrl}/api/items/${id}:`, error.message);
  }

  // Handle item not found or fetch failure
  if (!item) {
    console.log('Item not found. Rendering fallback UI.'); // Debug fallback rendering
    return (
      <div>
        <h1>Item Not Found</h1>
        <p>No item exists with ID: {id}</p>
      </div>
    );
  }

  // Safeguard against missing comments
  let itemComments = ["No comments available."];
  let mainComment = "Comments are under construction.";
  try {
    if (item.comments && Array.isArray(item.comments) && item.comments.length > 0) {
      itemComments = item.comments;
      mainComment = itemComments[0]?.text || mainComment;
    }
  } catch (error) {
    console.error("Error processing comments:", error.message);
  }

  console.log('Rendering item details with data:', item); // Debug final data

  // Render item details
  return (
    <>
      <Background />
      <div>
        <h1>{item.name}</h1>
        <Link key={item._id} href={`/`}>
          <div className="pikachu">Return To Roost</div>
        </Link>
        <div className="review">
          <h1>{mainComment}</h1>
          <CommentForm />
          <p>
            This is where the item comments / review will go for {item.name}
          </p>
          <p>It should have a form to let you post comments</p>
          <p>It should also have item-specific pictures, and the background should probably change as well depending on the category</p>
        </div>
      </div>
      <CategoryMagic elam={item.category} />
      <p className="charizard">
        <strong>Name:</strong> {item.name}
      </p>
      <p className="charizard">
        <strong>Item ID:</strong> {item._id}
      </p>
      <p className="charizard">
        <strong>Category ID:</strong> {item.category}
      </p>
    </>
  );
}
