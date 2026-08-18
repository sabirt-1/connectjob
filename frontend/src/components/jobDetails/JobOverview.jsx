


import "./JobOverview.css";

function JobOverview({ job }) {

    const items = [
        {
            title: "Location",
            value: job.location,
            icon: "📍"
        },
        {
            title: "Salary",
            value: `₹ ${Number(job.salary).toLocaleString("en-IN")}`,
            icon: "💰"
        },
        {
            title: "Experience",
            value: job.experience,
            icon: "🧑‍💻"
        },
        {
            title: "Job Type",
            value: job.job_type,
            icon: "💼"
        },
        {
            title: "Vacancies",
            value: job.vacancies,
            icon: "👥"
        },
    ];

    return (

        <div className="overview-card">

            <h2>Job Overview</h2>

            <div className="overview-grid">

                {items.map((item, index) => (

                    <div
                        className="overview-item"
                        key={index}
                    >

                        <div className="overview-icon">

                            {item.icon}

                        </div>

                        <div>

                            <h4>{item.title}</h4>

                            <p>{item.value}</p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default JobOverview;

