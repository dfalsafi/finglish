export interface Song {
  id: string;
  title: string;
  artist: string;
  lyrics: string;
  views: number;
  dateAdded: string;
  genre?: string; // Adding genre field
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  songCount: number;
}

export type Genre = 'Pop' | 'Classical' | 'Folk' | 'Modern';