


import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import Loader from "../../components/common/Loader";

import ResumeSidebar from "../../components/resume/ResumeSidebar";
import ResumePreview from "../../components/resume/ResumePreview";
import PrintableResume from "../../components/resume/PrintableResume";

import { ResumeProvider, useResume } from "../../context/ResumeContext";

import { getCandidateResume } from "../../services/resumeService";
import { adaptResumeData } from "../../utils/resumeAdapter";

import "../../components/resume/print.css";
import "../resume/ResumePage.css";

function EmployerResumeContent() {

    const { userId } = useParams();

    const {

        template,
        setTemplate,
        resume,
        setResume,

    } = useResume();

    const [loading, setLoading] = useState(true);

    const printRef = useRef();

    const handlePrint = useReactToPrint({

        contentRef: printRef,

        documentTitle: "Candidate_Resume",

    });

    useEffect(() => {

        loadResume();

    }, [userId]);

    async function loadResume() {

        try {

            const data = await getCandidateResume(userId);

            setResume(adaptResumeData(data));

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <Loader text="Loading Resume..." />;

    }

    return (

        <div className="resume-page">

            <ResumeSidebar

                onPrint={handlePrint}

            />

            <div style={{ display: "none" }}>

                <PrintableResume

                    ref={printRef}

                />

            </div>

            <ResumePreview />

        </div>

    );

}

function EmployerResumeViewerPage() {

    return (

        <ResumeProvider>

            <EmployerResumeContent />

        </ResumeProvider>

    );

}

export default EmployerResumeViewerPage;

