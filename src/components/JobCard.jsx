import React from "react";
import { useDispatch } from "react-redux";
import { saveJob } from "../redux/jobsSlice";
import "./JobCard.css";

const JobCard = ({ job }) => {
  const dispatch = useDispatch();

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company_name}</p>
      <p>{job.candidate_required_location}</p>
      <p dangerouslySetInnerHTML={{ __html: job.description }}></p>
    </div>
  );
};

export default JobCard;
