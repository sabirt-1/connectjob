


import { useEffect, useState } from "react";

// import { getCategories } from "../../../services/categoryAdminService";

import "./CategoryForm.css";

function SkillForm({

    editingSkill,

    onSave,

    onCancel

}) {

    // const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({

        // category: "",

        name: "",

        is_active: true

    });

    // useEffect(() => {

    //     loadCategories();

    // }, []);

    // async function loadCategories() {

    //     try {

    //         const data = await getCategories();

    //         setCategories(

    //             data.filter(category => category.is_active)

    //         );

    //     }

    //     catch (error) {

    //         console.log(error);

    //     }

    // }

    useEffect(() => {

        if (editingSkill) {

            setFormData({

                // category: editingSkill.category || "",

                name: editingSkill.name || "",

                is_active: editingSkill.is_active

            });

        }

        else {

            setFormData({

                category: "",

                name: "",

                is_active: true

            });

        }

    }, [editingSkill]);

    function handleChange(event) {

        const {

            name,

            value,

            checked,

            type

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

                    editingSkill

                        ? "Edit Skill"

                        : "Add Skill"

                }

            </h2>

            <div className="category-form-grid">

                {/* <select

                    name="category"

                    value={formData.category}

                    onChange={handleChange}

                    required

                >

                    <option value="">

                        Select Category

                    </option>

                    {

                        categories.map(category => (

                            <option

                                key={category.id}

                                value={category.id}

                            >

                                {category.name}

                            </option>

                        ))

                    }

                </select> */}

                <input

                    type="text"

                    name="name"

                    placeholder="Skill Name"

                    value={formData.name}

                    onChange={handleChange}

                    required

                />

            </div>

            <label className="checkbox-row">

                <input

                    type="checkbox"

                    name="is_active"

                    checked={formData.is_active}

                    onChange={handleChange}

                />

                Skill is Active

            </label>

            <div className="category-buttons">

                <button

                    type="submit"

                    className="save-btn-ad"

                >

                    {

                        editingSkill

                            ? "Update Skill"

                            : "Create Skill"

                    }

                </button>

                {

                    editingSkill && (

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

export default SkillForm;

