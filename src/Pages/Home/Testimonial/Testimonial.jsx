import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

const Testimonial = () => {
    const [reviews , setReviews] = useState([])
    useEffect(()=>{
        fetch('https://final-project-server-jade.vercel.app/reviews')
        .then(res => res.json())
        .then(data => {
            setReviews(data)
        })
    },[])
    return (
        <div>
            <div className="my-20 text-center">
                <h2 className="font-bold text-2xl">Testimonials</h2>
                <p>Testimonials offer authentic insights from satisfied customers, enhancing credibility and trust. Share experiences, feedback, <br /> and success stories to inspire confidence and connect with potential customers on a personal level.</p>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews.map(review => <SwiperSlide
                            key={review._id}
                        >
                            <div className="flex flex-col items-center mx-24 mt-8 mb-10">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className="py-8">{review.details}</p>
                                <h3 className="text-2xl font-semibold text-indigo-600">{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonial;