import React, { useState } from 'react';
import styles from './SuggestionList.module.css';

const SuggestionList = props => {
  const locations = [...props.locations];

  return (
    <div className={styles.suggestionList}>
      {locations.map(location => (
        <p className={styles.locationItem} key={location.placeId} onClick={() => props.handler(location)}>
          {location.displayName}
        </p>
      ))}
    </div>
  );
};

export default SuggestionList;
