import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    feedback:
      "This platform helped me earn money while working flexible hours. Highly recommended!",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback:
      "Great experience! The tasks are easy to complete, and payments are on time.",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Mark Taylor",
    feedback:
      "I appreciate the variety of tasks available. It's a reliable platform for extra income.",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Mark",
    feedback:
      "I appreciate the variety of tasks available. It's a reliable platform for extra income.",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 5,
    name: "Mark Smooth",
    feedback:
      "I appreciate the variety of tasks available. It's a reliable platform for extra income.",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white p-6 rounded-tr-full shadow-md text-center animate-slide">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-16 h-16 mx-auto rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-gray-600 mt-2">{testimonial.feedback}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
