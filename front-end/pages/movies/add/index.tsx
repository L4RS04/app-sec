import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Movie, Genre } from '../../../types';
import MovieService from '../../../services/MovieService';
import MediaService from '../../../services/MediaService';
import Head from 'next/head';
import Header from '@components/header';

const AddMovie: React.FC = () => {
    const router = useRouter();
    const [newMovie, setNewMovie] = useState<Movie>({
        genres: [],
        type: "MOVIE"
    });
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const genres = await MediaService.getGenres();
                setGenres(genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        getGenres();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewMovie(prevState => ({
            ...prevState,
            [name]: name === "genres" ? value.split(",") as Genre[] : value
        }));
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setNewMovie(prevState => {
            const genres = checked
                ? [...prevState.genres, value as Genre]
                : prevState.genres.filter(genre => genre !== value);
            return { ...prevState, genres };
        });
    };

    const handleAddMovie = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await MovieService.createMovie(newMovie as Movie);
            router.push('/movies');
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    return (
        <>
            <Head>
                <title>Add Movie</title>
            </Head>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="px-6 py-4 text-center">
                        <h1 className="mt-6 text-center text-2xl font-extrabold text-[#1429b1]">
                            Add a movie to the application
                        </h1>
                    </div>
                    <form onSubmit={handleAddMovie} className="px-6 py-4 space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input 
                                type="text"
                                id="title"
                                name="title"
                                value={newMovie.title}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm p-3 text-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="director" className="block text-sm font-medium text-gray-700">Director</label>
                            <input
                                type="text"
                                id="director"
                                name="director"
                                value={newMovie.director}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm p-3 text-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={newMovie.description}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm p-3 text-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">Release Year</label>
                            <input
                                type="number"
                                id="releaseYear"
                                name="releaseYear"
                                placeholder="YYYY"
                                value={newMovie.releaseYear}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm p-3 text-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                value={newMovie.duration}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm p-3 text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Genres</label>
                            <div className="grid grid-cols-2 gap-4">
                                {genres.map(genre => (
                                    <div key={genre} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={genre}
                                            value={genre}
                                            checked={newMovie.genres.includes(genre)}
                                            onChange={handleGenreChange}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                        <label htmlFor={genre} className="ml-2 block text-sm text-gray-700">{genre}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <button 
                                type="submit" 
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1429b1] hover:bg-[#007bff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Add movie
                            </button>
                        </div>
                    </form>
                </div>  
            </div>
        </>
    );
};

export default AddMovie;