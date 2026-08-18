


import { useEffect, useState } from "react";

import DashboardShell from "../../components/dashboard/DashboardShell";
import Loader from "../../components/common/Loader";

import TemplateSelector from "../../components/resume/templates/TemplateSelector";

import ResumeTemplateATS from "../../components/resume/templates/ResumeTemplateATS";
import ResumeTemplateModern from "../../components/resume/templates/ResumeTemplateModern";
import ResumeTemplateClassic from "../../components/resume/templates/ResumeTemplateClassic";
import ResumeTemplateMinimal from "../../components/resume/templates/ResumeTemplateMinimal";
import ResumeTemplateCreative from "../../components/resume/templates/ResumeTemplateCreative";
import ResumeTemplateExecutive from "../../components/resume/templates/ResumeTemplateExecutive";
import ResumeTemplateTimeline from "../../components/resume/templates/ResumeTemplateTimeline";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { getResume } from "../../services/resumeService";

import "./ResumeBuilderPage.css";

const templates = [
    {
        id: "ats",
        name: "ATS",
    },
    {
        id: "modern",
        name: "Modern",
    },
    {
        id: "classic",
        name: "Classic",
    },
    {
        id: "minimal",
        name: "Minimal",
    },
    {
        id: "creative",
        name: "Creative",
    },
    {
        id: "executive",
        name: "Executive",
    },
    {
        id: "timeline",
        name: "Timeline",
    },
];

function ResumeBuilderPage() {

    const [resume, setResume] = useState(null);

    const [loading, setLoading] = useState(true);

    const [selectedTemplate, setSelectedTemplate] =
        useState("ats");

    useEffect(() => {

        loadResume();

    }, []);

    async function loadResume() {

        try {

            setLoading(true);

            const data = await getResume();

            setResume(data);

        } catch (error) {

            console.error(error);

            alert(
                "Failed to load resume."
            );

        } finally {

            setLoading(false);

        }

    }

    function renderTemplate() {

        switch (selectedTemplate) {

            case "modern":

                return (
                    <ResumeTemplateModern
                        resume={resume}
                    />
                );

            case "classic":

                return (
                    <ResumeTemplateClassic
                        resume={resume}
                    />
                );

            case "minimal":

                return (
                    <ResumeTemplateMinimal
                        resume={resume}
                    />
                );

            case "creative":

                return (
                    <ResumeTemplateCreative
                        resume={resume}
                    />
                );

            case "executive":

                return (
                    <ResumeTemplateExecutive
                        resume={resume}
                    />
                );

            case "timeline":

                return (
                    <ResumeTemplateTimeline
                        resume={resume}
                    />
                );

            case "ats":

            default:

                return (
                    <ResumeTemplateATS
                        resume={resume}
                    />
                );

        }

    }

    async function downloadPDF() {

        const input = document.getElementById("resume-preview");

        const canvas = await html2canvas(input, {
            scale: 2,
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF(
            "p",
            "mm",
            "a4"
        );

        const pdfWidth = pdf.internal.pageSize.getWidth();

        const pdfHeight =
            (canvas.height * pdfWidth) /
            canvas.width;

        pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            pdfWidth,
            pdfHeight
        );

        pdf.save("Resume.pdf");

    }

    if (loading) {

        return (
            <Loader
                text="Loading Resume..."
            />
        );

    }

    return (

        <DashboardShell
            title="Resume Builder"
            subtitle="Choose a template and preview your resume."
        >

            <TemplateSelector
                templates={templates}
                selectedTemplate={
                    selectedTemplate
                }
                onSelect={
                    setSelectedTemplate
                }
            />

            <div className="resume-builder-actions">

                <button
                    onClick={() =>
                        window.print()
                    }
                >
                    Print Resume
                </button>

                {/* <button>

                    Download PDF

                </button> */}
                <button
                    onClick={downloadPDF}
                >

                    Download PDF

                </button>

            </div>

            {/* <div
                className="resume-preview-wrapper"
            >

                {renderTemplate()}

            </div> */}
            <div
                id="resume-preview"
                className="resume-preview-wrapper"
            >

                {renderTemplate()}

            </div>

        </DashboardShell>

    );

}

export default ResumeBuilderPage;

