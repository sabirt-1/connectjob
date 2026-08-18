


import HeroSection from "../../components/common/HeroSection";
import CategoriesSection from "../../components/homes/CategoriesSection";
import CompaniesSection from "../../components/homes/CompaniesSection";
import FeaturedJobsSection from "../../components/homes/FeaturedJobsSection";
import TestimonialsSection from "../../components/homes/TestimonialsSection";
import WhyChooseUsSection from "../../components/homes/WhyChooseUsSection";
import StatsSection from "../../components/homes/StatsSection";
import Footer from "../../components/homes/Footer";

function HomePage() {

    return (

        <div>

            <HeroSection />
            <CategoriesSection />
            <FeaturedJobsSection />
            <TestimonialsSection />
            <CompaniesSection />
            <WhyChooseUsSection />
            <StatsSection />
            <Footer />

        </div>

    );

}

export default HomePage;




// 1. Home page
// function HomePage() {
//     return <h1>Home Page</h1>
// }

// export default HomePage