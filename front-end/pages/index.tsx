import Head from 'next/head';
import Header from '@components/header';
import styles from '../styles/home.module.css';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <>
        <Head>
            <title>{t('apptitle')}</title>
            <meta name="description" content="Watchlist app" />
            <meta name="viewport" content="width=device-width, initial scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">{t('testCredentials')}</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">{t('name')}</th>
                        <th className="py-2 px-4 border-b">{t('password')}</th>
                        <th className="py-2 px-4 border-b">{t('role')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-4 border-b">Xander</td>
                        <td className="py-2 px-4 border-b">XanderD123!</td>
                        <td className="py-2 px-4 border-b">ADMIN</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">Lars</td>
                        <td className="py-2 px-4 border-b">LarsM123!</td>
                        <td className="py-2 px-4 border-b">PREMIUM</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">Yoda</td>
                        <td className="py-2 px-4 border-b">YodaM123!</td>
                        <td className="py-2 px-4 border-b">USER</td>
                    </tr>
                </tbody>
            </table>
            <div className="mt-4">
                <p><strong>{t('note')}:</strong> {t('registerNote')}</p>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-bold mb-2">{t('rolesAndPermissions')}</h2>
                <p className="mb-2"><strong>{t('admins')}:</strong> {t('adminsPermissions')}</p>
                <p className="mb-2"><strong>{t('premium')}:</strong> {t('premiumPermissions')}</p>
                <p className="mb-2"><strong>{t('user')}:</strong> {t('userPermissions')}</p>
            </div>
        </main>
        </>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});

export default Home;