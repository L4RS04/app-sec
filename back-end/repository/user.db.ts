import { User } from '../model/user';
import prisma from './database';


const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await prisma.user.findMany({
            include: {watchlists: {include: {mediaItems: true}
        },
        },
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
};

export default {
    getAllUsers,
};