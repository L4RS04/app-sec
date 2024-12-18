import { Media } from '../model/media/media';
import { Movie } from '../model/media/movie';
import { Series } from '../model/media/series';
import prisma from './database';

const getMediaById = async (id: number): Promise<Media | null> => {
    try {
        const mediaPrisma = await prisma.media.findUnique({
            where: { id }
        });

        if (!mediaPrisma) {
            return null;
        }

        if (mediaPrisma.type === 'MOVIE') {
            return Movie.from(mediaPrisma);
        } else {
            return Series.from(mediaPrisma);
        }
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error. See server log for details.');
    }
};

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
        const genres = media.getGenres();

        const data: any = {
            title: media.getTitle(),
            description: media.getDescription(),
            releaseYear: media.getReleaseYear(),
            genres: genres.map(genre => genre.toString()),
            type: media.getType(),
        };

        if (media instanceof Movie) {
            data.duration = media.getDuration();
            data.director = media.getDirector();
        } else if (media instanceof Series) {
            data.numberOfSeasons = media.getNumberOfSeasons();
        }

        data.releaseYear = parseInt(data.releaseYear, 10);
        if (data.duration) {
            data.duration = parseInt(data.duration, 10);
        }
        if (data.numberOfSeasons) {
            data.numberOfSeasons = parseInt(data.numberOfSeasons, 10);
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
        console.error('Database error:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteMedia = async (id: number): Promise<void> => {
    try {
        await prisma.media.delete({
            where: { id }
        });
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateMedia = async (id: number, media: Media): Promise<Media> => {
    try {
        const genres = media.getGenres();

        const data: any = {
            title: media.getTitle(),
            description: media.getDescription(),
            releaseYear: media.getReleaseYear(),
            genres: genres.map(genre => genre.toString()),
            type: media.getType(),
        };

        if (media instanceof Movie) {
            data.duration = media.getDuration();
            data.director = media.getDirector();
        } else if (media instanceof Series) {
            data.numberOfSeasons = media.getNumberOfSeasons();
        }

        data.releaseYear = parseInt(data.releaseYear, 10);
        if (data.duration) {
            data.duration = parseInt(data.duration, 10);
        }
        if (data.numberOfSeasons) {
            data.numberOfSeasons = parseInt(data.numberOfSeasons, 10);
        }

        const mediaPrisma = await prisma.media.update({
            where: { id },
            data
        });

        if (mediaPrisma.type === 'MOVIE') {
            return Movie.from(mediaPrisma);
        } else {
            return Series.from(mediaPrisma);
        }
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getMediaById,
    getAllMedia,
    getAllMovies,
    getAllSeries,
    createMedia,
    deleteMedia,
    updateMedia
};


