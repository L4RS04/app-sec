import { Media } from './media';

export class Movie extends Media {
    private duration: number;
    private director: string;

    constructor(release_year: number, title: string, description: string, duration: number, director: string) {
        super(title, description, release_year);
        this.duration = duration;
        this.director = director;
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

}