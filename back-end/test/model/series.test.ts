import { Series } from '../../model/series';
import { Genre } from '../../model/genre';

// Test data
const title = 'Breaking Bad';
const description = 'A high school chemistry teacher turned methamphetamine producer.';
const release_year = 2008;
const number_of_seasons = 5;
const genre1 = Genre.Action;
const genres = [genre1];
const type = "Series";

test('given: valid values for series, when: series is created, then: series is created with those values', () => {
    // given
    
    // when
    const series = new Series({ title, description, release_year, genres, number_of_seasons });

    // then
    expect(series.getTitle()).toEqual(title);
    expect(series.getDescription()).toEqual(description);
    expect(series.getReleaseYear()).toEqual(release_year);
    expect(series.getNumberOfSeasons()).toEqual(number_of_seasons);
    expect(series.getGenres()).toContain(genre1);
});

test('given: series with no number_of_seasons, when: series is created, then: error is thrown', () => {
    // given
    const invalidSeriesData = { title, description, release_year, genres, number_of_seasons: undefined as unknown as number };

    // when & then
    expect(() => new Series(invalidSeriesData)).toThrowError("Series number of seasons is required");
});

test('given: series with negative number_of_seasons, when: series is created, then: error is thrown', () => {
    // given
    const invalidSeriesData = { title, description, release_year, genres, number_of_seasons: -1 };

    // when & then
    expect(() => new Series(invalidSeriesData)).toThrowError("Series number of seasons is required");
});
