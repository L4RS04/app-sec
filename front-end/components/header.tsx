import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
    return (
        <header className="bg-white flex items-center justify-around p-4 border-b">
            <div className="flex items-center justify-between w-full">
                <a href="/" className="text-2xl mb-2">
                    <Image
                        src="/images/BingeVault.png"
                        alt="BingeVault logo"
                        width={350}
                        height={100}
                    />
                </a>
                <nav className="flex">
                    <Link href="/" className="text-xl font-sans text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-4">
                        Home
                    </Link>
                    <Link href="/watchlist" className="text-xl font-sans text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-4">
                        Watchlists
                    </Link>
                    <Link href="/movies" className="text-xl font-sans text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-4">
                        Movies
                    </Link>
                    <Link href="/series" className="text-xl font-sans text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-4">
                        Series
                    </Link>
                    <Link href="/" className="text-xl font-sans text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-4">
                        Login
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
