


import { useEffect, useState } from "react";

import {
    getEmployerProfile,
    updateEmployerProfile
} from "../../services/employerProfileService";

import { toast } from "react-toastify";

import Loader from "../../components/common/Loader";
import DashboardShell from "../../components/dashboard/DashboardShell";

import "./EmployerProfilePage.css";


function getProfileImageUrl(image) {

    if (!image) {
        return "";
    }

    if (image.startsWith("http")) {
        return image;
    }

    return `http://127.0.0.1:8000${image}`;
}


function EmployerProfilePage() {

    const [loading, setLoading] = useState(true);

    const [editing, setEditing] = useState(false);

    const [saving, setSaving] = useState(false);


    const [profile, setProfile] = useState(null);


    const [fullName, setFullName] = useState("");

    const [designation, setDesignation] = useState("");

    const [companyName, setCompanyName] = useState("");

    const [phone, setPhone] = useState("");

    const [location, setLocation] = useState("");

    const [website, setWebsite] = useState("");

    const [about, setAbout] = useState("");


    const [profileImage, setProfileImage] = useState(null);

    const [imagePreview, setImagePreview] = useState("");


    useEffect(() => {

        loadProfile();

    }, []);


    async function loadProfile() {

        try {

            setLoading(true);

            const data = await getEmployerProfile();

            setProfile(data);

            populateForm(data);

        }

        catch (error) {

            console.log(
                "EMPLOYER PROFILE LOAD ERROR:",
                error
            );

            toast.error(
                "Unable to load profile."
            );

        }

        finally {

            setLoading(false);

        }

    }


    function populateForm(data) {

        setFullName(
            data?.full_name || ""
        );

        setDesignation(
            data?.designation || ""
        );

        setCompanyName(
            data?.company_name || ""
        );

        setPhone(
            data?.phone || ""
        );

        setLocation(
            data?.location || ""
        );

        setWebsite(
            data?.website || ""
        );

        setAbout(
            data?.about || ""
        );


        setProfileImage(null);


        setImagePreview(
            data?.profile_image
                ? getProfileImageUrl(
                    data.profile_image
                )
                : ""
        );

    }


    function handleEdit() {

        if (!profile) {
            return;
        }

        populateForm(profile);

        setEditing(true);

    }


    function handleCancel() {

        if (profile) {

            populateForm(profile);

        }

        setEditing(false);

    }


    function handleImageChange(event) {

        const file =
            event.target.files?.[0];


        if (!file) {
            return;
        }


        if (!file.type.startsWith("image/")) {

            toast.error(
                "Please select a valid image."
            );

            return;

        }


        setProfileImage(file);


        const preview =
            URL.createObjectURL(file);


        setImagePreview(preview);

    }


    async function handleSubmit(event) {

        event.preventDefault();


        if (!fullName.trim()) {

            toast.error(
                "Full name is required."
            );

            return;

        }


        if (!companyName.trim()) {

            toast.error(
                "Company name is required."
            );

            return;

        }


        if (
            phone &&
            !/^\d{10}$/.test(phone)
        ) {

            toast.error(
                "Please enter a valid 10-digit phone number."
            );

            return;

        }


        if (
            website &&
            !website.startsWith("https://")
        ) {

            toast.error(
                "Website should begin with https://"
            );

            return;

        }


        setSaving(true);


        try {

            const formData =
                new FormData();


            formData.append(
                "full_name",
                fullName.trim()
            );


            formData.append(
                "designation",
                designation.trim()
            );


            formData.append(
                "company_name",
                companyName.trim()
            );


            formData.append(
                "phone",
                phone.trim()
            );


            formData.append(
                "location",
                location.trim()
            );


            formData.append(
                "website",
                website.trim()
            );


            formData.append(
                "about",
                about.trim()
            );


            if (profileImage) {

                formData.append(
                    "profile_image",
                    profileImage
                );

            }


            await updateEmployerProfile(
                formData
            );


            toast.success(
                "Profile updated successfully!"
            );


            await loadProfile();


            setEditing(false);

        }

        catch (error) {

            console.log(
                "EMPLOYER PROFILE UPDATE ERROR:",
                error
            );

            toast.error(
                error.response?.data?.error ||
                "Unable to update profile."
            );

        }

        finally {

            setSaving(false);

        }

    }


    if (loading) {

        return (
            <Loader
                text="Loading Profile..."
            />
        );

    }


    if (!profile) {

        return (

            <div className="profile-page">

                <div className="profile-error">

                    Unable to load employer profile.

                </div>

            </div>

        );

    }


    /*
     * READ-ONLY PROFILE VIEW
     */

    if (!editing) {

        const imageUrl =
            getProfileImageUrl(
                profile.profile_image
            );


        const initial =
            (
                profile.full_name ||
                profile.company_name ||
                "E"
            )
                .charAt(0)
                .toUpperCase();


        return (

            <DashboardShell
                title="Employer Profile"
                subtitle="Manage your professional information"
            >

                <div className="profile-page">

                    <div className="employer-profile-card">


                        {/* PROFILE HEADER */}

                        <div className="employer-profile-header">


                            <div className="employer-profile-avatar">

                                {imageUrl ? (

                                    <img
                                        src={imageUrl}
                                        alt={
                                            profile.full_name ||
                                            "Employer profile"
                                        }
                                    />

                                ) : (

                                    <span>
                                        {initial}
                                    </span>

                                )}

                            </div>


                            <div className="employer-profile-header-info">

                                <h1>

                                    {
                                        profile.full_name ||
                                        profile.company_name ||
                                        "Employer"
                                    }

                                </h1>


                                <p className="employer-designation">

                                    {
                                        profile.designation ||
                                        "Employer"
                                    }

                                </p>


                                {profile.company_name && (

                                    <p className="employer-company">

                                        <span className="profile-icon">
                                            🏢
                                        </span>

                                        {profile.company_name}

                                    </p>

                                )}


                                {profile.location && (

                                    <p className="employer-location">

                                        <span className="profile-icon">
                                            📍
                                        </span>

                                        {profile.location}

                                    </p>

                                )}

                            </div>


                            <button
                                type="button"
                                className="edit-profile-btn"
                                onClick={handleEdit}
                            >

                                ✎ Edit Profile

                            </button>


                        </div>


                        {/* QUICK INFO */}

                        <div className="employer-quick-info">


                            {profile.company_name && (

                                <div className="quick-info-item">

                                    <span className="quick-info-label">
                                        Company
                                    </span>

                                    <strong>
                                        {profile.company_name}
                                    </strong>

                                </div>

                            )}


                            {profile.designation && (

                                <div className="quick-info-item">

                                    <span className="quick-info-label">
                                        Designation
                                    </span>

                                    <strong>
                                        {profile.designation}
                                    </strong>

                                </div>

                            )}


                            {profile.location && (

                                <div className="quick-info-item">

                                    <span className="quick-info-label">
                                        Location
                                    </span>

                                    <strong>
                                        {profile.location}
                                    </strong>

                                </div>

                            )}


                            {profile.phone && (

                                <div className="quick-info-item">

                                    <span className="quick-info-label">
                                        Phone
                                    </span>

                                    <strong>
                                        {profile.phone}
                                    </strong>

                                </div>

                            )}

                        </div>


                        {/* ABOUT */}

                        <section className="employer-profile-section">

                            <h2>
                                About
                            </h2>


                            {profile.about ? (

                                <p className="about-text">
                                    {profile.about}
                                </p>

                            ) : (

                                <p className="empty-profile-text">
                                    No company information has been added yet.
                                </p>

                            )}

                        </section>


                        {/* CONTACT */}

                        <section className="employer-profile-section">

                            <h2>
                                Contact & Links
                            </h2>


                            <div className="profile-contact-grid">


                                {profile.phone && (

                                    <div className="contact-item">

                                        <span className="contact-icon">
                                            ☎
                                        </span>

                                        <div>

                                            <span>
                                                Phone
                                            </span>

                                            <strong>
                                                {profile.phone}
                                            </strong>

                                        </div>

                                    </div>

                                )}


                                {profile.location && (

                                    <div className="contact-item">

                                        <span className="contact-icon">
                                            📍
                                        </span>

                                        <div>

                                            <span>
                                                Location
                                            </span>

                                            <strong>
                                                {profile.location}
                                            </strong>

                                        </div>

                                    </div>

                                )}


                                {profile.website && (

                                    <div className="contact-item">

                                        <span className="contact-icon">
                                            🌐
                                        </span>

                                        <div>

                                            <span>
                                                Website
                                            </span>

                                            <a
                                                href={profile.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Visit Website
                                            </a>

                                        </div>

                                    </div>

                                )}

                            </div>


                            {!profile.phone &&
                                !profile.location &&
                                !profile.website && (

                                    <p className="empty-profile-text">
                                        No contact information has been added yet.
                                    </p>

                                )}

                        </section>


                        {/* PROFILE COMPLETION */}

                        <section className="profile-completion-section">

                            <div className="completion-header">

                                <div>

                                    <h2>
                                        Profile
                                    </h2>

                                    <p>
                                        Keep your employer profile complete and professional.
                                    </p>

                                </div>

                                <span>
                                    {calculateProfileCompletion(profile)}%
                                </span>

                            </div>


                            <div className="completion-bar">

                                <div
                                    className="completion-progress"
                                    style={{
                                        width:
                                            `${calculateProfileCompletion(profile)}%`
                                    }}
                                />

                            </div>

                        </section>

                    </div>

                </div>
                
            </DashboardShell>
            
        );

    }


    /*
     * EDIT PROFILE VIEW
     */

    return (

        <div className="profile-page">

            <div className="employer-profile-card edit-mode">


                <div className="edit-profile-header">

                    <div>

                        <h1>
                            Edit Employer Profile
                        </h1>

                        <p>
                            Keep your professional information up to date.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="cancel-edit-btn"
                        onClick={handleCancel}
                        disabled={saving}
                    >

                        Cancel

                    </button>

                </div>


                <form
                    className="profile-form"
                    onSubmit={handleSubmit}
                >


                    {/* IMAGE */}

                    <div className="edit-image-section">

                        <div className="edit-avatar">

                            {imagePreview ? (

                                <img
                                    src={imagePreview}
                                    alt="Profile preview"
                                />

                            ) : (

                                <span>

                                    {(
                                        fullName ||
                                        companyName ||
                                        "E"
                                    )
                                        .charAt(0)
                                        .toUpperCase()}

                                </span>

                            )}

                        </div>


                        <div className="image-upload-content">

                            <h3>
                                Profile Photo
                            </h3>

                            <p>
                                Use a professional photo. JPG, PNG or WEBP recommended.
                            </p>


                            <label
                                className="image-upload-btn"
                            >

                                Choose Photo

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />

                            </label>

                        </div>

                    </div>


                    {/* FORM */}

                    <div className="form-grid">


                        <div className="form-field">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your full name"
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Designation
                            </label>

                            <input
                                type="text"
                                value={designation}
                                onChange={(e) =>
                                    setDesignation(
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. HR Manager"
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Company Name
                            </label>

                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) =>
                                    setCompanyName(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter company name"
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                value={phone}
                                onChange={(e) =>
                                    setPhone(
                                        e.target.value
                                    )
                                }
                                placeholder="10-digit phone number"
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                value={location}
                                onChange={(e) =>
                                    setLocation(
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. Mumbai, Maharashtra"
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Website
                            </label>

                            <input
                                type="url"
                                value={website}
                                onChange={(e) =>
                                    setWebsite(
                                        e.target.value
                                    )
                                }
                                placeholder="https://example.com"
                            />

                        </div>

                    </div>


                    <div className="form-field">

                        <label>
                            About Company
                        </label>

                        <textarea
                            rows={7}
                            value={about}
                            onChange={(e) =>
                                setAbout(
                                    e.target.value
                                )
                            }
                            placeholder="Tell candidates about your company..."
                        />

                    </div>


                    {/* ACTIONS */}

                    <div className="edit-actions">

                        <button
                            type="button"
                            className="cancel-edit-btn bottom-cancel"
                            onClick={handleCancel}
                            disabled={saving}
                        >

                            Cancel

                        </button>


                        <button
                            type="submit"
                            className="emp-save-btn"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : "Save Changes"}

                        </button>

                    </div>


                </form>

            </div>

        </div>

    );

}


/*
 * PROFILE COMPLETION
 *
 * This is only frontend UI.
 * It does not change the backend.
 */

function calculateProfileCompletion(profile) {

    if (!profile) {
        return 0;
    }


    const fields = [

        profile.full_name,

        profile.designation,

        profile.company_name,

        profile.phone,

        profile.location,

        profile.website,

        profile.about,

        profile.profile_image

    ];


    const completed =
        fields.filter(
            field =>
                field !== null &&
                field !== undefined &&
                String(field).trim() !== ""
        ).length;


    return Math.round(
        (completed / fields.length) * 100
    );

}


export default EmployerProfilePage;




