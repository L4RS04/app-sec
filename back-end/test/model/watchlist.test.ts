import { Watchlist } from '../../model/watchlist';

// Test data
const name = 'My Watchlist';
const description = 'This is a description of my watchlist.';

test('given: valid values for watchlist, when: watchlist is created, then: watchlist is created with those values', () => {
    // given

    // when
    const watchlist = new Watchlist(name, description, []);

    // then
    expect(watchlist.getName()).toEqual(name);
    expect(watchlist.getDescription()).toEqual(description);
    expect(watchlist.getCreationDate()).toBeInstanceOf(Date);
});