import { Media } from './media';

export class Series extends Media {
    private number_of_seasons: number;

    constructor(title: string, description: string, release_year: number, number_of_seasons: number) {
        super(title, description, release_year);
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