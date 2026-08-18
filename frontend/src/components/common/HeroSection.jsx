


/* Job Portal Frontend Design */

import "./HeroSection.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [location, setLocation] = useState("");

    const handleSearch = () => {

        navigate(
            `/jobs?title=${title}&location=${location}`
        );

    };

    return (

        <section className="hero">

            <div className="hero-left">

                {/* <h1>

                    There Are

                    <span> 93,178 </span>

                    Postings Here
                    <br />

                    For You!

                </h1> */}
                <h1>
                Find Your
                <span> Dream Job </span>
                <br />
                With India's Fastest
                <br />
                Growing Career Platform
                </h1>

                {/* <p>

                    Find Jobs, Employment &
                    Career Opportunities

                </p> */}
                <p>

                    Discover thousands of verified opportunities,
                    connect with top employers, and build the career
                    you've always wanted.

                </p>

                <div className="hero-search">

                    <input
                        type="text"
                        placeholder="Job title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) =>
                            setLocation(e.target.value)
                        }
                    />

                    <button
                        onClick={handleSearch}
                    >
                        Find Jobs
                    </button>

                </div>

            </div>

            <div className="hero-right">

                <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
                    alt="hero"
                />

            </div>

        </section>

    );

}

export default HeroSection;









