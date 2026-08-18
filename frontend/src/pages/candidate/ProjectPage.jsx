


import { useEffect, useState } from "react";

import DashboardShell from "../../components/dashboard/DashboardShell";
import Loader from "../../components/common/Loader";

import ProjectCard from "../../components/project/ProjectCard";
import ProjectForm from "../../components/project/ProjectForm";

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} from "../../services/projectService";

import "./ProjectPage.css";

function ProjectPage() {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [editingProject, setEditingProject] = useState(null);

    useEffect(() => {

        loadProjects();

    }, []);

    async function loadProjects() {

        try {

            setLoading(true);

            const data = await getProjects();

            setProjects(data);

        } catch (error) {

            console.error(error);

            alert("Unable to load projects.");

        } finally {

            setLoading(false);

        }

    }

    async function handleSubmit(formData) {

        try {

            setSaving(true);

            if (editingProject) {

                await updateProject(
                    editingProject.id,
                    formData
                );

            } else {

                await createProject(formData);

            }

            await loadProjects();

            setShowForm(false);

            setEditingProject(null);

        } catch (error) {

            console.error(error);

            alert("Unable to save project.");

        } finally {

            setSaving(false);

        }

    }

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Delete this project?"
        );

        if (!confirmed) return;

        try {

            await deleteProject(id);

            setProjects(previous =>
                previous.filter(
                    project => project.id !== id
                )
            );

        } catch (error) {

            console.error(error);

            alert("Unable to delete project.");

        }

    }

    function handleEdit(project) {

        setEditingProject(project);

        setShowForm(true);

        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    }

    function handleAddProject() {

        setEditingProject(null);

        setShowForm(true);

        window.scrollTo({

            top: 0,

            behavior: "smooth",

        });

    }

    function handleCancel() {

        setEditingProject(null);

        setShowForm(false);

    }

    if (loading) {

        return <Loader text="Loading Projects..." />;

    }

    return (

        <DashboardShell

            title="My Projects"

            subtitle="Manage your portfolio projects"

        >

            <button

                className="add-project-btn"

                onClick={handleAddProject}

                disabled={saving}

            >

                + Add Project

            </button>

            {

                showForm && (

                    <ProjectForm

                        initialData={editingProject}

                        onSubmit={handleSubmit}

                        onCancel={handleCancel}

                    />

                )

            }

            {

                projects.length === 0 ? (

                    <div className="empty-projects">

                        <h3>

                            No projects added yet

                        </h3>

                        <p>

                            Showcase your best work to
                            increase your chances of
                            getting hired.

                        </p>

                    </div>

                ) : (

                    projects.map(project => (

                        <ProjectCard

                            key={project.id}

                            project={project}

                            onEdit={handleEdit}

                            onDelete={handleDelete}

                        />

                    ))

                )

            }

        </DashboardShell>

    );

}

export default ProjectPage;










