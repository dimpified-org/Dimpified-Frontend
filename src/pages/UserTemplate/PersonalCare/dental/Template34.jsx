import React, { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaQuoteRight,
  FaArrowRight,
  FaChevronRight,
  FaClinicMedical,
  FaTeeth,
  FaSmile,
  FaTeethOpen,
  FaClock,
  FaBars,
  FaTimes,
  FaSearch,
  FaTooth,
  FaPhone,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { useCountry } from "../../../pricing/CountryContext";
import { BlackContactForm } from "../../../../features/ContactForm/ContactForm";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ThirdDentist = ({ details, subdomain, userDetails }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(1);
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

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const projectImages = [
    {
      id: 1,
      src: details?.Gallery?.image1,
      alt: "Doctor with child",
    },
    {
      id: 2,
      src: details?.Gallery?.image2,
      alt: "Doctors reviewing chart",
    },
    {
      id: 3,
      src: details?.Gallery?.image3,
      alt: "Doctor with elderly patient",
    },
    {
      id: 4,
      src: details?.Gallery?.image4,
      alt: "Medical consultation",
    },
  ];

  const doctors = [
    {
      id: 1,
      name: details && details.Team.summary1,
      specialty: details && details.Team.header1,
      image: details && details.Team.image1,
      socials: [
        "fab fa-facebook-f",
        "fab fa-twitter",
        "fab fa-linkedin-in",
        "fab fa-instagram",
      ],
    },
    {
      id: 2,
      name: details && details.Team.summary2,
      specialty: details && details.Team.header2,
      image: details && details.Team.image2,
      socials: [
        "fab fa-facebook-f",
        "fab fa-twitter",
        "fab fa-linkedin-in",
        "fab fa-instagram",
      ],
    },
    {
      id: 3,
      name: details && details.Team.summary3,
      specialty: details && details.Team.header3,
      image: details && details.Team.image3,
      socials: [
        "fab fa-facebook-f",
        "fab fa-twitter",
        "fab fa-linkedin-in",
        "fab fa-instagram",
      ],
    },
    {
      id: 4,
      name: details && details.Team.summary4,
      specialty: details && details.Team.header4,
      image: details && details.Team.image4,
      socials: [
        "fab fa-facebook-f",
        "fab fa-twitter",
        "fab fa-linkedin-in",
        "fab fa-instagram",
      ],
    },
  ];

  const faqItems = [
    {
      id: 1,
      title: details && details.Statistics.section2header,
      content: details && details.Statistics.section2paragraphy,
    },
    {
      id: 2,
      title: details && details.Statistics.section3header,
      content: details && details.Statistics.section3paragraphy,
    },
    {
      id: 3,
      title: details && details.Statistics.section4header,
      content: details && details.Statistics.section4paragraphy,
    },
  ];

  const testimonials = [
    {
      name: details && details.Reviews.header1,
      title: details && details.Reviews.title1,
      text: details && details.Reviews.summary1,
    },
    {
      name: details && details.Reviews.header2,
      title: details && details.Reviews.title2,
      text: details && details.Reviews.summary2,
    },
    {
      name: details && details.Reviews.header3,
      title: details && details.Reviews.title3,
      text: details && details.Reviews.summary3,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Change testimonial every 6 seconds

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const { country } = useCountry();
  const countryCode = country || "NG";

  const { name, title, text } = testimonials[currentIndex];
  return (
    <div>
      <header className="bg-blue-50 shadow-md relative">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="#home" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[#006D77]">
              {userDetails?.ecosystemName} Dental
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link to="#home" className="hover:text-[#006D77] transition">
              Home
            </Link>
            <Link to="#about" className="hover:text-[#006D77] transition">
              About Us
            </Link>
            <Link to="#services" className="hover:text-[#006D77] transition">
              Services
            </Link>
            <Link to="#facility" className="hover:text-[#006D77] transition">
              Our Facility
            </Link>
            <Link to="#dentists" className="hover:text-[#006D77] transition">
              Our Dentists
            </Link>
          </nav>

          {/* Book Appointment Button */}
          <button
            onClick={handleModalOpen}
            className="hidden md:block bg-[#006D77] text-white px-5 py-3 rounded-full hover:bg-[#0F3A51] transition shadow-md"
          >
            Book Appointment +
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white shadow-md w-full transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col space-y-4 p-6 font-medium">
            <Link to="/" className="hover:text-[#006D77] transition">
              Home
            </Link>
            <Link to="#about" className="hover:text-[#006D77] transition">
              About Us
            </Link>
            <Link to="#services" className="hover:text-[#006D77] transition">
              Services
            </Link>
            <Link to="#facility" className="hover:text-[#006D77] transition">
              Our Facility
            </Link>
            <Link to="#dentists" className="hover:text-[#006D77] transition">
              Our Dentists
            </Link>

            <button
              onClick={handleModalOpen}
              className="bg-[#006D77] text-white px-5 py-3 rounded-full hover:bg-[#0F3A51] transition text-center shadow-md"
            >
              Book Appointment +
            </button>
          </ul>
        </div>
      </header>

      <div
        id="about"
        className="relative bg-gradient-to-r from-blue-50 to-cyan-50 min-h-screen flex items-center"
      >
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 py-16 flex flex-col lg:flex-row justify-between items-center relative">
          {/* Left Column */}
          <div className="max-w-2xl text-left z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#031B4E] leading-tight mb-6">
              {sanitizeContent(details && details.hero.title1)}
            </h1>
            <p className="text-[#4A5B80] text-lg md:text-xl mt-4 mb-8">
              {sanitizeContent(details && details.hero.summary1)}
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={handleModalOpen}
                className="bg-[#006D77] text-white px-8 py-4 rounded-full hover:bg-[#0F3A51] transition text-center font-medium shadow-lg"
              >
                {sanitizeContent(details && details.hero.buttonText1)}
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-[#006D77] flex items-center justify-center hover:bg-[#006D77] hover:text-white transition">
                  <FaPhone
                    className="text-[#006D77] hover:text-white"
                    size={20}
                  />
                </div>
                <div>
                  <p className="text-[#4A5B80]">Emergency Contact</p>
                  <p className="text-[#031B4E] font-bold text-lg">
                    {userDetails?.phoneNumber}
                  </p>
                </div>
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
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 mt-10">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-[#4A5B80]">
                  {" "}
                  {sanitizeContent(details && details.hero.summary4)}
                </span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-[#4A5B80]">
                  {" "}
                  {sanitizeContent(details && details.hero.summary3)}
                </span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-[#4A5B80]">
                  {" "}
                  {sanitizeContent(details && details.hero.summary2)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative w-full max-w-xl flex justify-center lg:justify-end mt-16 lg:mt-0 z-10">
            <div className="relative">
              <img
                src={details?.hero?.backgroundImage1}
                alt="Dentist with patient"
                className="w-full max-w-md h-auto object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <div className="bg-[#006D77] text-white p-3 rounded-full mr-3">
                    <FaTooth size={24} />
                  </div>
                  {(() => {
                    const parts = sanitizeContent(
                      details?.hero?.span2 || ""
                    ).split(" ");
                    const numberIndex = parts.findIndex((word) =>
                      word.includes("+")
                    );

                    const title = parts.slice(0, numberIndex).join(" ");
                    const number = parts[numberIndex];
                    const rest = parts.slice(numberIndex + 1).join(" ");

                    return (
                      <div>
                        <p className="text-sm text-[#4A5B80]">{title}</p>
                        <p className="font-bold text-[#031B4E]">
                          {number} {rest}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full min-h-screen bg-gradient-to-b from-white to-blue-50 px-4 sm:px-8 py-12 flex flex-col lg:flex-row items-start justify-between">
        {/* Left section - About Us */}
        <div className="bg-[#FFF3EA] rounded-xl p-6 sm:p-10 max-w-xl w-full mb-10 lg:mb-0 lg:mr-6 self-center lg:self-start lg:mt-[180px]">
          <p className="text-[#006D77] text-sm font-semibold flex items-center mb-4">
            <FaTooth className="mr-2" />{" "}
            {sanitizeContent(details && details.aboutUs.title1)}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#031B4E] mb-6 leading-tight">
            {sanitizeContent(details && details.aboutUs.title2)}
          </h1>
          <p className="text-[#4A5B80] text-base leading-relaxed mb-6">
            {userDetails?.ecosystemName}{" "}
            {sanitizeContent(details && details.aboutUs.text1)}
          </p>
          <div className="space-y-3">
            <p className="text-[#4A5B80] flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              {sanitizeContent(details && details.aboutUs.image4)}
            </p>
            <p className="text-[#4A5B80] flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              {sanitizeContent(details && details.aboutUs.image3)}
            </p>
            <p className="text-[#4A5B80] flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              {sanitizeContent(details && details.aboutUs.image2)}
            </p>
          </div>
        </div>

        {/* Center image - Dentist */}
        <div className="relative w-full lg:w-auto flex justify-center items-center mb-10 lg:mb-0">
          <img
            src={details && details.aboutUs.image1}
            alt={sanitizeContent(details && details.aboutUs.buttonText1)}
            className="h-[700px] w-full max-w-[500px] object-cover rounded-xl shadow-lg"
          />
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-md w-3/4">
            <h3 className="font-bold text-[#031B4E]">
              {sanitizeContent(details && details.aboutUs.buttonText1)}
            </h3>
            <p className="text-sm text-[#4A5B80]">
              {sanitizeContent(details && details.aboutUs.text2)}
            </p>
          </div>
        </div>

        {/* Right section - Working Hours */}
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm mt-10 lg:mt-[80px]">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#031B4E] mb-6 flex items-center">
            <FaClock className="mr-2 text-[#006D77]" />{" "}
            {sanitizeContent(details && details.Patrners.sectionImage1)}
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#F9F9F9] rounded-xl px-4 py-3">
              <span className="text-[#4A5B80]">
                {sanitizeContent(details && details.Patrners.section1header)}
              </span>
              <span className="font-semibold text-[#031B4E]">
                {sanitizeContent(details && details.Patrners.sectionImage2)}
              </span>
            </div>
            <div className="flex justify-between items-center bg-[#F9F9F9] rounded-xl px-4 py-3">
              <span className="text-[#4A5B80]">
                {sanitizeContent(details && details.Patrners.section2header)}
              </span>
              <span className="font-semibold text-[#031B4E]">
                {sanitizeContent(details && details.Patrners.sectionImage3)}
              </span>
            </div>
            <div className="flex justify-between items-center bg-[#F9F9F9] rounded-xl px-4 py-3">
              <span className="text-[#4A5B80]">
                {sanitizeContent(details && details.Patrners.section3header)}
              </span>
              <span className="font-semibold text-[#031B4E]">
                {sanitizeContent(details && details.Patrners.sectionImage4)}
              </span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-[#4A5B80] mb-2">
                {sanitizeContent(details && details.Patrners.section4header)}
              </p>
              <p className="font-bold text-lg text-[#006D77]">
                {sanitizeContent(details && details.Patrners.buttonText1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div
        id="services"
        className="bg-[#f4f7fb] min-h-screen px-6 md:px-20 py-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Section */}
            <div className="flex flex-col justify-center">
              <p className="text-[#006D77] font-semibold mb-2 flex items-center">
                <FaTeethOpen className="mr-2" /> Our Dental Services
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-[#031B4E] leading-tight mb-6">
                Comprehensive <br /> Dental Solutions
              </h1>
              <p className="text-[#4A5B80] mb-6 text-lg">
                We offer a complete range of dental services using the latest
                technology to ensure optimal oral health for our patients in
                Nigeria.
              </p>
            </div>

            {/* Right Section - Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {eServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
                >
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-12 h-12 mb-4"
                  /> */}

                  <h3 className="text-[#031B4E] text-xl font-semibold mb-2">
                    {service.name}
                  </h3>
                  <p className="text-[#4A5B80] mb-4">
                    {service.shortDescription}
                  </p>
                  <button
                    onClick={handleModalOpen}
                    className="font-semibold text-[#006D77] flex items-center gap-1 hover:underline"
                  >
                    Book Now <FaArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section id="facility" className="py-16 bg-white">
        <div className=" mx-auto lg:px-32 px-4 text-center">
          <p className="text-sm text-[#031B4E] font-bold">
            {sanitizeContent(details && details.Gallery.summary2)}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#031B4E] mt-2 leading-snug">
            {sanitizeContent(details && details.Gallery.summary1)}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-10">
            {projectImages.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-lg shadow-sm"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#f5f9ff] py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div>
            <div className="mb-4 text-sm font-bold text-[#031B4E] flex items-center gap-2">
              <span className="text-lg">🦷</span>{" "}
              {sanitizeContent(details && details.Statistics.section1header)}
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#031B4E] leading-tight mb-8">
              {sanitizeContent(
                details && details.Statistics.section1paragraphy
              )}
            </h2>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#dbeafe] rounded-xl p-6 cursor-pointer shadow-sm hover:shadow transition duration-300"
                  onClick={() => toggleIndex(index)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-[#0a1f44]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg lg:text-xl font-semibold text-[#031B4E]">
                        {item.title}
                      </h3>
                    </div>
                    {openIndex === index ? (
                      <FaChevronDown className="text-[#0a1f44]" />
                    ) : (
                      <FaChevronRight className="text-[#0a1f44]" />
                    )}
                  </div>
                  {openIndex === index && item.content && (
                    <p className="mt-4 text-[#4A5B80] leading-relaxed">
                      {item.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full">
            <img
              src={details && details.Statistics.section1icon}
              alt="Doctors discussing healthcare"
              className="w-full h-auto rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-[#031B4E] font-bold">
            ⏴ Our Dental Experts
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#031B4E] mt-2 leading-snug">
            Smile Brighter with Trusted Care <br /> Compassionate Dentistry,
            Every Step
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="group bg-white rounded-b-xl transition duration-300 ease-in-out hover:bg-[#006D77] text-center shadow-md hover:shadow-xl"
              >
                <div className="rounded-full w-40 h-50 mx-auto mt-6 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="p-4 transition-all duration-300 group-hover:text-white">
                  <h3 className="text-lg font-bold">{doctor.name}</h3>
                  <p className="text-sm text-gray-500 group-hover:text-white mt-1">
                    {doctor.specialty}
                  </p>
                  <div className="flex justify-center gap-4 mt-4">
                    {doctor.socials.map((icon, index) => (
                      <a
                        key={index}
                        href="#"
                        className="text-gray-400 hover:text-[#006D77] group-hover:text-white text-base transition"
                      >
                        <i className={icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left fixed image */}
          <div className="flex justify-center">
            <img
              src={details && details.Reviews.image1}
              alt="Doctor"
              className="rounded-2xl max-w-sm w-full h-auto object-cover"
            />
          </div>

          {/* Testimonial Content */}
          <div>
            <p className="text-l text-[#031B4E] font-bold mb-1">
              👤 Clients Testimonial
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#031B4E] mb-2 leading-tight">
              {sanitizeContent(details && details.Reviews.image3)}
            </h2>
            <p className="text-l text-[#4A5B80] mb-6 max-w-lg">
              Health care is a vital aspect of maintaining overall well-being,
              encompassing a range of services from preventive care
            </p>

            <div className="bg-[#f5f9ff] border border-[#dbeafe] rounded-xl p-6 shadow-sm">
              <p className="text-[#0a1f44] text-2xl leading-relaxed mb-4">
                {text}
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xl text-[#031B4E] font-bold">{name}</p>
                  <p className="text-sm text-[#4A5B80]">{title}</p>
                </div>
                <FaQuoteRight className="text-gray-300 w-8 h-8" />
              </div>

              {/* Arrows */}
              <div className="flex mt-4 space-x-3">
                <button
                  onClick={goToPrevious}
                  className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:bg-[#006D77] hover:text-white transition"
                >
                  <FaChevronLeft size={18} className="mx-auto" />
                </button>
                <button
                  onClick={goToNext}
                  className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:bg-[#006D77] hover:text-white transition"
                >
                  <FaChevronRight size={18} className="mx-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BlackContactForm ecosystemDomain={subdomain} />
      <footer className="bg-[#f3f7fd] text-blue-900 pt-16 px-6 md:px-12 relative">
        {/* Newsletter Section */}
        <div className="mx-auto bg-[#FFF3EA] rounded-2xl p-8 md:p-12 justify-between items-center shadow-lg">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-4xl text-[#031B4E] text-center font-bold leading-tight">
              {sanitizeContent(details && details.LargeCta.header1)}
            </h2>
          </div>
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handleModalOpen}
              className="ml-2 bg-[#031B4E] text-white px-6 py-3 rounded-full hover:bg-[#006D77] transition-colors"
            >
              {sanitizeContent(details && details.LargeCta.buttonText1)}{" "}
              <span className="ml-1">+</span>
            </button>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="flex h-full py-4 px-4 lg:px-24 mt-16  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          {/* Contact */}
          <div className="flex-1">
            <h4 className="font-semibold mb-4 text-[#031B4E]">Contact</h4>
            <p className="flex items-center mb-2">
              📍
              <span className="ml-2 font-semibold text-[#031B4E]">
                {userDetails?.localgovernment}, {userDetails?.state}{" "}
              </span>
            </p>
            <p className="flex items-center mb-2">
              📞
              <span className="ml-2 font-semibold text-[#031B4E]">
                +{userDetails?.phoneNumber}
              </span>
            </p>
            <p className="flex items-center">
              📧
              <span className="ml-2 font-semibold text-[#031B4E]">
                {userDetails?.email}
              </span>
            </p>
          </div>

          {/* Clinic Hours */}
          <div className="flex-1">
            <h4 className="font-semibold mb-4 text-[#031B4E]">
              {" "}
              {sanitizeContent(details && details.Patrners.sectionImage1)}
            </h4>
            <ul className="space-y-2 text-[#4A5B80]">
              <li>
                <strong>
                  {sanitizeContent(details && details.Patrners.section1header)}:
                </strong>{" "}
                {sanitizeContent(details && details.Patrners.sectionImage2)}
              </li>
              <li>
                <strong>
                  {sanitizeContent(details && details.Patrners.section2header)}:
                </strong>{" "}
                {sanitizeContent(details && details.Patrners.sectionImage3)}
              </li>
              <li>
                <strong>
                  {sanitizeContent(details && details.Patrners.section3header)}:
                </strong>{" "}
                {sanitizeContent(details && details.Patrners.sectionImage4)}
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex-1">
            <h4 className="font-semibold mb-4 text-[#031B4E]">Social Media</h4>
            <ul className="space-y-2 text-[#4A5B80]">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pinterest
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Page Links */}
          <div className="flex-1">
            <h4 className="font-semibold mb-4 text-[#031B4E]">Quick Links</h4>
            <ul className="space-y-2 text-[#4A5B80]">
              <li>
                <Link to="#about" className="hover:text-[#006D77] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#services"
                  className="hover:text-[#006D77] transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="#facility"
                  className="hover:text-[#006D77] transition"
                >
                  Our Facility
                </Link>
              </li>
              <li>
                <Link
                  to="#dentists"
                  className="hover:text-[#006D77] transition"
                >
                  Our Dentists
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="  mx-auto mt-12 border-t py-6 text-sm text-center  ">
          <p>
            Copyright &copy; {new Date().getFullYear()}. Made with{" "}
            <a
              href="https://dimpified.com/merchants"
              className="hover:text-sec10"
              target="_blank"
            >
              <span className="text-[#aa0a9a]"> Dimpified </span>{" "}
            </a>
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ThirdDentist;
