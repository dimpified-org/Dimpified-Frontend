import { MakeUp } from "../../../../data/Services";
import React, { Fragment, useState } from "react";
import {
  FaFacebook,
  FaCommentDots,
  FaUser,
  FaEnvelope,
  FaTwitter,
  FaArrowRight,
  FaDollarSign,
  FaArrowLeft,
  FaPhoneAlt,
  FaDribbble,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { useCountry } from "../../../pricing/CountryContext";

import { FaFacebookF } from "react-icons/fa6";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";

const MakeupTemplate = ({ userDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  

  const testimonials = [
    {
      text: "The wonderful services you offer locally are great for our community. People are tired of having to travel out of town for things.",
      name: "Mojisola R.",
      title: "Relax Massage",
    },
    {
      text: "This place is beautiful. The outside, the inside, staff communication is all on point! The staff is very friendly, informative, and patient.",
      name: "Olamide A.",
      title: "Relax Massage",
    },
    {
      text: "The ambiance as soon as you enter puts you at ease immediately. The staff is so sweet and generous, and the services they offer are to die for!",
      name: "Adedamola S.",
      title: "Scalp Massage",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  const ServiceBox = ({ title, description, img, icon, number }) => (
    <div className="font-sen flex flex-col sm:flex-row lg:flex-row lg:flex-grow lg:h-72 rounded-lg overflow-hidden shadow-lg hover:shadow-xl">
      <div
        className="relative bg-cover bg-center h-48 sm:h-48 lg:h-full lg:w-1/2 flex-shrink-0"
        style={{ backgroundImage: `url('${img}')` }}
      >
        <span className="absolute left-4 bottom-4 text-5xl sm:text-7xl font-bold text-gray-100">
          {number}
        </span>
      </div>
      <div className="relative bg-gray-100 p-6 flex-1 lg:w-1/2 lg:h-full">
        <div className="mb-4">
          <img className="w-16 sm:w-20" src={icon} alt="" />
        </div>
        <div>
          <span className="block text-lg sm:text-xl font-semibold text-dark-gray mb-2">
            {title}
          </span>
          <p className="text-gray-500 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  return (
    <Fragment>
      <nav className="font-sen w-full z-10 bg-black lg:text-white lg:bg-black ">
        <div className="py-4 px-4 lg:px-24 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex space-x-8 items-center">
            {["about", "services", "pricing", "testimonials", "contact"].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className={`text-lg ${
                    activeLink === link ? "text-purple-600" : "text-white"
                  } hover:text-purple-400 transition`}
                  onClick={() => handleLinkClick(link)}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
              )
            )}
          </div>

          {/* Book Appointment Button for Desktop */}
          <a
            href="#contact"
            className="hidden lg:block text-white border border-white px-6 py-2 rounded-md hover:bg-white hover:text-gray-900 transition"
          >
            Book Appointment
          </a>

          {/* Hamburger Icon for Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700"
            aria-controls="navbar-collapse"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links (pushes hero down) */}
        {isOpen && (
          <div className="lg:hidden bg-orange-700 text-white w-full flex flex-col items-center space-y-4 py-4">
            {["about", "services", "pricing", "testimonials", "contact"].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className="block text-xl font-semibold py-2"
                  onClick={() => handleLinkClick(link)}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
              )
            )}

            {/* Book Appointment Button for Mobile */}
            <a
              href="#contact"
              className="block text-white border border-white text-center font-semibold py-2 px-4 rounded-lg hover:bg-orange-600"
            >
              Book Appointment
            </a>
          </div>
        )}
      </nav>

      {/* hero section */}
      <section
        className="font-sen relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://gfa-tech.com/dimp-template-images/make-up/makeup-hero.jpg)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <span className="block text-lg mb-4 tracking-widest uppercase">
            Elevate Your Beauty
          </span>
          <h1 className="font-Rufina text-5xl lg:text-6xl font-bold mb-8">
            Enhance Your Look, <br />
            Unleash Your Confidence with{" "}
            {userDetails && userDetails.ecosystemName
              ? userDetails.ecosystemName
              : ""}
          </h1>
          {/* Buttons */}
          <a
            href="#contact"
            className="border border-white px-8 py-3 text-lg mb-4 inline-block rounded-md hover:bg-white hover:text-gray-900 transition"
          >
            Book Makeup Session
          </a>
        </div>
      </section>

      <Fragment>
        <section
          id="about"
          className="font-sen bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage:
              "url('https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-bg-01.jpg')",
          }}
        >
          <div className="flex flex-col h-full px-4 py-10 lg:px-24 lg:py-16">
            <div className="flex flex-wrap items-center mb-12 md:mb-20">
              <div className="w-full lg:w-5/12 md:mb-10 sm:mb-8">
                <span className="text-base-color text-sm mb-4 font-bold block uppercase tracking-wide">
                  About Studio
                </span>
                <h3 className="font-Rufina text-3xl lg:text-5xl text-dark-gray tracking-tight mb-4">
                  Discover the art <br />
                  of makeup and beauty transformations.
                </h3>
                <p className="text-primary lg:w-10/12 leading-relaxed mb-10">
                  {userDetails && userDetails.ecosystemDescription
                    ? userDetails.ecosystemDescription
                    : ""}
                </p>
                <div className="inline-block ">
                  <a
                    href="#contact"
                    className=" text-gray-800 font-Rufina font-semibold py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-200 flex items-center"
                  >
                    <span>Book Makeup Session</span>
                    <span className="ml-2">
                      <FaArrowRight />
                    </span>
                  </a>

                  <div className="inline-flex items-center text-dark-gray font-semibold text-lg xs:mt-5 xs:mb-5">
                    <FaPhoneAlt className="icon-small mr-3" />
                    <a href="tel:1800222000">1 800 222 000</a>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 relative lg:ml-10 md:ml-8 mt-8 lg:mt-0">
                <span className="absolute font-Rufina text-6xl left-5 top-16 lg:top-10 text-dark-gray font-bold z-10 tracking-tight">
                  <span className="text-sm font-Rufina block uppercase text-gray-400">
                    Started in
                  </span>
                  1995
                </span>
                <div className="relative w-10/12 md:w-9/12 lg:w-8/12 overflow-hidden rounded-lg float-right">
                  <img
                    className="w-full h-auto"
                    src="https://gfa-tech.com/dimp-template-images/make-up/makeup-2.jpg"
                    alt=""
                  />
                </div>
                <div className="absolute left-[-70px] bottom-[-30px] w-8/12 overflow-hidden md:left-[-100px] sm:left-3 rounded-lg">
                  <img
                    className="w-full h-auto"
                    src="https://gfa-tech.com/dimp-template-images/make-up/makeup-1.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-4 sm:grid-cols-2 sm:text-left">
              <div className="mb-8">
                <h2 className="font-semibold text-5xl text-dark-gray m-0">
                  9.98 &uarr;
                </h2>
                <p className="text-dark-gray leading-7">Google reviews</p>
              </div>
              <div className="mb-8">
                <h2 className="font-semibold text-5xl text-dark-gray m-0">
                  30k &uarr;
                </h2>
                <p className="text-dark-gray leading-7">Instagram followers</p>
              </div>
              <div className="mb-8">
                <h2 className="font-semibold text-5xl text-dark-gray m-0">
                  96% &uarr;
                </h2>
                <p className="text-dark-gray leading-7">Repeat customers</p>
              </div>
              <div className="mb-8">
                <h2 className="font-semibold text-5xl text-dark-gray m-0">
                  28+ &uarr;
                </h2>
                <p className="text-dark-gray leading-7">Years of experience</p>
              </div>
            </div>
          </div>
        </section>
      </Fragment>

      {/* services section */}
      <section
        id="services"
        className="font-sen relative bg-cover bg-no-repeat border-t border-light-gray z-10"
        style={{
          backgroundImage: `url('https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-bg-01.jpg')`,
        }}
      >
        <div className="absolute -left-24 top-1/2 -z-10 hidden lg:block">
          <img
            src="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-bg-img-03.png"
            alt=""
          />
        </div>
        <div className="container mx-auto pt-16 pb-8">
          <div className="flex justify-center mb-8">
            <div className="lg:w-1/2 text-center">
              <span className="text-lg mb-2 text-primary font-medium uppercase tracking-wider block">
                Premium Makeup Services
              </span>
              <h3 className="font-Rufina text-3xl lg:text-5xl text-dark-gray mx-auto leading-snug">
                Discover Our Makeup and Beauty Treatments
              </h3>
            </div>
          </div>
          <div className="mb-10 space-y-8 lg:flex lg:space-y-0 lg:space-x-8">
            <ServiceBox
              title="Makeup Artistry"
              description="Perfect your look with our expert makeup artists."
              img="https://gfa-tech.com/dimp-template-images/make-up/makeup-7.jpg"
              icon="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-icon-01.png"
              number="01"
            />
            <ServiceBox
              title="Skincare"
              description="Revitalize your skin with luxurious treatments."
              img="https://gfa-tech.com/dimp-template-images/make-up/makeup-4.jpg"
              icon="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-icon-02.png"
              number="02"
            />
          </div>
          <div className="space-y-8 lg:flex lg:space-y-0 lg:space-x-8">
            <ServiceBox
              title="Bridal Makeup"
              description="Look radiant on your special day with custom bridal makeup."
              img="https://gfa-tech.com/dimp-template-images/make-up/makeup-5.jpg"
              icon="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-icon-02.png"
              number="03"
            />
            <ServiceBox
              title="Glamour Makeup"
              description="Transform your look with our professional glamour makeup."
              img="https://gfa-tech.com/dimp-template-images/make-up/makeup-6.jpg"
              icon="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-icon-01.png"
              number="04"
            />
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="font-sen relative z-10 bg-cover bg-no-repeat border-t border-gray-300"
        style={{
          backgroundImage: `url('https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-bg-01.jpg')`,
        }}
      >
        <div className="absolute -left-24 top-1/2 z-0 hidden lg:block transform -translate-y-1/2">
          <img
            src="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-bg-img-03.png"
            alt=""
          />
        </div>

        <div className="flex justify-center ">
          {/* <div className="lg:w-5/6">
            <div className="flex flex-wrap">
              {MakeUp.map((service, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/2 lg:w-1/2 p-4 transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="flex items-center rounded-lg shadow-lg p-6 hover:bg-opacity-50">
                    <img
                      src={service.serviceImage}
                      alt=""
                      className="w-32 h-32 rounded-full object-cover"
                    />
                    <div className="ml-6 flex-grow">
                      <div className="flex items-center text-lg font-semibold">
                        <span className="text-gray-800">{service.name}</span>
                        <div className="flex-grow mx-4 border-t border-gray-300"></div>
                        <div className="text-gray-800 flex items-center">
                          <FaDollarSign className="mr-1" />
                          <span>
                            {" "}
                            {getFormattedPrice(service.price, countryCode)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </section>

      <Fragment>
        <section
          className="font-sen relative z-10 bg-cover bg-no-repeat bg-top border-t border-gray-200"
          style={{
            backgroundImage:
              "url(https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-bg-01.jpg)",
          }}
        >
          <div className="container mx-auto py-16">
            <div className="flex flex-wrap justify-center lg:justify-start items-center relative">
              <div className="lg:w-5/12 md:w-11/12 relative lg:ml-4 mb-8 lg:mb-0">
                <img
                  src="https://gfa-tech.com/dimp-template-images/make-up/makeup-8.jpg"
                  className="w-full rounded-md"
                  alt="Makeup Transformation"
                />
              </div>
              <div className="xl:w-5/12 lg:w-6/12 md:w-11/12 px-8 ml-7">
                <span className="block text-base tracking-widest text-primary font-medium text-uppercase mb-2">
                  BENEFITS OF MAKEUP
                </span>
                <h3 className="font-serif text-4xl text-gray-800 mb-4">
                  Professional, natural, and skin-friendly products.
                </h3>
                <p className="text-gray-700 leading-relaxed max-w-md mb-4">
                  Achieve a flawless look and boost your confidence with our
                  expert-selected products. Let your beauty shine.
                </p>
                <ul className="list-none space-y-4">
                  <li className="border-t border-gray-200 py-4 text-gray-700">
                    Enhances natural beauty
                  </li>
                  <li className="border-t border-gray-200 py-4 text-gray-700">
                    Promotes a radiant complexion
                  </li>
                  <li className="border-t border-gray-200 py-4 text-gray-700">
                    Boosts self-confidence
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section
          className="relative bg-cover bg-no-repeat p-0"
          style={{
            backgroundImage:
              "url(https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-bg-01.jpg)",
          }}
        >
          <div className="container mx-auto p-0 flex items-center justify-center gap-0">
            <div className="w-full border-t border-gray-200"></div>

            <div className="relative w-1/3 max-w-[150px] text-center">
              {/* Rotating Image */}
              <style>
                {`
          @keyframes rotation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .animate-rotation {
            animation: rotation 5s linear infinite;
          }

          /* Media query for smaller screens */
          @media (max-width: 640px) {
            .container {
              flex-direction: column;
              gap: 2px; /* Adjust gap if needed */
            }
            .w-1/3 {
              width: 100%;
              max-width: 100px; /* Adjust for mobile */
            }
          }
        `}
              </style>
              <img
                src="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-13.png"
                className="w-full animate-rotation"
                alt="Makeup Icon"
              />

              {/* <!-- Center Decoration Image --> */}
              <div class="absolute inset-0 mx-auto w-3/4 mt-4">
                <img
                  src="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-14.png"
                  alt="Makeup Decoration"
                />
              </div>
            </div>

            <div class="w-full border-t border-gray-200"></div>
          </div>
        </section>
      </Fragment>

      <section
        id="testimonials"
        className="relative bg-cover bg-no-repeat pt-16 md:pt-32"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-bg-01.jpg')",
        }}
      >
        <div className="absolute left-[-100px] top-1/2 transform -translate-y-1/2 hidden lg:block">
          <img
            src="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-bg-img-03.png"
            alt=""
          />
        </div>
        <div className="container mx-auto py-16">
          <div className="flex justify-center mb-6 md:mb-16 xs:mb-10">
            <div className="xl:w-10/12 relative px-4 text-center">
              <div className="relative">
                <div className="text-center">
                  <h6 className="font-serif leading-10 text-2xl text-gray-800 mb-5">
                    {testimonials[currentIndex].text}
                  </h6>
                  <span className="block text-sm text-primary font-medium uppercase">
                    {testimonials[currentIndex].name}
                  </span>
                  <span className="block text-xs text-gray-800 font-medium uppercase">
                    {testimonials[currentIndex].title}
                  </span>
                </div>
                {/* Left Arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl text-primary"
                >
                  <FaArrowLeft />
                </button>
                {/* Right Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl text-primary"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
          {/* Clients Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              "demo-spa-salon-client-01.png",
              "demo-spa-salon-client-02.png",
              "demo-spa-salon-client-03.png",
              "demo-spa-salon-client-04.png",
              "demo-spa-salon-client-05.png",
              "demo-spa-salon-client-06.png",
            ].map((client, index) => (
              <div key={index} className="mb-8">
                <div className="client-box">
                  <a href="#">
                    <img
                      src={`https://gfa-tech.com/dimp-template-images/images/${client}`}
                      className="h-[110px]"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="font-sen bg-[#f8f3ec] py-12">
        <div className="flex flex-col h-full py-4 px-4 lg:px-24 lg:flex-row items-start justify-between space-y-12 lg:space-y-0">
          {/* Left Side (Contact Info) */}
          <div className="lg:w-1/2 w-full">
            <span className="text-orange-500 text-lg font-sen font-bold uppercase tracking-widest">
              Book your appointment
            </span>
            <h2 className="text-4xl font-Rufina font-semibold text-gray-800 mt-2 mb-10">
              We would love to pamper you.
            </h2>
            {/* First Row: Visit our beauty salon and Book an appointment */}
            <div className="flex flex-col lg:flex-row lg:justify-between mb-5">
              {/* Visit our beauty salon */}
              <div className="lg:w-1/2 w-full lg:mr-4 mb-6 lg:mb-0">
                <h3 className="text-xl font-Rufina font-semibold text-gray-700">
                  Visit our beauty salon
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600 font-sen">
                  {userDetails && userDetails.address && userDetails.address}
                </p>
              </div>
              {/* Book an appointment */}
              <div className="lg:w-1/2 w-full">
                <h3 className="text-xl font-Rufina font-semibold text-gray-700 ">
                  Book an appointment
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600">
                  <a
                    href="mailto:info@yourdomain.com"
                    className="underline font-sen"
                  >
                    info@yourdomain.com
                  </a>
                  <br />
                  <a
                    href="mailto:booking@yourdomain.com"
                    className="underline font-sen"
                  >
                    booking@yourdomain.com
                  </a>
                </p>
              </div>
            </div>
            {/* Second Row: Let's talk and Opening hours */}
            <div className="flex flex-col lg:flex-row lg:justify-between mb-5">
              {/* Let's talk */}
              <div className="lg:w-1/2 w-full lg:mr-4 mb-6 lg:mb-0">
                <h3 className="text-xl font-Rufina font-semibold text-gray-700">
                  Let's talk
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600 font-sen">
                  Phone: <a href="tel:1800222000">1-800-222-000</a>
                  <br />
                  Fax: 1-800-222-002
                </p>
              </div>
              {/* Opening hours */}
              <div className="lg:w-1/2 w-full">
                <h3 className="text-xl font-Rufina font-semibold text-gray-700">
                  Opening hours
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600 font-sen">
                  Mon - Fri: 09 am to 08 pm
                  <br />
                  Sat - Sun: 09 am to 06 pm
                </p>
              </div>
            </div>
          </div>
          {/* Right Side (Form) */}
          <div className="lg:w-1/2 w-full relative">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg ml-auto relative">
              {/* Heading */}
              <h2 className="text-3xl font-sen font-bold text-white mb-8">
                Book Now!
              </h2>

              {/* Form */}
              <form className="space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <FaUser className="text-gray-400 mb-2" />
                  <input
                    type="text"
                    placeholder="Enter your name*"
                    className="w-full border-b border-gray-400 bg-transparent text-gray-300 placeholder-gray-400 py-2 focus:outline-none focus:border-white"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <FaEnvelope className="text-gray-400 mb-2" />
                  <input
                    type="email"
                    placeholder="Enter your email address*"
                    className="w-full border-b border-gray-400 bg-transparent text-gray-300 placeholder-gray-400 py-2 focus:outline-none focus:border-white"
                    required
                  />
                </div>

                {/* Service Input */}
                <div className="relative">
                  <FaCommentDots className="text-gray-400 mb-2" />
                  <textarea
                    placeholder="Which service would you like to book?"
                    className="w-full border-b border-gray-400 bg-transparent text-gray-300 placeholder-gray-400 py-2 focus:outline-none focus:border-white"
                    rows="2"
                    required
                  />
                </div>

                {/* Special Requests Input */}
                <div>
                  <textarea
                    placeholder="Any special requests or notes"
                    className="w-full border-b border-gray-400 bg-transparent text-gray-300 placeholder-gray-400 py-2 focus:outline-none focus:border-white"
                    rows="4"
                  />
                </div>

                {/* Submit Button */}
                <button
                  id="contact"
                  type="submit"
                  className="mt-4 bg-white text-gray-900 py-3 px-8 rounded shadow-md font-sen font-semibold hover:bg-gray-100 transition-colors"
                >
                  Book Appointment
                </button>
              </form>

              {/* Decorative Circle with Image */}
            </div>
          </div>
        </div>
      </section>

      <footer className="font-sen relative bg-[#f8f3ec] pt-16 pb-20 border-t border-gray-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left flex-wrap">
            {/* Left Column: Studio Location */}
            <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-left">
              <span className="text-xl font-medium text-gray-800 block mb-2">
                Studio Location
              </span>
              <p>{userDetails && userDetails.address && userDetails.address}</p>
              {/* Horizontal line under the left content */}
              <div className="border-t border-gray-300 w-full mt-4"></div>
            </div>

            {/* Center Column: Circular Image with Social Icons */}
            <div className="relative flex items-center justify-center w-full md:w-1/3 mb-8 md:mb-0">
              {/* Center Logo with Social Icons in Circular Path */}
              <div className="relative w-56 h-56 rounded-full flex items-center justify-center shadow-lg">
                <img
                  src="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-15.png"
                  alt="Spa Salon"
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full flex flex-col items-center justify-between">
                    {/* Top Row: Facebook and Instagram */}
                    {userDetails &&
                      userDetails.socialMedia &&
                      userDetails.socialMedia.length > 0 && (
                        <div className="mb-8">
                          <ul className="flex justify-center space-x-6">
                            <li>
                              <a
                                className="text-gray-50 hover:text-blue-600"
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaFacebookF className="w-6 h-6" />
                              </a>
                            </li>
                            <li>
                              <a
                                className="text-gray-50 hover:text-blue-600"
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaInstagram className="w-6 h-6" />
                              </a>
                            </li>
                            <li>
                              <a
                                className="text-gray-50 hover:text-blue-600"
                                href="https://www.twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaTwitter className="w-6 h-6" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}

                    {/* Center Row: Dribbble and Twitter inside the image */}
                    <div className="absolute flex justify-center items-center w-full h-full top-1/2 transform -translate-y-1/2">
                      <a
                        href="http://www.dribbble.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-2"
                      >
                        <FaDribbble className="text-gray-800 text-2xl" />
                      </a>
                      <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-2"
                      >
                        <FaTwitter className="text-gray-800 text-2xl" />
                      </a>
                    </div>

                    {/* Bottom Row: LinkedIn */}
                    <div className="absolute flex justify-center w-full bottom-2">
                      <a
                        href="http://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform -rotate-45"
                      >
                        <FaLinkedin className="text-gray-800 text-2xl" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Information */}
            <div className="w-full md:w-1/3 text-center md:text-right">
              <span className="text-xl font-medium text-gray-800 block mb-2">
                How Can We Help?
              </span>
              <a href="mailto:info@example.com" className="block">
                info@example.com
              </a>
              <a href="mailto:support@example.com" className="block">
                support@example.com
              </a>
              {/* Horizontal line under the right content */}
              <div className="border-t border-gray-300 w-full mt-4"></div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-10 text-center md:text-left space-y-2 md:space-y-0">
            <p className="w-full md:w-auto">2024 All rights reserved.</p>
            <p className="w-full md:w-auto">
              Proudly Powered by{" "}
              <a
                href="https://www.dimpified.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-gray-800 font-medium"
              >
                DIMP
              </a>
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default MakeupTemplate;
