import { Watchlist } from './watchlist';
import { User as PrismaUser, Watchlist as PrismaWatchlist } from '@prisma/client';

export class User {
    private id?: number;
    private name: string;
    private password: string;
    private email: string;
    private creationDate: Date;
    private watchlists: Watchlist[];

    constructor(user: { 
        id?: number;
        name: string, 
        password: string, 
        email: string 
    }) {
        this.validate(user);

        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
        this.email = user.email;
        this.creationDate = new Date();
        this.watchlists = [];
    }

    // Getters
    public getId(): number | undefined {
        return this.id;
    }

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

    // Method to return a JSON-safe representation of the User object
    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        };
    }

 
    private validate(user: {
        name: string;
        password: string;
        email: string;
    }) {
        if (!user.name?.trim()) {
            throw new Error('Username is required');
        }
        if (user.name.length < 3) {
            throw new Error('Username must be at least 3 characters long');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (user.password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            throw new Error('Email is not valid');
        }
    }
}


