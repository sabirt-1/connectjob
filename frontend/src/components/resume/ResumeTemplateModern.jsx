


import "./ResumeTemplateModern.css";
// import Loader from "../common/Loader";
// import Loader from 

function ResumeTemplateModern({ resume }) {

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
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    }

    function renderBullets(text) {
        if (!text) return null;

        return text
            .split("\n")
            .filter(line => line.trim())
            .map((line, index) => (
                <li key={index}>{line}</li>
            ));
    }

    return (

        <div className="modern-resume">

            <header className="modern-header">

                <h1>{personal.fullName}</h1>

                <p className="headline">
                    {personal.headline}
                </p>

                <div className="contact">

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

            {personal.skills && (
                <section>

                    <h2>Skills</h2>

                    <div className="skills">

                        {personal.skills.split(",").map((skill, index) => (

                            <span
                                key={index}
                                className="badge"
                            >
                                {skill.trim()}
                            </span>

                        ))}

                    </div>

                </section>
            )}

            {experience.length > 0 && (

                <section>

                    <h2>Experience</h2>

                    {experience.map(exp => (

                        <div
                            className="item"
                            key={exp.id}
                        >

                            <div className="row">

                                <h3>{exp.job_title}</h3>

                                <span>

                                    {formatDate(exp.start_date)}
                                    {" - "}
                                    {exp.currently_working
                                        ? "Present"
                                        : formatDate(exp.end_date)}

                                </span>

                            </div>

                            <strong>
                                {exp.company_name}
                            </strong>

                            <ul>
                                {renderBullets(exp.description)}
                            </ul>

                        </div>

                    ))}

                </section>

            )}

            {education.length > 0 && (

                <section>

                    <h2>Education</h2>

                    {education.map(edu => (

                        <div
                            className="item"
                            key={edu.id}
                        >

                            <div className="row">

                                <h3>{edu.degree}</h3>

                                <span>

                                    {formatDate(edu.start_date)}
                                    {" - "}
                                    {edu.currently_studying
                                        ? "Present"
                                        : formatDate(edu.end_date)}

                                </span>

                            </div>

                            <strong>{edu.institution}</strong>

                            <p>{edu.field_of_study}</p>

                        </div>

                    ))}

                </section>

            )}

            {projects.length > 0 && (

                <section>

                    <h2>Projects</h2>

                    {projects.map(project => (

                        <div
                            className="item"
                            key={project.id}
                        >

                            <h3>{project.title}</h3>

                            <p>{project.description}</p>

                            <strong>
                                {project.technologies}
                            </strong>

                        </div>

                    ))}

                </section>

            )}

            {certifications.length > 0 && (

                <section>

                    <h2>Certifications</h2>

                    {certifications.map(cert => (

                        <div
                            className="item"
                            key={cert.id}
                        >

                            <h3>{cert.title}</h3>

                            <p>
                                {cert.issuing_organization}
                            </p>

                        </div>

                    ))}

                </section>

            )}

            {languages.length > 0 && (

                <section>

                    <h2>Languages</h2>

                    <div className="skills">

                        {languages.map(lang => (

                            <span
                                className="badge"
                                key={lang.id}
                            >
                                {lang.language} • {lang.proficiency}
                            </span>

                        ))}

                    </div>

                </section>

            )}

        </div>

    );

}

export default ResumeTemplateModern;









