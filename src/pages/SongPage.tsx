import React from 'react';
import { Song } from '../types';
import { ArrowLeft, Music, Heart, Share2, Eye } from 'lucide-react';

interface SongPageProps {
  song: Song;
  onBack: () => void;
}

const SongPage: React.FC<SongPageProps> = ({ song, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center space-x-2">
        <button 
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
        <span className="text-gray-600 dark:text-gray-400">Back to songs</span>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{song.title}</h1>
            <div className="flex items-center">
              <Music className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              <p className="text-xl text-gray-700 dark:text-gray-300">{song.artist}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Heart className="h-5 w-5 text-red-500" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Eye className="h-4 w-4 mr-1" />
          <span>{song.views.toLocaleString()} views</span>
          <span className="mx-2">•</span>
          <span>Added on {new Date(song.dateAdded).toLocaleDateString()}</span>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Finglish Lyrics</h3>
          <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-medium">
            {song.lyrics}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-gray-700 dark:text-gray-300">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">About Finglish</h3>
        <p>
          Finglish is Farsi written with English characters. It makes Persian lyrics accessible to 
          those who might not be able to read the Persian script but understand the language.
        </p>
      </div>
    </div>
  );
};

export default SongPage;