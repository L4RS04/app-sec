import React from 'react';
import EditWatchlist from '@components/watchlists/EditWatchlist';
import { useRouter } from 'next/router';

const EditWatchlistPage: React.FC = () => {
    const router = useRouter();
    const { watchlistId } = router.query;

    if (!watchlistId) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <EditWatchlist watchlistId={watchlistId as string} />
        </>
    );
};

export default EditWatchlistPage;