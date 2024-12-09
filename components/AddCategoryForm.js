import { useState } from 'react';

const AddCategoryForm = ({ onAdd }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName) return;

        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: categoryName }),
            });

            if (!res.ok) {
                throw new Error('Failed to add category');
            }

            const newCategory = await res.json();
            onAdd(newCategory);
            setCategoryName('');
        } catch (error) {
            console.error('Error adding category:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                placeholder="New category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                style={styles.input}
            />
            <button type="submit" style={styles.button}>
                + Create New Category
            </button>
        </form>
    );
};

const styles = {
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        backgroundColor: 'rgba(34, 139, 34, 0.25)', // Match the green style
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    input: {
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        minWidth: '200px',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: 'white',
    },
    button: {
        padding: '8px 16px',
        fontSize: '1rem',
        backgroundColor: 'rgba(0, 123, 255, 0.8)',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default AddCategoryForm;
