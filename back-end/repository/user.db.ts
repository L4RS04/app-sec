import { User } from '../model/user';
import database from './database';


// const getAllUsers = async (): Promise<User[]> => {
//     try {
//         const usersPrisma = await database.user.findMany({
//             include: {watchlist: true}
//         });
//         return usersPrisma.map((userPrisma) => User.from(userPrisma));
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See console for details.');
//     }
// };

export default {
    // getAllUsers,
};