import { Media } from '../model/media';
import { Movie } from '../model/movie';
import { Series } from '../model/series';
import prisma from './database';

const getAllMedia = async (): Promise<Media[]> => {
    try {
        const mediaPrisma = await prisma.media.findMany()
        return mediaPrisma.map((mediaPrisma) => {
            if (mediaPrisma.type === 'MOVIE') {
                return Movie.from(mediaPrisma);
            } else {
                return Series.from(mediaPrisma);
            } 
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
};

const getAllMovies = async (): Promise<Movie[]> => {
    try {
        const moviesPrisma = await prisma.media.findMany({
            where: { type: 'MOVIE' }
        });
        return moviesPrisma.map((moviePrisma) => Movie.from(moviePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
}

const getAllSeries = async (): Promise<Series[]> => {
    try {
        const seriesPrisma = await prisma.media.findMany({
            where: { type: 'SERIES' }
        });
        return seriesPrisma.map((seriesPrisma) => Series.from(seriesPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See console for details.');
    }
}

export default {
    getAllMedia,
    getAllMovies,
    getAllSeries,
}


