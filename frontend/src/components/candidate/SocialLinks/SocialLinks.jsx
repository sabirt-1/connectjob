


import "./SocialLinks.css";

function SocialLinks({

    profile,

    handleChange

}) {

    return (

        <div className="profile-card">

            <h3>

                Social Links

            </h3>

            <div className="form-column">

                <div>

                    <label>

                        GitHub

                    </label>

                    <input

                        type="url"

                        name="github"

                        value={profile.github || ""}

                        onChange={handleChange}

                    />

                </div>

                <div>

                    <label>

                        LinkedIn

                    </label>

                    <input

                        type="url"

                        name="linkedin"

                        value={profile.linkedin || ""}

                        onChange={handleChange}

                    />

                </div>

                <div>

                    <label>

                        Portfolio

                    </label>

                    <input

                        type="url"

                        name="portfolio"

                        value={profile.portfolio || ""}

                        onChange={handleChange}

                    />

                </div>

            </div>

        </div>

    );

}

export default SocialLinks;

