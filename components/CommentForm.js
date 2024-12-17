'use client';
import { useState } from 'react';

export default function CommentForm({ itemId, onCommentAdded }) {
  const [commentText, setCommentText] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/items/${itemId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: commentText,
          author: author || 'Anonymous',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const { data } = await response.json();

      // Notify parent component to refresh comments
      if (onCommentAdded) {
        onCommentAdded(data);
      }

      // Clear form
      setCommentText('');
      setAuthor('');
    } catch (err) {
      console.error('Error adding comment:', err.message);
      setError('Codejoy failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3>Add a Comment</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="author">Your Name</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter your name (optional)"
        />
      </div>
      <div>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          rows="4"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment here..."
          required
        ></textarea>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Comment'}
      </button>
    </form>
  );
}
