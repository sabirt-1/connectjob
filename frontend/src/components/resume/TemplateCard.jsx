


import "./TemplateCard.css";

function TemplateCard({

    title,

    description,

    preview,

    selected,

    onSelect,

}) {

    return (

        <div
            className={
                selected
                    ? "template-card selected"
                    : "template-card"
            }
            onClick={onSelect}
        >

            <div className="template-preview">

                {

                    preview
                        ? (
                            <img
                                src={preview}
                                alt={title}
                            />
                        )
                        : (
                            <div className="template-placeholder">

                                Resume Preview

                            </div>
                        )

                }

            </div>

            <div className="template-info">

                <h3>

                    {title}

                </h3>

                <p>

                    {description}

                </p>

            </div>

        </div>

    );

}

export default TemplateCard;

