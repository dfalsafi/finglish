import React, { useEffect } from 'react';
import { Song, Genre } from '../types';
import SongCard from '../components/SongCard';
import { ArrowLeft, Music2 } from 'lucide-react';
import { songs } from '../data/songs';

interface GenrePageProps {
  genre: Genre;
  onSongSelect: (song: Song) => void;
  onBack: () => void;
}

const GenrePage: React.FC<GenrePageProps> = ({ genre, onSongSelect, onBack }) => {
  const genreSongs = songs.filter(song => song.genre === genre);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
        <div className="flex items-center space-x-3">
          <Music2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{genre} Music</h1>
        </div>
      </div>

      {genreSongs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genreSongs.map(song => (
            <SongCard key={song.id} song={song} onClick={onSongSelect} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Music2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            No songs found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            We couldn't find any {genre.toLowerCase()} songs at the moment
          </p>
        </div>
      )}
    </div>
  );
};

export default GenrePage;