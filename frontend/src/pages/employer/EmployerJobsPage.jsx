



import { useEffect, useState } from "react";

import {
    getMyJobs,
    deleteJob
} from "../../services/jobService";

import JobCard from "../../components/jobs/JobCard";
import Loader from "../../components/common/Loader";
import DashboardShell from "../../components/dashboard/DashboardShell";

import { toast } from "react-toastify";

import "./EmployerJobsPage.css";


function EmployerJobsPage() {


    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);


    const loadJobs = async () => {

        setLoading(true);

        try {

            const data = await getMyJobs();

            setJobs(data);

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to load your jobs."
            );

        }

        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadJobs();

    }, []);


    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this job?"
            );


        if (!confirmDelete) return;


        try {

            await deleteJob(id);

            toast.success(
                "Job deleted successfully."
            );

            await loadJobs();

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to delete job."
            );

        }

    };


    if (loading) {

        return (
            <Loader
                text="Loading Jobs..."
            />
        );

    }


    return (

        <DashboardShell

            title="My Jobs"

            subtitle="Manage your job postings and recruitment opportunities"

        >

            <div className="ejobs-page">


                    {/* PAGE HEADER */}

                <section className="ejobs-header">


                    <div className="ejobs-header-main">


                        <div className="ejobs-header-icon">

                            💼

                        </div>


                        <div className="ejobs-header-content">

                            <h1>
                                My Jobs
                            </h1>

                            <p>
                                Manage and monitor your job postings
                            </p>

                        </div>


                    </div>


                    <div className="ejobs-header-summary">


                        <div className="ejobs-summary-number">

                            {jobs.length}

                        </div>


                        <div className="ejobs-summary-content">

                            <strong>

                                {jobs.length === 1
                                    ? "Active Job"
                                    : "Active Jobs"}

                            </strong>


                            <span>
                                Currently posted
                            </span>

                        </div>


                    </div>


                </section>


                    {/* JOB LIST HEADER */}

                {jobs.length > 0 && (

                    <div className="ejobs-list-header">


                        <div className="ejobs-list-heading">

                            <h2>
                                Your Job Listings
                            </h2>


                            <span>

                                {jobs.length}{" "}

                                {jobs.length === 1
                                    ? "listing"
                                    : "listings"}{" "}

                                available

                            </span>

                        </div>


                    </div>

                )}


                    {/* EMPTY STATE */}

                {jobs.length === 0 ? (

                    <section className="ejobs-empty">


                        <div className="ejobs-empty-icon">

                            💼

                        </div>


                        <h2 className="ejobs-empty-title">

                            No Jobs Posted Yet

                        </h2>


                        <p className="ejobs-empty-text">

                            You haven't posted any jobs yet.
                            Create your first job posting and
                            start receiving applications from
                            talented candidates.

                        </p>


                        <button

                            type="button"

                            className="ejobs-create-btn"

                            onClick={() =>
                                window.location.href =
                                "/employer/create-job"
                            }

                        >

                            <span>
                                +
                            </span>

                            Create Your First Job

                        </button>


                    </section>

                ) : (


                    //    JOB LIST

                    <div className="ejobs-list">


                        {jobs.map((job) => (

                            <div

                                className="ejobs-card-wrapper"

                                key={job.id}

                            >

                                <JobCard

                                    job={job}

                                    isEmployer={true}

                                    onDelete={handleDelete}

                                />

                            </div>

                        ))}


                    </div>

                )}


            </div>

        </DashboardShell>

    );

}


export default EmployerJobsPage;





