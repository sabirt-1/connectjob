


import "./PersonalInformation.css";

function PersonalInformation({

    profile,

    handleChange

}) {

    return (

        <div className="profile-card">

            <h3>

                Personal Information

            </h3>

            <div className="form-grid">

                <div>

                    <label>

                        Full Name

                    </label>

                    <input
                        type="text"
                        name="full_name"
                        value={profile.full_name || ""}
                        onChange={handleChange}
                    />

                </div>

                <div>

                    <label>

                        Email

                    </label>

                    <input
                        type="email"
                        value={profile.email || ""}
                        disabled
                    />

                </div>

                <div>

                    <label>

                        Phone

                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={profile.phone || ""}
                        onChange={handleChange}
                    />

                </div>

                <div>

                    <label>

                        Location

                    </label>

                    <input
                        type="text"
                        name="location"
                        value={profile.location || ""}
                        onChange={handleChange}
                    />

                </div>

            </div>

        </div>

    );

}

export default PersonalInformation;

