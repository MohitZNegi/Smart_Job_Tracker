import React from 'react';
import { useSelector } from 'react-redux';
import JobCard from './JobCard';
import './JobList.css';

const JobList = () => {
  // useSelector is a hook from react-redux that allows us to extract data from the Redux store state.
  const { jobs, status, error } = useSelector((state) => state.jobs);

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
