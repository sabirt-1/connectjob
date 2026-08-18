


import { useEffect, useState } from "react";

import { FaPlus, FaTimes } from "react-icons/fa";

import "./LanguageManager.css";

const PROFICIENCY_LEVELS = [

    "Beginner",

    "Intermediate",

    "Professional",

    "Fluent",

    "Native",

];

function LanguageManager({

    value = "",

    onChange,

}) {

    const [languages, setLanguages] = useState([]);

    const [language, setLanguage] = useState("");

    const [level, setLevel] = useState("Professional");

    useEffect(() => {

        if (!value) {

            setLanguages([]);

            return;

        }

        const parsed = value
            .split(",")
            .map(item => item.trim())
            .filter(Boolean)
            .map(item => {

                const [name, proficiency] = item.split("|");

                return {

                    name: name?.trim() || "",

                    proficiency:

                        proficiency?.trim() ||

                        "Professional",

                };

            });

        setLanguages(parsed);

    }, [value]);

    function updateLanguages(updated) {

        setLanguages(updated);

        if (onChange) {

            const formatted = updated

                .map(item =>

                    `${item.name}|${item.proficiency}`

                )

                .join(",");

            onChange(formatted);

        }

    }

    function addLanguage() {

        const name = language.trim();

        if (!name) return;

        const exists = languages.some(

            item =>

                item.name.toLowerCase() ===

                name.toLowerCase()

        );

        if (exists) {

            setLanguage("");

            return;

        }

        updateLanguages([

            ...languages,

            {

                name,

                proficiency: level,

            },

        ]);

        setLanguage("");

        setLevel("Professional");

    }

    function removeLanguage(name) {

        updateLanguages(

            languages.filter(

                item => item.name !== name

            )

        );

    }

    function handleKeyDown(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            addLanguage();

        }

    }

    return (

        <div className="language-manager">

            <div className="language-manager-header">

                <h2>

                    Languages

                </h2>

            </div>

            <div className="language-input-row">

                <input

                    type="text"

                    placeholder="Language"

                    value={language}

                    onChange={(event) =>

                        setLanguage(

                            event.target.value

                        )

                    }

                    onKeyDown={handleKeyDown}

                />

                <select

                    value={level}

                    onChange={(event) =>

                        setLevel(

                            event.target.value

                        )

                    }

                >

                    {

                        PROFICIENCY_LEVELS.map(

                            option => (

                                <option

                                    key={option}

                                    value={option}

                                >

                                    {option}

                                </option>

                            )

                        )

                    }

                </select>

                <button

                    type="button"

                    onClick={addLanguage}

                >

                    <FaPlus />

                    {" "}

                    Add

                </button>

            </div>

            {

                languages.length === 0 ? (

                    <div className="empty-languages">

                        No languages added yet.

                    </div>

                ) : (

                    <div className="language-list">

                        {

                            languages.map(item => (

                                <div

                                    key={item.name}

                                    className="language-chip"

                                >

                                    <div>

                                        <strong>

                                            {item.name}

                                        </strong>

                                        <span>

                                            {item.proficiency}

                                        </span>

                                    </div>

                                    <button

                                        type="button"

                                        className="language-delete"

                                        onClick={() =>

                                            removeLanguage(

                                                item.name

                                            )

                                        }

                                    >

                                        <FaTimes />

                                    </button>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default LanguageManager;

