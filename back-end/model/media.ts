export class Media {
    private title: string;
    private description: string;
    private release_year: number;

    constructor(title: string, description: string, release_year: number) {
        this.title = title;
        this.description = description;
        this.release_year = release_year;
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
}



