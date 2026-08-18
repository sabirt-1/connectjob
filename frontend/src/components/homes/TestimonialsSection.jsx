




import "./TestimonialsSection.css";

const testimonials = [
    {
        name: "Robert Fox",
        role: "UI Designer",
        review:
            "Amazing platform. I got hired within two weeks."
    },
    {
        name: "Sarah Johnson",
        role: "Software Engineer",
        review:
            "Very easy to use and lots of opportunities."
    },
    {
        name: "David Lee",
        role: "Product Manager",
        review:
            "The best job portal I have used."
    }
];

function TestimonialsSection() {

    return (

        <section className="testimonials">

            <h2>
                Testimonials From Our Customers
            </h2>

            <div className="testimonial-grid">

                {testimonials.map((item, index) => (

                    <div
                        key={index}
                        className="testimonial-card"
                    >

                        <h3>{item.name}</h3>

                        <small>{item.role}</small>

                        <p>
                            "{item.review}"
                        </p>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default TestimonialsSection;