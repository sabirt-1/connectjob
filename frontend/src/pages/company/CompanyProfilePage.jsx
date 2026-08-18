


import "./CompanyProfilePage.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getCompanyDetails } from "../../services/companyService";

import CompanyHeader from "../../components/company/CompanyHeader";
import CompanyAbout from "../../components/company/CompanyAbout";
import RecruiterCard from "../../components/company/RecruiterCard";
import CompanyJobs from "../../components/company/CompanyJobs";

import DashboardShell from "../../components/dashboard/DashboardShell";

function CompanyProfilePage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [company, setCompany] = useState(null);

    const [loading, setLoading] = useState(true);

    // Get logged in user
    const user = JSON.parse(localStorage.getItem("user"));

    // Check if employer
    const isEmployer = user?.role === "employer";

    useEffect(() => {

        async function loadCompany() {

            try {

                const data = await getCompanyDetails(id);

                setCompany(data);

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        }

        loadCompany();

    }, [id]);



    if (loading) {

        return (

            <div className="company-page">

                <p className="loading-text">

                    Loading company...

                </p>

            </div>

        );

    }



    if (!company) {

        return (

            <div className="company-page">

                <p className="loading-text">

                    Company not found.

                </p>

            </div>

        );

    }

    const canManageCompany =
        // user?.role === "employer" &&
        company?.is_owner === true;


    return (
        <DashboardShell

            title="My Companies"

            subtitle="Manage your company profiles and recruitment activities"

        >

            <div className="company-page">

                <div className="company-container">

                    {/* <CompanyHeader company={company} />

                    <div className="company-content"> */}

                    <CompanyHeader company={company} />

                    {/* Employer Only Buttons */}

                    {/* {isEmployer && ( */}
                    {canManageCompany && (

                        <div className="company-action-bar">

                            <button
                                className="edit-company-btn"
                                onClick={() =>
                                    // navigate("/employer/company/edit")
                                    navigate(`/employer/company/edit/${company.id}`)
                                }
                            >
                                ✏ Edit Company
                            </button>

                            <button
                                className="create-job-btn"
                                onClick={() =>
                                    navigate("/employer/create-job")
                                }
                            >
                                💼 Create Job
                            </button>

                        </div>
                    )}
                    {/* // )} */}

                    <div className="company-content">

                        <div className="company-left">

                            <CompanyAbout company={company} />

                            <CompanyJobs jobs={company.jobs} />

                        </div>

                        <div className="company-right">

                            <RecruiterCard company={company} />

                        </div>

                    </div>

                </div>

            </div>

        </DashboardShell>

    );

}

export default CompanyProfilePage;

