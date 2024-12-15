import { Genre } from "@types";

const getGenres = async (): Promise<Genre[]> => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser") as string).token;

    if (!token) {
        throw new Error("No token found");
    }
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/media/genres", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
    if (!response.ok) {
        throw new Error("An error occurred while fetching genres");
    }
    return response.json();
};

const MediaService = {
    getGenres,
}

export default MediaService;