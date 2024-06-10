import Features from "../Feature/Features";
import Hero from "../Hero/Hero";
import HowItWorksSection from "../HowItWorks/HowItWork";
import Testimonial from "../Testimonial/Testimonial";
import TopEarners from "../TopEarners/TopEarners";

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Features></Features>
            <HowItWorksSection></HowItWorksSection>
            <TopEarners></TopEarners>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;