import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaBars, FaTimes, FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Nail } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

const SixthNail = () => {
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
    <div className="font-sans">
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-[#f5b7c0]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
          {/* Logo */}
          <span className="smllogo">
            <a href="#home">
              <h2 className="font-bold uppercase text-2xl">iq nail studio</h2>
            </a>
            <p className="text-center text-xs">
              The best mani-pedi you've ever got
            </p>
          </span>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {["About", "Services", "Pricing", "Gallery", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`uppercase text-sm font-semibold transition ${
                    isScrolled ? "text-black" : "text-white"
                  } hover:text-[#FD1C79]`}
                >
                  {item}
                </a>
              )
            )}
            <button
              onClick={handleModalOpen}
              className="bg-[#D63384] text-white px-5 py-2 uppercase text-sm font-bold transition duration-300 hover:bg-[#c0266b]"
            >
              Book Appointment
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <FaTimes
                  className={`text-2xl ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                />
              ) : (
                <FaBars
                  className={`text-2xl ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown (Positioned absolutely to avoid pushing content) */}
        {isMenuOpen && (
          <div
            className={`md:hidden absolute top-full left-0 w-full px-6 py-6 transition ${
              isScrolled ? "bg-white text-black" : "bg-[#f5b7c0] text-white"
            }`}
          >
            <nav className="flex flex-col space-y-4 text-sm uppercase font-semibold">
              {["About", "Services", "Pricing", "Gallery", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-[#FD1C79]"
                    onClick={() => setIsMenuOpen(false)} // Auto-close on click
                  >
                    {item}
                  </a>
                )
              )}
              <button
                onClick={() => {
                  handleModalOpen();
                  setIsMenuOpen(false); // Auto-close on modal open
                }}
                className="bg-[#D63384] text-white px-6 py-2 rounded text-center mt-2"
              >
                Book Appointment
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-32 pb-20 md:pt-40 md:pb-32 bg-[#f5b7c0] bg-center bg-fixed relative"
      >
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="text-white">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Nail Shine <br /> Made Simple
                </h2>
                <p className="text-lg font-bold md:text-xl mb-8">
                  Experience luxury nail care with our expert technicians. We
                  use only the highest quality products to give you flawless,
                  long-lasting results.
                </p>
                <a
                  href="#services"
                  className="bg-[#D63384] hover:bg-[#c0266b] uppercase text-white px-8 py-3 inline-block transition-colors"
                >
                  Find Out More
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/hero-img.png"
                alt="hero-image"
                className="max-w-md w-full"
              />
            </div>
          </div>
        </div>
        {isModalOpen && (
          <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
        )}
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 order-2 md:order-1 mt-10 md:mt-0">
              <div>
                <span className="text-gray-400 uppercase font-semibold">
                  Get Your Shine On
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Skilled Nail Art
                </h3>
                <p className="text-lg mb-6">
                  Our talented technicians are trained in the latest nail art
                  techniques to bring your vision to life. Whether you want
                  subtle elegance or bold designs, we've got you covered.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className=" mr-2">✓</span>
                    <p className="text-lg">
                      We use only premium, long-lasting polishes and gels that
                      won't damage your natural nails.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className=" mr-2">✓</span>
                    <p className="text-lg">
                      Our sanitary practices exceed industry standards to ensure
                      your safety and comfort.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2 flex justify-center">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.1.jpg"
                alt="about-image"
                className="rounded-lg shadow-lg max-w-md w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-gray-500 mb-2 block">
              Choose The Beauty
            </span>
            <h2 className="text-3xl font-bold mb-6">Peace, Love & Nails.</h2>
          </div>

          <div className="flex flex-wrap -mx-4">
            {Nail.slice(0, 6).map((service, index) => (
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="overflow-hidden rounded-lg mb-6">
                  <div className="relative overflow-hidden">
                    {/* <img src={service.serviceImage} className="w-full h-auto" /> */}
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition duration-300"></div>
                  </div>
                </div>
                <h5 className="text-xl font-bold text-center">
                  <button
                    onClick={handleModalOpen}
                    className="hover:text-purple-800"
                  >
                    {service.name}
                  </button>
                </h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours Section */}
      <section className="py-20">
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

      {/* About 9 Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 order-2 md:order-1 mt-10 md:mt-0">
              <div>
                <span className="text-gray-400 uppercase font-semibold">
                  Get Your Shine On
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Shining Feminine
                </h3>
                <p className="text-lg mb-6">
                  Our salon is designed to be a sanctuary where you can relax
                  and be pampered. Every detail is crafted to enhance your
                  experience and leave you feeling refreshed.
                </p>
                <h5 className="text-xl font-semibold mb-4">
                  Elegance in Every Stroke
                </h5>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className=" mr-2">✓</span>
                    <p className="text-lg">
                      We customize each service to your individual needs and
                      preferences.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className=" mr-2">✓</span>
                    <p className="text-lg">
                      Our comfortable chairs and relaxing atmosphere make your
                      visit a true escape.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2 flex justify-center">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.5.jpg"
                alt="about-image"
                className="rounded-lg shadow-lg max-w-md w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About 4 Section */}
      <section className="py-20">
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

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 bg-white bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg-pattern.jpg')" }}
      >
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="pricing-6-wrapper">
            <div className="row grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pricing Table 1 */}
              <div className="col-lg-6">
                <div className="pricing-6-table p-8 rounded-lg ">
                  <span className="section-id text-gray-500 uppercase font-semibold mb-2">
                    Nails & Cocktails
                  </span>
                  <h5 className="text-2xl font-semibold mb-6 mt-5">
                    Hands & Feet
                  </h5>
                  <ul className="space-y-6">
                    {Nail.slice(0, 4).map((service, index) => (
                      <li className="pricing-6-item">
                        <div className="detail-price flex justify-between items-center border-b border-gray-200 pb-2">
                          <h5 className="text-lg font-medium">
                            {service.name}
                          </h5>
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

              {/* Pricing Table 2 */}
              <div className="col-lg-6 bg-white">
                <div className="pricing-6-table p-8 rounded-lg ">
                  <span className="section-id uppercase text-gray-500 font-semibold mb-2 ">
                    Paint Packages
                  </span>
                  <h5 className="text-2xl font-semibold mb-6 mt-5">
                    Add-On Services
                  </h5>
                  <ul className="space-y-6">
                    {Nail.slice(4, 8).map((service, index) => (
                      <li className="pricing-6-item">
                        <div className="detail-price flex justify-between items-center border-b border-gray-200 pb-2">
                          <h5 className="text-lg font-medium">
                            {service.name}
                          </h5>
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

            {/* Button */}
            <div className="row mt-12 text-center">
              <div className="col">
                <div className="more-btn">
                  <p className="tra-link">
                    <button
                      onClick={handleModalOpen}
                      className="text-black hover:text-rose-500 uppercase underline font-semibold"
                    >
                      Sold Yet? Book an appointment now!
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <div
        className="py-32 bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.7.jpg')",
        }}
      ></div>

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
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.6.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.7.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.8.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.9.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.10.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.11.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.12.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.13.jpg",
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

      {/* Services 2 Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-lg transition-shadow">
              <div className=" text-5xl mb-6">
                <span className="flaticon-woman">👩</span>
              </div>
              <h5 className="text-xl font-semibold mb-4">Best Experts</h5>
              <p className="mb-6">
                Our licensed technicians have years of experience and stay
                current with the latest trends and techniques in nail care.
              </p>
            </div>

            <div className="p-8 rounded-lg transition-shadow">
              <div className="text-5xl mb-6">
                <span className="flaticon-cosmetics">💅</span>
              </div>
              <h5 className="text-xl font-semibold mb-4">Safety Standards</h5>
              <p className="mb-6">
                We follow strict sanitation protocols and use hospital-grade
                disinfectants to ensure your safety and peace of mind.
              </p>
            </div>

            <div className="p-8 rounded-lg transition-shadow">
              <div className="text-5xl mb-6">
                <span className="flaticon-gift-card-2">🎁</span>
              </div>
              <h5 className="text-xl font-semibold mb-4">Gift Vouchers</h5>
              <p className="mb-6">
                Treat someone special to the gift of pampering with our
                customizable gift cards, available in any amount.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About 10 Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.14.jpg"
                alt="about-image"
                className="rounded-lg shadow-lg max-w-md w-full"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h5 className="text-xl font-semibold  mb-4">
                Reveal Colourful You
              </h5>
              <p className="text-lg mb-6">
                Our wide selection of colors and finishes ensures you'll find
                the perfect look for any occasion. From classic nudes to bold
                neons, we have it all.
              </p>
              <h5 className="text-xl font-semibold mb-4">A Personal Touch</h5>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className=" mr-2">✓</span>
                  <p className="text-lg">
                    We take the time to understand your preferences and
                    recommend styles that complement your personality.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className=" mr-2">✓</span>
                  <p className="text-lg">
                    Our technicians are trained to assess your nail health and
                    suggest treatments that will improve their condition.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#FAF4F4]">
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

          {/* Swiper Testimonials */}
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

      <section className="w-full overflow-hidden py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Promo Box 1 */}
          <div
            className="relative w-full bg-cover bg-center h-[600px] flex items-center justify-start px-10"
            style={{
              backgroundImage:
                "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.16.jpg')",
            }}
          >
            <div className=" p-10 rounded-md text-start max-w-md">
              <span className="block text-sm text-gray-700 uppercase mb-2 font-medium tracking-widest">
                A Brush of Perfection
              </span>
              <h3 className="text-2xl italic text-gray-800 mb-2">
                Follow & Share
              </h3>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                @iq_nail_studio
              </h2>
              <a
                href="gallery"
                className="inline-block bg-[#D63384] hover:bg-[#c0266b] text-white px-6 py-3 transition duration-300 text-sm font-semibold"
              >
                VIEW OUR GALLERY
              </a>
            </div>
          </div>

          {/* Promo Box 2 */}
          <div
            className="relative w-full bg-cover bg-center h-[600px] flex items-center justify-start px-10"
            style={{
              backgroundImage:
                "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.17.jpg')",
            }}
          >
            <div className=" p-10 rounded-md text-start max-w-md">
              <span className="block text-sm uppercase text-white/80 font-semibold mb-2 tracking-wider">
                Make It Happen
              </span>
              <h2 className="text-6xl font-bold text-white leading-tight mb-6">
                Reserve Your <br />
                Spot Now!
              </h2>
              <button
                onClick={handleModalOpen}
                className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#D63384] px-6 py-3 transition duration-300 text-sm font-semibold"
              >
                BOOK NOW!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Section 2 */}
      <section className="py-20">
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
                        src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.9.jpg"
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
              <button onClick={handleModalOpen} className="block">
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
              </button>
            </div>

            {/* Promo Box 3 */}
            <div className="col">
              <button onClick={handleModalOpen} className="block">
                <div id="pb-2-3" className="promo-box group">
                  <div className="promo-box-img overflow-hidden rounded-lg mb-6">
                    <div className="hover-overlay relative overflow-hidden">
                      <img
                        className="w-full h-auto object-cover transition duration-500 group-hover:scale-105"
                        src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.10.jpg"
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
              </button>
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

      {/* Banner Section */}
      <section
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
                  className="btn inline-block bg-[#D63384] hover:bg-[#c0266b] text-white px-8 py-3 text-lg font-medium transition duration-300"
                >
                  Reserve your spot now!!
                </button>
                <p className="mt-5 text-sm opacity-80">
                  *We have the right to cancel the offer anytime
                </p>
              </div>
            </div>
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
                  href="mailto:hello@lanottestudio.com"
                  className="font-semibold hover:text-[#FD1C79] transition"
                >
                  hello@lanottestudio.com
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

export default SixthNail;
