


import { useEffect, useState } from "react";

import "./AchievementForm.css";

const defaultForm = {
    title: "",
    organization: "",
    achievement_date: "",
    description: "",
};

function AchievementForm({

    initialData,

    onSubmit,

    onCancel,

}) {

    const [formData, setFormData] =
        useState(defaultForm);

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

        } = event.target;

        setFormData(previous => ({

            ...previous,

            [name]: value,

        }));

    }

    function handleSubmit(event) {

        event.preventDefault();

        onSubmit(formData);

    }

    return (

        <form
            className="achievement-form"
            onSubmit={handleSubmit}
        >

            <h2>

                {

                    initialData

                        ? "Edit Achievement"

                        : "Add Achievement"

                }

            </h2>

            <input
                type="text"
                name="title"
                placeholder="Achievement Title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="organization"
                placeholder="Organization / Event"
                value={formData.organization}
                onChange={handleChange}
            />

            <label>

                Achievement Date

                <input
                    type="date"
                    name="achievement_date"
                    value={formData.achievement_date}
                    onChange={handleChange}
                />

            </label>

            <textarea
                rows="5"
                name="description"
                placeholder="Describe your achievement..."
                value={formData.description}
                onChange={handleChange}
            />

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

export default AchievementForm;

