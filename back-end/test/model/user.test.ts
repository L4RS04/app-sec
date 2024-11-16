import { User } from '../../model/user';
import { Watchlist } from '../../model/watchlist';

// Test data
const name = 'John Doe';
const password = 'JohnD123!';
const email = 'john.doe@example.com';

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    // given
    
    // when
    const user = new User({name: name, password: password, email: email});

    // then
    expect(user.getName()).toEqual(name);
    expect(user.getPassword()).toEqual(password);
    expect(user.getEmail()).toEqual(email);
});

test('given: a watchlist, when: addWatchlistToUser is called, then: the watchlist is added to the user', () => {
    // given
    const user = new User({name: name, password: password, email: email});
    const watchlist = new Watchlist({ name: 'My Watchlist', description: 'Description', mediaItems: [], creator: user });

    // when
    user.addWatchlistToUser(watchlist);

    // then
    expect(user.getWatchlists()).toContain(watchlist);
});

test('given: a watchlist, when: deleteWatchlistFromUser is called, then: the watchlist is removed from the user', () => {
    // given
    const user = new User({name: name, password: password, email: email});
    const watchlist = new Watchlist({ name: 'My Watchlist', description: 'Description', mediaItems: [], creator: user });
    user.addWatchlistToUser(watchlist);

    // when
    user.deleteWatchlistFromUser(watchlist);

    // then
    expect(user.getWatchlists()).not.toContain(watchlist);
});

// Validation tests
test('given: empty name, when: user is created, then: error is thrown', () => {
    expect(() => new User({name: '', password: password, email: email})).toThrow('Username is required');
});

test('given: short name, when: user is created, then: error is thrown', () => {
    expect(() => new User({name: 'Jo', password: password, email: email})).toThrow('Username must be at least 3 characters long');
});

test('given: empty password, when: user is created, then: error is thrown', () => {
    expect(() => new User({name: name, password: '', email: email})).toThrow('Password is required');
});

test('given: short password, when: user is created, then: error is thrown', () => {
    expect(() => new User({name: name, password: 'short', email: email})).toThrow('Password must be at least 8 characters long');
});

test('given: empty email, when: user is created, then: error is thrown', () => {
    expect(() => new User({name: name, password: password, email: ''})).toThrow('Email is required');
});

test('given: invalid email, when: user is created, then: error is thrown', () => {
    expect(() => new User({name: name, password: password, email: 'invalid-email'})).toThrow('Email is not valid');
});
