import { Media } from '../../model/media';
import { Genre } from '../../model/genre';

// Test data
const title = 'Inception';
const description = 'A mind-bending thriller';
const release_year = 2010;
const genre1 = new Genre('Action');
const genre = [genre1];


test('given: valid values for media, when: media is created, then: media is created with those values', () => {
    // given
    
    // when
    const media = new Media(title, description, release_year, genre);

    // then
    expect(media.getTitle()).toEqual(title);
    expect(media.getDescription()).toEqual(description);
    expect(media.getReleaseYear()).toEqual(release_year);
    expect(media.getGenres()).toContain(genre1);
});
