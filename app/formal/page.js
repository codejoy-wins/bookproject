'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function BookerPage() {
    const [formVisible, setFormVisible] = useState(false); // State to toggle form visibility
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        review: '',
        rating: '',
    });
    const [message, setMessage] = useState('');
    const [books, setBooks] = useState([]);

    // Fetch books from the API
    const fetchBooks = async () => {
        try {
            const response = await fetch('/api/books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleClickBooker = () => {
        setFormVisible((prev) => !prev); // Toggle form visibility
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Book added successfully!');
                setFormData({ title: '', author: '', review: '', rating: '' });
                fetchBooks(); // Refresh the book list
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <main>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                {/* Booker Image */}
                <div onClick={handleClickBooker} style={{ cursor: 'pointer', marginRight: '20px' }}>
                    <Image
                        src="/images/booker.webp"
                        alt="Booker the Anthropomorphized Book"
                        width={150}
                        height={200}
                    />
                    <p style={{ textAlign: 'center' }}>Click me!</p>
                </div>

                {/* Form (Visible only when clicked) */}
                {formVisible && (
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            background: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            maxWidth: '400px',
                        }}
                    >
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="author">Author:</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="review">Review:</label>
                            <textarea
                                id="review"
                                name="review"
                                value={formData.review}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="rating">Rating (1-5):</label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                min="1"
                                max="5"
                                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#0070f3',
                                color: '#fff',
                                padding: '10px 15px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>

            {/* Books List */}
            <h2 style={{ marginTop: '30px' }}>Books Collection</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {books.map((book) => (
                    <li
                        key={book._id}
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
                    </li>
                ))}
            </ul>
        </main>
    );
}
