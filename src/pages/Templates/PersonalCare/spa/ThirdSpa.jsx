import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaPaperPlane,
  FaSearch,
  FaCheckCircle,
  FaAngleRight,
  FaTwitter,
  FaFacebook,
  FaPinterestP,
  FaInstagram,
  FaEnvelope,
  FaShareAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";

import { spa } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Mitchelle ",
      role: "Therapist",
      image: "https://i.imghippo.com/files/nXcT8826gg.webp",
    },
    {
      name: "Aminat",
      role: "Therapist",
      image: "https://i.imghippo.com/files/KHtR1229VE.jpg",
    },
    {
      name: "David ",
      role: "Therapist",
      image: "https://i.imghippo.com/files/zwJb5715vl.webp",
    },
  ];

  return (
    <section className="bg-[#F8F5F0] py-16 flex flex-wrap justify-center gap-10 px-6">
      {teamMembers.map((member, index) => (
        <TeamCard key={index} member={member} />
      ))}
    </section>
  );
};

const TeamCard = ({ member }) => {
  const [showSocials, setShowSocials] = useState(false);

  return (
    <div className="relative w-full sm:w-72 max-w-[350px]">
      {/* Background Layer */}
      <div className="absolute top-5 left-4 w-full h-[95%] bg-[#EDE4DA] rounded-md -z-10"></div>
      {/* Image and Content */}
      <div className="relative bg-white rounded-md shadow-lg overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-[400px] object-cover"
        />
        {/* Social and Email Icons */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          {/* Share Icon */}
          <button
            onClick={() => setShowSocials(!showSocials)}
            className="bg-white p-2 rounded shadow-md hover:bg-gray-200"
          >
            <FaShareAlt />
          </button>
          {/* Email Icon */}
          <button className="bg-[#B18C52] p-2 rounded shadow-md text-white">
            <FaEnvelope />
          </button>
        </div>
        {/* Social Media Icons Popup */}
        {showSocials && (
          <div className="absolute bottom-14 left-4 flex gap-3 bg-white p-2 rounded shadow-md">
            <FaFacebook className="text-blue-600" />
            <FaTwitter className="text-blue-400" />
            <FaInstagram className="text-pink-500" />
          </div>
        )}
      </div>
      {/* Name & Role */}
      <div className="text-center mt-6">
        <p className="text-gray-500 uppercase text-sm">{member.role}</p>
        <h3 className="text-lg font-semibold">{member.name}</h3>
      </div>
    </div>
  );
};

const ThirdSpa = ({ userDetails }) => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const testimonials = [
    {
      name: "Kevin Martin",
      title: "CEO TheraCare",
      rating: 5,
      quote:
        "Their excellent service, competitive pricing, and customer support make them stand out. It's refreshing to get such a personal touch.",
      image: "https://i.imghippo.com/files/Jsx3765TUo.jpg",
      bgImage:
        "https://i.imghippo.com/files/NZU5413GU.jpg",
    },
    {
      name: "Sarah Johnson",
      title: "Marketing Lead",
      rating: 5,
      quote:
        "Working with this team was a breeze. Professionalism, attention to detail, and timely delivery impressed us.",
      image: "https://i.imghippo.com/files/ZDD4441Wg.jpg",
      bgImage:
        "https://i.imghippo.com/files/NZU5413GU.jpg",
    },
    {
      name: "James Parker",
      title: "Product Manager",
      rating: 5,
      quote:
        "Exceptional quality and customer-centric approach. Their support team was always available and helpful.",
      image: "https://i.imghippo.com/files/vAP4428LXE.jpg",
      bgImage:
        "https://i.imghippo.com/files/NZU5413GU.jpg",
    },
  ];
  const currentTestimonial = testimonials[currentIndex];
  return (
    <div className="bg-gray-100">
      <header className="top-0 left-0 w-full z-50">
        {/* Logo & Icons Line - Only visible before scroll */}
        {!isScrolled && (
          <div className="bg-[#f8f6f2] py-3 md:px-24 px-4 flex justify-between items-center border-b border-gray-300">
            {/* Logo */}
            <a href="#" className="flex items-center text-gray-800">
             
              <span className="text-xs leading-tight">
              Beauty <br />
                <span className="text-yellow-600">Beauty and Spa</span>
              </span>
            </a>
            <nav
              className={`w-full transition-all duration-300 ${
                isScrolled ? "bg-white shadow-lg fixed top-0" : "bg-[#f8f6f2]"
              } hidden md:flex justify-center space-x-8 uppercase`}
            >
              {["Home", "About", "Services", "Gallery", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`text-lg font-bold transition-all ${
                      isScrolled
                        ? "text-black"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {item}
                  </a>
                )
              )}
            </nav>

            {/* Icons & Button */}
            <div className="hidden md:flex items-center space-x-5">
              <button
                onClick={handleModalOpen}
                className="bg-[#b4975a] text-white px-5 py-2 rounded-lg hover:bg-black transition"
              >
                BOOK NOW
              </button>
            </div>

            {/* Hamburger Icon (Mobile) */}
            <button
              className="md:hidden text-2xl text-black"
              onClick={() => setIsMenuOpen(true)}
            >
              <FaBars />
            </button>
          </div>
        )}

        {/* Desktop Navbar */}

        {/* Mobile Navbar (Hamburger Menu) */}
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-2xl text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes />
          </button>

          {/* Mobile Menu Items */}
          <nav className="flex flex-col items-center justify-center h-full space-y-6">
            {["Home", "About", "Services", "Gallery", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xl font-bold text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <section className="relative bg-[#f9f7f3] h-[85vh] flex items-center pt-[100px] mt-14 px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <p className="text-lg md:text-xl uppercase tracking-wider text-gray-500 mb-2">
              Natural approach to better health
            </p>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4 uppercase">
              Discover place where you feel magical
            </h1>
            <button
              onClick={handleModalOpen}
              className="bg-[#b19153] text-white px-6 md:px-8 py-3 md:py-4 rounded-md shadow-md hover:bg-black transition mt-4"
            >
              Book Appointment
            </button>
          </div>
          {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )}

          {/* Right Content (Image & Elements) */}
          <div className="relative flex justify-center items-center">
            {/* Circular Background */}
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] overflow-hidden rounded-full border-4 border-[#f3ede3] shadow-lg">
              <img
                src="https://i.imghippo.com/files/gVb3309Sg.jpg"
                alt="Massage"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative Leaves & Flower */}
            <img
              src="https://i.imghippo.com/files/bTmw4851HL.jpg"
              alt="Leaf"
              className="absolute -top-4 left-4 w-16 md:w-28 opacity-80"
            />
            <img
              src="https://i.imghippo.com/files/veeS8977FY.jpg"
              alt="Flower"
              className="absolute top-2 right-2 w-12 md:w-20 opacity-90"
            />
          </div>
        </div>
      </section>
      <div className="bg-white flex flex-col py-12 px-4 sm:px-8 lg:px-28 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Spa & Beauty Treatment Card */}
          <div className="relative border border-gray-300 rounded-lg overflow-hidden">
            <img
              src="https://i.imghippo.com/files/fcOF6139D.jpg"
              alt="Spa & Beauty Treatment"
              className="w-full sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-white bg-opacity-20 border border-white p-6 sm:p-4 flex flex-col justify-center text-center">
              <i>
                <div className="text-[#b19153] text-xl sm:text-2xl font-semibold tracking-wide mb-2">
                  10% off
                </div>
              </i>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                SPA & BEAUTY <br />
                TREATMENT
              </h3>
              <div
                onClick={handleModalOpen}
                className="bg-[#b19153] text-white py-2 px-4 rounded-md font-semibold text-center cursor-pointer hover:bg-black transition w-fit mx-auto"
              >
                BOOK NOW
              </div>
            </div>
          </div>

          {/* Thai Massage Creams Card */}
          <div className="relative border border-gray-300 rounded-lg overflow-hidden">
            <img
              src="https://i.imghippo.com/files/VWi4812JN.jpg"
              alt="Thai Massage Creams"
              className="w-full sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-white bg-opacity-20 border border-white p-6 sm:p-4 flex flex-col justify-center text-center">
              <i>
                <div className="text-[#b19153] text-xl sm:text-2xl font-semibold tracking-wide mb-2">
                  10% off
                </div>
              </i>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                THAI MASSAGE <br />
                CREAMS
              </h3>
              <div
                onClick={() => (window.location.href = "/services")}
                className="bg-[#b19153] text-white py-2 px-4 rounded-md font-semibold text-center cursor-pointer hover:bg-black transition w-fit mx-auto"
              >
                BOOK NOW
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="about" className="bg-white py-12 px-4 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Image Section */}
          <div className="relative flex justify-center">
            <div className="relative w-[400px] h-[400px]">
              <img
                src="https://i.imghippo.com/files/WA5291VxI.jpg"
                alt="Spa Treatment"
                className="rounded-full w-full h-full object-cover"
              />
              <img
                src="https://i.imghippo.com/files/bTmw4851HL.jpg"
                alt="Flower"
                className="absolute top-0 left-0 w-20"
              />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#b19153] rounded-full"></div>
            </div>
          </div>

          {/* Text Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Essential Balance Wellness</h2>
            <p className="text-[#b19153] font-semibold text-xl">
              We’re providing the best quality & natural spa and beauty
              services.
            </p>
            <p className="text-gray-600">
              Experience the ultimate relaxation with our premium spa and beauty
              services, designed to rejuvenate your mind, body, and soul.
            </p>
            <button
              onClick={handleModalOpen}
              className="bg-[#b19153] text-white px-8 py-4 rounded-md shadow-md hover:bg-black transition mt-6"
            >
              Book Now
            </button>
          </div>

          {/* Benefits Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Our Benefits</h3>
            <ul className="space-y-3">
              {[
                "Quality Services",
                "100% Satisfaction Guarantee",
                "Highly Professional Members",
                "Always Delivering the Best",
                "Best Value Solutions",
                "Professional and Qualified",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-[#b19153] text-white rounded-full">
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <img
                src="https://i.imghippo.com/files/Imi5543yI.jpg"
                alt="Christine"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">Christine - Co Founder</p>
                <img
                  src="https://i.imghippo.com/files/UDEK9615SI.jpg"
                  alt="Signature"
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Opening Hours Section */}
        <div className="bg-[#b19153] text-white mt-16 py-14 px-7 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center gap-4">
            <span className="w-10 h-10 bg-white text-[#b19153] rounded-full flex items-center justify-center">
              ⏰
            </span>
            <h4 className="text-xl font-semibold">Opening Hours</h4>
          </div>
          <div>
            <p className="font-medium">Monday to Friday</p>
            <p>09:00 am - 06:00 pm</p>
          </div>
          <div>
            <p className="font-medium">Saturday</p>
            <p>11:00 am - 03:00 pm</p>
          </div>
        </div>
      </div>
      <section
        id="services"
        className="bg-[#F8F5F1] py-24"
        style={{
          backgroundImage:
            "url('https://i.imghippo.com/files/NZU5413GU.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto max-w-7xl px-6">
          {/* Section Title */}
          <div className="text-center mb-16">
          
            <h6 className="text-2xl text-[#b19153] italic">Spa Services</h6>
            <h3 className="text-5xl font-bold text-white">WHAT WE OFFER</h3>
          </div>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {spa.slice(0, 12).map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden text-center p-10"
              >
                
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="w-full h-full rounded-full border-4 border-[#C8A97E] overflow-hidden">
                    {/* <img
                      src={service.serviceImage}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    /> */}
                  </div>
                 
                </div>

              =
                <h3 className="text-2xl font-semibold text-[#2D2A2A]">
                  {service.name}
                </h3>
                <div className="w-12 h-1 bg-[#C8A97E] mx-auto my-3"></div>
                <p className="text-gray-600">{service.shortDescription}</p>

                <p className="text-gray-900 text-lg py-3">
                  {" "}
                  {getFormattedPrice(service.price, countryCode)}
                </p>

                
                <a
                  onClick={handleModalOpen}
                  className="inline-block mt-8 bg-[#F8F5F1] text-[#2D2A2A] font-semibold px-8 py-4 rounded shadow-md border border-[#C8A97E] transition-all hover:bg-black hover:text-white"
                >
                  BOOK NOW <FaAngleRight className="inline ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="gallery" className="bg-white py-10">
        <div className="flex flex-col h-full py-6 px-6 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Left Image (Circular Mirror Reflection) */}
            <div>
              <img
                src="https://i.imghippo.com/files/Blo2476Wxw.jpg"
                alt="Mirror Reflection"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Middle-Left Column (Two Stacked Images) */}
            <div className="flex flex-col gap-6">
             
              <img
                src="https://i.imghippo.com/files/Xkyv8617k.jpg"
                alt="Massage Image 2"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Middle-Right Column (Single Large Image) */}
            <div>
              <img
                src="https://i.imghippo.com/files/Rrrf6227Fg.jpg"
                alt="Chocolate Facial"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Rightmost Column */}
            <div className="bg-[#C49A5A] flex items-center justify-center p-6 sm:p-10 text-white rounded-lg">
              <div className="text-center">
                <div className="mb-4">
               
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  TRUSTED & RELIABLE SPA & BEAUTY GALLERY
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="testimonial"
        className="bg-cover bg-center py-16 px-4 md:px-12"
        style={{ backgroundImage: `url(${currentTestimonial.bgImage})` }}
      >
        <div className="flex flex-col md:flex-row h-full py-4 px-4 lg:px-24 gap-12 items-center">
          {/* Left Side - Fixed Content */}
          <div className="max-w-lg text-center md:text-left">
            <h6 className="text-[#b19153] text-xl md:text-2xl font-semibold">
              Our Testimonials
            </h6>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase">
              What they’re saying?
            </h3>
            <p className="text-sm md:text-base mb-6">
              Here's what our clients have to say about their{" "}
              <br className="hidden md:block" />
              experience with us. We prioritize excellence and{" "}
              <br className="hidden md:block" /> customer satisfaction.
            </p>
            <div className="flex justify-center md:justify-start items-center gap-4">
              <button
                onClick={handlePrev}
                className="p-3 bg-white text-black rounded-full hover:bg-[#b19153]"
              >
                &larr;
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-white text-black rounded-full hover:bg-[#b19153]"
              >
                &rarr;
              </button>
            </div>
          </div>

          {/* Right Side - Testimonial Content with Image */}
          <div className="relative flex flex-col md:flex-row items-center w-full">
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 flex-1 w-full">
              <h5 className="text-xl md:text-2xl font-semibold text-gray-800">
                {currentTestimonial.name}
              </h5>
              <span className="font-medium block mb-2 text-sm md:text-base">
                {currentTestimonial.title}
              </span>
              <div className="flex mb-3">
                {Array.from({ length: currentTestimonial.rating }).map(
                  (_, i) => (
                    <span key={i} className="text-[#b19153] text-lg md:text-xl">
                      ★
                    </span>
                  )
                )}
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                {currentTestimonial.quote}
              </p>
            </div>

            {/* Testimonial Image */}
            
          </div>
        </div>
      </section>
      <TeamSection />
      <section
        className="relative bg-cover bg-center pt-32 pb-16 text-white"
        style={{
          backgroundImage:
            "url('https://i.imghippo.com/files/Vvk8411vC.jpg')",
        }}
      >
        <div className="flex flex-col h-full  py-4  lg:px-24 px-6 md:px-12 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 4, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
               
                <h6 className="text-[#b19153] italic text-2xl ">
                  Get to know us
                </h6>
                <h2 className="text-5xl font-bold mt-4 leading-tight">
                  Why You Should Choose Us
                </h2>
              </div>
              <p className="mt-6 text-gray-300 text-lg">
                We provide top-tier services, ensuring a remarkable <br />{" "}
                experience for all our customers. Our dedicated team <br /> and
                premium offerings set us apart in the industry.
              </p>
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                "Expert Staff",
                "Gift Package",
                "Best Services",
                "Book Online",
              ].map((title, index) => (
                <div
                  key={index}
                  className="bg-black bg-opacity-70 p-6 rounded-lg flex items-start gap-4 shadow-lg"
                >
                  <div className="bg-[#b19153] rounded-full p-3 flex items-center justify-center">
                    <FaCheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {title}
                    </h3>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <section
        className="relative pt-20 pb-16 -mt-16 bg-cover bg-center bg-no-repeat"
      
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-10 text-center relative">
            {[
              "Years of Experience",
              "Wellness Spa & Beauty",
              "Herbal Skin Treatments",
              "Our Happy Clients",
            ].map((text, index) => (
              <li
                key={index}
                className="flex flex-col items-center space-y-4 relative"
              >
                
                <h3 className="text-4xl font-bold text-gray-900">
                  {[23, 870, 30, 980][index]}
                </h3>
                <p className="text-gray-600 text-lg">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="contact" className="py-16 bg-white">
        <div className="flex flex-col px-4 lg:px-24  ">
          <div className="mb-12">
           
          </div>
          <WhiteContactForm />
        </div>
      </section>
      <footer className="relative bg-[#111] text-white py-16">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://i.imghippo.com/files/gVb3309Sg.jpg')",
          }}
        ></div>

        <div className="flex flex-col h-full  py-4 px-4 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
            {/* About Section */}
            <div className="space-y-4">
              <h3>Teju Beauty and Spa</h3>
            </div>

            {/* Links Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Links</h2>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#about" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white">
                    Services/Plans
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-white">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Contact</h2>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="tel:+9288006930" className="hover:text-white">
                    +234 80 1234 5678
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:needhelp@company.com"
                    className="hover:text-white"
                  >
                    needhelp@company.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    className="hover:text-white"
                  >
                    {userDetails?.address}
                  </a>
                </li>
              </ul>
            </div>

            {/* Timing & Social Links */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Timing</h2>
              <p>Mon to Sat: 9:00am – 6:00pm</p>
              <p>Sunday: Closed</p>
              <div className="flex space-x-4 mt-4 text-xl">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="hover:text-[#b19153]"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="hover:text-[#b19153]"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  className="hover:text-[#b19153]"
                >
                  <FaPinterestP />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:text-[#b19153]"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          {" "}
          &copy; {new Date().getFullYear()} built with{" "}
          <a
            href="https://dimpified.com"
            className="text-gray-400 hover:text-white text-lg"
          >
            Dimpified
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ThirdSpa;