


import "./DashboardGrid.css";

function DashboardGrid({

    left,

    right

}){

    return(

        <div className="dashboard-grid">

            <div>

                {left}

            </div>

            <div>

                {right}

            </div>

        </div>

    );

}

export default DashboardGrid;

