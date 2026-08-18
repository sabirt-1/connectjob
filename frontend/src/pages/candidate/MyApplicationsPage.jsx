


import { useEffect, useState } from "react";

import DashboardShell from "../../components/dashboard/DashboardShell";

import {
    getMyApplications
} from "../../services/applicationService";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/Badge/StatusBadge";

import "./MyApplicationsPage.css";

function MyApplicationsPage() {

    const [
        applications,
        setApplications
    ] = useState([]);

    const [
        loading,
        setLoading
    ] = useState(true);

    useEffect(() => {

        loadApplications();

    }, []);

    async function loadApplications() {

        try {

            const data = await getMyApplications();

            setApplications(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <Loader text="Loading Applications..." />;

    }

    return (

        <DashboardShell

            title="My Applications"

            subtitle="Track all the jobs you've applied for"

        >

            {

                applications.length === 0 ?

                (

                    <EmptyState

                        title="No Applications Yet"

                        description="Start applying for jobs to see your applications here."

                        buttonText="Browse Jobs"

                        buttonLink="/jobs"

                        icon="💼"

                    />

                )

                :

                (

                    <div className="applications-list">

                        {

                            applications.map((app) => (

                                <div

                                    key={app.id}

                                    className="application-card"

                                >

                                    <div className="application-header">

                                        <div>

                                            <h3>

                                                {app.job_title}

                                            </h3>

                                            <p>

                                                <strong>Company:</strong>{" "}

                                                {app.company_name}

                                            </p>

                                        </div>

                                        <StatusBadge

                                            status={app.status}

                                        />

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </DashboardShell>

    );

}

export default MyApplicationsPage;


