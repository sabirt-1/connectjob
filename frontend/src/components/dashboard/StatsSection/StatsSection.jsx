


import StatCard from "../../common/StatCard";

import {

    FaBriefcase,

    FaBuilding,

    FaUsers,

    FaCheckCircle,

    FaChartLine

} from "react-icons/fa";

import "./StatsSection.css";

function StatsSection({ stats }) {

    return (

        <div className="stats-grid">

            <StatCard
                title="Jobs Posted"
                value={stats.jobs_posted || 0}
                icon={<FaBriefcase />}
                color="#1967d2"
                subtitle="Total jobs created"
            />

            <StatCard
                title="Companies"
                value={stats.companies || 0}
                icon={<FaBuilding />}
                color="#16a34a"
                subtitle="Registered companies"
            />

            <StatCard
                title="Applications"
                value={stats.applications || 0}
                icon={<FaUsers />}
                color="#f59e0b"
                subtitle="Applications received"
            />

            <StatCard
                title="Active Jobs"
                value={stats.active_jobs || 0}
                icon={<FaCheckCircle />}
                color="#7c3aed"
                subtitle="Currently active"
            />

            <StatCard
                title="Hiring Rate"
                value={`${stats.hiring_rate || 0}%`}
                icon={<FaChartLine />}
                color="#0f766e"
                subtitle="Successful hires"
            />

        </div>

    );

}

export default StatsSection;





