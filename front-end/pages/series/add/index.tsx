import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Series, Genre } from '../../../types';
import SeriesService from '../../../services/SeriesService';
import MediaService from '../../../services/MediaService';
import Header from '../../../components/header';

export default function AddSeries() {
    const router = useRouter();
    const [newSeries, setNewSeries] = useState<Series>({
        genres: [],
        type: "SERIES"
    });
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
        if (loggedInUser && loggedInUser.role === 'ADMIN') {
            setIsAuthorized(true);
            const getGenres = async () => {
                try {
                    const genres = await MediaService.getGenres();
                    setGenres(genres);
                } catch (error) {
                    console.error('Error fetching genres:', error);
                }
            };
            getGenres();
        } else {
            setIsAuthorized(false);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewSeries(prevState => ({
            ...prevState,
            [name]: name === "genres" ? value.split(",") as Genre[] : value
        }));
    };

    const handleGenreToggle = (genre: Genre) => {
        setNewSeries(prevState => {
            const updatedGenres = prevState.genres.includes(genre)
                ? prevState.genres.filter(g => g !== genre)
                : [...prevState.genres, genre];
            return { ...prevState, genres: updatedGenres };
        });
    };

    const handleAddSeries = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await SeriesService.createSeries(newSeries as Series);
            router.push('/series');
        } catch (error) {
            console.error('Error adding series:', error);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-50">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-red-600">You are not authorized to access this page!</h1>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <h1 className="text-3xl font-extrabold text-center text-blue-900 mb-8">
                            Add a series to the application
                        </h1>
                        <form onSubmit={handleAddSeries} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newSeries.title}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={newSeries.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="block w-full px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700 mb-1">Release Year:</label>
                                    <input
                                        type="number"
                                        id="releaseYear"
                                        name="releaseYear"
                                        placeholder="YYYY"
                                        value={newSeries.releaseYear}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="numberOfSeasons" className="block text-sm font-medium text-gray-700 mb-1">Number of seasons:</label>
                                    <input
                                        type="number"
                                        id="numberOfSeasons"
                                        name="numberOfSeasons"
                                        value={newSeries.numberOfSeasons}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Genres:</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {genres.map(genre => (
                                        <button
                                            key={genre}
                                            type="button"
                                            onClick={() => handleGenreToggle(genre)}
                                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out ${
                                                newSeries.genres.includes(genre)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                            }`}
                                        >
                                            {genre}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <button 
                                    type="submit" 
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-lg font-extrabold text-white bg-[#1429b1] hover:bg-[#007bff]"
                                >
                                    Add series
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}