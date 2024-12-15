import React, { useState } from "react";
import { Series } from "@types";
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import GenreTag from "@components/GenreTag";

type Props = {
  series: Array<Series>;
  onAddSeries: (newSeries: Series) => Promise<void>;
  onDeleteSeries: (seriesId: number) => Promise<void>;
  isAdmin: boolean;
}

const SeriesOverviewTable: React.FC<Props> = ({ series, onDeleteSeries, isAdmin }: Props) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});

  const handleDropdownClick = (index: number) => {
    setExpandedRows(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <div className="w-full min-w-[800px] overflow-x-auto mb-5">
      <div className="w-full overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-[#1429b1] text-white">
              <th className="w-2/5 px-6 py-3 text-center text-xs font-medium uppercase">Title</th>
              <th className="w-1/5 px-6 py-3 text-center text-xs font-medium uppercase">Seasons</th>
              <th className="w-1/5 px-6 py-3 text-center text-xs font-medium uppercase">More</th>
              {isAdmin && <th className="w-1/5 px-6 py-3 text-center text-xs font-medium uppercase">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {series.map((series, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="w-2/5 px-6 py-1 text-center">{series.title}</td>
                  <td className="w-1/5 px-6 py-4 text-center">{series.numberOfSeasons}</td>
                  <td className="w-1/5 px-6 py-4 text-center">
                    <button
                      className="text-[#007bff] hover:text-[#1429b1]"
                      onClick={() => handleDropdownClick(index)}
                    >
                      {expandedRows[index] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </td>
                  {isAdmin && (
                    <td className="w-1/5 px-6 py-4 text-center">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => series.id !== undefined && onDeleteSeries(series.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  )}
                </tr>
                {expandedRows[index] && (
                  <tr className="bg-blue-50">
                    <td colSpan={isAdmin ? 4 : 3} className="px-3 py-2">
                      <div className="text-sm text-gray-900 max-w-2xl">
                        <p className="mb-1"><span className="font-medium">Description:</span> {series.description}</p>
                        <div className="mb-1">
                          <span className="font-medium">Genres: </span>
                          <div className="mt-1">
                            {series.genres.map((genre, i) => (
                              <GenreTag key={i} genre={genre} />
                            ))}
                          </div>
                        </div>
                        <p className="mb-1"><span className="font-medium">Released:</span> {series.releaseYear}</p>
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

export default SeriesOverviewTable;