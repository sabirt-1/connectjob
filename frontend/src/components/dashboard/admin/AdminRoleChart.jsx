


import {
    Pie
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import "./AdminRoleChart.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function AdminRoleChart({
    candidates,
    employers,
    admins
}) {

    const data = {

        labels: [

            "Candidates",

            "Employers",

            "Admins"

        ],

        datasets: [

            {

                data: [

                    candidates,

                    employers,

                    admins

                ],

                backgroundColor: [

                    "#00b894",

                    "#1967d2",

                    "#e74c3c"

                ],

                borderWidth: 2,

            }

        ]

    };

    return (

        <div className="chart-card">

            <h2>

                User Distribution

            </h2>

            <Pie

                data={data}

            />

        </div>

    );

}

export default AdminRoleChart;








