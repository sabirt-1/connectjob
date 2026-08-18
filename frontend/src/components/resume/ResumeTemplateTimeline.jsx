


import "./ResumeTemplateTimeline.css";
// import Loader from "../../common/Loader";
import Loader from "../common/Loader";

function ResumeTemplateTimeline({ resume }) {

    if (!resume) {
        return <Loader text="Preparing Resume..." />;
    }

    const {
        personal = {},
        education = [],
        experience = [],
        projects = [],
        certifications = [],
        languages = [],
    } = resume;

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

        <div className="timeline-resume">

            <header className="timeline-header">

                <h1>{personal.fullName}</h1>

                <p>{personal.headline}</p>

                <div className="timeline-contact">

                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}

                </div>

            </header>

            {personal.bio && (

                <section>

                    <h2>Professional Summary</h2>

                    <p>{personal.bio}</p>

                </section>

            )}

            {experience.length > 0 && (

                <section>

                    <h2>Experience</h2>

                    <div className="timeline">

                        {experience.map(item => (

                            <div
                                key={item.id}
                                className="timeline-item"
                            >

                                <div className="timeline-dot"></div>

                                <div className="timeline-content">

                                    <span className="timeline-date">

                                        {formatDate(item.start_date)}

                                        {" — "}

                                        {item.currently_working
                                            ? "Present"
                                            : formatDate(item.end_date)}

                                    </span>

                                    <h3>{item.job_title}</h3>

                                    <h4>{item.company_name}</h4>

                                    {item.description && (

                                        <p>{item.description}</p>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                </section>

            )}

            {education.length > 0 && (

                <section>

                    <h2>Education</h2>

                    <div className="timeline">

                        {education.map(item => (

                            <div
                                key={item.id}
                                className="timeline-item"
                            >

                                <div className="timeline-dot"></div>

                                <div className="timeline-content">

                                    <span className="timeline-date">

                                        {formatDate(item.start_date)}

                                        {" — "}

                                        {item.currently_studying
                                            ? "Present"
                                            : formatDate(item.end_date)}

                                    </span>

                                    <h3>{item.degree}</h3>

                                    <h4>{item.institution}</h4>

                                    {item.field_of_study && (

                                        <p>{item.field_of_study}</p>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                </section>

            )}

            {projects.length > 0 && (

                <section>

                    <h2>Projects</h2>

                    {projects.map(project => (

                        <div
                            key={project.id}
                            className="resume-card"
                        >

                            <h3>{project.title}</h3>

                            <p>{project.description}</p>

                        </div>

                    ))}

                </section>

            )}

            {personal.skills && (

                <section>

                    <h2>Skills</h2>

                    <div className="skill-tags">

                        {personal.skills
                            .split(",")
                            .filter(skill => skill.trim())
                            .map((skill, index) => (

                                <span key={index}>

                                    {skill.trim()}

                                </span>

                            ))}

                    </div>

                </section>

            )}

            {certifications.length > 0 && (

                <section>

                    <h2>Certifications</h2>

                    {certifications.map(item => (

                        <p key={item.id}>

                            <strong>{item.title}</strong>

                            {" — "}

                            {item.issuing_organization}

                        </p>

                    ))}

                </section>

            )}

            {languages.length > 0 && (

                <section>

                    <h2>Languages</h2>

                    <div className="language-tags">

                        {languages.map(item => (

                            <span key={item.id}>

                                {item.language}

                                {" • "}

                                {item.proficiency}

                            </span>

                        ))}

                    </div>

                </section>

            )}

        </div>

    );

}

export default ResumeTemplateTimeline;

