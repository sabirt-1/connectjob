


import "./CategoryCard.css";

function CategoryCard({ category }) {

    return (

        <div className="category-card">

            <div className="category-icon">

                {category.icon}

            </div>

            <h3>

                {category.name}

            </h3>

            <p>

                {category.jobs} Open Positions

            </p>

            <span className="category-link">

                Explore →

            </span>

        </div>

    );

}

export default CategoryCard;

