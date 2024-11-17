import mediaDB from '../repository/media.db';
import { Media } from '../model/media';
import { Movie } from '../model/movie';
import { Series } from '../model/series';

const getAllMedia = async (): Promise<Media[]> => {
    return mediaDB.getAllMedia();
};

const getAllMovies = async (): Promise<Movie[]> => {
    return mediaDB.getAllMovies();
}

const getAllSeries = async (): Promise<Series[]> => {
    return mediaDB.getAllSeries();
}

const MediaService = {
    getAllMedia,
    getAllMovies,
    getAllSeries,
};

export default MediaService;

