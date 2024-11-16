'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';

export default function FormPage() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        review: '',
        rating: '',
    });

    const [message, setMessage] = useState('');
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await fetch('/api/books');
            const data = await response.json();
            setBooks(data); // Update the state with the fetched books
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    // Fetch books when the page loads
    useEffect(() => {
        fetchBooks();
    }, []);

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
            const response = await fetch('api/books', {
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
                fetchBooks();
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <main>
            <div style={{ maxWidth: '520px', margin: '0 auto' }}>
            <Image
                src="/images/booker.webp" // Path to your image in the public folder
                alt="Booker the Anthropomorphized Book"
                width={500} // Native width of the image
                height={500} // Native height of the image (adjust as per actual dimensions)
                style={{ maxWidth: '100%', height: 'auto' }}
            />
        </div>
            <h1>Add a Book</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
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
                    />
                </div>
                <div>
                    <label htmlFor="review">Review:</label>
                    <textarea
                        id="review"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
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
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <div className="xpr">
                <p>{message}</p>
            </div>
            <h2>Books List</h2>
            <ul>
                {books.length > 0 ? (
                    books.map((book) => (
                        <li key={book._id}>
                            <strong>{book.title}</strong> by {book.author} - {book.rating}/5
                            <p>{book.review}</p>
                        </li>
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </ul>
        </main>
    );
}
