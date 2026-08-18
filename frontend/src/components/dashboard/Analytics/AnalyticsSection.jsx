


import "./AnalyticsSection.css";

import ApplicationTrendChart from "./ApplicationTrendChart";
import StatusDistributionChart from "./StatusDistributionChart";

function AnalyticsSection({

    applicationTrend,

    statusDistribution

}) {

    return (

        <section className="analytics-section">

            <div className="analytics-header">

                <h2>

                    Employer Analytics

                </h2>

                <p>

                    Track applications and recruitment insights

                </p>

            </div>

            <div className="analytics-grid">

                <ApplicationTrendChart

                    data={applicationTrend}

                />

                <StatusDistributionChart

                    data={statusDistribution}

                />

            </div>

        </section>

    );

}

export default AnalyticsSection;

