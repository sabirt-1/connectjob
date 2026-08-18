


import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

import {
    saveJob,
    unsaveJob,
    getSavedStatus,
} from "../../services/applicationService";

import "./SaveJobButton.css";

function SaveJobButton({ jobId, iconOnly = false }) {

    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function loadStatus() {

            try {

                const data = await getSavedStatus(jobId);

                setSaved(data.saved);

            } catch (error) {

                console.log(error);

            }

        }

        if (jobId) {

            loadStatus();

        }

    }, [jobId]);

    const handleClick = async () => {

        if (loading) return;

        try {

            setLoading(true);

            if (saved) {

                await unsaveJob(jobId);

                setSaved(false);

                toast.success("Removed from Saved Jobs");

            } else {

                await saveJob(jobId);

                setSaved(true);

                toast.success("Job Saved");

            }

        } catch (error) {

            console.log(error);

            toast.error("Something went wrong");

        } finally {

            setLoading(false);

        }

    };

    return (

        <button
            type="button"
            className={`save-job-btn ${
                saved ? "saved" : ""
            } ${iconOnly ? "icon-only" : ""}`}
            onClick={handleClick}
            disabled={loading}
            title={
                saved
                    ? "Remove from Saved Jobs"
                    : "Save Job"
            }
        >

            <FaBookmark />

            {!iconOnly && (
                saved
                    ? "Saved"
                    : "Save Job"
            )}

        </button>

    );

    // return (

    //     <button

    //         className={`save-job-btn ${saved ? "saved" : ""}`}

    //         onClick={handleClick}

    //         disabled={loading}

    //     >

    //         <FaBookmark />

    //         {saved ? "Saved" : "Save Job"}

    //     </button>

    // );

}

export default SaveJobButton;

