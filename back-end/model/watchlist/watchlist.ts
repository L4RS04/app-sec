import { Media } from "../media/media";
import { User } from "../user/user";
import { Media as MediaPrisma, Watchlist as WatchlistPrisma, User as UserPrisma } from "@prisma/client";


export class Watchlist {
    private id?: number;
    private name: string;
    private description: string;
    private creationDate: Date;
    private mediaItems: Media[];
    private user: User;

    constructor(watchlist: {
        id?: number,
        name: string,
        description: string,
        mediaItems?: Media[],
        user: User,
        creationDate?: Date
    }) {
        this.validate(watchlist);

        this.id = watchlist.id;
        this.name = watchlist.name;
        this.description = watchlist.description;
        this.creationDate = watchlist.creationDate || new Date();
        this.mediaItems = watchlist.mediaItems || [];
        this.user = watchlist.user;
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

    public getUser(): User {
        return this.user;
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

    public setUser(user: User): void {
        this.user = user;
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

    // Validation
    private validate(watchlist: {
        name: string,
        description: string,
        user: User
    }): void {
        if (!watchlist.name || !watchlist.name.trim()) {
            throw new Error("Name is required and cannot be empty.");
        }

        if (!watchlist.description || !watchlist.description.trim()) {
            throw new Error("Description is required and cannot be empty.");
        }

        if (!watchlist.user) {
            throw new Error("User is required.");
        }

        if (!(watchlist.user instanceof User)) {
            throw new Error("User must be a valid User instance.");
        }
    }

    static from({
        id,
        name,
        description,
        creationDate,
        mediaItems,
        user,
    }: WatchlistPrisma & { 
        mediaItems: MediaPrisma[];
        user: UserPrisma }) 
    {
        return new Watchlist({
            id,
            name,
            description,
            creationDate,
            mediaItems: mediaItems.map((media) => Media.from(media)),
            user: User.from(user)
        })
    }
}