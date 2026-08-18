


import { useEffect, useState } from "react";

import "./CertificationForm.css";

const initialForm = {

    title: "",

    issuing_organization: "",

    issue_date: "",

    expiry_date: "",

    credential_id: "",

    credential_url: "",

    description: "",

};

function CertificationForm({

    initialData,

    onSubmit,

    onCancel,

}) {

    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {

        if (initialData) {

            setFormData({

                ...initialForm,

                ...initialData,

            });

        } else {

            setFormData(initialForm);

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

            className="certification-form"

            onSubmit={handleSubmit}

        >

            <h2>

                {

                    initialData

                        ? "Edit Certification"

                        : "Add Certification"

                }

            </h2>

            <input

                type="text"

                name="title"

                placeholder="Certification Title"

                value={formData.title}

                onChange={handleChange}

                required

            />

            <input

                type="text"

                name="issuing_organization"

                placeholder="Issuing Organization"

                value={formData.issuing_organization}

                onChange={handleChange}

                required

            />

            <label>

                Issue Date

                <input

                    type="date"

                    name="issue_date"

                    value={formData.issue_date}

                    onChange={handleChange}

                    required

                />

            </label>

            <label>

                Expiry Date

                <input

                    type="date"

                    name="expiry_date"

                    value={formData.expiry_date || ""}

                    onChange={handleChange}

                />

            </label>

            <input

                type="text"

                name="credential_id"

                placeholder="Credential ID"

                value={formData.credential_id}

                onChange={handleChange}

            />

            <input

                type="url"

                name="credential_url"

                placeholder="Credential URL"

                value={formData.credential_url}

                onChange={handleChange}

            />

            <textarea

                rows="5"

                name="description"

                placeholder="Describe what this certification validates..."

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

export default CertificationForm;
















