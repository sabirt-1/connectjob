


import "./TemplateSelector.css";

function TemplateSelector({

    templates = [],

    selectedTemplate,

    onSelect,

}) {

    return (

        <div className="template-selector">

            <div className="template-selector-header">

                <h2>

                    Choose Resume Template

                </h2>

                <p>

                    Select a resume design. Your
                    information stays the same—
                    only the layout changes.

                </p>

            </div>

            <div className="template-grid">

                {templates.map((template) => (

                    <div
                        key={template.id}
                        className={
                            selectedTemplate ===
                            template.id
                                ? "template-card active"
                                : "template-card"
                        }
                        onClick={() =>
                            onSelect(template.id)
                        }
                    >

                        <div
                            className={`template-preview ${template.id}`}
                        >

                            <div className="preview-header"></div>

                            <div className="preview-body">

                                {template.id ===
                                "creative" ? (

                                    <>
                                        <div className="preview-sidebar"></div>

                                        <div className="preview-content"></div>
                                    </>

                                ) : template.id ===
                                  "executive" ? (

                                    <>
                                        <div className="preview-sidebar executive"></div>

                                        <div className="preview-content"></div>
                                    </>

                                ) : template.id ===
                                  "timeline" ? (

                                    <div className="preview-timeline">

                                        <span></span>

                                        <span></span>

                                        <span></span>

                                    </div>

                                ) : (

                                    <div className="preview-content"></div>

                                )}

                            </div>

                        </div>

                        <div className="template-info">

                            <h3>

                                {template.name}

                            </h3>

                            <button
                                type="button"
                                className={
                                    selectedTemplate ===
                                    template.id
                                        ? "selected-btn"
                                        : "select-btn"
                                }
                            >

                                {selectedTemplate ===
                                template.id
                                    ? "Selected"
                                    : "Use Template"}

                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default TemplateSelector;

