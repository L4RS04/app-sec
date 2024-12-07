import { Series } from "@types";

const getAllSeries = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/media/series", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
})
};

const createSeries = async (newSeries : Series) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/media", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newSeries)
});
if (!response.ok) {
    throw new Error("An error occurred while creating the series");
}
return response.json();
};

const deleteSeries = async (id: number) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/media/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
});
if (!response.ok) {
    throw new Error("An error occurred while deleting the series");
}
};

const SeriesService = {
    getAllSeries,
    createSeries,
    deleteSeries,
}

export default SeriesService;