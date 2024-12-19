import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Series, Genre } from '../../types';
import SeriesService from '../../services/SeriesService';
import MediaService from '../../services/MediaService';
import Header from '../header';
import Head from 'next/head';

interface EditSeriesProps {
    seriesId: string;
    onSeriesUpdated?: () => void;
}

const EditSeries: React.FC<EditSeriesProps> = ({ seriesId, onSeriesUpdated }) => {
    const router = useRouter();
    const [series, setSeries] = useState<Series | null>(null);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
        if (loggedInUser && loggedInUser.role === 'ADMIN') {
            setIsAuthorized(true);
            const fetchSeriesAndGenres = async () => {
                try {
                    const [fetchedSeries, fetchedGenres] = await Promise.all([
                        SeriesService.getSeriesById(Number(seriesId)),
                        MediaService.getGenres()
                    ]);
                    setSeries(fetchedSeries);
                    setGenres(fetchedGenres);
                } catch (error) {
                    console.error('Error fetching series or genres:', error);
                }
            };
            fetchSeriesAndGenres();
        } else {
            setIsAuthorized(false);
            router.push('/not-authorized');
        }
    }, [router, seriesId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSeries(prevState => prevState ? ({
            ...prevState,
            [name]: name === "genres" ? value.split(",") as Genre[] : value
        }) : null);
    };

    const handleGenreToggle = (genre: Genre) => {
        setSeries(prevState => {
            if (!prevState) return null;
            const updatedGenres = prevState.genres.includes(genre)
                ? prevState.genres.filter(g => g !== genre)
                : [...prevState.genres, genre];
            return { ...prevState, genres: updatedGenres };
        });
    };

    const handleUpdateSeries = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!series) return;
        try {
            await SeriesService.updateSeries(Number(seriesId), series);
            if (onSeriesUpdated) {
                onSeriesUpdated();
            }
            router.push('/series');
        } catch (error) {
            console.error('Error updating series:', error);
        }
    };

    if (isAuthorized === null || series === null) {
        return (
            <div className="flex justify-center items-center h-screen bg-blue-50">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>  
            <Head>
                <title>Edit series</title>
            </Head>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8">
                            Edit series
                        </h1>
                        <form onSubmit={handleUpdateSeries} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={series.title}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full px-2 py-1 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={series.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="block w-full px-2 py-1 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="releaseYear" className="block text-sm font-semibold text-gray-700 mb-1">Release Year:</label>
                                    <input
                                        type="number"
                                        id="releaseYear"
                                        name="releaseYear"
                                        placeholder="YYYY"
                                        value={series.releaseYear}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full px-2 py-1 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="numberOfSeasons" className="block text-sm font-semibold text-gray-700 mb-1">Number of seasons:</label>
                                    <input
                                        type="number"
                                        id="numberOfSeasons"
                                        name="numberOfSeasons"
                                        value={series.numberOfSeasons}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full px-2 py-1 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Genres:</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {genres.map(genre => (
                                        <button
                                            key={genre}
                                            type="button"
                                            onClick={() => handleGenreToggle(genre)}
                                            className={`px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out ${
                                                series.genres.includes(genre)
                                                    ? 'bg-blue-600 text-white shadow-md'
                                                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
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
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-lg font-extrabold text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
                                >
                                    Update series
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditSeries;