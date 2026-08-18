


import { useState } from "react";

import Loader from "../../common/Loader";

import { generateCoverLetter } from "../../../services/aiResumeService";

function CoverLetterAssistant() {

    const [form, setForm] = useState({
        job_title: "",
        company: "",
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

            const response = await generateCoverLetter(form);

            setResult(response.response);

        }

        catch (err) {

            console.error(err);

            setError("Unable to generate cover letter.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="ai-resume-card">

            <div className="ai-header">

                <h2>📄 AI Cover Letter</h2>

            </div>

            <p className="ai-description">

                Generate a professional cover letter tailored to a company.

            </p>

            <div className="ai-form">

                <input

                    type="text"

                    name="job_title"

                    placeholder="Job Title"

                    value={form.job_title}

                    onChange={handleChange}

                />

                <input

                    type="text"

                    name="company"

                    placeholder="Company Name"

                    value={form.company}

                    onChange={handleChange}

                />

                <button

                    className="generate-btn"

                    onClick={handleGenerate}

                    disabled={loading}

                >

                    Generate Cover Letter

                </button>

            </div>

            {loading && (

                <Loader text="Generating Cover Letter..." />

            )}

            {error && (

                <div className="ai-error">

                    {error}

                </div>

            )}

            {result && (

                <div className="ai-result">

                    <h3>

                        AI Generated Cover Letter

                    </h3>

                    <p>

                        {result}

                    </p>

                </div>

            )}

        </div>

    );

}

export default CoverLetterAssistant;

