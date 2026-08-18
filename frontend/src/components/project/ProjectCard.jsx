


import "./ProjectCard.css";

import {
    FaGithub,
    FaExternalLinkAlt,
    FaEdit,
    FaTrash,
    FaCalendarAlt,
    FaLaptopCode,
    FaBuilding,
} from "react-icons/fa";

function ProjectCard({

    project,

    onEdit,

    onDelete,

}) {

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

    const technologies = project.technologies
        ? project.technologies
              .split(",")
              .map((tech) => tech.trim())
              .filter(Boolean)
        : [];

    return (

        <div className="project-card">

            <div className="project-header">

                <div className="project-icon">

                    <FaLaptopCode />

                </div>

                <div className="project-title">

                    <h3>{project.title}</h3>

                    {

                        project.role && (

                            <p>{project.role}</p>

                        )

                    }

                </div>

            </div>

            {

                project.organization && (

                    <div className="project-row">

                        <FaBuilding />

                        <span>

                            {project.organization}

                        </span>

                    </div>

                )

            }

            {

                (project.start_date ||
                    project.end_date ||
                    project.currently_working) && (

                    <div className="project-row">

                        <FaCalendarAlt />

                        <span>

                            {

                                formatDate(
                                    project.start_date
                                )

                            }

                            {" - "}

                            {

                                project.currently_working

                                    ? "Present"

                                    : formatDate(
                                          project.end_date
                                      )

                            }

                        </span>

                    </div>

                )

            }

            {

                technologies.length > 0 && (

                    <div className="tech-container">

                        {

                            technologies.map(

                                (tech, index) => (

                                    <span
                                        key={index}
                                        className="tech-badge"
                                    >

                                        {tech}

                                    </span>

                                )

                            )

                        }

                    </div>

                )

            }

            {

                project.description && (

                    <p className="project-description">

                        {project.description}

                    </p>

                )

            }

            {

                (project.github_url ||
                    project.project_url) && (

                    <div className="project-links">

                        {

                            project.github_url && (

                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noreferrer"
                                >

                                    <FaGithub />

                                    <span>

                                        GitHub

                                    </span>

                                </a>

                            )

                        }

                        {

                            project.project_url && (

                                <a
                                    href={project.project_url}
                                    target="_blank"
                                    rel="noreferrer"
                                >

                                    <FaExternalLinkAlt />

                                    <span>

                                        Live Demo

                                    </span>

                                </a>

                            )

                        }

                    </div>

                )

            }

            <div className="project-actions">

                <button
                    className="edit-btn"
                    type="button"
                    onClick={() => onEdit(project)}
                >

                    <FaEdit />

                    Edit

                </button>

                <button
                    className="delete-btn"
                    type="button"
                    onClick={() => onDelete(project.id)}
                >

                    <FaTrash />

                    Delete

                </button>

            </div>

        </div>

    );

}

export default ProjectCard;








