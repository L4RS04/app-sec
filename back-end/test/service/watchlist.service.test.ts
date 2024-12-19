import WatchlistService  from '../../service/watchlist/watchlist.service';
import watchlistDB from '../../repository/watchlist.db';
import { Watchlist } from '../../model/watchlist/watchlist';
import userDB from '../../repository/user.db';
import { WatchlistInput } from '../../types';
import { Role } from '../../model/user/role';
import { User } from '../../model/user/user';
import { Series } from '../../model/media/series';
import { Movie } from '../../model/media/movie';

const user = new User({
    id: 1,
    name: "Test User",
    email: "testuser@bingevault.com",
    password: "TestT123!"
});

const validWatchlistInput: WatchlistInput = {
    name: "Test Watchlist",
    description: "A test watchlist"
};

const existingWatchlist = new Watchlist({
    id: 1,
    name: "Existing watchlist",
    description: "An existing watchlist",
    user: user,
});

const validSeries = new Series({
    id: 1,
    title: "Test Series",
    description: "A test series",
    releaseYear: 2021,
    genres: [],
    numberOfSeasons: 1,
});

const validMovie = new Movie({
    id: 1,
    title: "Test Movie",
    description: "A test movie",
    releaseYear: 2021,
    genres: [],
    director: "Test Director",
    duration: 120,
});


let createWatchlistMock: jest.Mock;
let deleteWatchlistMock: jest.Mock;

beforeEach(() => {
    createWatchlistMock = jest.fn();
    deleteWatchlistMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid watchlist input, when creating a watchlist, then watchlist is created with those values', async () => {
    // given
    watchlistDB.createWatchlist = createWatchlistMock;
    userDB.getUserById = jest.fn().mockResolvedValue(user);

    // when
    await WatchlistService.createWatchlist(validWatchlistInput, 1, Role.USER);

    // then
    expect(createWatchlistMock).toHaveBeenCalledTimes(1);
    expect(createWatchlistMock).toHaveBeenCalledWith(
        expect.objectContaining({
            name: validWatchlistInput.name,
            description: validWatchlistInput.description,
            mediaItems: [],
            user: expect.objectContaining({
                id: 1,
                name: user.getName(),
                role: Role.USER,
            }),
        })
    );
});

test('given an invalid watchlist input, when creating a watchlist, then an error is thrown', async () => {
    // given
    watchlistDB.createWatchlist = createWatchlistMock;
    userDB.getUserById = jest.fn().mockResolvedValue(user);

    const invalidWatchlistInput: WatchlistInput = {
        name: "Test Watchlist",
        description: "A test watchlist"
    };

    // when
    try {
        await WatchlistService.createWatchlist(invalidWatchlistInput, 1, Role.USER);
    } catch (error) {
        // then
        expect(error).toBeInstanceOf(Error);
    }
});

test('given a valid user id, when getting watchlists by user id, then watchlists are returned', async () => {
    // given
    watchlistDB.getWatchlistsByUserId = jest.fn().mockResolvedValue([new Watchlist({
        id: 1,
        name: "Test Watchlist",
        description: "A test watchlist",
        user: user,
        mediaItems: [],
        creationDate: new Date()
    })]);

    // when
    const watchlists = await WatchlistService.getWatchlistsByUserId(1);

    // then
    expect(watchlists).toHaveLength(1);
    expect(watchlists[0]).toEqual(
        expect.objectContaining({
            name: "Test Watchlist",
            description: "A test watchlist",
            user: user,
            mediaItems: [],
        })
    );
});

test('given an invalid user id, when getting watchlists by user id, then an error is thrown', async () => {
    // given
    watchlistDB.getWatchlistsByUserId = jest.fn().mockResolvedValue([]);

    // when
    try {
        await WatchlistService.getWatchlistsByUserId(1);
    } catch (error) {
        // then
        expect(error).toBeInstanceOf(Error);
    }
});

