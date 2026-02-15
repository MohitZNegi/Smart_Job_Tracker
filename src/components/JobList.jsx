import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from '../redux/jobsSlice';
import JobCard from './JobCard';
import './JobList.css';

const JobList = () => {
  // useDispatch is a hook from react-redux that allows us to dispatch actions to the Redux store.
  const dispatch = useDispatch();
  // useSelector is a hook from react-redux that allows us to extract data from the Redux store state.
  const { jobs, status, error, searchQuery } = useSelector((state) => state.jobs);

  // useEffect is a React hook that lets you synchronize a component with an external system.
  // In this case, we're using it to fetch jobs when the component mounts or when the search query changes.
  useEffect(() => {
    // We only fetch jobs if the status is 'idle' to prevent re-fetching on every render.
    // We also fetch jobs if a search query is present.
    if (status === 'idle') {
      // We dispatch the fetchJobs async thunk with the search query (or 'react' as a default).
      dispatch(fetchJobs(searchQuery || 'react'));
    }
  }, [status, dispatch, searchQuery]);

  // Conditional rendering based on the status of the API call.
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="job-list">
      {/* We map over the jobs array and render a JobCard for each job. */}
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;