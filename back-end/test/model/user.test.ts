import { User } from '../../model/user';

// Test data
const name = 'John Doe';
const password = 'JohnD123!';
const email = 'john.doe@example.com';

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    // given
    
    // when
    const user = new User(name, password, email);

    // then
    expect(user.getName()).toEqual(name);
    expect(user.getPassword()).toEqual(password);
    expect(user.getEmail()).toEqual(email);
});