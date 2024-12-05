import userDB from '../repository/user.db';
import { User } from '../model/user';
import { UserInput, UserLoginInput } from '../types';
import bcrypt from 'bcrypt';
import generateJwtToken from '../util/jwt';
import { AuthenticationResponse } from '../types';

const getAllUsers = async (): Promise<Partial<User>[]> => {
    return await userDB.getAllUsers();
}

const createUser = async (userInput: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByEmail(userInput.email);

    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const user = new User({
        name: userInput.name,
        email: userInput.email,
        password: hashedPassword
    });

    return userDB.createUser(user);
}

const authenticate = async ({ name, password }: UserLoginInput): Promise<AuthenticationResponse> => {
    const user = await userDB.getUserByName(name);

    const isValidPassword = await bcrypt.compare(password, user.getPassword());
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    return {
        token: generateJwtToken(user.getName(), user.getRole()),
        name: user.getName(),
        role: user.getRole()
    };
};

const UserService = {
    authenticate,
    getAllUsers,
    createUser
};

export default UserService;