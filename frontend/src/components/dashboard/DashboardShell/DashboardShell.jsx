


import "./DashboardShell.css";

import DashboardSidebar from "../DashboardSidebar";
import DashboardHeader from "../DashboardHeader";

function DashboardShell({

    title,

    subtitle,

    children

}) {

    return (

        <div className="dashboard-shell">

            <DashboardSidebar />

            <div className="dashboard-main">

                <DashboardHeader

                    title={title}

                    subtitle={subtitle}

                />

                <main className="dashboard-content">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default DashboardShell;





