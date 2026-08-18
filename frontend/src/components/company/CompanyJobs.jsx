


import "./CompanyJobs.css";

import { Link } from "react-router-dom";

import {

    FaMapMarkerAlt,

    FaBriefcase,

    FaMoneyBillWave,

    FaArrowRight,

} from "react-icons/fa";

function CompanyJobs({ jobs }) {

    return (

        <section className="company-card">

            <h2>

                Open Positions

            </h2>

            {

                jobs.length === 0 ? (

                    <p>

                        No jobs available.

                    </p>

                ) : (

                    <div className="company-jobs-grid">

                        {

                            jobs.map((job) => (

                                <div

                                    className="company-job-card"

                                    key={job.id}

                                >

                                    <h3>

                                        {job.title}

                                    </h3>

                                    <div className="company-job-meta">

                                        <span>

                                            <FaMapMarkerAlt />

                                            {job.location}

                                        </span>

                                        <span>

                                            <FaBriefcase />

                                            {job.job_type}

                                        </span>

                                        <span>

                                            <FaMoneyBillWave />

                                            ₹ {Number(job.salary).toLocaleString("en-IN")}

                                        </span>

                                    </div>

                                    <Link

                                        to={`/jobs/${job.id}`}

                                        className="company-job-link"

                                    >

                                        View Job

                                        <FaArrowRight />

                                    </Link>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </section>

    );

}

export default CompanyJobs;

