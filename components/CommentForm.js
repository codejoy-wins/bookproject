"use client"

import { useState } from 'react';

export default function CommentForm({ itemId }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, itemId }),
      });

      if (!res.ok) {
        throw new Error('Failed to post comment');
      }

      setText(''); // Clear the form
      window.location.reload(); // Reload the page to show the new comment
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        required
      />
      <button type="submit">Post Comment</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
