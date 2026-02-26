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
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import { gym } from "../../../../data/Services";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
// --- Hero Section ---

// App Component
const FourthGym = ({ details, subdomain, userDetails }) => {
  const [hovered, setHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [eServices, setEServices] = useState([]);
const [currency, setCurrency] = useState([]);
  useEffect(() => {
    const getServiceeDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`
        );
        const allServices = response.data.flatMap((item) => item.services);
        const userCurrency = response.data.flatMap((item) => item.currency);
          setCurrency(userCurrency);
        setEServices(allServices);
      } catch (error) {
        console.log("not working", error);
      } finally {
        console.log("finish loading");
      }
    };
    getServiceeDetails();
  }, []);

  const sanitizeContent = (html) => {
    return sanitizeHtml(html, {
      allowedTags: [],
      allowedAttributes: {},
    });
  };
  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  const images = [
    details && details.Gallery.image1,
    details && details.Gallery.image2,
    details && details.Gallery.image3,
  ];

  const features = [
    {
      id: details && details.Statistics.section1header,
      title: details && details.Statistics.section1span,
      description: details && details.Statistics.section1paragraphy,
      icon: <FaUserFriends className="w-16 h-16 text-teal-500" />,
      color: "text-black",
    },
    {
      id: details && details.Statistics.section2header,
      title: details && details.Statistics.section2span,
      description: details && details.Statistics.section2paragraphy,
      icon: <FaDumbbell className="w-16 h-16 text-teal-500" />,
      color: "text-[#00C0D7]",
    },
    {
      id: 3,
      title: details && details.Statistics.section3header,
      description: details && details.Statistics.section3paragraphy,
      icon: <FaChalkboardTeacher className="w-16 h-16 text-teal-500" />,
      color: "text-black",
    },
  ];

  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  const testimonials = [1, 2, 3].map((i) => ({
    image:
      (details &&
        details?.Reviews?.[`image${i}`]?.replace("not available", "")) ||
      "",
    name: (details && details?.Reviews?.[`header${i}`]) || "",
    role: (details && details?.Reviews?.[`title${i}`]) || "",
    text: (details && details?.Reviews?.[`summary${i}`]) || "",
  }));

  return (
    <div>
      <nav className="w-full bg-white  z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center text-2xl font-bold text-teal-500">
            <FaDumbbell className="w-10 h-10 mr-2" />
            <span>{userDetails && userDetails.ecosystemName}</span>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-teal-500"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
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

          {/* Desktop Search */}
          <div className="hidden md:block">
            <button
              onClick={handleModalOpen}
              className="inline-block bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition"
            >
              {sanitizeContent(details && details.navbar.buttonText1)}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
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
      <div id="home" className="relative text-white text-center mt-4">
        {/* Overlay Text */}
        <div className="absolute inset-0 bg-teal-900 bg-opacity-40 flex flex-col items-center justify-center z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
            Welcome to
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            {userDetails && userDetails.ecosystemName} Gym
          </h1>
          <p className="text-lg sm:text-xl mt-4">
            {sanitizeContent(details && details.hero.title2)}
          </p>
        </div>

        {/* Background Image */}
        <img
          src={details && details.hero.backgroundImage1}
          alt="Fitness"
          className="w-full h-[500px] object-cover"
        />
      </div>

      <section
        id="aboutus"
        className="relative lg:px-32 flex flex-col md:flex-row items-center p-6 md:p-12 bg-gray-100 gap-8"
      >
        {/* Text Section */}
        <div className="w-full md:w-1/2">
          <h4 className="text-gray-500 uppercase font-semibold tracking-wider">
            {sanitizeContent(details && details.aboutUs.title1)}
          </h4>
          {(() => {
            const title = sanitizeContent(details?.aboutUs?.title2 || "");
            const words = title.split(" ");
            return (
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mt-2">
                {words[0] && <span className="text-gray-800">{words[0]}</span>}{" "}
                {words[1] && <span className="text-teal-500">{words[1]}</span>}{" "}
                {words.slice(2).join(" ") && (
                  <span className="text-gray-800">
                    {words.slice(2).join(" ")}
                  </span>
                )}
              </h1>
            );
          })()}
          <p className="text-gray-600 text-lg mt-4 font-medium">
            {sanitizeContent(details && details.aboutUs.text1)}
          </p>
          <p className="text-gray-600 mt-4">
            {sanitizeContent(details && details.aboutUs.text2)}
          </p>

          {/* Services List - More Impactful */}
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
            <BookingModal
              isOpen={isModalOpen}
              handleClose={handleModalClose}
              information={eServices}
              subdomain={subdomain}
              serviceCurrency={currency}
            />
          )}

          {/* CTA Button - More Urgency */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleModalOpen}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg shadow-lg font-bold text-lg transition-all transform hover:scale-105"
            >
              {sanitizeContent(details && details.aboutUs.buttonText1)}
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={details && details.aboutUs.image1}
            alt="Trainer"
            className="w-full max-w-md mx-auto"
          />
          {/* <div className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 bg-teal-500 text-white p-4 text-center shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold">20</h2>
            <p className="text-sm sm:text-base">Year Experience</p>
          </div> */}
        </div>
      </section>
      <section
        id="services"
        className=" lg:px-32 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 bg-[#FAF3F0] py-16 px-6"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative w-[300px] md:w-[350px] text-left group"
          >
            {/* Icon */}
            {feature.icon}

            {/* Title */}
            <h3 className="font-bold text-xl text-black mb-2">
              {feature.title}
            </h3>

            {/* Description */}
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
      <div
        id="memberships"
        className=" lg:px-32 bg-gray-50 py-10 px-5 md:px-20"
      >
        <div className="text-left">
          <h2 className="text-lg fomt-bold text-teal-500">MEMBERSHIP PLANS</h2>
          <h1 className="text-3xl md:text-5xl font-bold mt-2">
            Bring Your Fitness{" "}
            <span className="text-teal-500">Ideas To Life</span>
          </h1>
        </div>

        <section className="flex flex-col h-full  py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eServices.map((service, index) => (
                <div
                  key={index}
                  className="relative bg-gray-100 py-8 px-12 rounded-sm overflow-hidden "
                >
                  <span className="text-sm font-semibold uppercase bg-white shadow-md rounded-full px-4 py-1 mb-4 inline-block">
                    {service.name}
                  </span>
                  <h2 className="text-4xl py-3 font-Raj font-bold text-gray-800">
                    
                    {getCurrencySymbol(currency)}{service.price}
                  </h2>
                  {/* <span className="block text-sm font-semibold uppercase text-gray-700 mb-4">
                {services.}
              </span> */}
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

      <div className=" lg:px-32 flex items-center justify-center py-12 bg-gradient-to-b from-white to-gray-100 px-4">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Image Slider Section */}
          <div className="relative w-full md:w-1/2 h-[400px]">
            <div
              className="absolute w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${details && details.LargeCta.image1})`,
              }}
            ></div>
            <div
              className="absolute top-0 right-0 h-full bg-cover bg-center"
              style={{
                width: `${sliderPosition}%`,
                backgroundImage: `url(${details && details.LargeCta.image2})`,
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

          {/* Text Section */}
          <div className="p-8 md:w-1/2">
            <p className="text-gray-500 uppercase text-sm font-semibold">
              {sanitizeContent(details && details.LargeCta.header2)}
            </p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              <span className="text-teal-500">
                {sanitizeContent(details && details.LargeCta.header1)}
              </span>
            </h2>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              {sanitizeContent(details && details.LargeCta.header3)}
            </p>
            <button
              onClick={handleModalOpen}
              className="inline-block bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition"
            >
              {sanitizeContent(details && details.LargeCta.buttonText1)}
            </button>
          </div>
        </div>
      </div>
      <div
        id="facility"
        className="lg:px-32 relative w-screen mx-auto px-4 py-5"
      >
        <div className="text-left py-6">
          <h2 className="text-lg fomt-bold text-teal-500">
            {" "}
            {sanitizeContent(details && details.Gallery.summary2)}
          </h2>
          <h1 className="text-3xl md:text-5xl font-bold mt-2">
            <span className="text-teal-500">
              {sanitizeContent(details && details.Gallery.summary1)}
            </span>
          </h1>
        </div>
        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {images.map((img, index) => (
            <div key={index} className="flex">
              <img
                src={img}
                alt={`Gym ${index + 1}`}
                className="w-full h-[360px] rounded-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <section
        id="testimonial"
        className="relative bg-gradient-to-b from-white to-teal-100 py-12"
      >
        <div className="flex flex-wrap  px-6 md:px-24 lg:px-32 ">
          <div className="">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Testimonial
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              What <span className="text-teal-500">Client</span> Say’s
            </h2>
          </div>

          {/* Swiper Slider */}
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
                  {/* Image */}
                  <div className="w-full lg:w-2/6 flex justify-center lg:justify-end md:me-12">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="rounded-full shadow-lg  h-32"
                    />
                  </div>

                  {/* Text Content */}
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

          {/* Navigation Buttons */}
          <div className="absolute lg:left-32 left-4 top-1/2 bg-teal-500 p-3 rounded-full shadow-lg cursor-pointer prev-button">
            <FaArrowLeft className="text-white text-lg" />
          </div>
          <div className="absolute lg:right-32 right-4 top-1/2 bg-teal-500 p-3 rounded-full shadow-lg cursor-pointer next-button">
            <FaArrowRight className="text-white text-lg" />
          </div>
        </div>
      </section>
      <WhiteContactForm ecosystemDomain={subdomain} />
      <footer class="px-6 bg-gray-900 py-6">
        <div class=" flex flex-col h-full py-4 px-6 md:px-32 text-center sm:text-left">
          <div class="flex flex-col items-center border-white/10 pt-6 md:flex-row md:items-center">
            {/* <!-- Navigation Links --> */}
            <div class="w-full mb-4 md:mb-0">
              <ul class="flex flex-wrap justify-center space-x-4 text-white text-lg">
                <li>
                  <a
                    href="#home"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#aboutus"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="memberships"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Membership Plans
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- Copyright Text --> */}
            <div class="w-full text-center md:text-right mt-4 md:mt-0">
              <p class="text-[#706F6B] text-lg">
                © {new Date().getFullYear()} Proudly Powered by
                <a
                  href="https://www.dimpified.com/"
                  target="_blank"
                  rel="noreferrer"
                  class="text-white underline hover:text-white"
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
