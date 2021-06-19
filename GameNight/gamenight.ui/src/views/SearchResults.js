/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import groupData from '../helpers/data/groupData';
import GroupCard from '../components/Cards/groupCard';

const SearchResults = (props) => {
  const [results, setResults] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState('');

  const populateResults = () => {
    const searchTerm = props.match.params.term;

    groupData.getSearchedGroups(searchTerm.toLowerCase())
      .then((response) => {
        setResults(response);
        setSearchedTerm(searchTerm);
      });
  };

  useEffect(() => {
    populateResults();
  }, [searchedTerm !== props.match.params.term]);

  const showResults = () => (
    results.map((result) => (
     <GroupCard key={result.id} group={result} />
    ))
  );

  return (
    <div>
      <div className="d-flex col-wrap">
        <div className="single-group-header">
        {results.length === 0 ? <h1>No groups found</h1> : <h1>Group Search Results</h1>}
      </div>
      <div>
        <img className="header-image" src={'https://i.imgur.com/HLoG7EM.jpg'} alt={'A group of young adults playing a board game.'} />
      </div>
      </div>
      <div className="group-card-container">
      {showResults()}
      </div>
    </div>
  );
};

export default SearchResults;
