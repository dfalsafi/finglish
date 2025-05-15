import React, { useState, useEffect, useRef } from 'react';
import SongCard from '../components/SongCard';
import ArtistCard from '../components/ArtistCard';
import { songs } from '../data/songs';
import { artists } from '../data/artists';
import { Song, Genre } from '../types';
import { TrendingUp, Clock, Award, Music2, Search, Users, Crown, Disc } from 'lucide-react';

interface HomePageProps {
  onSongSelect: (song: Song, sectionId: string) => void;
  onSearch: (query: string) => void;
  onGenreSelect: (genre: Genre, sectionId: string) => void;
  onViewAllArtists: () => void;
  onViewAllRecent: () => void;
  onViewAllTop: () => void;
  isMenuOpen: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ 
  onSongSelect, 
  onSearch, 
  onGenreSelect, 
  onViewAllArtists,
  onViewAllRecent,
  onViewAllTop,
  isMenuOpen 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const trendingRef = useRef<HTMLElement>(null);
  const recentRef = useRef<HTMLElement>(null);
  const topSongsRef = useRef<HTMLElement>(null);
  const genresRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const navHeight = 80;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [trendingRef, recentRef, topSongsRef, genresRef];
    elements.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      elements.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleGenreClick = (genre: Genre) => {
    const sectionId = 'genres-section';
    onGenreSelect(genre, sectionId);
  };

  const trendingSongs = [...songs].sort((a, b) => b.views - a.views).slice(0, 4);
  const recentSongs = [...songs].sort((a, b) => 
    new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  ).slice(0, 4);

  const genres: Genre[] = ['Pop', 'Classical', 'Folk', 'Modern'];

  const ViewAllButton = ({ onClick }: { onClick: () => void }) => (
    <button 
      onClick={onClick}
      className="relative group px-4 py-2 text-blue-600 dark:text-blue-400 overflow-hidden"
    >
      <span className="relative z-10">View All</span>
      <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
    </button>
  );

  const QuickNavCard = ({ title, icon: Icon, onClick }: { title: string; icon: any; onClick: () => void }) => (
    <div
      onClick={onClick}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="flex flex-col items-center text-center space-y-2">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      </div>
    </div>
  );

  return (
    <div className="relative space-y-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600 rounded-xl p-8 mb-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">Welcome to Farsi2English</h1>
          <p className="text-xl text-white">Drop a song and find any lyric in Finglish</p>
          
          <div className="max-w-2xl mx-auto px-4">
            <form className="relative" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search your favorite Farsi song!"
                className="w-full px-4 py-3 border border-white/30 rounded-full bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:outline-none transition shadow-sm hover:shadow-md backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
        <QuickNavCard
          title="Trending Artists"
          icon={Users}
          onClick={() => scrollToSection(trendingRef)}
        />
        <QuickNavCard
          title="Recent Songs"
          icon={Clock}
          onClick={() => scrollToSection(recentRef)}
        />
        <QuickNavCard
          title="Top Songs"
          icon={Crown}
          onClick={() => scrollToSection(topSongsRef)}
        />
        <QuickNavCard
          title="Browse Genres"
          icon={Disc}
          onClick={() => scrollToSection(genresRef)}
        />
      </div>

      {/* Main Content */}
      <div className="space-y-16">
        {/* Trending Artists Section */}
        <section ref={trendingRef} id="trending-section" className="slide-left scroll-mt-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Trending Artists</h2>
            <ViewAllButton onClick={onViewAllArtists} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {artists.slice(0, 8).map(artist => (
              <ArtistCard 
                key={artist.id} 
                artist={artist} 
                onSongSelect={onSongSelect}
              />
            ))}
          </div>
        </section>

        {/* Recent Songs Section */}
        <section ref={recentRef} id="recent-section" className="slide-right scroll-mt-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recent Songs</h2>
            <ViewAllButton onClick={onViewAllRecent} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentSongs.map(song => (
              <SongCard key={song.id} song={song} onClick={(song) => onSongSelect(song, 'recent-section')} />
            ))}
          </div>
        </section>

        {/* Top Songs Section */}
        <section ref={topSongsRef} id="top-songs-section" className="slide-left scroll-mt-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Top Songs</h2>
            <ViewAllButton onClick={onViewAllTop} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trendingSongs.map(song => (
              <SongCard key={song.id} song={song} onClick={(song) => onSongSelect(song, 'top-songs-section')} />
            ))}
          </div>
        </section>

        {/* Genre Selection */}
        <section ref={genresRef} id="genres-section" className="slide-right scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Browse by Genre</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {genres.map((genre) => (
              <div 
                key={genre}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleGenreClick(genre)}
              >
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{genre}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {songs.filter(song => song.genre === genre).length} songs
                    </p>
                  </div>
                  <Music2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;