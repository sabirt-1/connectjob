


import "./AchievementCard.css";

import {
    FaTrophy,
    FaBuilding,
    FaCalendarAlt,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

function AchievementCard({

    achievement,

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

        <div className="achievement-card">

            <div className="achievement-header">

                <div className="achievement-icon">

                    <FaTrophy />

                </div>

                <div>

                    <h3>

                        {achievement.title}

                    </h3>

                    {

                        achievement.organization && (

                            <p>

                                {achievement.organization}

                            </p>

                        )

                    }

                </div>

            </div>

            {

                achievement.organization && (

                    <div className="achievement-row">

                        <FaBuilding />

                        <span>

                            {achievement.organization}

                        </span>

                    </div>

                )

            }

            {

                achievement.achievement_date && (

                    <div className="achievement-row">

                        <FaCalendarAlt />

                        <span>

                            {

                                formatDate(

                                    achievement.achievement_date

                                )

                            }

                        </span>

                    </div>

                )

            }

            {

                achievement.description && (

                    <p className="achievement-description">

                        {achievement.description}

                    </p>

                )

            }

            <div className="achievement-actions">

                <button

                    className="edit-btn"

                    onClick={() =>

                        onEdit(achievement)

                    }

                >

                    <FaEdit />

                    Edit

                </button>

                <button

                    className="delete-btn"

                    onClick={() =>

                        onDelete(achievement.id)

                    }

                >

                    <FaTrash />

                    Delete

                </button>

            </div>

        </div>

    );

}

export default AchievementCard;

