


import { useEffect, useState } from "react";

import DashboardShell from "../../components/dashboard/DashboardShell";
import Loader from "../../components/common/Loader";

import EducationCard from "../../components/education/EducationCard";
import EducationForm from "../../components/education/EducationForm";

import {
    getEducations,
    createEducation,
    updateEducation,
    deleteEducation,
} from "../../services/educationService";

import "./EducationPage.css";

function EducationPage() {

    const [educations, setEducations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [editingEducation, setEditingEducation] =
        useState(null);

    useEffect(() => {

        loadEducations();

    }, []);

    async function loadEducations() {

        try {

            setLoading(true);

            const data = await getEducations();

            setEducations(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(error);

            setEducations([]);

        } finally {

            setLoading(false);

        }

    }

    async function handleSubmit(formData) {

        try {

            setSaving(true);

            if (editingEducation) {

                await updateEducation(
                    editingEducation.id,
                    formData
                );

            } else {

                await createEducation(formData);

            }

            await loadEducations();

            setShowForm(false);

            setEditingEducation(null);

        } catch (error) {

            console.error(error);

        } finally {

            setSaving(false);

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Delete this education record?"
        );

        if (!confirmDelete) return;

        try {

            await deleteEducation(id);

            await loadEducations();

        } catch (error) {

            console.error(error);

        }

    }

    function handleEdit(education) {

        setEditingEducation(education);

        setShowForm(true);

    }

    function handleAdd() {

        setEditingEducation(null);

        setShowForm(true);

    }

    function handleCancel() {

        setEditingEducation(null);

        setShowForm(false);

    }

    if (loading) {

        return (
            <Loader text="Loading Education..." />
        );

    }

    return (

        <DashboardShell
            title="My Education"
            subtitle="Manage your educational qualifications"
        >

            <button
                className="add-education-btn"
                onClick={handleAdd}
            >

                + Add Education

            </button>

            {

                showForm && (

                    <EducationForm
                        initialData={editingEducation}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        saving={saving}
                    />

                )

            }

            {

                educations.length === 0

                    ? (

                        <p>

                            No education records added yet.

                        </p>

                    )

                    : (

                        educations.map(

                            (education) => (

                                <EducationCard
                                    key={education.id}
                                    education={education}
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

export default EducationPage;





