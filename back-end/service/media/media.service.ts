import mediaDB from '../../repository/media.db';
import { Media } from '../../model/media/media';
import { Movie } from '../../model/media/movie';
import { Series } from '../../model/media/series';
import { Genre } from '../../model/genre/genre';
import { MediaInput } from '../../types';
import { Role } from '../../model/user/role';

const getAllMedia = async (): Promise<Media[]> => {
    return mediaDB.getAllMedia();
};

const getAllMovies = async (): Promise<Movie[]> => {
    return mediaDB.getAllMovies();
}

const getAllSeries = async (): Promise<Series[]> => {
    return mediaDB.getAllSeries();
}

const getMediaById = async (id: number): Promise<Media | null> => {
    return mediaDB.getMediaById(id);
}

const getMovieById = async (id: number): Promise<Movie | null> => {
    return mediaDB.getMovieById(id);
}

const getSeriesById = async (id: number): Promise<Series | null> => {
    return mediaDB.getSeriesById(id);
}

const getAllGenres = async (): Promise<Genre[]> => {
    try {
        const genres = Object.values(Genre);
        return genres;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving genres. See console for details.');
    }
};

const createMedia = async (mediaInput: MediaInput, role: Role): Promise<Media> => {
    if (role !== Role.ADMIN) {
        throw new Error('Forbidden, only admins can create media');
    }

    if (!mediaInput.title || !mediaInput.description || !mediaInput.releaseYear || !mediaInput.genres || !mediaInput.type) {
        throw new Error('Missing required media properties');
    }

    if (mediaInput.type !== 'MOVIE' && mediaInput.type !== 'SERIES') {
        throw new Error('Invalid media type');
    }

    const genres = mediaInput.genres.map(genre => Genre[genre as keyof typeof Genre]);

    let media: Media;
    if (mediaInput.type === 'MOVIE') {
        media = new Movie({
            title: mediaInput.title,
            description: mediaInput.description,
            releaseYear: mediaInput.releaseYear,
            genres,
            director: mediaInput.director!,
            duration: mediaInput.duration!
        });
    } else if (mediaInput.type === 'SERIES') {
        media = new Series({
            title: mediaInput.title,
            description: mediaInput.description,
            releaseYear: mediaInput.releaseYear,
            genres,
            numberOfSeasons: mediaInput.numberOfSeasons!
        });
    } else {
        throw new Error('Invalid media type');
    }

    return await mediaDB.createMedia(media);
};

const deleteMedia = async (id: number, role: Role): Promise<void> => {
    if (role !== Role.ADMIN) {
        throw new Error('Forbidden, only admins can delete media');
    }

    const media = await mediaDB.getMediaById(id);
    if (!media) {
        throw new Error('Media not found');
    }

    await mediaDB.deleteMedia(id);
};

const updateMedia = async (id: number, mediaInput: MediaInput, role: Role): Promise<Media> => {
    if (role !== Role.ADMIN) {
        throw new Error('Forbidden, only admins can update media');
    }

    if (!mediaInput.title || !mediaInput.description || !mediaInput.releaseYear || !mediaInput.genres || !mediaInput.type) {
        throw new Error('Missing required media properties');
    }

    if (mediaInput.type !== 'MOVIE' && mediaInput.type !== 'SERIES') {
        throw new Error('Invalid media type');
    }

    const genres = mediaInput.genres.map(genre => Genre[genre as keyof typeof Genre]);

    const existingMedia = await mediaDB.getMediaById(id);
    if (!existingMedia) {
        throw new Error('Media not found');
    }

    existingMedia.setTitle(mediaInput.title);
    existingMedia.setDescription(mediaInput.description);
    existingMedia.setReleaseYear(mediaInput.releaseYear);
    existingMedia.setGenres(genres);

    if (mediaInput.type === 'MOVIE') {
        if (!(existingMedia instanceof Movie)) {
            throw new Error('Media type mismatch');
        }
        existingMedia.setDirector(mediaInput.director!);
        existingMedia.setDuration(mediaInput.duration!);
    } else if (mediaInput.type === 'SERIES') {
        if (!(existingMedia instanceof Series)) {
            throw new Error('Media type mismatch');
        }
        existingMedia.setNumberOfSeasons(mediaInput.numberOfSeasons!);
    } else {
        throw new Error('Invalid media type');
    }

    return await mediaDB.updateMedia(id, existingMedia);
};

const MediaService = {
    getAllMedia,
    getAllMovies,
    getAllSeries,
    getMediaById,
    getAllGenres,
    createMedia,
    deleteMedia,
    updateMedia,
    getMovieById,
    getSeriesById
};

export default MediaService;

