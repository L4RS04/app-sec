import { Series } from '../../model/series';

// Test data
const title = 'Breaking Bad';
const description = 'A high school chemistry teacher turned methamphetamine producer.';
const release_year = 2008;
const number_of_seasons = 5;

test('given: valid values for series, when: series is created, then: series is created with those values', () => {
    // given
    
    // when
    const series = new Series(title, description, release_year, number_of_seasons);

    // then
    expect(series.getTitle()).toEqual(title);
    expect(series.getDescription()).toEqual(description);
    expect(series.getReleaseYear()).toEqual(release_year);
    expect(series.getNumberOfSeasons()).toEqual(number_of_seasons);
});