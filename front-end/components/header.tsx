import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <Link href="/" className="mb-4 sm:mb-0">
                        <Image
                            src="/images/BingeVault.png"
                            alt="BingeVault logo"
                            width={250}
                            height={71}
                            className="w-auto h-auto"
                        />
                    </Link>
                    <nav className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-4">
                        <Link href="/" className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            Home
                        </Link>
                        <Link href="/watchlist" className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            Watchlists
                        </Link>
                        <Link href="/movies" className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            Movies
                        </Link>
                        <Link href="/series" className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            Series
                        </Link>
                        <Link href="/login" className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            Login
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;