


import "./ProfileCompletion.css";

function ProfileCompletion({

    profile

}){

    const fields=[

        "profile_image",

        "resume",

        "full_name",

        "phone",

        "location",

        "headline",

        "skills",

        "experience",

        "education",

        "about",

        "github",

        "linkedin",

        "portfolio"

    ];

    const completed=

        fields.filter(

            field=>Boolean(

                profile[field]

            )

        ).length;

    const percentage=

        Math.round(

            completed/

            fields.length*100

        );

    return(

        <div className="profile-completion">

            <h3>

                Profile Completion

            </h3>

            <div className="progress-bar">

                <div

                    className="progress"

                    style={{

                        width:`${percentage}%`

                    }}

                />

            </div>

            <h2>

                {percentage}%

            </h2>

            <p>

                Complete your profile to improve visibility.

            </p>

        </div>

    );

}

export default ProfileCompletion;

