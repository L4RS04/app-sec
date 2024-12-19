import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import WatchlistService from '@services/WatchlistService';
import MovieService from '@services/MovieService';
import SeriesService from '@services/SeriesService';
import { Watchlist, MediaItem } from '../../types';
import Head from 'next/head';
import Header from '../header';
import { ArrowLeft, Search } from 'lucide-react';

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
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'movies' | 'series'>('all');

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
        return Array.isArray(watchlist?.mediaItems) && watchlist.mediaItems.some(item => item.id === mediaId);
    };

    const filteredMedia = [...movies, ...series].filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = mediaTypeFilter === 'all' || 
            (mediaTypeFilter === 'movies' && movies.some(movie => movie.id === item.id)) ||
            (mediaTypeFilter === 'series' && series.some(serie => serie.id === item.id));
        return matchesSearch && matchesType;
    });

    if (isAuthorized === null || watchlist === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>Edit Watchlist</title>
            </Head>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border border-blue-300">
                    <div className="px-8 py-10">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
                                Edit Watchlist
                            </h1>
                            <button
                                onClick={() => router.push('/watchlists')}
                                className="flex items-center text-blue-700 hover:text-blue-900 transition-colors duration-200 font-semibold"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Watchlists
                            </button>
                        </div>
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
                                    className="block w-full px-2 py-2 text-lg border border-blue-300 rounded-md shadow-sm transition duration-150 ease-in-out"
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
                                    className="block w-full px-2 py-2 text-lg border border-blue-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <button 
                                    type="submit" 
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-lg font-extrabold text-white bg-blue-600 hover:bg-blue-900 transition duration-150 ease-in-out"
                                >
                                    Update Watchlist
                                </button>
                            </div>
                        </form>
                        <div className="mt-10 space-y-4">
                            <h3 className="text-2xl font-bold text-blue-900">Add media to the watchlist:</h3>
                            <div className="flex items-center space-x-4">
                                <div className="relative flex-grow">
                                    <input
                                        type="text"
                                        placeholder="Search movies and series..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-md shadow-sm"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                </div>
                                <select
                                    value={mediaTypeFilter}
                                    onChange={(e) => setMediaTypeFilter(e.target.value as 'all' | 'movies' | 'series')}
                                    className="px-4 py-2 border border-blue-300 rounded-md shadow-sm"
                                >
                                    <option value="all">All</option>
                                    <option value="movies">Movies</option>
                                    <option value="series">Series</option>
                                </select>
                            </div>
                        </div>
                        <ul className="mt-6 space-y-4">
                            {filteredMedia.map((mediaItem) => (
                                <li key={mediaItem.id} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg shadow">
                                    <span className="text-lg font-medium text-blue-800">{mediaItem.title}</span>
                                    <div className="flex space-x-2">
                                        {isMediaInWatchlist(mediaItem.id) ? (
                                            <button
                                                onClick={() => handleDeleteMedia(mediaItem.id)}
                                                className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-150 ease-in-out"
                                            >
                                                Remove
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleAddMedia(mediaItem.id)}
                                                className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-150 ease-in-out"
                                            >
                                                Add
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