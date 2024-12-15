import Background from '@/components/Background';


export default async function ItemPage({ params }) {
    const { id } = params;
  
    let item = null; // Initialize item data
  
    // List of base URLs to try
    const baseUrls = [
      "https://reviewandme.netlify.app", // Live environment
      "http://localhost:3000",          // Local development
    ];
  
    // Try fetching from each base URL
    for (const baseUrl of baseUrls) {
      try {
        const res = await fetch(`${baseUrl}/api/items/${id}`);
        if (res.ok) {
          const { data } = await res.json();
          item = data;
          break; // Exit loop if successful
        }
      } catch (error) {
        console.error(`Fetch failed for ${baseUrl}: ${error.message}`);
      }
    }
  
    // Handle item not found or all fetches failed
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
  