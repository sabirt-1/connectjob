


import "./DashboardSidebar.css";

import {

    FaHome,

    FaUser,

    FaBriefcase,

    FaFileAlt,

    FaHeart,

    FaCog,

    FaSignOutAlt,

    FaBuilding,

    FaHistory

} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function DashboardSidebar() {

    const {

        user,

        logout

    } = useAuth();

    const navigate = useNavigate();

    
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const candidateLinks=[

        {
            label:"Dashboard",
            icon:<FaHome/>,
            path:"/candidate/dashboard"
        },

        {
            label: "Applications",
            icon: <FaBriefcase />,
            path: "/applications"
        },

        {
            label: "My Profile",
            icon: <FaUser />,
            path: "/candidate/profile"
        },

        {
            label: "Resume",
            icon: <FaFileAlt />,
            path: "/resume"
        },

        {
            label: "Saved Jobs",
            icon: <FaHeart />,
            path: "/saved-jobs"
        },

        {
            label: "Recently Viewed",
            icon: <FaHistory />,
            path: "/recent-jobs"
        },

        // {
        //     label: "Settings",
        //     icon: <FaCog />,
        //     path: "/settings"
        // }
    ];

    const employerLinks=[
        {
            label: "Dashboard",
            icon: <FaHome />,
            path: "/employer/dashboard"
        },

        {
            label: "My Jobs",
            icon: <FaBriefcase />,
            path: "/employer/jobs"
        },

        {
            label: "Companies",
            icon: <FaBuilding />,
            path: "/employer/company"
        },

        {
            label: "Profile",
            icon: <FaCog />,
            path: "/employer/profile"
        }

        // {
        //     label: "Settings",
        //     icon: <FaCog />,
        //     path: "/settings"
        // }

    // {
    // label:"Dashboard",

    // icon:<FaHome/>,

    // path:"/employer/dashboard"

    // },

    // {
    // label:"My Jobs",

    // icon:<FaBriefcase/>,

    // path:"/employer/jobs"

    // },

    // {
    // label:"Companies",

    // icon:<FaBuilding/>,

    // path:"/employer/companies"

    // }

    ];   

    const links=

        user?.role==="candidate"

            ? candidateLinks

            : employerLinks;

    return (

        <aside className="dashboard-sidebar">

            
            <nav>

                {

                    links.map((link) => (

                        <NavLink

                            key={link.path}
                            to={link.path}

                        >

                            {link.icon}

                            {link.label}

                        </NavLink>

                    ))

                }

            </nav>

            <div className="sidebar-bottom">

                <div className="user-box">

                    <div className="avatar">

                        {

                            user?.username?.charAt(0).toUpperCase()

                        }

                    </div>

                    <div>

                        <strong>

                            {user?.username}

                        </strong>

                        {/* <p>

                            Candidate

                        </p> */}
                        <p>

                            {

                                user?.role === "candidate"

                                ? "Candidate"

                                : "Employer"

                            }

                        </p>

                    </div>

                </div>

                <button

                    className="logout-btn"

                    // onClick={logout}
                    onClick={handleLogout}

                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </aside>

    );

}

export default DashboardSidebar;



