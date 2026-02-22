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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { dental } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const features = [
  {
    title: "Quality Care",
    clinic: "CareMed Clinic",
    icon: "https://gfa-tech.com/dimp-template-images/dentist/dent4.12.jpeg",
  },
  {
    title: "Enhancing Quality Care",
    clinic: "CareMed Clinic",
    icon: "https://gfa-tech.com/dimp-template-images/dentist/dent4.10.jpeg",
  },
  {
    title: "Lives Through Care",
    clinic: "CareMed Clinic",
    icon: "https://gfa-tech.com/dimp-template-images/dentist/dent4.11.jpeg",
  },
  {
    title: "Compassionate Care",
    clinic: "CareMed Clinic",
    icon: "https://gfa-tech.com/dimp-template-images/dentist/dent4.12.jpeg",
  },
];

const projectImages = [
  {
    id: 1,
    src: "https://i.imghippo.com/files/HhrB4936Lpc.jpg",
    alt: "Doctor with child",
  },
  {
    id: 2,
    src: "https://i.imghippo.com/files/u5302W.jpg",
    alt: "Doctors reviewing chart",
  },
  {
    id: 3,
    src: "https://i.imghippo.com/files/E5050FKw.jpg",
    alt: "Doctor with elderly patient",
  },
  {
    id: 4,
    src: "https://i.imghippo.com/files/BpRd9878VUU.jpg",
    alt: "Medical consultation",
  },
];

const doctors = [
  {
    id: 1,
    name: "Dr. Akinwumi Bamidele",
    specialty: "Orthodontist",
    image: "https://i.imghippo.com/files/Lvu9153Wp.jpg",
    socials: [
      "fab fa-facebook-f",
      "fab fa-twitter",
      "fab fa-linkedin-in",
      "fab fa-instagram",
    ],
  },
  {
    id: 2,
    name: "Dr. Chidinma Okoro",
    specialty: "Pediatric Dentist",
    image: "https://i.imghippo.com/files/NNJ9852io.jpg",
    socials: [
      "fab fa-facebook-f",
      "fab fa-twitter",
      "fab fa-linkedin-in",
      "fab fa-instagram",
    ],
  },
  {
    id: 3,
    name: "Dr. Emeka Adeyemi",
    specialty: "Cosmetic Dentistry",
    image: "https://i.imghippo.com/files/kU6460c.jpg",
    socials: [
      "fab fa-facebook-f",
      "fab fa-twitter",
      "fab fa-linkedin-in",
      "fab fa-instagram",
    ],
  },
  {
    id: 4,
    name: "Dr. Olawale Lawal",
    specialty: "General Dentistry",
    image: "https://i.imghippo.com/files/xVt8555fhk.jpg",
    socials: [
      "fab fa-facebook-f",
      "fab fa-twitter",
      "fab fa-linkedin-in",
      "fab fa-instagram",
    ],
  },
];

const testimonials = [
  {
    name: "Mrs. Grace Ayoola",
    title: "Tooth Extraction Patient",
    text: "I was very anxious about having my tooth removed, but Dr. Emeka made the experience smooth and painless. I highly recommend this dental clinic!",
  },
  {
    name: "Mr. Ibrahim Musa",
    title: "Teeth Whitening Client",
    text: "The results were beyond my expectations. The staff are warm and professional. My confidence has greatly improved.",
  },
  {
    name: "Miss Tolu Ogunleye",
    title: "Braces Patient",
    text: "Wearing braces used to be scary, but the orthodontic team here guided me through every step. My smile has never looked better!",
  },
  {
    name: "Mrs. Kemi Uche",
    title: "Routine Cleaning",
    text: "I bring my kids here every six months. The dentists are great with children and always give helpful hygiene tips.",
  },
];

