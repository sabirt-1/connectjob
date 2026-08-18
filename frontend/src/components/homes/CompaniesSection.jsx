





import "./CompaniesSection.css";

const companies = [
    {
        name: "Google",
        jobs: 25,
        logo: "🟢"
    },
    {
        name: "Microsoft",
        jobs: 18,
        logo: "🔷"
    },
    {
        name: "Amazon",
        jobs: 32,
        logo: "🟠"
    },
    {
        name: "Netflix",
        jobs: 12,
        logo: "🔴"
    },
    {
        name: "Meta",
        jobs: 20,
        logo: "🔵"
    },
    {
        name: "Adobe",
        jobs: 14,
        logo: "🟥"
    }
];

function CompaniesSection() {

    return (

        <section className="companies">

            <h2>
                Top Companies Hiring Now
            </h2>

            <p>
                Discover opportunities from leading companies
            </p>

            <div className="companies-grid">

                {companies.map((company, index) => (

                    <div
                        key={index}
                        className="company-card"
                    >

                        <div className="company-logo">
                            {company.logo}
                        </div>

                        <h3>
                            {company.name}
                        </h3>

                        <p>
                            {company.jobs} Open Jobs
                        </p>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default CompaniesSection;