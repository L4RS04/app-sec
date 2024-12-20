import React from 'react';
import AddWatchlist from '../../../components/watchlists/AddWatchlist';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AddWatchlistPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <AddWatchlist />
        </div>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default AddWatchlistPage;