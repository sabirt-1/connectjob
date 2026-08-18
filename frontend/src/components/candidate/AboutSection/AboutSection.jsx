


import "./AboutSection.css";

function AboutSection({

    profile,

    handleChange

}){

    return(

        <div className="profile-card">

            <h3>

                About Me

            </h3>

            <div className="cp-about">
                <textarea

                    name="about"

                    value={profile.about || ""}

                    onChange={handleChange}

                    rows={8}

                    placeholder="Tell employers about yourself..."

                />

            </div>

        </div>

    );

}

export default AboutSection;

