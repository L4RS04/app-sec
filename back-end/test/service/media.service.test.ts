import MediaService from '../../service/media/media.service';
import mediaDB from '../../repository/media.db';
import { Movie } from '../../model/media/movie';
import { Series } from '../../model/media/series';
import { Genre } from '../../model/genre/genre';
import { Role } from '../../model/user/role';

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


let deleteMediaMock: jest.Mock;
let createMediaMock: jest.Mock;
let getAllMediaMock: jest.Mock;
let getAllMoviesMock: jest.Mock;
let getAllSeriesMock: jest.Mock;

beforeEach(() => {
    createMediaMock = jest.fn();
    deleteMediaMock = jest.fn();
    getAllMediaMock = jest.fn();
    getAllMoviesMock = jest.fn();
    getAllSeriesMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid media input (movie), when creating a media, then media is created with those values', async () => {
    // given
    mediaDB.createMedia = createMediaMock;

    // when
    await MediaService.createMedia({ title: movieTitle, description: movieDescription, releaseYear: movieReleaseYear, genres: movieGenres, type: movieType, director: movieDirector, duration: movieDuration }, Role.ADMIN);

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
    await MediaService.createMedia({ title: seriesTitle, description: seriesDescription, releaseYear: seriesReleaseYear, genres: seriesGenres, type: seriesType, numberOfSeasons: seriesNumberOfSeasons }, Role.ADMIN);

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

test('deleting an existing media, when calling deleteMedia, then media is deleted', async () => {
    // given
    mediaDB.getMediaById = jest.fn().mockResolvedValue({ id: 1 });
    mediaDB.deleteMedia = deleteMediaMock;

    // when
    await MediaService.deleteMedia(1, Role.ADMIN);

    // then
    expect(deleteMediaMock).toHaveBeenCalledTimes(1);
    expect(deleteMediaMock).toHaveBeenCalledWith(1);
});

test('retrieving all media, when calling getAllMedia, then all media is retrieved', async () => {
    // given
    mediaDB.getAllMedia = getAllMediaMock;

    // when
    await MediaService.getAllMedia();

    // then
    expect(getAllMediaMock).toHaveBeenCalledTimes(1);
}
);

test('retrieving all movies, when calling getAllMovies, then all movies are retrieved', async () => {
    // given
    mediaDB.getAllMovies = getAllMoviesMock;

    // when
    await MediaService.getAllMovies();

    // then
    expect(getAllMoviesMock).toHaveBeenCalledTimes(1);
}
);

test('retrieving all series, when calling getAllSeries, then all series are retrieved', async () => {
    // given
    mediaDB.getAllSeries = getAllSeriesMock;

    // when
    await MediaService.getAllSeries();

    // then
    expect(getAllSeriesMock).toHaveBeenCalledTimes(1);
}
);

test('given invalid id, when deleting a media, then an error is thrown', async () => {
    // given
    mediaDB.getMediaById = jest.fn().mockResolvedValue(null);

    // when
    try {
        await MediaService.deleteMedia(1, Role.ADMIN);
    } catch (error) {
        // then
        expect(error).toEqual(new Error('Media not found'));
    }
}
);
    





