


import {
    Pie
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function StatusDistributionChart({ data }) {

    const chartData = {

        labels: data.map(
            item => item.status
        ),

        datasets: [

            {

                label: "Applications",

                data: data.map(
                    item => item.count
                ),

                backgroundColor: [

                    "#1967d2",
                    "#00b894",
                    "#f39c12",
                    "#e74c3c",
                    "#8e44ad"

                ],

                borderWidth: 1

            }

        ]

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                position: "bottom"

            }

        }

    };

    return (

        <div className="chart-card">

            <h3>

                Applications by Status

            </h3>

            <div className="chart-wrapper">

                <Pie
                    data={chartData}
                    options={options}
                />

            </div>

        </div>

    );

}

export default StatusDistributionChart;

