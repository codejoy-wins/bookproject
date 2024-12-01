// components/Background.js
'use client'
import { useEffect, useState } from 'react';

export default function Background() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateSize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div className={`background ${isMobile ? 'mobile-bg' : 'desktop-bg'}`}>
        </div>
    );
}
