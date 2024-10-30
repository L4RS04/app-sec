import { User } from '../model/user';

const users = [
    new User({name: "John", password: "JohnD123!", email: "john.doe@example.be"}),
    new User({name: "Jane", password: "JaneD123!", email: "jane.doe@example.be"}),
    new User({name: "Jack", password: "JackD123!", email: "jack.doe@example.be"})
]


export default {
    users
};
