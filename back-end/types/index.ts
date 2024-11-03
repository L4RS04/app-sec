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
    creatorId: number;
    media_items?: Media[];
    creation_date?: Date;
};

type MediaInput = {
    id?: number;
    title?: string;
    description?: string;
    release_year?: number;
    genres?: Genre[];
    type?: 'Movie' | 'Series';
    director?: string;
    duration?: number;
    number_of_seasons?: number;
};



export { UserInput, WatchlistInput, MediaInput, Role };