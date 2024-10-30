import { Genre } from './genre';
import { Rating } from './rating';

export class Media {
    private title: string;
    private description: string;
    private release_year: number;
    private genres: Genre[];
    private ratings: Rating[];

    constructor(title: string, description: string, release_year: number, genres: Genre[]) {
        this.title = title;
        this.description = description;
        this.release_year = release_year;
        this.genres = genres;
        this.ratings = [];
    }

    // Getters
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

    // Add methods
    public addGenre(genre: Genre): void {
        this.genres.push(genre);
    }

    public addRating(rating: Rating): void {
        this.ratings.push(rating);
    }

    // Other methods
    public getAverageRating(): number {
        if (this.ratings.length === 0) return 0;
        const sum = this.ratings.reduce((acc, rating) => acc + rating.getScore(), 0);
        return sum / this.ratings.length;
    }
}
