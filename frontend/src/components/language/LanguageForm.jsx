


import { useEffect, useState } from "react";

import "./LanguageForm.css";

function LanguageForm({

    initialData,

    onSubmit,

    onCancel,

}) {

    const [formData, setFormData] = useState({

        language: "",

        proficiency: "Beginner",

    });

    useEffect(() => {

        if (initialData) {

            setFormData({

                ...formData,

                ...initialData,

            });

        }

    }, [initialData]);

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value,

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit(formData);

    }

    return (

        <form
            className="language-form"
            onSubmit={handleSubmit}
        >

            <h2>

                {

                    initialData

                        ? "Edit Language"

                        : "Add Language"

                }

            </h2>

            <input

                type="text"

                name="language"

                placeholder="Language"

                value={formData.language}

                onChange={handleChange}

                required

            />

            <select

                name="proficiency"

                value={formData.proficiency}

                onChange={handleChange}

            >

                <option value="Beginner">

                    Beginner

                </option>

                <option value="Intermediate">

                    Intermediate

                </option>

                <option value="Professional">

                    Professional

                </option>

                <option value="Native">

                    Native

                </option>

            </select>

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

export default LanguageForm;

