


import "./SimilarJobs.css";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {

    FaMapMarkerAlt,

    FaBriefcase,

    FaMoneyBillWave,

    FaArrowRight,

} from "react-icons/fa";

import { getSimilarJobs } from "../../services/jobService";

function SimilarJobs({ job }) {

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadSimilarJobs() {

            try {

                const data = await getSimilarJobs(job.id);

                setJobs(data);

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        }

        if(job?.id){

            loadSimilarJobs();

        }

    }, [job.id]);



    if(loading){

        return (

            <section className="details-card">

                <h2>

                    Similar Jobs

                </h2>

                <p>

                    Loading...

                </p>

            </section>

        );

    }



    if(jobs.length===0){

        return (

            <section className="details-card">

                <h2>

                    Similar Jobs

                </h2>

                <p>

                    No similar jobs found.

                </p>

            </section>

        );

    }



    return (

        <section className="details-card">

            <h2>

                Similar Jobs

            </h2>

            <div className="similar-jobs-grid">

                {

                    jobs.map((item)=>(

                        <div

                            className="similar-job-card"

                            key={item.id}

                        >

                            <h3>

                                {item.title}

                            </h3>

                            <h4>

                                {

                                    item.company?.company_name ||

                                    "Company"

                                }

                            </h4>

                            <div className="similar-meta">

                                <span>

                                    <FaMapMarkerAlt />

                                    {item.location}

                                </span>

                                <span>

                                    <FaBriefcase />

                                    {item.job_type}

                                </span>

                                <span>

                                    <FaMoneyBillWave />

                                    ₹ {Number(item.salary).toLocaleString("en-IN")}

                                </span>

                            </div>

                            <Link

                                to={`/jobs/${item.id}`}

                                className="similar-link"

                            >

                                View Job

                                <FaArrowRight />

                            </Link>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default SimilarJobs;










