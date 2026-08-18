


import "./ApplicantCard.css";
import StatusBadge from "../../common/Badge/StatusBadge";

import { useNavigate } from "react-router-dom";

function ApplicantCard({

    application,

    onStatusChange,

    onDelete

}) {
    const navigate = useNavigate();

    const resumeUrl =
        application.resume
            ? application.resume.startsWith("http")
                ? application.resume
                : `http://127.0.0.1:8000${application.resume}`
            : null;

    return (

        <div className="applicant-card">

            <div className="applicant-header">

                <div>

                    <h3>
                        {application.candidate_name}
                    </h3>

                    <p>

                        Applied for

                        {" "}

                        <strong>
                            {application.job_title}
                        </strong>

                    </p>

                </div>

                <StatusBadge
                    status={application.status}
                />

            </div>

            <div className="resume-area">

                <button

                    className="resume-button"

                    onClick={()=>

                        navigate("/employer/resume",
                            {
                                state:{
                                    resume:application.resume,
                                },

                            }
                        )

                    }
                >
                    📄 View Resume
                </button>

            </div>

            <div className="candidate-profile-area">

                <button

                    className="candidate-profile-button"

                    onClick={() =>
                        navigate(
                            `/employer/candidate/${application.candidate_id}`
                        )
                    }

                >

                    👤 View Candidate Profile

                </button>

            </div>

            <div className="status-buttons">

                <button
                    disabled={application.status === "reviewing"}
                    onClick={() =>
                        onStatusChange(
                            application.id,
                            "reviewing"
                        )
                    }
                >
                    Review
                </button>

                <button
                    disabled={application.status === "shortlisted"}
                    onClick={() =>
                        onStatusChange(
                            application.id,
                            "shortlisted"
                        )
                    }
                >
                    Shortlist
                </button>

                <button
                    disabled={application.status === "rejected"}
                    onClick={() =>
                        onStatusChange(
                            application.id,
                            "rejected"
                        )
                    }
                >
                    Reject
                </button>

                <button
                    disabled={application.status === "hired"}
                    onClick={() =>
                        onStatusChange(
                            application.id,
                            "hired"
                        )
                    }
                >
                    Hire
                </button>

                <button

                    style={{

                        background:"#dc2626"

                    }}

                    onClick={()=>

                        onDelete(

                            application.id

                        )

                    }

                >

                    Delete

                </button>

            </div>

        </div>

    );

}

export default ApplicantCard;









