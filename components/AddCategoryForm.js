import { useState } from 'react';

const AddCategoryForm = ({ onAdd }) => {
    const [isEditing, setIsEditing] = useState(false); // Whether the form is visible
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
            onAdd(newCategory); // Refresh categories
            setCategoryName('');
            setIsEditing(false); // Hide the form again
        } catch (error) {
            console.error('Error adding category:', error.message);
        }
    };

    return (
        <div style={styles.container}>
            {isEditing ? (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="New category name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.saveButton}>
                        ✓
                    </button>
                </form>
            ) : (
                <button onClick={() => setIsEditing(true)} style={styles.addButton}>
                    + Create New Category
                </button>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'flex-start', // Align left
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    input: {
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        minWidth: '200px',
        backgroundColor: 'rgba(0, 123, 255, 0.3)', // Change pink to transparent blue
        color: 'white',
    },
    saveButton: {
        padding: '8px 12px',
        backgroundColor: 'rgba(34, 139, 34, 0.5)', // Pretty green
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: 'rgba(0, 123, 255, 0.35)', // Transparent blue
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow
        transition: 'background-color 0.3s ease', // Smooth hover effect
    },
};

export default AddCategoryForm;
