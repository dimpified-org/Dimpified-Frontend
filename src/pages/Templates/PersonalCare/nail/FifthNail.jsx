import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FaBars,
  FaTimes,
  FaPhone,
  FaInstagram,
  FaFacebook,
  FaYelp,
  FaQuoteLeft,
  FaVimeo,
  FaQuoteRight,
} from "react-icons/fa";

import { Nail } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

const FifthNail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const testimonials = [
    {
      text: "I was honestly blown away! My nails stayed intact for almost a month — no chips, no lifting. Definitely my go-to spot in Lagos!",
      author: "RACHEL A.",
    },
    {
      text: "Very neat work, and they’re so patient with designs. You’ll feel pampered like a queen. Highly recommend!",
      author: "WENDY T.",
    },
    {
      text: "Their attention to detail is unmatched. From the way they clean up your cuticles to how they shape your nails — perfection!",
      author: "GRACE L.",
    },
    {
      text: "Peaceful environment, gentle touch, and their polish selection is top-notch. It felt like a mini vacation!",
      author: "MICHELLE B.",
    },
    {
      text: "I've done my nails in many places around Abuja, but this one stands out. Clean, classy, and affordable!",
      author: "TINA K.",
    },
    {
      text: "My gel nails lasted over 3 weeks — and I do a lot of house chores. These ladies know their craft!",
      author: "LISA M.",
    },
    {
      text: "From the warm welcome to the perfect finish, everything was just 10/10. My nails have never looked this good.",
      author: "JANE C.",
    },
    {
      text: "They take hygiene seriously, which is a big deal for me. Plus, they’re super friendly and professional.",
      author: "ANITA O.",
    },
  ];

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="top-0 left-0 w-full z-50 bg-[#FAF4F4] shadow-md">
        {/* Mobile Top Bar */}
        <div className="wsmobileheader flex justify-between items-center p-4 md:hidden">
          <span className="smllogo">
            <a href="#home">
              <h2 className="font-bold uppercase text-xl text-orange-800">
                FIX'N'PAY
              </h2>
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
                    className="hover:text-orange-800 text-black uppercase"
                  >
                    Our Services
                  </a>
                </li>
                <li className="px-6 py-2">
                  <a href="#home">
                    <h2 className="font-bold uppercase text-2xl text-orange-800">
                      FIX'N'PAY
                    </h2>
                  </a>
                </li>
                <li className="px-4 py-2">
                  <a
                    href="#gallery"
                    className="hover:text-orange-800 uppercase text-black"
                  >
                    Gallery
                  </a>
                </li>
                <li className="px-4 py-2">
                  <a
                    href="#contact"
                    className="hover:text-orange-800 uppercase text-black"
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
        <div className="md:hidden bg-[#FAF4F4] text-black px-4 py-4 shadow-md border-b border-orange-800">
          <nav className="flex flex-col gap-4">
            <a href="#about" className="hover:text-orange-800 uppercase">
              About
            </a>

            <a href="#services" className="hover:text-orange-800 uppercase">
              Our Services
            </a>
            <a href="#gallery" className="hover:text-orange-800 uppercase">
              Gallery
            </a>
            <a href="#contact" className="hover:text-orange-800 uppercase">
              Contact Us
            </a>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="hero-6"
        className="pt-32 pb-20 md:pt-40 md:pb-32 bg-[#FAF4F4]"
      >
        <div className="flex lg:px-32 flex-col  px-4">
          {/* Hero Text */}
          <div className="flex justify-center">
            <div className="w-full lg:w-3/4 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                We have the best nail pros who do crazy designs
              </h2>
              <a
                href="#services"
                className="bg-orange-800 hover:bg-orange-900 text-white px-8 py-4 text-lg font-medium transition duration-300 inline-block"
              >
                Explore Services
              </a>
            </div>
          </div>
          {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )}

          {/* Hero Images */}
          <div className="mt-16">
            <div className="flex flex-wrap -mx-2">
              <div className="w-7/12 lg:w-auto lg:flex-1 px-2 mb-4">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nailshero5.0.jpg"
                    alt="hero-image"
                    className="w-full h-[200px] md:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition duration-300"></div>
                </div>
              </div>
              <div className="w-5/12 lg:w-5/12 px-2 mb-4">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.2.jpg"
                    alt="hero-image"
                    className="w-full h-[200px] md:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   

      {/* About Section */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full md:w-5/12 px-4 mb-8 md:mb-0 order-2 md:order-1">
              <div className="max-w-md">
                <span className="text-sm font-semibold tracking-wider uppercase text-gray-500 mb-2 block">
                  Get Your Shine On
                </span>
                <h3 className="text-3xl font-bold mb-6 mt-3">
                  Color Your Dreams
                </h3>
                <p className="mb-6">
                  At Fix'n'Pay, we believe your nails are a canvas for
                  self-expression. Our skilled technicians combine artistry with
                  the latest techniques to bring your nail visions to life.
                </p>
                <h5 className="text-xl font-semibold mb-4">A Personal Touch</h5>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p>
                      Each service begins with a consultation to understand your
                      style and nail health needs.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p>
                      We use only premium products that nourish while they
                      beautify, ensuring healthy nails underneath the polish.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-7/12 px-4 order-1 md:order-2">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.1.jpg"
                  alt="about-image"
                  className="w-[500px] h-[500px] hidden md:block"
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
                  className="btn inline-block bg-orange-800 hover:bg-orange-600 text-white px-8 py-3 text-lg font-medium transition duration-300"
                >
                  Book a session online
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Prices Section */}
      <section id="services" className="py-20 bg-[#FAF4F4]">
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#FAF4F4]">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-gray-500 mb-2 block">
              Pricing List
            </span>
            <h2 className="text-3xl font-bold mb-6 mt-3">
              Treat Yourself Today
            </h2>
          </div>

          <div className="flex flex-wrap -mx-4 mb-10">
            <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
              <ul className="space-y-6">
                {Nail.slice(0, 4).map((service, index) => (
                  <li key={index} className="pricing-6-item">
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

            <div className="w-full lg:w-1/2 px-4">
              <ul className="space-y-6">
                {Nail.slice(4, 8).map((service, index) => (
                  <li key={index} className="pricing-6-item">
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
          <div className="text-center mt-8">
            <a
              href="#services"
              className="bg-orange-800 hover:bg-orange-900 text-white px-8 py-3 inline-block"
            >
              BOOK AN APPOINTMENT
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#FAF4F4]">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-gray-500 mb-2 block">
              Choose The Beauty
            </span>
            <h2 className="text-3xl font-bold mb-6">Peace, Love & Nails.</h2>
          </div>

          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="overflow-hidden rounded-lg mb-6">
                <div className="relative overflow-hidden">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.17.jpg"
                    alt="service-image"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition duration-300"></div>
                </div>
              </div>
              <h5 className="text-xl font-bold text-center">
                <a href="pricing.html" className="hover:text-orange-800">
                  Mani's & Pedi's
                </a>
              </h5>
            </div>

            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="overflow-hidden rounded-lg mb-6">
                <div className="relative overflow-hidden">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.4.jpg"
                    alt="service-image"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition duration-300"></div>
                </div>
              </div>
              <h5 className="text-xl font-bold text-center">
                <a href="pricing.html" className="hover:text-orange-800">
                  Acrylic & Gel's
                </a>
              </h5>
            </div>

            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="overflow-hidden rounded-lg mb-6">
                <div className="relative overflow-hidden">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.5.jpg"
                    alt="service-image"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition duration-300"></div>
                </div>
              </div>
              <h5 className="text-xl font-bold text-center">
                <a href="pricing.html" className="hover:text-orange-800">
                  Add-on & Massages
                </a>
              </h5>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-9" className="py-20 bg-white relative">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full md:w-6/12 lg:w-6/12 px-4 mb-8 md:mb-0 order-2">
              <div className="max-w-md">
                <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-2 block">
                  Embellish Your Day
                </span>
                <h3 className="text-3xl font-bold mb-6">Shining Feminine</h3>
                <p className="mb-6">
                  Our salon is dedicated to enhancing your natural beauty with
                  meticulous attention to detail. We create looks that are as
                  unique as you are, from subtle elegance to bold statements.
                </p>
                <h5 className="text-xl font-semibold mb-4">
                  Elegance in Every Stroke
                </h5>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p>
                      Our technicians undergo continuous training to master the
                      latest trends and techniques in nail artistry.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p>
                      We prioritize hygiene and safety, with hospital-grade
                      sterilization for all our tools and equipment.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-6/12 px-4 order-1 md:order-1">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.6.jpg"
                  alt="about-image"
                  className="w-[500px] h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery-2" className="py-20 bg-[#FAF4F4]">
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
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.7.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.8.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.9.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.10.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.11.jpg",
              "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.12.jpg",
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

      {/* Working Hours Section */}
      <section id="about-5" className="py-20 bg-[#FAF4F4]">
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

      {/* Promo Section */}
      <section id="promo-2" className="py-20 bg-[#FAF4F4]">
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
      <div id="brands-1" className="py-12 bg-[#FAF4F4]">
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

      {/* Promo Section */}
      <section
        id="promo-4"
        className="w-full bg-[#FAF4F4] overflow-hidden py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Promo Box 1 */}
          <div
            className="relative w-full bg-cover bg-center h-[550px] flex items-center justify-start px-10"
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
                @fix_n_pay
              </h2>
              <a
                href="#services"
                className="inline-block uppercase bg-orange-800 hover:bg-rose-600 text-white px-6 py-3 transition duration-300 text-sm font-semibold"
              >
                Explore Our Services
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
                Spot Now
              </h2>
              <a
                href="gift-cards.html"
                className="inline-block border-2 border-white text-white hover:bg-[#FAF4F4] hover:text-orange-800 px-6 py-3 transition duration-300 text-sm font-semibold"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
    <section id="reviews-1" className="py-20 bg-[#FAF4F4] border-t border-gray-200">
  <div className="container mx-auto max-w-7xl px-4">
    {/* Section Title */}
    <div className="text-center mb-16">
      <span className="text-gray-400 tracking-widest uppercase text-sm font-medium">
        Testimonials
      </span>
      <h2 className="text-4xl font-bold text-gray-800 mt-3">
        What People Are Saying
      </h2>
    </div>

    {/* Swiper Testimonials */}
    <Swiper
      modules={[Pagination]}
     
      spaceBetween={24}
      breakpoints={{
        0: { slidesPerView: 1.3 },
        768: { slidesPerView: 1.3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {testimonials.map((item, idx) => (
        <SwiperSlide key={idx}>
          <div className="bg-white h-[300px] border border-gray-200 rounded-2xl shadow-sm p-6 mx-2  flex flex-col justify-between">
            <div className="text-orange-700 text-2xl mb-4">
              <FaQuoteLeft />
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              “{item.text}”
            </p>
            <div className="mt-auto">
              <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
                — {item.author}
              </p>
              <div className="text-orange-700 text-2xl mt-4">
                <FaQuoteRight />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>


      {/* Newsletter Section */}
      <section id="contact" className="py-20 bg-[#FAF4F4]">
        <WhiteContactForm />
      </section>

      {/* Footer */}
      <footer
        id="footer-3"
        className="bg-orange-800 text-white py-10 px-4 lg:px-24"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Location */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Our Studio</h5>
            <p className="font-medium">Fix'n'Pay Studio</p>
            <p>
              8721 M Central Avenue
              <br />
              Los Angeles, CA 9003
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About Us" },
                { href: "#services", label: "Services" },
                { href: "#gallery", label: "Gallery" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-orange-800 transition duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
            <p className="mb-2">
              <a href="tel:+12987654321" className="hover:text-orange-400">
                +12 9 8765 4321
              </a>
            </p>
            <p className="mb-4">
              <a
                href="mailto:hello@fixnpay.com"
                className="font-medium hover:text-orange-400"
              >
                hello@fixnpay.com
              </a>
            </p>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-orange-400">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-orange-400">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-orange-400">
                <FaYelp />
              </a>
              <a href="#" className="hover:text-orange-400">
                <FaVimeo />
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Opening Hours</h5>
            <ul className="text-sm space-y-1">
              <li>Mon–Fri: 10:00AM – 9:00PM</li>
              <li>Saturday: 10:00AM – 7:00PM</li>
              <li>Sunday: 10:00AM – 7:00PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-6 text-center text-sm text-white  justify-between items-center">
          <p>
            Built with{" "}
            <a
              href="https://dimpified.com"
              className="hover:text-orange-300 font-medium"
            >
              Dimpified
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FifthNail;
