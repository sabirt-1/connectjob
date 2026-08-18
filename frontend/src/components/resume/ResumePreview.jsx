


import "./ResumePreview.css";

import { useResume } from "../../context/ResumeContext";


import ResumeTemplateCreative from "./ResumeTemplateCreative";
import ResumeTemplateExecutive from "./ResumeTemplateExecutive";
import ResumeTemplateMinimal from "./ResumeTemplateMinimal";
import ResumeTemplateTimeline from "./ResumeTemplateTimeline";

function ResumePreview() {

    const { resume, template } = useResume();

    switch (template) {

        case "classic":
            return (
                <div className="resume-preview">
                    <ResumeTemplateClassic resume={resume} />
                </div>
            );

        case "ats":
            return (
                <div className="resume-preview">
                    <ResumeTemplateATS resume={resume} />
                </div>
            );

        case "creative":
            return (
                <div className="resume-preview">
                    <ResumeTemplateCreative resume={resume} />
                </div>
            );

        case "executive":
            return (
                <div className="resume-preview">
                    <ResumeTemplateExecutive resume={resume} />
                </div>
            );

        case "minimal":
            return (
                <div className="resume-preview">
                    <ResumeTemplateMinimal resume={resume} />
                </div>
            );

        case "timeline":
            return (
                <div className="resume-preview">
                    <ResumeTemplateTimeline resume={resume} />
                </div>
            );

        default:
            return (
                <div className="resume-preview">
                    <ResumeTemplateModern resume={resume} />
                </div>
            );
    }
}

export default ResumePreview;










