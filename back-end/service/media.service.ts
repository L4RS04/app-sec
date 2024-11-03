import mediaDB from '../repository/media.db';
import { Media } from '../model/media';
import { Movie } from '../model/movie';
import { MediaInput } from '../types';
import { Series } from '../model/series';
import mediaDb from '../repository/media.db';
import { Genre } from '../model/genre';

let mediaIdCounter = 0;

const createMedia = ({ title, release_year, description, genres, type, director, duration, number_of_seasons }: MediaInput): Media => {
    const existingMedia = mediaDB.getAllMedia().find(media => media.getTitle() === title);

    if (existingMedia) {
        throw new Error(`${type} already exists`);
    }

    const id = mediaIdCounter++;
    let media: Media;

    if (type === 'Movie') {
        media = new Movie({
            id,
            title: title!,
            release_year: release_year!,
            description: description!,
            genres: genres!,
            director: director!,
            duration: duration!
        });
    } else if (type === 'Series') {
        media = new Series({
            id,
            title: title!,
            release_year: release_year!,
            description: description!,
            genres: genres!,
            number_of_seasons: number_of_seasons!
        });
    } else {
        throw new Error('Invalid media type');
    }

    mediaDb.createMedia(media);

    return media;
}
    
const getGenres = async (): Promise<Genre[]> => {
    return Object.values(Genre);
}

const getAllMedia = async (): Promise<Media[]> => mediaDB.getAllMedia();

const getAllMovies = async (): Promise<Movie[]> => mediaDB.getAllMovies();

const getAllSeries = async (): Promise<Media[]> => mediaDB.getAllSeries();

const deleteMedia = (mediaId: number): void => {
    const media = mediaDB.getMediaById(mediaId);

    if (!media) {
        throw new Error('Media not found');
    }

    mediaDB.deleteMedia(media);
}


const MediaService = {
    createMedia,
    deleteMedia,
    getGenres,
    getAllMedia,
    getAllMovies,
    getAllSeries
}

export default MediaService;