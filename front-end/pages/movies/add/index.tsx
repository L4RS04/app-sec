import React from 'react';
import AddMovie from '../../../components/movies/AddMovie';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AddMoviePage: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <div>
            <AddMovie />
        </div>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default AddMoviePage;