


import { useEffect, useState } from "react";

import { getSkills } from "../../../services/skillService";

import {
    addCustomSkill,
    deleteCustomSkill
} from "../../../services/profileService";

import "./SkillsSection.css";


function SkillsSection({

    profile,

    setProfile,

}) {

    const [skills, setSkills] = useState([]);

    const [search, setSearch] = useState("");

    const [customSkill, setCustomSkill] = useState("");


    useEffect(() => {

        loadSkills();

    }, []);


    async function loadSkills() {

        try {

            const data = await getSkills();

            setSkills(
                data.filter(skill => skill.is_active)
            );

        }

        catch (error) {

            console.log(error);

        }

    }


    function toggleSkill(id) {

        const current =
            profile.skill_ids || [];


        if (current.includes(id)) {

            setProfile({

                ...profile,

                skill_ids:
                    current.filter(
                        skill => skill !== id
                    )

            });

        }

        else {

            setProfile({

                ...profile,

                skill_ids: [

                    ...current,

                    id

                ]

            });

        }

    }


    // function addCustomSkill() {

    //     const name =
    //         customSkill.trim();


    //     if (!name) {
    //         return;
    //     }


    //     const current =
    //         profile.custom_skill_names || [];


    //     const alreadyExists =
    //         current.some(
    //             skill =>
    //                 skill.toLowerCase() ===
    //                 name.toLowerCase()
    //         );


    //     if (alreadyExists) {

    //         setCustomSkill("");

    //         return;

    //     }


    //     setProfile({

    //         ...profile,

    //         custom_skill_names: [

    //             ...current,

    //             name

    //         ]

    //     });


    //     setCustomSkill("");

    // }

    async function handleAddCustomSkill() {

        const name = customSkill.trim();

        if (!name) {
            return;
        }

        try {

            const newSkill =
                await addCustomSkill(name);

            setProfile({
                ...profile,
                custom_skills: [
                    ...(profile.custom_skills || []),
                    newSkill
                ]
            });

            setCustomSkill("");

        }

        catch (error) {

            console.log(error);

        }
    }


    async function handleRemoveCustomSkill(skillId) {

        try {

            await deleteCustomSkill(skillId);

            setProfile({
                ...profile,

                custom_skills:
                    (profile.custom_skills || [])
                        .filter(
                            skill => skill.id !== skillId
                        )
            });

        }

        catch (error) {

            console.log(error);

        }
    }


    const filteredSkills =
        skills.filter(skill =>

            skill.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        );


    const selectedSkillIds =
        profile.skill_ids || [];


    return (

        <div className="profile-card skills-section">

            <div className="skills-header">

                <div>

                    <h3>
                        Skills
                    </h3>

                    <p>
                        Add skills that highlight your
                        professional expertise.
                    </p>

                </div>

            </div>


            {/* SEARCH */}

            <div className="skills-search">

                <span>
                    🔍
                </span>

                <input

                    type="text"

                    placeholder="Search skills..."

                    value={search}

                    onChange={
                        e =>
                            setSearch(
                                e.target.value
                            )
                    }

                />

            </div>


            {/* BACKEND SKILLS */}

            <div className="skills-subtitle">

                Suggested Skills

            </div>


            <div className="skills-grid">

                {

                    filteredSkills.map(skill => {

                        const selected =
                            selectedSkillIds.includes(
                                skill.id
                            );


                        return (

                            <button

                                type="button"

                                key={skill.id}

                                className={
                                    selected
                                        ? "skill-chip selected"
                                        : "skill-chip"
                                }

                                onClick={() =>
                                    toggleSkill(
                                        skill.id
                                    )
                                }

                            >

                                {skill.name}

                                {selected && (
                                    <span>
                                        ✓
                                    </span>
                                )}

                            </button>

                        );

                    })

                }

            </div>


            {/* CUSTOM SKILLS */}

            <div className="custom-skills-area">

                <div className="skills-subtitle">

                    Your Skills

                </div>


                <div className="selected-skills">

                    {

                        // profile.custom_skill_names
                        profile.custom_skills
                            ?.map(skill => (

                                <div
                                    key={skill.id}
                                    className="custom-skill-tag"
                                >

                                    {skill.name}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveCustomSkill(
                                                skill.id
                                            )
                                        }
                                    >

                                        ×

                                    </button>

                                </div>

                            ))

                    }

                </div>


                <div className="add-custom-skill">

                    <input

                        type="text"

                        value={customSkill}

                        placeholder="Add your own skill..."

                        onChange={
                            e =>
                                setCustomSkill(
                                    e.target.value
                                )
                        }

                        onKeyDown={e => {

                            if (
                                e.key === "Enter"
                            ) {

                                e.preventDefault();

                                // addCustomSkill();
                                handleAddCustomSkill();

                            }

                        }}

                    />

                    <button

                        type="button"

                        onClick={
                            handleAddCustomSkill
                        }

                    >

                        + Add Skill

                    </button>

                </div>

            </div>

        </div>

    );

}


export default SkillsSection;








