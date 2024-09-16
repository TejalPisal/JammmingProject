import React, { useState } from 'react';
import styles from "./App.module.css";
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Function to add tracks to playlist
  const addTrack = (track) => {
    if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  // Function to remove tracks from playlist
  const removeTrack = (track) => {
    const newPlaylist = playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    setPlaylistTracks(newPlaylist);
  };

  // Function to update the playlist name
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  // Function to save playlist to Spotify
  const savePlaylist = () => {
    const trackURIs = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    });
  };

  // Function to handle search
  const search = (term) => {
    Spotify.search(term).then(results => {
      setSearchResults(results);
    });
  };

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        {/* SearchBar component */}
        <SearchBar onSearch={search} />
        <div className={styles["App-playlist"]}>
          {/* Pass addTrack to SearchResults */}
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
          
          {/* Pass playlistTracks and playlistName to Playlist */}
          <Playlist
            playlistTracks={playlistTracks}
            playlistName={playlistName}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
