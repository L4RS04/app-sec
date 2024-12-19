import { Genre } from "../model/genre/genre";
import { Media } from "../model/media/media";
import { Role } from "../model/user/role";

export type AuthenticationResponse = {
    token: string;
    id: number;
    name: string;
    role: Role;
};

export interface AuthenticatedRequest extends Request {
    auth: {
        name: string;
        role: string;
    };
}

export type Movie = {
    id?: number;
    title: string;
    description: string;
    releaseYear: number;
    genres: Genre[];
    duration: number;
    director: string;
    type: 'MOVIE';
};

export type User = {
    id?: number;
    name: string;
    password: string;
    email: string;
    role: Role;
    watchlists: Watchlist[];
    creationDate: Date;
};

export type Watchlist = {
    id?: number;
    name: string;
    description: string;
    user: User;
    mediaItems: Media[];
    creationDate: Date;
};


export type Series = {
    id?: number;
    title: string;
    description: string;
    releaseYear: number;
    genres: Genre[];
    numberOfSeasons: number;
    type: 'SERIES';
};


export type UserInput = {
    id?: number;
    name: string;
    password: string;
    email: string;
    role?: Role;
    watchlists?: WatchlistInput[];
    creationDate?: Date;
};

export type UserLoginInput = {
    name: string;
    password: string;
};

export type WatchlistInput = {
    id?: number;
    name: string;
    description: string;
    mediaItems?: Media[];
    creationDate?: Date;
};


export type MediaInput = Movie | Series;
