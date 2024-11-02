const getAllMovies = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/media/movies", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
})
};

const MovieService = {
    getAllMovies,
}

export default MovieService;