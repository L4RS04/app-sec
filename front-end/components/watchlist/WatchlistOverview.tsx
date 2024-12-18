import React from "react";
import { Trash2, Pencil, Calendar, User, Film, TvIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { Watchlist, MediaItem } from "../../types";

type Props = {
  watchlists: Array<Watchlist>;
  onDeleteWatchlist: (watchlistId: number) => Promise<void>;
  isAdmin: boolean;
  loggedInUserName: string;
};

const WatchlistOverview: React.FC<Props> = ({ watchlists, onDeleteWatchlist, isAdmin, loggedInUserName }: Props) => {
  const router = useRouter();

  const handleEditClick = (watchlistId: number) => {
    router.push(`/watchlists/edit/${watchlistId}`);
  };

  const categorizeMediaItems = (mediaItems: MediaItem[]) => {
    return mediaItems.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {} as Record<string, MediaItem[]>);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'MOVIE':
        return <Film className="w-4 h-4 mr-2" />;
      case 'SERIES':
        return <TvIcon className="w-4 h-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {watchlists.map((watchlist) => (
        <div key={watchlist.id} className="bg-gradient-to-br from-[#1429b1] to-[#4b6ffa] rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
          <div className="p-8 text-white">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold truncate mr-4">{watchlist.name}</h3>
              {(isAdmin || watchlist.user.name === loggedInUserName) && (
                <div className="flex space-x-2">
                  <button
                    className="p-2 bg-gray-600 bg-opacity-70 rounded-full hover:bg-opacity-90 transition-colors duration-200"
                    onClick={() => watchlist.id !== undefined && onDeleteWatchlist(watchlist.id)}
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                  <button
                    className="p-2 bg-gray-600 bg-opacity-70 rounded-full hover:bg-opacity-90 transition-colors duration-200"
                    onClick={() => watchlist.id !== undefined && handleEditClick(watchlist.id)}
                  >
                    <Pencil className="w-5 h-5 text-white" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm text-white text-opacity-90 mb-6">{watchlist.description}</p>
            <div className="flex items-center space-x-8 text-sm">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 opacity-80" />
                <span>{new Date(watchlist.creationDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 opacity-80" />
                <span>{watchlist.user.name}</span>
              </div>
              <div className="flex items-center">
                <Film className="w-5 h-5 mr-2 opacity-80" />
                <span>{watchlist.mediaItems.length} items</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-t-3xl -mt-4">
            {Object.entries(categorizeMediaItems(watchlist.mediaItems))
              .sort(([a], [b]) => (a === 'MOVIE' ? -1 : 1))
              .map(([type, items]) => (
                <div key={type} className="mb-6 last:mb-0">
                  <h5 className="font-medium text-gray-700 mb-3 flex items-center">
                    {getIconForType(type)}
                    {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                  </h5>
                  <div className="flex flex-wrap gap-3">
                    {(items as MediaItem[]).map((item: MediaItem) => (
                      <div 
                        key={item.id} 
                        className="bg-blue-50 px-4 py-2 rounded-full text-sm text-blue-800 truncate hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WatchlistOverview;