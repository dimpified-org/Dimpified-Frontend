import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

import { spa } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";


const FirstSpa = ({ userDetails }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [timeLeft, setTimeLeft] = useState({
    days: 350,
    hours: 30,
    minutes: 50,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                clearInterval(timer);
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);



  const products = [
    {
      id: 1,
      image: "https://i.imghippo.com/files/gLp9324BDE.jpg",
    },
    {
      id: 2,
      image: "https://i.imghippo.com/files/TnU6377jJ.jpg",
    },
    {
      id: 3,
      image: "https://i.imghippo.com/files/pl3873mfk.jpg",
    },
    {
      id: 4,
      image: "https://i.imghippo.com/files/kzp4023cA.jpg",
    },
  ];

  const testimonials = [
    {
      text: "This spa na correct place! From the moment wey I enter, na so my body just calm. The staff sabi their work well and treat person like VIP.",
      name: "Chioma Ade",
      designation: "Self-care Lover",
    },
    {
      text: "Omo, the massage sweet die! The environment just dey peaceful, and the treatment make all my stress disappear. If you never try am, you dey miss!",
      name: "Tunde Bayo",
      designation: "Fitness Coach",
    },
    {
      text: "This spa na premium enjoyment! The body scrub and facials make my skin fresh like new born pikin. I go definitely come back!",
      name: "Amaka Obi",
      designation: "Beauty & Lifestyle Enthusiast",
    },
  ];

  const teamMembers = [
    { name: "Adeola Ogunbiyi", role: "Senior Spa Therapist" },
    { name: "Chinaza Okafor", role: "Facial & Skincare Specialist" },
    { name: "Bola Adigun", role: "Body Massage Expert" },
    { name: "Hassan Bello", role: "Physiotherapy & Wellness Coach" },
  ];

  const funFacts = [
    { value: 24, label: "Years of Experience" },
    { value: 870, label: "Wellness Spa & Beauty" },
    { value: 30, label: "Skin Treatments" },
    { value: 1200, label: "Our Happy Clients" },
  ];

  return (
    <div className="bg-gray-100">
      <>
        {/* Navbar */}
        <nav className=" top-0 left-0 w-full z-50 bg-white shadow-md">
          <div className="container mx-auto px-8 lg:px-12 py-4 flex justify-between items-center">
            {/* Logo */}
            <a href="#" className="flex items-center text-gray-800">
             
              <span className="text-xs leading-tight">
                Delloitte <br />
                <span className="text-yellow-600">Beauty and Spa</span>
              </span>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 text-gray-800 font-medium">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-blue-600 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-800 focus:outline-none"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden fixed top-16 left-0 w-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5 pointer-events-none"
            }`}
          >
            <ul className="space-y-4 p-6 text-gray-800 font-medium">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <button
                onClick={handleModalOpen}
                className="mt-6 px-4 lg:px-6 py-2 lg:py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition"
              >
                BOOK NOW
              </button>
            </ul>
          </div>
        </nav>
      </>

      <section
        id="home"
        className="relative w-full md:min-h-screen h-[70] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://i.imghippo.com/files/pbu1001T.jpg')`,
        }}
      >
        {/* Hero Content */}
        <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center text-center lg:text-left">
          {/* Left Content */}
          <div className="lg:w-1/2 md:mt-0 mt-40">
            <p className="text-black italic text-sm lg:text-lg">
              Professional Styling Since 1970
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-1000 mt-2 leading-tight">
              THE ESSENCE <br /> OF BEAUTY
            </h1>
            <p className="text-gray-900 mt-4 text-sm lg:text-base">
              Relax, refresh, and rejuvenate with our soothing spa treatments
              designed to restore balance and beauty.
            </p>
            <button
              onClick={handleModalOpen}
              className="mt-6 px-4 lg:px-6 py-2 lg:py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition"
            >
              BOOK NOW
            </button>

            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )}
          </div>

         
        </div>
      </section>
      <section id="services" className="relative py-16 bg-gray-100 ">
        {/* Decorative Images */}
        <img
          src="https://i.imghippo.com/files/TLI6303dI.jpg"
          alt="Decorative Left"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-20 opacity-50 hidden md:block"
        />
        <img
          src="https://i.imghippo.com/files/bTmw4851HL.jpg"
          alt="Decorative Right"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-20 opacity-50 hidden md:block"
        />

        {/* Services Content */}
        <div className="lg:px-40 px-6">
          {/* Header */}
          <div className="text-center">
           
            <span className="text-lg text-yellow-600 font-semibold">
              What We Do
            </span>
            <h2 className="text-4xl font-bold mt-2">Our Services</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {spa.map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden h-full flex flex-col transform transition-transform duration-300 hover:scale-105"
              >
                <div className="p-6 flex-grow flex flex-col items-center text-center">
                  {/* <img
                    src={service.serviceImage}
                    alt="Service Icon"
                    className="w-36 mb-4 rounded-full"
                  /> */}
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <p className="text-gray-600 mt-2">{service.shortDescription}</p>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="relative py-16 bg-white">
        <div className="w-full lg:px-32 px-6 flex flex-wrap md:flex-nowrap justify-between gap-x-12">
          {/* Left Section */}
          <div className="w-full md:w-1/2 flex flex-col space-y-6">
            <div className="relative">
              <div className="absolute top-0 left-0 w-24 h-24 bg-gold rounded-full flex items-center justify-center">
                <a
                  href="https://www.youtube.com/watch?v=Fvae8nxzVz4"
                  className="text-white text-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ▶
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://i.imghippo.com/files/nHmb1564fDY.jpg"
                  alt="Image 1"
                  className="w-full rounded-lg h-full"
                />
                <div className="space-y-4">
                  <img
                    src="https://i.imghippo.com/files/Gvlt3169dG.jpg"
                    alt="Image 2"
                    className="w-full rounded-lg"
                  />
                  <img
                    src="https://i.imghippo.com/files/ooO4639yQ.jpg"
                    alt="Image 3"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h4 className="text-yellow-600"> Get to know us</h4>
            <h2 className="text-3xl font-bold text-gray-900">
              Building Physically & Mental Health
            </h2>
            <p className="text-gray-600">
              {userDetails && userDetails.ecosystemDescription}
            </p>
            <div className="flex space-x-8 mt-6">
              <div className="flex flex-col items-center">
                <img
                  src="https://i.imghippo.com/files/PI4311zs.jpg"
                  alt="Manicure"
                  className="w-12"
                />
                <h4 className="mt-2 text-lg font-semibold">Manicure</h4>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="https://i.imghippo.com/files/BezV8981xhg.jpg"
                  alt="Make-up"
                  className="w-12"
                />
                <h4 className="mt-2 text-lg font-semibold">Make-up</h4>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="https://i.imghippo.com/files/MFr8486gH.jpg"
                  alt="Body Message"
                  className="w-12"
                />
                <h4 className="mt-2 text-lg font-semibold">Body Message</h4>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <button
                onClick={handleModalOpen}
                className="bg-yellow-600 text-white py-2 px-6 rounded-lg text-lg
                font-semibold"
              >
                {" "}
                Book Appointment
              </button>
              <div className="ml-6 flex items-center">
                <img
                  src="https://i.imghippo.com/files/pwH7765aI.jpg"
                  alt="Chat"
                  className="w-8"
                />
                <div className="ml-2 text-gray-900">
                  <p>Chat Us Anytime</p>
                  <a href="tel:(406)555-0120" className="text-lg font-semibold">
                    (406) 555-0120
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center md:px-32 w-full py-16 px-4 bg-white relative">
        {/* Right Decorative Image */}
        <img
          src="https://i.imghippo.com/files/lt4581vqk.jpg"
          alt="Decorative Right"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-24 h-24 mt-5 opacity-50"
        />
        {/* Section Title */}
        <h3 className="text-lg italic text-gold">Come & Explore</h3>
        <h2 className="text-4xl font-serif font-bold mb-10">
          Massage & Treatments
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Pagination]}
          slidesPerView={2}
          spaceBetween={20}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          breakpoints={{
            320: { slidesPerView: 2 }, // Small phones
            480: { slidesPerView: 2 }, // Slightly wider phones
            640: { slidesPerView: 2 }, // Tablets in portrait mode
            768: { slidesPerView: 3 }, // Tablets in landscape mode
            1024: { slidesPerView: 4 }, // Laptops
            1280: { slidesPerView: 4 }, // Large screens
            1440: { slidesPerView: 4 }, // Extra-large screens
          }}
          className=" pb-10"
        >
          {spa.map((service, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center">
             
              <button onClick={handleModalOpen}>
                {" "}
                <div className="w-48 h-48 rounded-full border border-gray-300 overflow-hidden">
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  /> */}
                </div>
              </button>
             
              <button onClick={handleModalOpen}>
                <h4 className="text-xl font-semibold mt-4">{service.name}</h4>
              </button>
              <p className="text-gold text-lg font-medium">
                {" "}
                {getFormattedPrice(service.price, countryCode)}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <section
        className="relative bg-cover  bg-center text-white py-20"
        style={{
          backgroundImage:
            "url(https://i.imghippo.com/files/OuV6061hvk.jpg)",
        }}
      >
      
        <div className="container mx-auto px-6 relative">
          <div className="flex md:justify-end justify-center ">
            <div className="text-center max-w-xl">
              <h1 className="text-5xl font-serif">Offer Of The Day</h1>
              <span className="text-xl block mt-2">
                35% Off on Luxury Spa Treatments
              </span>
              <p className="mt-4 text-gray-300">
                Indulge in a serene escape with our exclusive spa therapies.
                Enjoy deep relaxation, detoxifying massages, and rejuvenating
                facials at a discounted rate.
              </p>
              <span className="text-lg block mt-6 text-yellow-500 font-semibold">
                Hurry up! Offer expires soon:
              </span>
              <div className="flex justify-center gap-4 mt-6">
                {Object.entries(timeLeft).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col items-center bg-yellow-500 text-black p-4 rounded-full w-24"
                  >
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-sm uppercase">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="gallery" className="py-16 bg-white relative lg:px-32 px-6">
        <div className="flex flex-wrap items-end justify-center mb-5 text-center md:text-start ">
          <div className="xl:w-5/12 lg:w-5/12 md:w-10/12 w-full ">
            <p className="text-xl italic text-[#c9a76a] font-semibold tracking-wide">
              Nature-Inspired Beauty
            </p>
            <h2 className="text-5xl font-extrabold text-gray-900 leading-tight md:w-3/4 ">
              Gallery
            </h2>
          </div>
          <div className="xl:w-7/12 md:w-7/12 w-12/12">
            {" "}
            <p className="text-gray-600 text-lg leading-relaxed md:w-2/3 w-full">
              Immerse yourself in a world of tranquility and rejuvenation.
              Explore our serene spa haven, where every moment is designed for
              relaxation and renewal.
            </p>
          </div>
        </div>

        <div className=" mt-10">
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="text-left">
                <a
                  href={product.link}
                  className="block rounded-lg overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[350px] object-cover rounded-lg shadow-lg"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-16 bg-white">
        {/* Left Decorative Image */}
        <img
          src="https://i.imghippo.com/files/veeS8977FY.jpg"
          alt="Decorative Left"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-24 h-24 opacity-50"
        />

        {/* Right Decorative Image */}
        <img
          src="https://i.imghippo.com/files/bTmw4851HL.jpg"
          alt="Decorative Right"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-24 h-24 opacity-50"
        />

        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="text-lg text-gold italic"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            
            Testimonial
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-semibold mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            What they say?
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto mt-10 relative">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-gold text-xl" />
              ))}
            </div>
            <p className="text-gray-600 italic text-lg">
              “ {testimonials[activeIndex].text} ”
            </p>
            <h4 className="mt-4 font-semibold text-lg">
              {testimonials[activeIndex].name} -
            </h4>
            <span className="text-gray-500">
              {testimonials[activeIndex].designation}
            </span>
          </motion.div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index ? "bg-gold" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-16 bg-white">
        <div className="w-full px-6 lg:px-16 flex flex-wrap lg:flex-nowrap items-center">
          {/* Left Image Section */}
          <div className="w-full lg:w-[55%]">
            <img
              src="https://i.imghippo.com/files/PI4311zs.jpg"
              alt="Feature"
              className="rounded-full w-full max-w-[600px] h-auto object-cover"
            />
          </div>

          {/* Right Content Section */}
          <div className="w-full lg:w-[45%] lg:pl-12">
            <div className="text-center lg:text-left">
              <img
                src="https://i.imghippo.com/files/wiaX5094.jpg"
                alt="Icon"
                className="mx-auto lg:mx-0 mb-4"
              />
              <p className="text-gold italic text-lg">Wellness Spa Retreats</p>
              <h2 className="text-4xl font-bold leading-tight my-3">
                The Ultimate <br /> Relaxation
              </h2>
              <p className="text-gray-500 text-lg">
                Experience tranquility and rejuvenation with our exclusive spa
                treatments. From calming aromatherapy to deep tissue massages,
                we provide the perfect escape for your mind, body, and soul. Let
                us pamper you with luxury and care.
              </p>
            </div>

            {/* Features List */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Body Scrubs",
                "Cellulite Treatments",
                "Back Treatments",
                "Body Polish",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img
                    src="https://i.imghippo.com/files/pwH7765aI.jpg"
                    alt="Icon"
                    className="w-5"
                  />
                  <h3 className="text-lg font-medium">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white px-4 text-center">
        
        <h3 className="text-lg italic text-gray-500">Our team</h3>
        <h2 className="text-4xl font-serif font-bold mt-2">
          Meet Certified Therapist
        </h2>
        <div className="mt-8 space-y-4 max-w-3xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-3"
            >
              <p className="text-xl font-semibold">
                {member.name}{" "}
                <span className="text-gray-500">/ {member.role}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
      <section
        className="py-16 text-center relative bg-cover bg-center mt-10 bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://i.imghippo.com/files/hRGz9598osc.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        

        {/* Fun Facts Content */}
        <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
          {funFacts.map((fact, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl text-black font-bold">{fact.value}</p>
              <p className="text-xl text-black">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>
      <footer id="contact" className="relative bg-black text-white py-12">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/images/background/bg-footer1.jpg')",
          }}
        ></div>
        <div className="relative container mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            {/* Logo */}
            <a href="/" className="flex items-center text-gray-800">
        
              <span className="text-xl text-white leading-tight">
                Bliss & Glow <br />
                <span className="text-yellow-600">Beauty and Spa</span>
              </span>
            </a>
            <p className="mb-4 mt-6">
              Indulge in tranquility with our luxurious spa treatments. From
              soothing massages to rejuvenating facials, we bring you the
              perfect escape for relaxation and self-care.
            </p>

            <div className="flex space-x-4 mt-4 text-xl">
              <a href="#" className="hover:text-gold">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-gold">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gold">
                <FaTwitter />
              </a>
            </div>
          </div>
          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-gold">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold">
                  Gallery
                </a>
              </li>
              <li>
                <button onClick={handleModalOpen} className="hover:text-gold">
                  Book an Appointment
                </button>
              </li>
            </ul>
          </div>
          {/* Open Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Spa Hours</h3>
            <ul className="space-y-2">
              <li>
                Monday to Friday:{" "}
                <span className="text-gold">09:00 AM - 08:00 PM</span>
              </li>
              <li>
                Saturday: <span className="text-gold">09:00 AM - 06:00 PM</span>
              </li>
              <li>
                Sunday: <span className="text-gold">10:00 AM - 04:00 PM</span>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>{userDetails && userDetails.address}</p>
            <p className="text-gold font-bold mt-2">+234 80 1234 5678</p>
            <a
              href="mailto:info@Bliss & Glowspa.com"
              className="text-gold hover:underline"
            >
              {userDetails && userDetails.email}
            </a>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="relative text-center text-sm mt-10 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} Bliss & Glow Beauty and Spa. All
          Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default FirstSpa;