import { Media } from '../model/media';
import { Movie } from '../model/movie';
import { Series } from '../model/series';
import { Genre } from '../model/genre';

const media_items: Media[] = [
    new Movie({
        release_year: 1994,
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        genres: [Genre.Drama],
        duration: 142,
        director: "Frank Darabont"
    }),
    new Movie({
        release_year: 2008,
        title: "The Dark Knight",
        description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
        genres: [Genre.Action, Genre.Crime, Genre.Drama],
        duration: 152,
        director: "Christopher Nolan"
    }),
    new Series({
        release_year: 2011,
        title: "Game of Thrones",
        description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
        genres: [Genre.Action, Genre.Adventure, Genre.Drama],
        number_of_seasons: 8
    }),
    new Series({
        release_year: 2008,
        title: "Breaking Bad",
        description: "A high school chemistry teacher turned methamphetamine producer partners with a former student to secure his family's future.",
        genres: [Genre.Crime, Genre.Drama, Genre.Thriller],
        number_of_seasons: 5
    })
];

const getAllMedia = (): Media[] => {
    return media_items;
};

const getAllMovies = (): Movie[] => {
    return media_items.filter(item => item instanceof Movie) as Movie[];
};

const getAllSeries = (): Series[] => {
    return media_items.filter(item => item instanceof Series) as Series[];
};

export default { getAllMedia, getAllMovies, getAllSeries };