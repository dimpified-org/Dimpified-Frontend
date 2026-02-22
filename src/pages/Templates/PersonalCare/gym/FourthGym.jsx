import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaQuoteLeft,
  FaQuoteRight,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaDumbbell,
  FaRunning,
  FaUserCog,
  FaChalkboardTeacher,
  FaSuperpowers,
  FaUserAlt,
  FaUsersCog,
  FaUserFriends,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import { gym } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
// --- Hero Section ---
const images = [
  "https://gfa-tech.com/dimp-template-images/gym/gym-blog6.jpg",
  "https://gfa-tech.com/dimp-template-images/gym/Gym4.4.jpg",
  "https://gfa-tech.com/dimp-template-images/gym/Gym4.3.jpg",
];

// App Component
const FourthGym = ({ userDetails }) => {
  const [hovered, setHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'NG'

  const features = [
    {
      id: 1,
      title: "Tailored Memberships",
      description:
        "Customized membership plans that adapt to your fitness level, goals, and schedule for optimal results.",
      icon: <FaUserFriends className="w-16 h-16 text-teal-500" />,
      color: "text-black",
    },
    {
      id: 2,
      title: "Diverse Fitness Classes",
      description:
        "From HIIT to yoga, our expert-led classes cater to all levels and keep your workouts fresh and engaging.",
      icon: <FaDumbbell className="w-16 h-16 text-teal-500" />,
      color: "text-[#00C0D7]",
    },
    {
      id: 3,
      title: "Certified Trainers",
      description:
        "Get personalized coaching from our experienced trainers who are committed to your success.",
      icon: <FaChalkboardTeacher className="w-16 h-16 text-teal-500" />,
      color: "text-black",
    },
  ];

  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  const testimonials = [
    {
      image: "https://gfa-tech.com/dimp-template-images/gym/Gym4.2.jpg",
      text: "Before joining this gym, I struggled with weight for years. But in just 3 months, I lost 15kg! The trainers understand Nigerian body types and designed workouts that actually work. No more 'African potbelly' for me!",
      name: "Chinedu Okonkwo",
      role: "Businessman | Lagos",
    },
    {
      image: "https://gfa-tech.com/dimp-template-images/gym/Gym4.2.jpg",
      text: "I used to think gyms were only for 'ajebutter' people, but this place changed my mind. The trainers speak Pidgin when motivating me, and the community feels like family. Now, I’m stronger than ever—even my mama noticed!",
      name: "Amina Yusuf",
      role: "Market Trader | Kano",
    },
    {
      image: "https://gfa-tech.com/dimp-template-images/gym/Gym4.3.jpg",
      text: "As a footballer, I needed a gym that understands African athleticism. The trainers helped me build explosive strength without bulking too much. My coach says my performance has improved by 40%—thanks to this gym!",
      name: "Emeka Okafor",
      role: "Professional Footballer | Enugu",
    },
    {
      image: "https://gfa-tech.com/dimp-template-images/gym/Gym4.4.jpg",
      text: "I was tired of ‘one-size-fits-all’ gyms that don’t consider Nigerian diets. Here, they gave me a meal plan that works with our local food—no more starving myself! I’ve never been this fit and still enjoy my jollof rice.",
      name: "Chioma Eze",
      role: "Banker | Abuja",
    },
  ];

  return (
    <div>
      {/* Navigation */}
      <nav className="w-full bg-white z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center text-2xl font-bold text-teal-500">
            <FaDumbbell className="w-10 h-10 mr-2" />
            <span>{userDetails && userDetails.ecosystemName}</span>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-teal-500"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <ul className="hidden md:flex space-x-6 text-black font-medium">
            {[
              "Home",
              "About Us",
              "Services",
              "Memberships",
              "Facility",
              "Contact Us",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                  className="hover:text-teal-700 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <button
              onClick={handleModalOpen}
              className="inline-block bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition"
            >
              Join us now!
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white px-4 pb-4">
            <ul className="flex flex-col space-y-4 text-teal-500 font-medium">
              {[
                "Home",
                "About Us",
                "Services",
                "Memberships",
                "Facility",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                    className="block hover:text-teal-700"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative text-white text-center mt-4">
        <div className="absolute inset-0 bg-teal-900 bg-opacity-40 flex flex-col items-center justify-center z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
            Welcome to
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            {userDetails && userDetails.ecosystemName} Gym
          </h1>
          <p className="text-lg sm:text-xl mt-4">
            Transform your body. Transform your life.
          </p>
        </div>
        <img
          src="https://gfa-tech.com/dimp-template-images/gym/gym4.1.png"
          alt="Fitness"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* About Us Section */}
      <section
        id="aboutus"
        className="relative lg:px-32 flex flex-col md:flex-row items-center p-6 md:p-12 bg-gray-100 gap-8"
      >
        <div className="w-full md:w-1/2">
          <h4 className="text-gray-500 uppercase font-semibold tracking-wider">
            YOUR TRANSFORMATION STARTS TODAY
          </h4>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mt-2">
            Build Your <span className="text-teal-500">Desired Body</span> With
            Us
          </h1>
          <p className="text-gray-600 text-lg mt-4 font-medium">
            Join BodyShape and get 24/7 access to premium equipment, expert
            coaching, and a community that pushes you further.
          </p>
          <p className="text-gray-600 mt-4">
            Our members see results 3x faster than average gym-goers. Whether
            you're looking to lose weight, build muscle, or boost your athletic
            performance, our certified trainers will create a personalized plan
            to help you smash your goals.
          </p>
          <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg border border-teal-100 w-full max-w-lg">
            <h3 className="font-bold text-gray-800 text-lg mb-4">
              WHAT YOU'LL GET:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <p className="flex items-center text-gray-700 font-medium">
                <span className="bg-teal-500 text-white p-1 rounded-full mr-3">
                  ✓
                </span>{" "}
                1-on-1 Training Sessions
              </p>
              <p className="flex items-center text-gray-700 font-medium">
                <span className="bg-teal-500 text-white p-1 rounded-full mr-3">
                  ✓
                </span>{" "}
                Custom Nutrition Plans
              </p>
              <p className="flex items-center text-gray-700 font-medium">
                <span className="bg-teal-500 text-white p-1 rounded-full mr-3">
                  ✓
                </span>{" "}
                24/7 Gym Access
              </p>
              <p className="flex items-center text-gray-700 font-medium">
                <span className="bg-teal-500 text-white p-1 rounded-full mr-3">
                  ✓
                </span>{" "}
                Group Fitness Classes
              </p>
              <p className="flex items-center text-gray-700 font-medium">
                <span className="bg-teal-500 text-white p-1 rounded-full mr-3">
                  ✓
                </span>{" "}
                Progress Tracking
              </p>
              <p className="flex items-center text-gray-700 font-medium">
                <span className="bg-teal-500 text-white p-1 rounded-full mr-3">
                  ✓
                </span>{" "}
                Premium Equipment
              </p>
            </div>
          </div>
          {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleModalOpen}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg shadow-lg font-bold text-lg transition-all transform hover:scale-105"
            >
              JOIN NOW - LIMITED SPOTS!
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative">
          <img
            src="https://gfa-tech.com/dimp-template-images/gym/Gym4.2.jpg"
            alt="Trainer"
            className="w-full max-w-md mx-auto"
          />
          <div className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 bg-teal-500 text-white p-4 text-center shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold">20</h2>
            <p className="text-sm sm:text-base">Year Experience</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="lg:px-8 flex flex-col md:flex-row justify-between gap-8 bg-[#FAF3F0] py-16"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative w-[200px] md:w-[250px] text-left group"
          >
            {feature.icon}
            <h3 className="font-bold text-xl text-black mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <div className="absolute -top-16 right-0 md:-right-6 flex items-center">
              <div
                className={`relative text-[160px] font-bold leading-none opacity-30 ${feature.color}`}
              >
                {feature.id}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Memberships Section */}
      <div id="memberships" className="lg:px-32 bg-gray-50 py-10 px-5 md:px-20">
        <div className="text-left">
          <h2 className="text-lg font-bold text-teal-500">MEMBERSHIP PLANS</h2>
          <h1 className="text-3xl md:text-5xl font-bold mt-2">
            Bring Your Fitness{" "}
            <span className="text-teal-500">Ideas To Life</span>
          </h1>
        </div>
        <section className="flex flex-col h-full py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gym.map((service, index) => (
                <div
                  key={index}
                  className="relative bg-gray-100 py-8 px-12 rounded-sm overflow-hidden"
                >
                  <span className="text-sm font-semibold uppercase bg-white shadow-md rounded-full px-4 py-1 mb-4 inline-block">
                    {service.name}
                  </span>
                  <h2 className="text-4xl py-3 font-Raj font-bold text-gray-800">
                    <sub className="text-2xl">
                      {/* Currency symbol moved to getFormattedPrice */}
                    </sub>
                    {getFormattedPrice(service.price, countryCode)}
                  </h2>
                  <div className="space-y-2 mb-6">
                    <p className="flex items-center mb-2 pe-6 text-gray-700">
                      {service.shortDescription}
                    </p>
                  </div>
                  <button
                    onClick={handleModalOpen}
                    className="inline-block bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition"
                  >
                    Choose plan
                  </button>
                  <div
                    className="absolute top-0 right-0 h-full w-16 bg-cover bg-center"
                    /* style={{ backgroundImage: `url(${service.serviceImage})` }} */
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Workout Routine Section */}
      <div className="lg:px-8 flex items-center justify-center py-12 bg-gradient-to-b from-white to-gray-100 px-4">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative w-full md:w-1/2 h-[400px]">
            <div
              className="absolute w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://gfa-tech.com/dimp-template-images/gym/Gym4.3.jpg')",
              }}
            ></div>
            <div
              className="absolute top-0 left-0 h-full bg-cover bg-center"
              style={{
                width: `${sliderPosition}%`,
                backgroundImage:
                  "url('https://gfa-tech.com/dimp-template-images/gym/Gym4.2.jpg')",
              }}
            ></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black text-white flex items-center justify-center rounded-full cursor-pointer border-4 border-white shadow-lg">
              <FaArrowLeft className="mr-1" />
              <FaArrowRight />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 cursor-pointer opacity-0"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <p className="text-gray-500 uppercase text-sm font-semibold">
              GYM TIME
            </p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Workout Routine for Better{" "}
              <span className="text-teal-500">Fitness Results</span>
            </h2>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              Achieve your fitness goals with a structured workout plan designed
              for strength, endurance, and overall well-being. Our expert-led
              programs ensure maximum efficiency, helping you build muscle, burn
              fat, and improve your performance.
            </p>
            <button
              onClick={handleModalOpen}
              className="inline-block bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition"
            >
              Join us now!
            </button>
          </div>
        </div>
      </div>

      {/* Facility Section */}
      <div id="facility" className="lg:px-8 relative px-4 py-5">
        <div className="text-left py-6">
          <h2 className="text-lg font-bold text-teal-500">INSIDE THE GYM</h2>
          <h1 className="text-3xl md:text-5xl font-bold mt-2">
            Have a glimpse of our members <br />
            <span className="text-teal-500">and the facility</span>
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Gym ${index + 1}`}
                className="w-full h-[260px] rounded-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <section
        id="testimonial"
        className="relative bg-gradient-to-b from-white to-teal-100 py-12 w-full max-w-5xl"
      >
        <div className="flex flex-wrap px-6 md:px-8 lg:px-10">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Testimonial
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              What <span className="text-teal-500">Client</span> Say’s
            </h2>
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              prevEl: ".prev-button",
              nextEl: ".next-button",
            }}
            autoplay={{ delay: 5000 }}
            loop={true}
            className="mt-8"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col lg:flex-row items-center">
                  <div className="w-full lg:w-2/6 flex justify-center lg:justify-end md:me-12">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="rounded-full shadow-lg h-32"
                    />
                  </div>
                  <div className="w-full lg:w-4/5 text-center lg:text-left mt-8 lg:mt-0">
                    <p className="text-gray-600 leading-relaxed">
                      <FaQuoteLeft className="text-teal-500 text-2xl my-4" />{" "}
                      {testimonial.text}{" "}
                      <FaQuoteRight className="text-teal-500 text-2xl my-4" />
                    </p>
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold">
                        {testimonial.name}
                      </h3>
                      <p className="text-teal-500 font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute lg:left-32 left-4 top-1/2 bg-teal-500 p-3 rounded-full shadow-lg cursor-pointer prev-button">
            <FaArrowLeft className="text-white text-lg" />
          </div>
          <div className="absolute lg:right-32 right-4 top-1/2 bg-teal-500 p-3 rounded-full shadow-lg cursor-pointer next-button">
            <FaArrowRight className="text-white text-lg" />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <WhiteContactForm />

      {/* Footer */}
      <footer className="px-6 bg-gray-900 py-6">
        <div className="flex flex-col h-full py-4 px-6 md:px-32 text-center sm:text-left">
          <div className="flex flex-col items-center border-white/10 pt-6 md:flex-row md:items-center">
            <div className="w-full mb-4 md:mb-0">
              <ul className="flex flex-wrap justify-center space-x-4 text-white text-lg">
                <li>
                  <a
                    href="#home"
                    className="alt-font text-[#706F6B] hover:underline"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#aboutus"
                    className="alt-font text-[#706F6B] hover:underline"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="alt-font text-[#706F6B] hover:underline"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#memberships"
                    className="alt-font text-[#706F6B] hover:underline"
                  >
                    Membership Plans
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="alt-font text-[#706F6B] hover:underline"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="alt-font text-[#706F6B] hover:underline"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full text-center md:text-right mt-4 md:mt-0">
              <p className="text-[#706F6B] text-lg">
                © {new Date().getFullYear()} Proudly Powered by
                <a
                  href="https://www.dimpified.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white underline hover:text-white"
                >
                  Dimpified
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FourthGym;
