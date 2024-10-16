import { Media } from './media';
import { Genre } from './genre';

export class Series extends Media {
    private number_of_seasons: number;

    constructor(title: string, description: string, release_year: number, genres: Genre[], number_of_seasons: number) {
        super(title, description, release_year, genres);
        this.number_of_seasons = number_of_seasons;
    }

    // Getters
    public getNumberOfSeasons(): number {
        return this.number_of_seasons;
    }

    // Setters
    public setNumberOfSeasons(number_of_seasons: number): void {
        this.number_of_seasons = number_of_seasons;
    }
}