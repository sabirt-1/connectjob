


import { useState, useEffect } from "react";

import "./CompanyForm.css";

function CompanyForm({

    // initialData = {},
    initialData = null,

    submitText = "Create Company",

    onSubmit,

}) {

   

    const [formData, setFormData] = useState({

        company_name: initialData?.company_name || "",

        website: initialData?.website || "",

        description: initialData?.description || "",

        industry: initialData?.industry || "",

        company_size: initialData?.company_size || "",

        location: initialData?.location || "",

        hr_name: initialData?.hr_name || "",

        contact_email: initialData?.contact_email || "",

        contact_phone: initialData?.contact_phone || "",

        logo: initialData?.logo || null,

    });

    const [preview, setPreview] = useState(
        initialData?.logo || null
    );


    useEffect(() => {

        if (!initialData || Object.keys(initialData).length === 0) {

            return;

        }

        setFormData({

            company_name: initialData.company_name || "",

            website: initialData.website || "",

            description: initialData.description || "",

            industry: initialData.industry || "",

            company_size: initialData.company_size || "",

            location: initialData.location || "",

            hr_name: initialData.hr_name || "",

            contact_email: initialData.contact_email || "",

            contact_phone: initialData.contact_phone || "",

            logo: initialData.logo || null,

        });

        setPreview(initialData.logo || null);

    }, [initialData]);

    function handleChange(e) {

        const {

            name,

            value,

        } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));

    }

    function handleLogoChange(e) {

        const file = e.target.files[0];

        if (!file) return;

        setFormData((prev) => ({

            ...prev,

            logo: file,

        }));

        setPreview(

            URL.createObjectURL(file)

        );

    }

    async function handleSubmit(e) {

        e.preventDefault();

        await onSubmit(formData);

    }

    return (

        <div className="company-form-container">

            <div className="company-form-card">

                <h1>

                    {submitText}

                </h1>

                <form onSubmit={handleSubmit}>

                    <div className="logo-upload">

                        <label>

                            Company Logo

                        </label>

                        <div className="logo-preview">

                            {preview ? (

                                <img

                                    src={preview}

                                    alt="Company Logo"

                                />

                            ) : (

                                <span>

                                    No Logo

                                </span>

                            )}

                        </div>

                        <input

                            type="file"

                            accept="image/*"

                            onChange={handleLogoChange}

                        />

                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>

                                Company Name

                            </label>

                            <input

                                type="text"

                                name="company_name"

                                value={formData.company_name}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Industry

                            </label>

                            <input

                                type="text"

                                name="industry"

                                value={formData.industry}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Company Size

                            </label>

                            <input

                                type="text"

                                name="company_size"

                                value={formData.company_size}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Website

                            </label>

                            <input

                                type="text"

                                name="website"

                                value={formData.website}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Location

                            </label>

                            <input

                                type="text"

                                name="location"

                                value={formData.location}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                HR Name

                            </label>

                            <input

                                type="text"

                                name="hr_name"

                                value={formData.hr_name}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                HR Email

                            </label>

                            <input

                                type="email"

                                name="contact_email"

                                value={formData.contact_email}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Contact Number

                            </label>

                            <input

                                type="text"

                                name="contact_phone"

                                value={formData.contact_phone}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                    <div className="form-group full-width">

                        <label>

                            Company Description

                        </label>

                        <textarea

                            rows="6"

                            name="description"

                            value={formData.description}

                            onChange={handleChange}

                        />

                    </div>

                    <button

                        className="company-submit-btn"

                        type="submit"

                    >

                        {submitText}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default CompanyForm;

