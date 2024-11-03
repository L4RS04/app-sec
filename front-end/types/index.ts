export type Movie = {
    id?: number;
    title: string;
    description: string;
    release_year: number;
    genres: Genre[];
    duration: number;
    director: string;
    type: 'Movie';
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