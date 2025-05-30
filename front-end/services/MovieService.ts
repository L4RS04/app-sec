import { Movie } from "@types";

const getAllMovies = () => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser") as string).token;

    if (!token) {
        throw new Error("No token found");
    }

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/media/movies", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
})
};

const createMovie = async (newMovie: Movie) => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser") as string).token;

    if (!token) {
        throw new Error("No token found");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/media", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMovie)
});
if (!response.ok) {
    throw new Error("An error occurred while creating the movie");
}
return response.json();
};

const deleteMovie = async (id: number) => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser") as string).token;

    if (!token) {
        throw new Error("No token found");
    }
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/media/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
});
if (!response.ok) {
    throw new Error("An error occurred while deleting the movie");
}
};

const updateMovie = async (id: number, updatedMovie: Movie) => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser") as string).token;

    if (!token) {
        throw new Error("No token found");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/media/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedMovie)
});
if (!response.ok) {
    throw new Error("An error occurred while updating the movie");
}
return response.json();
};

const getMovieById = async (id: number): Promise<Movie | null> => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser") as string).token;

    if (!token) {
        throw new Error("No token found");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/media/movies/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
});
if (!response.ok) {
    throw new Error("An error occurred while fetching the movie");
}
return response.json();
};

const MovieService = {
    getAllMovies,
    createMovie,
    deleteMovie,
    updateMovie,
    getMovieById
}

export default MovieService;