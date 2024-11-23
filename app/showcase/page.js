'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BookCard from '@/components/BookCard';
import useUserId from '../../hooks/useUserId';
import styles from "./page.module.css";

export default function BookerPage() {
    const userId = useUserId(); // Get the user ID
    const [formVisible, setFormVisible] = useState(false); // State to toggle form visibility
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        review: '',
        rating: '',
    });
    const [message, setMessage] = useState('');
    const [books, setBooks] = useState([]); // State to store the list of books

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

    // Toggle form visibility when Booker is clicked
    const handleClickBooker = () => {
        setFormVisible((prev) => !prev);
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const [editingBookId, setEditingBookId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(editingBookId){
            await handleEdit(editingBookId, formData);
            setEditingBookId(null);
            setFormData({ title: '', author: '', review: '', rating: '' }); // Reset the form
            setFormVisible(false);
        } else{

        
            try {
                const response = await fetch('/api/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-id': userId, // Include the user ID
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                if (response.ok) {
                    setMessage('Book added successfully!');
                    setFormData({ title: '', author: '', review: '', rating: '' }); // Clear form fields
                    fetchBooks(); // Refresh the book list
                    setFormVisible(false);
                } else {
                    setMessage(`Error: ${data.message}`);
                }
            } catch (error) {
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/books/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': userId, // Include the user ID
                },
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Book deleted:', result.message);
                setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
            } else if (response.status === 403) {
                alert('You are not authorized to delete this book.');
            } else {
                console.error('Error deleting book:', result.message);
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    // Handle edit
    const handleEdit = async (id, updatedData) => {
        // const userID = localStorage.getItem('userId'); // might be able to comment this out, since I have a hook for it.
        try {
            const response = await fetch(`/api/books/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'user-id': userId,
                 },
                body: JSON.stringify(updatedData),
            });
            if (response.ok) {
                const updatedBook = await response.json();
                setBooks((prevBooks) =>
                    prevBooks.map((book) => (book._id === id ? updatedBook.data : book))
                );
            } else if (response.status === 403) {
                alert('You are not authorized to edit this book.');
            } else {
                console.error('Failed to update the book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '100vh',
                padding: '20px',
                boxSizing: 'border-box',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '1200px',
                    marginBottom: '20px',
                    gap: '20px',
                }}
            >
                {/* Booker Image */}
                <div
                    className="booky"
                    onClick={handleClickBooker}
                    style={{
                        cursor: 'pointer',
                        transition: 'transform 0.5s ease',
                        transform: formVisible ? 'translateX(0)' : 'scale(1.5)',
                        marginRight: formVisible ? '20px' : '0',
                        width: '300px',
                    }}
                >
                    <Image
                        src="/images/11.webp"
                        alt="Booker the Anthropomorphized Book"
                        width={300}
                        height={400}
                    />
                    {!formVisible && <p style={{ textAlign: 'center', fontSize: '18px' }}></p>}
                </div>

                {/* Form */}
                {formVisible && (
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            background: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            maxWidth: '400px',
                            marginLeft: '20px',
                            color: 'navy',
                            width: '100%',
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
            {/* <h2 style={{ marginTop: '30px' }}>An AI Bird that flies away and comes back with an answer or book</h2> */}
            <ul style={{ listStyleType: 'none', padding: 0, marginTop: 117 }}>
                {books.slice().reverse().map((book) => (
                    <BookCard
                        key={book._id}
                        book={book}
                        onDelete={handleDelete}
                        // onEdit={handleEdit}
                        setFormVisible={setFormVisible} // Passed down from the parent
                        setFormData={setFormData} // Passed down from the parent
                        setEditingBookId={setEditingBookId} // Passed down from the parent
                    />
                ))}
            </ul>
            <div className='xpred'>
                <p className='ii'>Aurius</p>
                <Link href="/" className="xp">
                    Go to Home Page
                </Link>
            </div>
        </main>
    );
}
