import { Genre } from './genre';
// import { Rating } from './rating';
import { Media as MediaPrisma } from '@prisma/client';

export class Media {
    private id?: number;
    private title: string;
    private description: string;
    private releaseYear: number;
    private genres: Genre[];
    // private ratings: Rating[];
    private type: string;

    constructor(media: {
        id?: number,
        title: string,
        description: string,
        releaseYear: number,
        genres: Genre[],
        type: string
    }) {
        this.validate(media);

        this.id = media.id;
        this.title = media.title;
        this.description = media.description;
        this.releaseYear = media.releaseYear;
        this.genres = media.genres;
        // this.ratings = [];
        this.type = media.type;
    }

    // Getters
    public getId(): number | undefined {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getReleaseYear(): number {
        return this.releaseYear;
    }

    public getGenres(): Genre[] {
        return this.genres;
    }

    // public getRatings(): Rating[] {
    //     return this.ratings;
    // }

    public getType(): string {
        return this.type;
    }

    // Setters
    public setTitle(title: string): void {
        this.title = title;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setReleaseYear(releaseYear: number): void {
        this.releaseYear = releaseYear;
    }

    public setType(type: string): void {
        this.type = type;
    }

    // Add methods
    public addGenre(genre: Genre): void {
        this.genres.push(genre);
    }

    // public addRating(rating: Rating): void {
    //     this.ratings.push(rating);
    // }

    // Method to return a JSON-safe representation of the Watchlist object
    public toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            releaseYear: this.releaseYear,
            genres: this.genres,
            type: this.type
    }
}

    // Validation
    private validate(media: {
        title: string,
        description: string,
        releaseYear: number,
        genres: Genre[],
        type: string

    }) {
    if (!media.title?.trim()) {
        throw new Error('Title is required');
    }
    if (!media.description?.trim()) {
        throw new Error('Description is required');
    }
    if (!media.releaseYear?.toString().trim()) {
        throw new Error('Year of release is required');
    }
}

static from({
    id,
    title,
    description,
    releaseYear,
    genres,
    type
}: MediaPrisma): Media {
    return new Media({
        id,
        title,
        description,
        releaseYear,
        genres: genres.map((genre: string) => Genre[genre as keyof typeof Genre]),
        type
    });
}




    // // Other methods
    // public getAverageRating(): number {
    //     if (this.ratings.length === 0) return 0;
    //     const sum = this.ratings.reduce((acc, rating) => acc + rating.getScore(), 0);
    //     return sum / this.ratings.length;
    // }
}
