





import "./WhyChooseUsSection.css";

const features = [
    {
        icon: "🚀",
        title: "Quick Apply",
        desc: "Apply to jobs in seconds."
    },
    {
        icon: "🏢",
        title: "Top Companies",
        desc: "Work with trusted employers."
    },
    {
        icon: "🔍",
        title: "Smart Search",
        desc: "Find jobs that fit your skills."
    },
    {
        icon: "💼",
        title: "Career Growth",
        desc: "Build your future with better opportunities."
    }
];

function WhyChooseUsSection() {

    return (

        <section className="why-section">

            <h2>Why Choose JobConnect?</h2>

            <p>
                Everything you need to find your dream job.
            </p>

            <div className="why-grid">

                {features.map((feature, index) => (

                    <div
                        key={index}
                        className="why-card"
                    >

                        <div className="why-icon">
                            {feature.icon}
                        </div>

                        <h3>
                            {feature.title}
                        </h3>

                        <p>
                            {feature.desc}
                        </p>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default WhyChooseUsSection;