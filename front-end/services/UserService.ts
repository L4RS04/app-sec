import { User } from '../types';

const loginUser = async (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include', // Include credentials (cookies) with the request
    });
};

const registerUser = async (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

const UserService = {
    loginUser,
    registerUser,
};

export default UserService;
