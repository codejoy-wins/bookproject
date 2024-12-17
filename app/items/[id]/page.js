import Background from '@/components/Background';

export default async function ItemPage({ params }) {
  const { id } = await params;

  let item = null; // Initialize item data

  // Use the environment variable for the base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    // Fetch item data using the environment variable
    const res = await fetch(`${baseUrl}/api/items/${id}`);
    if (res.ok) {
      const { data } = await res.json();
      item = data;
    } else {
      console.error(`Failed to fetch item: ${res.status}`);
    }
  } catch (error) {
    console.error(`Fetch failed for ${baseUrl}: ${error.message}`);
  }

  // Handle item not found or fetch failure
  if (!item) {
    return (
      <div>
        <h1>Item Not Found</h1>
        <p>No item exists with ID: {id}</p>
      </div>
    );
  }

  // Render item details
  return (
    <>
      <Background />
      <div>
        <h1>{item.name} Details</h1>
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Category:</strong> {item.category}</p>
      </div>
    </>
  );
}
