import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Movie, Genre } from '../../types';
import MovieService from '../../services/MovieService';
import MediaService from '../../services/MediaService';
import Header from '../header';
import Head from 'next/head';

interface EditMovieProps {
    movieId: string;
    onMovieUpdated?: () => void;
}

const EditMovie: React.FC<EditMovieProps> = ({ movieId, onMovieUpdated }) => {
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
                    console.error('Error fetching movie or genres:', error);
                }
            };
            fetchMovieAndGenres();
        } else {
            setIsAuthorized(false);
            router.push('/not-authorized');
        }
    }, [router, movieId]);

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
            console.error('Error updating movie:', error);
        }
    };

    if (isAuthorized === null || movie === null) {
        return <div>Loading...</div>;
    }

    return (
        <>  
            <Head>
                <title>Edit movie</title>
            </Head>
            <Header />
            <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <h1 className="text-3xl font-extrabold text-center text-blue-900 mb-8">
                            Edit movie
                        </h1>
                        <form onSubmit={handleUpdateMovie} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
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
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
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
                                    <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700 mb-1">Release Year:</label>
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
                                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes):</label>
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
                                <label htmlFor="director" className="block text-sm font-medium text-gray-700 mb-1">Director:</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Genres:</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {genres.map(genre => (
                                        <button
                                            key={genre}
                                            type="button"
                                            onClick={() => handleGenreToggle(genre)}
                                            className={`px-1 py-2 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out ${
                                                movie.genres.includes(genre)
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
                                    className="w-full flex justify-center py-1 border border-transparent rounded-md text-lg font-extrabold text-white bg-[#1429b1] hover:bg-[#007bff]"
                                >
                                    Update movie
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