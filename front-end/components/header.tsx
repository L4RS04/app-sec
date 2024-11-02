import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/header.module.css';

const Header: React.FC = () => {
    return (
        <header className="bg-white flex items-center justify-around p-4 border-bottom">
            <div className={styles.headerContainer}>
                <a href="/" className="fs-2 mb-2 mb-lg-0">
                    <Image
                        src="/images/BingeVault.png"
                        alt="BingeVault logo"
                        width={350}
                        height={100}
                    />
                </a>
                <nav className={styles.nav}>
                    <Link href="/" className={`${styles.navLink} px-4`}>
                        Home
                    </Link>
                    <Link href="/watchlists" className={`${styles.navLink} px-4`}>
                        Watchlists
                    </Link>
                    <Link href="/" className={`${styles.navLink} px-4`}>
                        Movies 
                    </Link>
                    <Link href="/" className={`${styles.navLink} px-4`}>
                        Series
                    </Link>
                    <Link href="/" className={`${styles.navLink} px-4`}>
                        Login 
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
