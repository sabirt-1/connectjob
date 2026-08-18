



import "./ApplyJobPage.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

import {
    applyJob
}
from "../../services/applicationService";
import { toast } from "react-toastify";

import DashboardShell from "../../components/dashboard/DashboardShell";

function ApplyJobPage() {

    const { jobId } =
        useParams();

    const [
        coverLetter,
        setCoverLetter
    ] = useState("");

    const [
        resume,
        setResume
    ] = useState(null);

    const handleSubmit =
        async (e) => {

        e.preventDefault();

        const formData =
            new FormData();

        formData.append(
            "cover_letter",
            coverLetter
        );

        formData.append(
            "resume",
            resume
        );

        try {

            await applyJob(
                jobId,
                formData
            );

            // alert(
            //     "Application Submitted"
            // );
            toast.success("Application Submitted");

        } catch (error) {

            // console.log(error);
            console.log(
                "FULL ERROR:",
                error
            );

            console.log(
                "SERVER RESPONSE:",
                error.response?.data
            );

        }

    };

    // if want to make resume upload compulsory 
    // if (!resume) {
    //     toast.error("Please upload your resume");
    //     return;
    // }

    return (

        <DashboardShell
            title="Apply for Job"
            subtitle="Submit your application for this position"
        >

            <div className="apply-page">

                <div className="apply-container">

                    <h1>Apply for this Job</h1>

                    <form
                        className="apply-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label>Cover Letter</label>

                            <textarea
                                placeholder="Introduce yourself and explain why you're a good fit..."
                                value={coverLetter}
                                onChange={(e) =>
                                    setCoverLetter(e.target.value)
                                }
                            />

                        </div>

                        <div className="ja-resume-upload">

                            <h3>Upload Resume (PDF)</h3>

                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) =>
                                    setResume(e.target.files[0])
                                }
                            />

                            {resume && (

                                <p className="file-name">

                                    📄 {resume.name}

                                </p>

                            )}

                        </div>

                        <button
                            className="ja-submit-btn"
                            type="submit"
                        >

                            Submit Application

                        </button>

                    </form>

                </div>

            </div>

    </DashboardShell>

    );

}

export default ApplyJobPage;

