import React, { useEffect, useState } from 'react';
import SearchSelection from '../selected/SearchSelection';
import SuggestionList from '../suggestions/SuggestionList';
import styles from './SearchBox.module.css';
import axios from 'axios';

const SearchBox = () => {
  const [state, setState] = useState({
    query: '',
    locations: [],
    selectedItems: [],
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (state.query.length > 0) {
        const searchLocation = async queryString => {
          await axios
            .get(`http://localhost:8088/locationservice/locations?query=` + queryString)
            .then(response => {
              let updatedObj = {
                query: queryString,
                locations: response.data,
                selectedItems: [...state.selectedItems],
              };
              // Success
              setState(updatedObj);
            })
            .catch(error => {
              // Error
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
            });
        };
        searchLocation(state.query);
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [state.query]);

  const onSelectHandler = location => {
    saveLocation(location);
    let { selectedItems } = state;
    let selectedLocations = [...selectedItems];
    selectedLocations.push(location);
    let updatedObj = {
      query: '',
      locations: [],
      selectedItems: selectedLocations,
    };
    setState(updatedObj);
  };

  const onChangeHandler = queryString => {
    let updatedObj = {
      query: queryString,
      locations: [],
      selectedItems: [...state.selectedItems],
    };
    setState(updatedObj);
  };

  const saveLocation = location => {
    axios
      .post('http://localhost:8088/locationservice/locations', location)
      .then(response => console.log('Location saved', response.data))
      .catch(err => console.log('Error while saving data ', err));
  };

  return (
    <div className={styles.searchBox}>
      {/* ===================  SEARCH BOX ======================== */}

      <input
        autoFocus
        className={styles.input}
        placeholder="Location"
        value={state.query}
        onChange={e => onChangeHandler(e.target.value)}
      />

      {/* ================ SUGGESTION LIST ====================== */}

      {state.locations.length > 0 ? <SuggestionList locations={state.locations} handler={onSelectHandler} /> : ''}

      {/* ================= SELECTED VALUES FROM SUGGESTION ============ */}
      {state.selectedItems.length > 0 ? <SearchSelection selected={state.selectedItems} /> : ''}
    </div>
  );
};

export default SearchBox;
