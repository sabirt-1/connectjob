



import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getJobDetails } from "../../services/jobService";
import { addRecentJob } from "../../services/applicationService";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import DashboardShell from "../../components/dashboard/DashboardShell";

import JobHeader from "../../components/jobDetails/JobHeader";
import JobDescription from "../../components/jobDetails/JobDescription";
import JobOverview from "../../components/jobDetails/JobOverview";
import CompanySidebar from "../../components/jobDetails/CompanySidebar";
import SkillsSection from "../../components/jobDetails/SkillsSection";
import ContactEmployer from "../../components/jobDetails/ContactEmployer";
import SimilarJobs from "../../components/jobDetails/SimilarJobs";

import "./JobDetailsPage.css";

function JobDetailsPage() {

    const { id } = useParams();

    const [job, setJob] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        async function loadData() {

            try {

                const data = await getJobDetails(id);

                setJob(data);

                await addRecentJob(id);

            }

            catch(error){

                console.log(error);

            }

            finally{

                setLoading(false);

            }

        }

        loadData();

    }, [id]);

    if (loading) {

        // return <h2>Loading...</h2>;
        return <Loader />;

    }

    if (!job) {

        // return <h2>Job Not Found</h2>;
        return <EmptyState

            title="No Jobs Yet"

            description="Create your first job posting to start receiving applications."

            buttonText="Create Job"

            buttonLink="/employer/create-job"

        />

    }

    return (

    <DashboardShell
        title="Job Details"
        subtitle="View job information and apply for this position"
    >

        <div className="job-details-page">

            <div className="back-link">

                <Link to="/jobs">

                    ← Back to Jobs

                </Link>

            </div>

            <div className="job-layout">

                {/* LEFT */}

                <div className="job-main">

                    <JobHeader job={job} />

                    <JobDescription description={job.description} />

                    <JobOverview job={job} />

                    <SkillsSection job={job} />

                    <ContactEmployer job={job} />

                    <SimilarJobs job={job} />

                </div>

                {/* RIGHT */}
                <aside className="job-sidebar">

                    <CompanySidebar job={job} />

                </aside>

            </div>

        </div>

    </DashboardShell>

    );

}

export default JobDetailsPage;









































