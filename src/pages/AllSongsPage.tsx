import React from 'react';
import { ArrowLeft } from 'lucide-react';
import SongCard from '../components/SongCard';
import { songs } from '../data/songs';
import { Song } from '../types';

interface AllSongsPageProps {
  title: string;
  songs: Song[];
  onBack: () => void;
  onSongSelect: (song: Song, sectionId: string) => void;
}

const AllSongsPage: React.FC<AllSongsPageProps> = ({ title, songs, onBack, onSongSelect }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.map(song => (
          <SongCard 
            key={song.id} 
            song={song} 
            onClick={(song) => onSongSelect(song, 'all-songs')} 
          />
        ))}
      </div>
    </div>
  );
};

export default AllSongsPage;