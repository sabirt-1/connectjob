


import { useEffect, useState } from "react";

import DashboardShell from "../../components/dashboard/DashboardShell";
import Loader from "../../components/common/Loader";

import ExperienceCard from "../../components/experience/ExperienceCard";
import ExperienceForm from "../../components/experience/ExperienceForm";

import {

    getExperiences,

    createExperience,

    updateExperience,

    deleteExperience

} from "../../services/experienceService";

import "./ExperiencePage.css";

function ExperiencePage() {

    const [experiences, setExperiences] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [editingExperience, setEditingExperience] = useState(null);

    useEffect(() => {

        loadExperiences();

    }, []);

    async function loadExperiences() {

        try {

            const data = await getExperiences();

            setExperiences(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }

    async function handleSubmit(formData) {

        try {

            if (editingExperience) {

                await updateExperience(

                    editingExperience.id,

                    formData

                );

            } else {

                await createExperience(formData);

            }

            setEditingExperience(null);

            setShowForm(false);

            loadExperiences();

        } catch (error) {

            console.log(error);

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(

            "Delete this experience?"

        );

        if (!confirmDelete) return;

        try {

            await deleteExperience(id);

            loadExperiences();

        } catch (error) {

            console.log(error);

        }

    }

    function handleEdit(experience) {

        setEditingExperience(experience);

        setShowForm(true);

    }

    if (loading) {

        return <Loader text="Loading Experience..." />;

    }

    return (

        <DashboardShell

            title="My Experience"

            subtitle="Manage your work experience"

        >

            <button

                className="add-experience-btn"

                onClick={() => {

                    setEditingExperience(null);

                    setShowForm(true);

                }}

            >

                + Add Experience

            </button>

            {

                showForm && (

                    <ExperienceForm

                        initialData={editingExperience}

                        onSubmit={handleSubmit}

                        onCancel={() => {

                            setShowForm(false);

                            setEditingExperience(null);

                        }}

                    />

                )

            }

            {

                experiences.length === 0

                ?

                (

                    <p>No experience added yet.</p>

                )

                :

                (

                    experiences.map(

                        (experience) => (

                            <ExperienceCard

                                key={experience.id}

                                experience={experience}

                                onEdit={handleEdit}

                                onDelete={handleDelete}

                            />

                        )

                    )

                )

            }

        </DashboardShell>

    );

}

export default ExperiencePage;

