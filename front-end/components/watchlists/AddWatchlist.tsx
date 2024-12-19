import React, { useState } from "react";
import { useRouter } from 'next/router';
import { Watchlist } from "../../types";
import WatchlistService from "@services/WatchlistService";
import Head from 'next/head';
import Header from '../header';
import { ArrowLeft } from 'lucide-react';

const AddWatchlist: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const newWatchlist: Watchlist = {
            name,
            description,
            creationDate: new Date(),
            user: { id: 0, name: '', role: '' }, 
            mediaItems: []
        };

        try {
            await WatchlistService.createWatchlist(newWatchlist);
            router.push('/watchlists');
        } catch (error) {
            setError("An error occurred while creating the watchlist.");
            console.error("An error occurred while creating the watchlist: ", error);
        }
    };

    return (
        <>
            <Head>
                <title>Add New Watchlist</title>
            </Head>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border border-blue-300">
                    <div className="px-8 py-10">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
                                Add New Watchlist
                            </h1>
                            <button
                                onClick={() => router.push('/watchlists')}
                                className="flex items-center text-blue-700 hover:text-blue-900 transition-colors duration-200 font-semibold"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Watchlists
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="block w-full px-4 py-2 text-lg border border-blue-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    rows={4}
                                    className="block w-full px-4 py-2 text-lg border border-blue-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                />
                            </div>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Error: </strong>
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            )}
                            <div>
                                <button 
                                    type="submit" 
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-lg font-extrabold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                >
                                    Add Watchlist
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddWatchlist;

