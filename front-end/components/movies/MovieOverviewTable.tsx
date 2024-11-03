import React, { useState } from "react";
import { Movie, Genre } from "@types";
import { formatDuration } from "utils/utils";
import { ChevronDown, ChevronUp, CirclePlus } from "lucide-react"
import { useRouter } from "next/router";



type Props = {
    movies: Array<Movie>;
    onAddMovie: (newMovie: Movie) => Promise<void>;
}

const MovieOverviewTable: React.FC<Props> = ({ movies, onAddMovie }: Props) => {
    const router = useRouter();
    const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});

    const handleDropdownClick = (index: number) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const navigateToAddMovie = () => {
        router.push('/movies/add');
    };

    return (
        <>
        <div className="flex justify-end">
            <button onClick={navigateToAddMovie} className="rounded hover:bg-slate-200 text-black font-bold px-4 rounded mb-4"> <CirclePlus size={35} /></button>
        </div>
            {movies && (
                <div className="border rounded-lg w-full overflow-x-auto">
                    <table className="table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-center">Title</th>
                                <th className="px-4 py-2 text-center">Duration</th>
                                <th className="px-4 py-2 text-center">Director</th>
                                <th className="px-4 py-2 text-center">More</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie, index) => (
                                <React.Fragment key={index}>
                                    <tr className="hover:bg-gray-100">
                                        <td className="border px-4 py-2 text-center">{movie.title}</td>
                                        <td className="border px-4 py-2 text-center">{formatDuration(movie.duration)}</td>
                                        <td className="border px-4 py-2 text-center">{movie.director}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <button
                                                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                                onClick={() => handleDropdownClick(index)}
                                            >
                                                {expandedRows[index] ? <ChevronUp /> : <ChevronDown />}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedRows[index] && (
                                        <tr>
                                            <td colSpan={4} className="border px-4 py-2">
                                                <div>
                                                    <strong>Released:</strong> {movie.release_year}
                                                </div>
                                                <div>
                                                    <strong>Genres:</strong> {movie.genres.join(", ")}
                                                </div>
                                                <div>
                                                    <strong>Description:</strong> {movie.description}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default MovieOverviewTable;