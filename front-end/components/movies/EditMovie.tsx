import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Movie, Genre } from '../../types';
import MovieService from '../../services/MovieService';
import MediaService from '../../services/MediaService';
import Header from '../header';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

interface EditMovieProps {
    movieId: string;
    onMovieUpdated?: () => void;
}

const EditMovie: React.FC<EditMovieProps> = ({ movieId, onMovieUpdated }) => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
        if (loggedInUser && loggedInUser.role === 'ADMIN') {
            setIsAuthorized(true);
            const fetchMovieAndGenres = async () => {
                try {
                    const [fetchedMovie, fetchedGenres] = await Promise.all([
                        MovieService.getMovieById(Number(movieId)),
                        MediaService.getGenres()
                    ]);
                    setMovie(fetchedMovie);
                    setGenres(fetchedGenres);
                } catch (error) {
                    console.error(t('fetchMovieOrGenresError'), error);
                }
            };
            fetchMovieAndGenres();
        } else {
            setIsAuthorized(false);
            router.push('/not-authorized');
        }
    }, [router, movieId, t]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMovie(prevState => prevState ? ({
            ...prevState,
            [name]: name === "genres" ? value.split(",") as Genre[] : value
        }) : null);
    };

    const handleGenreToggle = (genre: Genre) => {
        setMovie(prevState => {
            if (!prevState) return null;
            const updatedGenres = prevState.genres.includes(genre)
                ? prevState.genres.filter(g => g !== genre)
                : [...prevState.genres, genre];
            return { ...prevState, genres: updatedGenres };
        });
    };

    const handleUpdateMovie = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!movie) return;
        try {
            await MovieService.updateMovie(Number(movieId), movie);
            if (onMovieUpdated) {
                onMovieUpdated();
            }
            router.push('/movies');
        } catch (error) {
            console.error(t('updateMovieError'), error);
        }
    };

    if (isAuthorized === null || movie === null) {
        return (
            <div className="flex justify-center items-center h-screen bg-blue-50">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>  
            <Head>
                <title>{t('editMovie')}</title>
            </Head>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8">
                            {t('editMovie')}
                        </h1>
                        <form onSubmit={handleUpdateMovie} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">{t('title')}:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={movie.title}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full px-2 py-1 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">{t('description')}:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={movie.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="block w-full px-2 py-1 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="releaseYear" className="block text-sm font-semibold text-gray-700 mb-1">{t('releaseYear')}:</label>
                                    <input
                                        type="number"
                                        id="releaseYear"
                                        name="releaseYear"
                                        placeholder="YYYY"
                                        value={movie.releaseYear}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full px-2 py-1 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-1">{t('duration')} ({t('minutes')}):</label>
                                    <input
                                        type="number"
                                        id="duration"
                                        name="duration"
                                        value={movie.duration}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full px-2 py-1 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="director" className="block text-sm font-semibold text-gray-700 mb-1">{t('director')}:</label>
                                <input
                                    type="text"
                                    id="director"
                                    name="director"
                                    value={movie.director}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full px-2 py-1 text-lg border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('genres')}:</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {genres.map(genre => (
                                        <button
                                            key={genre}
                                            type="button"
                                            onClick={() => handleGenreToggle(genre)}
                                            className={`px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out ${
                                                movie.genres.includes(genre)
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
                                    {t('updateMovie')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditMovie;