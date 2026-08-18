


import { useEffect, useState } from "react";

import DashboardShell from "../../components/dashboard/DashboardShell";
import Loader from "../../components/common/Loader";

import LanguageCard from "../../components/language/LanguageCard";
import LanguageForm from "../../components/language/LanguageForm";

import {

    getLanguages,

    createLanguage,

    updateLanguage,

    deleteLanguage,

} from "../../services/languageService";

import "./LanguagePage.css";

function LanguagePage() {

    const [languages, setLanguages] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [editingLanguage, setEditingLanguage] = useState(null);

    useEffect(() => {

        loadLanguages();

    }, []);

    async function loadLanguages() {

        try {

            const data = await getLanguages();

            setLanguages(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }

    async function handleSubmit(formData) {

        try {

            if (editingLanguage) {

                await updateLanguage(

                    editingLanguage.id,

                    formData

                );

            } else {

                await createLanguage(formData);

            }

            setEditingLanguage(null);

            setShowForm(false);

            loadLanguages();

        } catch (error) {

            console.log(error);

        }

    }

    async function handleDelete(id) {

        if (!window.confirm("Delete this language?")) {

            return;

        }

        try {

            await deleteLanguage(id);

            loadLanguages();

        } catch (error) {

            console.log(error);

        }

    }

    if (loading) {

        return <Loader text="Loading Languages..." />;

    }

    return (

        <DashboardShell

            title="Languages"

            subtitle="Manage your language skills"

        >

            <button

                className="add-language-btn"

                onClick={() => {

                    setEditingLanguage(null);

                    setShowForm(true);

                }}

            >

                + Add Language

            </button>

            {

                showForm && (

                    <LanguageForm

                        initialData={editingLanguage}

                        onSubmit={handleSubmit}

                        onCancel={() => {

                            setShowForm(false);

                            setEditingLanguage(null);

                        }}

                    />

                )

            }

            {

                languages.length === 0

                    ? (

                        <p>

                            No languages added yet.

                        </p>

                    )

                    : (

                        languages.map((language) => (

                            <LanguageCard

                                key={language.id}

                                language={language}

                                onEdit={(language) => {

                                    setEditingLanguage(language);

                                    setShowForm(true);

                                }}

                                onDelete={handleDelete}

                            />

                        ))

                    )

            }

        </DashboardShell>

    );

}

export default LanguagePage;

