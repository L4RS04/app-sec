import { Media } from '../../model/media';
import { Genre } from '../../model/genre';
// import { Rating } from '../../model/rating';

// Test data
const title = 'Inception';
const description = 'A mind-bending thriller';
const release_year = 2010;
const genre1 = Genre.ACTION;
const genre2 = Genre.ADVENTURE;
const genres = [genre1];
// const rating1 = new Rating(5);
// const rating2 = new Rating(4);
const type = 'movie';

test('given: valid values for media, when: media is created, then: media is created with those values', () => {
    // given
    
    // when
    const media = new Media({ title, description, release_year, genres, type });

    // then
    expect(media.getTitle()).toEqual(title);
    expect(media.getDescription()).toEqual(description);
    expect(media.getReleaseYear()).toEqual(release_year);
    expect(media.getGenres()).toContain(genre1);
});

test('given: a genre, when: addGenre is called, then: the genre is added to the media', () => {
    // given
    const media = new Media({ title, description, release_year, genres, type });

    // when
    media.addGenre(genre2);

    // then
    expect(media.getGenres()).toContain(genre2);
});

// test('given: a rating, when: addRating is called, then: the rating is added to the media', () => {
//     // given
//     const media = new Media({ title, description, release_year, genres, type });

//     // when
//     media.addRating(rating1);

//     // then
//     expect(media.getRatings()).toContain(rating1);
// });

// test('given: multiple ratings, when: getAverageRating is called, then: the average rating is returned', () => {
//     // given
//     const media = new Media({ title, description, release_year, genres, type });
//     media.addRating(rating1);
//     media.addRating(rating2);

//     // when
//     const averageRating = media.getAverageRating();

//     // then
//     expect(averageRating).toBe((rating1.getScore() + rating2.getScore()) / 2);
// });

// test('given: no ratings, when: getAverageRating is called, then: the average rating is 0', () => {
//     // given
//     const media = new Media({ title, description, release_year, genres, type });

//     // when
//     const averageRating = media.getAverageRating();

//     // then
//     expect(averageRating).toBe(0);
// });

test('given: no title, when: media is created, then: an error is thrown', () => {
    // given
    const invalidTitle = '';

    // when & then
    expect(() => new Media({ title: invalidTitle, description, release_year, genres, type })).toThrow('Title is required');
});

test('given: no description, when: media is created, then: an error is thrown', () => {
    // given
    const invalidDescription = '';

    // when & then
    expect(() => new Media({ title, description: invalidDescription, release_year, genres, type })).toThrow('Description is required');
});

test('given: no release year, when: media is created, then: an error is thrown', () => {
    // given
    const invalidReleaseYear = null as unknown as number;

    // when & then
    expect(() => new Media({ title, description, release_year: invalidReleaseYear, genres, type })).toThrow('Year of release is required');
});

