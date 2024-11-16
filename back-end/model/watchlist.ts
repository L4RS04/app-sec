import { Media } from "./media";
import { User } from "./user";
import { Media as MediaPrisma, Watchlist as WatchlistPrisma } from "@prisma/client";


export class Watchlist {
    private id?: number;
    private name: string;
    private description: string;
    private creationDate: Date;
    private mediaItems: Media[];
    private creator: User;

    constructor(watchlist: {
        id?: number,
        name: string,
        description: string,
        mediaItems: Media[],
        creator: User,
        creationDate?: Date
    }) {
        this.validate(watchlist);

        this.id = watchlist.id;
        this.name = watchlist.name;
        this.description = watchlist.description;
        this.creationDate = watchlist.creationDate || new Date();
        this.mediaItems = watchlist.mediaItems;
        this.creator = watchlist.creator;
    }

    // Getters
    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getCreationDate(): Date {
        return this.creationDate;
    }

    public getMedia(): Media[] {
        return this.mediaItems;
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
        this.creationDate = creation_date;
    }

    public setCreator(creator: User): void {
        this.creator = creator;
    }

    // Add & remove methods
    public addMediaToWatchlist(media: Media): void {
        this.mediaItems.push(media);
    }

    public removeMediaFromWatchlist(media: Media): void {
        const index = this.mediaItems.findIndex((m) => m.getId() === media.getId());
        if (index !== -1) {
            this.mediaItems.splice(index, 1);
        }
    }

    // Method to return a JSON-safe representation of the Watchlist object
    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            creator: this.creator.toJSON(),
            mediaItems: this.mediaItems.map((media) => media.toJSON()),
            creation_date: this.creationDate,
        };
    }


    // Validation
    private validate(watchlist: {
        name: string,
        description: string,
        mediaItems: Media[],
        creator: User
    }): void {
        if (!watchlist.name || !watchlist.name.trim()) {
            throw new Error("Name is required and cannot be empty.");
        }

        if (!watchlist.description || !watchlist.description.trim()) {
            throw new Error("Description is required and cannot be empty.");
        }

        if (!Array.isArray(watchlist.mediaItems)) {
            throw new Error("Media items must be an array.");
        }

        if (!watchlist.creator) {
            throw new Error("Creator is required.");
        }

        if (!(watchlist.creator instanceof User)) {
            throw new Error("Creator must be a valid User instance.");
        }
    }
}