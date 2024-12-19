import React, { useState, useMemo } from "react";
import { Series } from "@types";
import { ChevronDown, ChevronUp, Trash2, Pencil, Search } from 'lucide-react';
import GenreTag from "@components/GenreTag";
import { useRouter } from 'next/router';

type Props = {
  series: Array<Series>;
  onAddSeries: (newSeries: Series) => Promise<void>;
  onDeleteSeries: (seriesId: number) => Promise<void>;
  isAdmin: boolean;
}

const SeriesOverviewTable: React.FC<Props> = ({ series, onDeleteSeries, isAdmin }: Props) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleDropdownClick = (index: number) => {
    setExpandedRows(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleEditClick = (seriesId: number) => {
    router.push(`/series/edit/${seriesId}`);
  };

  const filteredSeries = useMemo(() => {
    return series.filter(s => 
      s.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [series, searchTerm]);

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search series..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <div className="w-full overflow-x-auto mb-8">
        <div className="w-full min-w-[800px] overflow-hidden rounded-lg shadow-lg">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <th className="w-2/5 px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Title</th>
                <th className="w-1/5 px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Seasons</th>
                <th className="w-1/5 px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">More</th>
                {isAdmin && <th className="w-1/4 px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSeries.map((series, index) => (
                <React.Fragment key={index}>
                  <tr className="hover:bg-blue-50 transition-colors duration-150 ease-in-out">
                    <td className="w-2/5 px-6 py-4 text-left">{series.title}</td>
                    <td className="w-1/5 px-6 py-4 text-center">{series.numberOfSeasons}</td>
                    <td className="w-1/5 px-6 py-4 text-center">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-150 ease-in-out"
                        onClick={() => handleDropdownClick(index)}
                      >
                        {expandedRows[index] ? <ChevronUp className="w-5 h-5 inline" /> : <ChevronDown className="w-5 h-5 inline" />}
                      </button>
                    </td>
                    {isAdmin && (
                      <td className="w-1/4 px-6 py-4 text-center">
                        <div className="flex justify-center space-x-4">
                          <button
                            className="text-red-500 hover:text-red-700 transition-colors duration-150 ease-in-out"
                            onClick={() => series.id !== undefined && onDeleteSeries(series.id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <button
                            className="text-blue-500 hover:text-blue-700 transition-colors duration-150 ease-in-out"
                            onClick={() => series.id !== undefined && handleEditClick(series.id)}
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                  {expandedRows[index] && (
                    <tr className="bg-blue-50">
                      <td colSpan={isAdmin ? 4 : 3} className="px-6 py-4">
                        <div className="text-sm text-gray-800 max-w-2xl">
                          <p className="mb-2"><span className="font-semibold text-blue-800">Description:</span> {series.description}</p>
                          <div className="mb-2">
                            <span className="font-semibold text-blue-800">Genres: </span>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {series.genres.map((genre, i) => (
                                <GenreTag key={i} genre={genre} />
                              ))}
                            </div>
                          </div>
                          <p className="mb-1"><span className="font-semibold text-blue-800">Released:</span> {series.releaseYear}</p>
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
    </div>
  );
};

export default SeriesOverviewTable;

