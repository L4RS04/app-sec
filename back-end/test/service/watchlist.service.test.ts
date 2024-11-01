import { User } from "../../model/user";
import userDb from "../../repository/user.db";
import watchlistDb from "../../repository/watchlist.db";
import mediaDb from "../../repository/media.db";
import watchlistService from "../../service/watchlist.service";
import { UserInput } from "../../types";

const userInput: UserInput = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'JohnD123!',
};

const user = new User({
    ...userInput,
});

let createWatchlistMock: jest.Mock;
let deleteWatchlistMock: jest.Mock;
let mockMediaDbGetMediaById: jest.Mock;
let mockUserDbGetUserById: jest.Mock;
let mockWatchlistDbGetWatchlistById: jest.Mock;

beforeEach(() => {
    mockMediaDbGetMediaById = jest.fn();
    mockUserDbGetUserById = jest.fn();
    mockWatchlistDbGetWatchlistById = jest.fn();

    createWatchlistMock = jest.fn();
    deleteWatchlistMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid user, when creating a watchlist, then watchlist is created with those values', () => {
    // given
    userDb.getUserById = mockUserDbGetUserById.mockReturnValue(user);

    watchlistDb.createWatchlist = createWatchlistMock;
    
    // when
    watchlistService.createWatchlist({
        name: 'Watchlist 1',
        description: 'Description 1',
        creatorId: user.getId() ?? 0,
    });

    // then
    expect(createWatchlistMock).toHaveBeenCalledTimes(1);
    expect(createWatchlistMock).toHaveBeenCalledWith(
        expect.objectContaining({
            id: 0,
            name: 'Watchlist 1',
            description: 'Description 1',
            media_items: [],
            creator: expect.objectContaining({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
            }),
        })
    );
});

test('given a non-existent user, when creating a watchlist, then error is thrown', () => {
    // given
    userDb.getUserById = mockUserDbGetUserById.mockReturnValue(undefined);

    // when
    expect(() => {
        watchlistService.createWatchlist({
            name: 'Watchlist 1',
            description: 'Description 1',
            creatorId: user.getId() ?? 0,
        });
    }).toThrowError('Creator not found');
});

test('given a watchlist without a name, when creating a watchlist, then error is thrown', () => {
    // given
    userDb.getUserById = mockUserDbGetUserById.mockReturnValue(user);

    // when
    expect(() => {
        watchlistService.createWatchlist({
            name: '',
            description: 'Description 1',
            creatorId: user.getId() ?? 0,
        });
    }).toThrowError('Name is required');
});

test('given a valid watchlist id, when deleting a watchlist, then watchlist is deleted', () => {
    // given
    const watchlistId = 1;
    const watchlist = { id: watchlistId, name: 'Watchlist 1', description: 'Description 1', media_items: [], creator: user };
    watchlistDb.getWatchlistById = mockWatchlistDbGetWatchlistById.mockReturnValue(watchlist);
    watchlistDb.deleteWatchlist = deleteWatchlistMock;

    // when
    watchlistService.deleteWatchlist(watchlistId);

    // then
    expect(mockWatchlistDbGetWatchlistById).toHaveBeenCalledWith(watchlistId);
    expect(deleteWatchlistMock).toHaveBeenCalledWith(watchlist);
});

test('given a non-existent watchlist id, when deleting a watchlist, then error is thrown', () => {
    // given
    const watchlistId = 1;
    watchlistDb.getWatchlistById = mockWatchlistDbGetWatchlistById.mockReturnValue(undefined);

    // when
    expect(() => {
        watchlistService.deleteWatchlist(watchlistId);
    }).toThrowError('Watchlist not found');
});

