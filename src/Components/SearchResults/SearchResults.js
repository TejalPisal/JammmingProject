import React from "react";
import styles from './SearchResults.module.css';
import TrackList from "../TrackList/TrackList";

function SearchResults(props) {
    return (
        <div className={styles.SearchResults}>
            {/* Add a TrackList component */}
            <h3>Results</h3>
            <TrackList 
                userSearchResults={props.userSearchResults}
                isRemoval={false}
                onAdd={props.onAdd}   
                onRemove={() => {}} 
            />
        </div>
    );
}

export default SearchResults;
