


import { useEffect, useState } from "react";

import { improveExperience } from "../../services/aiResumeService";

import "./ExperienceForm.css";

function ExperienceForm({

    initialData,

    onSubmit,

    onCancel,

}) {

    const [formData, setFormData] = useState({

        job_title: "",

        company_name: "",

        location: "",

        employment_type: "Full-time",

        start_date: "",

        end_date: "",

        currently_working: false,

        description: "",

    });

    const [improving, setImproving] = useState(false);

    useEffect(() => {

        if (initialData) {

            setFormData(initialData);

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

    async function handleImprove() {

        if (!formData.description.trim()) {

            alert(
                "Please enter your experience description first."
            );

            return;

        }

        try {

            setImproving(true);

            const response = await improveExperience({

                description: formData.description,

            });

            setFormData(previous => ({

                ...previous,

                description: response.response,

            }));

        } catch (error) {

            console.error(error);

            alert(
                "Unable to improve experience."
            );

        } finally {

            setImproving(false);

        }

    }

    function handleSubmit(event) {

        event.preventDefault();

        onSubmit(formData);

    }

    return (

        <form
            className="experience-form"
            onSubmit={handleSubmit}
        >

            <h2>

                {

                    initialData

                        ? "Edit Experience"

                        : "Add Experience"

                }

            </h2>

            <input
                type="text"
                name="job_title"
                placeholder="Job Title"
                value={formData.job_title}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="company_name"
                placeholder="Company Name"
                value={formData.company_name}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
            />

            <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
            >

                <option>Full-time</option>

                <option>Part-time</option>

                <option>Internship</option>

                <option>Contract</option>

                <option>Freelance</option>

                <option>Remote</option>

            </select>

            <label>

                Start Date

                <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
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

                Currently Working Here

            </label>

            <textarea
                name="description"
                rows="6"
                placeholder="Describe your work..."
                value={formData.description}
                onChange={handleChange}
            />

            <button
                type="button"
                className="ai-improve-btn"
                onClick={handleImprove}
                disabled={improving}
            >

                {

                    improving

                        ? "Improving..."

                        : "✨ Improve with AI"

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

export default ExperienceForm;








