import Head from "next/head";
import Header from "@components/header";
import { useEffect, useState } from "react";
import { Movie } from "@types";
import MovieOverviewTable from "@components/movies/MovieOverviewTable";
import MovieService from "@services/MovieService";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Movies: React.FC = () => {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const router = useRouter();
    const { t } = useTranslation();

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

    const deleteMovie = async (movieId: number) => {
        try {
            await MovieService.deleteMovie(movieId);
            setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
        } catch (error) {
            console.error("An error occurred while deleting the movie: ", error);
        }
    };

    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
        if (loggedInUser) {
            setIsAuthorized(true);
            if (loggedInUser.role === 'ADMIN') {
                setIsAdmin(true);
            }
            getMovies();
        } else {
            router.push('/not-authorized');
        }
    }, []);

    if (!isAuthorized) {
        return null;
    }

    const navigateToAddMovie = () => {
        router.push('/movies/add');
    };

    return (
        <>
            <Head>
                <title>{t('movies')}</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="mt-8 font-extrabold text-4xl">{t('movies')}</h1>
                <div className="flex justify-end mb-4">
                    {isAdmin && (
                        <button onClick={navigateToAddMovie} className="bg-stale-200 text-blue-900 font-bold py-2 px-4 rounded">
                            <CirclePlus size={35} />
                        </button>
                    )}
                </div>
                <section>
                    {movies.length > 0 ? (
                        <MovieOverviewTable movies={movies} onAddMovie={createMovie} onDeleteMovie={deleteMovie} isAdmin={isAdmin} />
                    ) : (
                        <p>{t('nomoviesfound')}</p>
                    )}
                </section>
            </main>
        </>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default Movies;