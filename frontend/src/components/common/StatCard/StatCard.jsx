


import "./StatCard.css";

function StatCard({

    title,

    value,

    icon,

    color,

    subtitle

}) {

    return (

        <div className="stat-card">

            <div
                className="stat-icon"
                style={{
                    background: `${color}15`,
                    color
                }}
            >

                {icon}

            </div>

            <div className="stat-info">

                <h2>

                    {value}

                </h2>

                <h4>

                    {title}

                </h4>

                {subtitle && (

                    <small>

                        {subtitle}

                    </small>

                )}

            </div>

        </div>

    );

}

export default StatCard;





