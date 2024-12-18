import React, { useState } from "react";
import { Movie } from "@types";
import { formatDuration } from "utils/utils";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import GenreTag from "@components/GenreTag";
import { useRouter } from "next/router";

type Props = {
    movies: Array<Movie>;
    onAddMovie: (newMovie: Movie) => Promise<void>;
    onDeleteMovie: (movieId: number) => Promise<void>;
    isAdmin: boolean;
}

const MovieOverviewTable: React.FC<Props> = ({ movies, onDeleteMovie, isAdmin }: Props) => {
    const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
    const router = useRouter();

    const handleDropdownClick = (index: number) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleEditClick = (movieId: number) => {
        router.push(`/movies/edit/${movieId}`);
    };

    return (
        <div className="w-full min-w-[800px] overflow-x-auto mb-5">
            <div className="w-full border border-gray-200 rounded-lg shadow-sm">
                <table className="w-full border-collapse bg-white">
                    <thead>
                        <tr className="bg-[#1429b1] text-white">
                            <th className="w-2/5 px-6 py-3 text-center text-xs font-medium uppercase">Title</th>
                            <th className="w-1/5 px-6 py-3 text-center text-xs font-medium uppercase">Duration</th>
                            <th className="w-1/5 px-6 py-3 text-center text-xs font-medium uppercase">More</th>
                            {isAdmin && <th className="w-1/4 px-6 py-3 text-center text-xs font-medium uppercase">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td className="w-2/5 px-6 py-4 text-center">{movie.title}</td>
                                    <td className="w-1/5 px-6 py-4 text-center">{formatDuration(movie.duration ?? 0)}</td>
                                    <td className="w-1/5 px-6 py-4 text-center">
                                        <button
                                            className="text-[#007bff] hover:text-[#1429b1]"
                                            onClick={() => handleDropdownClick(index)}
                                        >
                                            {expandedRows[index] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                        </button>
                                    </td>
                                    {isAdmin && (
                                        <td className="w-1/4 px-6 py-4 text-center">
                                            <div className="flex justify-center space-x-4">
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => movie.id !== undefined && onDeleteMovie(movie.id)}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => movie.id !== undefined && handleEditClick(movie.id)}
                                                >
                                                    <Pencil className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                                {expandedRows[index] && (
                                    <tr className="bg-blue-50">
                                        <td colSpan={isAdmin ? 4 : 3} className="px-3 py-2">
                                            <div className="text-sm text-gray-900 max-w-2xl">
                                                <p className="mb-1"><span className="font-medium">Description:</span> {movie.description}</p>
                                                <div className="mb-2">
                                                    <span className="font-medium">Genres: </span>
                                                    <div className="mt-1">
                                                        {movie.genres.map((genre, i) => (
                                                            <GenreTag key={i} genre={genre} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="mb-1"><span className="font-medium">Director:</span> {movie.director}</p>
                                                <p><span className="font-medium">Released:</span> {movie.releaseYear}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MovieOverviewTable;