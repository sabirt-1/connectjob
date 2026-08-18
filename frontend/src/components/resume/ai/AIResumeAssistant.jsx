


import { useState } from "react";

import ExperienceAssistant from "./ExperienceAssistant";
import ProjectAssistant from "./ProjectAssistant";
import CoverLetterAssistant from "./CoverLetterAssistant";
import JobMatchAssistant from "./JobMatchAssistant";

import Loader from "../../common/Loader";

import {
    generateSummary,
    saveSummary,
} from "../../../services/aiResumeService";

import "./AIResumeAssistant.css";

function AIResumeAssistant({ onUseSummary }) {

    const [form, setForm] = useState({
        name: "",
        skills: "",
        education: "",
        experience: "",
        projects: "",
    });

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [summary, setSummary] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(event) {

        const { name, value } = event.target;

        setForm(previous => ({
            ...previous,
            [name]: value,
        }));

    }

    async function handleGenerate() {

        setLoading(true);
        setError("");
        setSuccess("");
        setSummary("");

        try {

            const response = await generateSummary(form);

            setSummary(response.response);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to generate summary."
            );

        } finally {

            setLoading(false);

        }

    }

    async function handleUseSummary() {

        try {

            setSaving(true);
            setError("");
            setSuccess("");

            await saveSummary(summary);

            if (onUseSummary) {
                onUseSummary(summary);
            }

            setSuccess(
                "Summary saved successfully."
            );

        } catch (err) {

            console.error(err);

            setError(
                "Unable to save summary."
            );

        } finally {

            setSaving(false);

        }

    }

    return (
        <>

        <div className="ai-resume-card">

            <div className="ai-header">

                <h2>✨ AI Resume Assistant</h2>

                <span className="premium-badge">
                    PREMIUM
                </span>

            </div>

            <p className="ai-description">

                Generate an ATS-friendly professional
                summary using AI.

            </p>

            <div className="ai-form">

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <textarea
                    name="skills"
                    placeholder="Skills"
                    rows={3}
                    value={form.skills}
                    onChange={handleChange}
                />

                <textarea
                    name="education"
                    placeholder="Education"
                    rows={3}
                    value={form.education}
                    onChange={handleChange}
                />

                <textarea
                    name="experience"
                    placeholder="Experience"
                    rows={5}
                    value={form.experience}
                    onChange={handleChange}
                />

                <textarea
                    name="projects"
                    placeholder="Projects"
                    rows={4}
                    value={form.projects}
                    onChange={handleChange}
                />

                <button
                    type="button"
                    className="generate-btn"
                    onClick={handleGenerate}
                    disabled={loading}
                >
                    Generate Professional Summary
                </button>

            </div>

            {loading && (
                <Loader text="Generating AI Summary..." />
            )}

            {error && (
                <div className="ai-error">
                    {error}
                </div>
            )}

            {success && (
                <div className="ai-success">
                    {success}
                </div>
            )}

            {summary && (

                <div className="ai-result">

                    <h3>
                        AI Generated Summary
                    </h3>

                    <p>
                        {summary}
                    </p>

                    <button
                        className="use-btn"
                        type="button"
                        onClick={handleUseSummary}
                        disabled={saving}
                    >

                        {saving
                            ? "Saving..."
                            : "Use in Resume"}

                    </button>

                </div>

            )}

        </div>

        <ExperienceAssistant />

        <ProjectAssistant />

        <CoverLetterAssistant />

        <JobMatchAssistant />

    </>

    );

}

export default AIResumeAssistant;

