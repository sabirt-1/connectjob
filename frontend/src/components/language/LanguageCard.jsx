


import "./LanguageCard.css";

import {

    FaLanguage,

    FaEdit,

    FaTrash,

} from "react-icons/fa";

function LanguageCard({

    language,

    onEdit,

    onDelete,

}) {

    const proficiencyClass = language.proficiency
        .toLowerCase()
        .replace(/\s+/g, "-");

    return (

        <div className="language-card">

            <div className="language-header">

                <div className="language-icon">

                    <FaLanguage />

                </div>

                <div>

                    <h3>{language.language}</h3>

                    <span className={`proficiency-badge ${proficiencyClass}`}>

                        {language.proficiency}

                    </span>

                </div>

            </div>

            <div className="language-actions">

                <button

                    className="edit-btn"

                    onClick={() => onEdit(language)}

                >

                    <FaEdit />

                    Edit

                </button>

                <button

                    className="delete-btn"

                    onClick={() => onDelete(language.id)}

                >

                    <FaTrash />

                    Delete

                </button>

            </div>

        </div>

    );

}

export default LanguageCard;

