import { Media } from './media';
import { Genre } from './genre';

export class Series extends Media {
    private number_of_seasons: number;

    constructor(series: {
        title: string,
        description: string,
        release_year: number,
        genres: Genre[],
        number_of_seasons: number
    }) {
        super({
            title: series.title,
            description: series.description,
            release_year: series.release_year,
            genres: series.genres,
            type: "Series"
        });
        this.validate_series(series);

        this.number_of_seasons = series.number_of_seasons;
    }

    // Getters
    public getNumberOfSeasons(): number {
        return this.number_of_seasons;
    }

    // Setters
    public setNumberOfSeasons(number_of_seasons: number): void {
        this.number_of_seasons = number_of_seasons;
    }

    // Validation
    private validate_series(series: {
        number_of_seasons: number
    }): void {
        if (!series.number_of_seasons || series.number_of_seasons < 0) {
            throw new Error("Series number of seasons is required");
        }
    }
}