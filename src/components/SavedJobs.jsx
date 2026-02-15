import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSavedJob } from '../redux/jobsSlice';
import './SavedJobs.css';

const SavedJobs = () => {
  const savedJobs = useSelector((state) => state.jobs.savedJobs);
  const dispatch = useDispatch();

  return (
    <div className="saved-jobs-container">
      <h2>Saved Jobs</h2>
      {savedJobs.length > 0 ? (
        <ul className="saved-jobs-list">
          {savedJobs.map((job) => (
            <li key={job.id} className="saved-job-item">
              <div className="job-info">
                <h3>{job.title}</h3>
                <p>{job.company_name}</p>
              </div>
              <button onClick={() => dispatch(removeSavedJob(job.id))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved jobs yet.</p>
      )}
    </div>
  );
};

export default SavedJobs;
