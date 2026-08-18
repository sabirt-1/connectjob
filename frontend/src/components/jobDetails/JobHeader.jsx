


import "./JobHeader.css";
import { Link } from "react-router-dom";
import SaveJobButton from "../jobs/SaveJobButton";

import { toast } from "react-toastify";

import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaMoneyBillWave,
    FaBuilding,
    FaClock,
    FaBookmark,
    FaShareAlt,
} from "react-icons/fa";

function JobHeader({ job }) {

    const handleShare = async () => {

        const shareUrl = window.location.href;

        const shareData = {
            title: job.title,
            text: `Check out this job: ${job.title} at ${job.company_name || "JobConnect"}`,
            url: shareUrl,
        };

        try {

            // Mobile / supported browsers
            if (navigator.share) {

                await navigator.share(shareData);

            } else {

                // Desktop fallback
                await navigator.clipboard.writeText(shareUrl);

                toast.success("Job link copied to clipboard!");

            }

        } catch (error) {

            // User cancelled the native share menu
            if (error.name !== "AbortError") {

                console.error(error);

                toast.error("Unable to share this job.");

            }

        }

    };

    return (
        <section className="job-header-card">

            <div className="job-header-left">

                {/* Company Logo */}

                <div className="company-logo-large">

                    {job.company_name
                        ? job.company_name.charAt(0).toUpperCase()
                        : "J"}

                </div>

                {/* Job Information */}

                <div className="job-header-content">

                    <h1>

                        {job.title}

                    </h1>

                    <h3>

                        {job.company_name || "JobConnect Company"}

                    </h3>

                    <div className="job-header-tags">

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

                        <span>

                            <FaBuilding />

                            Information Technology

                        </span>

                        <span>

                            <FaClock />

                            Posted Recently

                        </span>

                    </div>

                    <div className="job-extra-info">

                        <div>

                            <strong>Experience</strong>

                            <span>

                                {job.experience || "Fresher"}

                            </span>

                        </div>

                        <div>

                            <strong>Vacancies</strong>

                            <span>

                                {job.vacancies || 1}

                            </span>

                        </div>

                        <div>

                            <strong>Work Mode</strong>

                            <span>

                                Remote / Hybrid

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Right Side */}

            <div className="job-header-right">

                {/* <Link
                    to="/saved-jobs"
                    className="save-job-link"
                >

                    <button className="save-job-btn">

                        <FaBookmark />

                        Save Job

                    </button>

                </Link> */}
                <SaveJobButton
                    jobId={job.id}
                />

                {/* <button className="share-job-btn">

                    <FaShareAlt />

                    Share

                </button> */}
                <button
                    type="button"
                    className="share-job-btn"
                    onClick={handleShare}
                >
                    <FaShareAlt />
                    Share
                </button>

                <Link
                    to={`/apply/${job.id}`}
                    className="apply-link"
                >

                    <button className="header-apply-btn">

                        Apply Now

                    </button>

                </Link>

            </div>

        </section>
    );
}

export default JobHeader;







