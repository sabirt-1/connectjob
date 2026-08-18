


import "./JobDescription.css";

function JobDescription({ description }) {
    return (
        <div className="job-section-card">
            <h2>Job Description</h2>

            <p>
                {description || "No job description available."}
            </p>
        </div>
    );
}

export default JobDescription;

