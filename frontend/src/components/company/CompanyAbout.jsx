


import "./CompanyAbout.css";

function CompanyAbout({ company }) {

    return (

        <section className="company-card">

            <h2>

                About Company

            </h2>

            <p>

                {

                    company.description ||

                    "No company description available."

                }

            </p>

        </section>

    );

}

export default CompanyAbout;

