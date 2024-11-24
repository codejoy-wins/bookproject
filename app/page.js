import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <Image
          className={styles.logo}
          src="14.svg"
          alt="My logo"
          // width={360}
          // height={72}
          width={720}
          height={144}
          priority
        /> */}
        
        {/* <Link href="/formal" className="xp">Old Book Review App</Link> */}

        {/* <div className="peace">
        <Link href="/showcase" className="xp">Review and Me</Link>
        </div>

        <img className="pic" src="/images/17.jpg" alt="booker"/> */}

        <div>
          <p>&copy; Jann Software</p>
        </div>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
            <Image
                src="/images/1.webp" // Path to your image in the public folder
                alt="Booker"
                width={500} // Native width of the image
                height={500} // Native height of the image (adjust as per actual dimensions)
                style={{ maxWidth: '100%', height: 'auto' }}
            />
        </div>


        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://maxjann.com/projects"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/70.svg"
              alt="Delta Halo TM"
              width={20}
              height={20}
            />
            projects
          </a>
          <a
            href="https://maxjann.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            <Image
              className={styles.logo}
              src="/70.svg"
              alt="Delta Halo TM"
              width={20}
              height={20}
            />
            &nbsp; maxjann.com
          </a>
        </div>
        <div className="peace">
        <Link href="/showcase" className="xp">Review and Me</Link>
        </div>

        <img className="pic" src="/images/17.jpg" alt="booker"/>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://maxjann.com/resume"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Resume
        </a>
        <a
          href="https://maxjann.com/mewthree"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          My AI Mewthree App
        </a>
        <a
          href="https://github.com/codejoy-wins"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to my github →
        </a>
      </footer>
    </div>
  );
}
