import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ArtistCard from '../components/ArtistCard';
import { artists } from '../data/artists';
import { Song } from '../types';

interface AllArtistsPageProps {
  onBack: () => void;
  onSongSelect: (song: Song, sectionId: string) => void;
}

const AllArtistsPage: React.FC<AllArtistsPageProps> = ({ onBack, onSongSelect }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">All Artists</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {artists.map(artist => (
          <ArtistCard 
            key={artist.id} 
            artist={artist} 
            onSongSelect={onSongSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default AllArtistsPage;