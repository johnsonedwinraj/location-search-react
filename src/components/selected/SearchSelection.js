import React, { useState } from 'react';
import SuggestionList from '../suggestions/SuggestionList';
import styles from './SearchSelection.module.css';
const SearchSelection = props => {
  let [showDropDown, setShowDropDown] = useState(false);
  let [dropDownValues, setDropDownValues] = useState([]);
  const locations = [...props.selected];

  const dropDownHandler = () => {
    setShowDropDown(!showDropDown);
    let moreLocations = locations.slice(2, locations.length);
    setDropDownValues(moreLocations);
  };

  return (
    <div className={styles.selectionArea}>
      {locations.length <= 2 ? (
        locations.map(location => (
          <p className={styles.selected} key={location.placeId}>
            {location.displayName}
          </p>
        ))
      ) : (
        <>
          <p className={styles.selected}>{locations[0].displayName}</p>
          <p className={styles.selected}>{locations[1].displayName}</p>
          <p className={styles.dropDown} onClick={() => dropDownHandler()}>
            <span>{locations.length - 2 + ' More'}</span>
            <i style={{ fontSize: '24px', marginLeft: '5px' }} className="fas">
              &#xf107;
            </i>
          </p>
          {showDropDown ? <SuggestionList className={styles.dropdownContent} locations={dropDownValues} /> : ''}
        </>
      )}
    </div>
  );
};

export default SearchSelection;
