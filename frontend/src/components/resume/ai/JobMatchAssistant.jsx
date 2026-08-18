


import { useState } from "react";

import Loader from "../../common/Loader";

import { jobMatch } from "../../../services/aiResumeService";

function JobMatchAssistant() {

    const [jobDescription, setJobDescription] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState("");

    const [error, setError] = useState("");

    async function handleAnalyze() {

        if (!jobDescription.trim()) {

            setError("Please paste the job description.");

            return;

        }

        setLoading(true);

        setResult("");

        setError("");

        try {

            const response = await jobMatch({

                job_description: jobDescription,

                resume: "",

            });

            setResult(response.response);

        }

        catch (err) {

            console.error(err);

            setError("Unable to analyze job match.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="ai-resume-card">

            <div className="ai-header">

                <h2>🎯 AI Job Match</h2>

            </div>

            <p className="ai-description">

                Paste a job description and let AI compare it with your resume.

            </p>

            <div className="ai-description">
                <textarea

                    rows={10}

                    placeholder="Paste Job Description..."

                    value={jobDescription}

                    onChange={(e) =>

                        setJobDescription(e.target.value)

                    }

                />
            </div>

            <button

                className="generate-btn"

                onClick={handleAnalyze}

                disabled={loading}

            >

                Analyze Job Match

            </button>

            {loading && (

                <Loader text="Analyzing..." />

            )}

            {error && (

                <div className="ai-error">

                    {error}

                </div>

            )}

            {result && (

                <div className="ai-result">

                    <h3>

                        AI Analysis

                    </h3>

                    <p>

                        {result}

                    </p>

                </div>

            )}

        </div>

    );

}

export default JobMatchAssistant;

