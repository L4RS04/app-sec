import { User } from '../model/user/user';
import prisma from './database';

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await prisma.user.findUnique({
            where: { id }
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await prisma.user.findUnique({
            where: { email }
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
};

const getUserByName = async (name: string): Promise<User | null> => {
    try {
        const userPrisma = await prisma.user.findUnique({
            where: { name }
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
};

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await prisma.user.findMany({
            include: { watchlists: { include: { mediaItems: true } } },
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await prisma.user.create({
            data: {
                name: user.getName(),
                password: user.getPassword(),
                email: user.getEmail(),
                role: user.getRole(),
            }
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
};

const deleteUser = async (id: number): Promise<void> => {
    try {
        await prisma.user.delete({
            where: { id }
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
};

const updatePassword = async (userId: number, hashedPassword: string): Promise<void> => {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
};

export default {
    getUserByEmail,
    getUserByName,
    getAllUsers,
    createUser,
    getUserById,
    deleteUser,
    updatePassword,
};