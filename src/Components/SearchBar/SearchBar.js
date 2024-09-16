import React, { useState } from "react";
import styles from './SearchBar.module.css';
function SearchBar (props) {
  const [term, setTerm] = useState('');
  //this term will update the term state whenever the input changes
  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };
  //This method is called when the search button is clicked and passes the current search term to the onSearch prop.
  const passTerm = () => {
    props.onSearch(term);
  };
  
    return (
        <div className={styles.SearchBar}>
        <input
          placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange}
          value={term}
        />
        <button className={styles.SearchButton} onClick={passTerm} >
          SEARCH
        </button>
      </div>
        );
}

export default SearchBar;