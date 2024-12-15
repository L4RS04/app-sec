import Header from '@components/header';
import Head from 'next/head';
import React from 'react';

const NotAuthorized: React.FC = () => {
    return (
        <>
            <Head>
                <title>Not Authorized</title>
            </Head>
            <div className="min-h-screen flex flex-col bg-blue-50">
                <Header/>
                <div className="flex-grow flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h1 className="text-2xl font-bold text-red-600">You are not authorized to access this page!</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotAuthorized;