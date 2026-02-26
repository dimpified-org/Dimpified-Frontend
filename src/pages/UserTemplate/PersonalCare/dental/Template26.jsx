import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTooth,
  FaPhoneAlt,
  FaCheck,
  FaMapMarkerAlt,
  FaEnvelope,
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaTwitter,
  FaPhone,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { dental } from "../../../../data/Services";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

const ContactCard = ({ icon, title, description }) => (
  <div className="inline-flex items-center gap-4">
    <span className="bg-[#1E84B5] p-2 rounded-full">
      <img src={icon} alt={title} className="w-12 h-12" />
    </span>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const SecondDentist = ({ details, subdomain, userDetails }) => {
  const [menuOpen, setMenuOpen] = useState(false);
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
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex + itemsPerPage >= testimonials.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? testimonials.length - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  const testimonials = [
    {
      id: 1,
      name: details && details.Blog.header1,
      role: details && details.Blog.summary1,
      image: details && details.Blog.image1,
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: details && details.Blog.content1,
    },
    {
      id: 2,
      name: details && details.Blog.header2,
      role: details && details.Blog.summary2,
      image: details && details.Blog.image2,
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: details && details.Blog.content2,
    },
    {
      id: 3,
      name: details && details.Blog.header3,
      role: details && details.Blog.summary3,
      image: details && details.Blog.image3,
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: details && details.Blog.content3,
    },
    {
      id: 4,
      name: details && details.Blog.header4,
      role: details && details.Blog.summary4,
      image: details && details.Blog.image4,
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: details && details.Blog.content4,
    },
    {
      id: 5,
      name: details && details.Reviews.header1,
      role: details && details.Reviews.title1,
      image: details && details.Reviews.image1,
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: details && details.Reviews.summary1,
    },
  ];

  const teamMembers = [
    {
      name: details && details.Team.header1,
      role: details && details.Team.summary1,
      image: details && details.Team.image1,
    },
    {
      name: details && details.Team.header2,
      role: details && details.Team.summary2,
      image: details && details.Team.image2,
    },
    {
      name: details && details.Team.header3,
      role: details && details.Team.summary3,
      image: details && details.Team.image3,
    },
    {
      name: details && details.Team.header4,
      role: details && details.Team.summary4,
      image: details && details.Team.image4,
    },
  ];

  const features = [
    {
      id: 1,
      icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-process-1.png",
      title: details && details.Patrners.section1header,
      description: details && details.Patrners.section4header,
    },
    {
      id: 2,
      icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-process-2.png",
      title: details && details.Patrners.section2header,
      description: details && details.Patrners.sectionImage4,
    },
    {
      id: 3,
      icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-process-3.png",
      title: details && details.Patrners.section3header,
      description: details && details.Patrners.buttonText1,
    },
  ];

  const stats = [
    { label: details && details.Events.buttonText1 },
    { label: details && details.Events.sectionImage2 },
    { label: details && details.Events.section2header },
  ];

  return (
    <div>
      <header className="bg-white shadow-md relative">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center text-gray-800">
            <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
            <span className="text-md text-[#1E84B5] font-semibold leading-tight">
              {userDetails?.ecosystemName}
              <br />
            </span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About Us
            </a>
            <a href="#services" className="hover:text-blue-600">
              Services
            </a>
            <a href="#how" className="hover:text-blue-600">
              How we work?
            </a>
          </nav>

          {/* Book Appointment Button */}
          <button
            onClick={handleModalOpen}
            className="hidden md:block bg-[#1E84B5] text-white px-5 py-2 rounded-full hover:bg-[#0F3A51] transition"
          >
            Book Appointment →
          </button>

          <BookingModal
            isOpen={isModalOpen}
            handleClose={handleModalClose}
            information={eServices}
            subdomain={subdomain}
            serviceCurrency={currency}
          />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Mobile Menu - No Absolute Positioning */}
        <div
          className={`md:hidden bg-white shadow-md w-full transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col space-y-4 p-6">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About Us
            </a>
            <a href="#services" className="hover:text-blue-600">
              Services
            </a>
            <a href="#how" className="hover:text-blue-600">
              How we work?
            </a>
            <button
              onClick={handleModalOpen}
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-[#0F3A51] transition text-center"
            >
              Book Appointment →
            </button>
          </ul>
        </div>
      </header>
      <section
        id="home"
        className="relative bg-cover bg-center md:h-screen h-[70vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="flex flex-col md:px-32 px-6 text-center justify-center items-center  relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {sanitizeContent(details && details.hero.title1)}
          </h1>
          <p className="mb-6 text-lg ">
            {sanitizeContent(details && details.hero.title2)}
          </p>
          <button
            onClick={handleModalOpen}
            className=" bg-[#1E84B5] hover:bg-[#0d3550] text-white py-3 px-6 rounded-lg transition"
          >
            {sanitizeContent(details && details.hero.buttonText1)} →
          </button>

          <div className="md:block hidden">
            <div className=" mt-10 grid grid-cols-3 md:grid-cols-3 gap-6 ">
              {[
                {
                  icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-hero1.png",
                  text: details && details.hero.summary1,
                },
                {
                  icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-hero2.png",
                  text: details && details.hero.summary2,
                },
                {
                  icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-hero3.png",
                  text: details && details.hero.summary3,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-cover bg-opacity-20 p-4 rounded-lg"
                >
                  <img
                    src={item.icon}
                    alt={sanitizeContent(item.text)}
                    className="h-10"
                  />
                  <p className="text-white font-semibold">
                    {sanitizeContent(item.text)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="w-full flex flex-col h-full justify-center items-center  py-4  lg:px-24">
        {/* Top Contact Section */}
        <div className="bg-cover py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContactCard
            icon="https://gfa-tech.com/dimp-template-images/dentist/icon-phone.png"
            title="Need Dental Services?"
            description={[`Call on : ${userDetails?.phoneNumber}`]}
          />
          <ContactCard
            icon="https://gfa-tech.com/dimp-template-images/dentist/icon-clock.png"
            title="Opening Hours"
            description="Mon to Sat 9:00AM to 9:00PM"
          />
          <ContactCard
            icon="https://gfa-tech.com/dimp-template-images/dentist/icon-mail.png"
            title="Schedule Appointment"
            description={[`Mail us : ${userDetails?.email}`]}
          />
        </div>
        {/* About Us Section */}
        <div className="flex flex-col md:px-32 px-6 py-16  md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image Section */}
            <div className="relative">
              <img
                src={details && details.aboutUs.image1}
                alt="Dental Clinic"
                className="w-full rounded-xl shadow-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-70 p-4 rounded-lg flex items-center gap-3">
                <FaTooth className="text-2xl text-teal-500" />
                <div>
                  <p className="text-sm text-gray-600">
                    {sanitizeContent(details && details.Vision.missionsummary)}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div>
              <h3 className="text-[#1E84B5] text-sm uppercase font-semibold mb-2">
                {sanitizeContent(details && details.aboutUs.title1)}
              </h3>
              <h2 className="text-4xl font-bold text-gray-800 leading-snug mb-4">
                {sanitizeContent(details && details.aboutUs.title2)}
              </h2>
              <p className="text-gray-600 mb-6">
                {sanitizeContent(details && details.aboutUs.text1)}
              </p>

              <div className="flex items-start gap-8">
                {/* Left: Features List */}
                <ul className="space-y-4 flex-1">
                  {[
                    details && details.Vision.visiomheader,
                    details && details.Vision.visionsummary,
                    details && details.Vision.impactheader,
                    details && details.Vision.impactsummary,
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaCheck className="text-[#1E84B5]" />
                      </div>
                      <span className="text-gray-700">
                        {sanitizeContent(item)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Right: 25+ Years Experience */}
                <div className="bg-[#0d3550] text-white p-4 rounded-xl flex items-center gap-3">
                  <FaTooth className="text-3xl" />
                  <div>
                    <p className="text-sm">
                      {sanitizeContent(details && details.Vision.missionheader)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Read More Button */}
              <div className="mt-6">
                <a
                  href="#services"
                  className="bg-[#1E84B5] text-white py-4 px-6 rounded-lg hover:bg-[#0d3550] transition"
                >
                  {sanitizeContent(details && details.aboutUs.buttonText1)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="services" className="bg-blue-50 py-16">
        <div className="flex flex-col md:px-32 px-6 ">
          {/* Section Header */}
          <div className="text-center mb-10">
            <p className="text-[#1E84B5] font-semibold flex items-center justify-center gap-2">
              <FaTooth /> Our Services
            </p>
            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              Explore the services we provide
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The goal of our clinic is to provide friendly, caring dentistry
              and the highest level of general, cosmetic, and specialist dental
              treatments. With dental practices throughout the world.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg transition-all transform [#1E84B5]:scale-105 [#1E84B5]:bg-blue-700 [#1E84B5]:text-white"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-3">
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-12 h-12 "
                  /> */}
                </div>
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <p className="mt-2">{service.shortDescription}</p>
                <hr className="my-4 border-gray-300" />
                <button
                  onClick={handleModalOpen}
                  className="text-[#1E84B5] hover:text-blue-600 font-medium flex items-center gap-1 [#1E84B5]:underline"
                >
                  Book Now <span className="ml-1">➜</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div id="how" className="bg-white py-16">
        <div className="flex flex-col md:px-32 px-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side Content */}
            <div>
              <div className="mb-8">
                <h3 className="text-[#1E84B5] font-semibold text-lg uppercase">
                  {sanitizeContent(
                    details && details.Statistics.section1header
                  )}
                </h3>
                <h2 className="text-4xl font-bold text-gray-800 mt-2">
                  {sanitizeContent(
                    details && details.Statistics.section1paragraphy
                  )}
                </h2>
                <p className="text-gray-600 mt-4">
                  {sanitizeContent(details && details.Statistics.section1span)}
                </p>
              </div>

              <a
                href="#services"
                className="inline-flex items-center bg-[#1E84B5] text-white font-medium px-6 py-3 hover:bg-[#0d3550] rounded-full [#1E84B5]:bg-blue-800 transition duration-300"
              >
                {sanitizeContent(details && details.Statistics.section1icon)}
                <span className="ml-2">→</span>
              </a>
            </div>

            {/* Right Side Process List */}
            <div className="space-y-8">
              {/* Process Item 1 */}
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <img
                      src="https://gfa-tech.com/dimp-template-images/dentist/icon-process-1.png"
                      alt="Initial Consultation"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-[#1E84B5] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {sanitizeContent(
                      details && details.Statistics.section2header
                    )}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {sanitizeContent(
                      details && details.Statistics.section2paragraphy
                    )}
                  </p>
                </div>
              </div>

              {/* Process Item 2 */}
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <img
                      src="https://gfa-tech.com/dimp-template-images/dentist/icon-process-2.png"
                      alt="Treatment by Experts"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-[#1E84B5] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {sanitizeContent(
                      details && details.Statistics.section2span
                    )}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {sanitizeContent(
                      details && details.Statistics.section2icon
                    )}
                  </p>
                </div>
              </div>

              {/* Process Item 3 */}
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <img
                      src="https://gfa-tech.com/dimp-template-images/dentist/icon-process-3.png"
                      alt="Follow-Up Care"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-[#1E84B5] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {sanitizeContent(
                      details && details.Statistics.section3header
                    )}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {sanitizeContent(
                      details && details.Statistics.section3paragraphy
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-12">
        <div className=" md:px-32 px-6  grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Section - Image with Blurred Feature Overlay */}
          <div className="relative">
            <img
              src={details && details.Statistics.section3icon}
              alt="Dental Care"
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="absolute inset-0 flex justify-center items-center">
              <div className="bg-white/20 backdrop-blur-xl rounded-lg p-6 w-[80%]">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-center gap-4 p-4 bg-white/60 rounded-lg shadow-lg mb-4"
                  >
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-10 h-10"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div>
            <h3 className="text-[#1E84B5] font-medium flex items-center gap-2">
              <span role="img" aria-label="tooth">
                🦷
              </span>
              {sanitizeContent(details && details.Events.heading)}
            </h3>
            <h2 className="text-3xl font-bold text-[#0d3550] mt-2 leading-snug">
              {sanitizeContent(details && details.Events.summary)}
            </h2>
            <p className="mt-4 text-sm font-bold text-[#0d3550]">
              {sanitizeContent(details && details.Events.section1header)}
            </p>
            <p className="mt-5 text-[#0d3550]">
              {sanitizeContent(details && details.Events.section1paragraphy)}
            </p>

            {/* Statistics Section */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={stat.id}
                  className={`text-center  ${
                    index !== 0 ? "border-l border-gray-300" : ""
                  }`}
                >
                  
                  <p className="text-[#0d3550]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 bg-white">
        <div className="flex flex-col md:px-32 px-6 px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="text-[#1E84B5] font-semibold text-lg">
              {sanitizeContent(details && details.Reviews.header2)}
            </h3>
            <h2 className="text-3xl font-bold text-[#0d3550]">
              {sanitizeContent(details && details.Reviews.summary2)}
            </h2>
            <p className="text-gray-600 mt-2">
              {sanitizeContent(details && details.Reviews.title2)}
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="w-full "
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-blue-50 p-6 rounded-xl shadow-md w-full transition-transform">
                  {/* Quote Icon at the Top */}
                  <div className="flex justify-center mb-4">
                    <img
                      src={testimonial.quoteIcon}
                      alt="Quote Icon"
                      className="w-10 h-10"
                    />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 mb-4 text-center">
                    {testimonial.text}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-center mt-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="bg-[#0D3B4F] text-white py-16">
        <div className="flex flex-col md:px-32 px-6 ">
          {/* Top Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span role="img" aria-label="tooth">
                  🦷
                </span>{" "}
                {sanitizeContent(details && details.Events.section2paragraphy)}
              </h3>
              <h2 className="text-4xl font-bold leading-tight mt-2">
                {sanitizeContent(details && details.Events.buttonText2)}
              </h2>
              <p className="mt-4 text-lg">
                {sanitizeContent(details && details.Events.section3header)}
              </p>
            </div>

            {/* Right Image/Video Section */}
            <div className="relative">
              {/* <a
                href="https://www.youtube.com/watch?v=Y-x0efG1seA"
                target="_blank"
                rel="noopener noreferrer"
              > */}
              <img
                src={details && details.Events.sectionImage3}
                alt="Dental Facility"
                className="w-full h-auto rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white p-4 rounded-full shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-8 h-8 text-gray-700"
                  >
                    <path d="M10.804 8.171L6.69 10.801c-.28.168-.69.008-.69-.325V5.524c0-.333.41-.493.69-.325l4.114 2.63a.393.393 0 010 .674z" />
                  </svg>
                </button>
              </div>
              {/* </a> */}
            </div>
          </div>

          {/* Service Information - Uniform Alignment */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "1",
                titleKey: "section3paragraphy",
                descriptionKey: "buttonText3",
              },
              {
                id: "2",
                titleKey: "sectionImage4",
                descriptionKey: "section4header",
              },
              {
                id: "3",
                titleKey: "section4paragraphy",
                descriptionKey: "buttonText4",
              },
            ].map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="flex items-start gap-3">
                  <span className="bg-[#1E84B5] text-white w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold">
                    {item.id}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {details?.Events?.[item.titleKey] || "No Title"}
                    </h3>
                    <p className="mt-1 text-sm">
                      {details?.Events?.[item.descriptionKey] ||
                        "No Description"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white py-16">
        <div className="flex flex-col md:px-32 px-6 ">
          <div className="text-center mb-12">
            <p className="text-[#1E84B5] uppercase font-semibold">
              {sanitizeContent(details && details.Reviews.header3)}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d3550] mt-2">
              {sanitizeContent(details && details.Reviews.summary3)}
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {sanitizeContent(details && details.Reviews.title3)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative overflow-hidden transition-transform transform [#1E84B5]:scale-105"
              >
                <div className="relative group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover bg-white rounded-xl shadow-lg "
                  />
                </div>

                <div className="text-center mt-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white py-16">
        <div className="flex flex-col md:px-32 px-6 ">
          {/* Section Title */}
          <div className="text-center mb-12">
            <p className="text-[#1E84B5] text-sm font-semibold flex justify-center items-center gap-2">
              <span role="img" aria-label="tooth">
                🦷
              </span>{" "}
              {sanitizeContent(details && details.contactUs.heading1)}
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              {sanitizeContent(details && details.contactUs.heading2)}
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {sanitizeContent(details && details.contactUs.heading3)}
            </p>
          </div>

          {/* Contact Info Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact Details */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex items-center">
              <div className="bg-[#1E84B5] text-white p-4 rounded-full mr-4">
                <FaPhoneAlt size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Contact Details
                </h3>
                <p className="text-gray-600">{userDetails?.phoneNumber}</p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex items-center">
              <div className="bg-[#1E84B5] text-white p-4 rounded-full mr-4">
                <FaMapMarkerAlt size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600"> {userDetails?.address} </p>
              </div>
            </div>

            {/* Email Us */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex items-center">
              <div className="bg-[#1E84B5] text-white p-4 rounded-full mr-4">
                <FaEnvelope size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Email Us
                </h3>
                <p className="text-gray-600">{userDetails?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhiteContactForm ecosystemDomain={subdomain} />

      <footer className="bg-[#0d3b4d] text-white py-10">
        <div className="flex flex-col md:px-32 px-6 ">
          {/* Booking Section */}
          <div className="flex flex-col bg-[#0d3b4d] text-center lg:flex-row items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">
              {sanitizeContent(details && details.footer.header)}
            </h2>
            <button
              onClick={handleModalOpen}
              className="mt-4 lg:mt-0 bg-[#1E84B5] hover:bg-[#0d3550] text-white py-2 px-6 rounded-full flex items-center gap-2 transition duration-300"
            >
              Book Appointment →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <div className="flex items-center mb-4">
                <a href="#" className="flex items-center text-gray-800">
                  <img
                    src={details && details.footer.logo}
                    alt="logo"
                    className="w-10 h-10 mr-2"
                  />
                  <span className="text-md text-[#1E84B5] font-semibold leading-tight">
                    {userDetails?.ecosystemName} <br />
                  </span>
                </a>
              </div>
              <p className="text-gray-300">
                {sanitizeContent(details && details.footer.paragraph6)}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[#1E84B5]:text-blue-400"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[#1E84B5]:text-blue-400"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[#1E84B5]:text-blue-400"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[#1E84B5]:text-blue-400"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-blue-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#how" className="hover:text-blue-400">
                    Our Process
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Dental Care
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Cosmetic Dentistry
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Dental Implants
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Teeth Whitening
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FaPhone className="text-blue-400" />
                  <p>{userDetails?.phoneNumber}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-400" />
                  <p>{userDetails?.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <p>{userDetails?.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-600 mt-10 pt-6 text-center">
            <p>
              {" "}
              &copy; {new Date().getFullYear()} Built with{" "}
              <a
                href="https://dimpified.com"
                className="text-gray-400 hover:text-white text-sm"
              >
                Dimpified
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SecondDentist;
