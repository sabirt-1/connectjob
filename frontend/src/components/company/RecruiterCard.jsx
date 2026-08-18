


import "./RecruiterCard.css";

import {

    FaUserTie,

    FaEnvelope,

    FaPhone,

} from "react-icons/fa";

function RecruiterCard({ company }) {

    return (

        <aside className="recruiter-card">

            <h2>

                Recruiter

            </h2>

            <div className="recruiter-item">

                <FaUserTie />

                <span>

                    {company.hr_name || "Not Available"}

                </span>

            </div>

            <div className="recruiter-item">

                <FaEnvelope />

                <span>

                    {company.contact_email || "Not Available"}

                </span>

            </div>

            <div className="recruiter-item">

                <FaPhone />

                <span>

                    {company.contact_phone || "Not Available"}

                </span>

            </div>

        </aside>

    );

}

export default RecruiterCard;

