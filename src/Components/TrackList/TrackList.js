import React from "react";
import styles from './TrackList.module.css';
import Track from "../Track/Track";

function TrackList(props) {
  const { userSearchResults = [], isRemoval, onAdd, onRemove } = props;

  return (
    <div className={styles.TrackList}>
      {Array.isArray(userSearchResults) && userSearchResults.map((track) => (
        <Track
          track={track}
          key={track.id}
          isRemoval={props.isRemoval}
          onAdd={onAdd}
          onRemove={props.onRemove}
        />
      ))}
    </div>
  );
}

export default TrackList;
