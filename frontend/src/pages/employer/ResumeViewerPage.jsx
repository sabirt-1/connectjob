


import { useLocation } from "react-router-dom";
import "./ResumeViewerPage.css";

function ResumeViewerPage() {

    const { state } = useLocation();

    const resume = state?.resume;

    if (!resume) {
        return (
            <div className="no-resume">
                <h2>No Resume Found</h2>
                <p>The candidate has not uploaded a resume.</p>
            </div>
        );
    }

    return (
        <div className="resume-viewer">

            <h1>Candidate Resume</h1>

            <div className="resume-actions">

                <a
                    href={resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-btn"
                >
                    📄 Open Resume
                </a>

                <a
                    href={resume}
                    download
                    className="resume-btn"
                >
                    ⬇ Download Resume
                </a>

            </div>

            <p className="resume-note">
                Click <strong>Open Resume</strong> to review the candidate's PDF in a
                new browser tab or use <strong>Download Resume</strong> to save it
                locally.
            </p>

        </div>
    );
}

export default ResumeViewerPage;





