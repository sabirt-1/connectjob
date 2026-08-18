


import { useState } from "react";

import Loader from "../../common/Loader";

import { improveExperience } from "../../../services/aiResumeService";

function ExperienceAssistant() {

    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState("");

    const [error, setError] = useState("");

    async function handleGenerate() {

        if (!description.trim()) {

            setError("Please enter your experience.");

            return;
        }

        setLoading(true);

        setError("");

        setResult("");

        try {

            const response = await improveExperience({

                description,

            });

            setResult(response.response);

        } catch (err) {

            console.error(err);

            setError("Unable to improve experience.");

        }

        setLoading(false);

    }

    return (

        <div className="ai-resume-card">

            <div className="ai-header">

                <h2>💼 Improve Experience</h2>

            </div>

            <p className="ai-description">

                Convert a normal job description into ATS-friendly resume points.

            </p>

            <div className="ai-description">
                <textarea

                    rows={8}

                    placeholder="Paste your work experience..."

                    value={description}

                    onChange={(e) =>

                        setDescription(e.target.value)

                    }

                />
            </div>

            <button

                className="generate-btn"

                onClick={handleGenerate}

            >

                Improve Experience

            </button>

            {loading && (

                <Loader text="Improving..." />

            )}

            {error && (

                <div className="ai-error">

                    {error}

                </div>

            )}

            {result && (

                <div className="ai-result">

                    <h3>

                        Improved Experience

                    </h3>

                    <p>{result}</p>

                </div>

            )}

        </div>

    );

}

export default ExperienceAssistant;

