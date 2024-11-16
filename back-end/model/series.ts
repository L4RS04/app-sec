import { Media } from './media';
import { Genre } from './genre';

export class Series extends Media {
    private numberOfSeasons: number;

    constructor(series: {
        id?: number,
        title: string,
        description: string,
        releaseYear: number,
        genres: Genre[],
        numberOfSeasons: number
    }) {
        super({
            id: series.id,
            title: series.title,
            description: series.description,
            releaseYear: series.releaseYear,
            genres: series.genres,
            type: "SERIES"
        });
        this.validate_series(series);

        this.numberOfSeasons = series.numberOfSeasons;
    }

    // Getters
    public getNumberOfSeasons(): number {
        return this.numberOfSeasons;
    }

    // Setters
    public setNumberOfSeasons(numberOfSeasons: number): void {
        this.numberOfSeasons = numberOfSeasons;
    }

    // Override the toJSON method to include number of seasons
    public toJSON() {
        return {
            ...super.toJSON(),
            numberOfSeasons: this.numberOfSeasons
        }
    }

    // Validation
    private validate_series(series: {
        numberOfSeasons: number
    }): void {
        if (!series.numberOfSeasons || series.numberOfSeasons < 0) {
            throw new Error("Series number of seasons is required");
        }
    }
}