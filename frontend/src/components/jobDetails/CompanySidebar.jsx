


import "./CompanySidebar.css";
import { Link } from "react-router-dom";

import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaBuilding,
    FaUsers,
    FaGlobe,
    FaEnvelope,
    FaPhone,
    FaArrowRight,
} from "react-icons/fa";

function CompanySidebar({ job }) {

    const company = job.company;

    return (

        <div className="company-sidebar">

            {/* APPLY CARD */}

            {/* <div className="company-card apply-card">

                <Link to={`/apply/${job.id}`}>

                    <button className="company-apply-btn">

                        Apply Now

                    </button>

                </Link>

            </div> */}

            {/* COMPANY */}

            <div className="company-card">

                <h3 className="sidebar-title">

                    Company

                </h3>

                <div className="company-logo">

                    {company?.company_name
                        ?.charAt(0)
                        ?.toUpperCase() || "J"}

                </div>

                <h2>

                    {company?.company_name || "Company"}

                </h2>

                <p className="company-type">

                    {company?.industry || "Industry Not Available"}

                </p>

                <div className="company-info">

                    <div>

                        <FaMapMarkerAlt />

                        <span>

                            {company?.location || job.location}

                        </span>

                    </div>

                    <div>

                        <FaBriefcase />

                        <span>

                            {job.job_type}

                        </span>

                    </div>

                    <div>

                        <FaBuilding />

                        <span>

                            {company?.industry || "-"}

                        </span>

                    </div>

                    <div>

                        <FaUsers />

                        <span>

                            {company?.company_size || "-"}

                        </span>

                    </div>

                    <div>

                        <FaGlobe />

                        <span>

                            {company?.website || "-"}

                        </span>

                    </div>

                </div>

                {company ? (

                    <Link to={`/company/${company.id}`}>

                        <button className="outline-btn">

                            View Company

                        </button>

                    </Link>

                ) : (

                    <button
                        className="outline-btn"
                        disabled
                    >
                        Company Not Available
                    </button>

                )}

            </div>

            {/* RECRUITER */}

            <div className="company-card">

                <h3 className="sidebar-title">

                    Recruiter

                </h3>

                <div className="recruiter-avatar">

                    {company?.hr_name
                        ?.charAt(0)
                        ?.toUpperCase() || "H"}

                </div>

                <h2>

                    {company?.hr_name || "HR Manager"}

                </h2>

                <p className="company-type">

                    Recruitment Team

                </p>

                <div className="company-info">

                    <div>

                        <FaEnvelope />

                        <span>

                            {company?.contact_email || "-"}

                        </span>

                    </div>

                    <div>

                        <FaPhone />

                        <span>

                            {company?.contact_phone || "-"}

                        </span>

                    </div>

                </div>

                <button className="contact-btn">

                    Contact Employer

                </button>

            </div>

        </div>

    );

}

export default CompanySidebar;









