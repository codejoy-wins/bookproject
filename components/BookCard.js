import React from 'react';

export default function BookCard({ book, onDelete, setFormVisible, setFormData, setEditingBookId}) {
    return (
        <li
            style={{
                background: '#fff',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <strong>{book.title}</strong> by {book.author} - {book.rating}/5
            <p>{book.review}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {/* <button onClick={() => onEdit(book)} style={{
                        background: '#ff4d4f',
                        color: '#fff',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}>Edit</button> */}
                <button
                    onClick={() => {
                        setFormVisible(true); // Show the form
                        setFormData({
                            title: book.title,
                            author: book.author,
                            review: book.review,
                            rating: book.rating,
                        }); // Populate form with existing data
                        setEditingBookId(book._id); // Track which book is being edited
                    }}
                    style={{
                        background: '#0070f3', // Changed the background color for distinction
                        color: '#fff',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Edit
                </button>
                {/* end of new edit click function  */}
                <button onClick={() => onDelete(book._id)} style={{
                        background: '#ff4d4f',
                        color: '#fff',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}>Delete</button>
            </div>
        </li>
    );
}