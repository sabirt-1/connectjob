


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardShell from "../../components/dashboard/DashboardShell";

import Loader from "../../components/common/Loader";

import {
    getSavedJobs,
    unsaveJob,
} from "../../services/applicationService";

import "./SavedJobsPage.css";

function SavedJobsPage() {

    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadSavedJobs();

    }, []);

    async function loadSavedJobs() {

        try {

            const data = await getSavedJobs();

            setSavedJobs(data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load saved jobs");

        } finally {

            setLoading(false);

        }

    }

    async function handleRemove(jobId) {

        try {

            await unsaveJob(jobId);

            setSavedJobs(prev =>
                prev.filter(job => job.job !== jobId)
            );

            toast.success("Removed from Saved Jobs");

        } catch (error) {

            console.log(error);

            toast.error("Unable to remove job");

        }

    }

    if (loading) {

        return <Loader />;

    }

    return (

         <DashboardShell

            title="Saved Jobs"

            subtitle="Manage all the jobs you've bookmarked"

        >
            <div className="saved-page">

                <div className="saved-header">

                    <h1>❤️ Saved Jobs</h1>

                    <p>

                        {savedJobs.length} Saved Job
                        {savedJobs.length !== 1 && "s"}

                    </p>

                </div>

                {

                    savedJobs.length === 0 ? (

                        <div className="saved-empty">

                            <div className="empty-icon">

                                ⭐

                            </div>

                            <h2>No Saved Jobs Yet</h2>

                            <p>

                                Save jobs while browsing and they'll appear here.

                            </p>

                            <Link
                                to="/jobs"
                                className="browse-btn"
                            >

                                Browse Jobs

                            </Link>

                        </div>

                    ) : (

                        <div className="saved-list">

                            {

                                savedJobs.map(job => (

                                    <div
                                        className="saved-card"
                                        key={job.id}
                                    >

                                        <div className="saved-left">

                                            <div className="saved-logo">

                                                {

                                                    job.company_name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()

                                                }

                                            </div>

                                        </div>

                                        <div className="saved-center">

                                            <Link
                                                to={`/jobs/${job.job}`}
                                                className="job-link"
                                            >

                                                <h2>

                                                    {job.job_title}

                                                </h2>

                                            </Link>

                                            <p className="company-name">

                                                {job.company_name}

                                            </p>

                                            <div className="saved-meta">

                                                <span>

                                                    📍 {job.location}

                                                </span>

                                                <span>

                                                    💼 {job.job_type}

                                                </span>

                                                <span>

                                                    ₹ {Number(job.salary).toLocaleString("en-IN")}

                                                </span>

                                            </div>

                                        </div>

                                        <div className="saved-right">

                                            <Link
                                                to={`/jobs/${job.job}`}
                                                className="apply-btn"
                                            >

                                                Apply Now

                                            </Link>

                                            <button
                                                className="remove-btn"
                                                onClick={() =>
                                                    handleRemove(job.job)
                                                }
                                            >

                                                Remove

                                            </button>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </DashboardShell>

    );

}

export default SavedJobsPage;





