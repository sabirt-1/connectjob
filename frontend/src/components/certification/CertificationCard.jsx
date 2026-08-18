


import "./CertificationCard.css";

import {
    FaCertificate,
    FaBuilding,
    FaCalendarAlt,
    FaExternalLinkAlt,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

function CertificationCard({

    certification,

    onEdit,

    onDelete,

}) {

    function formatDate(date) {

        if (!date) return "N/A";

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                year: "numeric",
            }
        );

    }

    return (

        <div className="certification-card">

            <div className="certification-header">

                <div className="certification-icon">

                    <FaCertificate />

                </div>

                <div>

                    <h3>

                        {certification.title}

                    </h3>

                    <p>

                        {certification.issuing_organization}

                    </p>

                </div>

            </div>

            <div className="certification-row">

                <FaBuilding />

                <span>

                    {certification.issuing_organization}

                </span>

            </div>

            <div className="certification-row">

                <FaCalendarAlt />

                <span>

                    {formatDate(certification.issue_date)}

                    {

                        certification.expiry_date &&

                        ` - ${formatDate(certification.expiry_date)}`

                    }

                </span>

            </div>

            {

                certification.credential_id && (

                    <div className="credential-box">

                        <strong>

                            Credential ID:

                        </strong>

                        <span>

                            {certification.credential_id}

                        </span>

                    </div>

                )

            }

            {

                certification.description && (

                    <p className="certification-description">

                        {certification.description}

                    </p>

                )

            }

            {

                certification.credential_url && (

                    <a

                        href={certification.credential_url}

                        target="_blank"

                        rel="noreferrer"

                        className="credential-link"

                    >

                        <FaExternalLinkAlt />

                        Verify Credential

                    </a>

                )

            }

            <div className="certification-actions">

                <button

                    className="edit-btn"

                    onClick={() =>

                        onEdit(certification)

                    }

                >

                    <FaEdit />

                    Edit

                </button>

                <button

                    className="delete-btn"

                    onClick={() =>

                        onDelete(certification.id)

                    }

                >

                    <FaTrash />

                    Delete

                </button>

            </div>

        </div>

    );

}

export default CertificationCard;