test('given a valid watchlist id, when getting watchlist by id, then watchlist is returned', async () => {
    // given
    watchlistDB.getWatchlistById = jest.fn().mockResolvedValue(new Watchlist({
        id: 1,
        name: "Test Watchlist",
        description: "A test watchlist",
        user: user,
        mediaItems: [],
        creationDate: new Date()
    }));

    // when
    const watchlist = await WatchlistService.getWatchlistById(1);

    // then
    expect(watchlist).toEqual(
        expect.objectContaining({
            name: "Test Watchlist",
            description: "A test watchlist",
            user: user,
            mediaItems: [],
        })
    );
});

test('given an invalid watchlist id, when getting watchlist by id, then an error is thrown', async () => {
    // given
    watchlistDB.getWatchlistById = jest.fn().mockResolvedValue(null);

    // when
    try {
        await WatchlistService.getWatchlistById(1);
    } catch (error) {
        // then
        expect(error).toBeInstanceOf(Error);
    }
});

test('given a valid watchlist id, when deleting a watchlist, then watchlist is deleted', async () => {
    // given
    watchlistDB.getWatchlistById = jest.fn().mockResolvedValue(existingWatchlist);
    watchlistDB.deleteWatchlist = deleteWatchlistMock;

    // when
    await WatchlistService.deleteWatchlist(1, 1, Role.USER);

    // then
    expect(deleteWatchlistMock).toHaveBeenCalledTimes(1);
    expect(deleteWatchlistMock).toHaveBeenCalledWith(1);
});

test('given an invalid watchlist id, when deleting a watchlist, then an error is thrown', async () => {
    // given
    watchlistDB.deleteWatchlist = deleteWatchlistMock;

    // when
    try {
        await WatchlistService.deleteWatchlist(1, 1, Role.USER);
    } catch (error) {
        // then
        expect(error).toBeInstanceOf(Error);
    }
});

test('given a valid watchlist id and media id, when adding media to watchlist, then media is added to watchlist', async () => {
    // given
    watchlistDB.getWatchlistById = jest.fn().mockResolvedValue(existingWatchlist);
    watchlistDB.addMediaToWatchlist = jest.fn();

    // when
    await WatchlistService.addMediaToWatchlist(1, 1, 1, Role.USER);

    // then
    expect(watchlistDB.addMediaToWatchlist).toHaveBeenCalledTimes(1);
    expect(watchlistDB.addMediaToWatchlist).toHaveBeenCalledWith(1, 1);
});

test('given an invalid watchlist id, when adding media to watchlist, then an error is thrown', async () => {
    // given
    watchlistDB.getWatchlistById = jest.fn().mockResolvedValue(null);

    // when
    try {
        await WatchlistService.addMediaToWatchlist(1, 1, 1, Role.USER);
    } catch (error) {
        // then
        expect(error).toBeInstanceOf(Error);
    }
});

test('given a valid watchlist id and media id, when deleting media from watchlist, then media is deleted from watchlist', async () => {
    // given
    watchlistDB.getWatchlistById = jest.fn().mockResolvedValue(existingWatchlist);
    watchlistDB.deleteMediaFromWatchlist = jest.fn();

    // when
    await WatchlistService.deleteMediaFromWatchlist(1, 1, 1, Role.USER);

    // then
    expect(watchlistDB.deleteMediaFromWatchlist).toHaveBeenCalledTimes(1);
    expect(watchlistDB.deleteMediaFromWatchlist).toHaveBeenCalledWith(1, 1);
});

test('given an invalid watchlist id, when deleting media from watchlist, then an error is thrown', async () => {
    // given
    watchlistDB.getWatchlistById = jest.fn().mockResolvedValue(null);

    // when
    try {
        await WatchlistService.deleteMediaFromWatchlist(1, 1, 1, Role.USER);
    } catch (error) {
        // then
        expect(error).toBeInstanceOf(Error);
    }
});

test('given a valid watchlist id and updates, when updating a watchlist, then watchlist is updated with those values', async () => {
    // given
    watchlistDB.getWatchlistById = jest.fn().mockResolvedValue(existingWatchlist);
    watchlistDB.updateWatchlist = jest.fn();

    // when
    await WatchlistService.updateWatchlist(1, { name: "Updated Watchlist" }, 1, Role.USER);

    // then
    expect(watchlistDB.updateWatchlist).toHaveBeenCalledTimes(1);
    expect(watchlistDB.updateWatchlist).toHaveBeenCalledWith(1, { name: "Updated Watchlist" });
});









