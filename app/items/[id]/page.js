export default function ItemPage({ params }) {
    return (
      <div>
        <h1>Item Page</h1>
        <p>Item ID: <strong>{params.id}</strong></p>
      </div>
    );
  }
  