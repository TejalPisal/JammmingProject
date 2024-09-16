import React from "react";
import styles from './Track.module.css';

const Track = (props) => {
  const { track, isRemoval, onAdd, onRemove } = props;
  const passTrack = () => {
    props.onAdd(props.track);
  };

  const passTrackToRemove = () => {
    props.onRemove(props.track);
  };

  
    const renderAction = () => {
        if(props.isRemoval){
            return (<button className={styles['Track-action']} onClick={passTrackToRemove}>-</button>);
        }else{
            return (<button className={styles['Track-action']} onClick={() => props.onAdd(props.track)}>+</button>);
        }
    }
    return (
      <div className={styles.Track}>
        <div className={styles['Track-information']}>
          {/* <h3><!-- track name will go here --></h3> */}
          <h3>{props.track.name}</h3>
          {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
          <p>{props.track.artist} | {props.track.album}</p>
        </div>
        {/* <button class="Track-action"><!-- + or - will go here --></button> */}
        {renderAction()}
      </div>
    );
}

export default Track;