import React from 'react';
import { Song } from '../types';
import { Music } from 'lucide-react';

interface SongCardProps {
  song: Song;
  onClick: (song: Song) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onClick }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer h-24 transform hover:-translate-y-1 hover:rotate-1 hover:rounded-2xl"
      onClick={() => onClick(song)}
    >
      <div className="p-3 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate pr-2">{song.title}</h3>
          <Music className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 transform group-hover:rotate-12 transition-transform duration-300" />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">{song.artist}</p>
          <span className="text-xs text-gray-500 dark:text-gray-400">{song.views.toLocaleString()} views</span>
        </div>
      </div>
    </div>
  );
};

export default SongCard;