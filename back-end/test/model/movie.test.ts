import { Genre } from '../../model/genre';
import { Movie } from '../../model/movie';

// Test data
const releaseYear = 2021;
const title = 'Inception';
const description = 'A mind-bending thriller';
const duration = 148;
const director = 'Christopher Nolan';
const genre1 = Genre.Action;
const genres = [genre1];

test('given: valid values for movie, when: movie is created, then: movie is created with those values', () => {
    // given

    // when
    const movie = new Movie({ id: 1, releaseYear, title, description, genres, duration, director });

    // then
    expect(movie.getId()).toEqual(1);
    expect(movie.getTitle()).toEqual(title);
    expect(movie.getDescription()).toEqual(description);
    expect(movie.getReleaseYear()).toEqual(releaseYear);
    expect(movie.getDuration()).toEqual(duration);
    expect(movie.getDirector()).toEqual(director);
    expect(movie.getGenres()).toContain(genre1);
});

test('given: no duration, when: movie is created, then: error is thrown', () => {
    // given
    const invalidDuration = undefined;

    // when / then
    expect(() => new Movie({ id: 1, releaseYear, title, description, genres, duration: invalidDuration as unknown as number, director }))
        .toThrowError("Movie duration is required");
});

test('given: negative duration, when: movie is created, then: error is thrown', () => {
    // given
    const invalidDuration = -10;

    // when / then
    expect(() => new Movie({ id: 1, releaseYear, title, description, genres, duration: invalidDuration as unknown as number, director }))
        .toThrowError("Movie duration is required");
});

test('given: no director, when: movie is created, then: error is thrown', () => {
    // given
    const invalidDirector = '';

    // when / then
    expect(() => new Movie({ id: 1, releaseYear, title, description, genres, duration, director: invalidDirector as unknown as string }))
        .toThrowError("Movie director is required");
});
test('given: null duration, when: movie is created, then: error is thrown', () => {
    // given
    const invalidDuration = null;

    // when / then
    expect(() => new Movie({ id: 1, releaseYear, title, description, genres, duration: invalidDuration as unknown as number, director }))
        .toThrowError("Movie duration is required and must be a non-negative number");
});

test('given: null director, when: movie is created, then: error is thrown', () => {
    // given
    const invalidDirector = null;

    // when / then
    expect(() => new Movie({ id: 1, releaseYear, title, description, genres, duration, director: invalidDirector as unknown as string }))
        .toThrowError("Movie director is required");
});

test('given: undefined director, when: movie is created, then: error is thrown', () => {
    // given
    const invalidDirector = undefined;

    // when / then
    expect(() => new Movie({ id: 1, releaseYear, title, description, genres, duration, director: invalidDirector as unknown as string }))
        .toThrowError("Movie director is required");
});