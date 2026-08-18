


import { useEffect, useState } from "react";

import DashboardShell from "../../components/dashboard/DashboardShell";

import ProfileHeader from "../../components/candidate/ProfileHeader";
import PersonalInformation from "../../components/candidate/PersonalInformation";
import ProfessionalInformation from "../../components/candidate/ProfessionalInformation";
import SocialLinks from "../../components/candidate/SocialLinks";
import AboutSection from "../../components/candidate/AboutSection";
import ResumeSection from "../../components/candidate/ResumeSection";
import Loader from "../../components/common/Loader";
import SkillsSection from "../../components/candidate/SkillsSection/SkillsSection";

import {

    getCandidateProfile,

    updateCandidateProfile

} from "../../services/profileService";

import "./CandidateProfilePage.css";

function CandidateProfilePage() {

    const [profile, setProfile] = useState({});

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const profileCompletion =
    calculateProfileCompletion(profile);

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const data =
                await getCandidateProfile();

            setProfile(data);

        }

        catch(error){

            console.log(error);

        }

        finally{

            setLoading(false);

        }

    }


    function handleChange(e){

        setProfile({

            ...profile,

            [e.target.name]:
            e.target.value

        });

    }




    function handleImageChange(e){

        const file = e.target.files[0];

        if(file){

            setProfile({

                ...profile,

                profile_image:file,

                image_preview:
                URL.createObjectURL(file)

            });

        }

    }

    function calculateProfileCompletion(profile) {

        const fields = [

            // Personal Information
            profile.full_name,
            profile.phone,
            profile.location,

            // Professional Information
            profile.headline,
            profile.experience,
            profile.education,

            // Skills
            profile.skill_ids?.length > 0,

            // Social Links
            profile.github,
            profile.linkedin,
            profile.portfolio,

            // About
            profile.about,

            // Resume
            profile.resume,

            // Profile Photo
            profile.profile_image

        ];

        const completedFields = fields.filter((field) => {

            if (typeof field === "boolean") {
                return field;
            }

            if (field instanceof File) {
                return true;
            }

            return (
                field !== null &&
                field !== undefined &&
                String(field).trim() !== ""
            );

        }).length;

        return Math.round(
            (completedFields / fields.length) * 100
        );
    }



    function handleResumeChange(e){

        const file = e.target.files[0];


        if(file){

            setProfile({

                ...profile,

                resume:file

            });

        }

    }


    async function handleSubmit(){

        setSaving(true);


        const formData = new FormData();


        formData.append(
            "full_name",
            profile.full_name
        );


        formData.append(
            "phone",
            profile.phone
        );


        formData.append(
            "location",
            profile.location
        );


        formData.append(
            "headline",
            profile.headline
        );


        formData.append(
            "about",
            profile.about
        );


        formData.append(
            "experience",
            profile.experience
        );


        formData.append(
            "education",
            profile.education
        );


        formData.append(
            "github",
            profile.github
        );


        formData.append(
            "linkedin",
            profile.linkedin
        );


        formData.append(
            "portfolio",
            profile.portfolio
        );


        if(profile.resume instanceof File){

            formData.append(
                "resume",
                profile.resume
            );

        }


        if(profile.profile_image instanceof File){

            formData.append(
                "profile_image",
                profile.profile_image
            );

        }


        profile.skill_ids?.forEach(id=>{

            formData.append(
                "skill_ids",
                id
            );

        });

        profile.custom_skill_names?.forEach(name => {

            formData.append(
                "custom_skill_names",
                name
            );

        });


        try{


            const updated =
                await updateCandidateProfile(
                    formData
                );


            setProfile(updated);


            alert(
                "Profile Updated"
            );


        }

        catch(error){

            console.log(
                "UPDATE ERROR:",
                error.response?.data
            );

        }


        finally{

            setSaving(false);

        }

    }

    if(loading){

        // return <h2>Loading...</h2>;
        return <Loader text="Loading Profile..." />;

    }


    return(

        <DashboardShell

        title="Candidate Profile"

        subtitle="Manage your profile"

        >

        <ProfileHeader

        profile={profile}

        onImageChange={handleImageChange}

        completion={profileCompletion}

        />

        <PersonalInformation

        profile={profile}

        handleChange={handleChange}

        />

        <ProfessionalInformation

        profile={profile}

        handleChange={handleChange}

        />

        <SkillsSection

            profile={profile}

            setProfile={setProfile}

        />

        <SocialLinks

        profile={profile}

        handleChange={handleChange}

        />

        <AboutSection

        profile={profile}

        handleChange={handleChange}

        />

        <ResumeSection

        profile={profile}

        handleResumeChange={handleResumeChange}

        />

        <div className="save-section">

        <button

        className="cprof-save-btn"

        onClick={handleSubmit}

        disabled={saving}

        >

        {

        saving ?

        "Saving..."

        :

        "Save Changes"

        }

        </button>

        </div>

        </DashboardShell>

    );

}

export default CandidateProfilePage;


