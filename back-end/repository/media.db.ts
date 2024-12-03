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

const createMedia = async (media: Media): Promise<Media> => {
    try {
        const data: any = {
            title: media.getTitle(),
            description: media.getDescription(),
            releaseYear: media.getReleaseYear(),
            genres: media.getGenres().map(genre => genre.toString()),
            type: media.getType(),
        };

        if (media instanceof Movie) {
            data.duration = media.getDuration();
            data.director = media.getDirector();
        } else if (media instanceof Series) {
            data.numberOfSeasons = media.getNumberOfSeasons();
        }

        const mediaPrisma = await prisma.media.create({
            data
        });

        if (mediaPrisma.type === 'MOVIE') {
            return Movie.from(mediaPrisma);
        } else {
            return Series.from(mediaPrisma);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error. Seer server log for details.');
    }
};


export default {
    getAllMedia,
    getAllMovies,
    getAllSeries,
    createMedia,
};


