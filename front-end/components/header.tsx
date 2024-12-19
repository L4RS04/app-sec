import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { User } from '@types';
import Language from './language/Language';
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {
    const router = useRouter();
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const { t } = useTranslation();

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
                            {t('home')}
                        </Link>
                        )}
                        {loggedInUser && (
                        <Link href="/watchlists" className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            {t('watchlists')}
                        </Link>
                        )}
                        {loggedInUser && (
                        <Link href="/movies" className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            {t('movies')}
                        </Link>
                        )}
                        {loggedInUser && (
                        <Link href="/series" className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            {t('series')}
                        </Link>
                        )}
                        {loggedInUser && (
                        <Link 
                        href="/" 
                        onClick={logOut}
                        className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            {t('logout')}
                        </Link>
                        )}
                        {!loggedInUser && (
                        <Link 
                        href="/login" 
                        className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            {t('login')}
                        </Link>
                        )}
                        {!loggedInUser && (
                        <Link 
                        href="/register" 
                        className="text-lg font-medium text-[#1429b1] no-underline transition-colors duration-300 hover:text-[#007bff] px-2 py-1 rounded hover:bg-gray-100">
                            {t('register')}
                        </Link>
                        )}
                        <Language />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;