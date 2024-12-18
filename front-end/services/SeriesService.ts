import { Series } from "@types";

const getAllSeries = () => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser") as string).token;

    if (!token) {
        throw new Error("No token found");
    }

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/media/series", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
})
};

const createSeries = async (newSeries : Series) => {
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
        body: JSON.stringify(newSeries)
});
if (!response.ok) {
    throw new Error("An error occurred while creating the series");
}
return response.json();
};

const deleteSeries = async (id: number) => {
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
    throw new Error("An error occurred while deleting the series");
}
};

const updateSeries = async (id: number, updatedSeries: Series) => {
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
        body: JSON.stringify(updatedSeries)
});
if (!response.ok) {
    throw new Error("An error occurred while updating the series");
}
return response.json();
};

const getSeriesById = async (id: number): Promise<Series> => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser") as string).token;

    if (!token) {
        throw new Error("No token found");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/media/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
    if (!response.ok) {
        throw new Error("An error occurred while fetching the series");
    }
    return response.json();
};

const SeriesService = {
    getAllSeries,
    createSeries,
    deleteSeries,
    updateSeries,
    getSeriesById
}

export default SeriesService;