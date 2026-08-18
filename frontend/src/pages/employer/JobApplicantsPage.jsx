


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {

    getApplicants,
    updateApplicationStatus,
    deleteApplication

}
from "../../services/applicationService";

import EmptyState
from "../../components/common/EmptyState";

// ✅ NEW IMPORT
import ApplicantCard from "../../components/employer/ApplicantCard/ApplicantCard";
// import ApplicantCard
// from "../../components/dashboard/ApplicantCard";

import { toast } from "react-toastify";


function JobApplicantsPage() {

    const { jobId } =
        useParams();

    const [

        applicants,

        setApplicants

    ] = useState([]);

    const loadApplicants =
        async () => {

            try {

                const data =
                    await getApplicants(jobId);

                setApplicants(data);

            }

            catch (error) {

                console.log(error);

            }

        };

    useEffect(() => {

        loadApplicants();

    }, []);


    const handleStatusChange = async (

        applicationId,

        status

    ) => {

        // Ask for confirmation only when hiring
        if (

            status === "hired" &&

            !window.confirm(

                "Are you sure you want to mark this candidate as hired?"

            )

        ) {

            return;

        }

        try {

            await updateApplicationStatus(

                applicationId,

                status

            );

            await loadApplicants();

            // alert(

            //     "Application status updated successfully."

            // );
            toast.success(
                "Application status updated."
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (

        applicationId

    ) => {

        if (

            !window.confirm(

                "Delete this application?"

            )

        ) {

            return;

        }

        try {

            await deleteApplication(

                applicationId

            );

            toast.success(

                "Application deleted."

            );

            loadApplicants();

        }

        catch (error) {

            console.log(error);

            toast.error(

                "Failed to delete."

            );

        }

    };

    return (

        <div className="container">

            <h1>

                Job Applicants

            </h1>

            {

                applicants.length === 0

                    ? (

                        <EmptyState

                            title="No Applicants Yet"

                            description="Candidates who apply for this job will appear here."

                            icon="👥"

                        />

                    )

                    : (

                        // ✅ UPDATED
                        applicants.map((application) => (

                            <ApplicantCard

                                key={application.id}

                                application={application}

                                onStatusChange={handleStatusChange}

                                onDelete={handleDelete}

                            />

                        ))

                    )

            }

        </div>

    );

}

export default JobApplicantsPage;










