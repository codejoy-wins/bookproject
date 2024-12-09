'use client'; // Ensure this page supports client-side interactions
import { useState, useEffect } from 'react';
import Background from '@/components/Background';
import CategoryForm from '@/components/CategoryForm';
import Image from 'next/image';
import Link from 'next/link';
import CategoryList from '@/components/CategoryList';
import AddCategoryForm from '@/components/AddCategoryForm';
import AddItemForm from '@/components/AddItemForm';


export default function Home() {
    const [categories, setCategories] = useState([]); // State to store categories

    const refreshCategories = async () => {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
    };

    return (
        <>
            <Background />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    gap: '20px',
                    color: 'white',
                    marginTop: '300px',
                }}
            >
                <h1
                    style={{
                        textAlign: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                    }}
                >
                    <Link href="/showcase" className="xyp">Review and Me</Link>
                </h1>
            </div>
                    {/* Footer */}
                    <footer
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    textAlign: 'center',
                    padding: '10px 0',
                    background: 'rgba(0, 0, 0, 0.71)',
                    color: 'white',
                }}
            >
                <p style={{ margin: 0 }}>
                    © {new Date().getFullYear()} 
                    <Link href="/old" className="xpert">Jann Software</Link>

                </p>
            </footer>
        </>
    );
}