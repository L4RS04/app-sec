import mediaDB from '../repository/media.db';
import { Media } from '../model/media';
import { Movie } from '../model/movie';
import { Series } from '../model/series';
import { Genre } from '../model/genre';
import { MediaInput } from '../types';

const getAllMedia = async (): Promise<Media[]> => {
    return mediaDB.getAllMedia();
};

const getAllMovies = async (): Promise<Movie[]> => {
    return mediaDB.getAllMovies();
}

const getAllSeries = async (): Promise<Series[]> => {
    return mediaDB.getAllSeries();
}

const createMedia = async (mediaInput: MediaInput): Promise<Media> => {
    if (!mediaInput.title || !mediaInput.description || !mediaInput.releaseYear || !mediaInput.genres || !mediaInput.type) {
        throw new Error('Missing required media properties');
    }

    let media: Media;
    const genres = mediaInput.genres.map(genre => Genre[genre as keyof typeof Genre]);

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

const MediaService = {
    getAllMedia,
    getAllMovies,
    getAllSeries,
    createMedia,
};

export default MediaService;

