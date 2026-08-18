


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardShell from "../../components/dashboard/DashboardShell";
import Loader from "../../components/common/Loader";

import { getRecentJobs } from "../../services/applicationService";

import "./RecentlyViewedJobsPage.css";

function RecentlyViewedJobsPage() {

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadJobs();

    }, []);

    async function loadJobs() {

        try {

            const data = await getRecentJobs();

            setJobs(data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load recent jobs");

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <Loader text="Loading Recently Viewed Jobs..." />;

        // return (

        //     <div className="recent-page">

        //         <h2>Loading...</h2>

        //     </div>

        // );

    }

    return (


        <DashboardShell

            title="Recently Viewed Jobs"

            subtitle="Continue exploring jobs you've recently visited"

        >
            {/* <div className="recent-page"> */}

                {/* <h1>Recently Viewed Jobs</h1> */}

                {

                    jobs.length === 0 ?

                    (

                        <div className="empty-box">

                            <h3>No Recently Viewed Jobs</h3>

                            <p>

                                Open a few jobs and they'll appear here.

                            </p>

                        </div>

                    )

                    :

                    jobs.map(job => (

                        <div

                            key={job.id}

                            className="recent-card"

                        >

                            <div>

                                <h2>

                                    {job.job_title}

                                </h2>

                                <p>

                                    {job.company_name}

                                </p>

                                <span>

                                    {job.location}

                                </span>

                                <br />

                                <span>

                                    ₹ {Number(job.salary).toLocaleString("en-IN")}

                                </span>

                            </div>

                            <Link

                                to={`/jobs/${job.job}`}

                                className="view-btn"

                            >

                                View Job

                            </Link>

                        </div>

                    ))

                }

            {/* </div> */}

        </DashboardShell>

    );

}

export default RecentlyViewedJobsPage;

