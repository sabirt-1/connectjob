


import "./Card.css";

function Card({ title, subtitle, children, action }) {

    return (

        <div className="card">

            {(title || action) && (

                <div className="card-header">

                    <div>
                        <h3>{title}</h3>
                        {
                            subtitle &&
                            <p>
                                {subtitle}
                            </p>
                        }
                    </div>

                    {action}

                </div>

            )}

            <div className="card-body">

                {children}

            </div>

        </div>

    );

}

export default Card;




