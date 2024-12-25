// components/Background.js
'use client'
import { useEffect, useState } from 'react';

export default function NewBackground() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateSize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div className={`background2 ${isMobile ? 'mobile-bg2' : 'desktop-bg2'}`}>
        </div>
    );
}
