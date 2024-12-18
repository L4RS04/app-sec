export type Movie = {
    id?: number;
    title?: string;
    description?: string;
    releaseYear?: number;
    genres: Genre[];
    duration?: number;
    director?: string;
    type: 'MOVIE';
}

export type Series = {
    id?: number;
    title?: string;
    description?: string;
    releaseYear?: number;
    genres: Genre[];
    numberOfSeasons?: number;
    type: 'SERIES';
}

export type Media = Movie | Series;

export type User = {
    id?: number;
    token? : string;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
}

export type MediaItem = {
    id: number;
    title: string;
    type: 'MOVIE' | 'SERIES';
  };

export type Watchlist = {
    id?: number;
    name: string;
    description: string;
    creationDate: Date;
    mediaItems: MediaItem[];
    user: User;
}

export enum Genre {
    Action = "Action",
    Comedy = "Comedy",
    Drama = "Drama",
    Fantasy = "Fantasy",
    Horror = "Horror",
    Mystery = "Mystery",
    Romance = "Romance",
    Thriller = "Thriller",
    SciFi = "SciFi",
    Crime = "Crime",
    Adventure = "Adventure",
    Animation = "Animation",
    Family = "Family",
    History = "History",
    War = "War",
    Western = "Western",
    Documentary = "Documentary",
    Music = "Music",
    Sport = "Sport",
    Biography = "Biography",
    Musical = "Musical",
}

export type StatusMessage = {
    type: 'success' | 'error';
    message: string;
}

export type MediaInput = Movie | Series;