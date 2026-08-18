


import { useEffect, useState } from "react";

import { generateProject } from "../../services/aiResumeService";

import "./ProjectForm.css";

function ProjectForm({

    initialData,

    onSubmit,

    onCancel,

}) {

    const [formData, setFormData] = useState({

        title: "",

        role: "",

        organization: "",

        description: "",

        technologies: "",

        github_url: "",

        project_url: "",

        start_date: "",

        end_date: "",

        currently_working: false,

    });

    const [generating, setGenerating] = useState(false);

    useEffect(() => {

        if (initialData) {

            setFormData(previous => ({

                ...previous,

                ...initialData,

            }));

        }

    }, [initialData]);

    function handleChange(event) {

        const {

            name,

            value,

            type,

            checked,

        } = event.target;

        setFormData(previous => ({

            ...previous,

            [name]:

                type === "checkbox"

                    ? checked

                    : value,

        }));

    }

    async function handleGenerate() {

        if (

            !formData.title ||

            !formData.technologies

        ) {

            alert(

                "Please enter the project title and technologies."

            );

            return;

        }

        try {

            setGenerating(true);

            const response = await generateProject({

                name: formData.title,

                technologies: formData.technologies,

                purpose:

                    formData.role ||

                    "Portfolio Project",

            });

            setFormData(previous => ({

                ...previous,

                description: response.response,

            }));

        } catch (error) {

            console.error(error);

            alert(

                "Unable to generate project description."

            );

        } finally {

            setGenerating(false);

        }

    }

    function handleSubmit(event) {

        event.preventDefault();

        onSubmit(formData);

    }

    return (

        <form

            className="project-form"

            onSubmit={handleSubmit}

        >

            <h2>

                {

                    initialData

                        ? "Edit Project"

                        : "Add Project"

                }

            </h2>

            <input

                type="text"

                name="title"

                placeholder="Project Title"

                value={formData.title}

                onChange={handleChange}

                required

            />

            <input

                type="text"

                name="role"

                placeholder="Your Role"

                value={formData.role}

                onChange={handleChange}

            />

            <input

                type="text"

                name="organization"

                placeholder="Organization"

                value={formData.organization}

                onChange={handleChange}

            />

            <input

                type="text"

                name="technologies"

                placeholder="React, Django, MySQL..."

                value={formData.technologies}

                onChange={handleChange}

            />

            <input

                type="url"

                name="github_url"

                placeholder="GitHub URL"

                value={formData.github_url}

                onChange={handleChange}

            />

            <input

                type="url"

                name="project_url"

                placeholder="Live Demo URL"

                value={formData.project_url}

                onChange={handleChange}

            />

            <label>

                Start Date

                <input

                    type="date"

                    name="start_date"

                    value={formData.start_date || ""}

                    onChange={handleChange}

                />

            </label>

            <label>

                End Date

                <input

                    type="date"

                    name="end_date"

                    value={formData.end_date || ""}

                    disabled={formData.currently_working}

                    onChange={handleChange}

                />

            </label>

            <label className="checkbox-row">

                <input

                    type="checkbox"

                    name="currently_working"

                    checked={formData.currently_working}

                    onChange={handleChange}

                />

                Currently Working On This Project

            </label>

            <textarea

                rows="6"

                name="description"

                placeholder="Describe the project..."

                value={formData.description}

                onChange={handleChange}

                required

            />

            <button

                type="button"

                className="ai-improve-btn"

                onClick={handleGenerate}

                disabled={generating}

            >

                {

                    generating

                        ? "Generating..."

                        : "✨ Generate with AI"

                }

            </button>

            <div className="form-buttons">

                <button type="submit">

                    Save

                </button>

                <button

                    type="button"

                    onClick={onCancel}

                >

                    Cancel

                </button>

            </div>

        </form>

    );

}

export default ProjectForm;






