


import "./AdminActivityCard.css";

function AdminActivityCard({

    title,

    items,

    renderItem

}) {

    return (

        <div className="admin-activity-card">

            <h3>

                {title}

            </h3>

            {

                items.length === 0

                ?

                (

                    <p>

                        No data available.

                    </p>

                )

                :

                items.map(renderItem)

            }

        </div>

    );

}

export default AdminActivityCard;

