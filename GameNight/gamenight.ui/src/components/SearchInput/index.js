/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const SearchInput = (props) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/search/${text}`);

    setText('');
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
      <form onSubmit={handleSubmit}>
      <input type='text' name='text' className='search-input w-75' value={text} placeholder='Search...' onChange={handleChange} />
    </form>
  );
};

export default withRouter(SearchInput);
