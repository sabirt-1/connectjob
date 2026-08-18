


import "./CategoryTable.css";

import StatusBadge from "../../common/Badge/StatusBadge";

function CategoryTable({

    categories,

    onEdit,

    onDelete

}) {

    return (

        <div className="category-table-card">

            <h2>

                Categories

            </h2>

            {

                categories.length === 0

                ?

                (

                    <p>

                        No categories found.

                    </p>

                )

                :

                (

                    <table className="category-table">

                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Icon</th>

                                <th>Description</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                categories.map((category)=>(

                                    <tr

                                        key={category.id}

                                    >

                                        <td>

                                            {category.name}

                                        </td>

                                        <td>

                                            {

                                                category.icon ||

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            {

                                                category.description ||

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            {/* <span
                                                className={
                                                    category.is_active
                                                    ?
                                                    "status active"
                                                    :
                                                    "status inactive"
                                                }
                                            >
                                                {
                                                    category.is_active
                                                    ?
                                                    "Active"
                                                    :
                                                    "Inactive"
                                                }
                                            </span> */}
                                            <StatusBadge
                                                status={category.is_active ? "active" : "inactive"}
                                            />

                                        </td>

                                        <td>

                                            <div className="act-buttons">

                                                <button

                                                    className="cat-edit-btn"

                                                    onClick={()=>

                                                        onEdit(category)

                                                    }

                                                >

                                                    Edit

                                                </button>

                                                <button

                                                    className="cat-delete-btn"

                                                    onClick={()=>

                                                        onDelete(category)

                                                    }

                                                >

                                                    Delete

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

export default CategoryTable;

