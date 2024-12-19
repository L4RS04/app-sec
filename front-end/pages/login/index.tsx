import Head from 'next/head';
import Header from '@components/header';
import UserLoginForm from '@components/users/UserLoginForm';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Login: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <>
            <Head>
                <title>{t('login')}</title>
            </Head>
            <Header />
            <main>
                <UserLoginForm />
            </main>
        </>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default Login;