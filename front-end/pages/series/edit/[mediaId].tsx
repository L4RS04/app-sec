import React from 'react';
import { useRouter } from 'next/router';
import EditSeries from '../../../components/series/EditSeries';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';


const EditSeriesPage: React.FC = () => {
    const router = useRouter();
    const { mediaId } = router.query;
    const { t } = useTranslation();

    if (typeof mediaId !== 'string') {
        return <div>{t('loading')}</div>;
    }

    return (
        <div>
            <EditSeries seriesId={mediaId} />
        </div>
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

export default EditSeriesPage;