import { Genre } from '../../model/genre';

// Test data
const genreName = 'Science Fiction';

test('given: valid name for genre, when: genre is created, then: genre is created with that name', () => {
    // given
    
    // when
    const genre = new Genre(genreName);

    // then
    expect(genre.getName).toEqual(genreName);
});

