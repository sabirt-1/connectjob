




import { useEffect, useState } from "react";

// import { getMyJobs } from "../../services/jobService";

// import { getMyCompanies } from "../../services/companyService";
import { getEmployerDashboard } from "../../services/jobService";
import Loader from "../../components/common/Loader";
import DashboardShell from "../../components/dashboard/DashboardShell";
// import RecentJobs from "../../components/dashboard/Widgets/RecentJobs/RecentJobs";
import RecentJobs from "../../components/dashboard/Widgets/RecentJobs";
import StatsSection from "../../components/dashboard/StatsSection";
import DashboardGrid from "../../components/dashboard/DashboardGrid";
import RecentApplications from "../../components/dashboard/Widgets/RecentApplications";
import QuickActions from "../../components/dashboard/Widgets/QuickActions";
import AnalyticsSection from "../../components/dashboard/Analytics/AnalyticsSection";
import WelcomeCard from "../../components/dashboard/WelcomeCard/WelcomeCard";

import "./EmployerDashboardPage.css";


function EmployerDashboardPage() {

    // const [jobsCount, setJobsCount] =
    //     useState(0);

    // const [companiesCount, setCompaniesCount] =
    //     useState(0);

    const [dashboard, setDashboard] =
    useState({

        stats: {},

        recent_jobs: [],

        recent_applications: []

    });

    const [loading, setLoading] =
    useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const data =
                await getEmployerDashboard();

                console.log(
                    "EMPLOYER DASHBOARD DATA:",
                    data
                );

                console.log(
                    "RECENT APPLICATIONS:",
                    data.recent_applications
                );


            setDashboard(data);

        }

        catch (error) {

            // console.log(error);
            toast.error(
                "Failed to load dashboard."
            );


        }

        finally {

            setLoading(false);

        }

    }

    //  Loading UI
    if (loading) {

        // return <h2>Loading...</h2>;
        return <Loader text="Loading Employer Dashboard..." />;

    }

    return (

        <DashboardShell
            title="Employer Dashboard"
            subtitle="Manage your recruitment activities"
        >

            <WelcomeCard />

            <StatsSection
                stats={dashboard.stats}
            />

            <AnalyticsSection

                applicationTrend={
                    dashboard.application_trend || []
                }

                statusDistribution={
                    dashboard.status_distribution || []
                }

            />

            <DashboardGrid

                left={

                    <RecentJobs
                        jobs={dashboard.recent_jobs}
                    />

                }

                right={

                    <QuickActions />

                }

            />

            <RecentApplications

                applications={
                    dashboard.recent_applications
                }

            />

        </DashboardShell>

    );

}

export default EmployerDashboardPage;



