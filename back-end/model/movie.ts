import { Media } from './media';
import { Genre } from './genre';

export class Movie extends Media {
    private duration: number;
    private director: string;


    constructor(movie: {
        release_year: number,
        title: string,
        description: string,
        genres: Genre[],
        duration: number,
        director: string
    }) {
        super({
            title: movie.title,
            description: movie.description,
            release_year: movie.release_year,
            genres: movie.genres,
            type: "Movie"
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

    // Setters
    public setDuration(duration: number): void {
        this.duration = duration;
    }

    public setDirector(director: string): void {
        this.director = director;
    }

    // Validation
    private validate_movie(movie: {
        duration: number,
        director: string
    }): void {
        if (!movie.duration || movie.duration < 0) {
            throw new Error("Movie duration is required and must be a non-negative number");
        }

        if (!movie.director || movie.director.length < 1) {
            throw new Error("Movie director is required");
        }
    }

}