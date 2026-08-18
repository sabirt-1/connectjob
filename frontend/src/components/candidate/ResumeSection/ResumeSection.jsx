


function ResumeSection({

handleResumeChange,

profile

}){


    return(

        <div className="profile-card">

            <h3>
                Resume
            </h3>


            {
                profile.resume &&
                (
                    <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        View Current Resume
                    </a>
                )
            }

              


            <input

                type="file"

                accept=".pdf"

                onChange={handleResumeChange}

            />


        </div>

    )

}


export default ResumeSection;



