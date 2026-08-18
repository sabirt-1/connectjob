

import "./UserTable.css";

import RoleBadge from "./RoleBadge";

import { Link } from "react-router-dom";

function UserRow({ user }) {

    return (

        <tr>

            <td>{user.username}</td>

            <td>{user.email}</td>

            <td>

                <RoleBadge role={user.role} />

            </td>

            <td>

                <span

                    className={

                        user.is_active

                            ? "status-active"

                            : "status-blocked"

                    }

                >

                    {

                        user.is_active

                            ? "Active"

                            : "Blocked"

                    }

                </span>

            </td>

            <td>

                {

                    new Date(user.date_joined)

                        .toLocaleDateString()

                }

            </td>

            <td>

                <Link to={`/admin/users/${user.id}`}>
                    <button className="view-btn">
                        View
                    </button>
                </Link>

            </td>

        </tr>

    );

}

export default UserRow;

