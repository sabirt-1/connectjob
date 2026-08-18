


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import JobForm from "../../components/jobs/JobForm";
import Loader from "../../components/common/Loader";

import DashboardShell from "../../components/dashboard/DashboardShell";

import { getMyCompany } from "../../services/companyService";

import "./CreateJobPage.css";

function CreateJobPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [company, setCompany] = useState(null);

    useEffect(() => {

        loadCompany();

    }, []);

    async function loadCompany() {

        try {

            const data = await getMyCompany();

            setCompany(data);

        }

        catch (error) {

            console.log(error);

            setCompany(null);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <Loader text="Checking Company..." />;

    }

    if (!company) {

        return (

                <div className="create-job-lock">

                    <div className="lock-card">

                        <div className="lock-icon">

                            🏢

                        </div>

                        <h2>Create Your Company First</h2>

                        <p>

                            You must create a company profile before you can post jobs.

                        </p>

                        <button
                            onClick={() =>
                                navigate("/employer/create-company")
                            }
                        >
                            Create Company
                        </button>

                    </div>

                </div>

            

        );

    }

    return <JobForm />;

}

export default CreateJobPage;



