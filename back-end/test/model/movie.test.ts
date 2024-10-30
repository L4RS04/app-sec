import { Genre } from '../../model/genre';
import { Movie } from '../../model/movie';


// Test data
const release_year = 2021;
const title = 'Inception';
const description = 'A mind-bending thriller';
const duration = 148;
const director = 'Christopher Nolan';
const genre1 = new Genre({ name: 'Action' });
const genres = [genre1];


test('given: valid values for movie, when: movie is created, then: movie is created with those values', () => {
    // given

    // when
    const movie = new Movie({ release_year, title, description, genres, duration, director });

    // then
    expect(movie.getTitle()).toEqual(title);
    expect(movie.getDescription()).toEqual(description);
    expect(movie.getReleaseYear()).toEqual(release_year);
    expect(movie.getDuration()).toEqual(duration);
    expect(movie.getDirector()).toEqual(director);
    expect(movie.getGenres()).toContain(genre1);
});