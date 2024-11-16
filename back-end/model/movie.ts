import { Genre } from "./genre";
import { Media } from "./media";
// import { Movie as MoviePrisma, Media as MediaPrisma } from '@prisma/client';

export class Movie extends Media {
    private duration: number;
    private director: string;

    constructor(movie: {
        id?: number;
        title: string;
        description: string;
        releaseYear: number;
        genres: Genre[];
        duration: number;
        director: string;
    }) {
        super({
            id: movie.id,
            title: movie.title,
            description: movie.description,
            releaseYear: movie.releaseYear,
            genres: movie.genres,
            type: "MOVIE",
        });
        this.validate_movie(movie);

        this.duration = movie.duration;
        this.director = movie.director;
    }

    // Getters
    public getDuration(): number {
        return this.duration;
    }

    public getDirector(): string {
        return this.director;
    }


    // Override the `toJSON` method
    public toJSON() {
        return {
            ...super.toJSON(),
            duration: this.duration,
            director: this.director,
        };
    }

    // Validation
    private validate_movie(movie: {
        duration: number;
        director: string;
    }): void {
        if (!movie.duration || movie.duration < 0) {
            throw new Error("Movie duration is required and must be a non-negative number");
        }
        if (!movie.director) {
            throw new Error("Movie director is required");
        }
    }
}
