


import "./WelcomeCard.css";

function WelcomeCard() {

    const today = new Date();

    const formattedDate = today.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

    return (

        <section className="welcome-card">

            <div>

                <h1>

                    👋 Welcome Back!

                </h1>

                <p>

                    Here's what's happening with your recruitment today.

                </p>

            </div>

            <div className="welcome-date">

                {formattedDate}

            </div>

        </section>

    );

}

export default WelcomeCard;

