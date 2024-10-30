import { User } from '../../model/user';
import { Watchlist } from '../../model/watchlist';

// Test data
const name = 'My Watchlist';
const description = 'This is a description of my watchlist.';
const creator = new User({name: "John Doe", password: "JohnD123!", email: "john.doe@example.com"});

test('given: valid values for watchlist, when: watchlist is created, then: watchlist is created with those values', () => {
    // given

    // when
    const watchlist = new Watchlist({ name, description, media_items: [], creator });

    // then
    expect(watchlist.getName()).toEqual(name);
    expect(watchlist.getDescription()).toEqual(description);
    expect(watchlist.getCreationDate()).toBeInstanceOf(Date);
});