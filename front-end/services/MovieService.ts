import { Movie } from "@types";

const getAllMovies = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/media/movies", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
})
};

const createMovie = async (newMovie: Movie) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/media", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie)
});
if (!response.ok) {
    throw new Error("An error occurred while creating the movie");
}
return response.json();
};

const deleteMovie = async (id: number) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/media/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
});
if (!response.ok) {
    throw new Error("An error occurred while deleting the movie");
}
};

const MovieService = {
    getAllMovies,
    createMovie,
    deleteMovie,
}

export default MovieService;