


import "./ProfileHeader.css";

function ProfileHeader({

    profile,

    onImageChange,

    completion = 0

}) {

    return (

        <div className="profile-header">

            {/* PROFILE IMAGE + COMPLETION RING */}

            <div className="profile-completion-wrapper">

                <div
                    className="profile-completion-ring"
                    style={{
                        "--completion":
                            `${completion * 3.6}deg`
                    }}
                >

                    <div className="profile-avatar">

                        {

                            profile.image_preview ?

                            (

                                <img

                                    src={
                                        profile.image_preview
                                    }

                                    alt="Preview"

                                />

                            )

                            :

                            profile.profile_image ?

                            (

                                <img

                                    src={
                                        profile.profile_image.startsWith(
                                            "http"
                                        )

                                        ?

                                        profile.profile_image

                                        :

                                        `http://127.0.0.1:8000${profile.profile_image}`

                                    }

                                    alt="Profile"

                                />

                            )

                            :

                            (

                                <div className="avatar-placeholder">

                                    {
                                        profile.username
                                            ?.charAt(0)
                                            .toUpperCase()
                                    }

                                </div>

                            )

                        }

                    </div>

                </div>

                {/* PERCENTAGE */}

                <div className="profile-completion-percent">

                    {completion}%

                </div>

            </div>


            {/* PROFILE INFORMATION */}

            <div className="profile-info">

                <h2>

                    {
                        profile.full_name ||
                        profile.username
                    }

                </h2>

                <p>

                    {
                        profile.headline ||
                        "Candidate"
                    }

                </p>

                <div className="profile-completion-text">

                    Profile Completion:{" "}

                    <strong>

                        {completion}%

                    </strong>

                </div>

            </div>


            {/* CHANGE PHOTO */}

            <label className="upload-photo">

                Change Photo

                <input

                    type="file"

                    hidden

                    accept="image/*"

                    onChange={onImageChange}

                />

            </label>

        </div>

    );

}

export default ProfileHeader;








