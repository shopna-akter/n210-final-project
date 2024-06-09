import Features from "../Feature/Features";
import Hero from "../Hero/Hero";
import Testimonial from "../Testimonial/Testimonial";
import TopEarners from "../TopEarners/TopEarners";

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Features></Features>
            <TopEarners></TopEarners>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;