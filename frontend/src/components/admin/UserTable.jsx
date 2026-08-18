


import UserRow from "./UserRow";

import "./UserTable.css";

function UserTable({ users }) {

    return (

        <div className="user-table-container">

            <table className="user-table">

                <thead>

                    <tr>

                        <th>Username</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Status</th>

                        <th>Joined</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map((user) => (

                            <UserRow

                                key={user.id}

                                user={user}

                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default UserTable;

