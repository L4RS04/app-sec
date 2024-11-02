import React, { useState } from "react";
import { Movie } from "@types";
import { formatDuration } from "utils/utils";
import { ChevronDown, ChevronUp } from "lucide-react"



type Props = {
    movies: Array<Movie>;
}

const MovieOverviewTable: React.FC<Props> = ({ movies }: Props) => {
    const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});

    const handleDropdownClick = (index: number) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <>
            {movies && (
                <div className="border rounded-lg">
                    <table className="table-auto w-full">
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