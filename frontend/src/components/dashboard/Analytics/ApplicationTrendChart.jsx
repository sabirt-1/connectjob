


import {
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

function ApplicationTrendChart({ data }) {

    const chartData = {

        labels: data.map(
            item => item.month
        ),

        datasets: [

            {

                label: "Applications",

                data: data.map(
                    item => item.applications
                ),

                borderColor: "#1967d2",

                backgroundColor: "rgba(25,103,210,0.15)",

                tension: 0.4,

                fill: true

            }

        ]

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                display: false

            }

        }

    };

    return (

        <div className="chart-card">

            <h3>
                Monthly Applications
            </h3>

            <div className="chart-wrapper">

                <Line
                    data={chartData}
                    options={options}
                />

            </div>

        </div>

    );

}

export default ApplicationTrendChart;

