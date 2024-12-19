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

const existingMovie = new Movie({
    id: 55,
    title: "Existing movie",
    description: "An existing movie",
    releaseYear: 2021,
    genres: [Genre.ACTION],
    director: "Director Test",
    duration: 120
});


let deleteMediaMock: jest.Mock;
let createMediaMock: jest.Mock;
let getAllMediaMock: jest.Mock;
let getAllMoviesMock: jest.Mock;
let getAllSeriesMock: jest.Mock;
let updateMediaMock: jest.Mock;

beforeEach(() => {
    createMediaMock = jest.fn();
    deleteMediaMock = jest.fn();
    getAllMediaMock = jest.fn();
    getAllMoviesMock = jest.fn();
    getAllSeriesMock = jest.fn();
    updateMediaMock = jest.fn();
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

test('given valid new data, when updating media, then media is updated', async () => {
    // given
    mediaDB.getMediaById = jest.fn().mockResolvedValue(existingMovie);
    mediaDB.updateMedia = updateMediaMock;

    // when
    await MediaService.updateMedia(55, { title: movieTitle, description: movieDescription, releaseYear: movieReleaseYear, genres: movieGenres, type: movieType, director: movieDirector, duration: movieDuration }, Role.ADMIN);

    // then
    expect(updateMediaMock).toHaveBeenCalledTimes(1);
    expect(existingMovie.getTitle()).toBe(movieTitle);
    expect(existingMovie.getDescription()).toBe(movieDescription);
    expect(existingMovie.getReleaseYear()).toBe(movieReleaseYear);
    expect(existingMovie.getGenres()).toEqual(movieGenres);
    expect(existingMovie.getDirector()).toBe(movieDirector);
    expect(existingMovie.getDuration()).toBe(movieDuration);
});

test('given invalid id, when updating media, then an error is thrown', async () => {
    // given
    mediaDB.getMediaById = jest.fn().mockResolvedValue(null);

    // when
    try {
        await MediaService.updateMedia(1, { title: movieTitle, description: movieDescription, releaseYear: movieReleaseYear, genres: movieGenres, type: movieType, director: movieDirector, duration: movieDuration }, Role.ADMIN);
    } catch (error) {
        // then
        expect(error).toEqual(new Error('Media not found'));
    }
}
);

test('given invalid role, when creating media, then an error is thrown', async () => {
    // when
    try {
        await MediaService.createMedia({ title: movieTitle, description: movieDescription, releaseYear: movieReleaseYear, genres: movieGenres, type: movieType, director: movieDirector, duration: movieDuration }, Role.USER);
    } catch (error) {
        // then
        expect(error).toEqual(new Error('Forbidden, only admins can create media'));
    }
}
);

test('given invalid role, when deleting media, then an error is thrown', async () => {
    // when
    try {
        await MediaService.deleteMedia(1, Role.USER);
    } catch (error) {
        // then
        expect(error).toEqual(new Error('Forbidden, only admins can delete media'));
    }
}
);

test('given invalid role, when updating media, then an error is thrown', async () => {
    // when
    try {
        await MediaService.updateMedia(1, { title: movieTitle, description: movieDescription, releaseYear: movieReleaseYear, genres: movieGenres, type: movieType, director: movieDirector, duration: movieDuration }, Role.USER);
    } catch (error) {
        // then
        expect(error).toEqual(new Error('Forbidden, only admins can update media'));
    }
}
);



    





