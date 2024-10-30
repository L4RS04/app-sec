import { Media } from "./media";

export class Watchlist {
    private name: string;
    private description: string;
    private creation_date: Date;
    private media_items: Media[];

    constructor(name: string, description: string, media_items: Media[]) {
        this.name = name;
        this.description = description;
        this.creation_date = new Date();
        this.media_items = media_items;
    }

    // Getters
    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getCreationDate(): Date {
        return this.creation_date;
    }

    public getMedia(): Media[] {
        return this.media_items;
    }
    
    // Setters
    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setCreationDate(creation_date: Date): void {
        this.creation_date = creation_date;
    }

    public addMedia(media: Media): void {
        this.media_items.push(media);
    }
}

