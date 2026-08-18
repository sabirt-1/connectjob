


import { useEffect, useState } from "react";

import DashboardShell from "../../components/dashboard/DashboardShell";
import Loader from "../../components/common/Loader";

import AchievementCard from "../../components/achievement/AchievementCard";
import AchievementForm from "../../components/achievement/AchievementForm";

import {
    getAchievements,
    createAchievement,
    updateAchievement,
    deleteAchievement,
} from "../../services/achievementService";

import "./AchievementPage.css";

function AchievementPage() {

    const [achievements, setAchievements] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [editingAchievement, setEditingAchievement] = useState(null);

    useEffect(() => {

        loadAchievements();

    }, []);

    async function loadAchievements() {

        try {

            setLoading(true);

            const data = await getAchievements();

            setAchievements(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(error);

            alert("Unable to load achievements.");

            setAchievements([]);

        } finally {

            setLoading(false);

        }

    }

    async function handleSubmit(formData) {

        try {

            setSaving(true);

            if (editingAchievement) {

                await updateAchievement(
                    editingAchievement.id,
                    formData
                );

            } else {

                await createAchievement(formData);

            }

            await loadAchievements();

            setEditingAchievement(null);

            setShowForm(false);

        } catch (error) {

            console.error(error);

            alert("Unable to save achievement.");

        } finally {

            setSaving(false);

        }

    }

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Delete this achievement?"
        );

        if (!confirmed) return;

        try {

            await deleteAchievement(id);

            setAchievements(previous =>

                previous.filter(

                    achievement =>
                        achievement.id !== id

                )

            );

        } catch (error) {

            console.error(error);

            alert("Unable to delete achievement.");

        }

    }

    function handleEdit(achievement) {

        setEditingAchievement(achievement);

        setShowForm(true);

        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    }

    function handleAddAchievement() {

        setEditingAchievement(null);

        setShowForm(true);

        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    }

    function handleCancel() {

        setEditingAchievement(null);

        setShowForm(false);

    }

    if (loading) {

        return (

            <Loader
                text="Loading Achievements..."
            />

        );

    }

    return (

        <DashboardShell

            title="My Achievements"

            subtitle="Showcase awards, recognitions and accomplishments."

        >

            <button

                className="add-achievement-btn"

                onClick={handleAddAchievement}

                disabled={saving}

            >

                + Add Achievement

            </button>

            {

                showForm && (

                    <AchievementForm

                        initialData={
                            editingAchievement
                        }

                        onSubmit={handleSubmit}

                        onCancel={handleCancel}

                    />

                )

            }

            {

                achievements.length === 0 ? (

                    <div className="empty-achievements">

                        <h3>

                            No achievements added

                        </h3>

                        <p>

                            Highlight awards, hackathons,
                            rankings, competitions,
                            scholarships and other
                            accomplishments.

                        </p>

                    </div>

                ) : (

                    achievements.map(

                        achievement => (

                            <AchievementCard

                                key={achievement.id}

                                achievement={
                                    achievement
                                }

                                onEdit={handleEdit}

                                onDelete={
                                    handleDelete
                                }

                            />

                        )

                    )

                )

            }

        </DashboardShell>

    );

}

export default AchievementPage;

