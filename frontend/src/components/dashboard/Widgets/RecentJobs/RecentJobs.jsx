


import { Link } from "react-router-dom";
import Card from "../../../common/Card";

import "./RecentJobs.css";

function RecentJobs({ jobs = [] }) {

    return (

        <Card title="Recent Jobs">

            {

                jobs.length === 0 ?

                    (

                        <div className="no-jobs">

                            No jobs posted yet.

                        </div>

                    )

                    :

                    jobs.map((job) => (

                        <div
                            key={job.id}
                            className="recent-job"
                        >

                            <div className="recent-job-header">

                                <div>

                                    <h4>

                                        {job.title}

                                    </h4>

                                    <p>

                                        🏢 {job.company_name}

                                    </p>

                                    <p>

                                        📍 {job.location}

                                    </p>

                                </div>

                                <span
                                    className={
                                        job.is_active
                                            ? "status active"
                                            : "status closed"
                                    }
                                >

                                    {

                                        job.is_active

                                            ?

                                            "Active"

                                            :

                                            "Closed"

                                    }

                                </span>

                            </div>

                            <div className="job-footer">

                                <span>

                                    👥 {job.applications} Applicants

                                </span>

                                <div className="job-buttons">

                                    <Link
                                        to={`/jobs/${job.id}`}
                                        className="job-btn primary"
                                    >

                                        View

                                    </Link>

                                    <Link
                                        to={`/employer/jobs/${job.id}/edit`}
                                        className="job-btn secondary"
                                    >

                                        Edit

                                    </Link>

                                    <Link
                                        to={`/employer/job/${job.id}/applicants`}
                                        className="job-btn applicants"
                                    >

                                        Applicants

                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))

            }

        </Card>

    );

}

export default RecentJobs;











