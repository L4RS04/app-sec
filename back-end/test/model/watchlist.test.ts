import { User } from '../../model/user';
import { Watchlist } from '../../model/watchlist';
import { Media } from '../../model/media';

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

test('given: empty name, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name: '', description, media_items: [], creator });
    }).toThrowError("Name is required and cannot be empty.");
});

test('given: empty description, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name, description: '', media_items: [], creator });
    }).toThrowError("Description is required and cannot be empty.");
});

test('given: media_items is not an array, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name, description, media_items: null as any, creator });
    }).toThrowError("Media items must be an array.");
});

test('given: creator is not provided, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name, description, media_items: [], creator: null as any });
    }).toThrowError("Creator is required.");
});

test('given: creator is not a valid User instance, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name, description, media_items: [], creator: {} as any });
    }).toThrowError("Creator must be a valid User instance.");
});