import React from 'react';
import AddSeries from '../../../components/series/AddSeries';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AddSeriesPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <AddSeries />
        </div>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default AddSeriesPage;