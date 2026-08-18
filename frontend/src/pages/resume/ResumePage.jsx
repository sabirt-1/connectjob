


import { useEffect, useState } from "react";

import DashboardShell from "../../components/dashboard/DashboardShell";
import Loader from "../../components/common/Loader";
import ResumeTemplateATS from "../../components/resume/ResumeTemplateATS";
import AIResumeAssistant from "../../components/resume/ai/AIResumeAssistant";

import {
    getResume,
    downloadResume,
} from "../../services/resumeService";

import "./ResumePage.css";

function ResumePage() {

    const [resume, setResume] = useState(null);

    const [loading, setLoading] = useState(true);

    const [downloading, setDownloading] = useState(false);

    useEffect(() => {

        loadResume();

    }, []);

    async function loadResume() {

        try {

            const data = await getResume();

            setResume(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function handleDownload() {

        try {

            setDownloading(true);

            const blob = await downloadResume("ats");

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download = "Resume.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error(error);

            alert("Unable to download resume.");

        } finally {

            setDownloading(false);

        }

    }

    function handleUseSummary(summary) {

        setResume(previous => ({

            ...previous,

            personal: {

                ...previous.personal,

                bio: summary,

            },

        }));

    }

    if (loading) {

        return <Loader text="Preparing Resume..." />;

    }

    return (

        <DashboardShell
            title="Resume Builder"
            subtitle="Preview and download your ATS Resume"
        >

            <div className="resume-page-actions">

                <button
                    className="download-btn"
                    onClick={handleDownload}
                    disabled={downloading}
                >

                    {

                        downloading

                            ? "Preparing PDF..."

                            : "Download Resume"

                    }

                </button>

            </div>

            <AIResumeAssistant

                onUseSummary={handleUseSummary}

            />

            <ResumeTemplateATS

                resume={resume}

            />

        </DashboardShell>

    );

}

export default ResumePage;













// import { useEffect, useState } from "react";

// import DashboardShell from "../../components/dashboard/DashboardShell";
// import Loader from "../../components/common/Loader";
// import ResumeTemplateATS from "../../components/resume/ResumeTemplateATS";

// import {
//     getResume,
//     downloadResume,
// } from "../../services/resumeService";

// import "./ResumePage.css";

// function ResumePage() {

//     const [resume, setResume] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [downloading, setDownloading] = useState(false);

//     useEffect(() => {
//         loadResume();
//     }, []);

//     async function loadResume() {

//         try {

//             const data = await getResume();
//             setResume(data);

//         } catch (error) {

//             console.error(error);

//         } finally {

//             setLoading(false);

//         }

//     }

//     async function handleDownload() {

//         try {

//             setDownloading(true);

//             const blob = await downloadResume("ats");

//             const url = window.URL.createObjectURL(blob);

//             const link = document.createElement("a");

//             link.href = url;
//             link.download = "Resume.pdf";

//             document.body.appendChild(link);

//             link.click();

//             link.remove();

//             window.URL.revokeObjectURL(url);

//         } catch (error) {

//             console.error(error);
//             alert("Unable to download resume.");

//         } finally {

//             setDownloading(false);

//         }

//     }

//     if (loading) {
//         return <Loader text="Preparing Resume..." />;
//     }

//     return (

//         <DashboardShell
//             title="Resume Builder"
//             subtitle="Preview and download your ATS Resume"
//         >

//             <div className="resume-page-actions">

//                 <button
//                     className="download-btn"
//                     onClick={handleDownload}
//                     disabled={downloading}
//                 >

//                     {
//                         downloading
//                             ? "Preparing PDF..."
//                             : "Download Resume"
//                     }

//                 </button>

//             </div>

//             <ResumeTemplateATS resume={resume} />

//         </DashboardShell>

//     );

// }

// export default ResumePage;











// important with all modern, classic , ats score 

// import { useRef } from "react";
// import { useReactToPrint } from "react-to-print";

// import ResumeSidebar from "../../components/resume/ResumeSidebar";
// import ResumePreview from "../../components/resume/ResumePreview";
// import PrintableResume from "../../components/resume/PrintableResume";
// import Loader from "../../components/common/Loader";

// import {
//     ResumeProvider,
//     useResume,
// } from "../../context/ResumeContext";

// import "../../components/resume/print.css";
// import "./ResumePage.css";

// function ResumeContent() {

//     const {

//         loading,

//         score,

//     } = useResume();

//     const printRef = useRef();

//     const handlePrint = useReactToPrint({

//         contentRef: printRef,

//         documentTitle: "JobConnect_Resume",

//     });

//     if (loading) {

//         return <Loader text="Loading Resume..." />;

//     }

//     return (

//         <div className="resume-page">

//             <ResumeSidebar onPrint={handlePrint} />

//             <div className="resume-main">

//                 <div className="resume-score-card">

//                     <div>

//                         <h3>

//                             ATS Resume Score

//                         </h3>

//                         <h1>

//                             {score?.score ?? 0}/100

//                         </h1>

//                     </div>

//                 </div>

//                 <div className="resume-checklist">

//                     <h3>

//                         Resume Checklist

//                     </h3>

//                     {

//                         score?.checklist &&

//                         Object.entries(score.checklist).map(

//                             ([key, value]) => (

//                                 <div

//                                     key={key}

//                                     className="check-item"

//                                 >

//                                     <span>

//                                         {key}

//                                     </span>

//                                     <span>

//                                         {

//                                             value

//                                                 ? "✅"

//                                                 : "❌"

//                                         }

//                                     </span>

//                                 </div>

//                             )

//                         )

//                     }

//                 </div>

//                 <div style={{ display: "none" }}>

//                     <PrintableResume ref={printRef} />

//                 </div>

//                 <ResumePreview />

//             </div>

//         </div>

//     );

// }

// function ResumePage() {

//     return (

//         <ResumeProvider>

//             <ResumeContent />

//         </ResumeProvider>

//     );

// }

// export default ResumePage;















// import { useRef } from "react";
// import { useReactToPrint } from "react-to-print";

// import ResumeSidebar from "../../components/resume/ResumeSidebar";
// import ResumePreview from "../../components/resume/ResumePreview";
// import PrintableResume from "../../components/resume/PrintableResume";
// import Loader from "../../components/common/Loader";

// import { ResumeProvider, useResume } from "../../context/ResumeContext";

// import "../../components/resume/print.css";
// import "./ResumePage.css";

// function ResumeContent() {

//     const { loading } = useResume();

//     const printRef = useRef();

//     const handlePrint = useReactToPrint({
//         contentRef: printRef,
//         documentTitle: "JobConnect_Resume",
//     });

//     if (loading) {

//         return <Loader text="Loading Resume..." />;

//     }

//     return (

//         <div className="resume-page">

//             <ResumeSidebar onPrint={handlePrint} />

//             <div style={{ display: "none" }}>

//                 <PrintableResume ref={printRef} />

//             </div>

//             <ResumePreview />

//         </div>

//     );

// }

// function ResumePage() {

//     return (

//         <ResumeProvider>

//             <ResumeContent />

//         </ResumeProvider>

//     );

// }

// export default ResumePage;















// import ResumeSidebar from "../../components/resume/ResumeSidebar";
// import ResumePreview from "../../components/resume/ResumePreview";
// import Loader from "../../components/common/Loader";

// import { ResumeProvider, useResume } from "../../context/ResumeContext";

// import "./ResumePage.css";
// import "../../components/resume/print.css";

// function ResumeContent() {

//     const { loading } = useResume();

//     if (loading) {

//         return <Loader text="Loading Resume..." />;

//     }

//     return (

//         <div className="resume-page">

//             <ResumeSidebar />

//             <ResumePreview />

//         </div>

//     );

// }

// function ResumePage() {

//     return (

//         <ResumeProvider>

//             <ResumeContent />

//         </ResumeProvider>

//     );

// }

// export default ResumePage;













// import { useEffect, useState } from "react";

// import Loader from "../../components/common/Loader";

// import ResumeSidebar from "../../components/resume/ResumeSidebar";
// import ResumePreview from "../../components/resume/ResumePreview";

// import { getResume } from "../../services/resumeService";

// import "./ResumePage.css";

// function ResumePage() {

//     const [resume, setResume] = useState(null);

//     const [loading, setLoading] = useState(true);

//     const [template, setTemplate] = useState("modern");

//     useEffect(() => {

//         loadResume();

//     }, []);

//     async function loadResume() {

//         try {

//             const data = await getResume();

//             setResume(data);

//         } catch (error) {

//             console.log(error);

//         } finally {

//             setLoading(false);

//         }

//     }

//     if (loading) {

//         return <Loader text="Loading Resume..." />;

//     }

//     return (

//         <div className="resume-page">

//             <ResumeSidebar

//                 template={template}

//                 setTemplate={setTemplate}

//             />

//             <ResumePreview

//                 resume={resume}

//                 template={template}

//             />

//         </div>

//     );

// }

// export default ResumePage;

