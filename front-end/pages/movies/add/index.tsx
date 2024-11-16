import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Movie, Genre } from '@types';
import MovieService from '@services/MovieService';
import Head from 'next/head';
import Header from '@components/header';
import MediaService from '@services/MediaService';


const AddMovie: React.FC = () => {
    const router = useRouter();
    const [newMovie, setNewMovie] = useState<Movie>({
        genres: [],
        type: "Movie"
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Add a new movie</h1>
            <form onSubmit={handleAddMovie} className="mb-4">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title:</label>
                    <input 
                        type="text"
                        name="title"
                        value={newMovie.title}
                        onChange={handleInputChange}
                        required
                        className='border p-2 w-full'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="director" className="block text-gray-700">Director:</label>
                    <input
                        type="text"
                        name="director"
                        value={newMovie.director}
                        onChange={handleInputChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Description:</label>
                    <textarea
                        name="description"
                        value={newMovie.description}
                        onChange={handleInputChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="releaseYear" className="block text-gray-700">Release Year:</label>
                    <input
                        type="number"
                        name="releaseYear"
                        placeholder='YYYY'
                        value={newMovie.releaseYear}
                        onChange={handleInputChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="duration" className="block text-gray-700">Duration (minutes):</label>
                    <input
                        type="number"
                        name="duration"
                        value={newMovie.duration}
                        onChange={handleInputChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Genres:</label>
                    <div className='grid grid-cols-2'>
                        {genres.map(genre => (
                            <div key={genre} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={genre}
                                    value={genre}
                                    checked={newMovie.genres.includes(genre)}
                                    onChange={handleGenreChange}
                                    className="mr-2"
                                />
                                <label htmlFor={genre} className="text-gray-700">{genre}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Add movie</button>
            </form>
        </div>
    </>
    );
};

export default AddMovie;