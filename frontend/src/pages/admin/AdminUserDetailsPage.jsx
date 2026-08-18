


import "./AdminUserDetailsPage.css";

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Loader from "../../components/common/Loader";

import {
    getAdminUserDetails,
    updateAdminUser,
    toggleAdminUserStatus,
    deleteAdminUser
} from "../../services/adminService";

function AdminUserDetailsPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [showEditModal, setShowEditModal] = useState(false);

    const [editUsername, setEditUsername] = useState("");

    const [editEmail, setEditEmail] = useState("");

    const [editRole, setEditRole] = useState("");

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        loadUser();

    }, []);

    async function loadUser() {

        try {

            const data = await getAdminUserDetails(id);

            setUser(data);

        }

        catch (error) {

            console.log(error);

            toast.error(

                "Unable to load user."

            );

        }

        finally {

            setLoading(false);

        }

    }

    async function handleUpdateUser() {

        if (!editUsername.trim()) {

            toast.error(
                "Username is required."
            );

            return;

        }

        if (!editEmail.trim()) {

            toast.error(
                "Email is required."
            );

            return;

        }

        setSaving(true);

        try {

            await updateAdminUser(

                id,

                {

                    username: editUsername,

                    email: editEmail,

                    role: editRole

                }

            );

            

            toast.success(

                "User updated successfully."

            );

            setShowEditModal(false);

            await loadUser();

            // loadUser();

        }

        catch (error) {

            console.log(error);

            toast.error(

                "Unable to update user."

            );

        }

        finally {
            setSaving(false);
        }


    }

    async function handleToggleStatus() {

        const confirmed = window.confirm(

            user.is_active

                ? "Block this user?"

                : "Unblock this user?"

        );

        if (!confirmed) return;

        try {

            const response = await toggleAdminUserStatus(id);

            toast.success(response.message);

            await loadUser();

        }

        catch (error) {

            console.log(error);

            toast.error(

                "Unable to update user status."

            );

        }

    }

    async function handleDelete() {

        const confirmed = window.confirm(

            "Delete this user permanently?"

        );

        if (!confirmed) return;

        try {

            const response = await deleteAdminUser(id);

            toast.success(

                response.message

            );

            navigate("/admin/users");

        }

        catch (error) {

            console.log(error);

            toast.error(

                "Unable to delete user."

            );

        }

    }

    if (loading) {

        return (

            <Loader

                text="Loading User..."

            />

        );

    }

    return (


        <div className="container user-details-page">
            <div className="user-card">

                <div className="user-header">

                    <div className="user-avatar">

                        {user.username.charAt(0).toUpperCase()}

                    </div>

                    <div className="user-basic">

                        <h2>{user.username}</h2>

                        <p>{user.email}</p>

                        <div
                            className={`role-badge role-${user.role}`}
                        >

                            {user.role.toUpperCase()}

                        </div>

                    </div>

                </div>

                <div className="info-grid">

                    <div className="info-box">

                        <h4>Username</h4>

                        <p>{user.username}</p>

                    </div>

                    <div className="info-box">

                        <h4>Email</h4>

                        <p>{user.email}</p>

                    </div>

                    <div className="info-box">

                        <h4>Role</h4>

                        <p>{user.role}</p>

                    </div>

                    <div className="info-box">

                        <h4>Status</h4>

                        <p>
                            {
                                user.is_active
                                    ?
                                    "Active"
                                    :
                                    "Blocked"
                            }
                        </p>

                    </div>

                    <div className="info-box">

                        <h4>Joined</h4>

                        <p>
                            {new Date(user.date_joined)
                                .toLocaleDateString()}
                        </p>

                    </div>

                </div>

                {
                    user.profile && (

                        <>

                            <h2 className="section-title">

                                Profile Information

                            </h2>

                            <div className="info-grid">

                                {
                                    Object.entries(user.profile).map(

                                        ([key, value]) => (

                                            <div
                                                key={key}
                                                className="info-box"
                                            >

                                                <h4>

                                                    {
                                                        key
                                                            .replaceAll("_", " ")
                                                            .replace(
                                                                /\b\w/g,
                                                                letter =>
                                                                    letter.toUpperCase()
                                                            )
                                                    }

                                                </h4>

                                                <p className={value 
                                                    ? "" 
                                                    : "not-provided"}>

                                                    {

                                                        value

                                                        ?

                                                        value.toString()

                                                        :

                                                        "Not Provided"

                                                    }

                                                </p>

                                            </div>

                                        )

                                    )
                                }

                            </div>

                            <div className="action-buttons">

                                <button className="edit-btn"
                                onClick={() => {
                                    setEditUsername(user.username);
                                    setEditEmail(user.email);
                                    setEditRole(user.role);
                                    setShowEditModal(true);
                                }}>

                                    Edit User

                                </button>

                                <button
                                    className={
                                        user.is_active
                                            ? "block-btn"
                                            : "edit-btn"
                                    }
                                    onClick={handleToggleStatus}
                                >
                                    {
                                        user.is_active
                                            ? "Block User"
                                            : "Unblock User"
                                    }
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={handleDelete}
                                >
                                    Delete User
                                </button>

                            </div>

                        </>

                    )
                }

            </div>

            {
                showEditModal && (

                    <div className="modal-overlay">

                        <div className="edit-modal">

                            <h2>Edit User</h2>

                            <input
                                type="text"
                                value={editUsername}
                                onChange={(e)=>

                                    setEditUsername(
                                        e.target.value
                                    )

                                }
                            />

                            <input
                                type="email"
                                value={editEmail}
                                onChange={(e)=>

                                    setEditEmail(
                                        e.target.value
                                    )

                                }
                            />

                            <select
                                value={editRole}
                                onChange={(e)=>

                                    setEditRole(
                                        e.target.value
                                    )

                                }
                            >

                                <option value="candidate">

                                    Candidate

                                </option>

                                <option value="employer">

                                    Employer

                                </option>

                                <option value="admin" disabled>

                                    Admin

                                </option>

                            </select>

                            <div className="modal-buttons">

                                <button
                                    onClick={()=>

                                        setShowEditModal(false)

                                    }
                                >

                                    Cancel

                                </button>

                                <button onClick={handleUpdateUser} disabled={saving}>
                                    {
                                        saving
                                        ?
                                        "Saving..."
                                        :
                                        "Save"
                                    }

                                    Save

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>

    );

}

export default AdminUserDetailsPage;










