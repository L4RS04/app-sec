import { Media } from '../../model/media/media';
import { Genre } from '../../model/genre/genre';
// import { Rating } from '../../model/rating';

// Test data
const title = 'Inception';
const description = 'A mind-bending thriller';
const releaseYear = 2010;
const genre1 = Genre.ACTION;
const genre2 = Genre.ADVENTURE;
const genres = [genre1];
// const rating1 = new Rating(5);
// const rating2 = new Rating(4);
const type = 'movie';

test('given: valid values for media, when: media is created, then: media is created with those values', () => {
    // given
    
    // when
    const media = new Media({ title, description, releaseYear, genres, type });

    // then
    expect(media.getTitle()).toEqual(title);
    expect(media.getDescription()).toEqual(description);
    expect(media.getReleaseYear()).toEqual(releaseYear);
    expect(media.getGenres()).toContain(genre1);
});

test('given: a genre, when: addGenre is called, then: the genre is added to the media', () => {
    // given
    const media = new Media({ title, description, releaseYear, genres, type });

    // when
    media.addGenre(genre2);

    // then
    expect(media.getGenres()).toContain(genre2);
});

test('given: no title, when: media is created, then: an error is thrown', () => {
    // given
    const invalidTitle = '';

    // when & then
    expect(() => new Media({ title: invalidTitle, description, releaseYear, genres, type })).toThrow('Title is required');
});

test('given: no description, when: media is created, then: an error is thrown', () => {
    // given
    const invalidDescription = '';

    // when & then
    expect(() => new Media({ title, description: invalidDescription, releaseYear, genres, type })).toThrow('Description is required');
});

test('given: no release year, when: media is created, then: an error is thrown', () => {
    // given
    const invalidReleaseYear = null as unknown as number;

    // when & then
    expect(() => new Media({ title, description, releaseYear: invalidReleaseYear, genres, type })).toThrow("Release year is required");
});

