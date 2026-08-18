


import { Link } from "react-router-dom";

import {
    FaBuilding,
    FaBriefcase,
    FaClipboardList,
    FaPlusCircle,
} from "react-icons/fa";

import "./QuickActions.css";

function QuickActions() {

    const actions = [

        {
            icon: <FaBuilding />,
            title: "My Companies",
            path: "/employer/company",
        },

        {
            icon: <FaPlusCircle />,
            title: "Create Company",
            path: "/employer/create-company",
        },

        {
            icon: <FaBriefcase />,
            title: "Post Job",
            path: "/employer/create-job",
        },

        {
            icon: <FaClipboardList />,
            title: "Manage Jobs",
            path: "/employer/jobs",
        },

    ];

    return (

        <div className="quick-actions">

            <h3>

                Quick Actions

            </h3>

            {

                actions.map((action) => (

                    <Link

                        key={action.title}

                        to={action.path}

                        className="action-card"

                    >

                        <span>

                            {action.icon}

                        </span>

                        <p>

                            {action.title}

                        </p>

                    </Link>

                ))

            }

        </div>

    );

}

export default QuickActions;










