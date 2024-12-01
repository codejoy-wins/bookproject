'use client'; // Ensure this page supports client-side interactions
import { useState, useEffect } from 'react';
import Background from '@/components/Background';
import CategoryForm from '@/components/CategoryForm';
import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
    const [categories, setCategories] = useState([]); // State to store categories

    // Fetch categories from the backend
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await fetch('/api/categories'); // Replace with your API endpoint
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setCategories(data); // Assume data is an array of categories
    //             } else {
    //                 console.error('Failed to fetch categories');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching categories:', error);
    //         }
    //     };

    //     fetchCategories();
    // }, []);

    // Handle adding a new category
    const handleCategoryCreated = (newCategory) => {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
    };

    return (
        <>
            <Background />
            {/* <Image
                src="/images/Awide.webp" // Path to your image in the public folder
                alt="Booker"
                width={500} // Native width of the image
                height={500} // Native height of the image (adjust as per actual dimensions)
                style={{ maxWidth: '100%', height: 'auto' }}
            /> */}
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

                {/* Display Categories */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {categories.map((category) => (
                        <Category key={category._id} title={category.name} />
                    ))}

                    {/* Special "Create Your Own" row */}
                    <Category title="Create Your Own" isPlus={true} />
                </div>

                {/* Category Form */}
                <CategoryForm onCategoryCreated={handleCategoryCreated} />
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

// Individual category row
function Category({ title, isPlus }) {
    return (
        <div
            // style={{
            //     display: 'flex',
            //     alignItems: 'center',
            //     justifyContent: 'space-between',
            //     background: 'rgba(0, 0, 0, 0.5)',
            //     borderRadius: '10px',
            //     padding: '10px 20px',
            //     fontSize: '1.5rem',
            //     fontWeight: '500',
            //     cursor: 'pointer',
            // }}
            className='category'
        >
            <span>{title}</span>
            {isPlus && <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'lime' }}>+</span>}
        </div>
    );
}
