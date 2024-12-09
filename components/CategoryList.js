import { useEffect, useState } from 'react';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from the backend
        const fetchCategories = async () => {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <h2>Categories</h2>
            {categories.length > 0 ? (
                categories.map((category) => (
                    <div key={category._id}>
                        <h3>{category.name}</h3>
                        <ul>
                            {category.items.map((item) => (
                                <li key={item._id}>{item.name} ({item.type})</li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No categories available.</p>
            )}
        </div>
    );
};

export default CategoryList;
