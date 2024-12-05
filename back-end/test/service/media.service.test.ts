import MediaService from '../../service/media.service';
import mediaDB from '../../repository/media.db';
import { Movie } from '../../model/movie';
import { Series } from '../../model/series';
import { Genre } from '../../model/genre';

const movieTitle = "The test movie";
const movieDescription = "A movie just made for testing!";
const movieReleaseYear = 2021;
const movieGenres = [Genre.ACTION];
const movieType = "MOVIE";
const movieDirector = "Director Test";
const movieDuration = 120;

const seriesTitle = "The test series";
const seriesDescription = "A series just made for testing!";
const seriesReleaseYear = 2021;
const seriesGenres = [Genre.ACTION];
const seriesType = "SERIES";
const seriesNumberOfSeasons = 1;


let createMediaMock: jest.Mock;
let getAllMediaMock: jest.Mock;
let getAllMoviesMock: jest.Mock;
let getAllSeriesMock: jest.Mock;

beforeEach(() => {
    createMediaMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid media input (movie), when creating a media, then media is created with those values', async () => {
    // given
    mediaDB.createMedia = createMediaMock;

    // when
    await MediaService.createMedia({ title: movieTitle, description: movieDescription, releaseYear: movieReleaseYear, genres: movieGenres, type: movieType, director: movieDirector, duration: movieDuration });

    // then
    expect(createMediaMock).toHaveBeenCalledTimes(1);
    expect(createMediaMock).toHaveBeenCalledWith(
        new Movie({
            title: movieTitle,
            description: movieDescription,
            releaseYear: movieReleaseYear,
            genres: movieGenres,
            director: movieDirector,
            duration: movieDuration
        })
    );
}
);

test('given a valid media input (series), when creating a media, then media is created with those values', async () => {
    // given
    mediaDB.createMedia = createMediaMock;

    // when
    await MediaService.createMedia({ title: seriesTitle, description: seriesDescription, releaseYear: seriesReleaseYear, genres: seriesGenres, type: seriesType, numberOfSeasons: seriesNumberOfSeasons });

    // then
    expect(createMediaMock).toHaveBeenCalledTimes(1);
    expect(createMediaMock).toHaveBeenCalledWith(
        new Series({
            title: seriesTitle,
            description: seriesDescription,
            releaseYear: seriesReleaseYear,
            genres: seriesGenres,
            numberOfSeasons: seriesNumberOfSeasons
        })
    );
}
);


