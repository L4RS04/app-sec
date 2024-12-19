import Head from 'next/head';
import Header from '@components/header';
import UserRegisterForm from '../../components/users/UserRegisterForm';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const Register: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <>
            <Head>
                <title>{t('register')}</title>
            </Head>
            <Header />
            <main>
                <UserRegisterForm />
            </main>
        </>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default Register;