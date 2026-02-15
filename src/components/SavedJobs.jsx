import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSavedJob } from '../redux/jobsSlice';
import './SavedJobs.css';

const SavedJobs = () => {
  const savedJobs = useSelector((state) => state.jobs.savedJobs);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="saved-jobs-container">
      <div className="saved-header">
        <h2>Saved Jobs ({savedJobs.length})</h2>
        <button
          type="button"
          className="toggle-saved-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          <span aria-hidden="true">{isOpen ? '\u25BE' : '\u25B8'}</span>
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>

      {isOpen && (
        <>
          {savedJobs.length > 0 ? (
            <ul className="saved-jobs-list">
              {savedJobs.map((job) => (
                <li key={job.id} className="saved-job-item">
                  <div className="job-info">
                    <h3>{job.title}</h3>
                    <p>{job.company_name}</p>
                  </div>
                  <div className="saved-actions">
                    <a href={job.url} target="_blank" rel="noreferrer">
                      <span aria-hidden="true">{'\u2197'}</span>
                      Apply
                    </a>
                    <button onClick={() => dispatch(removeSavedJob(job.id))}>
                      <span aria-hidden="true">{'\u2715'}</span>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-text">No saved jobs yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SavedJobs;

