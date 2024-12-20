import React from 'react';
import EditWatchlist from '@components/watchlists/EditWatchlist';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';

const EditWatchlistPage: React.FC = () => {
    const { t } = useTranslation();

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ['common'])),
        }
    };
};

export default EditWatchlistPage;