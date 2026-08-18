


import { useEffect, useState } from "react";

import "./EducationForm.css";

const defaultForm = {

    degree: "",

    institution: "",

    field_of_study: "",

    start_date: "",

    end_date: "",

    grade: "",

    description: "",

    currently_studying: false,

};

function EducationForm({

    initialData,

    onSubmit,

    onCancel,

    saving = false,

}) {

    const [formData, setFormData] = useState(defaultForm);

    useEffect(() => {

        if (initialData) {

            setFormData({

                ...defaultForm,

                ...initialData,

            });

        } else {

            setFormData(defaultForm);

        }

    }, [initialData]);

    function handleChange(event) {

        const {

            name,

            value,

            type,

            checked,

        } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]:

                type === "checkbox"

                    ? checked

                    : value,

        }));

    }

    function handleSubmit(event) {

        event.preventDefault();

        onSubmit(formData);

    }

    return (

        <form
            className="education-form"
            onSubmit={handleSubmit}
        >

            <h2>

                {

                    initialData

                        ? "Edit Education"

                        : "Add Education"

                }

            </h2>

            <input
                type="text"
                name="degree"
                placeholder="Degree"
                value={formData.degree}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="institution"
                placeholder="Institution"
                value={formData.institution}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="field_of_study"
                placeholder="Field of Study"
                value={formData.field_of_study}
                onChange={handleChange}
            />

            <label>

                Start Date

                <input
                    type="date"
                    name="start_date"
                    value={formData.start_date || ""}
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
                    disabled={formData.currently_studying}
                    onChange={handleChange}
                />

            </label>

            <label className="checkbox-row">

                <input
                    type="checkbox"
                    name="currently_studying"
                    checked={formData.currently_studying}
                    onChange={handleChange}
                />

                Currently Studying

            </label>

            <input
                type="text"
                name="grade"
                placeholder="Grade / CGPA / Percentage"
                value={formData.grade}
                onChange={handleChange}
            />

            <textarea
                rows="5"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />

            <div className="form-buttons">

                <button
                    type="submit"
                    disabled={saving}
                >

                    {

                        saving

                            ? "Saving..."

                            : "Save"

                    }

                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={saving}
                >

                    Cancel

                </button>

            </div>

        </form>

    );

}

export default EducationForm;









