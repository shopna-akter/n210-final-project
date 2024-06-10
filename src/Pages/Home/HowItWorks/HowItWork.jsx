import { motion } from "framer-motion";

const HowItWorksSection = () => {
    return (
        <div className="text-center">
            <h2 className="font-bold text-2xl">How it work</h2>
            <p>Sections in a website structure content for user clarity. The header includes the logo <br /> and navigation. The main content sections hold the bulk of information, and the footer contains essential links and copyright details.</p>
            <div className="flex justify-center items-center py-16">
                <div className="max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <motion.div className="bg-white rounded-lg shadow-md p-6" whileHover={{ scale: 1.05 }}>
                                <img src={step.icon} alt={step.title} className="w-28 h-28 mx-auto mb-4" />
                                <div className="text-center">
                                    <h3 className="text-xl text-indigo-400 font-semibold mb-2">{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const steps = [
    {
        title: "Register",
        description: "Create an account to get started. It's quick, easy, and free!",
        icon: "https://i.ibb.co/tqj98js/red-yellow-register-now-banner-label-686319-583.jpg",
    },
    {
        title: "Complete Tasks",
        description: "Browse available tasks, complete them with care, and submit your work.",
        icon: "https://i.ibb.co/nfvNtH3/task-complete-isolated-vector-icon-can-be-easily-modified-edited-task-complete-isolated-vector-icon.webp",
    },
    {
        title: "Earn Reward",
        description: "Get rewarded for your completed tasks. Earn coins and unlock exciting rewards!",
        icon: "https://i.ibb.co/fDbJZjr/earn-reward-points-icon-style-vector.jpg",
    },
];

export default HowItWorksSection;
