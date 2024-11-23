'use client'; // For client-side rendering (Next.js 13+)

import Image from 'next/image';
import styles from './AtriusShowcase.module.css';

export default function AtriusShowcase() {
  return (
    <div className={styles.container}>
      {/* Main Image Section */}
      <div className={styles.imageContainer}>
        <Image
          src= "/images/11.webp"
          alt="Aurius"
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      </div>

      {/* Functional Form Section */}
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <h2 className={styles.formTitle}>Get Updates from Atrius</h2>
          <label htmlFor="email" className={styles.label}>
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
