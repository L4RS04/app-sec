import { Genre } from '../../model/genre';

// Test data
const genreName = 'Science Fiction';

test('given: valid name for genre, when: genre is created, then: genre is created with that name', () => {
    // given
    
    // when
    const genre = new Genre({ name: genreName });

    // then
    expect(genre.getName).toEqual(genreName);
});

test('given: invalid name for genre, when: genre is created, then: error is thrown', () => {
    // given
    const invalidName = '';

    // when
    const createGenre = () => new Genre({ name: invalidName });

    // then
    expect(createGenre).toThrowError('Genre name is required');
});

