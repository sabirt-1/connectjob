


import { useEffect, useState } from "react";

import SkillManager from "./SkillManager";
import LanguageManager from "./LanguageManager";

import "./ProfileForm.css";

const defaultForm = {

    first_name: "",
    last_name: "",
    headline: "",
    bio: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",

    skills: [],

    languages: [],

};

function ProfileForm({

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

                skills:
                    initialData.skills || [],

                languages:
                    initialData.languages || [],

            });

        }

    }, [initialData]);

    function handleChange(event) {

        const { name, value } = event.target;

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
            className="profile-form"
            onSubmit={handleSubmit}
        >

            <h2>

                Personal Information

            </h2>

            <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
            />

            <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
            />

            <input
                type="text"
                name="headline"
                placeholder="Professional Headline"
                value={formData.headline}
                onChange={handleChange}
            />

            <textarea
                rows="5"
                name="bio"
                placeholder="Professional Summary"
                value={formData.bio}
                onChange={handleChange}
            />

            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
            />

            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
            />

            <input
                type="url"
                name="website"
                placeholder="Portfolio Website"
                value={formData.website}
                onChange={handleChange}
            />

            <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={formData.linkedin}
                onChange={handleChange}
            />

            <input
                type="url"
                name="github"
                placeholder="GitHub URL"
                value={formData.github}
                onChange={handleChange}
            />

            <SkillManager

                value={formData.skills}

                onChange={(skills) =>

                    setFormData(previous => ({

                        ...previous,

                        skills,

                    }))

                }

            />

            <LanguageManager

                value={formData.languages}

                onChange={(languages) =>

                    setFormData(previous => ({

                        ...previous,

                        languages,

                    }))

                }

            />

            <div className="form-buttons">

                <button type="submit">

                    Save Profile

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

export default ProfileForm;

