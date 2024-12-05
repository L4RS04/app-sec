import userDB from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';
import bcrypt from 'bcrypt';

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

const UserService = {
    getAllUsers,
    createUser
};

export default UserService;