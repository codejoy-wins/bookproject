import Background from '@/components/Background';
import CategoryMagic from '@/components/CategoryMagic';
import CommentForm from '@/components/CommentForm';
import Link from 'next/link';

export default async function ItemPage({ params }) {
  const { id } = params;

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
  // probably need to populate the comments from the items, and also for the existing data to be deleted and restarted with empty arrays of comments.
  if (!item) {
    return (
      <div>
        <h1>Item Not Found</h1>
        <p>No item exists with ID: {id}</p>
      </div>
    );
  }
  let itemComments = ["no comments"];
  let mainComment = "comments are under construction by codejoy";
  try{
    if(item.comments){
      itemComments = item.comments;
      mainComment = itemComments[0].text;
    }else{
      console.log("hi");
    }
  }
  catch{
    console.log("tried and failed");
  }
  

  // Render item details
  return (
    <>
      <Background />
      <div>
        <h1>{item.name}</h1>
        <Link key={item._id} href={`/`}>
            <div className='pikachu'>
            Return To Roost
            </div>
        </Link>
        <div className='review'>
          <h1>{mainComment}</h1>
          < CommentForm />
          <p>
            This is where the item comments / review will go for {item.name}
          </p>
          <p>It should have a form to let you post comments</p>
          <p>It should also have item specific pictures, and the background should probably change as well depending on the category</p>
        </div>
        
      </div>
      <CategoryMagic elam = {item.category} />
        <p className='charizard'><strong>Name:</strong> {item.name}</p>
        <p className='charizard'><strong>Item ID:</strong> {item._id}</p>
        <p className='charizard'><strong>Category ID:</strong> {item.category}</p>
    </>
  );
}
