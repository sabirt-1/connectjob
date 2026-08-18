


import { useEffect, useState } from "react";

import { getPublicStats } from "../../services/statsService";

import "./StatsSection.css";


function StatsSection() {

    const [stats, setStats] = useState({
        registered_candidates: 0,
        active_jobs: 0,
        applications_submitted: 0,
        companies_hiring: 0
    });

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadStats = async () => {

            try {

                const data = await getPublicStats();

                setStats(data);

            } catch (error) {

                console.error(
                    "Unable to load homepage stats:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        loadStats();

    }, []);


    return (

        <section className="stats">

            <div className="stat-card">

                <h2>
                    {loading
                        ? "..."
                        : stats.registered_candidates}
                </h2>

                <p>
                    Registered Candidates
                </p>

            </div>


            <div className="stat-card">

                <h2>
                    {loading
                        ? "..."
                        : stats.active_jobs}
                </h2>

                <p>
                    Active Jobs
                </p>

            </div>


            <div className="stat-card">

                <h2>
                    {loading
                        ? "..."
                        : stats.applications_submitted}
                </h2>

                <p>
                    Applications Submitted
                </p>

            </div>


            <div className="stat-card">

                <h2>
                    {loading
                        ? "..."
                        : stats.companies_hiring}
                </h2>

                <p>
                    Companies Hiring
                </p>

            </div>

        </section>

    );

}


export default StatsSection;





// import "./StatsSection.css";

// function StatsSection() {

//     return (

//         <section className="stats">

//             <div className="stat-card">

//                 <h2>4M</h2>

//                 <p>Daily Active Users</p>

//             </div>

//             <div className="stat-card">

//                 <h2>12K</h2>

//                 <p>Open Job Positions</p>

//             </div>

//             <div className="stat-card">

//                 <h2>20M</h2>

//                 <p>Stories Shared</p>

//             </div>

//             <div className="stat-card">

//                 <h2>98%</h2>

//                 <p>Success Rate</p>

//             </div>

//         </section>

//     );

// }

// export default StatsSection;


