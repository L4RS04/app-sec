import React, { useState } from "react";
import { Serie } from "@types";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

type Props = {
    series: Array<Serie>;
    onAddSeries: (newSeries: Serie) => Promise<void>;
    onDeleteSeries: (seriesId: number) => Promise<void>;
}

const SerieOverviewTable: React.FC<Props> = ({ series, onDeleteSeries }: Props) => {
    const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});

    const handleDropdownClick = (index: number) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <>
            {series && (
                <div className="border rounded-lg w-full overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-center">Title</th>
                                <th className="px-4 py-2 text-center">Number of seasons</th>
                                <th className="px-4 py-2 text-center">More</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {series.map((serie, index) => (
                                <React.Fragment key={index}>
                                    <tr className="hover:bg-gray-100">
                                        <td className="border px-4 py-2 text-center">{serie.title}</td>
                                        <td className="border px-4 py-2 text-center">{serie.number_of_seasons}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <button
                                                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                                onClick={() => handleDropdownClick(index)}
                                            >
                                                {expandedRows[index] ? <ChevronUp /> : <ChevronDown />}
                                            </button>
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            <button
                                                className="text-red-500 hover:text-red-700 focus:outline-none"
                                                onClick={() => serie.id !== undefined && onDeleteSeries(serie.id)}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedRows[index] && (
                                        <tr>
                                            <td colSpan={5} className="border px-4 py-2">
                                                <div>
                                                    <strong>Released:</strong> {serie.release_year}
                                                </div>
                                                <div>
                                                    <strong>Genres:</strong> {serie.genres.join(", ")}
                                                </div>
                                                <div>
                                                    <strong>Description:</strong> {serie.description}
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

export default SerieOverviewTable;


