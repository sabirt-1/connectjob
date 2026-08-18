


import { useEffect, useState } from "react";

import DashboardShell from "../../components/dashboard/DashboardShell";
import Loader from "../../components/common/Loader";

import ProfileForm from "../../components/profile/ProfileForm";

import {
    getProfile,
    updateProfile,
} from "../../services/profileService";

import "./ProfilePage.css";

function ProfilePage() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            setLoading(true);

            const data = await getProfile();

            setProfile(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function handleSubmit(formData) {

        try {

            setSaving(true);

            const updatedProfile =
                await updateProfile(formData);

            setProfile(updatedProfile);

            alert(
                "Profile updated successfully."
            );

        } catch (error) {

            console.error(error);

            alert(
                "Unable to update profile."
            );

        } finally {

            setSaving(false);

        }

    }

    if (loading) {

        return (
            <Loader text="Loading Profile..." />
        );

    }

    return (

        <DashboardShell
            title="My Profile"
            subtitle="Manage your personal information for your resume."
        >

            {

                saving && (

                    <Loader
                        text="Saving Profile..."
                    />

                )

            }

            <ProfileForm
                initialData={profile}
                onSubmit={handleSubmit}
                onCancel={() => loadProfile()}
            />

        </DashboardShell>

    );

}

export default ProfilePage;

