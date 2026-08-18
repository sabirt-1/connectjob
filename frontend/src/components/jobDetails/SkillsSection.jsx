


import "./SkillsSection.css";

function SkillsSection({ job }) {

    // If your backend later provides a skills field,
    // this will automatically use it.
    const skills =
        job.skills && job.skills.length > 0
            ? job.skills
            : [
                  "React",
                  "JavaScript",
                  "Django",
                  "REST API",
                  "HTML",
                  "CSS",
                  "Git",
                  "MySQL",
              ];

    return (
        <section className="details-card">

            <h2>Required Skills</h2>

            <div className="skills-container">

                {skills.map((skill, index) => (

                    <span
                        key={index}
                        className="skill-chip"
                    >
                        {skill}
                    </span>

                ))}

            </div>

        </section>
    );
}

export default SkillsSection;

