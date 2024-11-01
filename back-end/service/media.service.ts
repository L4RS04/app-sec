import mediaDB from '../repository/media.db';
import { Media } from '../model/media';

const getAllMedia = async (): Promise<Media[]> => mediaDB.getAllMedia();

const getAllMovies = async (): Promise<Media[]> => mediaDB.getAllMovies();

const getAllSeries = async (): Promise<Media[]> => mediaDB.getAllSeries();

export default { getAllMedia, getAllMovies, getAllSeries };