import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { User } from '@types';

const Header: React.FC = () => {
    const router = useRouter();
    const [loggedInUser, setLoggedInUser] = useState<User>();

    const logOut = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(undefined);
        router.push("/");
    };

    const getLoggedInUser = () => {
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") as string);
        loggedInUser && setLoggedInUser(loggedInUser);
    };

    useEffect(() => {
        getLoggedInUser();
    }, []);
    
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
                        {!loggedInUser && (
                        <Link href="/" className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            Home
                        </Link>
                        )}
                        {loggedInUser && (
                        <Link href="/watchlist" className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            Watchlists
                        </Link>
                        )}
                        {loggedInUser && (
                        <Link href="/movies" className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            Movies
                        </Link>
                        )}
                        {loggedInUser && (
                        <Link href="/series" className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            Series
                        </Link>
                        )}
                        {loggedInUser && (
                        <Link 
                        href="/" 
                        onClick={logOut}
                        className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            Logout
                        </Link>
                        )}
                        {!loggedInUser && (
                        <Link 
                        href="/login" 
                        className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            Login
                        </Link>
                        )}
                        {!loggedInUser && (
                        <Link 
                        href="/register" 
                        className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            Register
                        </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;