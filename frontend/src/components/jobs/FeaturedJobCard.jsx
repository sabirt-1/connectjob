


import { Link } from "react-router-dom";
import "./FeaturedJobCard.css";

function FeaturedJobCard({ job }) {

    const companyLetter =
        job.company_name
            ? job.company_name.charAt(0).toUpperCase()
            : "J";

    return (

        <div className="featured-job-card">

            <div className="featured-job-header">

                <div className="company-logo">

                    {companyLetter}

                </div>

                {/* <button className="bookmark-btn">

                    ♡

                </button> */}
                <Link to={`/saved-jobs`} className="bookmark-btn">

                    ♡

                </Link>

            </div>

            <h3>

                {job.title}

            </h3>

            <p className="company-name">

                {job.company_name || "JobConnect"}

            </p>

            <div className="job-meta">

                <span>

                    📍 {job.location}

                </span>

                <span>

                    💼 {job.job_type}

                </span>

                <span>

                    ₹ {job.salary}

                </span>

            </div>

            <div className="job-tags">

                <span>Remote</span>

                <span>Full Time</span>

                <span>Hiring</span>

            </div>

            <div className="featured-job-footer">

                <Link
                    to={`/jobs/${job.id}`}
                    className="details-btn"
                >

                    View Details

                </Link>

                <Link
                    to={`/apply/${job.id}`}
                    className="apply-btn"
                >

                    Apply Now

                </Link>

            </div>

        </div>

    );

}

export default FeaturedJobCard;

