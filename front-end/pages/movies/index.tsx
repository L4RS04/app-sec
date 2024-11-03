import Head from "next/head";
import Header from "@components/header";
import { useEffect, useState } from "react";
import { Movie } from "@types";
import MovieOverviewTable from "@components/movies/MovieOverviewTable";
import MovieService from "@services/MovieService";


const Movies: React.FC = () => {
    const [movies, setMovies] = useState<Array<Movie>>([]);

    const getMovies = async () => {
        try {
            const response = await MovieService.getAllMovies();
        const data = await response.json();
        setMovies(data);
    } catch (error) {
        console.error("An error occurred while fetching the movies: ", error);
    }
};

    const createMovie = async (newMovie: Movie) => {
        try {
            const addedMovie = await MovieService.createMovie(newMovie);
            setMovies(prevMovies => [...prevMovies, addedMovie]);
        } catch (error) {
            console.error("An error occurred while creating the movie: ", error);
        }
    };

    useEffect(() => {
        getMovies()
    },
    []
    )


    return (
        <>
            <Head>
                <title>Movies</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="mt-8">Movies</h1>
                <section>
                    {movies.length > 0 ? ( 
                    <MovieOverviewTable movies={movies} onAddMovie={createMovie} />
                    ) : (
                        <p>No movies found</p>
                    )}
                </section>
            </main>
        </>
    )
};

export default Movies;