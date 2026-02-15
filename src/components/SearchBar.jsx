import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, fetchJobs } from '../redux/jobsSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.jobs.searchQuery);

  const handleSearch = () => {
    dispatch(fetchJobs(searchQuery));
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search for jobs"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;