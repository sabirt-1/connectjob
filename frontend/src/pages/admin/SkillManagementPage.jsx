


import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";
import ConfirmationModal from "../../components/common/ConfirmationModal";

import SkillForm from "../../components/dashboard/admin/SkillForm";
import SkillTable from "../../components/dashboard/admin/SkillTable";

import {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill,
    toggleSkillStatus
} from "../../services/skillAdminService";

import "./CategoryManagementPage.css";

function SkillManagementPage() {

    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editingSkill, setEditingSkill] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedSkill, setSelectedSkill] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        loadSkills();

    }, []);

    async function loadSkills() {

        try {

            const data = await getSkills();

            setSkills(data);

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to load skills.");

        }

        finally {

            setLoading(false);

        }

    }

    async function handleSave(formData) {

        try {

            if (editingSkill) {

                await updateSkill(
                    editingSkill.id,
                    formData
                );

                toast.success("Skill updated successfully.");

            }

            else {

                await createSkill(formData);

                toast.success("Skill created successfully.");

            }

            setEditingSkill(null);

            await loadSkills();

        }

        catch (error) {

            console.log(error);
            console.log(error.response?.data);

            toast.error(

                error.response?.data?.name?.[0] ||

                "Something went wrong."

            );

        }

    }

    function handleDelete(skill) {

        setSelectedSkill(skill);

        setShowDeleteModal(true);

    }

    async function confirmDelete() {

        try {

            await deleteSkill(selectedSkill.id);

            toast.success("Skill deleted successfully.");

            await loadSkills();

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to delete skill.");

        }

        finally {

            setShowDeleteModal(false);

            setSelectedSkill(null);

        }

    }


    async function toggleSkill(id) {

        try {

            await toggleSkillStatus(id);

            toast.success("Skill status updated.");

            await loadSkills();

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to update skill status.");

        }

    }

   
    const filteredSkills = skills.filter((skill) => {

        const keyword = searchTerm.toLowerCase();

        return skill.name.toLowerCase().includes(keyword);

    });

    if (loading) {

        return <Loader text="Loading Skills..." />;

    }

    return (

        <div className="container">

            <DashboardHeader

                title="Skill Management"

                subtitle="Manage Job Skills"

            />

            <SkillForm

                editingSkill={editingSkill}

                onSave={handleSave}

                onCancel={() => setEditingSkill(null)}

            />

            <div className="category-search">

                <input

                    type="text"

                    placeholder="🔍 Search Skills..."

                    value={searchTerm}

                    onChange={(e) =>

                        setSearchTerm(e.target.value)

                    }

                />

            </div>

            <SkillTable

                skills={filteredSkills}

                onEdit={setEditingSkill}

                onDelete={handleDelete}

                onToggle={toggleSkill}

            />

            <ConfirmationModal

                isOpen={showDeleteModal}

                title="Delete Skill"

                message={
                    selectedSkill
                        ? `Are you sure you want to delete "${selectedSkill.name}"?`
                        : ""
                }

                confirmText="Delete"

                cancelText="Cancel"

                onConfirm={confirmDelete}

                onCancel={() => {

                    setShowDeleteModal(false);

                    setSelectedSkill(null);

                }}

            />

        </div>

    );

}

export default SkillManagementPage;



