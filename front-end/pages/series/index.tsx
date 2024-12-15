import Head from "next/head";
import Header from "@components/header";
import { useEffect, useState } from "react";
import type { Series } from "@types";
import SeriesOverviewTable from "@components/series/SeriesOverviewTable";
import SeriesService from "@services/SeriesService";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/router";

const Series: React.FC = () => {
    const [series, setSeries] = useState<Array<Series>>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const router = useRouter();

    const getSeries = async () => {
        try {
            const response = await SeriesService.getAllSeries();
            const data = await response.json();
            setSeries(data);
        } catch (error) {
            console.error("An error occurred while fetching the series: ", error);
        }
    };

    const createSeries = async (newSeries: Series) => {
        try {
            const addedSeries = await SeriesService.createSeries(newSeries);
            setSeries(prevSeries => [...prevSeries, addedSeries]);
        } catch (error) {
            console.error("An error occurred while creating the series: ", error);
        }
    };

    const deleteSeries = async (serieId: number) => {
        try {
            await SeriesService.deleteSeries(serieId);
            setSeries(prevSeries => prevSeries.filter(serie => serie.id !== serieId));
        } catch (error) {
            console.error("An error occurred while deleting the series: ", error);
        }
    };

    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
        if (loggedInUser) {
            setIsAuthorized(true);
            if (loggedInUser.role === 'ADMIN') {
                setIsAdmin(true);
            }
            getSeries();
        } else {
            router.push('/not-authorized');
        }
    }, []);

    if (!isAuthorized) {
        return null;
    }

    const navigateToAddSeries = () => {
        router.push('/series/add');
    };

    return (
        <>
            <Head>
                <title>Series</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="mt-8 font-extrabold text-4xl">Series</h1>
                <div className="flex justify-end mb-4">
                    {isAdmin && (
                        <button onClick={navigateToAddSeries} className="bg-stale-200 text-blue-900 font-bold py-2 px-4 rounded">
                            <CirclePlus size={35} />
                        </button>
                    )}
                </div>
                <section>
                    {series.length > 0 ? (
                        <SeriesOverviewTable series={series} onAddSeries={createSeries} onDeleteSeries={deleteSeries} isAdmin={isAdmin} />
                    ) : (
                        <p>No series found</p>
                    )}
                </section>
            </main>
        </>
    );
};

export default Series;