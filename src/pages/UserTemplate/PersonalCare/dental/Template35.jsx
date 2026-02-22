import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelopeOpen,
  FaPhone,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import axios from "axios";
import sanitizeHtml from "sanitize-html";

const FourthDentist = ({ details, subdomain, userDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [eServices, setEServices] = useState([]);
  const [currency, setCurrency] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

const healthTips = [
    {
      id: 1,
      doctor: details && details.Blog.author1,
      qualification: details && details.Blog.summary1,
      title: details && details.Blog.header1,
      description: details && details.Blog.buttonText1,
      instructions: [
        details && details.Blog.image3,
        details && details.Blog.header3,
        details && details.Blog.summary3,
        details && details.Blog.date3,
        details && details.Blog.author3,
      ],
      image: details && details.Blog.image1,
    },
    {
      id: 2,
      doctor: details && details.Blog.author2,
      qualification: details && details.Blog.summary2,
      title: details && details.Blog.header2,
      description: details && details.Blog.buttonText2,
      instructions: [
        details && details.Blog.content3,
        details && details.Blog.buttonText3,
        details && details.Blog.image4,
        details && details.Blog.header4,
        details && details.Blog.summary4,
      ],
      image: details && details.Blog.image2,
    },
  ];
  const specialists = [
    {
      name: details && details.Team.header1,
      specialty: details && details.Team.summary1,
      image: details && details.Team.image1,
    },
    {
      name: details && details.Team.header2,
      specialty: details && details.Team.summary2,
      image: details && details.Team.image2,
    },
    {
      name: details && details.Team.header3,
      specialty: details && details.Team.summary3,
      image: details && details.Team.image3,
    },
    {
      name: details && details.Team.header4,
      specialty: details && details.Team.summary4,
      image: details && details.Team.image4,
    },
  ];

  const testimonials = [
    {
      name: details && details.Reviews.header1,
      specialty: details && details.Reviews.title1,
      image: details && details.Reviews.image1,
      text: details && details.Reviews.summary1,
    },
    {
      name: details && details.Reviews.header2,
      specialty: details && details.Reviews.title2,
      image: details && details.Reviews.image2,
      text: details && details.Reviews.summary2,
    },
    {
      name: details && details.Reviews.header3,
      specialty: details && details.Reviews.title3,
      image: details && details.Reviews.image3,
      text: details && details.Reviews.summary3,
    },
  ];

   const stats = [
    {
      icon: "fas fa-smile",
      count: details && details.Statistics.section1header,
      label: details && details.Statistics.section1paragraphy,
    },
    {
      icon: "fas fa-user-md",
      count: details && details.Statistics.section2header,
      label: details && details.Statistics.section2paragraphy,
    },
    {
      icon: "fas fa-tooth",
      count: details && details.Statistics.section3header,
      label: details && details.Statistics.section3paragraphy,
    },
    {
      icon: "fas fa-award",
      count: details && details.Statistics.section4header,
      label: details && details.Statistics.section4paragraphy,
    },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prevCounts) =>
        prevCounts.map((value, index) =>
          value < stats[index].count ? value + 1 : stats[index].count
        )
      );
    }, 20);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-3">
          {/* Logo */}
          <a href="#home" className="flex items-center text-gray-800">
            <img
              src="https://gfa-tech.com/dimp-template-images/dentist/icon-why-us-2.png"
              alt="logo"
              className="w-10 h-10 mr-2"
            />{" "}
            <span className="text-md text-[#0CB8B6] font-semibold leading-tight">
              {userDetails?.ecosystemName} Dentals
            </span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <li>
              <a href="#home" className="hover:text-[#0CB8B6]">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-[#0CB8B6]">
                About Us
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-[#0CB8B6]">
                Services
              </a>
            </li>

            <li>
              <a href="#dentist" className="hover:text-[#0CB8B6]">
                Dentists
              </a>
            </li>
            <li>
              <a href="#tips" className="hover:text-[#0CB8B6]">
                Tips
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[#0CB8B6]">
                Contact
              </a>
            </li>
          </ul>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleModalOpen}
              className="text-white hover:underline hidden lg:block rounded-full py-3 px-3 bg-[#0CB8B6]"
            >
              Book Appointment
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              {menuOpen ? (
                <FaTimes className="text-gray-600" />
              ) : (
                <FaBars className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden bg-gray-100 text-gray-700 p-4 space-y-4">
            <li>
              <a href="#" onClick={() => setMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => setMenuOpen(false)}>
                Services
              </a>
            </li>

            <li>
              <a href="#dentist" onClick={() => setMenuOpen(false)}>
                Dentists
              </a>
            </li>
            <li>
              <a href="#tips" onClick={() => setMenuOpen(false)}>
                Tips
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </li>
            <button
              onClick={handleModalOpen}
              className="text-white hover:underline rounded-full py-3 px-3 bg-[#0CB8B6]"
            >
              Book Appointment
            </button>
          </ul>
        )}
      </nav>
       {isModalOpen && (
          <BookingModal
            isOpen={isModalOpen}
            handleClose={handleModalClose}
            information={eServices}
            subdomain={subdomain}
            serviceCurrency={currency}
          />
        )}
      <div className="relative bg-white py-20 md:h-screen px-5 md:px-10 lg:px-20">
        {/* Background Shape */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat opacity-90"
          style={{
            backgroundImage: `url(${details && details.hero.backgroundImage1})`,
          }}
        ></div>

        <div className="relative text-gray-800 z-10 flex flex-col md:flex-row items-center md:items-start max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="md:w-2/3 text-center md:text-left mt-12">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fadeInUp">
             {sanitizeContent(details && details.hero.title1)}
            </h1>
            <p className="text-lg mt-4 animate-fadeInUp delay-300">
              {sanitizeContent(details && details.hero.summary1)}
            </p>
            <button
              onClick={handleModalOpen}
              className="inline-block mt-6 px-6 py-3 bg-[#0CB8B6] text-white font-semibold rounded-full shadow-sm hover:bg-gray-100 transition duration-300 animate-fadeInUp delay-500"
            >
             {sanitizeContent(details && details.hero.buttonText1)}
            </button>
          </div>
        </div>
      </div>

      <section
        id="about"
        className="flex flex-row lg:px-68 md:px-32 px-6 py-10 mt-8"
      >
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <img
             src={details && details.aboutUs.image2}
              alt="Nigerian Dentist Diagnosing Oral Issues"
              className="rounded-lg shadow-sm"
            />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold mb-4">
               {sanitizeContent(details && details.aboutUs.title1)}
            </h2>

            <p className="text-gray-700 mt-4">
              {sanitizeContent(details && details.aboutUs.text1)}
            </p>
            <p className="text-gray-700 mt-4">
              {sanitizeContent(details && details.aboutUs.text2)}
            </p>

            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-gray-800">
                {" "}
                 <span className="ml-2 font-semibold">
                  {sanitizeContent(details && details.aboutUs.title2)}
                </span>
              </li>
              <li className="flex items-center text-gray-800">
                {" "}
                <span className="ml-2 font-semibold">
                  Digital X-Rays & Biomarker Tests
                </span>
              </li>
            </ul>

            <button
              onClick={handleModalOpen}
              className="mt-6 px-6 py-3 bg-[#0CB8B6] text-white rounded-full font-medium hover:bg-[#14457B] transition duration-300"
            >
                 {sanitizeContent(details && details.aboutUs.buttonText1)}
            </button>
          </div>
        </div>
      </section>
      <div id="services" className="py-16 bg-teal-50">
        <div className="container mx-auto   px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Our Dental <span className="text-[#0CB8B6]">Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            We offer world-class dental care using modern equipment and
            techniques. Our dental clinic in Lagos provides comprehensive
            services for the whole family.
          </p>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="pb-10"
          >
            {eServices.map((service, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="bg-white shadow-sm rounded-lg p-6 w-full text-center relative h-full md:h-[400px]">
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#0CB8B6] rounded-t-lg"></div>

                  <h4 className="text-lg font-bold uppercase mt-8 mb-4">
                    {service.title}
                  </h4>

                  <div className="flex justify-center mb-4 mt-7">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      {/* <img
                        src={service.serviceImage}
                        alt={service.name}
                        className="w-12 h-12 "
                      /> */}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{service.name}</h3>

                  <p className="text-gray-600 mb-6 mt-8">
                    {service.shortDescription}
                  </p>

                  <button
                    onClick={handleModalOpen}
                    className="border border-[#0CB8B6] text-[#0CB8B6] px-6 py-2 mt-8 rounded-full inline-block hover:bg-[#0CB8B6] hover:text-white transition"
                  >
                    Book Now
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div
        className="bg-cover bg-center py-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.om/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg p-6 text-center"
              >
                <i className={`${stat.icon} text-4xl text-[#0CB8B6]`}></i>
                <h2 className="text-4xl font-bold text-black mt-2">
                  {counts[index]}
                  <span className="text-lg">+</span>
                </h2>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="tips" className="bg-[#0CB8B6] text-white py-16">
        <div className="md:px-32 px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">
              Dental Health <span className="text-teal-900">Tips</span>
            </h2>
            <p className="mt-2 max-w-3xl mx-auto text-gray-300">
              Practical advice from our dental experts to help you maintain
              optimal oral health in Nigeria's unique environment.
            </p>
          </div>

          <div className="relative pb-16">
            {" "}
            {/* Added padding-bottom for navigation */}
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: ".health-tips-next",
                prevEl: ".health-tips-prev",
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {healthTips.map((tip, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col md:flex-row items-center rounded-lg shadow-sm bg-white">
                    <div className="relative w-full md:w-1/3">
                      <img
                        src={tip.image}
                        alt="Doctor"
                        className="rounded-lg w-full h-auto object-cover"
                      />
                    </div>

                    <div className="w-full md:w-2/3 p-6">
                      <div className="relative">
                        <div className="bg-white">
                          <h4 className="text-xl font-bold text-gray-900">
                            {tip.doctor}
                          </h4>
                          <p className="text-[#0CB8B6]">{tip.qualification}</p>
                          <h3 className="text-2xl font-bold text-gray-800 mt-4">
                            {tip.title}
                          </h3>
                          <p className="text-gray-600 mt-2">
                            {tip.description}
                          </p>

                          <h4 className="text-lg font-semibold text-gray-900 mt-4">
                            DENTAL CARE TIPS
                          </h4>
                          <ul className="list-none mt-2 space-y-2">
                            {tip.instructions.map((instruction, i) => (
                              <li
                                key={i}
                                className="flex items-center text-gray-600"
                              >
                                <span className="text-[#0CB8B6] font-bold mr-2">
                                  +
                                </span>
                                {instruction}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Navigation buttons moved below */}
            <div className="flex justify-center gap-4 mt-8">
              <button className="health-tips-prev bg-white text-[#0CB8B6] p-3 rounded-full shadow-sm hover:bg-teal-700 transition">
                <FaChevronLeft size={16} />
              </button>
              <button className="health-tips-next bg-white text-[#0CB8B6] p-3 rounded-full shadow-sm hover:bg-teal-700 transition">
                <FaChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <section id="dentist" className="py-16 bg-white">
        <div className=" text-center px-6 md:px-32">
          <h2 className="text-4xl font-bold text-gray-900">
            Our Dental <span className="text-[#0CB8B6]">Specialists</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Meet our team of highly qualified dental professionals dedicated to
            providing exceptional oral care in Nigeria.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {specialists.map((specialist, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="relative group">
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-full rounded-b-xl object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <div className="flex space-x-3">
                      <a
                        href="#"
                        className="text-white text-xl hover:text-[#0CB8B6]"
                      >
                        <FaFacebookF />
                      </a>
                      <a
                        href="#"
                        className="text-white text-xl hover:text-[#0CB8B6]"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href="#"
                        className="text-white text-xl hover:text-[#0CB8B6]"
                      >
                        <FaLinkedinIn />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 bg-[#0CB8B6] text-white w-12 h-12 flex items-center justify-center rounded-full border-4 border-white shadow-sm">
                    +
                  </div>
                </div>
                <div className="p-6 text-center mt-6">
                  <h4 className="text-xl font-bold text-gray-900">
                    {specialist.name}
                  </h4>
                  <h5 className="text-[#0CB8B6] uppercase text-sm mt-2">
                    {specialist.specialty}
                  </h5>
                  <div className="mt-4">
                    <button
                      onClick={handleModalOpen}
                      className="text-[#0CB8B6] font-semibold hover:underline"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div id="testimonial" className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Patient <span className="text-[#0CB8B6]">Testimonials</span>
            </h2>
            <p className="text-gray-500 mt-2">
             Real stories from real patients — hear how our dental care has
              transformed smiles, restored confidence, and created lasting
              impressions.
            </p>
          </div>

          {/* Swiper Carousel */}
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1.2}
            loop={true}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              768: { slidesPerView: 3 },
            }}
            className="testimonial-carousel"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white shadow-sm rounded-lg p-10 md:p-12 max-w-xl mx-auto min-h-[420px] flex flex-col justify-between">
                  <div>
                    <div className="text-[#0CB8B6] text-5xl mb-4">“</div>
                    <p className="text-gray-700 mb-6">{testimonial.text}</p>
                  </div>
                  <div>
                    <hr className="border-gray-300 my-4" />
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full border-2 border-gray-200"
                      />
                      <div>
                        <h4 className="text-lg font-semibold">
                          {testimonial.name}
                        </h4>
                        <h5 className="text-sm text-gray-500">
                          <span className="text-[#0CB8B6]">
                            {testimonial.specialty}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div id="contact">
        <WhiteContactForm  ecosystemDomain={subdomain}/>
      </div>

      <div className="bg-teal-500 text-white py-20 px-5 shadow-sm">
        <div className="max-w-7xl mx-auto text-center">
         <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {sanitizeContent(details && details.LargeCta.header1)}
          </h2>
          <div className="flex justify-center">
            <button
              onClick={handleModalOpen}
              className="bg-white hover:bg-teal-300 text-teal-500 hover:text-white py-3 px-6 rounded-full flex items-center gap-2 transition duration-300"
            >
               {sanitizeContent(details && details.LargeCta.buttonText1)} →
            </button>
          </div>
        </div>
      </div>
      <footer className="bg-white text-gray-700">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h4 className="text-xl font-semibold mb-4">
                {userDetails?.ecosystemName} Dental
              </h4>
                <p className="text-gray-600 mb-4">
                {sanitizeContent(details && details.footer.paragraph1)}
              </p>
              <h2 className="text-2xl font-bold text-[#0CB8B6] flex items-center gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/455/455705.png"
                  alt="Phone Icon"
                  className="w-6"
                />{" "}
                 {userDetails?.phoneNumber}
              </h2>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Our Services</h4>
              <ul className="text-gray-600 space-y-2">
                {eServices.map((service, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-[#0CB8B6] transition">
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Latest Updates */}
            <div className="mt-4">
             <h5 className="text-lg font-semibold">
                {sanitizeContent(details && details.footer.paragraph2)}
              </h5>
              <ul className="text-gray-600">
                <li className="flex justify-between border-b py-1">
                  <span>
                    {sanitizeContent(details && details.footer.paragraph3)}:
                  </span>{" "}
                  <span>
                    {sanitizeContent(details && details.footer.paragraph4)}
                  </span>
                </li>
                <li className="flex justify-between border-b py-1">
                  <span>
                    {sanitizeContent(details && details.footer.paragraph5)}:
                  </span>
                  <span>
                    {sanitizeContent(details && details.footer.paragraph6)}
                  </span>
                </li>
                <li className="flex justify-between py-1">
                  <span>
                    {" "}
                    <span>
                      {sanitizeContent(details && details.footer.paragraph7)}
                    </span>{" "}
                    :
                  </span>
                  <span className="bg-teal-400 text-white px-3 py-1 rounded-full text-sm">
                    <span>
                      {sanitizeContent(details && details.footer.title3)}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="bg-[#0CB8B6] text-white py-4 text-sm flex flex-col md:flex-row justify-between items-center px-8">
          {/* Left Side: Copyright */}
          <p className="mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Built with{" "}
            <a href="https://dimpified.com" className="hover:text-black">
              Dimpified
            </a>{" "}
            . All Rights Reserved.
          </p>

          {/* Right Side: Links */}
          <ul className="flex space-x-4 md:space-x-6">
            <li>
              <a href="#about" className="hover:text-yellow-400">
                About Us
              </a>
            </li>
            <li>
              <a href="#dentist" className="hover:text-yellow-400">
                Our Dentists
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-yellow-400">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default FourthDentist;
