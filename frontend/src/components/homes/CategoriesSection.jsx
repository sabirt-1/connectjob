




import "./CategoriesSection.css";

import CategoryCard from "../categories/CategoryCard";

const categories = [
    {
        name: "Accounting / Finance",
        jobs: 12,
        icon: "💰",
    },
    {
        name: "Marketing",
        jobs: 24,
        icon: "📢",
    },
    {
        name: "Design",
        jobs: 18,
        icon: "🎨",
    },
    {
        name: "Development",
        jobs: 35,
        icon: "💻",
    },
    {
        name: "Human Resource",
        jobs: 10,
        icon: "👥",
    },
    {
        name: "Automotive Jobs",
        jobs: 8,
        icon: "🚗",
    },
    {
        name: "Customer Service",
        jobs: 15,
        icon: "☎️",
    },
    {
        name: "Health and Care",
        jobs: 20,
        icon: "🏥",
    },
    {
        name: "Project Management",
        jobs: 14,
        icon: "📋",
    },
];

function CategoriesSection() {

    return (

        <section className="categories">

            <h2>
                Popular Job Categories
            </h2>

            <p>
                Find jobs by category
            </p>

            <div className="categories-grid">

                
                {categories.map((category, index) => (

                    <CategoryCard

                        key={index}

                        category={category}

                    />

                ))}

            </div>

        </section>

    );
}

export default CategoriesSection;