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

const MediaService = {
    getAllMedia,
    getAllMovies,
    getAllSeries,
    getAllGenres,
    createMedia,
    deleteMedia
};

export default MediaService;

