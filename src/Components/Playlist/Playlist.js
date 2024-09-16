import React from "react";
import styles from './Playlist.module.css';
import TrackList from "../TrackList/TrackList";

function Playlist(props) {
  
  const { playlistName, playlistTracks, onRemove, onNameChange, onSave } = props;

  // Handle name change and call the provided onNameChange method
  const handleNameChange = (event) => {
    onNameChange(event.target.value); 
  };

  return (
    <div className={styles.Playlist}>
      {/* Controlled input with value from playlistName */}
      <input 
        value={playlistName} 
        className={styles.PlaylistName} 
        onChange={handleNameChange} 
      />
      
      {/* Display playlist name */}
      <h2>{playlistName}</h2>
      
      {/* Add TrackList component with required props */}
      <TrackList
        userSearchResults={playlistTracks}
        isRemoval={true}
        onRemove={onRemove} 
      />
      
      {/* Save to Spotify button */}
      <button className={styles['Playlist-save']} onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;
