import React from 'react';
import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SongPage from './pages/SongPage';
import AboutPage from './pages/AboutPage';
import GenrePage from './pages/GenrePage';
import AllArtistsPage from './pages/AllArtistsPage';
import AllSongsPage from './pages/AllSongsPage';
import { Song, Genre } from './types';
import { songs } from './data/songs';

type PageType = 'home' | 'search' | 'song' | 'about' | 'genre' | 'all-artists' | 'all-recent' | 'all-top';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [lastSectionId, setLastSectionId] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<PageType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    setPreviousPage(currentPage);
    setSearchQuery(query);
    setCurrentPage('search');
  };

  const handleSongSelect = (song: Song, sectionId: string) => {
    setPreviousPage(currentPage);
    setSelectedSong(song);
    setLastSectionId(sectionId);
    setCurrentPage('song');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    if (currentPage === 'song') {
      setCurrentPage(previousPage);
      if (previousPage === 'home' && lastSectionId) {
        setTimeout(() => {
          const element = document.getElementById(lastSectionId);
          if (element) {
            const navHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    } else {
      const sectionMap = {
        'all-artists': 'trending-section',
        'all-recent': 'recent-section',
        'all-top': 'top-songs-section'
      };
      const targetSection = sectionMap[currentPage as keyof typeof sectionMap] || lastSectionId;
      handleGoHome(targetSection);
    }
  };

  const handleGoHome = (sectionId?: string) => {
    setPreviousPage(currentPage);
    setCurrentPage('home');
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const handleViewAllArtists = () => {
    setPreviousPage(currentPage);
    setCurrentPage('all-artists');
    setLastSectionId('trending-section');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllRecent = () => {
    setPreviousPage(currentPage);
    setCurrentPage('all-recent');
    setLastSectionId('recent-section');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllTop = () => {
    setPreviousPage(currentPage);
    setCurrentPage('all-top');
    setLastSectionId('top-songs-section');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToAbout = () => {
    setPreviousPage(currentPage);
    setCurrentPage('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenreSelect = (genre: Genre, sectionId: string) => {
    setPreviousPage(currentPage);
    setSelectedGenre(genre);
    setLastSectionId(sectionId);
    setCurrentPage('genre');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMenuStateChange = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-800">
        <NavBar 
          onHomeClick={handleGoHome} 
          onAboutClick={handleGoToAbout}
          onMenuStateChange={handleMenuStateChange}
        />
        <main className="container mx-auto px-4 py-8 mt-16">
          {currentPage === 'home' && (
            <HomePage 
              onSongSelect={handleSongSelect} 
              onSearch={handleSearch}
              onGenreSelect={handleGenreSelect}
              onViewAllArtists={handleViewAllArtists}
              onViewAllRecent={handleViewAllRecent}
              onViewAllTop={handleViewAllTop}
              isMenuOpen={isMenuOpen}
            />
          )}
          {currentPage === 'search' && (
            <SearchPage 
              query={searchQuery} 
              onSongSelect={(song) => handleSongSelect(song, 'search-results')}
              onBack={handleGoBack}
            />
          )}
          {currentPage === 'song' && selectedSong && (
            <SongPage 
              song={selectedSong} 
              onBack={handleGoBack}
            />
          )}
          {currentPage === 'about' && (
            <AboutPage 
              onBack={handleGoBack}
            />
          )}
          {currentPage === 'genre' && selectedGenre && (
            <GenrePage 
              genre={selectedGenre} 
              onSongSelect={(song) => handleSongSelect(song, lastSectionId || 'genres-section')}
              onBack={handleGoBack}
            />
          )}
          {currentPage === 'all-artists' && (
            <AllArtistsPage
              onBack={handleGoBack}
              onSongSelect={handleSongSelect}
            />
          )}
          {currentPage === 'all-recent' && (
            <AllSongsPage
              title="All Recent Songs"
              songs={[...songs].sort((a, b) => 
                new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
              )}
              onBack={handleGoBack}
              onSongSelect={handleSongSelect}
            />
          )}
          {currentPage === 'all-top' && (
            <AllSongsPage
              title="All Top Songs"
              songs={[...songs].sort((a, b) => b.views - a.views)}
              onBack={handleGoBack}
              onSongSelect={handleSongSelect}
            />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;