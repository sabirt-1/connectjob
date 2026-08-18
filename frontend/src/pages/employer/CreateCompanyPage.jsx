


import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import CompanyForm from "../../components/company/CompanyForm";

import {
    createCompany
} from "../../services/companyService";

function CreateCompanyPage() {

    const navigate = useNavigate();

    async function handleCreate(formData) {

        try {

            await createCompany(formData);

            toast.success(
                "Company created successfully!"
            );

            // After creating the company, go back to My Company
            navigate("/employer/company");

        }

        catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail ||
                "Unable to create company."
            );

        }

    }

    return (

        <CompanyForm
            submitText="Create Company"
            onSubmit={handleCreate}
        />

    );

}

export default CreateCompanyPage;








