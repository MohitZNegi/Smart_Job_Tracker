import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, fetchJobs } from '../redux/jobsSlice';
import './SearchBar.css';

const SearchBar = () => {
  // useDispatch is a hook from react-redux that allows us to dispatch actions to the Redux store.
  const dispatch = useDispatch();
  // useSelector is a hook from react-redux that allows us to extract data from the Redux store state.
  const { searchQuery, status, jobs, error } = useSelector((state) => state.jobs);

  // Debounce network requests so we do not call the API on every key stroke.
  // This keeps typing responsive and reduces unnecessary API traffic.
  useEffect(() => {
    const delayMs = 500;
    const timerId = setTimeout(() => {
      dispatch(fetchJobs(searchQuery));
    }, delayMs);

    // Cleanup prevents stale timers from dispatching old searches.
    return () => clearTimeout(timerId);
  }, [dispatch, searchQuery]);

  const handleSearch = () => {
    // Manual search still supports explicit submit behavior.
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
        {/* The button is disabled when the status is 'loading' to prevent overlapping requests. */}
        <button onClick={handleSearch} disabled={status === 'loading'}>
          <span aria-hidden="true" className="btn-icon">{'\u2315'}</span>
          {/* We conditionally render the button text based on the status. */}
          {status === 'loading' ? 'Searching...' : 'Search Jobs'}
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

