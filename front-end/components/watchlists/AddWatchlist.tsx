import React, { useState } from "react";
import { useRouter } from 'next/router';
import { Watchlist } from "../../types";
import WatchlistService from "@services/WatchlistService";

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
        <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add New Watchlist</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
                    >
                        Add Watchlist
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddWatchlist;