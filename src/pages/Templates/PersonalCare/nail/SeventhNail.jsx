import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Nail } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

import {
  FaBars,
  FaTimes,
  FaPhone,
  FaInstagram,
  FaFacebook,
  FaQuoteLeft,
  FaYelp,
  FaVimeoV,
} from "react-icons/fa";

const SeventhNail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const testimonials = [
    {
      id: 1,
      text: "The best nail salon I've ever been to! The technicians are skilled and the atmosphere is so relaxing. My nails always look perfect.",
      author: "Rachel A.",
    },
    {
      id: 2,
      text: "I've been coming here for years and wouldn't go anywhere else. The attention to detail is unmatched and my nails last longer than any other salon.",
      author: "Wendy T.",
    },
    {
      id: 3,
      text: "Absolutely love this place! The staff is friendly, the salon is clean, and my gel manicure stays perfect for 3+ weeks every time.",
      author: "Grace L.",
    },
    {
      id: 4,
      text: "As someone who's very particular about my nails, I can confidently say this is the best salon in town. The designs they create are stunning!",
      author: "Michelle Boxer",
    },
    {
      id: 5,
      text: "The pedicure chairs are so comfortable and the foot massage is heavenly. I leave feeling pampered every single time.",
      author: "Kelley Baker",
    },
    {
      id: 6,
      text: "I get so many compliments on my nails after visiting IQ Nail studio. Their nail art skills are next level and the polish application is flawless.",
      author: "Sarah D.",
    },
    {
      id: 7,
      text: "The acrylics I get here last longer than any other salon I've tried. The shape is always perfect and they never damage my natural nails.",
      author: "Nicole Byer",
    },
    {
      id: 8,
      text: "The spa manicure is worth every penny. My hands feel so soft and rejuvenated, and the polish lasts for weeks without chipping.",
      author: "AJ",
    },
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="top-0 left-0 w-full z-50 bg-[#FAF4F4] shadow-md">
        {/* Mobile Top Bar */}
        <div className="wsmobileheader flex justify-between items-center p-4 md:hidden">
          <span className="smllogo">
            <a href="#home">
              <h2 className="font-bold  text-xl text-pink-500">BeautyNails</h2>
            </a>{" "}
          </span>
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="text-2xl text-black" />
              ) : (
                <FaBars className="text-2xl text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <div className="wsmainwp">
            <nav className="wsmenu">
              <ul className="wsmenu-list flex items-center justify-center py-4">
                <li className="px-4 py-2">
                  <a href="#about" className="uppercase text-black">
                    About
                  </a>
                </li>

                <li className="px-4 py-2">
                  <a
                    href="#services"
                    className="hover:text-pink-500 text-black uppercase"
                  >
                    Our Services
                  </a>
                </li>
                <li className="px-6 py-2">
                  <a href="#home">
                    <h2 className="font-bold uppercase text-2xl text-pink-500">
                      beautynails
                    </h2>
                  </a>
                </li>
                <li className="px-4 py-2">
                  <a
                    href="#gallery"
                    className="hover:text-pink-500 uppercase text-black"
                  >
                    Gallery
                  </a>
                </li>
                <li className="px-4 py-2">
                  <a
                    href="#contact"
                    className="hover:text-pink-500 uppercase text-black"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-black px-4 py-4 shadow-md mt-[64px]">
          <nav className="flex flex-col gap-4">
            <a href="#about" className="hover:text-[#FD1C79] uppercase">
              About
            </a>

            <a href="#services" className="hover:text-[#FD1C79] uppercase">
              Our Services
            </a>
            <a href="#gallery" className="hover:text-[#FD1C79] uppercase">
              Gallery
            </a>

            <a
              href="#contact"
              className="bg-[#FD1C79] hover:bg-rose-600 text-white px-6 py-2 rounded transition"
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-cover bg-center md:h-screen h-full bg-no-repeat pt-32 pb-32 md:pt-40 md:pb-40"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.1.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="flex flex-col items-center text-center text-white space-y-6">
            {/* Hero Text */}
            <div className="relative z-10 px-4 text-center text-white max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-extrabold italic leading-tight tracking-wide">
                Show Your Elegance <br className="hidden md:block" /> With Your
                Nails
              </h1>
              <p className="mt-6 text-lg md:text-2xl font-light leading-relaxed drop-shadow-md">
                Transform your everyday look with stunning nails that speak
                volumes. Whether it’s a bold design or a simple touch of glam,
                your perfect nail moment is just a booking away.
              </p>
            </div>

            {/* Optional CTA Button */}
            <div className="mt-6">
              <button
                onClick={handleModalOpen}
                className="px-6 py-3 bg-pink-600 text-deep-brown rounded-full text-lg font-medium shadow-lg hover:bg-moccasin transition"
              >
                Reserve your spot now
              </button>
            </div>
            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-5" className="py-20 bg-white">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service Box 1 */}
            <div className="text-center p-8 transition duration-300">
              <div className="text-5xl text-black mb-4">
                <span>💅</span>
              </div>
              <h5 className="text-xl font-bold mb-3">Nail Care</h5>
              <p className="text-gray-600">
                Professional nail care services to keep your hands looking their
                best with our premium treatments.
              </p>
            </div>

            {/* Service Box 2 */}
            <div className="text-center p-8 transition duration-300">
              <div className="text-5xl text-black mb-4">
                <span>🎨</span>
              </div>
              <h5 className="text-xl font-bold mb-3">Nail Art</h5>
              <p className="text-gray-600">
                Creative and trendy nail art designs to express your unique
                style and personality.
              </p>
            </div>

            {/* Service Box 3 */}
            <div className="text-center p-8 transition duration-300">
              <div className="text-5xl text-black mb-4">
                <span>➕</span>
              </div>
              <h5 className="text-xl font-bold mb-3">Add-Ons</h5>
              <p className="text-gray-600">
                Enhance your service with our luxurious add-ons for the ultimate
                pampering experience.
              </p>
            </div>

            {/* Service Box 4 */}
            <div className="text-center p-8 transition duration-300">
              <div className="text-5xl text-black mb-4">
                <span>🧖‍♀️</span>
              </div>
              <h5 className="text-xl font-bold mb-3">Treatments</h5>
              <p className="text-gray-600">
                Specialized treatments to nourish and revitalize your nails and
                skin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section 1 */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0">
              <div className="mb-4 text-gray-500 uppercase font-medium">
                Get Your Shine On
              </div>
              <h3 className="text-3xl font-bold mb-6">Choose the Glamour</h3>
              <p className="text-gray-600 mb-6">
                At La Notte, we believe your nails should be as unique as you
                are. Our expert technicians use only the highest quality
                products to ensure your nails look flawless.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2">✔</span>
                  <p>
                    Customized nail services tailored to your preferences and
                    lifestyle needs.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✔</span>
                  <p>
                    Sanitation is our top priority with hospital-grade
                    sterilization for all tools.
                  </p>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.10.jpg"
                alt="about-image"
                className="rounded-lg shadow-lg w-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section 1 */}
      <section
        id="services"
        className="py-32 bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.1.jpg')",
        }}
      >
        <div className="flex flex-col md:mx-32   px-4">
          <div className="bg-white shadow-xl rounded-lg p-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xl font-semibold tracking-wider text-gray-500 uppercase mb-2 block">
                Best Deal
              </span>
              <h2 className="text-3xl font-bold mb-6">Our Special Services</h2>
            </div>

            <div className="flex flex-wrap -mx-4 mb-10">
              <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                <ul className="space-y-6">
                  {Nail.slice(0, 4).map((service, index) => (
                    <li className="pb-6">
                      <button
                        onClick={handleModalOpen}
                        className="flex flex-wrap items-center hover:bg-gray-50 p-4 rounded-lg transition duration-300"
                      >
                        <div className="w-1/4 pr-4">
                          <div className="relative overflow-hidden rounded-lg">
                            {/* <img
                              src={service.serviceImage}
                              alt="pricing-image"
                              className="w-full h-auto"
                            /> */}
                            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition duration-300"></div>
                          </div>
                        </div>
                        <div className="w-3/4">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="text-lg font-semibold">
                              {service.name}
                            </h5>
                            <div>
                              <span className="text-lg font-semibold text-orange-800">
                                {getFormattedPrice(service.price, countryCode)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-start">
                            {service.shortDescription}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full lg:w-1/2 px-4">
                <ul className="space-y-6">
                  {Nail.slice(4, 8).map((service, index) => (
                    <li className="pb-6">
                      <button
                        onClick={handleModalOpen}
                        className="flex flex-wrap items-center hover:bg-gray-50 p-4 rounded-lg transition duration-300"
                      >
                        <div className="w-1/4 pr-4">
                          <div className="relative overflow-hidden rounded-lg">
                            {/* <img
                              src={service.serviceImage}
                              alt="pricing-image"
                              className="w-full h-auto"
                            /> */}
                            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition duration-300"></div>
                          </div>
                        </div>
                        <div className="w-3/4">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="text-lg font-semibold">
                              {service.name}
                            </h5>
                            <div>
                              <span className="text-lg font-semibold text-orange-800">
                                {getFormattedPrice(service.price, countryCode)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-start">
                            {service.shortDescription}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={handleModalOpen}
                className="bg-orange-800 uppercase hover:bg-orange-900 text-white px-8 py-3 inline-block"
              >
                Book an appointment now!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section 3 */}
      <section id="about-4" className="py-20">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="row flex flex-col md:flex-row items-center">
            {/* Text Block */}
            <div className="col-md-6 md:w-1/2 mb-10 md:mb-0">
              <div className="txt-block">
                <span className="section-id text-black uppercase mb-2">
                  Fresh, Shiny, Bright
                </span>
                <h3 className="text-5xl font-semibold">
                  Make your day shine <br /> with your shiny nails
                </h3>
              </div>
            </div>

            {/* Image Block */}
            <div className="col-md-6 md:w-1/2">
              <div className="img-block">
                <img
                  src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.14.png"
                  alt="about-image"
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

  

      {/* Banner Section */}
      <section
        id="banner-3"
        className="py-32 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.15.jpg')",
        }}
      >
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="row">
            <div className="col-md-7 col-lg-6 mx-auto">
              <div className="banner-3-txt text-start text-black">
                <h5 className="text-xl mb-4 ">
                  We want to make every girl <br />
                  pretty, happy, and loved!
                </h5>
                <h2 className="text-6xl font-bold mb-2">20% OFF</h2>
                <h4 className="text-2xl mb-6">on Manicure + Gel Polish</h4>
                <button
                  onClick={handleModalOpen}
                  className="btn inline-block bg-[#FD1C79] hover:bg-rose-600 text-white px-8 py-3 text-lg font-medium transition duration-300"
                >
                  Book you seesion online now
                </button>
                <p className="mt-5 text-sm opacity-80">* All Autumn Long!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Section 2 */}
      <section id="promo-2" className="py-20">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          {/* Section Title */}
          <div className="row text-center mb-12">
            <div className="col-lg-10 col-xl-8 mx-auto">
              <div className="section-title">
                <span className="section-id text-gray-500 uppercase font-semibold mb-2">
                  Nails And Beyond…
                </span>
                <h2 className="text-3xl font-bold mt-3">
                  Nails For Every Budget
                </h2>
              </div>
            </div>
          </div>

          <div className="row grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Promo Box 1 */}
            <div className="col">
              <a href="pricing.html" className="block">
                <div id="pb-2-1" className="promo-box group">
                  <div className="promo-box-txt mb-6">
                    <p className="uppercase text-sm tracking-wider text-gray-500 mb-2">
                      From 09.11.21 To 23.11.21
                    </p>
                    <h5 className="text-lg font-semibold">
                      30% OFF on Classic Manicure & Pedicure
                    </h5>
                  </div>
                  <div className="promo-box-img overflow-hidden rounded-lg">
                    <div className="hover-overlay relative overflow-hidden">
                      <img
                        className="w-full h-auto object-cover transition duration-500 group-hover:scale-105"
                        src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.12.jpg"
                        alt="promo-image"
                      />
                      <div className="item-overlay absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Promo Box 2 */}
            <div className="col">
              <a href="pricing.html" className="block">
                <div id="pb-2-2" className="promo-box group">
                  <div className="hover-overlay relative overflow-hidden rounded-lg">
                    <img
                      className="w-full h-[420px] object-cover transition duration-500 group-hover:scale-105"
                      src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.13.jpg"
                      alt="promo-image"
                    />
                    <div className="item-overlay absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
                  </div>
                </div>
              </a>
            </div>

            {/* Promo Box 3 */}
            <div className="col">
              <a href="pricing.html" className="block">
                <div id="pb-2-3" className="promo-box group">
                  <div className="promo-box-img overflow-hidden rounded-lg mb-6">
                    <div className="hover-overlay relative overflow-hidden">
                      <img
                        className="w-full h-auto object-cover transition duration-500 group-hover:scale-105"
                        src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.14.jpg"
                        alt="promo-image"
                      />
                      <div className="item-overlay absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
                    </div>
                  </div>
                  <div className="promo-box-txt">
                    <p className="uppercase text-sm tracking-wider text-gray-500 mb-2">
                      All Autumn Long!
                    </p>
                    <h5 className="text-xl font-semibold">
                      Prices Reduced On Spa Procedures UP TO 30%
                    </h5>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <div id="brands-1" className="py-12 bg-white">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="row">
            <div className="col brands-1-wrapper">
              <div className="owl-carousel brands-1-carousel flex items-center justify-center space-x-12">
                {/* Brand Logo 1 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.1.png"
                    alt="brand-logo"
                  />
                </div>
                {/* Brand Logo 2 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.2.png"
                    alt="brand-logo"
                  />
                </div>
                {/* Brand Logo 3 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.3.png"
                    alt="brand-logo"
                  />
                </div>
                {/* Brand Logo 4 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.4.png"
                    alt="brand-logo"
                  />
                </div>
                {/* Brand Logo 5 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.5.png"
                    alt="brand-logo"
                  />
                </div>
                {/* Brand Logo 6 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.6.png"
                    alt="brand-logo"
                  />
                </div>
                {/* Brand Logo 7 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.1.png"
                    alt="brand-logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section 2 */}
      <section id="pricing-1" className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.2.jpg"
                alt="pricing"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <span className="text-gray-500 uppercase font-medium block mb-2">
                Hands Care & Treatment
              </span>
              <h4 className="text-3xl font-bold mb-8 mt-4">Other Services</h4>

              <div className="space-y-6">
                <ul className="space-y-6">
                  {Nail.slice(0, 4).map((service, index) => (
                    <li className="pricing-item">
                      <div className="detail-price flex justify-between items-center border-b border-gray-200 pb-2">
                        <h5 className="text-lg font-medium">{service.name}</h5>
                        <span className="text-lg font-semibold">
                          {getFormattedPrice(service.price, countryCode)}
                        </span>
                      </div>
                      <div className="price-txt mt-1">
                        <p className="text-sm text-gray-500">
                          <em>{service.shortDescription}</em>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Hours Section */}
      <section id="about-5" className="py-20">
        <div className="flex flex-col h-full   py-4 px-4 lg:px-24">
          <div className="row flex flex-col md:flex-row items-center">
            {/* Text Block */}
            <div className="col-md-6 order-last md:order-first md:w-1/2 mb-10 md:mb-0">
              <div className="txt-block">
                <span className="section-id text-gray-500 uppercase font-semibold mb-2">
                  Time Schedule
                </span>
                <h3 className="text-3xl font-bold mb-6 mt-4">Working Hours</h3>
                <p className="text-lg text-gray-600">
                  We're open six days a week to accommodate your busy schedule.
                  Our flexible hours make it easy to book an appointment that
                  works for you, whether it's after work or on the weekend.
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="col-md-6 order-first md:order-last md:w-1/2">
              <div className="txt-table w-full">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 font-medium">Mon – Wed</td>
                      <td className="text-center">-</td>
                      <td className="text-right font-bold">
                        10:00 AM - 9:00 PM
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Thursday</td>
                      <td className="text-center">-</td>
                      <td className="text-right font-bold">
                        10:00 AM - 7:30 PM
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Friday</td>
                      <td className="text-center">-</td>
                      <td className="text-right font-bold">
                        10:00 AM - 9:00 PM
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Sat - Sun</td>
                      <td className="text-center">-</td>
                      <td className="text-right font-bold">
                        10:00 AM - 5:00 PM
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-[#FAF4F4]">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-2 block">
              Images Gallery
            </span>
            <h2 className="text-3xl font-bold mb-6">
              Stop Time. Stay Beautiful
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.7.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.8.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.9.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.10.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.11.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.12.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.13.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.18.jpg",
            ].map((url, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg"
              >
                <img
                  src={url}
                  alt={`gallery-image-${index + 1}`}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 flex items-end p-4">
                  <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                    <p className="text-xs uppercase tracking-wider mb-1">
                      Art, Care
                    </p>
                    <h5 className="text-lg font-semibold">Nail Art Design</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews-1" className="py-20 bg-[#FAF4F4]">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-12">
            <span className="text-gray-400 tracking-widest uppercase text-xl font-semibold">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              What People Are Saying
            </h2>
          </div>

          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={30}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="p-8 text-center">
                  <div className="text-6xl text-gray-400 mb-6">
                    <FaQuoteLeft />
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">
                    “{item.text}”
                  </p>
                  <p className="font-semibold text-gray-800 uppercase tracking-wider">
                    — {item.author}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <div id="contact">
        <WhiteContactForm />
      </div>
      {/* Banner Section 3 */}
      <section
        id="banner-5"
        className="py-32 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/banner-5.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-lg">
            <span className="text-white uppercase font-medium block mb-2">
              Elegance In Every Stroke
            </span>
            <h2 className="text-3xl md:text-4xl text-white font-bold mb-6">
              Get the nails you've been dreaming of…
            </h2>
            <button
              onClick={handleModalOpen}
              className="inline-block px-8 py-3 bg-pink-500 text-white hover:bg-plum-700 transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Newsletter */}
            <div className="lg:col-span-1">
              <h5 className="text-xl font-semibold mb-4">Working Hours</h5>
              <form className="flex flex-col ">
                {/* Input (you can add an input & button if needed) */}
                <p className="text-2xl font-bold text-[#FD1C79]"></p>
                <p className="">Mon–Fri: 10AM – 9PM</p>
                <p className="mb-1">Saturday: 10AM – 7PM</p>
                <p>Sunday: 10PM – 7PM</p>
              </form>
            </div>

            {/* Navigation Links */}
            <div>
              <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#home" className="hover:text-[#FD1C79] transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#FD1C79] transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#FD1C79] transition"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="hover:text-[#FD1C79] transition"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-[#FD1C79] transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h5 className="text-xl font-semibold mb-4">Get in Touch</h5>
              <p className="mb-3">Oniru, Lagos</p>
              <p className="mb-3">
                <a
                  href="mailto:hello@beautynailsstudio.com"
                  className="font-semibold hover:text-[#FD1C79] transition"
                >
                  hello@beautynailsstudio.com
                </a>
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h5 className="text-xl font-semibold mb-4">Follow Us</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FD1C79] transition"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FD1C79] transition"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FD1C79] transition"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FD1C79] transition"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>
              <span>
                Copyright &copy; 2025 Built with{" "}
                <a className="hover:text-primary3" href="https://dimpified.com">
                  Dimpified
                </a>
              </span>{" "}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SeventhNail;
