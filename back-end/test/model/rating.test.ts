import { Rating } from '../../model/rating';

// Test data
const score = 5;

test('given: valid score for rating, when: rating is created, then: rating is created with that score', () => {
    // given
    
    // when
    const rating = new Rating(score);

    // then
    expect(rating.getScore()).toEqual(score);
});

