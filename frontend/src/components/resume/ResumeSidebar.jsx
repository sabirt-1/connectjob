


import "./ResumeSidebar.css";

import { useResume } from "../../context/ResumeContext";

function ResumeSidebar({ onPrint }) {

    const {

        template,

        setTemplate,

    } = useResume();

    return (

        <div className="resume-sidebar">

            <h2>

                Resume Builder

            </h2>

            <div className="template-section">

                <h4>

                    Choose Template

                </h4>

                <button
                    className={template === "modern" ? "active" : ""}
                    onClick={() => setTemplate("modern")}
                >
                    Modern
                </button>

                <button
                    className={template === "classic" ? "active" : ""}
                    onClick={() => setTemplate("classic")}
                >
                    Classic
                </button>

                <button
                    className={template === "ats" ? "active" : ""}
                    onClick={() => setTemplate("ats")}
                >
                    ATS Friendly
                </button>

            </div>

            <div className="resume-actions">

                <button onClick={onPrint}>
                    Download PDF
                </button>

                <button>

                    Print Resume

                </button>

            </div>

        </div>

    );

}

export default ResumeSidebar;




