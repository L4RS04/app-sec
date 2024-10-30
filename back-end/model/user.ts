import { Watchlist } from './watchlist';

export class User {
    private name: string;
    private password: string;
    private email: string;
    private creationDate: Date;
    private watchlists: Watchlist[];

    constructor(name: string, password: string, email: string) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.creationDate = new Date();
        this.watchlists = [];
    }

    // Getters
    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getCreationDate(): Date {
        return this.creationDate;
    }

    public getPassword(): string {
        return this.password;
    }

    public getWatchlists(): Watchlist[] {
        return this.watchlists;
    }

    // Setters
    public setName(name: string): void {
        this.name = name;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    // Methods to manage watchlists
    public addWatchlistToUser(watchlist: Watchlist): void {
        this.watchlists.push(watchlist);
    }

    public deleteWatchlistFromUser(watchlist: Watchlist): void {
        const index = this.watchlists.indexOf(watchlist);
        this.watchlists.splice(index, 1);  
    }
}
