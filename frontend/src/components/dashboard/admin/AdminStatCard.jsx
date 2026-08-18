


import "./AdminStatCard.css";

function AdminStatCard({

    title,

    value,

    color

}) {

    return (

        <div
            className="admin-stat-card"
            style={{
                borderTop:`5px solid ${color}`
            }}
        >

            <h4>

                {title}

            </h4>

            <h2>

                {value}

            </h2>

        </div>

    );

}

export default AdminStatCard;

