


import "./ResumeTemplateATS.css";
import Loader from "../common/Loader";

function ResumeTemplateATS({ resume }) {

    if (!resume) {
        return <Loader text="Preparing ATS Resume..." />;
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

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                year: "numeric",
            }
        );

    }

    function renderBullets(text) {

        if (!text) return null;

        return text
            .split("\n")
            .filter(line => line.trim() !== "")
            .map((line, index) => (
                <li key={index}>{line}</li>
            ));

    }

    return (

        <div className="ats-resume">

            <header className="resume-header">

                <h1>{personal.fullName}</h1>

                <p>

                    {personal.email}

                    {personal.phone && ` | ${personal.phone}`}

                    {personal.location && ` | ${personal.location}`}

                </p>

                <div className="resume-links">

                    {personal.linkedin && (
                        <span>{personal.linkedin}</span>
                    )}

                    {personal.github && (
                        <span>{personal.github}</span>
                    )}

                    {personal.portfolio && (
                        <span>{personal.portfolio}</span>
                    )}

                </div>

            </header>

            {
                personal.bio &&
                <section>

                    <h2>Professional Summary</h2>

                    <p>{personal.bio}</p>

                </section>
            }

            {
                personal.skills &&
                <section>

                    <h2>Skills</h2>

                    <div className="skill-list">

                        {

                            personal.skills
                                .split(",")
                                .map((skill, index) => (

                                    <span
                                        key={index}
                                        className="skill-badge"
                                    >

                                        {skill.trim()}

                                    </span>

                                ))

                        }

                    </div>

                </section>
            }

            {
                experience.length > 0 &&
                <section>

                    <h2>Experience</h2>

                    {

                        experience.map(exp => (

                            <div
                                className="resume-item"
                                key={exp.id}
                            >

                                <div className="resume-title-row">

                                    <h3>

                                        {exp.job_title}

                                    </h3>

                                    <span>

                                        {

                                            formatDate(exp.start_date)

                                        }

                                        {" - "}

                                        {

                                            exp.currently_working

                                            ? "Present"

                                            : formatDate(exp.end_date)

                                        }

                                    </span>

                                </div>

                                <h4>

                                    {exp.company_name}

                                </h4>

                                {

                                    exp.location &&

                                    <p className="resume-location">

                                        {exp.location}

                                    </p>

                                }

                                {

                                    exp.description &&

                                    <ul>

                                        {

                                            renderBullets(

                                                exp.description

                                            )

                                        }

                                    </ul>

                                }

                            </div>

                        ))

                    }

                </section>
            }

            {
                education.length > 0 &&
                <section>

                    <h2>Education</h2>

                    {

                        education.map(edu => (

                            <div
                                key={edu.id}
                                className="resume-item"
                            >

                                <div className="resume-title-row">

                                    <h3>

                                        {edu.degree}

                                    </h3>

                                    <span>

                                        {

                                            formatDate(

                                                edu.start_date

                                            )

                                        }

                                        {" - "}

                                        {

                                            edu.currently_studying

                                            ? "Present"

                                            : formatDate(

                                                edu.end_date

                                            )

                                        }

                                    </span>

                                </div>

                                <h4>

                                    {edu.institution}

                                </h4>

                                {

                                    edu.field_of_study &&

                                    <p>

                                        {edu.field_of_study}

                                    </p>

                                }

                                {

                                    edu.grade &&

                                    <p>

                                        Grade: {edu.grade}

                                    </p>

                                }

                            </div>

                        ))

                    }

                </section>
            }

            {
                projects.length > 0 &&
                <section>

                    <h2>Projects</h2>

                    {

                        projects.map(project => (

                            <div
                                key={project.id}
                                className="resume-item"
                            >

                                <h3>

                                    {project.title}

                                </h3>

                                {

                                    project.role &&

                                    <h4>

                                        {project.role}

                                    </h4>

                                }

                                {

                                    project.technologies &&

                                    <p>

                                        <strong>

                                            Technologies:

                                        </strong>

                                        {" "}

                                        {

                                            project.technologies

                                        }

                                    </p>

                                }

                                {

                                    project.description &&

                                    <ul>

                                        {

                                            renderBullets(

                                                project.description

                                            )

                                        }

                                    </ul>

                                }

                            </div>

                        ))

                    }

                </section>
            }

            {
                certifications.length > 0 &&
                <section>

                    <h2>Certifications</h2>

                    {

                        certifications.map(cert => (

                            <div
                                key={cert.id}
                                className="resume-item"
                            >

                                <h3>

                                    {cert.title}

                                </h3>

                                <h4>

                                    {

                                        cert.issuing_organization

                                    }

                                </h4>

                                <p>

                                    Issued

                                    {" "}

                                    {

                                        formatDate(

                                            cert.issue_date

                                        )

                                    }

                                </p>

                            </div>

                        ))

                    }

                </section>
            }

            {
                languages.length > 0 &&
                <section>

                    <h2>Languages</h2>

                    <div className="language-list">

                        {

                            languages.map(language => (

                                <span
                                    key={language.id}
                                >

                                    {

                                        language.language

                                    }

                                    {" — "}

                                    {

                                        language.proficiency

                                    }

                                </span>

                            ))

                        }

                    </div>

                </section>
            }

        </div>

    );

}

export default ResumeTemplateATS;




