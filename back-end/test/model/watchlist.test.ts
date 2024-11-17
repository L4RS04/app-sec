import { User } from '../../model/user';
import { Watchlist } from '../../model/watchlist';
import { Media } from '../../model/media';

// Test data
const name = 'My Watchlist';
const description = 'This is a description of my watchlist.';
const user = new User({name: "John Doe", password: "JohnD123!", email: "john.doe@example.com"});

test('given: valid values for watchlist, when: watchlist is created, then: watchlist is created with those values', () => {
    // given

    // when
    const watchlist = new Watchlist({ name, description, mediaItems: [], user });

    // then
    expect(watchlist.getName()).toEqual(name);
    expect(watchlist.getDescription()).toEqual(description);
    expect(watchlist.getCreationDate()).toBeInstanceOf(Date);
});

test('given: empty name, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name: '', description, mediaItems: [], user });
    }).toThrowError("Name is required and cannot be empty.");
});

test('given: empty description, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name, description: '', mediaItems: [], user });
    }).toThrowError("Description is required and cannot be empty.");
});

test('given: mediaItems is not an array, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name, description, mediaItems: null as any, user });
    }).toThrowError("Media items must be an array.");
});

test('given: user is not provided, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name, description, mediaItems: [], user: null as any });
    }).toThrowError("User is required.");
});

test('given: user is not a valid User instance, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name, description, mediaItems: [], user: {} as any });
    }).toThrowError("User must be a valid User instance.");
});