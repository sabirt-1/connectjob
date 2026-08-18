


import "./EducationCard.css";

import {
    FaGraduationCap,
    FaCalendarAlt,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

function EducationCard({

    education,

    onEdit,

    onDelete,

}) {

    function formatDate(date) {

        if (!date) return "Present";

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                year: "numeric",
            }
        );

    }

    return (

        <div className="education-card">

            <div className="education-header">

                <div className="education-icon">

                    <FaGraduationCap />

                </div>

                <div>

                    <h3>

                        {education.degree}

                    </h3>

                    <h4>

                        {education.institution}

                    </h4>

                </div>

            </div>

            {

                education.field_of_study && (

                    <p className="education-field">

                        {education.field_of_study}

                    </p>

                )

            }

            <div className="education-date">

                <FaCalendarAlt />

                <span>

                    {formatDate(education.start_date)}

                    {" - "}

                    {

                        education.currently_studying

                            ? "Present"

                            : formatDate(
                                  education.end_date
                              )

                    }

                </span>

            </div>

            {

                education.grade && (

                    <p className="education-grade">

                        <strong>

                            Grade:

                        </strong>

                        {" "}

                        {education.grade}

                    </p>

                )

            }

            {

                education.description && (

                    <p className="education-description">

                        {education.description}

                    </p>

                )

            }

            <div className="education-actions">

                <button
                    className="edit-btn"
                    onClick={() =>
                        onEdit(education)
                    }
                >

                    <FaEdit />

                    Edit

                </button>

                <button
                    className="delete-btn"
                    onClick={() =>
                        onDelete(education.id)
                    }
                >

                    <FaTrash />

                    Delete

                </button>

            </div>

        </div>

    );

}

export default EducationCard;




