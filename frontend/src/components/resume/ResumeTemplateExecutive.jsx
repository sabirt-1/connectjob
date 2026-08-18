


import "./ResumeTemplateExecutive.css";
import Loader from "../common/Loader";

function ResumeTemplateExecutive({ resume }) {

    if (!resume) {
        return <Loader text="Preparing Executive Resume..." />;
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

        <div className="executive-resume">

            <header className="executive-header">

                <h1>
                    {personal.fullName}
                </h1>

                {personal.headline && (

                    <h2>
                        {personal.headline}
                    </h2>

                )}

                <div className="executive-contact">

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

            <div className="executive-body">

                <aside className="executive-sidebar">

                    {personal.skills && (

                        <section>

                            <h3>Skills</h3>

                            <ul>

                                {personal.skills
                                    .split(",")
                                    .filter(skill => skill.trim())
                                    .map((skill, index) => (

                                        <li key={index}>
                                            {skill.trim()}
                                        </li>

                                    ))}

                            </ul>

                        </section>

                    )}

                    {languages.length > 0 && (

                        <section>

                            <h3>Languages</h3>

                            {languages.map(item => (

                                <p key={item.id}>

                                    {item.language}

                                    {" • "}

                                    {item.proficiency}

                                </p>

                            ))}

                        </section>

                    )}

                    {certifications.length > 0 && (

                        <section>

                            <h3>Certifications</h3>

                            {certifications.map(item => (

                                <div
                                    key={item.id}
                                    className="executive-cert"
                                >

                                    <strong>
                                        {item.title}
                                    </strong>

                                    <span>
                                        {item.issuing_organization}
                                    </span>

                                </div>

                            ))}

                        </section>

                    )}

                </aside>

                <main className="executive-main">

                    {personal.bio && (

                        <section>

                            <h3>
                                Executive Summary
                            </h3>

                            <p>
                                {personal.bio}
                            </p>

                        </section>

                    )}

                    {experience.length > 0 && (

                        <section>

                            <h3>
                                Professional Experience
                            </h3>

                            {experience.map(item => (

                                <div
                                    key={item.id}
                                    className="executive-item"
                                >

                                    <div className="executive-row">

                                        <div>

                                            <h4>

                                                {item.job_title}

                                            </h4>

                                            <h5>

                                                {item.company_name}

                                            </h5>

                                        </div>

                                        <span>

                                            {formatDate(
                                                item.start_date
                                            )}

                                            {" - "}

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

                            <h3>Projects</h3>

                            {projects.map(project => (

                                <div
                                    key={project.id}
                                    className="executive-item"
                                >

                                    <h4>
                                        {project.title}
                                    </h4>

                                    {project.description && (

                                        <p>
                                            {project.description}
                                        </p>

                                    )}

                                </div>

                            ))}

                        </section>

                    )}

                    {education.length > 0 && (

                        <section>

                            <h3>Education</h3>

                            {education.map(item => (

                                <div
                                    key={item.id}
                                    className="executive-item"
                                >

                                    <div className="executive-row">

                                        <div>

                                            <h4>
                                                {item.degree}
                                            </h4>

                                            <h5>
                                                {item.institution}
                                            </h5>

                                        </div>

                                        <span>

                                            {formatDate(
                                                item.start_date
                                            )}

                                            {" - "}

                                            {item.currently_studying
                                                ? "Present"
                                                : formatDate(
                                                      item.end_date
                                                  )}

                                        </span>

                                    </div>

                                </div>

                            ))}

                        </section>

                    )}

                </main>

            </div>

        </div>

    );

}

export default ResumeTemplateExecutive;

