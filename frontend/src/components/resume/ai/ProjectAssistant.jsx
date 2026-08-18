


import { useState } from "react";

import Loader from "../../common/Loader";

import { generateProject } from "../../../services/aiResumeService";

function ProjectAssistant() {

    const [form, setForm] = useState({
        name: "",
        technologies: "",
        purpose: "",
    });

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState("");

    const [error, setError] = useState("");

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    }

    async function handleGenerate() {

        setLoading(true);

        setResult("");

        setError("");

        try {

            const response = await generateProject(form);

            setResult(response.response);

        } catch (err) {

            console.error(err);

            setError("Unable to generate project.");

        }

        setLoading(false);

    }

    return (

        <div className="ai-resume-card">

            <div className="ai-header">

                <h2>🚀 AI Project Generator</h2>

            </div>

            <p className="ai-description">

                Generate a professional project description.

            </p>

            <div className="ai-form">

                <input
                    name="name"
                    placeholder="Project Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <textarea
                    rows={3}
                    name="technologies"
                    placeholder="Technologies Used"
                    value={form.technologies}
                    onChange={handleChange}
                />

                <textarea
                    rows={3}
                    name="purpose"
                    placeholder="Project Purpose"
                    value={form.purpose}
                    onChange={handleChange}
                />

                <button
                    className="generate-btn"
                    onClick={handleGenerate}
                >
                    Generate Project
                </button>

            </div>

            {loading && (
                <Loader text="Generating Project..." />
            )}

            {error && (
                <div className="ai-error">
                    {error}
                </div>
            )}

            {result && (

                <div className="ai-result">

                    <h3>
                        Generated Project
                    </h3>

                    <p>{result}</p>

                </div>

            )}

        </div>

    );

}

export default ProjectAssistant;

