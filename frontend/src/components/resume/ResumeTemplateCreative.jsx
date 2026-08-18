


import "./ResumeTemplateCreative.css";
import Loader from "../common/Loader";

function ResumeTemplateCreative({ resume }) {

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

        <div className="creative-resume">

            <aside className="creative-sidebar">

                <div className="creative-profile">

                    <h1>
                        {personal.fullName}
                    </h1>

                    {personal.headline && (
                        <p>{personal.headline}</p>
                    )}

                </div>

                <div className="creative-section">

                    <h3>Contact</h3>

                    {personal.email && (
                        <p>{personal.email}</p>
                    )}

                    {personal.phone && (
                        <p>{personal.phone}</p>
                    )}

                    {personal.location && (
                        <p>{personal.location}</p>
                    )}

                </div>

                {personal.skills && (

                    <div className="creative-section">

                        <h3>Skills</h3>

                        <div className="creative-tags">

                            {(personal.skills || "")
                                .split(",")
                                .filter(skill => skill.trim())
                                .map((skill, index) => (

                                    <span key={index}>

                                        {skill.trim()}

                                    </span>

                                ))}

                        </div>

                    </div>

                )}

                {languages.length > 0 && (

                    <div className="creative-section">

                        <h3>Languages</h3>

                        {languages.map(language => (

                            <p key={language.id}>

                                {language.language}

                                {" • "}

                                {language.proficiency}

                            </p>

                        ))}

                    </div>

                )}

            </aside>

            <main className="creative-main">

                {personal.bio && (

                    <section>

                        <h2>Profile</h2>

                        <p>{personal.bio}</p>

                    </section>

                )}

                {experience.length > 0 && (

                    <section>

                        <h2>Experience</h2>

                        {experience.map(item => (

                            <div
                                key={item.id}
                                className="creative-item"
                            >

                                <div className="creative-title">

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
                                className="creative-item"
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

                                    <small>

                                        Technologies:

                                        {" "}

                                        {project.technologies}

                                    </small>

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
                                className="creative-item"
                            >

                                <div className="creative-title">

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
                                className="creative-item"
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

            </main>

        </div>

    );

}

export default ResumeTemplateCreative;

