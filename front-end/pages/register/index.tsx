import Head from 'next/head';
import Header from '@components/header';
import UserRegisterForm from '../../components/users/UserRegisterForm';


const Register: React.FC = () => {
    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <Header />
            <main>
                <UserRegisterForm />
            </main>
        </>
    );
};

export default Register;