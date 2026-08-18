


import { useEffect, useState } from "react";

import { FaPlus, FaTimes } from "react-icons/fa";

import "./SkillManager.css";

function SkillManager({

    value = "",

    onChange,

}) {

    const [skills, setSkills] = useState([]);

    const [input, setInput] = useState("");

    useEffect(() => {

        if (!value) {

            setSkills([]);

            return;

        }

        const parsedSkills = value
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);

        setSkills(parsedSkills);

    }, [value]);

    function updateSkills(updatedSkills) {

        setSkills(updatedSkills);

        if (onChange) {

            onChange(updatedSkills.join(","));

        }

    }

    function addSkill() {

        const skill = input.trim();

        if (!skill) return;

        const exists = skills.some(

            item =>

                item.toLowerCase() ===

                skill.toLowerCase()

        );

        if (exists) {

            setInput("");

            return;

        }

        updateSkills([

            ...skills,

            skill,

        ]);

        setInput("");

    }

    function removeSkill(skillToRemove) {

        updateSkills(

            skills.filter(

                skill =>

                    skill !== skillToRemove

            )

        );

    }

    function handleKeyDown(event) {

        if (

            event.key === "Enter" ||

            event.key === ","

        ) {

            event.preventDefault();

            addSkill();

        }

    }

    return (

        <div className="skill-manager">

            <div className="skill-manager-header">

                <h2>

                    Skills

                </h2>

            </div>

            <div className="skill-input-row">

                <input

                    type="text"

                    placeholder="Add a skill..."

                    value={input}

                    onChange={(event) =>

                        setInput(event.target.value)

                    }

                    onKeyDown={handleKeyDown}

                />

                <button

                    type="button"

                    onClick={addSkill}

                >

                    <FaPlus />

                    {" "}

                    Add

                </button>

            </div>

            {

                skills.length === 0 ? (

                    <div className="empty-skills">

                        No skills added yet.

                    </div>

                ) : (

                    <div className="skill-list">

                        {

                            skills.map(skill => (

                                <div

                                    key={skill}

                                    className="skill-chip"

                                >

                                    <span>

                                        {skill}

                                    </span>

                                    <button

                                        type="button"

                                        className="skill-delete"

                                        onClick={() =>

                                            removeSkill(skill)

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

export default SkillManager;