const ThirdDentist = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(1);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      id: 1,
      title: "What should I do in case of a dental emergency?",
      content:
        "If you have a dental emergency such as a broken tooth, severe toothache, or bleeding, contact our clinic immediately. We offer emergency dental care even on Sundays. Apply a cold compress and avoid eating on the affected side until you are seen.",
    },
    {
      id: 2,
      title: "How often should I visit the dentist?",
      content:
        "It is recommended to visit the dentist every six months for a routine check-up and cleaning. Regular visits help prevent cavities, gum disease, and other oral health issues before they become serious.",
    },
    {
      id: 3,
      title: "Do you accept walk-ins or is it strictly by appointment?",
      content:
        "While we prioritize scheduled appointments, we do accept walk-ins based on availability. For faster service and to avoid waiting, we advise booking an appointment in advance.",
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
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const { name, title, text } = testimonials[currentIndex];
  return (
    <div>
      <header className="bg-blue-50 shadow-md relative">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[#006D77]">
              SmileCraft Dental
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
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
              Premium Dental Care <br />
              <span className="text-[#006D77]">In Lagos</span>
            </h1>
            <p className="text-[#4A5B80] text-lg md:text-xl mt-4 mb-8">
              Experience world-class dental treatments with our team of
              certified professionals. We combine advanced technology with
              compassionate care for your perfect smile.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={handleModalOpen}
                className="bg-[#006D77] text-white px-8 py-4 rounded-full hover:bg-[#0F3A51] transition text-center font-medium shadow-lg"
              >
                Book Your Consultation
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
                    +234 812 345 6789
                  </p>
                </div>
              </div>
            </div>

            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )}

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 mt-10">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-[#4A5B80]">Certified Dentists</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-[#4A5B80]">Modern Equipment</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-[#4A5B80]">Pain-Free Procedures</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative w-full  flex justify-center  mt-16 lg:mt-0 z-10">
            <div className="relative">
              <img
                src="https://i.imghippo.com/files/tM1566NYA.jpg"
                alt="Dentist with patient"
                className="w-full max-w-md h-auto object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <div className="bg-[#006D77] text-white p-3 rounded-full mr-3">
                    <FaTooth size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-[#4A5B80]">Dental Specialists</p>
                    <p className="font-bold text-[#031B4E]">
                      15+ Years Experience
                    </p>
                  </div>
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
            <FaTooth className="mr-2" /> About Our Dental Practice
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#031B4E] mb-6 leading-tight">
            Premium Dental Care <br />
            <span className="text-[#006D77]">In Lagos</span>
          </h1>
          <p className="text-[#4A5B80] text-base leading-relaxed mb-6">
            SmileCraft Dental brings world-class oral healthcare to Nigeria with
            state-of-the-art facilities and internationally trained dentists. We
            combine advanced technology with compassionate care for your perfect
            smile.
          </p>
          <div className="space-y-3">
            <p className="text-[#4A5B80] flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Nigerian Dental Association Certified
            </p>
            <p className="text-[#4A5B80] flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Pain-free treatments with modern equipment
            </p>
            <p className="text-[#4A5B80] flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Emergency services available 24/7
            </p>
          </div>
        </div>

        {/* Center image - Dentist */}
        <div className="relative w-full lg:w-auto flex justify-center items-center mb-10 lg:mb-0">
          <img
            src="https://i.imghippo.com/files/NNJ9852io.jpg"
            alt="Dr. Adeola Williams, Chief Dentist"
            className="h-[700px] w-full max-w-[500px] object-cover rounded-xl shadow-lg"
          />
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-md w-3/4">
            <h3 className="font-bold text-[#031B4E]">Dr. Adeola Williams</h3>
            <p className="text-sm text-[#4A5B80]">
              Chief Dentist, 15+ years experience
            </p>
          </div>
        </div>

        {/* Right section - Working Hours */}
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm mt-10 lg:mt-[80px]">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#031B4E] mb-6 flex items-center">
            <FaClock className="mr-2 text-[#006D77]" /> Clinic Hours
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#F9F9F9] rounded-xl px-4 py-3">
              <span className="text-[#4A5B80]">Monday - Friday</span>
              <span className="font-semibold text-[#031B4E]">
                8:00 AM - 7:00 PM
              </span>
            </div>
            <div className="flex justify-between items-center bg-[#F9F9F9] rounded-xl px-4 py-3">
              <span className="text-[#4A5B80]">Saturday</span>
              <span className="font-semibold text-[#031B4E]">
                9:00 AM - 4:00 PM
              </span>
            </div>
            <div className="flex justify-between items-center bg-[#F9F9F9] rounded-xl px-4 py-3">
              <span className="text-[#4A5B80]">Sunday</span>
              <span className="font-semibold text-[#031B4E]">
                Emergency Only
              </span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-[#4A5B80] mb-2">Emergency Contact:</p>
              <p className="font-bold text-lg text-[#006D77]">
                +234 812 345 6789
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

            {/* Right Section - Features Grid */}
            {/* Right Section - Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 - General Dentistry */}
              {dental.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
                >
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-12 h-12 rounded-full mb-4"
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
          <p className="text-sm text-[#031B4E] font-bold">Our Facility</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#031B4E] mt-2 leading-snug">
            Your Dental Wellness is Our Priority
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
              <span className="text-lg">🦷</span> Ask a Dental Question
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#031B4E] leading-tight mb-8">
              Your Smile, Our Priority <br /> Gentle Dental Care Always
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
              src="https://i.imghippo.com/files/DzD8520mQ.jpg"
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
              src="https://i.imghippo.com/files/lkXn1603UH.jpg"
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
              Enhancing patient's lives through <br /> the best dental care
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

      <footer className="bg-[#f3f7fd] text-blue-900 pt-16 px-6 md:px-12 relative">
        {/* Newsletter Section */}
        <div className="mx-auto bg-[#FFF3EA] rounded-2xl p-8 md:p-12 justify-between items-center shadow-lg">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-4xl text-[#031B4E] text-center font-bold leading-tight">
              Get the best possible dental treatment
            </h2>
          </div>
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handleModalOpen}
              className="ml-2 bg-[#031B4E] text-white px-6 py-3 rounded-full hover:bg-[#006D77] transition-colors"
            >
              Book an appointment now<span className="ml-1">+</span>
            </button>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="flex flex-col h-full py-4 px-4 lg:px-24 mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-[#031B4E]">Contact</h4>
            <p className="flex items-center mb-2">
              📍
              <span className="ml-2 font-semibold text-[#031B4E]">
                22 Allen Avenue, Ikeja, Lagos, Nigeria
              </span>
            </p>
            <p className="flex items-center mb-2">
              📞
              <span className="ml-2 font-semibold text-[#031B4E]">
                +234 812 345 6789
              </span>
            </p>
            <p className="flex items-center">
              📧
              <span className="ml-2 font-semibold text-[#031B4E]">
                smilecareclinic.ng@gmail.com
              </span>
            </p>
          </div>

          {/* Clinic Hours */}
          <div>
            <h4 className="font-semibold mb-4 text-[#031B4E]">Clinic Hours</h4>
            <ul className="space-y-2 text-[#4A5B80]">
              <li>
                <strong>Monday - Friday:</strong> 8:00 AM - 7:00 PM
              </li>
              <li>
                <strong>Saturday:</strong> 9:00 AM - 4:00 PM
              </li>
              <li>
                <strong>Sunday:</strong> Emergency Only
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
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
          <div>
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
