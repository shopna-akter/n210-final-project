import { Swiper, SwiperSlide } from 'swiper/react';
import { Typewriter } from 'react-simple-typewriter'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const Hero = () => {
    return (
        <div>
            <Swiper
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper -z-10"
            >
                <SwiperSlide>
                    <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h1 className="md:text-4xl text-xl font-bold text-center lg:text-left">
                            <Typewriter
                                words={['Experience Iconic Destinations']}
                                loop={false}
                                cursor
                                cursorStyle='_'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </h1>
                        <p className="md:text-lg text-sm mt-4 text-center lg:text-left">Explore the world most iconic tourist spots and immerse yourself in unforgettable experiences. From historic landmarks to natural wonders, discover the beauty and charm of diverse destinations waiting to be explored.</p>
                    </div>
                    <img src="https://i.ibb.co/6wkvvL9/15.jpg" alt="" className="w-full md:h-[500px] h-[300px]" />
                </SwiperSlide>
                <SwiperSlide className='bg-gradient-to- from-indigo-500 to-pink-500'>
                    <div className="text-white  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h1 className="md:text-4xl text-xl font-bold text-center lg:text-left"><Typewriter
                            words={['Embrace Adventure and Discovery']}
                            loop={false}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        /></h1>
                        <p className="md:text-lg text-sm mt-4 text-center lg:text-left">Embark on thrilling adventures and discover hidden gems off the beaten path. Whether you seek adrenaline-pumping activities or serene landscapes, our curated tours offer excitement and wonder at every turn.</p>
                    </div>
                    <img src="https://i.ibb.co/8DdHKcf/slider-2-image.png" alt="" className="w-full  md:h-[500px] h-[300px]" />
                </SwiperSlide>
                <SwiperSlide>
                    <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h1 className="md:text-4xl text-xl font-bold text-center lg:text-left"><Typewriter
                            words={['Experience Cultural Richness']}
                            loop={false}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        /></h1>
                        <p className="md:text-lg text-sm mt-4 text-center lg:text-left">Immerse yourself in vibrant cultures and traditions as you journey through diverse destinations. From colorful festivals to culinary delights, our tours offer authentic experiences that celebrate the richness of global heritage.</p>
                    </div>
                    <img src="https://i.ibb.co/qpLLTxk/h3.jpg" alt="" className="w-full md:h-[500px] h-[300px]" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Hero;