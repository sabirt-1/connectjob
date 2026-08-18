


import { useEffect, useState } from "react";

import DashboardShell from "../../components/dashboard/DashboardShell";
import Loader from "../../components/common/Loader";

import CertificationCard from "../../components/certification/CertificationCard";
import CertificationForm from "../../components/certification/CertificationForm";

import {
    getCertifications,
    createCertification,
    updateCertification,
    deleteCertification,
} from "../../services/certificationService";

import "./CertificationPage.css";

function CertificationPage() {

    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingCertification, setEditingCertification] = useState(null);

    useEffect(() => {
        loadCertifications();
    }, []);

    async function loadCertifications() {

        try {

            setLoading(true);

            const data = await getCertifications();

            setCertifications(Array.isArray(data) ? data : []);

        } catch (error) {

            console.error(error);

            setCertifications([]);

        } finally {

            setLoading(false);

        }

    }

    async function handleSubmit(formData) {

        try {

            if (editingCertification) {

                await updateCertification(
                    editingCertification.id,
                    formData
                );

            } else {

                await createCertification(formData);

            }

            setEditingCertification(null);
            setShowForm(false);

            await loadCertifications();

        } catch (error) {

            console.error(error);

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Delete this certification?"
        );

        if (!confirmDelete) return;

        try {

            await deleteCertification(id);

            await loadCertifications();

        } catch (error) {

            console.error(error);

        }

    }

    function handleEdit(certification) {

        setEditingCertification(certification);
        setShowForm(true);

    }

    if (loading) {

        return <Loader text="Loading Certifications..." />;

    }

    return (

        <DashboardShell
            title="My Certifications"
            subtitle="Manage your professional certifications"
        >

            <button
                className="add-certification-btn"
                onClick={() => {

                    setEditingCertification(null);
                    setShowForm(true);

                }}
            >
                + Add Certification
            </button>

            {showForm && (

                <CertificationForm
                    initialData={editingCertification}
                    onSubmit={handleSubmit}
                    onCancel={() => {

                        setShowForm(false);
                        setEditingCertification(null);

                    }}
                />

            )}

            {certifications.length === 0 ? (

                <p>No certifications added yet.</p>

            ) : (

                certifications.map((certification) => (

                    <CertificationCard
                        key={certification.id}
                        certification={certification}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                ))

            )}

        </DashboardShell>

    );

}

export default CertificationPage;



