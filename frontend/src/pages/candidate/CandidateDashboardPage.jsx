



import { useEffect, useState } from "react";

import { getCandidateDashboard } from "../../services/applicationService";

import "./CandidateDashboardPage.css";
// import DashboardLayout from "../../components/dashboard/DashboardShell";
// import DashboardShell from "../../components/dashboard/DashboardShell";
import DashboardShell from "../../components/dashboard/DashboardShell";
// import StatCard from "../../components/dashboard/StatCard";
import StatCard from "../../components/common/StatCard/StatCard";
// import Loader from "../../components/common/Loader";
import Loader from "../../components/common/Loader";


import {
    FaBriefcase,
    FaClock,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

function CandidateDashboardPage() {

    const [stats, setStats] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data =
                    await getCandidateDashboard();

                setStats(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        }

        loadDashboard();

    }, []);

    if (loading) {

        // return <h2>Loading...</h2>;
        return <Loader text="Loading Dashboard..." />;

    }

    return (

        <DashboardShell
            title="Candidate Dashboard"
            subtitle="Track your applications and profile"
        >

            <div className="stats-grid">

                <StatCard

                    title="Applications"

                    value={stats.total_applications}

                    icon={<FaBriefcase />}

                    color="#1967d2"

                />

                <StatCard

                    title="Pending"

                    value={stats.pending}

                    icon={<FaClock />}

                    color="#fbbc05"

                />

                <StatCard

                    title="Shortlisted"

                    value={stats.shortlisted}

                    icon={<FaCheckCircle />}

                    color="#34a853"

                />

                <StatCard

                    title="Rejected"

                    value={stats.rejected}

                    icon={<FaTimesCircle />}

                    color="#ea4335"

                />

            </div>

        </DashboardShell>

    );

}

export default CandidateDashboardPage;


