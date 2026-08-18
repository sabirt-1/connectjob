


import "./EmptyState.css";

import { Link } from "react-router-dom";

function EmptyState({

    title,

    description,

    buttonText,

    buttonLink,

    icon = "📂"

}) {

    return (

        <div className="empty-state">

            <div className="empty-icon">

                {icon}

            </div>

            <h2>

                {title}

            </h2>

            <p>

                {description}

            </p>

            {

                buttonText && buttonLink && (

                    <Link

                        to={buttonLink}

                        className="empty-btn"

                    >

                        {buttonText}

                    </Link>

                )

            }

        </div>

    );

}

export default EmptyState;

