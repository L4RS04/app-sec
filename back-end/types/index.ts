import { Genre } from "../model/genre";
import { Media } from "../model/media";
import { User } from "../model/user";

type Role = 'admin' | 'user';

type UserInput = {
    id?: number;
    name: string;
    password: string;
    email: string;
};

type WatchlistInput = {
    id?: number;
    name: string;
    description: string;
    creatId: number;
    mediaItems?: Media[];
    creationDate?: Date;
};

type MediaInput = {
    id?: number;
    title?: string;
    description?: string;
    releaseYear?: number;
    genres?: Genre[];
    type?: 'MOVIE' | 'SERIES';
    director?: string;
    duration?: number;
    numberOfSeasons?: number;
};



export { UserInput, WatchlistInput, MediaInput, Role };