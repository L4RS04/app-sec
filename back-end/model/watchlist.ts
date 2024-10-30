import { Media } from "./media";
import { User } from "./user";

export class Watchlist {
    private name: string;
    private description: string;
    private creation_date: Date;
    private media_items: Media[];
    private creator: User;

    constructor(watchlist: {
        name: string,
        description: string,
        media_items: Media[],
        creator: User
    }) {
        this.validate(watchlist);

        this.name = watchlist.name;
        this.description = watchlist.description;
        this.creation_date = new Date();
        this.media_items = watchlist.media_items;
        this.creator = watchlist.creator;
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

    public getCreator(): User {
        return this.creator;
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

    public setCreator(creator: User): void {
        this.creator = creator;
    }

    // Add methods
    public addMedia(media: Media): void {
        this.media_items.push(media);
    }

    // Validation
    private validate(watchlist: {
        name: string,
        description: string,
        media_items: Media[],
        creator: User
    }): void {
        if (!watchlist.name.trim()) {
            throw new Error("Name is required.");
        }

        if (!watchlist.description.trim()) {
            throw new Error("Description is required.");
        }

        if (!watchlist.creator) {
            throw new Error("Creator is required.");
        }
    }
}

