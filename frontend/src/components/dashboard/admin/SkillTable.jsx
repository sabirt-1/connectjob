


import "./CategoryTable.css";

import StatusBadge from "../../common/Badge/StatusBadge";

function SkillTable({

    skills,

    onEdit,

    onDelete,

    onToggle

}) {

    return (

        <div className="category-table-card">

            <h2>

                Skills

            </h2>

            {

                skills.length === 0

                    ?

                    (

                        <p>

                            No skills found.

                        </p>

                    )

                    :

                    (

                        <table className="category-table">

                            <thead>

                                <tr>

                                    <th>Skill</th>

                                    {/* <th>Category</th> */}

                                    <th>Status</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    skills.map((skill) => (

                                        <tr

                                            key={skill.id}

                                        >

                                            <td>

                                                {skill.name}

                                            </td>

                                            {/* <td>

                                                {skill.category_name}

                                            </td> */}

                                            <td>

                                                <StatusBadge

                                                    status={

                                                        skill.is_active

                                                            ? "active"

                                                            : "inactive"

                                                    }

                                                />

                                            </td>

                                            <td>

                                                <div className="act-buttons">
                                                    <button

                                                        className="edit-btn"

                                                        onClick={() =>

                                                            onEdit(skill)

                                                        }

                                                    >

                                                        Edit

                                                    </button>

                                                    <button

                                                        className="delete-btn"

                                                        onClick={() =>

                                                            onDelete(skill)

                                                        }

                                                    >

                                                        Delete

                                                    </button>

                                                    <button

                                                        className={

                                                            skill.is_active

                                                                ? "delete-btn"

                                                                : "edit-btn"

                                                        }

                                                        onClick={() =>

                                                            onToggle(skill.id)

                                                        }

                                                    >

                                                        {

                                                            skill.is_active

                                                                ? "Disable"

                                                                : "Enable"

                                                        }

                                                    </button>
                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    )

            }

        </div>

    );

}

export default SkillTable;

