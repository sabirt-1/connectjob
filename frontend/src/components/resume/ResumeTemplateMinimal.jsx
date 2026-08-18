


import "./ResumeTemplateMinimal.css";
import Loader from "../common/Loader";

function ResumeTemplateMinimal({ resume }) {

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

        <div className="minimal-resume">

            <header className="minimal-header">

                <h1>
                    {personal.fullName}
                </h1>

                {personal.headline && (
                    <p className="minimal-headline">
                        {personal.headline}
                    </p>
                )}

                <div className="minimal-contact">

                    {personal.email &&
                        <span>{personal.email}</span>
                    }

                    {personal.phone &&
                        <span>{personal.phone}</span>
                    }

                    {personal.location &&
                        <span>{personal.location}</span>
                    }

                </div>

            </header>

            {personal.bio && (

                <section>

                    <h2>Profile</h2>

                    <p>
                        {personal.bio}
                    </p>

                </section>

            )}

            {personal.skills && (

                <section>

                    <h2>Skills</h2>

                    <div className="minimal-skills">

                        {(personal.skills || "")
                            .split(",")
                            .filter(skill => skill.trim())
                            .map((skill, index) => (

                                <span
                                    key={index}
                                    className="skill-pill"
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

                    {experience.map(item => (

                        <div
                            key={item.id}
                            className="minimal-item"
                        >

                            <div className="minimal-title-row">

                                <div>

                                    <h3>
                                        {item.job_title}
                                    </h3>

                                    <h4>
                                        {item.company_name}
                                    </h4>

                                </div>

                                <span>

                                    {formatDate(
                                        item.start_date
                                    )}

                                    {" — "}

                                    {item.currently_working
                                        ? "Present"
                                        : formatDate(
                                              item.end_date
                                          )}

                                </span>

                            </div>

                            {item.description && (

                                <p>

                                    {item.description}

                                </p>

                            )}

                        </div>

                    ))}

                </section>

            )}

            {projects.length > 0 && (

                <section>

                    <h2>Projects</h2>

                    {projects.map(project => (

                        <div
                            key={project.id}
                            className="minimal-item"
                        >

                            <h3>
                                {project.title}
                            </h3>

                            {project.role && (

                                <h4>
                                    {project.role}
                                </h4>

                            )}

                            {project.description && (

                                <p>
                                    {project.description}
                                </p>

                            )}

                            {project.technologies && (

                                <p>

                                    <strong>

                                        Tech:

                                    </strong>

                                    {" "}

                                    {project.technologies}

                                </p>

                            )}

                        </div>

                    ))}

                </section>

            )}

            {education.length > 0 && (

                <section>

                    <h2>Education</h2>

                    {education.map(item => (

                        <div
                            key={item.id}
                            className="minimal-item"
                        >

                            <div className="minimal-title-row">

                                <div>

                                    <h3>

                                        {item.degree}

                                    </h3>

                                    <h4>

                                        {item.institution}

                                    </h4>

                                </div>

                                <span>

                                    {formatDate(
                                        item.start_date
                                    )}

                                    {" — "}

                                    {item.currently_studying
                                        ? "Present"
                                        : formatDate(
                                              item.end_date
                                          )}

                                </span>

                            </div>

                            {item.field_of_study && (

                                <p>

                                    {item.field_of_study}

                                </p>

                            )}

                        </div>

                    ))}

                </section>

            )}

            {certifications.length > 0 && (

                <section>

                    <h2>Certifications</h2>

                    {certifications.map(item => (

                        <div
                            key={item.id}
                            className="minimal-item"
                        >

                            <h3>

                                {item.title}

                            </h3>

                            <p>

                                {item.issuing_organization}

                            </p>

                        </div>

                    ))}

                </section>

            )}

            {languages.length > 0 && (

                <section>

                    <h2>Languages</h2>

                    <div className="minimal-languages">

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

export default ResumeTemplateMinimal;

