import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import WatchlistService from '@services/WatchlistService';
import MovieService from '@services/MovieService';
import SeriesService from '@services/SeriesService';
import { Watchlist, MediaItem } from '../../types';
import Head from 'next/head';
import Header from '../header';

interface EditWatchlistProps {
    watchlistId: string;
    onWatchlistUpdated?: () => void;
}

const EditWatchlist: React.FC<EditWatchlistProps> = ({ watchlistId, onWatchlistUpdated }) => {
    const router = useRouter();
    const [watchlist, setWatchlist] = useState<Watchlist | null>(null);
    const [movies, setMovies] = useState<MediaItem[]>([]);
    const [series, setSeries] = useState<MediaItem[]>([]);
    const [newName, setNewName] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
        if (loggedInUser) {
            setIsAuthorized(true);
            const fetchWatchlistAndMediaItems = async () => {
                try {
                    const [fetchedWatchlist, fetchedMovies, fetchedSeries] = await Promise.all([
                        WatchlistService.getWatchlistById(Number(watchlistId)),
                        MovieService.getAllMovies(),
                        SeriesService.getAllSeries()
                    ]);

                    if (!fetchedWatchlist.ok) {
                        throw new Error(`Error fetching watchlist: ${fetchedWatchlist.statusText}`);
                    }
                    if (!fetchedMovies.ok) {
                        throw new Error(`Error fetching movies: ${fetchedMovies.statusText}`);
                    }
                    if (!fetchedSeries.ok) {
                        throw new Error(`Error fetching series: ${fetchedSeries.statusText}`);
                    }

                    const watchlistData = await fetchedWatchlist.json();
                    setWatchlist(watchlistData);
                    setNewName(watchlistData.name);
                    setNewDescription(watchlistData.description);
                    setMovies(await fetchedMovies.json());
                    setSeries(await fetchedSeries.json());
                } catch (error) {
                    console.error('Error fetching watchlist or media items:', error);
                }
            };
            fetchWatchlistAndMediaItems();
        } else {
            setIsAuthorized(false);
            router.push('/not-authorized');
        }
    }, [router, watchlistId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setNewName(value);
        } else if (name === 'description') {
            setNewDescription(value);
        }
    };

    const handleUpdateWatchlist = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!watchlist) return;
        const updates = { name: newName, description: newDescription };
        try {
            if (watchlist.id !== undefined) {
                await WatchlistService.updateWatchlist(watchlist.id, updates);
                const updatedWatchlist = await WatchlistService.getWatchlistById(watchlist.id);
                setWatchlist(await updatedWatchlist.json());
                if (onWatchlistUpdated) {
                    onWatchlistUpdated();
                }
            } else {
                throw new Error('Watchlist ID is undefined');
            }
        } catch (error) {
            console.error('Error updating watchlist:', error);
        }
    };

    const handleAddMedia = async (mediaId: number) => {
        if (watchlist) {
            try {
                if (watchlist.id !== undefined) {
                    await WatchlistService.addMediaToWatchlist(watchlist.id, mediaId);
                    const updatedWatchlist = await WatchlistService.getWatchlistById(watchlist.id);
                    setWatchlist(await updatedWatchlist.json());
                } else {
                    throw new Error('Watchlist ID is undefined');
                }
            } catch (error) {
                console.error('Error adding media to watchlist:', error);
            }
        }
    };

    const handleDeleteMedia = async (mediaId: number) => {
        if (watchlist) {
            try {
                if (watchlist.id !== undefined) {
                    await WatchlistService.deleteMediaFromWatchlist(watchlist.id, mediaId);
                    const updatedWatchlist = await WatchlistService.getWatchlistById(watchlist.id);
                    setWatchlist(await updatedWatchlist.json());
                } else {
                    throw new Error('Watchlist ID is undefined');
                }
            } catch (error) {
                console.error('Error deleting media from watchlist:', error);
            }
        }
    };

    const isMediaInWatchlist = (mediaId: number) => {
        return watchlist?.mediaItems.some(item => item.id === mediaId);
    };

    if (isAuthorized === null || watchlist === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>Edit Watchlist</title>
            </Head>
            <Header />
            <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <h1 className="text-3xl font-extrabold text-center text-blue-900 mb-8">
                            Edit Watchlist
                        </h1>
                        <form onSubmit={handleUpdateWatchlist} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newName}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full px-2 py-1 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={newDescription}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="block w-full px-2 py-1 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <button 
                                    type="submit" 
                                    className="w-full flex justify-center py-1 border border-transparent rounded-md text-lg font-extrabold text-white bg-[#1429b1] hover:bg-[#007bff]"
                                >
                                    Update Watchlist
                                </button>
                            </div>
                        </form>
                        <h3 className="text-xl font-bold mb-4 mt-6">Movies</h3>
                        <ul>
                            {movies.map((mediaItem) => (
                                <li key={mediaItem.id} className="flex justify-between items-center mb-2">
                                    <span>{mediaItem.title}</span>
                                    <div className="flex space-x-2">
                                        {isMediaInWatchlist(mediaItem.id) ? (
                                            <button
                                                onClick={() => handleDeleteMedia(mediaItem.id)}
                                                className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700 transition-colors duration-200"
                                            >
                                                Remove from Watchlist
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleAddMedia(mediaItem.id)}
                                                className="bg-green-500 text-white font-bold py-1 px-2 rounded hover:bg-green-700 transition-colors duration-200"
                                            >
                                                Add to Watchlist
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <h3 className="text-xl font-bold mb-4 mt-6">Series</h3>
                        <ul>
                            {series.map((mediaItem) => (
                                <li key={mediaItem.id} className="flex justify-between items-center mb-2">
                                    <span>{mediaItem.title}</span>
                                    <div className="flex space-x-2">
                                        {isMediaInWatchlist(mediaItem.id) ? (
                                            <button
                                                onClick={() => handleDeleteMedia(mediaItem.id)}
                                                className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700 transition-colors duration-200"
                                            >
                                                Remove from Watchlist
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleAddMedia(mediaItem.id)}
                                                className="bg-green-500 text-white font-bold py-1 px-2 rounded hover:bg-green-700 transition-colors duration-200"
                                            >
                                                Add to Watchlist
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditWatchlist;