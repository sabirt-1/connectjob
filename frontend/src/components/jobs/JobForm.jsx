


import "./JobForm.css";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../../api/axios";

import { getCategories } from "../../services/categoryService";
import { getMyCompanies } from "../../services/companyService";
import { getSkills } from "../../services/skillService";

import DashboardShell from "../dashboard/DashboardShell";


function JobForm({

    initialData = null,

    isEditing = false,

}) {

    const [companies, setCompanies] = useState([]);

    const [categories, setCategories] = useState([]);

    const [skills, setSkills] = useState([]);

    const [selectedSkills, setSelectedSkills] = useState([]);

    const [customSkills, setCustomSkills] = useState([]);

    const [customSkillInput, setCustomSkillInput] = useState("");

    const [loading, setLoading] = useState(true);


    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [location, setLocation] = useState("");

    const [salary, setSalary] = useState("");

    const [experience, setExperience] = useState("");

    const [jobType, setJobType] = useState("full-time");

    const [vacancies, setVacancies] = useState(1);


    const [companyId, setCompanyId] = useState("");

    const [categoryId, setCategoryId] = useState("");

    const [customCategory, setCustomCategory] = useState("");


    // LOAD COMPANIES + CATEGORIES

    useEffect(() => {

        loadData();

    }, []);


    async function loadData() {

        try {

            const [

                companyResponse,

                categoryResponse,

            ] = await Promise.all([

                getMyCompanies(),

                getCategories(),

            ]);


            setCompanies(companyResponse);

            setCategories(categoryResponse);

        }

        catch (error) {

            console.log(error);

            toast.error(
                "Unable to load form data."
            );

        }

        finally {

            setLoading(false);

        }

    }


    // LOAD EXISTING JOB WHEN EDITING

    useEffect(() => {

        if (!initialData) {

            return;

        }


        setTitle(
            initialData.title || ""
        );


        setDescription(
            initialData.description || ""
        );


        setLocation(
            initialData.location || ""
        );


        setSalary(
            initialData.salary || ""
        );


        setExperience(
            initialData.experience || ""
        );


        setJobType(
            initialData.job_type || "full-time"
        );


        setVacancies(
            initialData.vacancies || 1
        );


        setCompanyId(
            initialData.company?.id || ""
        );


        setCategoryId(
            initialData.category?.id || ""
        );


        setCustomCategory(
            initialData.custom_category || ""
        );


        // IMPORTANT:
        // Backend returns required_skills,
        // NOT skills.
        setSelectedSkills(

            initialData.required_skills?.map(
                skill => skill.id
            ) || []

        );


        // Backend returns:
        //
        // custom_skills: [
        //     { id: 1, name: "Docker" },
        //     { id: 2, name: "AWS" }
        // ]
        //
        setCustomSkills(

            initialData.custom_skills?.map(
                skill => skill.name
            ) || []

        );


    }, [initialData]);


    // LOAD SKILLS BASED ON CATEGORY

    useEffect(() => {

        async function loadSkills() {

            // If custom category is being used,
            // there may not be admin skills for it.
            if (!categoryId) {

                setSkills([]);

                return;

            }


            try {

                const data =
                    await getSkills(categoryId);


                setSkills(data);

            }

            catch (error) {

                console.log(error);

            }

        }


        loadSkills();

    }, [categoryId]);


    // ADMIN CATEGORY SELECT

    function handleCategoryChange(e) {

        const value = e.target.value;


        setCategoryId(value);


        // If admin category selected,
        // remove custom category.
        if (value) {

            setCustomCategory("");

        }

    }


    // CUSTOM CATEGORY

    function handleCustomCategoryChange(e) {

        const value = e.target.value;


        setCustomCategory(value);


        // If employer types a custom category,
        // remove admin category selection.
        if (value.trim()) {

            setCategoryId("");

        }

    }


    // TOGGLE ADMIN SKILL

    function toggleSkill(id) {

        setSelectedSkills(current => {

            if (current.includes(id)) {

                return current.filter(
                    skillId => skillId !== id
                );

            }


            return [

                ...current,

                id

            ];

        });

    }


    // ADD CUSTOM SKILL

    function addCustomSkill() {

        const name =
            customSkillInput.trim();


        if (!name) {

            return;

        }


        // Prevent duplicate custom skills
        // ignoring uppercase/lowercase.
        const alreadyExists =
            customSkills.some(

                skill =>

                    skill.toLowerCase() ===
                    name.toLowerCase()

            );


        if (alreadyExists) {

            setCustomSkillInput("");

            return;

        }


        setCustomSkills(current => [

            ...current,

            name

        ]);


        setCustomSkillInput("");

    }


    // REMOVE CUSTOM SKILL

    function removeCustomSkill(name) {

        setCustomSkills(current =>

            current.filter(
                skill => skill !== name
            )

        );

    }


    // ENTER KEY FOR CUSTOM SKILL

    function handleCustomSkillKeyDown(e) {

        if (e.key === "Enter") {

            e.preventDefault();

            addCustomSkill();

        }

    }


    // RESET FORM

    function resetForm() {

        setTitle("");

        setDescription("");

        setLocation("");

        setSalary("");

        setExperience("");

        setVacancies(1);

        setJobType("full-time");

        setCompanyId("");

        setCategoryId("");

        setCustomCategory("");

        setSelectedSkills([]);

        setCustomSkills([]);

        setCustomSkillInput("");

        setSkills([]);

    }


    // SUBMIT

    async function handleSubmit(e) {

        e.preventDefault();


        

        const payload = {

            title,

            description,

            location,

            salary,

            experience,

            job_type: jobType,

            vacancies,

            company_id:
                companyId || null,

            category_id:
                categoryId || null,

            custom_category:
                customCategory.trim() || "",

            required_skill_ids:
                selectedSkills,

            custom_skill_names:
                customSkills,

        };


        console.log(
            "JOB PAYLOAD:",
            payload
        );


        try {

            if (isEditing) {

                await API.put(

                    `/jobs/update/${initialData.id}/`,

                    payload

                );


                toast.success(
                    "Job updated successfully."
                );

            }

            else {

                await API.post(

                    "/jobs/create/",

                    payload

                );


                toast.success(
                    "Job posted successfully."
                );


                resetForm();

            }

        }

        catch (error) {

            console.log(
                "JOB SAVE ERROR:",
                error
            );


            console.log(
                "BACKEND ERROR:",
                error.response?.data
            );


            toast.error(
                "Unable to save job."
            );

        }

    }


    // LOADING

    if (loading) {

        return <p>Loading...</p>;

    }


    return (

        <DashboardShell

                title="Create Jobs"

                subtitle="Create Jobs for the employer"

        >

            <form
                className="job-form"
                onSubmit={handleSubmit}
            >

                <h2>

                    {

                        isEditing

                            ?

                            "Edit Job"

                            :

                            "Create Job"

                    }

                </h2>


                {/* COMPANY */}

                <select

                    value={companyId}

                    onChange={
                        e =>
                            setCompanyId(
                                e.target.value
                            )
                    }

                >

                    <option value="">

                        Select Company

                    </option>


                    {

                        companies.map(
                            company => (

                                <option

                                    key={company.id}

                                    value={company.id}

                                >

                                    {
                                        company.company_name
                                    }

                                </option>

                            )

                        )

                    }

                </select>


                {/* CATEGORY */}

                <div className="job-form-section">

                    <label>

                        Category

                    </label>


                    <select

                        value={categoryId}

                        onChange={
                            handleCategoryChange
                        }

                    >

                        <option value="">

                            Select Category

                        </option>


                        {

                            categories.map(
                                category => (

                                    <option

                                        key={category.id}

                                        value={category.id}

                                    >

                                        {
                                            category.name
                                        }

                                    </option>

                                )

                            )

                        }

                    </select>


                    <div className="or-divider">

                        OR

                    </div>


                    <input

                        type="text"

                        placeholder="Enter your own category..."

                        value={customCategory}

                        onChange={
                            handleCustomCategoryChange
                        }

                    />

                </div>


                {/* ADMIN SKILLS */}

                <div className="skills-section">

                    <label>

                        Required Skills

                    </label>


                    <p className="skills-help">

                        Select skills provided by
                        the administrator.

                    </p>


                    <div className="skills-list">

                        {

                            !categoryId

                                ?

                                (

                                    <p>

                                        Select an admin
                                        category to see
                                        suggested skills.

                                    </p>

                                )

                                :

                                skills.length === 0

                                    ?

                                    (

                                        <p>

                                            No suggested
                                            skills available
                                            for this category.

                                        </p>

                                    )

                                    :

                                    skills.map(
                                        skill => (

                                            <label

                                                key={skill.id}

                                                className="skill-item"

                                            >

                                                <input

                                                    type="checkbox"

                                                    checked={
                                                        selectedSkills.includes(
                                                            skill.id
                                                        )
                                                    }

                                                    onChange={() =>
                                                        toggleSkill(
                                                            skill.id
                                                        )
                                                    }

                                                />

                                                {
                                                    skill.name
                                                }

                                            </label>

                                        )

                                    )

                        }

                    </div>

                </div>


                {/* CUSTOM SKILLS */}

                <div className="custom-skills-section">

                    <label>

                        Your Own Skills

                    </label>


                    <p className="skills-help">

                        Add skills that are not available
                        in the administrator's list.

                    </p>


                    <div className="custom-skill-input">

                        <input

                            type="text"

                            placeholder="Example: Docker"

                            value={customSkillInput}

                            onChange={
                                e =>
                                    setCustomSkillInput(
                                        e.target.value
                                    )
                            }

                            onKeyDown={
                                handleCustomSkillKeyDown
                            }

                        />


                        <button

                            type="button"

                            onClick={
                                addCustomSkill
                            }

                        >

                            + Add Skill

                        </button>

                    </div>


                    {

                        customSkills.length > 0 && (

                            <div className="custom-skill-list">

                                {

                                    customSkills.map(
                                        skill => (

                                            <div

                                                key={skill}

                                                className="custom-skill-tag"

                                            >

                                                <span>

                                                    {
                                                        skill
                                                    }

                                                </span>


                                                <button

                                                    type="button"

                                                    onClick={() =>
                                                        removeCustomSkill(
                                                            skill
                                                        )
                                                    }

                                                >

                                                    ×

                                                </button>

                                            </div>

                                        )

                                    )

                                }

                            </div>

                        )

                    }

                </div>


                {/* JOB TITLE */}

                <input

                    type="text"

                    placeholder="Job Title"

                    value={title}

                    onChange={
                        e =>
                            setTitle(
                                e.target.value
                            )
                    }

                />


                {/* DESCRIPTION */}

                <textarea

                    placeholder="Description"

                    value={description}

                    onChange={
                        e =>
                            setDescription(
                                e.target.value
                            )
                    }

                />


                {/* LOCATION */}

                <input

                    type="text"

                    placeholder="Location"

                    value={location}

                    onChange={
                        e =>
                            setLocation(
                                e.target.value
                            )
                    }

                />


                {/* SALARY */}

                <input

                    type="number"

                    placeholder="Salary"

                    value={salary}

                    onChange={
                        e =>
                            setSalary(
                                e.target.value
                            )
                    }

                />


                {/* EXPERIENCE */}

                <input

                    type="text"

                    placeholder="Experience"

                    value={experience}

                    onChange={
                        e =>
                            setExperience(
                                e.target.value
                            )
                    }

                />


                {/* JOB TYPE */}

                <select

                    value={jobType}

                    onChange={
                        e =>
                            setJobType(
                                e.target.value
                            )
                    }

                >

                    <option value="full-time">

                        Full Time

                    </option>

                    <option value="part-time">

                        Part Time

                    </option>

                    <option value="remote">

                        Remote

                    </option>

                    <option value="internship">

                        Internship

                    </option>

                </select>


                {/* VACANCIES */}

                <input

                    type="number"

                    min="1"

                    placeholder="Vacancies"

                    value={vacancies}

                    onChange={
                        e =>
                            setVacancies(
                                e.target.value
                            )
                    }

                />


                {/* SUBMIT */}

                <button type="submit">

                    {

                        isEditing

                            ?

                            "Update Job"

                            :

                            "Publish Job"

                    }

                </button>

            </form>

        </DashboardShell>

    );

}


export default JobForm;





