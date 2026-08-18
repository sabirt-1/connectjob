


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {

    getJob,

    updateJob

} from "../../services/jobService";

import { toast } from "react-toastify";

import Loader from "../../components/common/Loader";

import "./EditJobPage.css";

function EditJobPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [location, setLocation] = useState("");

    const [salary, setSalary] = useState("");

    const [experience, setExperience] = useState("");

    const [jobType, setJobType] = useState("full-time");

    const [vacancies, setVacancies] = useState(1);

    useEffect(() => {

        loadJob();

    }, []);

    async function loadJob() {

        try {

            const job = await getJob(id);

            setTitle(job.title);

            setDescription(job.description);

            setLocation(job.location);

            setSalary(job.salary);

            setExperience(job.experience);

            setJobType(job.job_type);

            setVacancies(job.vacancies);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load job.");

        }

        finally {

            setLoading(false);

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await updateJob(

                id,

                {

                    title,

                    description,

                    location,

                    salary,

                    experience,

                    job_type: jobType,

                    vacancies

                }

            );

            toast.success("Job updated successfully!");

            navigate("/employer/jobs");

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to update job.");

        }

    }

    if (loading) {

        return <Loader text="Loading Job..." />;

    }

    return (

        // <div className="container">

        //     <h1>Edit Job</h1>
        <div className="edit-job-page">

            <div className="edit-job-card">

                <div className="edit-job-header">
                    <h1>Edit Job</h1>
                    <p>Update the details of your job posting.</p>
                </div>

                {/* Form comes next */}
                <form className="edit-job-form" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Job Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(
                                e.target.value
                            )
                        }
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) =>
                            setLocation(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="number"
                        placeholder="Salary"
                        value={salary}
                        onChange={(e) =>
                            setSalary(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="text"
                        placeholder="Experience"
                        value={experience}
                        onChange={(e) =>
                            setExperience(
                                e.target.value
                            )
                        }
                    />

                    <select
                        value={jobType}
                        onChange={(e) =>
                            setJobType(
                                e.target.value
                            )
                        }
                    >

                        <option value="full-time">
                            Full Time
                        </option>

                        <option value="part-time">
                            Part Time
                        </option>

                        <option value="remote">
                            Remote
                        </option>

                        <option value="internship">
                            Internship
                        </option>

                    </select>

                    <input
                        type="number"
                        placeholder="Vacancies"
                        value={vacancies}
                        onChange={(e) =>
                            setVacancies(
                                e.target.value
                            )
                        }
                    />

                    <button type="submit">

                        Update Job

                    </button>

                </form>
            
            </div>

        </div>

    );

}

export default EditJobPage;




