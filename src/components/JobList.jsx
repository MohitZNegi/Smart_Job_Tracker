import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from '../redux/jobsSlice';
import JobCard from './JobCard';
import './JobList.css';

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, status, error, searchQuery } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobs(searchQuery || 'react'));
    }
  }, [status, dispatch, searchQuery]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;