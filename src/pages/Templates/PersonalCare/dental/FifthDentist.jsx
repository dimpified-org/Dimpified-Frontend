import React, { useState, useRef } from "react";
import {
  FaInstagram,
  FaStar,
  FaBars,
  FaTimes,
  FaQuoteRight,
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTooth,
  FaCalendarCheck,
  FaLocationArrow,
  FaCross,
  FaPlus,
  FaCheckCircle,
  FaThumbsUp,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { dental } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { FaCalendarDays, FaMaskFace, FaPlusMinus } from "react-icons/fa6";

const FifthDentist = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => {
    setMobileOpen((prev) => !prev);
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

  const doctors = [
    {
      name: "Dr. Adebayo Ogunlesi",
      specialty: "ORAL SURGEON",
      image: "https://i.imghippo.com/files/pbEa5382cbM.jpg",
      socials: true,
    },
    {
      name: "Dr. Chioma Eze",
      specialty: "PEDIATRIC DENTIST",
      image: "https://i.imghippo.com/files/hEI7778zSE.jpg",
      socials: true,
    },
    {
      name: "Dr. Ibrahim Mohammed",
      specialty: "ORTHODONTIST",
      image: "https://i.imghippo.com/files/JnrP7823sg.jpg",
      socials: true,
    },
    {
      name: "Dr. Folake Adeleke",
      specialty: "PERIODONTIST",
      image: "https://i.imghippo.com/files/hcUS2458fsQ.jpg",
      socials: true,
    },
    {
      name: "Dr. Ngozi Okonkwo",
      specialty: "PROSTHODONTIST",
      image: "https://i.imghippo.com/files/XMw6785iH.jpg",
      socials: true,
    },
    {
      name: "Dr. Emeka Nwachukwu",
      specialty: "ENDODONTIST",
      image: "https://i.imghippo.com/files/hcUS2458fsQ.jpg",
      socials: true,
    },
  ];

  const imageUrls = [
    "https://i.imghippo.com/files/NSg4765Flc.jpg",
    "https://i.imghippo.com/files/DuD8831A.jpg",
    "https://i.imghippo.com/files/FXX9273E.jpg",
    "https://i.imghippo.com/files/ACHn1685Tz.jpg",
    "https://i.imghippo.com/files/rcI4963oaw.jpg",
    "https://i.imghippo.com/files/FJa3224ek.jpg",
    "https://i.imghippo.com/files/to2231Dlc.jpg",
    "https://i.imghippo.com/files/qfA7910XI.jpg",
  ];

  const testimonials = [
    {
      name: "Mr. Olatunji Bankole",
      role: "BUSINESS EXECUTIVE",
      image: "https://i.imghippo.com/files/WPW7634yyI.jpg",
      rating: 5,
      text: "The dental implant procedure was completely painless and the results are amazing. I can now eat and smile with confidence thanks to SmileCrest Dental.",
    },
    {
      name: "Mrs. Amina Yusuf",
      role: "BANKING PROFESSIONAL",
      image: "https://i.imghippo.com/files/pm1939DSg.jpg",
      rating: 5,
      text: "My children actually look forward to their dental visits! The pediatric team makes them feel so comfortable and explains everything in a fun way.",
    },
    {
      name: "Chief Williams",
      role: "COMMUNITY LEADER",
      image: "https://i.imghippo.com/files/uRb1907jQA.jpg",
      rating: 5,
      text: "After years of hiding my smile, the cosmetic dentistry team transformed my teeth. The professional yet friendly approach made the entire process enjoyable.",
    },
  ];

 const processSteps = [
    {
      id: 1,
      title: "Comprehensive Examination",
      description:
        "We conduct thorough oral examinations using digital X-rays and intraoral cameras to accurately diagnose your dental needs.",
      image: "https://i.imghippo.com/files/arZY8895IKk.jpg",
    },
    {
      id: 2,
      title: "Personalized Treatment Plan",
      description:
        "Our dentists create customized treatment plans that address your specific concerns while considering your budget and timeline.",
      image: "https://i.imghippo.com/files/Rf7299nAY.jpg",
    },
    {
      id: 3,
      title: "Quality Dental Treatment",
      description:
        "Experience comfortable, world-class dental care using modern equipment and techniques in our sterile, welcoming environment.",
      image: "https://i.imghippo.com/files/EZp4191uvA.jpg",
    },
  ];

  const ProcessCard = ({ step, index }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
      <div
        ref={ref}
        className={`transition-all duration-1000 ease-in-out transform ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } bg-gray-100 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row my-6`}
      >
        <div className="flex-1 p-6 flex flex-col justify-center text-left">
          <div className="text-3xl mb-2">{step.icon}</div>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            {step.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">{step.description}</p>
          <button
            onClick={handleModalOpen}
            className="bg-[#2687EF] text-white px-4 py-2 rounded-full hover:bg-blue-700 w-max"
          >
            Book an appointment
          </button>
        </div>
        <div className="flex-1">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  };

  const ServiceItem = ({ service, isHovered, onMouseEnter, onMouseLeave }) => (
    <div
      className="relative border rounded-2xl p-6 flex justify-between items-center hover:bg-white shadow-md transition duration-300 cursor-pointer group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl">{service.icon}</div>
        <div className="text-xl md:text-2xl font-bold text-[#003878]">
          {service.title}
        </div>
      </div>
      <div className="hidden md:block text-sm text-gray-500 w-1/2">
        {service.description}
      </div>
      <div className="text-[#2687EF] text-2xl">→</div>
      {isHovered && (
        <img
          src={service.image}
          alt="Service"
          className="absolute top-1/2 left-1/2 w-28 md:w-40 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-90 rounded-xl shadow-lg"
        />
      )}
    </div>
  );

  return (
    <div className="font-sans">
      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#003366] font-bold text-xl">
            <FaTooth className="text-[#2687EF]" />
            <span>SmileCrest Dental</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-[#003366] font-semibold uppercase text-sm">
            <a href="#home" className="hover:text-[#2687EF]">
              Home
            </a>
            <a href="#about" className="hover:text-[#2687EF]">
              About Us
            </a>
            <a href="#services" className="hover:text-[#2687EF]">
              Services
            </a>
            <a href="#dentist" className="hover:text-[#2687EF]">
              Dentists
            </a>
            <a href="#gallery" className="hover:text-[#2687EF]">
              Gallery
            </a>
            <a href="#contact" className="hover:text-[#2687EF]">
              Contact
            </a>
          </nav>

          {/* Mobile Icon */}
          <div
            className="md:hidden text-2xl text-[#003366]"
            onClick={toggleMenu}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </div>

          <button
            onClick={handleModalOpen}
            className="mt-4 hidden md:block bg-[#007bff] hover:bg-[#005fc1] text-white font-bold py-2 px-4 rounded-full text-sm"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white px-4 py-4 flex flex-col gap-4 text-[#003366] font-semibold uppercase text-sm transition-all duration-300">
            <a href="#home" className="hover:text-[#2687EF]">
              Home
            </a>
            <a href="#about" className="hover:text-[#2687EF]">
              About Us
            </a>
            <a href="#services" className="hover:text-[#2687EF]">
              Services
            </a>
            <a href="#dentist" className="hover:text-[#2687EF]">
              Dentists
            </a>
            <a href="#gallery" className="hover:text-[#2687EF]">
              Gallery
            </a>
            <a href="#contact" className="hover:text-[#2687EF]">
              Contact
            </a>
            <button
              onClick={handleModalOpen}
              className="mt-4 bg-[#007bff] hover:bg-[#005fc1] text-white font-bold py-2 px-4 rounded-full text-sm"
            >
              Book Appointment
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-[#003366] text-white pt-24 px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 pb-16">
            {/* Left Text */}
            <div className="md:w-2/3">
              <p className="uppercase text-xs tracking-wide">
                PREMIUM DENTAL CARE IN NIGERIA
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-2">
                Exceptional Dental Care <br /> For Your Entire Family
              </h1>
            </div>
            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )}

            {/* Right Paragraph */}
            <div className="md:w-1/3 text-xl text-gray-200">
              <p>
                At SmileCrest Dental, we provide world-class dental services
                using modern equipment and techniques. Our team of experienced
                Nigerian dentists is committed to delivering affordable,
                comfortable care for patients of all ages.
              </p>
            </div>
          </div>

          {/* Image Centered Below Content */}
          <div className="flex justify-center">
            <div className="bg-white p-2 rounded-xl shadow-xl -mb-28">
              <img
                src="https://i.imghippo.com/files/KwTw5263aMk.jpg"
                alt="Dental Team"
                className="w-[30vw] max-w-5xl rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to ensure next section is pushed down */}
      <div className="h-32 md:h-40"></div>

      {/* Main Content */}
      <main className="bg-white">
        {/* Services Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <div>
                <p className="uppercase text-sm text-[#2687EF] font-medium mb-1">
                  Our Dental Services
                </p>
                <h2 className="text-[#003878] text-3xl md:text-4xl font-extrabold">
                  Comprehensive Dental Solutions
                </h2>
              </div>
              <a href="#services">
                {" "}
                <button className="bg-[#2687EF] hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm md:text-base">
                  View All Services
                </button>
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white shadow-md p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Clinic Hours</h3>
                  <span className="text-2xl">
                    <FaCalendarDays
                      className="text-[#2687EF] text-2xl
                  "
                    />
                  </span>
                </div>
                <ul className="text-sm text-gray-600 font-medium leading-7">
                  <li>
                    Monday – Friday:{" "}
                    <span className="float-right">8:00 AM – 8:00 PM</span>
                  </li>
                  <li>
                    Saturday:{" "}
                    <span className="float-right">9:00 AM – 5:00 PM</span>
                  </li>
                  <li>
                    Sunday: <span className="float-right">Emergency Only</span>
                  </li>
                  <li className="text-[#2687EF] mt-2">
                    24/7 Emergency Dental Service
                  </li>
                </ul>
              </div>

              <div className="bg-white shadow-md p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Our Locations</h3>
                  <FaLocationArrow className="text-[#2687EF] text-2xl" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  We have multiple clinics across Lagos, Abuja, and Port
                  Harcourt to serve you better.
                </p>
                <button className="bg-[#2687EF] text-white px-4 py-2 rounded-full text-sm hover:bg-[#2687EF]">
                  Find Nearest Clinic
                </button>
              </div>

              <div className="bg-white shadow-md p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Emergency Care</h3>
                  <FaMaskFace className="text-[#2687EF] text-4xl" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Immediate attention for dental emergencies including severe
                  pain, trauma, and swelling.
                </p>
                <p className="text-[#2687EF] font-bold text-lg">
                  <span>
                    <FaPhoneAlt className="mr-2" /> 081 1234 5678
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="bg-[#2283f6] text-white py-20 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
            <div>
              <img
                src="https://i.imghippo.com/files/ZS5190XgE.jpg"
                alt="Dentist with Patient"
                className="rounded-xl w-[500px] shadow-lg"
              />
            </div>
            <div>
              <p className="uppercase text-sm font-semibold mb-2">
                About SmileCrest
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                Your Journey To A Perfect <br /> Smile Starts Here
              </h2>
              <p className="text-sm text-white/90 mb-6 max-w-md">
                Established in 2010, SmileCrest Dental has grown to become one
                of Nigeria's most trusted dental care providers. Our team of
                locally-trained and internationally-certified dentists combines
                global expertise with understanding of Nigerian dental health
                needs.
              </p>
              <div className="flex items-start mb-6 gap-4">
                <FaThumbsUp className="text-white text-4xl" />
                <div>
                  <h3 className="text-lg font-bold mb-1">
                    NDA-Accredited Facility
                  </h3>
                  <p className="text-sm text-white/90">
                    Our clinics meet the highest standards set by the Nigerian
                    Dental Association, ensuring safe, professional care.
                  </p>
                </div>
              </div>
              <button
                onClick={handleModalOpen}
                className="bg-white text-[#2687EF] px-6 py-2 rounded-full font-semibold text-sm hover:bg-blue-100"
              >
                Book an appointment
              </button>
            </div>
          </div>
        </section>
        {/* Process Section */}
        <section id="process" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="uppercase text-xl text-[#2687EF] font-medium">
                Our Process
              </p>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-4xl md:text-4xl font-bold text-[#003878] max-w-2xl">
                  Quality Dental Care in 3 Simple Steps
                </h2>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {processSteps.map((step, index) => (
                <ProcessCard key={step.id} step={step} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Dental Services Section */}
        <section className="bg-[#003d7c] text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <div>
                <p className="uppercase text-sm font-medium tracking-wide">
                  Dental Specialties
                </p>
                <h2 className="text-3xl md:text-5xl font-extrabold mt-2">
                  Specialized Dental Care for Nigerians
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dental.map((service, index) => (
                <div
                  key={index}
                  className="rounded-lg p-6 h-full transition duration-300 cursor-pointer group ${
                   bg-white text-gray-800 hover:bg-[#2687EF] hover:text-white"
                >
                  <div className="flex flex-col justify-between h-full gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm md:text-base leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>
                    <div className="text-4xl opacity-70 group-hover:opacity-100">
                      {/* <img
                        src={service.serviceImage}
                        alt={service.name}
                        className="w-12 h-12 "
                      /> */}
                    </div>

                    <button
                      onClick={handleModalOpen}
                      className="mt-auto inline-block bg-transparent border border-[#2687EF] hover:border-white  hover:text-white bg-[#2687EF] text-[#007bff]  px-4 py-2 rounded-full text-sm w-fit transition"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Portfolio Section */}
        <section id="gallery" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <div>
                <h4 className="text-sm text-[#2687EF] uppercase font-medium">
                  Our Work
                </h4>
                <h2 className="text-3xl md:text-4xl font-bold text-[#003878] mt-2">
                  Smile Transformations
                </h2>
              </div>
            </div>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1.2}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 2.2 },
                768: { slidesPerView: 3.2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {imageUrls.map((url, idx) => (
                <SwiperSlide key={idx}>
                  <div className="overflow-hidden rounded-lg shadow-md h-[280px] md:h-[300px] lg:h-[320px]">
                    <img
                      src={url + "?auto=format&fit=crop&w=800&q=80"}
                      alt={`dental-case-${idx}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Appointment Section */}
        <section id="contact" className="bg-[#f4f9ff] py-16 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2687EF] uppercase text-xl font-semibold mb-2">
                Book Appointment
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#003878] mb-4">
                Schedule Your Dental Visit
              </h2>
              <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
                Our friendly staff will contact you to confirm your appointment.
                We accept all major insurance plans and offer flexible payment
                options for comprehensive dental care.
              </p>
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://i.imghippo.com/files/QJRh5505tY.jpg"
                  alt="Dental Consultation"
                  className="w-[400px] h-auto object-cover"
                />
              </div>
            </div>

            <WhiteContactForm />
          </div>
        </section>

        {/* Doctors Section */}
        <section id="dentist" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div>
              <h3 className="text-xl font-medium text-[#2687EF] uppercase mb-2">
                OUR SPECIALISTS
              </h3>
              <h2 className="text-4xl md:text-4xl font-bold text-[#003878] mb-12">
                Meet Our Dental Experts
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {doctors.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white rounded-lg shadow-sm p-4 gap-6"
                  >
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#003878]">
                        {doc.name}
                      </h3>
                      <p className="text-[#2687EF] text-sm mt-1">
                        {doc.specialty}
                      </p>
                      {doc.socials && (
                        <div className="flex gap-3 mt-3 text-[#003878] ">
                          <a href="#">
                            <FaInstagram className="text-xl hover:text-pink-600" />
                          </a>
                          <a href="#">
                            <FaFacebookF className="text-xl hover:text-[#2687EF]" />
                          </a>
                          <a href="#">
                            <FaLinkedinIn className="text-xl hover:text-blue-700" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-[#f7fafe] py-28 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-16">
              <div>
                <p className="text-[#2687EF] text-xl font-medium uppercase">
                  Testimonials
                </p>
                <h2 className="text-4xl md:text-4xl font-bold text-[#0f2f57]">
                  Testimonial Consistent Health Support
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4 sm:px-6 lg:px-8">
              {/* Left - Testimonial */}
              <div className="relative w-full">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }}
                  className="w-full"
                >
                  {testimonials.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="relative space-y-6 p-4 sm:p-6 md:p-8">
                        {/* Stars */}
                        <div className="flex space-x-1 text-yellow-500">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <FaStar key={i} className="text-base sm:text-lg" />
                          ))}
                        </div>

                        {/* Quote Icon */}
                        <FaQuoteRight className="text-[40px] sm:text-[50px] md:text-[60px] text-blue-200 absolute right-2 top-2 sm:right-4 sm:top-4" />

                        {/* Testimonial */}
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed pr-8 sm:pr-12 md:pr-16">
                          {item.text}
                        </p>

                        {/* Divider */}
                        <hr className="border-gray-300 w-full" />

                        {/* Author Info */}
                        <div className="flex items-center gap-3 sm:gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-md"
                          />
                          <div>
                            <h4 className="text-base sm:text-lg font-semibold text-[#0f2f57]">
                              {item.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-[#2687EF]">
                              {item.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigation Arrows */}
                <div className="absolute -bottom-10 right-2 flex gap-3 mt-6">
                  <button
                    ref={prevRef}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-[#2687EF] text-white rounded-full flex items-center justify-center text-lg sm:text-xl hover:bg-blue-700 transition"
                  >
                    ←
                  </button>
                  <button
                    ref={nextRef}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-[#2687EF] text-white rounded-full flex items-center justify-center text-lg sm:text-xl hover:bg-blue-700 transition"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Right - Doctor Image */}
              <div className="flex justify-center mt-10 md:mt-0">
                <img
                  src="https://i.imghippo.com/files/e4183xXQ.jpg"
                  alt="Doctor Group"
                  className="w-[250px] sm:w-[320px] md:w-[400px] h-auto max-h-[350px] sm:max-h-[400px] md:max-h-[450px] object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#003366] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-xl">
                <FaTooth className="text-white" />
                <span>SmileCrest Dental</span>
              </div>
              <p className="mb-4 text-sm leading-6">
                There are many variations of passages by injected humour
                randomised
              </p>
              <div className="flex space-x-4">
                <a href="#">
                  <FaInstagram className="bg-white text-[#003366] p-2 rounded-full w-9 h-9" />
                </a>
                <a href="#">
                  <FaFacebookF className="bg-white text-[#003366] p-2 rounded-full w-9 h-9" />
                </a>
                <a href="#">
                  <FaPinterestP className="bg-white text-[#003366] p-2 rounded-full w-9 h-9" />
                </a>
                <a href="#">
                  <FaLinkedinIn className="bg-white text-[#003366] p-2 rounded-full w-9 h-9" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  {" "}
                  <a href="#about">About Us</a>
                </li>
                <li>
                  {" "}
                  <a href="#services">Our Services</a>
                </li>
                <li>
                  {" "}
                  <a href="#process">Our Process</a>
                </li>
                <li>
                  {" "}
                  <a href="#contact">Contact Us</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact Info</h3>
              <ul className="text-sm space-y-3">
                <li className="flex items-start gap-2">
                  <FaEnvelope className="mt-1" /> Email: info@smilecrest.com
                </li>
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-1" /> Address: Lagos, Nigeria
                </li>
                <li className="flex items-start gap-2">
                  <FaPhoneAlt className="mt-1" /> Phone: +234 81 1234 5678
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">News Letter</h3>
              <div className="relative mb-4">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full px-4 py-3 rounded-full text-[#003366] focus:outline-none"
                />
                <button className="absolute right-3 top-3 text-[#003366]">
                  <FiSend size={20} />
                </button>
              </div>
              <label className="flex items-center text-sm gap-2">
                <input type="checkbox" className="accent-white" />I Agree To All
                Your Terms & Conditions
              </label>
            </div>
          </div>

          <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm">
            Copyright 2024 Medicen Theme by Peacefulqode | All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FifthDentist;
