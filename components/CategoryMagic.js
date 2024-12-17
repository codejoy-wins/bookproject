"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CategoryMagic = (elam) => {
    const [categories, setCategories] = useState([]);
    console.log("**********");
    if(elam){
        console.log(elam);
        console.log(elam.elam);
    }else{
        console.log("what the heaven");
    }
    console.log("********");

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
  <>
    <div>
      {categories
        .filter((category) => category._id === elam.elam) // Filter categories by ID
        .map((category) => (
          <div key={category._id}>
            <h2>{category.name} Category</h2>
            <div>
              {category.items.map((item) => (
                <Link key={item._id} href={`/items/${item._id}`}>
                  <div className='pikachu'>
                    <p>{item.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  </>
);
    
};

export default CategoryMagic;
