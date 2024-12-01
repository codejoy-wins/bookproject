'use client';
import { useState } from 'react';

export default function CategoryForm({ onCategoryCreated }) {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, createdBy: 'anonymous' }),
        });

        if (response.ok) {
            const newCategory = await response.json();
            onCategoryCreated(newCategory);
            setName('');
        } else {
            console.error('Failed to create category');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '20px',
                borderRadius: '10px',
                maxWidth: '400px',
            }}
        >
            <label htmlFor="name" style={{ color: 'white' }}>Category Name:</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid gray',
                }}
            />
            <button
                type="submit"
                style={{
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: 'lime',
                    color: 'black',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
            >
                Add Category
            </button>
        </form>
    );
}
