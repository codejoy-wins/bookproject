'use client';

import { useState, useEffect } from 'react';
import Background from '@/components/Background';
import AddCategoryForm from '@/components/AddCategoryForm';
import AddItemForm from '@/components/AddItemForm';
import Link from 'next/link';
import Head from 'next/head';

export default function HomePage() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                if (!res.ok) throw new Error('Failed to fetch categories');
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error('Error fetching categories:', err.message);
                setError(err.message);
            }
        };
        fetchCategories();
    }, []);

    const refreshCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error('Error refreshing categories:', err.message);
            setError(err.message);
        }
    };

    return (
        <>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </Head>
        <Background />
        <div>
            <a href='https://www.maxjann.com'><h1 style={styles.heading}>Review and Me</h1></a>
            
            {error && <p style={styles.error}>Error: {error}</p>}
            <div style={styles.categoryContainer}>
                {categories.map((category) => (
                    <div key={category._id} style={styles.categoryRow}>
                        <span style={styles.categoryTitle}>{category.name}:</span>
                        <div style={styles.itemsContainer}>
                            {category.items && category.items.length > 0 ? (
                                category.items.map((item) => (
                                    <div key={item._id} style={styles.itemBox}>
                                        {item.name}
                                    </div>
                                ))
                            ) : (
                                <div style={styles.itemBox}>No items yet</div>
                            )}
                            <AddItemForm
                                categoryId={category._id}
                                onAdd={refreshCategories}
                                buttonStyle={styles.addButton}
                            />
                        </div>
                    </div>
                ))}
                <div style={styles.createCategoryRow}>
                    <AddCategoryForm onAdd={refreshCategories} />
                </div>
            </div>
        </div>
        </>
    );
}

const styles = {
    heading: {
        textAlign: 'center',
        marginTop: '20px',
        color: 'azure',
        fontSize: '2rem',
        textShadow: '0px 2px 5px rgba(0, 0, 0, 0.6)',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    categoryContainer: {
        marginTop: '217px', // Move down from the top of the page
        marginLeft: '20px', // Optional: Add left spacing if needed
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    
    categoryRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'rgba(34, 139, 134, 0.42)',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    categoryTitle: {
        fontWeight: 'bold',
        color: '#fff',
    },
    itemsContainer: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        flex: 1,
    },
    itemBox: {
        padding: '8px 12px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        color: '#fff',
        borderRadius: '5px',
        textAlign: 'center',
        minWidth: '80px',
    },
    addButton: {
        padding: '8px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '1.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createCategoryRow: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'flex-start', // Align to the left
        alignItems: 'center',
    },
    
};
