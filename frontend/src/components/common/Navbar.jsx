

/* Job Portal Frontend Design */

// 2.

import "./Navbar.css";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import { useState } from "react";
// import { getProfile } from "../../services/profileService";
// import { logout } from "../../utils/auth";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const [menuOpen, setMenuOpen] =
        useState(false);

    // const [user, setUser] = 
    //     useState(null);

    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        // setUser(null);
        window.location.href = "/login";
    };


    // useEffect(() => {

    //     async function loadUser() {

    //         const token =
    //             localStorage.getItem(
    //                 "access"
    //             );

    //         if (!token) return;

    //         try {

    //             const profile =
    //                 await getProfile();

    //             console.log(
    //                 "PROFILE DATA:",
    //                 profile
    //             );
    //             console.log(
    //                 "CURRENT USER:",
    //                 user
    //             );

    //             setUser(profile);

    //         } catch {

    //             localStorage.clear();

    //         }

    //     }

    //     loadUser();

    // }, []);

    return (

        <>
            <header className="navbar">

                <div className="nav-left">

                    <Link
                        to="/"
                        className="logo"
                    >
                        JobConnect
                    </Link>

                    <nav className="nav-menu">

                        <Link to="/">
                            Home
                        </Link>

                        {user?.role === "admin" && (

                            <>

                                <Link to="/admin/dashboard">
                                    Dashboard
                                </Link>

                                <Link to="/admin/users">
                                    Users
                                </Link>

                                <Link to="/admin/categories">
                                    Categories
                                </Link>

                                <Link to="/admin/skills">
                                    Skills
                                </Link>

                            </>

                        )}
                        

                        {/* {!user && (

                            <>
                                <Link to="/login">
                                    Login
                                </Link>

                                <Link to="/register">
                                    Register
                                </Link>
                            </>

                        )} */}

                        {user?.role ===
                            "candidate" && (

                            <>
                                <Link to="/jobs">
                                    Find Jobs
                                </Link>

                                <Link
                                    to="/candidate/dashboard"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/applications"
                                >
                                    Applications
                                </Link>
                            </>

                        )}

                        {user?.role ===
                            "employer" && (

                            <>
                                <Link
                                    to="/employer/dashboard"
                                >
                                    Dashboard
                                </Link>

                                {/* <Link
                                    to="/employer/create-job"
                                >
                                    Create Job
                                </Link> */}

                                <Link
                                    to="/employer/jobs"
                                >
                                    My Jobs
                                </Link>

                                {/* <Link
                                    to="/employer/create-company"
                                >
                                    Create Company
                                </Link> */}

                                <Link
                                    to="/employer/company"
                                >
                                    {/* My Companies */}
                                    My Company
                                </Link>

                                {/* <button className="job-btn">
                                    Job Post
                                </button> */}
                            </>

                        )}

                    </nav>

                    {/* <nav className="nav-menu">

                        <Link to="/">Home</Link>

                        <Link to="/jobs">
                            Find Jobs
                        </Link>

                        <Link to="/dashboard">
                            Dashboard
                        </Link> 

                        <Link to="/employer/create-job">
                            Create Job
                        </Link>

                        <Link to="/employer/jobs">
                            My Jobs
                        </Link>

                        <Link to="#">
                            Employers
                        </Link>

                        <Link to="#">
                            Candidates
                        </Link>

                        <Link to="#">
                            Blog
                        </Link>

                    </nav> */}

                </div>

                <div className="nav-right">

                    {/* <div className="auth-buttons">

                        <Link to="/login">
                            <button>
                                Login
                            </button>
                        </Link>

                        <Link to="/register">
                            <button>
                                Register
                            </button>
                        </Link>

                    </div> */}
                    <div className="auth-buttons">

                        {!user ? (

                            <>

                                {/* <Link to="/login">

                                    <button>
                                        Login
                                    </button>

                                </Link>

                                <Link to="/register">

                                    <button>
                                        Register
                                    </button>

                                </Link> */}
                                <Link to="/login">
                                    
                                    <button className="auth-btn">

                                        Login / Register 

                                    </button>

                                </Link>

                            </>

                        ) : (

                            <button className="auth-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        )}

                    </div>

                    {/* <button className="job-btn">
                        Job Post
                    </button> */}

                    <button
                        className="menu-toggle"
                        onClick={() =>
                            setMenuOpen(
                                true
                            )
                        }
                    >
                        ☰
                    </button>

                </div>

            </header>

            {menuOpen && (

                <>
                    <div
                        className="overlay"
                        onClick={() =>
                            setMenuOpen(
                                false
                            )
                        }
                    />

                    <div className="mobile-sidebar">

                        <div className="sidebar-header">

                            <h2>
                                JobConnect
                            </h2>

                            <button
                                onClick={() =>
                                    setMenuOpen(
                                        false
                                    )
                                }
                            >
                                ✕
                            </button>

                        </div>

                        {/* <Link to="/">
                            Home
                        </Link>

                        <Link to="/jobs">
                            Find Jobs
                        </Link>

                        <Link to="/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/employer/create-job">
                            Create Job
                        </Link>

                        <Link to="/employer/jobs">
                            My Jobs
                        </Link>

                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link> */}

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/jobs">
                            Find Jobs
                        </Link>

                        {!user && (

                            <Link to="/login">
                                Login / Register
                            </Link>

                        )}

                        {user?.role === "admin" && (

                            <>

                                <Link to="/admin/dashboard">
                                    Dashboard
                                </Link>

                                <Link to="/admin/users">
                                    Users
                                </Link>

                                <Link to="/admin/categories">
                                    Categories
                                </Link>

                                <Link to="/admin/skills">
                                    Skills
                                </Link>

                            </>

                        )}

                        {user?.role === "candidate" && (

                            <>
                                <Link to="/candidate/dashboard">
                                    Dashboard
                                </Link>

                                <Link to="/applications">
                                    Applications
                                </Link>
                            </>

                        )}
                        {user?.role === "candidate" && (

                            <button className="upload-btn">
                                Upload CV
                            </button>

                        )}

                        {user?.role === "employer" && (

                            <>
                                <Link to="/employer/dashboard">
                                    Dashboard
                                </Link>

                                {/* <Link to="/employer/create-job">
                                    Create Job
                                </Link> */}

                                <Link to="/employer/jobs">
                                    My Jobs
                                </Link>

                                <Link to="/employer/company">
                                    Companies
                                </Link>
                            </>

                        )}

                    </div>

                </>
            )}

        </>
    );

}

export default Navbar;


