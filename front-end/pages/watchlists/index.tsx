import Head from "next/head";
import Header from "@components/header";
import { useEffect, useState } from "react";
import type { Watchlist } from "@types";
import WatchlistOverview from "@components/watchlists/WatchlistOverview";
import WatchlistService from "@services/WatchlistService";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/router";

const Watchlists: React.FC = () => {
    const [watchlists, setWatchlists] = useState<Array<Watchlist>>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [loggedInUserName, setLoggedInUserName] = useState<string>('');
    const router = useRouter();

    const getWatchlists = async () => {
        try {
            const response = await WatchlistService.getAllWatchlists();
            const data = await response.json();
            setWatchlists(data);
        } catch (error) {
            console.error("An error occurred while fetching the watchlists: ", error);
        }
    };

    const deleteWatchlist = async (watchlistId: number) => {
        try {
            await WatchlistService.deleteWatchlist(watchlistId);
            setWatchlists(prevWatchlists => prevWatchlists.filter(watchlist => watchlist.id !== watchlistId));
        } catch (error) {
            console.error("An error occurred while deleting the watchlist: ", error);
        }
    };

    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
        if (loggedInUser) {
            setIsAuthorized(true);
            setLoggedInUserName(loggedInUser.name);
            if (loggedInUser.role === 'ADMIN') {
                setIsAdmin(true);
            }
            getWatchlists();
        } else {
            router.push('/not-authorized');
        }
    }, []);

    if (!isAuthorized) {
        return null;
    }

    const navigateToAddWatchlist = () => {
        router.push('/watchlists/add');
    };

    return (
        <>
            <Head>
                <title>Watchlists</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="mt-8 font-extrabold text-4xl">Watchlists</h1>
                <div className="flex justify-end mb-4">
                    <button onClick={navigateToAddWatchlist} className="bg-stale-200 text-blue-900 font-bold py-2 px-4 rounded">
                        <CirclePlus size={35} />
                    </button>
                </div>
                <section>
                    {watchlists.length > 0 ? (
                        <WatchlistOverview watchlists={watchlists} onDeleteWatchlist={deleteWatchlist} isAdmin={isAdmin} loggedInUserName={loggedInUserName} />
                    ) : (
                        <p>No watchlists found</p>
                    )}
                </section>
            </main>
        </>
    );
};

export default Watchlists;