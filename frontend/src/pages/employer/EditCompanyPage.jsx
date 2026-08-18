


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CompanyForm from "../../components/company/CompanyForm";
import DashboardShell from "../../components/dashboard/DashboardShell";

// import {
//     getMyCompany,
//     updateCompany,
// } from "../../services/companyService";
import {
    getCompanyDetails,
    updateCompany,
} from "../../services/companyService";


function EditCompanyPage() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [company, setCompany] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchCompany();

    }, [id]);

    async function fetchCompany() {

        try {

            // const data = await getMyCompany();
            const data = await getCompanyDetails(id);

            setCompany(data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load company.");

        }

        finally {

            setLoading(false);

        }

    }

    async function handleUpdate(formData) {

        try {

            await updateCompany(company.id, formData);

            toast.success("Company updated successfully!");

            navigate("/employer/company");

        }

        catch (error) {

            console.log(error);

            console.log(error.response);

            console.log(error.response?.data);

            toast.error(
                JSON.stringify(error.response?.data)
            );

            // toast.error("Unable to update company.");

        }

    }

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (!company) {

        return <h2>No company found.</h2>;

    }

    return (

        <DashboardShell

            title="Edit Company"

            subtitle="Update your company profile and information"

        >

            <CompanyForm

                initialData={company}

                submitText="Save Changes"

                onSubmit={handleUpdate}

            />

        </DashboardShell>

    );

}

export default EditCompanyPage;













