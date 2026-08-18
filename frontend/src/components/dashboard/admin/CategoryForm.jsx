


import { useEffect, useState } from "react";

import "./CategoryForm.css";

function CategoryForm({

    editingCategory,

    onSave,

    onCancel

}) {

    const [formData, setFormData] = useState({

        name: "",

        icon: "",

        description: "",

        is_active: true

    });

    useEffect(() => {

        if (editingCategory) {

            setFormData({

                name: editingCategory.name || "",

                icon: editingCategory.icon || "",

                description: editingCategory.description || "",

                is_active: editingCategory.is_active

            });

        }

        else {

            setFormData({

                name: "",

                icon: "",

                description: "",

                is_active: true

            });

        }

    }, [editingCategory]);

    function handleChange(event) {

        const {

            name,

            value,

            type,

            checked

        } = event.target;

        setFormData({

            ...formData,

            [name]:

                type === "checkbox"

                    ? checked

                    : value

        });

    }

    function handleSubmit(event) {

        event.preventDefault();

        onSave(formData);

    }

    return (

        <form

            className="category-form"

            onSubmit={handleSubmit}

        >

            <h2>

                {

                    editingCategory

                        ? "Edit Category"

                        : "Add Category"

                }

            </h2>

            <div className="category-form-grid">

                <input

                    type="text"

                    name="name"

                    placeholder="Category Name"

                    value={formData.name}

                    onChange={handleChange}

                    required

                />

                <input

                    type="text"

                    name="icon"

                    placeholder="Icon (optional)"

                    value={formData.icon}

                    onChange={handleChange}

                />

            </div>

            <textarea

                name="description"

                placeholder="Category Description"

                value={formData.description}

                onChange={handleChange}

                rows="4"

            />

            <label className="checkbox-row">

                <input

                    type="checkbox"

                    name="is_active"

                    checked={formData.is_active}

                    onChange={handleChange}

                />

                Active Category

            </label>

            <div className="category-buttons">

                <button

                    type="submit"

                    className="save-btn-ad"

                >

                    {

                        editingCategory

                            ? "Update Category"

                            : "Create Category"

                    }

                </button>

                {

                    editingCategory && (

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={onCancel}

                        >

                            Cancel

                        </button>

                    )

                }

            </div>

        </form>

    );

}

export default CategoryForm;

