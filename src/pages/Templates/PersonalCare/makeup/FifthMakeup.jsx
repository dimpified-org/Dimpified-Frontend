import React, { useState, useEffect, useRef } from "react";
import { FaScissors, FaTooth } from "react-icons/fa6";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { GiRazor, GiMustache } from "react-icons/gi";
import { TbBrush } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { MakeUp } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

const FifthMakeup = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const slides = [
    {
      bgImage:
        "https://gfa-tech.com/dimp-template-images/make-up/fredia-testi3.jpg",
      title: "Glamour Haven Your Oasis for Beauty & Transformation",
      subtitle: "Welcome to Glamourista",
    },
  ];

  const testimonials = [
    {
      text: "There are design companies, and then there are user experience design interface design professional. By far one of the world's best known brands.",
      author: "Anita Tran, IT Solutions.",
      background:
        "https://gfa-tech.com/dimp-template-images/make-up/makeup5.7.jpg",
    },
    {
      text: "They truly exceeded all expectations. Professional service and expert advice every step of the way.",
      author: "John Doe, TechCorp.",
      background:
        "https://gfa-tech.com/dimp-template-images/make-up/makeup5.7.jpg",
    },
    {
      text: "An outstanding experience from beginning to end. Beautiful environment and great energy!",
      author: "Maria Lopez, Creative Agency.",
      background:
        "https://gfa-tech.com/dimp-template-images/make-up/makeup5.7.jpg",
    },
    {
      text: "Flawless execution and brilliant results. Highly recommend their services to everyone.",
      author: "James Smith, Startup Inc.",
      background:
        "https://gfa-tech.com/dimp-template-images/make-up/makeup5.7.jpg",
    },
  ];

  const blogPosts = [
    {
      category: "Beauty",
      title: "Minimalist trends in modern makeup techniques 2024",
      description:
        "Makeup artistry has evolved with new techniques and products that enhance natural beauty while maintaining simplicity.",
      image: "https://gfa-tech.com/dimp-template-images/make-up/makeup5.11.jpg",
    },
    {
      category: "Trends",
      title: "Latest bridal makeup looks from Paris fashion week",
      description:
        "Makeup artistry has evolved with new techniques and products that enhance natural beauty while maintaining simplicity.",
      image: "https://gfa-tech.com/dimp-template-images/make-up/makeup5.12.jpg",
    },
    {
      category: "Tips",
      title: "How to achieve the perfect natural makeup look at home",
      description:
        "Makeup artistry has evolved with new techniques and products that enhance natural beauty while maintaining simplicity.",
      image: "https://gfa-tech.com/dimp-template-images/make-up/makeup5.10.jpg",
    },
  ];

  const brandLogos = [
    "https://gfa-tech.com/dimp-template-images/make-up/brand1.png",
    "https://gfa-tech.com/dimp-template-images/make-up/brand2.png",
    "https://gfa-tech.com/dimp-template-images/make-up/brand3.png",
    "https://gfa-tech.com/dimp-template-images/make-up/brand4.png",
    "https://gfa-tech.com/dimp-template-images/make-up/brand5.png",
  ];

  const TeamCard = ({ member }) => (
    <div className="p-4">
      <div className="relative group overflow-hidden shadow-md rounded-md">
        <img
          src={member.image}
          alt={member.name}
          className="w-full object-cover h-96"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end justify-end opacity-0 group-hover:opacity-100 transition-opacity p-4">
          <div className="space-y-2 text-white text-right">
            <i className="fa fa-share-alt text-lg"></i>
            <div className="flex flex-col items-end space-y-1 mt-2">
              <a href="https://twitter.com" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://facebook.com" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://pinterest.com" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">{member.designation}</span>
        <h3 className="text-lg font-semibold">
          <a href={member.link}>{member.name}</a>
        </h3>
      </div>
    </div>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
    }
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen ? "bg-black" : "bg-transparent"
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">GLAMORISTA</div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-m uppercase tracking-wider">
            <a href="#home" className="hover:text-[#9E8A78]">
              Home
            </a>
            <a href="#about" className="hover:text-[#9E8A78]">
              About
            </a>
            <a href="#services" className="hover:text-[#9E8A78]">
              Services
            </a>
            <a href="#team" className="hover:text-[#9E8A78]">
              Team
            </a>
            <a href="#testimonial" className="hover:text-[#9E8A78]">
              Testimonial
            </a>
            <a href="#contact" className="hover:text-[#9E8A78]">
              Contact
            </a>
          </nav>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              <i
                className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}
              ></i>
            </button>
          </div>

          {/* Booking Button - Desktop Only */}
          <button
            onClick={handleModalOpen}
            className="hidden md:inline-block bg-[#9E8A78] text-white uppercase px-6 py-3 font-semibold rounded hover:bg-[#7f6f5e] transition"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black text-white text-center py-4 z-50 shadow-lg">
            {[
              "home",
              "about",
              "services",
              "team",
              "testimonial",
              "contact",
            ].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-[#9E8A78]"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
            <button
              onClick={handleModalOpen}
              className="inline-block mt-4 bg-[#9E8A78] text-white uppercase px-5 py-2 text-sm font-semibold rounded hover:bg-[#7f6f5e]"
            >
              Book Appointment
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className={`relative bg-cover bg-center transition-all duration-300 ${
          mobileMenuOpen ? "mt-[290px]" : "mt-0"
        } h-[80vh] md:h-screen`}
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/make-up/makeup5.2.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 h-full flex items-center justify-center md:justify-start text-center md:text-left px-6 md:px-16">
          <div>
            <h5 className="text-white text-m uppercase mb-4 tracking-wider">
              Welcome to Glamourista
            </h5>
            <h1 className="text-4xl text-white md:text-6xl font-bold leading-tight mb-6">
              Your Glamour Destination
              <br /> for Makeup & Elegance
            </h1>
            <p className="text-white">
              Our professional makeup artists specialize in enhancing your
              natural beauty for any occasion.
              <br />
              From bridal makeup to special events, we create looks that make
              you feel confident
              <br />
              and radiant with our premium products and expert techniques.
            </p>
            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )}

            <button
              onClick={handleModalOpen}
              className="mt-5 inline-block bg-[#9E8A78] text-white uppercase px-6 py-3 font-semibold rounded hover:bg-[#7f6f5e] "
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="absolute right-6 bottom-10 flex flex-col space-y-4 z-10">
          <a href="https://facebook.com" className="hover:text-[#DE968D]">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="hover:text-[#DE968D]">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="hover:text-[#DE968D]">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://pinterest.com" className="hover:text-[#DE968D]">
            <i className="fab fa-pinterest-p"></i>
          </a>
        </div>
      </section>

      {/* Search Popup */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 w-full max-w-md mx-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Search</h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form className="flex">
              <input
                type="text"
                placeholder="Search here..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#DE968D]"
              />
              <button
                type="submit"
                className="bg-[#DE968D] text-white px-4 py-2 rounded-r-lg hover:bg-white hover:text-black transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
      <section
        id="about"
        className="w-full bg-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10"
      >
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col items-center text-center">
          <p className="text-m text-gray-500 mb-2">Introducing</p>
          <h2 className="text-4xl md:text-5xl font-light text-[#9E8A78] leading-snug mb-4">
            The Glamourista Studio
            <br /> Established 2015
          </h2>

          {/* Icon */}
          <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
            Our makeup studio is dedicated to enhancing your natural beauty with
            professional techniques and premium products. Our artists specialize
            in creating flawless looks for weddings, special events, and
            everyday glamour. We believe makeup is an art form that should make
            you feel confident and beautiful in your own skin.
          </p>

          {/* Button */}
          <a
            href="#services"
            className="bg-[#9E8A78] text-white hover:bg-[#8d7c6b] font-semibold px-6 py-3 rounded shadow-md transition"
          >
            EXPLORE SERVICES
          </a>
        </div>

        {/* Right Section*/}
        <div className="md:w-1/2 flex justify-center items-center relative mt-10 md:mt-0 min-h-[360px]">
          {/* Back Image */}
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/makeup5.1.jpg"
            alt="Makeup 3"
            className="rounded-lg shadow-xl w-60 md:w-64  lg:w-72 absolute top-0 left-16 z-0 hidden md:block"
          />
          {/* Middle Image */}
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/makeup5.3.jpg"
            alt="Makeup 2"
            className="rounded-lg shadow-xl w-60 md:w-64 lg:w-72 absolute top-6 left-8 z-10 hidden md:block"
          />
          {/* Front Image */}
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/makeup5.4.jpg"
            alt="Makeup 1"
            className="rounded-lg shadow-xl w-60 md:w-64 lg:w-72 relative z-30 mt-14"
          />
        </div>
      </section>
      <section
        id="services"
        className="bg-[#fdf8f3] py-16 px-6 md:px-20 text-center"
      >
        {/* Section Header */}
        <p className="text-[#9E8A78] font-medium text-lg mb-2">
          Trendy Beauty Studio
        </p>
        <h2 className="text-4xl text-gray-800 mb-4">Our Services</h2>

        {/* Divider with Mustache */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-12 border-t border-[#a79382]"></div>
          <GiMustache className="text-6xl text-yellow-600" />
          <div className="w-12 border-t border-[#a79382]"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MakeUp.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center justify-center">
                {/* <img
                  src={service.serviceImage}
                  className="w-32 rounded-full  mb-6 h-32"
                /> */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.shortDescription}
              </p>
              <div className="flex item-center justify-center mt-4">
                <button
                  href="#"
                  className="text-xs font-bold text-[#a38978] hover:text-black uppercase flex items-center gap-2"
                >
                  <span className="border-b border-[#9E8A78]">Book Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full min-h-screen flex flex-col lg:flex-row">
        {/* Left Side Image */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-auto">
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/makeup5.5.jpg"
            alt="Makeup artist working"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 bg-[#1b1b1b] text-white flex items-center justify-center px-6 py-10">
          <div className="max-w-xl w-full">
            <h2 className="text-4xl font-serif mb-4">Book an appointment</h2>
            <p className="text-gray-300 mb-8">
              Our professional makeup artists are ready to create your perfect
              look for any occasion. Book your session today and experience the
              Glamourista difference.
            </p>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <button
                  onClick={handleModalOpen}
                  className="mt-4 bg-[#d1bfa7] hover:bg-[#c6ae96] text-black px-6 py-2 font-semibold"
                >
                  BOOK APPOINTMENT
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section id="team" className="bg-white py-16 px-6 md:px-20 text-center">
        {/* Section Heading */}
        <div className="mb-12">
          <p className="text-[#9E8A78] text-lg font-medium">
            Trendy Beauty Studio
          </p>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Our Makeup Artists
          </h2>
          <div className="flex justify-center items-center space-x-2">
            {/* Divider with Mustache */}
            <div className="flex items-center justify-center mb-12">
              <div className="w-12 border-t border-[#a79382]"></div>
              <GiMustache className="text-6xl text-yellow-600" />
              <div className="w-12 border-t border-[#a79382]"></div>
            </div>
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/makeup5.13.jpg"
            alt="Artist 1"
            className="w-full object-cover"
          />
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/makeup5.14.jpg"
            alt="Artist 2"
            className="w-full object-cover"
          />
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/makeup5.15.jpg"
            alt="Artist 3"
            className="w-full object-cover"
          />
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/makeup5.16.jpg"
            alt="Artist 4"
            className="w-full object-cover"
          />
        </div>
      </section>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-[400px] md:h-[500px]"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              id="testimonial"
              className="w-full h-full  bg-cover bg-center flex items-center justify-center text-white px-6 text-center"
              style={{ backgroundImage: `url(${item.background})` }}
            >
              <div className="max-w-3xl">
                <p className="text-xl md:text-2xl font-light leading-relaxed mb-4">
                  &quot;{item.text}&quot;
                </p>
                <p className="text-sm md:text-base font-medium">
                  {item.author}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <section className="bg-[#fef9f6] py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#9E8A78] uppercase mb-2">
            Save 20% On First Visit
          </p>
          <h2 className="text-4xl font-serif text-gray-800 mb-4">
            Our Makeup Pricing
          </h2>
          {/* Divider with Mustache */}
          <div className="flex items-center justify-center mb-12">
            <div className="w-12 border-t border-[#a79382]"></div>
            <GiMustache className="text-6xl text-yellow-600" />
            <div className="w-12 border-t border-[#a79382]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {MakeUp.map((service, index) => (
              <div key={index} className="mb-6">
                <div className="flex items-center">
                  <h4 className="text-lg font-serif text-gray-700 whitespace-nowrap">
                    {service.name}
                  </h4>
                  <div className="flex-1 mx-2 border-b border-dotted border-gray-400" />
                  <span className="text-lg font-bold text-[#9E8A78] whitespace-nowrap">
                    {getFormattedPrice(service.price, countryCode)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {service.shortDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative w-full min-h-[400px] md:min-h-[600px] flex items-center justify-center px-4">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm scale-105"
          style={{
            backgroundImage: `url("https://gfa-tech.com/dimp-template-images/make-up/makeup5.10.jpg")`,
            zIndex: 0,
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />

        {/* Foreground Content */}
        <div className="relative z-20 text-white text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-snug mb-4">
            Enhancing Your Beauty
            <br />
            Is Our Passion
          </h1>
          <p className="text-base md:text-lg font-light mb-6">
            Our professional makeup artists specialize in creating looks that
            make you feel
            <br />
            confident and beautiful for any occasion.
          </p>

          <button
            onClick={handleModalOpen}
            className="bg-[#9E8A78] text-white uppercase px-6 py-3 font-semibold rounded hover:bg-[#7f6f5e] transition"
          >
            Book Appointment
          </button>
        </div>
      </section>

      <div id="contact">
        <WhiteContactForm />
      </div>

      <footer className="bg-[#0D0F15] text-white py-12 px-6 lg:px-20">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="text-lg font-bold">GLAMOURISTA</div>
            </div>
            <p className="text-sm leading-relaxed">
              Our beauty studio is created for women who appreciate premium
              quality, time-saving services, and flawless results that enhance
              their natural beauty.
            </p>
            <div className="flex space-x-4 mt-4 text-lg">
              <FaFacebookF />
              <FaTwitter />
              <FaGooglePlusG />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>

          {/* Headquarters */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Headquaters</h3>
            <p className="text-sm mb-2">
              962 Fifth Avenue, 3rd Floor New York, NY10022
            </p>
            <p className="text-sm">Hello@glamourista.com</p>
            <p className="text-sm">(+123) 456 789 101</p>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Opening Hours</h3>
            <p className="text-sm">Monday - Friday 11:30am - 2:00pm</p>
            <p className="text-sm">Saturday – Monday: 9am – 8pm</p>
            <p className="text-sm">Monday - Friday 5:30am - 11:00pm</p>
            <p className="text-sm">Saturday - Sunday 4:30am - 1:00pm</p>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Book an appopintment</h3>
            <p>Click the button below to see our services</p>

            <button
              onClick={handleModalOpen}
              className="bg-[#9E8A78] w-full py-2 font-semibold hover:bg-[#a1876d] transition"
            >
              BOOK US INSTANTLY
            </button>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm border-t border-gray-700 pt-6 relative">
          <p>
            <span>
              © {new Date().getFullYear()}{" "}
              <a
                href="https://dimpified.com"
                className="hover:text-amber-600"
                target="_blank"
              >
                Dimpified.
              </a>{" "}
              All Rights Reserved
            </span>
          </p>
          {/* Moving Arrow */}
          <div className="fixed bottom-0 right-0 mb-4 mr-4">
            <div className="bg-[#9E8A78] w-10 h-10 flex items-center justify-center animate-bounce rounded">
              <IoIosArrowUp className="text-white text-xl" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FifthMakeup;
