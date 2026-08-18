


import { useEffect, useState } from "react";

import { getAdminDashboard } from "../../services/adminService";

import Loader from "../../components/common/Loader";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import AdminStatCard from "../../components/dashboard/admin/AdminStatCard";
import AdminActivityCard from "../../components/dashboard/admin/AdminActivityCard";
import AdminRoleChart from "../../components/dashboard/admin/AdminRoleChart";
import AdminRecentApplications from "../../components/dashboard/admin/AdminRecentApplications";


import "./AdminDashboardPage.css";


function AdminDashboardPage() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const data =

                await getAdminDashboard();

            setDashboard(data);

        }

        catch(error){

            console.log(error);

        }

        finally{

            setLoading(false);

        }

    }

    if(loading){

        return (

            <Loader

                text="Loading Dashboard..."

            />

        );

    }

    return(

        <div className="container">

            <DashboardHeader

                title="Admin Dashboard"

                subtitle="Platform Overview"

            />

            <h2>

                Statistics

            </h2>

            {/* <pre>

                {

                    JSON.stringify(

                        dashboard,

                        null,

                        4

                    )

                }

            </pre> */}
            <div
                className="admin-grid"
            >

                <AdminStatCard

                    title="Total Users"

                    value={dashboard.users}

                    color="#1967d2"

                />

                <AdminStatCard

                    title="Candidates"

                    value={dashboard.candidates}

                    color="#00b894"

                />

                <AdminStatCard

                    title="Employers"

                    value={dashboard.employers}

                    color="#e17055"

                />

                <AdminStatCard

                    title="Jobs"

                    value={dashboard.jobs}

                    color="#6c5ce7"

                />

                <AdminStatCard

                    title="Companies"

                    value={dashboard.companies}

                    color="#fdcb6e"

                />

                <AdminStatCard

                    title="Applications"

                    value={dashboard.applications}

                    color="#d63031"

                />

            </div>

            <div className="admin-activity-grid">

                <AdminActivityCard

                    title="Recent Users"

                    items={dashboard.recent_users}

                    renderItem={(user)=>(

                        <div
                            key={user.id}
                            className="admin-item"
                        >

                            <span>

                                {user.username}

                            </span>

                            <span>

                                {user.role}

                            </span>

                        </div>

                    )}

                />

                <AdminActivityCard

                    title="Recent Jobs"

                    items={dashboard.recent_jobs}

                    renderItem={(job)=>(

                        <div
                            key={job.id}
                            className="admin-item"
                        >

                            <span>

                                {job.title}

                            </span>

                            <span>

                                {job.location}

                            </span>

                        </div>

                    )}

                />

            </div>

            <AdminRoleChart

                candidates={dashboard.candidates}

                employers={dashboard.employers}

                admins={dashboard.admins}

            />

            <AdminRecentApplications

                applications={dashboard.recent_applications}

            />

        </div>

    );

}

export default AdminDashboardPage;

