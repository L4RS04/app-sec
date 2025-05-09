import userDB from '../../repository/user.db';
import { User } from '../../model/user/user';
import { UserInput, UserLoginInput, AuthenticationResponse } from '../../types';
import bcrypt from 'bcrypt';
import generateJwtToken from '../../util/jwt';
import { Role } from '../../model/user/role';

const getAllUsers = async (role: Role): Promise<Partial<User>[]> => {
    if (role !== Role.ADMIN) {
        throw new Error('Forbidden, only admins can view all users');
    }
    return await userDB.getAllUsers();
}

const getUserById = async (id: number): Promise<User | null> => {
    return await userDB.getUserById(id);
}

const createUser = async (userInput: UserInput): Promise<User> => {
    const existingUserByEmail = await userDB.getUserByEmail(userInput.email);
    if (existingUserByEmail) {
        throw new Error('User with this email already exists');
    }

    const existingUserByName = await userDB.getUserByName(userInput.name);
    if (existingUserByName) {
        throw new Error('User with this name already exists');
    }

    const validatePassword = (password: string): boolean => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    if (!validatePassword(userInput.password)) {
        throw new Error(
            'Password must be at least 8 characters long and include at least one letter, one number, and one special character.'
        );
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const user = new User({
        name: userInput.name,
        email: userInput.email,
        password: hashedPassword
    });

    return await userDB.createUser(user);
}

const authenticate = async ({ name, password }: UserLoginInput): Promise<AuthenticationResponse> => {
    const user = await userDB.getUserByName(name);

    if (!user) {
        throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.getPassword());
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    const id = user.getId();
    const userName = user.getName();
    const role = user.getRole();

    console.log("Auth values:", { id, userName, role });

    const token = generateJwtToken(id as number, userName, role);
    console.log("Generated token:", token);

    return {
        token,
        id: id as number,
        name: userName,
        role
    };
};

const deleteUser = async (id: number, role: Role): Promise<void> => {
    if (role !== Role.ADMIN) {
        throw new Error('Forbidden: Only admins can delete users');
    }

    const user = await userDB.getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }

    await userDB.deleteUser(id);
};

const changePassword = async (
    userId: number,
    oldPassword: string,
    newPassword: string
): Promise<void> => {
    const user = await userDB.getUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(oldPassword, user.getPassword());
    if (!isMatch) {
        throw new Error('Incorrect current password');
    }

    const validatePassword = (password: string): boolean => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        return regex.test(password);
    };

    if (!validatePassword(newPassword)) {
        throw new Error(
            'Password must be at least 8 characters and include letters, numbers, and special characters'
        );
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await userDB.updatePassword(userId, hashed);
};

const UserService = {
    authenticate,
    getAllUsers,
    createUser,
    getUserById,
    deleteUser,
    changePassword
};

export default UserService;