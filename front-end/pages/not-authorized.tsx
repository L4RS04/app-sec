import Header from '@components/header';
import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const NotAuthorized: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <>
            <Head>
                <title>{t('notAuthorizedTitle')}</title>
            </Head>
            <div className="min-h-screen flex flex-col bg-blue-50">
                <Header/>
                <div className="flex-grow flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h1 className="text-2xl font-bold text-red-600">{t('notAuthorizedMessage')}</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});

export default NotAuthorized;