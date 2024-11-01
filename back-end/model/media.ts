import { Genre } from './genre';
import { Rating } from './rating';

export class Media {
    private id?: number;
    private title: string;
    private description: string;
    private release_year: number;
    private genres: Genre[];
    private ratings: Rating[];
    private type: string;

    constructor(media: {
        id?: number,
        title: string,
        description: string,
        release_year: number,
        genres: Genre[],
        type: string
    }) {
        this.validate(media);

        this.id = media.id;
        this.title = media.title;
        this.description = media.description;
        this.release_year = media.release_year;
        this.genres = media.genres;
        this.ratings = [];
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
        return this.release_year;
    }

    public getGenres(): Genre[] {
        return this.genres;
    }

    public getRatings(): Rating[] {
        return this.ratings;
    }

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

    public setReleaseYear(release_year: number): void {
        this.release_year = release_year;
    }

    public setType(type: string): void {
        this.type = type;
    }

    // Add methods
    public addGenre(genre: Genre): void {
        this.genres.push(genre);
    }

    public addRating(rating: Rating): void {
        this.ratings.push(rating);
    }

    // Validation
    private validate(media: {
        title: string,
        description: string,
        release_year: number,
        genres: Genre[],
        type: string

    }) {
    if (!media.title?.trim()) {
        throw new Error('Title is required');
    }
    if (!media.description?.trim()) {
        throw new Error('Description is required');
    }
    if (!media.release_year?.toString().trim()) {
        throw new Error('Year of release is required');
    }
}

    // Other methods
    public getAverageRating(): number {
        if (this.ratings.length === 0) return 0;
        const sum = this.ratings.reduce((acc, rating) => acc + rating.getScore(), 0);
        return sum / this.ratings.length;
    }
}
