


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Loader from "../../components/common/Loader";
import DashboardShell from "../../components/dashboard/DashboardShell";

// import {
//     getMyCompany
// } from "../../services/companyService";
import {
    getMyCompanies,
    deleteCompany,
} from "../../services/companyService";

import "./MyCompaniesPage.css";

function MyCompaniesPage() {

    const navigate = useNavigate();

    // const [company, setCompany] = useState(null);
    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadCompany();

    }, []);

    async function loadCompany() {

        try {

            // const data = await getMyCompany();

            // setCompany(data);
            const data = await getMyCompanies();

            setCompanies(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this company?"
        );

        if (!confirmDelete) return;

        try {

            await deleteCompany(id);

            setCompanies(
                companies.filter(company => company.id !== id)
            );

        }

        catch (error) {

            console.log(error);

            alert("Unable to delete company.");

        }

    }

    if (loading) {

        return <Loader text="Loading Company..." />;

    }

    return (

         <DashboardShell

            title="My Companies"

            subtitle="Manage your company profiles and recruitment activities"

        >

            <div className="my-company-page">

                <div className="company-header">

                    <h1>My Company</h1>

                    {/* <button
                        className="add-company-btn"
                        onClick={() =>
                            navigate("/employer/create-company")
                        }
                    >
                        +
                    </button> */}

                    <button
                        className="add-company-btn"
                        onClick={() =>
                            navigate(
                                "/employer/create-company"
                                // company
                                //     ? "/employer/create-job"
                                //     : "/employer/create-company"
                            )
                        }
                        // title={
                        //     company
                        //         ? "Create Job"
                        //         : "Create Company"
                        // }
                        title="Add Company"
                    >
                        {/* {company ? "💼" : "🏢"} */}
                        +
                    </button>

                </div>

                {/* {!company ? ( */}
                {companies.length === 0 ? (

                    <div className="empty-company">

                        <div style={{fontSize:"70px"}}>

                            🏢

                        </div>

                        <h2>

                            No Company Created Yet

                        </h2>

                        {/* <p>

                            Create your company profile to start posting jobs.

                        </p> */}
                        <p>
                            Before posting jobs, you must create your company profile.
                        </p>

                        <button
                            className="primary-btn"
                            onClick={() => navigate("/employer/create-company")}
                        >
                            Create Company
                        </button>

                    </div>

                ) : (
                    <div className="companies-grid">

                        {

                            companies.map((company) => (

                                <div
                                    className="company-card"
                                    key={company.id}
                                >

                                    <div className="company-top">

                                        <div className="company-logo">

                                            {

                                                company.logo

                                                ?

                                                (

                                                    <img
                                                        src={`http://127.0.0.1:8000${company.logo}`}
                                                        alt={company.company_name}
                                                    />

                                                )

                                                :

                                                (

                                                    <div className="company-logo-placeholder">

                                                        🏢

                                                    </div>

                                                )

                                            }

                                        </div>

                                        <div className="company-name">

                                            <h2>

                                                {company.company_name}

                                            </h2>

                                            <p>

                                                {company.industry}

                                            </p>

                                        </div>

                                    </div>

                                    <div className="company-details">

                                        <div className="detail-box">

                                            <h4>

                                                Location

                                            </h4>

                                            <p>

                                                {company.location}

                                            </p>

                                        </div>

                                        <div className="detail-box">

                                            <h4>

                                                Size

                                            </h4>

                                            <p>

                                                {company.company_size}

                                            </p>

                                        </div>

                                    </div>

                                    <div className="company-actions">

                                        <button

                                            className="primary-btn"

                                            onClick={() =>

                                                navigate(`/company/${company.id}`)

                                            }

                                        >

                                            View

                                        </button>

                                        <button

                                            className="secondary-btn"

                                            onClick={() =>

                                                navigate(`/employer/company/edit/${company.id}`)

                                            }

                                        >

                                            Edit

                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(company.id)}
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )}

            </div>

        </DashboardShell>

    );

}

export default MyCompaniesPage;








