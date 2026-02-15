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
      <h3 className="job-title">{job.title}</h3>
      <p className="job-company">{job.company_name}</p>
      <p className="job-location">{job.candidate_required_location}</p>
      <div
        className="job-description"
        dangerouslySetInnerHTML={{
          __html: job.description.substring(0, 200) + '...',
        }}
      ></div>

      <div className="job-actions">
        <a href={job.url} target="_blank" rel="noreferrer" className="job-link">
          <span aria-hidden="true" className="btn-icon">{'\u2197'}</span>
          Apply
        </a>
        <button onClick={() => dispatch(saveJob(job))} disabled={isSaved}>
          <span aria-hidden="true" className="btn-icon">{isSaved ? '\u2713' : '+'}</span>
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;

