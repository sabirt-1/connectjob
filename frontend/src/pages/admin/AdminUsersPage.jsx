


import { useEffect, useState } from "react";

import { getUsers } from "../../services/adminUserService";

import Loader from "../../components/common/Loader";

import { toast } from "react-toastify";

import UserTable from "../../components/admin/UserTable";

function AdminUsersPage() {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [next, setNext] = useState(null);

    const [previous, setPrevious] = useState(null);

    const [role, setRole] = useState("");

    const [count, setCount] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadUsers();

    }, [
        search,
        role,
        page
    ]);

    async function loadUsers() {

        try {

            const data = await getUsers(
                search,
                role,
                page
            );

            console.log("Users API Response:", data);
            // setUsers(data.results);
            setUsers(data);
            setCount(data.count);
            setNext(data.next);
            setPrevious(data.previous);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load users.");

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <Loader text="Loading Users..." />;

    }

    return (

        <div className="container">

            {/* <h1>

                User Management

            </h1> */}
            <div className="page-header">

                <h1>

                    User Management

                </h1>

                <p>

                    Total Users: {count}
                    {count} Users Found

                </p>

            </div>

            <div className="admin-toolbar">

                <input

                    type="text"

                    placeholder="Search username or email..."

                    value={search}

                    onChange={(e)=>

                        setSearch(

                            e.target.value

                        )

                    }

                />

                <select

                    value={role}

                    onChange={(e)=>

                        setRole(

                            e.target.value

                        )

                    }

                >

                    <option value="">

                        All Roles

                    </option>

                    <option value="candidate">

                        Candidate

                    </option>

                    <option value="employer">

                        Employer

                    </option>

                    <option value="admin">

                        Admin

                    </option>

                </select>

            </div>

            {/* <pre>

                {JSON.stringify(users, null, 4)}

            </pre> */}
            <UserTable users={users} />

            <div className="pagination">

                <button

                    // disabled={page === 1}
                    disabled={!previous}

                    onClick={() => setPage(page - 1)}

                >

                    Previous

                </button>

                <span>

                    Page {page}

                </span>

                <button

                    // disabled={users.length < 10}
                    disabled={!next}

                    onClick={() => setPage(page + 1)}

                >

                    Next

                </button>

            </div>

        </div>

    );

}

export default AdminUsersPage;

