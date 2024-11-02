import mediaDB from '../repository/media.db';
import { Media } from '../model/media';
import { Movie } from '../model/movie';

const getAllMedia = async (): Promise<Media[]> => mediaDB.getAllMedia();

const getAllMovies = async (): Promise<Movie[]> => mediaDB.getAllMovies();

const getAllSeries = async (): Promise<Media[]> => mediaDB.getAllSeries();

export default { getAllMedia, getAllMovies, getAllSeries };