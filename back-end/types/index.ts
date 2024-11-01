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
};

type MediaInput = {
    id?: number;
    title?: string;
    description?: string;
    release_year?: number;
    genres?: string[];
    type?: string;
};



export { UserInput, WatchlistInput, MediaInput, Role };