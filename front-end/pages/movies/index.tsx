import Head from "next/head";
import Header from "@components/header";
import { useEffect, useState } from "react";
import { Movie } from "@types";
import MovieOverviewTable from "@components/movies/MovieOverviewTable";
import MovieService from "@services/MovieService";


const Movies: React.FC = () => {
    const [movies, setMovies] = useState<Array<Movie>>();

    const getMovies = async () => {
        const response = await MovieService.getAllMovies();
        const data = await response.json();
        setMovies(data);
    }

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
                <h1>Movies</h1>
                <section>
                    {movies && ( 
                    <MovieOverviewTable movies={movies} />
                    )}
                </section>
            </main>
        </>
    )
};

export default Movies;