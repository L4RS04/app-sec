import { Role } from './role';
import { Watchlist } from '../watchlist/watchlist';
import { User as UserPrisma, Watchlist as WatchlistPrisma, Media as MediaPrisma } from '@prisma/client';

export class User {
    private id?: number;
    private name: string;
    private password: string;
    private email: string;
    private creationDate: Date;
    private watchlists: Watchlist[];
    private role: Role;

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
        this.role = Role.USER;
    }

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

    public getRole(): Role {
        return this.role;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setRole(role: Role): void {
        this.role = role;
    }

    public addWatchlistToUser(watchlist: Watchlist): void {
        this.watchlists.push(watchlist);
    }

    public addWatchlists(watchlists: Watchlist[]): void {
        this.watchlists.push(...watchlists);
    }

    public deleteWatchlistFromUser(watchlist: Watchlist): void {
        const index = this.watchlists.indexOf(watchlist);
        this.watchlists.splice(index, 1);  
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
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRegex.test(user.password)) {
            throw new Error('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            throw new Error('Email is not valid');
        }
    }

    static from({
        id,
        name,
        password,
        email,
        role,
    }: UserPrisma): User { 
        const user = new User({
            id,
            name,
            password,
            email,
        });
        user.setRole(role as Role);
        return user;
    }
}


