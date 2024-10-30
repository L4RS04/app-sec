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
    const watchlist = new Watchlist({ name: 'My Watchlist', description: 'Description', media_items: [], creator: user });

    // when
    user.addWatchlistToUser(watchlist);

    // then
    expect(user.getWatchlists()).toContain(watchlist);
});

test('given: a watchlist, when: deleteWatchlistFromUser is called, then: the watchlist is removed from the user', () => {
    // given
    const user = new User({name: name, password: password, email: email});
    const watchlist = new Watchlist({ name: 'My Watchlist', description: 'Description', media_items: [], creator: user });
    user.addWatchlistToUser(watchlist);

    // when
    user.deleteWatchlistFromUser(watchlist);

    // then
    expect(user.getWatchlists()).not.toContain(watchlist);
});

