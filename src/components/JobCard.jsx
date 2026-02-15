import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveJob } from '../redux/jobsSlice';
import './JobCard.css';

const JobCard = ({ job }) => {
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.jobs.savedJobs);
  const isSaved = savedJobs.find((savedJob) => savedJob.id === job.id);

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company_name}</p>
      <p>{job.candidate_required_location}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: job.description.substring(0, 200) + '...',
        }}
      ></div>
      <a href={job.url} target="_blank" rel="noreferrer">
        View Job
      </a>
      <button onClick={() => dispatch(saveJob(job))} disabled={isSaved}>
        {isSaved ? 'Saved' : 'Save'}
      </button>
    </div>
  );
};

export default JobCard;
