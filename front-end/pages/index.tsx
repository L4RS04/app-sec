import Head from 'next/head';
import Header from '@components/header';
import styles from '../styles/home.module.css';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
        <Head>
            <title>{t('apptitle')}</title>
            <meta name="description" content="Watchlist app" />
            <meta name="viewport" content="width=device-width, initial scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
                <h1>Welcome!</h1>
            
            <div className={styles.description}>
                <p>
                    BingeVault is an application that lets users create and manage
                    personalised watchlists of series and movies, either for themselves or for others.
                    Users can create multiple watchlists to track what they’ve watched before, plan what
                    they would like to watch in the future or create a watchlist with recommendations for
                    others.
                </p> 
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