import { User } from '../../model/user/user';
import { Watchlist } from '../../model/watchlist/watchlist';
import { Media } from '../../model/media/media';
import { Genre } from '../../model/genre/genre';
import { Movie } from '../../model/media/movie';
import { Series } from '../../model/media/series';

// Test data
const name = 'My Watchlist';
const description = 'This is a description of my watchlist.';
const user = new User({name: "John Doe", password: "JohnD123!", email: "john.doe@example.com"});

const testMedia1 = new Movie({
    title: 'Test Movie 1',
    description: 'This is a test movie',
    releaseYear: 2021,
    genres: [Genre.ACTION],
    duration: 120,
    director: 'John Doe',
});

const testSeries = new Series({
    title: 'Test Series',
    description: 'This is a test series',
    releaseYear: 2021,
    genres: [Genre.ACTION],
    numberOfSeasons: 1,
});

// Tests
test('given: valid values for watchlist, when: watchlist is created, then: watchlist is created with those values', () => {
    // given

    // when
    const watchlist = new Watchlist({ name, description, user });

    // then
    expect(watchlist.getName()).toEqual(name);
    expect(watchlist.getDescription()).toEqual(description);
    expect(watchlist.getCreationDate()).toBeInstanceOf(Date);
});

test('given: empty name, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name: '', description, user });
    }).toThrowError("Name is required and cannot be empty.");
});

test('given: empty description, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name, description: '', user });
    }).toThrowError("Description is required and cannot be empty.");
});


test('given: user is not provided, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name, description, user: null as any });
    }).toThrowError("User is required.");
});

test('given: user is not a valid User instance, when: watchlist is created, then: error is thrown', () => {
    expect(() => {
        new Watchlist({ name, description, user: {} as any });
    }).toThrowError("User must be a valid User instance.");
});

test('given: media is added to watchlist, when: media is added, then: media is added to watchlist', () => {
    // given
    const watchlist = new Watchlist({ name, description, user }); 

    // when
    watchlist.addMediaToWatchlist(testMedia1);

    // then
    expect(watchlist.getMedia()).toContain(testMedia1);
});

test('given: media is removed from watchlist, when: media is removed, then: media is removed from watchlist', () => {
    // given
    const watchlist = new Watchlist({ name, description, user });
    watchlist.addMediaToWatchlist(testMedia1);

    // when
    watchlist.removeMediaFromWatchlist(testMedia1);

    // then
    expect(watchlist.getMedia()).not.toContain(testMedia1);
});