import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Serie, Genre } from '@types';
import SeriesService from '@services/SeriesService';
import Head from 'next/head';
import Header from '@components/header';
import MediaService from '@services/MediaService';


const AddSeries: React.FC = () => {
    const router = useRouter();
    const [newSeries, setNewSeries] = useState<Serie>({
        genres: [],
        type: "Series"
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
        setNewSeries(prevState => ({
            ...prevState,
            [name]: name === "genres" ? value.split(",") as Genre[] : value
        }));
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setNewSeries(prevState => {
            const genres = checked
                ? [...prevState.genres, value as Genre]
                : prevState.genres.filter(genre => genre !== value);
            return { ...prevState, genres };
        });
    };

    const handleAddMovie = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await SeriesService.createSeries(newSeries as Serie);
            router.push('/series'); 
        } catch (error) {
            console.error('Error adding series:', error);
        }
    };

    

    return (
        <>
        <Head>
            <title>Add Series</title>
        </Head>
        <Header />
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Add a new series</h1>
            <form onSubmit={handleAddMovie} className="mb-4">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title:</label>
                    <input 
                        type="text"
                        name="title"
                        value={newSeries.title}
                        onChange={handleInputChange}
                        required
                        className='border p-2 w-full'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Description:</label>
                    <textarea
                        name="description"
                        value={newSeries.description}
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
                        value={newSeries.releaseYear}
                        onChange={handleInputChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="numberOfSeasons" className="block text-gray-700">Number of seasons:</label>
                    <input
                        type="number"
                        name="numberOfSeasons"
                        value={newSeries.numberOfSeasons}
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
                                    checked={newSeries.genres.includes(genre)}
                                    onChange={handleGenreChange}
                                    className="mr-2"
                                />
                                <label htmlFor={genre} className="text-gray-700">{genre}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Add series</button>
            </form>
        </div>
    </>
    );
};

export default AddSeries;