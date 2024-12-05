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



const getAllGenres = async (): Promise<Genre[]> => {
    try {
        const genres = Object.values(Genre);
        return genres;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving genres. See console for details.');
    }
};

const createMedia = async (mediaInput: MediaInput): Promise<Media> => {

    if (!mediaInput.title || !mediaInput.description || !mediaInput.releaseYear || !mediaInput.genres || !mediaInput.type) {
        throw new Error('Missing required media properties');
    }

    // Validate media type
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

const MediaService = {
    getAllMedia,
    getAllMovies,
    getAllSeries,
    getAllGenres,
    createMedia,
};

export default MediaService;

