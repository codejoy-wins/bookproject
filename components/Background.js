'use client'
import { useEffect, useState } from 'react';
import styles from './Background.module.css';


export default function Background() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateSize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div className={`${styles.background} ${isMobile ? styles['mobile-bg'] : styles['desktop-bg']}`}>
        </div>
    );
}