test('given a valid watchlist and media id, when adding media to watchlist, then media is added', () => {
    // given
    const watchlistId = 1;
    const mediaId = 1;
    const watchlist = { id: watchlistId, name: 'Watchlist 1', description: 'Description 1', media_items: [], creator: user, addMediaToWatchlist: jest.fn() };
    const media = { id: mediaId, title: 'Media 1' };
    watchlistDb.getWatchlistById = mockWatchlistDbGetWatchlistById.mockReturnValue(watchlist);
    mediaDb.getMediaById = mockMediaDbGetMediaById.mockReturnValue(media);

    // when
    watchlistService.addMediaToWatchlist(watchlistId, mediaId);

    // then
    expect(mockWatchlistDbGetWatchlistById).toHaveBeenCalledWith(watchlistId);
    expect(mockMediaDbGetMediaById).toHaveBeenCalledWith(mediaId);
    expect(watchlist.addMediaToWatchlist).toHaveBeenCalledWith(media);
});

test('given a non-existent watchlist id, when adding media to watchlist, then error is thrown', () => {
    // given
    const watchlistId = 1;
    const mediaId = 1;
    watchlistDb.getWatchlistById = mockWatchlistDbGetWatchlistById.mockReturnValue(undefined);

    // when
    expect(() => {
        watchlistService.addMediaToWatchlist(watchlistId, mediaId);
    }).toThrowError('Watchlist not found');
});

test('given a non-existent media id, when adding media to watchlist, then error is thrown', () => {
    // given
    const watchlistId = 1;
    const mediaId = 1;
    const watchlist = { id: watchlistId, name: 'Watchlist 1', description: 'Description 1', media_items: [], creator: user, addMediaToWatchlist: jest.fn() };
    watchlistDb.getWatchlistById = mockWatchlistDbGetWatchlistById.mockReturnValue(watchlist);
    mediaDb.getMediaById = mockMediaDbGetMediaById.mockReturnValue(undefined);

    // when
    expect(() => {
        watchlistService.addMediaToWatchlist(watchlistId, mediaId);
    }).toThrowError('Media not found');
});

test('given a valid watchlist and media id, when deleting media from watchlist, then media is removed', () => {
    // given
    const watchlistId = 1;
    const mediaId = 1;
    const media = { id: mediaId, title: 'Media 1' };
    const watchlist = { id: watchlistId, name: 'Watchlist 1', description: 'Description 1', media_items: [media], creator: user, removeMediaFromWatchlist: jest.fn() };
    watchlistDb.getWatchlistById = mockWatchlistDbGetWatchlistById.mockReturnValue(watchlist);
    mediaDb.getMediaById = mockMediaDbGetMediaById.mockReturnValue(media);

    // when
    watchlistService.deleteMediaFromWatchlist(watchlistId, mediaId);

    // then
    expect(mockWatchlistDbGetWatchlistById).toHaveBeenCalledWith(watchlistId);
    expect(mockMediaDbGetMediaById).toHaveBeenCalledWith(mediaId);
    expect(watchlist.removeMediaFromWatchlist).toHaveBeenCalledWith(media);
});

test('given a non-existent watchlist id, when deleting media from watchlist, then error is thrown', () => {
    // given
    const watchlistId = 1;
    const mediaId = 1;
    watchlistDb.getWatchlistById = mockWatchlistDbGetWatchlistById.mockReturnValue(undefined);

    // when
    expect(() => {
        watchlistService.deleteMediaFromWatchlist(watchlistId, mediaId);
    }).toThrowError('Watchlist not found');
});

test('given a non-existent media id, when deleting media from watchlist, then error is thrown', () => {
    // given
    const watchlistId = 1;
    const mediaId = 1;
    const watchlist = { id: watchlistId, name: 'Watchlist 1', description: 'Description 1', media_items: [], creator: user, removeMediaFromWatchlist: jest.fn() };
    watchlistDb.getWatchlistById = mockWatchlistDbGetWatchlistById.mockReturnValue(watchlist);
    mediaDb.getMediaById = mockMediaDbGetMediaById.mockReturnValue(undefined);

    // when
    expect(() => {
        watchlistService.deleteMediaFromWatchlist(watchlistId, mediaId);
    }).toThrowError('Media not found');
});
