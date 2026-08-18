




import { useEffect, useState } from "react";
import "./JobCard.css";
import { Link } from "react-router-dom";

import Button from "../common/Button/Button";
import SaveJobButton from "./SaveJobButton";


function JobCard({

    job,

    isEmployer = false,

    onDelete

}) {

    const [viewMode, setViewMode] = useState(() => {

        return (
            localStorage.getItem("jobconnect-job-view") ||
            "list"
        );

    });


    useEffect(() => {

        const handleViewChange = (event) => {

            setViewMode(event.detail);

        };

        window.addEventListener(
            "jobconnect-view-change",
            handleViewChange
        );

        return () => {

            window.removeEventListener(
                "jobconnect-view-change",
                handleViewChange
            );

        };

    }, []);


    const changeView = (mode) => {

        localStorage.setItem(
            "jobconnect-job-view",
            mode
        );

        setViewMode(mode);

        window.dispatchEvent(
            new CustomEvent(
                "jobconnect-view-change",
                {
                    detail: mode
                }
            )
        );

    };


    const isGrid = viewMode === "grid";


    return (

        <article
            className={`job-card ${
                isGrid
                    ? "job-card-grid"
                    : "job-card-list"
            }`}
        >

            {/* VIEW TOGGLE
                Only visually shown on the first card.
            */}

            <div className="job-view-toggle">

                <button
                    type="button"
                    className={
                        !isGrid
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        changeView("list")
                    }
                    title="List view"
                >

                    ☰

                    <span>List</span>

                </button>


                <button
                    type="button"
                    className={
                        isGrid
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        changeView("grid")
                    }
                    title="Card view"
                >

                    ▦

                    <span>Cards</span>

                </button>

            </div>


            {/* COMPANY LOGO */}

            <div className="job-card-left">

                <div className="company-logo">

                    {job.company_name
                        ?.charAt(0)
                        ?.toUpperCase() || "J"}

                </div>

            </div>


            {/* JOB INFORMATION */}

            <div className="job-card-center">

                <Link
                    to={`/jobs/${job.id}`}
                    className="job-title-link"
                >

                    <h3 className="job-title">

                        {job.title}

                    </h3>

                </Link>


                <p className="company-name">

                    {job.company_name ||
                        "JobConnect Company"}

                </p>


                <p className="job-posted">

                    Posted Recently

                </p>


                <div className="job-meta">

                    <span>

                        📍 {job.location}

                    </span>


                    <span>

                        💼 {job.job_type}

                    </span>


                    <span className="salary-pill">

                        ₹{" "}

                        {Number(
                            job.salary
                        ).toLocaleString(
                            "en-IN"
                        )}

                    </span>

                </div>

            </div>


            {/* ACTIONS */}

            <div className="job-card-right">

                {isEmployer ? (

                    <>

                        <Link
                            to={`/employer/jobs/${job.id}/edit`}
                            className="action-link"
                        >

                            <Button>

                                Edit

                            </Button>

                        </Link>


                        <Link
                            to={`/employer/job/${job.id}/applicants`}
                            className="action-link"
                        >

                            <Button>

                                Applicants

                            </Button>

                        </Link>


                        <Button
                            onClick={() =>
                                onDelete(job.id)
                            }
                        >

                            Delete

                        </Button>

                    </>

                ) : (

                    <>

                        <SaveJobButton
                            jobId={job.id}
                        />


                        <Link
                            to={`/jobs/${job.id}`}
                            className="action-link"
                        >

                            <Button>

                                Apply Now

                            </Button>

                        </Link>

                    </>

                )}

            </div>

        </article>

    );

}


export default JobCard;





