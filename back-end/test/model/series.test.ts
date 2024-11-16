import { Series } from '../../model/series';
import { Genre } from '../../model/genre';

// Test data
const title = 'Breaking Bad';
const description = 'A high school chemistry teacher turned methamphetamine producer.';
const releaseYear = 2008;
const numberOfSeasons = 5;
const genre1 = Genre.ACTION;
const genres = [genre1];
const type = "Series";

test('given: valid values for series, when: series is created, then: series is created with those values', () => {
    // given
    
    // when
    const series = new Series({ title, description, releaseYear, genres, numberOfSeasons });

    // then
    expect(series.getTitle()).toEqual(title);
    expect(series.getDescription()).toEqual(description);
    expect(series.getReleaseYear()).toEqual(releaseYear);
    expect(series.getNumberOfSeasons()).toEqual(numberOfSeasons);
    expect(series.getGenres()).toContain(genre1);
});

test('given: series with no numberOfSeasons, when: series is created, then: error is thrown', () => {
    // given
    const invalidSeriesData = { title, description, releaseYear, genres, numberOfSeasons: undefined as unknown as number };

    // when & then
    expect(() => new Series(invalidSeriesData)).toThrowError("Series number of seasons is required");
});

test('given: series with negative numberOfSeasons, when: series is created, then: error is thrown', () => {
    // given
    const invalidSeriesData = { title, description, releaseYear, genres, numberOfSeasons: -1 };

    // when & then
    expect(() => new Series(invalidSeriesData)).toThrowError("Series number of seasons is required");
});
