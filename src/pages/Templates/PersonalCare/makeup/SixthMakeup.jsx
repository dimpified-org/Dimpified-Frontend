import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaArrowRight,
  FaPlay,
  FaUser,
  FaCalendarAlt,
  FaAngleRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import "swiper/css";

import { MakeUp } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { BlackContactForm } from "../../../../features/ContactForm/ContactForm";
const SixthMakeup = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("*");
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const testimonials = [
    {
      id: 1,
      quote:
        "Working with GMAAKEUP was an incredible experience. The professionalism, creativity, and attention to detail exceeded all my expectations. I’ve never felt more confident in front of the camera.",
      name: "Alexis Browni JR.",
      title: "Founder of Alxis Co.",
      avatar: "https://gfa-tech.com/dimp-template-images/gym/gym-testi2.jpg",
    },
    {
      id: 2,
      quote:
        "From consultation to final look, every step felt personalized and flawless. GMAAKEUP understands beauty beyond trends—they create timeless elegance. Highly recommended!",
      name: "Paul M. Matney",
      title: "Corporate Lawyer",
      avatar: "https://gfa-tech.com/dimp-template-images/gym/gym6.18.jpg",
    },
    {
      id: 3,
      quote:
        "I booked them for my bridal shoot and was blown away by the results. Not only did they make me look stunning, but they also made me feel like a queen throughout the process.",
      name: "Sophia Turner",
      title: "Bride & Entrepreneur",
      avatar: "https://gfa-tech.com/dimp-template-images/gym/gym-testi1.jpg",
    },
  ];

  const brandsData = [
    "https://gfa-tech.com/dimp-template-images/hairstylist/company-1.png",
    "https://gfa-tech.com/dimp-template-images/hairstylist/company-5.png",
    "https://gfa-tech.com/dimp-template-images/hairstylist/company-3.png",
    "https://gfa-tech.com/dimp-template-images/hairstylist/company-4.png",
    "https://gfa-tech.com/dimp-template-images/hairstylist/company-5.png",
  ];

  const portfolioItems = [
    {
      id: 1,
      category: "bridal makeup",
      image: "https://gfa-tech.com/dimp-template-images/make-up/makeup6.8.jpg",
    },
    {
      id: 2,
      category: "face makeup",
      image: "https://gfa-tech.com/dimp-template-images/make-up/makeup6.9.jpg",
    },
    {
      id: 3,
      category: "eye makeup",
      image: "https://gfa-tech.com/dimp-template-images/make-up/makeup6.10.jpg",
    },
    {
      id: 4,
      category: "hair makeup",
      image: "https://gfa-tech.com/dimp-template-images/make-up/makeup6.11.jpg",
    },
    {
      id: 5,
      category: "face makeup",
      image: "https://gfa-tech.com/dimp-template-images/make-up/makeup6.12.jpg",
    },
    {
      id: 6,
      category: "bridal makeup",
      image: "https://gfa-tech.com/dimp-template-images/make-up/makeup6.13.jpg",
    },
  ];
  const blogPosts = [
    {
      id: 1,
      title: "Top 5 Bridal Makeup Trends That Never Go Out of Style",
      image: "https://gfa-tech.com/dimp-template-images/make-up/makeup6.14.jpg",
      date: "12th April 2024",
      excerpt:
        "Discover timeless bridal makeup trends that will keep your big day look stunning from aisle to afterparty.",
    },
    {
      id: 2,
      title: "How to Prep Your Skin Before Any Makeup Session",
      image: "https://gfa-tech.com/dimp-template-images/make-up/makeup6.15.jpg",
      date: "28th March 2024",
      excerpt:
        "Flawless makeup begins with healthy skin. Here's how to create the perfect canvas every time.",
    },
    {
      id: 3,
      title: "From Day to Night: Transforming Your Makeup Look",
      image: "https://gfa-tech.com/dimp-template-images/make-up/makeup6.7.jpg",
      date: "16th February 2024",
      excerpt:
        "Quick tips on taking your natural daytime glow to a bold and glamorous evening statement.",
    },
  ];

  const filterPortfolio = (filter) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans">
      {/* Header */}
      <header
        className={`header-area fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black shadow-md" : "bg-black"
        }`}
        style={{
          backgroundColor: scrolled ? "black" : "black",
        }}
      >
        <div className="menu-area bg-black">
          <div className="flex flex-col h-full  py-4 px-4 lg:px-24 bg-black">
            <div className="second-menu bg-black">
              <div className="flex items-center justify-between py-4">
                <div className="w-1/4 lg:w-1/6">
                  <div className="logo">
                    <a href="index.html">
                      <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
                    </a>
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className="lg:hidden flex items-center">
                  <button
                    onClick={toggleMobileMenu}
                    className="text-white focus:outline-none"
                  >
                    {mobileMenuOpen ? (
                      <FaTimes size={24} />
                    ) : (
                      <FaBars size={24} />
                    )}
                  </button>
                </div>

                <div className="hidden lg:flex lg:w-2/3 justify-center">
                  <nav>
                    <ul className="flex space-x-8 uppercase">
                      {[
                        { label: "Home", href: "#home" },
                        { label: "About Us", href: "#about" },
                        { label: "Services", href: "#services" },
                        { label: "Gallery", href: "#gallery" },
                        { label: "Contact", href: "#footer" },
                      ].map((item) => (
                        <li key={item.href} className="relative group">
                          <a
                            href={item.href}
                            className="text-white hover:text-[#CC866C] transition"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div className="hidden lg:block lg:w-2/6 text-right">
                  <button
                    onClick={handleModalOpen}
                    className="btn bg-[#CC866C] text-white px-6 py-2 rounded inline-flex items-center hover:bg-[#b06e59] transition"
                  >
                    Book an appointment <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>

              {/* Mobile menu */}
              {mobileMenuOpen && (
                <div className="lg:hidden bg-black py-4">
                  <nav>
                    <ul className="space-y-4 uppercase">
                      {["Home", "About", "Services", "Gallery", "Contact"].map(
                        (item) => (
                          <li key={item}>
                            <a
                              href={`#${item.toLowerCase().replace(" ", "")}`}
                              className="block text-white hover:text-[#CC866C] transition"
                            >
                              {item}
                            </a>
                          </li>
                        )
                      )}
                      <li>
                        <a
                          href="#footer"
                          className="btn bg-[#CC866C] text-white px-6 py-2 rounded inline-flex items-center hover:bg-[#b06e59] transition"
                        >
                          Get A Quote <FaArrowRight className="ml-2" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ✅ HERO */}
      <main className="pt-16">
        <section
          id="home"
          className="slider-area relative h-screen flex items-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://gfa-tech.com/dimp-template-images/make-up/makeup6-hero.png)",
          }}
        >
          <div className="flex flex-col h-full py-4 px-4 lg:px-24 w-full">
            <div className="flex flex-col lg:flex-row items-center w-full">
              <div className="lg:w-full mt-16 lg:mt-0">
                <div className="slider-content text-white">
                  <h5 className="text-lg text-[#CC866C] mb-10 uppercase mt-9 animate-fadeInUp">
                    Makeup Artist
                  </h5>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 animate-fadeInUp">
                    WELCOME TO
                  </h2>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeInUp">
                    GMAKEUP
                  </h2>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeInUp">
                    BEAUTY SALON
                  </h2>

                  <div className="slider-btn mt-8 animate-fadeInUp flex gap-4">
                    <a
                      href="#services"
                      className="bg-white text-black px-6 py-3 rounded inline-flex items-center hover:bg-[#b06e59] transition"
                    >
                      Explore Services <FaArrowRight className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-area py-20 bg-black">
          <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
            <div className="flex flex-col lg:flex-row items-center lg:gap-8">
              {/* Left Images and Badge */}
              <div className="lg:w-1/2 w-full relative flex flex-row gap-2 mb-10 lg:mb-0">
                <div className="w-1/2 h-[400px]">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/make-up/makeup6.1.jpg"
                    alt="Makeup Artist 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-1/2 h-[400px]">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/make-up/makeup6.2.jpg"
                    alt="Makeup Artist 2"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Circular Badge */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#CC866C] text-white rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold leading-tight">
                    30<span className="text-2xl align-top">+</span>
                  </span>
                  <span className="text-sm mt-1">Years Experience</span>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:w-1/2 about-content text-white">
                <div className="section-title mb-6">
                  <h5 className="text-[#CC866C] uppercase mb-2">About Me</h5>
                  <h2 className="text-3xl md:text-4xl font-bold uppercase">
                    Your Beauty and <br />
                    Success Starts Here
                  </h2>
                </div>
                <p className="mb-6">
                  Hello, I'm Olivia, a Professional Makeup Artist. With over 30
                  years of experience in the beauty industry, I specialize in
                  creating looks that enhance your natural beauty. My approach
                  combines the latest techniques with high-quality products to
                  ensure flawless results for every occasion.
                </p>
                <div className="mb-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[#CC866C] mr-2">✓</span>
                      <span>
                        Specialized in bridal, editorial, and special effects
                        makeup for all skin types and tones
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#CC866C] mr-2">✓</span>
                      <span>
                        Certified by the International Makeup Association with
                        advanced training in airbrush techniques
                      </span>
                    </li>
                  </ul>
                </div>
                <a
                  href="#services"
                  className="bg-[#CC866C] text-white px-6 py-3 rounded inline-flex items-center hover:bg-[#b06e59] transition"
                >
                  Explore Services <FaArrowRight className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services-area py-20 bg-black">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="text-center mb-16">
              <div className="section-title">
                <h5 className="text-[#CC866C] uppercase mb-2">What We Do</h5>
                <h2 className="text-3xl md:text-5xl font-bold text-white uppercase">
                  Makeup Services
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MakeUp.map((service, index) => (
                <button onClick={handleModalOpen}>
                  <div
                    key={index}
                    className="group bg-[#1e1e1e] rounded overflow-hidden transition-all duration-300 hover:bg-[#CC866C] text-center"
                  >
                    {/* <img
                      src={service.serviceImage}
                      alt="Face Makeup"
                      className="w-full h-72 object-cover"
                    /> */}
                    <div className="p-6">
                      <h3 className="text-white text-xl font-bold mb-3 group-hover:text-white">
                        {service.name}
                      </h3>
                      <p className="text-gray-400 group-hover:text-black transition">
                        {service.shortDescription}
                      </p>
                    </div>
                    <div className="px-6 py-4 flex justify-center">
                      <button
                        onClick={handleModalOpen}
                        className="flex items-center gap-2 text-[#b68c6d] hover:text-white uppercase text-xs tracking-wider"
                      >
                        Book Now <FaArrowRight size={10} />
                      </button>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          className="relative py-20 bg-[#2B2A2A] bg-cover bg-center text-white"
          style={{ backgroundImage: "url('/img/bg/testimonial-bg.png')" }}
        >
          <div className="container mx-auto px-4 text-center">
            <h5 className="uppercase text-[#CC866C] mb-2 tracking-wider">
              Testimonials
            </h5>
            <h2 className="text-4xl md:text-5xl font-light uppercase mb-10">
              Some Users Feedback
            </h2>

            <div className="mb-8">
              <div className="w-14 h-14 bg-white rounded-full mx-auto flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.17 6A5 5 0 0 0 3 11v7a1 1 0 0 0 1 1h5v-8H6.56a3 3 0 0 1 2.8-4zm9 0A5 5 0 0 0 12 11v7a1 1 0 0 0 1 1h5v-8h-2.44a3 3 0 0 1 2.8-4z" />
                </svg>
              </div>
            </div>

            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000 }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="max-w-3xl mx-auto text-white px-4">
                    <p className="text-xl md:text-2xl font-light uppercase leading-relaxed mb-10">
                      “{testimonial.quote}”
                    </p>

                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <h6 className="font-semibold text-3xl uppercase text-sm">
                          {testimonial.name}
                        </h6>
                        <p className="text-[#CC866C] text-xl uppercase mt-1">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>

                    {/* Dots / indicators */}
                    <div className="flex justify-center mt-10 gap-2">
                      <span className="w-6 h-1 bg-[#CC866C] rounded-full"></span>
                      <span className="w-3 h-1 bg-white rounded-full"></span>
                      <span className="w-3 h-1 bg-white rounded-full"></span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="gallery" className="portfolio-area py-20 bg-gray-900">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            {/* Header & Tabs */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
              <div className="lg:w-5/12 mb-8 lg:mb-0">
                <div className="section-title">
                  <h5 className="text-[#CC866C] mb-2 uppercase">portfolio</h5>
                  <h2 className="text-3xl md:text-4xl uppercase font-bold text-white">
                    creative works
                  </h2>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems
                .filter(
                  (item) =>
                    activeFilter === "*" ||
                    item.category.toLowerCase() === activeFilter
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="portfolio-item overflow-hidden rounded-lg group"
                  >
                    <a href="#" className="block relative overflow-hidden">
                      <img
                        src={item.image}
                        alt="portfolio"
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="contact">
          <BlackContactForm />
        </section>

        <section
          className="cta-area py-16"
          style={{ backgroundColor: "#cc866c" }}
        >
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-2/3 mb-6 lg:mb-0">
                <h2 className="text-3xl font-bold text-white uppercase">
                  You don't have to wait in line
                </h2>
                <p className="text-white mt-2 text-base">
                  Make your reservation now
                </p>
              </div>
              <div className="lg:w-1/3 flex justify-center lg:justify-end">
                <button
                  onClick={handleModalOpen}
                  className="px-6 py-3 bg-black text-white rounded hover:bg-opacity-90 transition duration-300"
                >
                  Book an appointment
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="footer-bg py-16 bg-gray-900">
        <div className="flex flex-col h-full py-4 px-4 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Logo & Description */}
            <div className="footer-widget">
              <div className="footer-logo mb-6">
                <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
              </div>
              <p className="text-gray-400">
                Olivia Makeup Studio is dedicated to enhancing your natural
                beauty with professional makeup services. Our team of certified
                artists uses premium products to create looks that last all day
                and make you feel confident.
              </p>
            </div>

            {/* Our Links */}
            <div className="footer-widget">
              <h3 className="text-xl font-bold text-white mb-6 uppercase">
                Our Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="index.html"
                    className="text-gray-400 hover:text-[#CC866C] transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-[#CC866C] transition"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-[#CC866C] transition"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-[#CC866C] transition"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="footer-widget">
              <h3 className="text-xl font-bold text-white mb-6 uppercase">
                Socials
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#CC866C] transition"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#CC866C] transition"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#CC866C] transition"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#CC866C] transition"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-widget">
              <h3 className="text-xl font-bold text-white mb-6 uppercase">
                Contact Info
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <FaPhone className="mt-1 mr-3 text-[#CC866C]" />
                  <span>
                    1800-121-3637
                    <br />
                    +91-7052-101-786
                  </span>
                </li>
                <li className="flex items-start">
                  <FaEnvelope className="mt-1 mr-3 text-[#CC866C]" />
                  <span>
                    <a
                      href="mailto:info@example.com"
                      className="hover:text-[#CC866C] transition"
                    >
                      info@example.com
                    </a>
                    <br />
                    <a
                      href="mailto:help@example.com"
                      className="hover:text-[#CC866C] transition"
                    >
                      help@example.com
                    </a>
                  </span>
                </li>
                <li className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-3 text-[#CC866C]" />
                  <span>
                    1247/Plot No. 39,
                    <br />
                    LHB Colony, Kanpur
                  </span>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div className="footer-widget">
              <h3 className="text-xl font-bold text-white mb-6 uppercase">
                Opening Hours
              </h3>
              <ul className="text-gray-400 space-y-2">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                © 2025 Dimpified. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SixthMakeup;
