


import "./FilterSidebar.css";

import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import { getSkills } from "../../services/skillService";

function FilterSidebar({ filters, setFilters, handleSearch }) {

    const [categories, setCategories] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {

        async function loadData() {

            try {

                const categoryData = await getCategories();
                const skillData = await getSkills();

                setCategories(categoryData);
                setSkills(skillData);

            } catch (error) {

                console.log(error);

            }

        }

        loadData();

    }, []);

    const updateFilter = (key, value) => {

        setFilters(prev => ({
            ...prev,
            [key]: value
        }));

    };

    const clearFilters = () => {

        setFilters({
            title: "",
            location: "",
            category: "",
            skill: "",
            job_type: "",
            experience: "",
            salary: "",
            sort: "",
            company: ""
        });

    };

    return (

        <aside className="filter-sidebar">

            <h2>Search Jobs</h2>

            <div className="filter-group">

                <label>Job Title</label>

                <input
                    type="text"
                    placeholder="Python Developer"
                    value={filters.title}
                    onChange={(e) =>
                        updateFilter("title", e.target.value)
                    }
                />

            </div>

            <div className="filter-group">

                <label>Location</label>

                <input
                    type="text"
                    placeholder="Mumbai"
                    value={filters.location}
                    onChange={(e) =>
                        updateFilter("location", e.target.value)
                    }
                />

            </div>

            <div className="filter-group">

                <label>Category</label>

                <select
                    value={filters.category}
                    onChange={(e) =>
                        updateFilter("category", e.target.value)
                    }
                >

                    <option value="">All Categories</option>

                    {categories.map(category => (

                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>

                    ))}

                </select>

            </div>

            <div className="filter-group">

                <label>Skill</label>

                <select
                    value={filters.skill}
                    onChange={(e) =>
                        updateFilter("skill", e.target.value)
                    }
                >

                    <option value="">All Skills</option>

                    {skills.map(skill => (

                        <option
                            key={skill.id}
                            value={skill.id}
                        >
                            {skill.name}
                        </option>

                    ))}

                </select>

            </div>

            <div className="filter-group">

                <label>Job Type</label>

                <select
                    value={filters.job_type}
                    onChange={(e) =>
                        updateFilter("job_type", e.target.value)
                    }
                >

                    <option value="">All</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="remote">Remote</option>
                    <option value="internship">Internship</option>

                </select>

            </div>

            <div className="filter-group">

                <label>Experience</label>

                <select
                    value={filters.experience}
                    onChange={(e) =>
                        updateFilter("experience", e.target.value)
                    }
                >

                    <option value="">All</option>
                    <option value="Fresher">Fresher</option>
                    <option value="1 Year">1 Year</option>
                    <option value="2 Years">2 Years</option>
                    <option value="3 Years">3 Years</option>
                    <option value="5+ Years">5+ Years</option>

                </select>

            </div>

            <div className="filter-group">

                <label>Maximum Salary</label>

                <input
                    type="range"
                    min="0"
                    max="3000000"
                    step="50000"
                    value={filters.salary || 0}
                    onChange={(e) =>
                        updateFilter("salary", e.target.value)
                    }
                />

                <span className="salary-value">

                    ₹ {Number(filters.salary || 0).toLocaleString("en-IN")}

                </span>

            </div>

            <div className="filter-group">

                <label>Sort By</label>

                <select
                    value={filters.sort}
                    onChange={(e) =>
                        updateFilter("sort", e.target.value)
                    }
                >

                    <option value="">Default</option>
                    <option value="latest">Latest</option>
                    <option value="salary_high">Highest Salary</option>
                    <option value="salary_low">Lowest Salary</option>

                </select>

            </div>

            <button
                className="search-btn"
                onClick={handleSearch}
            >
                {/* 🔍 Search Jobs */}
                Search Jobs
            </button>

            <button
                className="clear-btn"
                onClick={clearFilters}
            >
                Clear Filters
            </button>

        </aside>

    );

}

export default FilterSidebar;



