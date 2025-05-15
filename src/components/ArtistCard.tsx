import React from 'react';
import { Artist } from '../types';
import { songs } from '../data/songs';

interface ArtistCardProps {
  artist: Artist;
  onSongSelect: (song: any, sectionId: string) => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onSongSelect }) => {
  const artistSongs = songs.filter(song => song.artist === artist.name);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
      <div className="relative h-32 overflow-hidden cursor-pointer">
        <img 
          src={artist.imageUrl} 
          alt={artist.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-colors duration-300"></div>
        <h3 className="absolute bottom-2 left-2 text-white font-semibold text-sm transform group-hover:translate-x-1 transition-transform duration-300">{artist.name}</h3>
      </div>
      <div className="p-2 space-y-1">
        <p className="text-gray-600 dark:text-gray-300 text-xs transform group-hover:translate-x-1 transition-transform duration-300">{artist.songCount} songs</p>
        <div className="space-y-1">
          {artistSongs.slice(0, 1).map(song => (
            <div 
              key={song.id}
              onClick={() => onSongSelect(song, 'trending-section')}
              className="text-xs text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer truncate"
            >
              {song.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;