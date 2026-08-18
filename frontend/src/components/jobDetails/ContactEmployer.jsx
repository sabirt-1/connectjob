


import "./ContactEmployer.css";

import {

    FaEnvelope,

    FaPhoneAlt,

    FaUserTie,

    FaPaperPlane,

} from "react-icons/fa";

function ContactEmployer({ job }) {

    const company = job.company;

    return (

        <section className="details-card">

            <h2>

                Contact Employer

            </h2>

            <div className="contact-card">

                <div className="contact-avatar">

                    <FaUserTie />

                </div>

                <div className="contact-details">

                    <h3>

                        {company?.hr_name || "HR Manager"}

                    </h3>

                    <p>

                        {company?.company_name || "Recruitment Team"}

                    </p>

                </div>

            </div>

            <div className="contact-info">

                <div className="contact-item">

                    <FaEnvelope className="contact-icon" />

                    <span>

                        {company?.contact_email || "-"}

                    </span>

                </div>

                <div className="contact-item">

                    <FaPhoneAlt className="contact-icon" />

                    <span>

                        {company?.contact_phone || "-"}

                    </span>

                </div>

            </div>

            <button className="send-message-btn">

                <FaPaperPlane />

                Send Message

            </button>

        </section>

    );

}

export default ContactEmployer;














