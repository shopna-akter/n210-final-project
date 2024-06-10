import {motion} from 'framer-motion'

const Features = () => {
  const features = [
    {
      icon: 'https://i.ibb.co/dDwC0Jd/download.jpg',
      title: 'Earn Coins by Completing Tasks',
      description: 'Earn rewards by completing various tasks assigned to you. Each task you complete brings you closer to earning coins, which can be redeemed for various rewards.'
    },
    {
      icon: 'https://i.ibb.co/G9S0hxx/task-management-hero-banner.png',
      title: 'Create and Manage Tasks',
      description: 'Easily create tasks and manage them efficiently. Our intuitive task management system allows you to assign tasks, set deadlines, and track progress effortlessly.'
    },
    {
      icon: 'https://i.ibb.co/DV4Rvq7/3d-hand-making-cashless-payment-from-smartphone-107791-16609.jpg',
      title: 'Secure Payments',
      description: 'Enjoy peace of mind with our secure payment system. All transactions are encrypted and protected, ensuring your earnings are safe and accessible only to you.'
    },
    {
      icon: 'https://i.ibb.co/mqjb83F/orinak-49.png',
      title: 'User-Friendly Interface',
      description: 'Navigate through our platform with ease. Our user-friendly interface is designed to provide a seamless experience, making task management and completion simple and enjoyable.'
    },
    {
      icon: 'https://i.ibb.co/Mh01JGf/Google-Analytics-4-Dashboard-Template.png',
      title: 'Detailed Analytics',
      description: 'Get insights into your performance with our detailed analytics. Track your progress, analyze your task completion rates, and improve your efficiency with comprehensive data.'
    },
    {
      icon: 'https://i.ibb.co/3Mzjk1J/notifications-2x.jpg',
      title: 'Customizable Notifications',
      description: 'Stay updated with customizable notifications. Receive alerts for new tasks, upcoming deadlines, and important updates to ensure you never miss a task.'
    },
  ];
  return (
    <div>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Key Features</h1>
        <p className='text-lg text-center '>Highlight your key features with concise descriptions. Engage users with clear, impactful messaging. <br /> Communicate benefits effectively while maintaining readability and visual appeal.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div key={feature.title} whileHover={{ scale: 1.05 }} className="mb-4">
              <div key={index} className="feature bg-white p-6 rounded-lg shadow-lg">
                <img src={feature.icon} alt={feature.title} className="mx-auto h-[200px] mb-4" />
                <h3 className="text-xl font-semibold text-indigo-400 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
