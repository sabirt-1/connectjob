


import "./JobCard.css";

import { Link } from "react-router-dom";

import {

    FaMapMarkerAlt,

    FaBriefcase,

    FaUsers,

    FaEdit,

    FaTrash

} from "react-icons/fa";

function JobCard({

    job,

    onDelete

}){

    return(

        <div className="employer-job-card">

            <div className="job-top">

                <div>

                    <h3>

                        {job.title}

                    </h3>

                    <p>

                        <FaMapMarkerAlt/>

                        {" "}

                        {job.location}

                    </p>

                </div>

                <span>

                    {job.job_type}

                </span>

            </div>

            <div className="job-middle">

                <p>

                    Salary

                </p>

                <h4>

                    ₹ {job.salary}

                </h4>

            </div>

            <div className="job-bottom">

                <p>

                    <FaUsers/>

                    {" "}

                    {

                        job.applications_count || 0

                    }

                    Applicants

                </p>

                <div>

                    <Link

                        to={`/employer/job/${job.id}/applicants`}

                    >

                        View

                    </Link>

                    <button>

                        <FaEdit/>

                    </button>

                    <button

                        onClick={()=>onDelete(job.id)}

                    >

                        <FaTrash/>

                    </button>

                </div>

            </div>

        </div>

    );

}

export default JobCard;

