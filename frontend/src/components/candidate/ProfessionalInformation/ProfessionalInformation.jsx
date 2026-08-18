


import "./ProfessionalInformation.css";

function ProfessionalInformation({

    profile,

    handleChange

}) {

    return (

        <div className="profile-card">

            <h3>

                Professional Information

            </h3>

            <div className="form-column">

                <div>

                    <label>

                        Professional Headline

                    </label>

                    <input

                        type="text"

                        name="headline"

                        value={profile.headline || ""}

                        onChange={handleChange}

                        placeholder="Frontend Developer"

                    />

                </div>

                {/* <div>

                    <label>

                        Skills

                    </label>

                    <textarea

                        name="skills"

                        value={profile.skills || ""}

                        onChange={handleChange}

                        rows={4}

                        placeholder="React, Django, MySQL..."

                    />

                </div> */}

                <div>

                    <label>

                        Experience

                    </label>

                    <textarea

                        name="experience"

                        value={profile.experience || ""}

                        onChange={handleChange}

                        rows={5}

                    />

                </div>

                <div>

                    <label>

                        Education

                    </label>

                    <textarea

                        name="education"

                        value={profile.education || ""}

                        onChange={handleChange}

                        rows={4}

                    />

                </div>

            </div>

        </div>

    );

}

export default ProfessionalInformation;

