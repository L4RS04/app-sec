import { Media } from '../../model/media';

// Test data
const title = 'Inception';
const description = 'A mind-bending thriller';
const release_year = 2010;

test('given: valid values for media, when: media is created, then: media is created with those values', () => {
    // given
    
    // when
    const media = new Media(title, description, release_year);

    // then
    expect(media.getTitle()).toEqual(title);
    expect(media.getDescription()).toEqual(description);
    expect(media.getReleaseYear()).toEqual(release_year);
});
