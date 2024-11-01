import { User } from '../model/user';

const users = [
    new User({id: 1, name: "John", password: "JohnD123!", email: "john.doe@example.be"}),
    new User({id: 2, name: "Jane", password: "JaneD123!", email: "jane.doe@example.be"}),
    new User({id: 3, name: "Jack", password: "JackD123!", email: "jack.doe@example.be"})
]

const getUserById = ({ id }: { id: number }): User | null => {
    try {
        return users.find((user) => user.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
  
}

export default {
    getUserById,
};