import React, { useMemo, useState } from 'react';
import SongCard from '../components/SongCard';
import { songs } from '../data/songs';
import { Song } from '../types';
import { Search, ArrowLeft } from 'lucide-react';

interface SearchPageProps {
  query: string;
  onSongSelect: (song: Song) => void;
  onBack: () => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ query: initialQuery, onSongSelect, onBack }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const lowercaseQuery = searchQuery.toLowerCase();
    
    return songs.filter(song => 
      song.title.toLowerCase().includes(lowercaseQuery) || 
      song.artist.toLowerCase().includes(lowercaseQuery) ||
      song.lyrics.toLowerCase().includes(lowercaseQuery)
    );
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchQuery.trim());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search songs, artists, or lyrics..."
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      {filteredSongs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSongs.map(song => (
            <SongCard key={song.id} song={song} onClick={onSongSelect} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            No results found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            We couldn't find any songs matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;