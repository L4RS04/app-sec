import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EditMovie from '../../../components/movies/EditMovie';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const EditMoviePage: React.FC = () => {
    const router = useRouter();
    const { mediaId } = router.query;
    const [id, setId] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (typeof mediaId === 'string') {
            setId(mediaId);
        }
    }, [mediaId]);

    if (id === null) {
        return <div>{t('loading')}</div>;
    }

    return (
        <div>
            <EditMovie movieId={id} />
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

export default EditMoviePage;