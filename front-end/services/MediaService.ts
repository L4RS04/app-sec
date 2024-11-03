import { Genre } from "@types";

const getGenres = async (): Promise<Genre[]> => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/media/genres", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
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