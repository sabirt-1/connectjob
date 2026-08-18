


import { useEffect, useState } from "react";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../../services/categoryAdminService";

import CategoryForm from "../../components/dashboard/admin/CategoryForm";
import CategoryTable from "../../components/dashboard/admin/CategoryTable";
import ConfirmationModal from "../../components/common/ConfirmationModal";

import "./CategoryManagementPage.css";

function CategoryManagementPage() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editingCategory, setEditingCategory] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        loadCategories();

    }, []);

    async function loadCategories() {

        try {

            const data = await getCategories();

            setCategories(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }

    async function handleSave(formData) {

        try {

            if (editingCategory) {

                await updateCategory(
                    editingCategory.id,
                    formData
                );

            }

            else {

                await createCategory(formData);

            }

            setEditingCategory(null);

            loadCategories();

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

    function handleDelete(category) {

        setSelectedCategory(category);

        setShowDeleteModal(true);

    }

    async function confirmDelete() {

        try {

            await deleteCategory(selectedCategory.id);

            loadCategories();

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setShowDeleteModal(false);

            setSelectedCategory(null);

        }

    }

    const filteredCategories = categories.filter((category) => {

        const keyword = searchTerm.toLowerCase();

        return (

            category.name.toLowerCase().includes(keyword) ||

            category.description.toLowerCase().includes(keyword)

        );

    });

    if (loading) {

        return <Loader text="Loading Categories..." />;

    }

    return (

        <div className="container">

            <DashboardHeader

                title="Category Management"

                subtitle="Manage Job Categories"

            />

            <CategoryForm

                editingCategory={editingCategory}

                onSave={handleSave}

                onCancel={() => setEditingCategory(null)}

            />

            <div className="category-search">

                <input

                    type="text"

                    placeholder="🔍 Search Categories..."

                    value={searchTerm}

                    onChange={(e) => setSearchTerm(e.target.value)}

                />

            </div>

            <CategoryTable

                // categories={categories}
                categories={filteredCategories}

                onEdit={setEditingCategory}

                onDelete={handleDelete}

            />

            <ConfirmationModal

                isOpen={showDeleteModal}

                title="Delete Category"

                message={
                    selectedCategory
                        ? `Are you sure you want to delete "${selectedCategory.name}"?`
                        : ""
                }

                confirmText="Delete"

                cancelText="Cancel"

                onConfirm={confirmDelete}

                onCancel={() => {

                    setShowDeleteModal(false);

                    setSelectedCategory(null);

                }}

            />

        </div>

    );

}

export default CategoryManagementPage;

