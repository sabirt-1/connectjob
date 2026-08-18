


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../../services/jobService";
import SectionHeader from "../common/SectionHeader/SectionHeader";
import SaveJobButton from "../jobs/SaveJobButton";

import "./FeaturedJobsSection.css";

function FeaturedJobsSection() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        async function loadJobs() {

            try {

                const data = await getJobs();

                setJobs(data.slice(0, 6));

            } catch (error) {

                console.log(error);

            }

        }

        loadJobs();

    }, []);

    return (

        <section className="featured-jobs">

            <div className="section-header">

                {/* <h2>Featured Jobs</h2>

                <p>
                    Know your worth and find the job that qualifies your life
                </p> */}
                <SectionHeader
                    title="Featured Jobs"
                    subtitle="Know your worth and find the job that qualifies your life"
                />

            </div>

            <div className="featured-job-list">


                {jobs.map((job) => (

                    <div
                        key={job.id}
                        className="featured-job-card"
                    >

                        {/* <button className="save-btn">

                            ♡

                        </button> */}

                        {/* <button
                            type="button"
                            className="save-icon-button"
                            onClick={handleSave}
                            title={isSaved ? "Remove saved job" : "Save job"}
                        >
                            {isSaved ? "♥" : "♡"}
                        </button> */}
                        {/* <Link to={`/saved-jobs`} className="save-btn">

                            ♡

                        </Link> */}

                        <div className="save-btn">

                            <SaveJobButton
                                jobId={job.id}
                                iconOnly
                            />

                        </div>

                        <div className="job-content">

                            <div className="job-logo">

                                {job.company_name
                                    ? job.company_name.charAt(0).toUpperCase()
                                    : "J"}

                            </div>

                            <div className="job-body">

                                <h3>

                                    {job.title}

                                </h3>

                                <p className="company-name">

                                    🏢 {job.company_name || "JobConnect"}

                                </p>

                                <div className="job-meta">

                                    <span>📍 {job.location}</span>

                                    <span>💼 {job.job_type}</span>

                                    <span>₹ {Number(job.salary).toLocaleString()}</span>

                                </div>

                                <div className="job-tags">

                                    <span>Remote</span>

                                    <span>Full Time</span>

                                    <span>Hiring</span>

                                </div>

                                <div className="job-footer">

                                    <Link
                                        className="details-link"
                                        to={`/jobs/${job.id}`}
                                    >

                                        View Details →

                                    </Link>

                                    <Link
                                        to={`/apply/${job.id}`}
                                    >

                                        <button>

                                            Apply Now

                                        </button>

                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            <div className="featured-footer">

                <Link
                    to="/jobs"
                    className="browse-jobs-btn"
                >

                    Browse All Jobs →

                </Link>

            </div>

        </section>

    );

}

export default FeaturedJobsSection;





