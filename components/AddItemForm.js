import { useState } from 'react';

const AddItemForm = ({ categoryId, onAdd }) => {
    const [isEditing, setIsEditing] = useState(false); // Whether the input is visible
    const [itemName, setItemName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!itemName) return;

        try {
            const res = await fetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: itemName, categoryId }),
            });

            if (!res.ok) {
                throw new Error('Failed to add item');
            }

            const newItem = await res.json();
            onAdd(newItem); // Refresh category items
            setItemName('');
            setIsEditing(false); // Hide the input again
        } catch (error) {
            console.error('Error adding item:', error.message);
        }
    };

    return (
        <div style={styles.itemBox}>
            {isEditing ? (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="New item name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.saveButton}>
                        ✓
                    </button>
                </form>
            ) : (
                <button onClick={() => setIsEditing(true)} style={styles.addButton}>
                    +
                </button>
            )}
        </div>
    );
};

const styles = {
    itemBox: {
        padding: '8px 12px',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: '#fff',
        borderRadius: '5px',
        textAlign: 'center',
        minWidth: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    input: {
        padding: '6px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '0.9rem',
        minWidth: '120px',
    },
    saveButton: {
        padding: '6px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    addButton: {
        padding: '8px',
        backgroundColor: 'rgba(0, 123, 255, 0.3)', // Transparent blue
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        fontSize: '1.5rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Add subtle shadow
        transition: 'background-color 0.3s ease', // Smooth hover effect
    },
    
};

export default AddItemForm;
