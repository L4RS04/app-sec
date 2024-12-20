import { Genre } from '../genre/genre';
import { Media as MediaPrisma } from '@prisma/client';

export class Media {
    private id?: number;
    private title: string;
    private description: string;
    private releaseYear: number;
    private genres: Genre[];
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
        this.type = media.type;
    }

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

    public getType(): string {
        return this.type;
    }

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

    public setGenres(genres: Genre[]): void {
        this.genres = genres;
    }

    public addGenre(genre: Genre): void {
        this.genres.push(genre);
    }
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
        throw new Error('Release year is required');
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
}
