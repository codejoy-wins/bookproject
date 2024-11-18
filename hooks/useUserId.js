'use client';

import { useEffect, useState } from 'react';

export default function useUserId() {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Check if a userId already exists in localStorage
        let storedUserId = localStorage.getItem('userId');

        if (!storedUserId) {
            // Generate a secure unique ID if none exists
            storedUserId = crypto.randomUUID();
            localStorage.setItem('userId', storedUserId); // Save to localStorage
        }

        setUserId(storedUserId); // Set the userId in state
        console.log('User ID:', storedUserId); // Debugging output
    }, []);

    return userId;
}
