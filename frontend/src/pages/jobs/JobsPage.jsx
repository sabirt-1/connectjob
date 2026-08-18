


import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { getJobs } from "../../services/jobService";
import { applyJob } from "../../services/applicationService";

import JobCard from "../../components/jobs/JobCard";
import FilterSidebar from "../../components/jobs/FilterSidebar";
import Loader from "../../components/common/Loader";
import DashboardShell from "../../components/dashboard/DashboardShell";

import "./JobsPage.css";

function JobsPage() {

    const [searchParams] = useSearchParams();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [filters, setFilters] = useState({
        title: searchParams.get("title") || "",
        location: searchParams.get("location") || "",
        category: searchParams.get("category") || "",
        job_type: searchParams.get("job_type") || "",
        experience: searchParams.get("experience") || "",
        company: searchParams.get("company") || "",
        salary: searchParams.get("salary") || "",
        skill: searchParams.get("skill") || "",
        sort: searchParams.get("sort") || ""
    });

    const loadJobs = useCallback(async () => {

        try {

            setLoading(true);

            const data = await getJobs(filters);

            setJobs(data);

            setError("");

        } catch (err) {

            console.log(err);

            setError("Failed to load jobs");

        } finally {

            setLoading(false);

        }

    }, [filters]);

    useEffect(() => {

        const timer = setTimeout(loadJobs, 400);

        return () => clearTimeout(timer);

    }, [loadJobs]);

    const handleApply = async (jobId) => {

        try {

            await applyJob(jobId, {
                cover_letter: "Interested in this position"
            });

            alert("Application Submitted");

        } catch {

            alert("Application Failed");

        }

    };

    if (error) return <h2>{error}</h2>;

    return (

        <DashboardShell
            title="Find Jobs"
            subtitle="Discover your next career opportunity"
        >

            <div className="jobs-container">

                <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                />

                <div className="jobs-list">

                    {loading && <Loader />}

                    {/* <h2>{jobs.length} Jobs Found</h2> */}
                    <div className="jobs-header">

                        <div>

                            <h2>{jobs.length} Jobs Found</h2>

                            <p>
                                Find your next opportunity
                            </p>

                        </div>

                        <button
                            className="clear-filters"
                            onClick={() =>
                                setFilters({
                                    title: "",
                                    location: "",
                                    category: "",
                                    skill: "",
                                    job_type: "",
                                    experience: "",
                                    salary: "",
                                    sort: "",
                                    company: ""
                                })
                            }
                        >
                            Clear Filters
                        </button>

                    </div>

                    <div className="active-filters">

                        {Object.entries(filters).map(([key, value]) =>

                            value ? (

                                <div
                                    key={key}
                                    className="filter-chip"
                                >

                                    <span>
                                        {key}: {value}
                                    </span>

                                    <button
                                        onClick={() =>
                                            setFilters(prev => ({
                                                ...prev,
                                                [key]: ""
                                            }))
                                        }
                                    >
                                        ✕
                                    </button>

                                </div>

                            ) : null

                        )}

                    </div>

                    {loading ? (

                        <Loader />

                    ) : jobs.length === 0 ? (

                        <div className="empty-jobs">

                            <div className="empty-icon">

                                🔍

                            </div>

                            <h2>No Jobs Found</h2>

                            <p>

                                Try changing your filters.

                            </p>

                        </div>

                    ) : (

                        jobs.map((job) => (

                            <JobCard
                                key={job.id}
                                job={job}
                                onApply={handleApply}
                            />

                        ))

                    )}

                </div>

            </div>

        </DashboardShell>

    );

}

export default JobsPage;








