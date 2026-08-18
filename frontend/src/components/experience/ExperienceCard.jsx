


import "./ExperienceCard.css";

import {
    FaBriefcase,
    FaEdit,
    FaTrash,
    FaMapMarkerAlt,
    FaCalendarAlt
} from "react-icons/fa";

function ExperienceCard({

    experience,

    onEdit,

    onDelete

}) {

    return (

        <div className="experience-card">

            <div className="experience-header">

                <div className="experience-icon">

                    <FaBriefcase />

                </div>

                <div>

                    <h3>{experience.job_title}</h3>

                    <h4>{experience.company_name}</h4>

                </div>

            </div>

            <div className="experience-info">

                <p>

                    <FaMapMarkerAlt />

                    {" "}

                    {experience.location || "Location not specified"}

                </p>

                <p>

                    <FaCalendarAlt />

                    {" "}

                    {experience.start_date}

                    {" - "}

                    {

                        experience.currently_working

                        ? "Present"

                        : experience.end_date

                    }

                </p>

            </div>

            <span className="employment-type">

                {experience.employment_type}

            </span>

            {

                experience.description && (

                    <p className="experience-description">

                        {experience.description}

                    </p>

                )

            }

            <div className="experience-actions">

                <button

                    className="edit-btn"

                    onClick={() => onEdit(experience)}

                >

                    <FaEdit />

                    Edit

                </button>

                <button

                    className="delete-btn"

                    onClick={() => onDelete(experience.id)}

                >

                    <FaTrash />

                    Delete

                </button>

            </div>

        </div>

    );

}

export default ExperienceCard;

