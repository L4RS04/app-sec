import { Genre } from "../model/genre/genre";
import { Media } from "../model/media/media";
import { Role } from "../model/user/role";

export type AuthenticationResponse = {
    token: string;
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
    creatorId: number;
    mediaItems?: Media[];
    creationDate?: Date;
};


export type MediaInput = Movie | Series;
