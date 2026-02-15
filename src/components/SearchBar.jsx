import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, fetchJobs } from '../redux/jobsSlice';
import './SearchBar.css';

const SearchBar = () => {
  // useDispatch is a hook from react-redux that allows us to dispatch actions to the Redux store.
  const dispatch = useDispatch();
  // useSelector is a hook from react-redux that allows us to extract data from the Redux store state.
  const { searchQuery, status, jobs, error } = useSelector((state) => state.jobs);

  const handleSearch = () => {
    // We dispatch the fetchJobs async thunk with the current search query.
    dispatch(fetchJobs(searchQuery));
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        {/* This is a controlled input. Its value is controlled by the 'searchQuery' state from the Redux store. */}
        {/* When the user types in the input, the 'onChange' event is fired, and we dispatch the 'setSearchQuery' action to update the state. */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder="Search for jobs"
        />
        {/* The button is disabled when the status is 'loading' to prevent multiple searches at the same time. */}
        <button onClick={handleSearch} disabled={status === 'loading'}>
          {/* We conditionally render the button text based on the status. */}
          {status === 'loading' ? 'Searching...' : 'Search'}
        </button>
      </div>
      {/* We conditionally render the number of jobs found when the search is successful. */}
      {status === 'succeeded' && <div className="search-results-count">{jobs.length} jobs found</div>}
      {/* We conditionally render the error message if the search fails. */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SearchBar;