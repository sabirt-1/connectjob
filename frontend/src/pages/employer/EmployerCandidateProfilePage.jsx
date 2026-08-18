


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardShell
    from "../../components/dashboard/DashboardShell";

import Loader
    from "../../components/common/Loader";

import {
    getEmployerCandidateProfile
} from "../../services/profileService";

import "./EmployerCandidateProfilePage.css";


function EmployerCandidateProfilePage() {

    const { candidateId } = useParams();

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        loadProfile();

    }, [candidateId]);


    async function loadProfile() {

        try {

            setLoading(true);

            const data =
                await getEmployerCandidateProfile(
                    candidateId
                );

            setProfile(data);

        }

        catch (error) {

            console.log(error);

            setError(
                error.response?.data?.error ||
                "Failed to load candidate profile."
            );

        }

        finally {

            setLoading(false);

        }

    }


    if (loading) {

        return (
            <Loader
                text="Loading Candidate Profile..."
            />
        );

    }


    if (error) {

        return (

            <DashboardShell
                title="Candidate Profile"
                subtitle="Candidate information"
            >

                <div className="candidate-profile-error">

                    {error}

                </div>

            </DashboardShell>

        );

    }


    if (!profile) {

        return null;

    }


    const profileImage =
        profile.profile_image
            ? profile.profile_image.startsWith("http")
                ? profile.profile_image
                : `http://127.0.0.1:8000${profile.profile_image}`
            : null;


    return (

        <DashboardShell

            title="Candidate Profile"

            subtitle="Candidate information"

        >

            <div className="employer-candidate-profile">

                {/* HEADER */}

                <div className="candidate-profile-header">

                    <div className="candidate-profile-avatar">

                        {profileImage ? (

                            <img
                                src={profileImage}
                                alt={profile.full_name}
                            />

                        ) : (

                            <div className="candidate-avatar-placeholder">

                                {(
                                    profile.full_name ||
                                    profile.username ||
                                    "C"
                                )
                                    .charAt(0)
                                    .toUpperCase()}

                            </div>

                        )}

                    </div>


                    <div className="candidate-profile-info">

                        <h2>

                            {
                                profile.full_name ||
                                profile.username
                            }

                        </h2>

                        <p>

                            {
                                profile.headline ||
                                "Candidate"
                            }

                        </p>


                        {profile.location && (

                            <span>

                                📍 {profile.location}

                            </span>

                        )}

                    </div>

                </div>


                {/* ABOUT */}

                {profile.about && (

                    <section className="candidate-section">

                        <h3>
                            About
                        </h3>

                        <p>
                            {profile.about}
                        </p>

                    </section>

                )}


                {/* SKILLS */}

                <section className="candidate-section">

                    <h3>
                        Skills
                    </h3>

                    <div className="candidate-skills">

                        {profile.skills?.map(
                            skill => (

                                <span
                                    key={skill.id}
                                    className="candidate-skill"
                                >

                                    {skill.name}

                                </span>

                            )
                        )}


                        {profile.custom_skills?.map(
                            skill => (

                                <span
                                    key={`custom-${skill.id}`}
                                    className="candidate-skill custom"
                                >

                                    {skill.name}

                                </span>

                            )
                        )}

                    </div>

                </section>


                {/* EXPERIENCE */}

                {profile.experience && (

                    <section className="candidate-section">

                        <h3>
                            Experience
                        </h3>

                        <p>
                            {profile.experience}
                        </p>

                    </section>

                )}


                {/* EDUCATION */}

                {profile.education && (

                    <section className="candidate-section">

                        <h3>
                            Education
                        </h3>

                        <p>
                            {profile.education}
                        </p>

                    </section>

                )}


                {/* SOCIAL */}

                {(

                    profile.github ||
                    profile.linkedin ||
                    profile.portfolio

                ) && (

                    <section className="candidate-section">

                        <h3>
                            Professional Links
                        </h3>


                        <div className="candidate-links">

                            {profile.github && (

                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >

                                    GitHub

                                </a>

                            )}


                            {profile.linkedin && (

                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >

                                    LinkedIn

                                </a>

                            )}


                            {profile.portfolio && (

                                <a
                                    href={profile.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >

                                    Portfolio

                                </a>

                            )}

                        </div>

                    </section>

                )}


                {/* RESUME */}

                {profile.resume && (

                    <section className="candidate-section">

                        <h3>
                            Resume
                        </h3>

                        <a

                            className="candidate-resume-button"

                            href={profile.resume}

                            target="_blank"

                            rel="noopener noreferrer"

                        >

                            📄 View Candidate Resume

                        </a>

                    </section>

                )}

            </div>

        </DashboardShell>

    );

}


export default EmployerCandidateProfilePage;

