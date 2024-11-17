import { Media } from './media';
import { Genre } from './genre';
import { Media as MediaPrisma } from '@prisma/client';

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

    static from(mediaPrisma: MediaPrisma): Series {
        return new Series({
            id: mediaPrisma.id,
            title: mediaPrisma.title,
            description: mediaPrisma.description,
            releaseYear: mediaPrisma.releaseYear,
            genres: mediaPrisma.genres.map((genre: string) => Genre[genre as keyof typeof Genre]),
            numberOfSeasons: mediaPrisma.numberOfSeasons!
        });
    }
}