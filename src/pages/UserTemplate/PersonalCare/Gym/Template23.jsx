import React, { Fragment, useState, useEffect } from "react";
import { FaPlay, FaCheckCircle, FaMapPin, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { gym } from "../../../../data/Services";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";
const GymTemplate = ({ details, subdomain, userDetails }) => {
  const testimonials = [
    {
      name: details && details.Events.section1header,
      role: details && details.Events.buttonText1,
      rating: 5,
      image: details && details.Events.sectionImage1,
      review: details && details.Events.section1paragraphy,
    },
    {
      name: details && details.Events.section2header,
      role: details && details.Events.buttonText2,
      rating: 5,
      image: details && details.Events.sectionImage2,
      review: details && details.Events.section2paragraphy,
    },
    {
      name: details && details.Events.section3header,
      role: details && details.Events.buttonText3,
      rating: 5,
      image: details && details.Events.sectionImage3,
      review: details && details.Events.section3paragraphy,
    },
    {
      name: details && details.Events.section4header,
      role: details && details.Events.buttonText4,
      rating: 5,
      image: details && details.Events.sectionImage4,
      review: details && details.Events.section4paragraphy,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [services, setServices] = useState([]);
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    const getServiceeDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`
        );
        const allServices = response.data.flatMap((item) => item.services);
        const userCurrency = response.data.flatMap((item) => item.currency);
          setCurrency(userCurrency);
        setServices(allServices);
      } catch (error) {
        console.log("not working", error);
      } finally {
        console.log("finish loading");
      }
    };
    getServiceeDetails();
  }, []);

  const sanitizeContent = (html) => {
    return sanitizeHtml(html, {
      allowedTags: [],
      allowedAttributes: {},
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the mobile menu when a link is clicked
  };
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="font-Urbanist">
      {/* Navbar */}
      <nav className="w-full z-10 bg-white text-black top-0 left-0">
        <div className="py-4 px-6 md:px-32 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="#home" className="flex items-center">
              <img
                src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-icon-01.png"
                alt="Icon"
                className="h-6"
              />
              <span className="text-lime-600 font-bold ml-2">
                {userDetails && userDetails.ecosystemName}
              </span>
            </Link>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex space-x-8 text-lg font-semibold ml-24">
            <a href="#about" className="hover:text-lime-600">
              About
            </a>
            <a href="#services" className="hover:text-lime-600">
              Services
            </a>
            <a href="#testimonials" className="hover:text-lime-600">
              Testimonials
            </a>
            <a href="#membership" className="hover:text-lime-600">
              Membership
            </a>
          </div>

          {/* Join Us Button */}
          <button
            onClick={handleModalOpen}
            className="hidden md:inline items-center px-3 py-2 bg-lime-600 text-white rounded shadow-md hover:bg-lime-700 transition w-auto max-w-[140px]"
          >
            Join Us!
          </button>

          {/* Hamburger Icon for Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
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

        {/* Mobile Navigation Links */}
        {isOpen && (
          <div className="md:hidden bg-lime-600 text-white w-full flex flex-col items-center space-y-4 py-4">
            {["about", "services", "testimonials", "membership"].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="block text-xl font-semibold py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
            <button
              onClick={handleModalOpen}
              className="block text-white border border-white text-center font-semibold py-2 px-6 rounded-lg hover:bg-lime-700"
            >
              Join Us!
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col md:flex-row md:h-screen bg-gray-50 "
      >
        {/* Left Section */}
        <div className="flex flex-col justify-center items-start px-8 py-6 md:py-0 md:w-1/2 md:px-32 md:px-24">
          <span className="text-lg font-Raj font-semibold text-lime-600 mb-2 relative">
            {sanitizeContent(details && details.hero.title1)}
            <span className="absolute left-0 -bottom-1 w-40 border-b-4 border-lime-600"></span>
          </span>
          <h2 className="text-3xl font-Raj md:text-7xl font-bold text-gray-900 leading-tight mb-4 ">
            {sanitizeContent(details && details.hero.title2)}
            <span className="text-lime-500">.</span>
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-4 ">
            {sanitizeContent(details && details.hero.summary1)}
          </p>
          <p className="text-gray-700 mb-6 r">
            <span className="font-bold text-gray-900">
              {sanitizeContent(details && details.hero.summary2)}
            </span>{" "}
          </p>
          <button
            onClick={handleModalOpen}
            className="flex items-center px-3 py-2 bg-lime-600 text-white rounded shadow-md hover:bg-lime-700 transition w-auto max-w-[140px]"
          >
            {sanitizeContent(details && details.hero.buttonText1)}
          </button>
        </div>
        {isModalOpen && (
          <BookingModal
            isOpen={isModalOpen}
            handleClose={handleModalClose}
            information={services}
            subdomain={subdomain}
            serviceCurrency={currency}
          />
        )}

        {/* Right Section (Image) */}
        <div
          className="md:w-1/2 w-full md:h-full h-96 bg-cover bg-center"
          style={{
            backgroundImage: `url(${details && details.hero.backgroundImage1})`,
          }}
        ></div>
      </section>

      {/* Counter Section */}
      <section className="bg-white py-10">
        <div className="h-full mx-auto py-4 px-6 md:px-32 grid grid-cols-2 md:grid-cols-4 gap-8 ">
          {[
            {
              count: details && details.Statistics.section1header,
              label: details && details.Statistics.section1paragraphy,
            },
            {
              count: details && details.Statistics.section2header,
              label: details && details.Statistics.section2paragraphy,
            },
            {
              count: details && details.Statistics.section3header,
              label: details && details.Statistics.section3paragraphy,
            },
            {
              count: details && details.Statistics.section4header,
              label: details && details.Statistics.section4paragraphy,
            },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <h1 className="text-5xl font-Raj font-bold text-lime-600">
                {sanitizeContent(item.count)}
              </h1>
              <span className="block text-gray-700 text-sm font-semibold uppercase">
                {sanitizeContent(item.label)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section class="flex flex-col h-full py-4 px-6 md:px-24">
        <div class="flex flex-col md:flex-row items-center">
          {/* <!-- Image Section --> */}
          <div class="relative md:w-1/2 order-2 md:order-1">
            <div class="absolute left-5 top-0 hidden md:inline-block transform -rotate-10 translate-y-12">
              <img
                src="https://craftohtml.themezaa.com/images/demo-gym-and-fitness-home-02.png"
                alt="Fitness Program"
              />
            </div>
            <img
              src={details && details.aboutUs.image2}
              alt="Gym Session"
              class="w-full"
            />
            <div class="absolute right-[-100px] bottom-0 md:right-[-30px] hidden md:inline-block transform translate-y-12">
              <img
                src="https://craftohtml.themezaa.com/images/demo-gym-and-fitness-home-03.png"
                alt="Workout Plan"
              />
            </div>
          </div>

          {/* <!-- Text Section --> */}
          <div
            id="about"
            class="md:w-5/12 md:ml-8 mb-12 mt-10 md:mt-0 order-1 md:order-2  md:text-left"
          >
            <span class="text-xl font-Raj font-semibold text-gray-800 inline-block border-b-4 border-lime-500 mb-6">
              {sanitizeContent(details && details.aboutUs.title1)}
            </span>
            <h2 class="text-4xl font-Raj font-bold text-gray-800 mb-4">
              {sanitizeContent(details && details.aboutUs.title2)}
              <span class="text-lime-500">.</span>
            </h2>
            <p class="md:w-11/12 mb-4">
              {sanitizeContent(details && details.aboutUs.text1)}
            </p>

            {/* <!-- Buttons --> */}
            <div class="flex flex-col md:flex-row  md:items-start gap-4">
              <a
                href="#services"
                className="flex items-center px-3 py-2 bg-lime-600 text-white rounded shadow-md hover:bg-lime-700 transition w-auto max-w-[140px]"
              >
                {sanitizeContent(details && details.aboutUs.buttonText1)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" class="bg-white font-primary relative pt-1">
        <div class="flex flex-col h-full  py-4 px-6 md:px-32 mt-10">
          <div class="flex flex-col md:flex-row mb-7 xs:mb-10">
            <div class="xl:w-5/12 md:w-6/12 flex flex-col md:mb-5">
              <span class="text-lg font-semibold text-dark-gray inline-block mb-6 border-b-2 border-base-color">
                Our Services
              </span>
              <h2 class="text-5xl font-Raj font-bold text-dark-gray mb-2">
                Enhancing your health
                <br /> and well-being<span class="text-base-color">.</span>
              </h2>
              <div class="font-medium text-dark-gray mt-auto flex items-center">
                <img
                  src="https://craftohtml.themezaa.com/images//demo-elearning-03.png"
                  alt=""
                />
                <span>
                  Fitness courses from{" "}
                  <span class="font-semibold underline">top experts.</span>
                </span>
              </div>
            </div>
            <div class="md:w-6/12 xl:w-6/12 xl:ml-6 mt-10 md:mt-0">
              <div class="grid grid-cols-12 gap-0 border-b border-gray-300">
                <div class="col-span-3 flex justify-center items-center">
                  <img
                    src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-icon-01.png"
                    class="w-14"
                    alt=""
                  />
                </div>
                <div class="col-span-8 pl-10 pr-10 py-8 border-l border-gray-300 xs:pl-6 xs:pr-6">
                  <span class="text-2xl font-Raj font-medium text-dark-gray">
                    Professional Trainers
                  </span>
                  <p>Get guidance from certified professionals.</p>
                </div>
                <div class="col-span-1 flex justify-center items-center">
                  <button onClick={handleModalOpen}>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-12 gap-0 border-b border-gray-300">
                <div class="col-span-3 flex justify-center items-center">
                  <img
                    src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-icon-02.png"
                    class="w-14"
                    alt=""
                  />
                </div>
                <div class="col-span-8 pl-10 pr-10 py-8 border-l border-gray-300 xs:pl-6 xs:pr-6">
                  <span class="text-2xl font-Raj font-medium text-dark-gray">
                    Practice Videos
                  </span>
                  <p>Access on-demand training sessions anytime.</p>
                </div>
                <div class="col-span-1 flex justify-center items-center">
                  <button onClick={handleModalOpen}>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-12 gap-0 border-b border-gray-300">
                <div class="col-span-3 flex justify-center items-center">
                  <img
                    src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-icon-03.png"
                    class="w-14"
                    alt=""
                  />
                </div>
                <div class="col-span-8 pl-10 pr-10 py-8 border-l border-gray-300 xs:pl-6 xs:pr-6">
                  <span class="text-2xl font-Raj font-medium text-dark-gray">
                    Progress Reports
                  </span>
                  <p>Track your fitness journey and see your growth.</p>
                </div>
                <div class="col-span-1 flex justify-center items-center">
                  <button onClick={handleModalOpen}>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute left-0 -bottom-24 z-10 hidden md:flex flex-col items-center justify-center w-[320px] h-[320px] md:w-[150px] md:h-[150px] md:w-[180px] md:h-[180px] rounded-full md:-bottom-16 md:-left-8 md:-left-5 md:-bottom-14">
          <img
            src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-05.png"
            class="absolute top-1/2 -translate-y-1/2 md:w-11"
            alt=""
          />
          <img
            src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-04.png"
            alt=""
          />
        </div>
      </section>

      <section
        id="membership"
        className=" flex flex-col h-full px-6 md:px-32 py-12"
      >
        <div className=" ">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 lg:pr-4 md:mb-8">
              <h2 className="font-bold text-5xl text-dark-gray font-Raj mb-4">
                Membership<span className="text-lime-500"> Plans</span>
              </h2>
            </div>
            <div className="w-full lg:w-8/12 lg:pl-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ul className="list-none p-0 m-0">
                    <li className="pb-2 flex items-center">
                      <i className="feather icon-feather-arrow-right-circle text-xl text-base-color mr-3"></i>
                      30% off for family membership.
                    </li>
                    <li className="pb-2 flex items-center">
                      <i className="feather icon-feather-arrow-right-circle text-xl text-base-color mr-3"></i>
                      25% off when you purchase gold services.
                    </li>
                    <li className="pb-2 flex items-center">
                      <i className="feather icon-feather-arrow-right-circle text-xl text-base-color mr-3"></i>
                      Every session is booked in advance.
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="list-none p-0 m-0">
                    <li className="pb-2 flex items-center">
                      <i className="feather icon-feather-arrow-right-circle text-xl text-base-color mr-3"></i>
                      Top-tier fitness programs.
                    </li>
                    <li className="pb-2 flex items-center">
                      <i className="feather icon-feather-arrow-right-circle text-xl text-base-color mr-3"></i>
                      Unlimited access to all equipment.
                    </li>
                    <li className="pb-2 flex items-center">
                      <i className="feather icon-feather-arrow-right-circle text-xl text-base-color mr-3"></i>
                      Complimentary personal training.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col h-full px-6 md:px-32 py-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative bg-gray-100 py-8 px-12 rounded-sm overflow-hidden "
              >
                <span className="text-sm font-semibold uppercase bg-white shadow-md rounded-full px-4 py-1 mb-4 inline-block">
                  {service.name}
                </span>
                <h2 className="text-4xl py-3 font-Raj font-bold text-gray-800">
           =
                  {getCurrencySymbol(currency)}{service.price}
                </h2>
                {/* <span className="block text-sm font-semibold uppercase text-gray-700 mb-4">
                {services.}
              </span> */}
                <div className="space-y-2 mb-6">
                  <p className="flex items-center mb-2 pe-6 text-gray-700">
                    {service.shortDescription}
                  </p>
                </div>

                <button
                  onClick={handleModalOpen}
                  className="inline-block bg-lime-500 text-white py-2 px-6 rounded-sm hover:bg-gray-700 transition"
                >
                  Choose plan
                </button>
                <div
                  className="absolute top-0 right-0 h-full w-16 bg-cover bg-center"
                  /* style={{ backgroundImage: `url(${service.serviceImage})` }} */
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section class="bg-cultured font-primary relative overflow-hidden mt-12">
        <div class="flex flex-col h-full  py-4 px-6 md:px-24">
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-6/12 mb-4 md:mb-0 relative">
              <figure class=" w-4/5 ml-auto">
                <img
                  src={details && details.Blog.image1}
                  class="rounded-lg w-full"
                  alt="Fitness"
                />
                <figcaption class="absolute bottom-20 left-2 w-[180px] text-center rounded-lg shadow-lg overflow-hidden animate-float">
                  <div class="bg-white p-3">
                    <div class="relative mb-10">
                      <img
                        src={details && details.Blog.image2}
                        class="rounded-lg"
                        alt="Morning Run"
                      />
                      <a
                        href="https://www.youtube.com/watch?v=cfXHhfNy7tU"
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
                      >
                        <FaPlay class="text-dark-gray" />
                      </a>
                    </div>
                    <div class="flex items-center text-start">
                      <div class="text-lg font-Raj font-medium text-dark-gray">
                        {sanitizeContent(details && details.Blog.content4)}
                      </div>
                      <div class="ml-auto">
                        <img
                          src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-13.jpg"
                          alt="Runner"
                        />
                      </div>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div class="xl:w-5/12 md:w-6/12 xl:ml-8  md:text-left">
              <span class="text-lg font-Raj font-semibold text-dark-gray inline-block mb-3 border-b-2 border-base-color">
                {sanitizeContent(details && details.Blog.header1)}
              </span>
              <h2 class="text-5xl font-Raj mb-4 font-bold text-dark-gray">
                {sanitizeContent(details && details.Blog.summary1)}
                <span class="text-lime-600">.</span>
              </h2>
              <ul class="list-none text-start">
                <li className="mb-4">
                  <div className="flex items-start">
                    <FaCheckCircle className="mr-2 text-lime-600" />
                    <div>
                      <strong className="text-lg font-medium text-dark-gray">
                        {sanitizeContent(details && details.Blog.header2)}
                      </strong>
                      <p className="mt-2">
                        {sanitizeContent(details && details.Blog.summary2)}
                      </p>
                    </div>
                  </div>
                </li>

                <li className="mb-4 flex items-start">
                  <FaCheckCircle className="mr-2 text-lime-600" />
                  <div>
                    <strong className="text-lg font-medium text-dark-gray">
                      {sanitizeContent(details && details.Blog.header3)}
                    </strong>
                    <p className="mt-2">
                      {sanitizeContent(details && details.Blog.summary3)}
                    </p>
                  </div>
                </li>
                <li className="mb-4 flex items-start">
                  <FaCheckCircle className="mr-2 text-lime-600" />
                  <div>
                    <strong className="text-lg font-medium text-dark-gray">
                      {sanitizeContent(details && details.Blog.header4)}
                    </strong>
                    <p className="mt-2">
                      {sanitizeContent(details && details.Blog.summary4)}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-white py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className=" md:text-left mb-6 md:mb-0">
              <span className="text-lg font-Raj font-medium text-gray-700 mb-2 block underline decoration-lime-500">
                {sanitizeContent(details && details.Events.heading)}
              </span>
              <h2 className="text-3xl font-Raj text-start font-bold text-gray-800 mb-2">
                {sanitizeContent(details && details.Events.summary)}
                <span className="text-indigo-600">.</span>
              </h2>
            </div>
            <div className="relative overflow-hidden w-full max-w-lg md:max-w-2xl">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-transform duration-500 transform ${
                    index === activeIndex
                      ? "translate-x-0"
                      : "translate-x-full absolute top-0 left-0 w-full"
                  }`}
                >
                  <div className="border p-6 rounded-lg shadow-lg bg-white">
                    <div className="flex items-center mb-4">
                      <img
                        className="w-20 h-20 rounded-full mr-4"
                        src={testimonial.image}
                        alt={sanitizeContent(testimonial.name)}
                      />
                      <div>
                        <h4 className="text-xl font-Raj font-semibold">
                          {sanitizeContent(testimonial.name)}
                        </h4>
                        <p>{sanitizeContent(testimonial.role)}</p>
                      </div>
                      <div className="ml-auto bg-lime-600 text-white text-sm font-bold px-6 py-1 rounded-full">
                        {Array(testimonial.rating)
                          .fill()
                          .map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                      </div>
                    </div>
                    <p>{sanitizeContent(testimonial.review)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="justify-center items-center space-x-2 mt-4">
            <button
              className="border p-2 rounded-full text-gray-700"
              onClick={prevSlide}
            >
              &lt;
            </button>
            <button
              className="border p-2 rounded-full text-gray-700"
              onClick={nextSlide}
            >
              &gt;
            </button>
          </div>
          {/* Rating Section */}
          <div className="mt-10 text-center">
            <h2 className="inline-block ml-4 text-gray-700">
              Rated 4.8 out of 5.0 based on members'{" "}
              <span className="font-bold underline decoration-black-500">
                1058 reviews!
              </span>
            </h2>
          </div>
        </div>
      </section>

      <section id="instructors" className="py-12 bg-white">
        <div className="flex flex-col h-full  py-4 px-6 md:px-32">
          <div className="flex flex-wrap items-end mb-12">
            <div className="w-full md:w-7/12 md:text-left mb-6 md:mb-0">
              <div className="inline-block mb-3">
                <span className="text-base  font-Raj font-semibold underline underline-offset-[10px] decoration-lime-600">
                  {sanitizeContent(details && details.LargeCta.header3)}
                </span>
              </div>
              <h2 className="text-4xl font-Raj text-lime-600 font-bold leading-tight mb-3">
                {sanitizeContent(details && details.LargeCta.header1)}
              </h2>
            </div>
            <div className="w-full md:w-5/12  md:text-left">
              <p className="text-gray-700">
                {sanitizeContent(details && details.LargeCta.header2)}
              </p>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
            <div className="text-center">
              <div className="bg-white overflow-hidden">
                <img
                  className="w-full h-64 rounded-md object-cover"
                  src={details && details.Team.image1}
                  alt={sanitizeContent(details && details.Team.header1)}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold font-Raj">
                    {sanitizeContent(details && details.Team.header1)}
                  </h3>
                  <p className="text-gray-500">
                    {sanitizeContent(details && details.Team.summary1)}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white overflow-hidden">
                <img
                  className="w-full h-64 rounded-md object-cover"
                  src={details && details.Team.image2}
                  alt={sanitizeContent(details && details.Team.header2)}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold font-Raj">
                    {sanitizeContent(details && details.Team.header2)}
                  </h3>
                  <p className="text-gray-500">
                    {sanitizeContent(details && details.Team.summary2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white overflow-hidden">
                <img
                  className="w-full h-64 rounded-md object-cover"
                  src={details && details.Team.image3}
                  alt={sanitizeContent(details && details.Team.header3)}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold font-Raj">
                    {sanitizeContent(details && details.Team.header3)}
                  </h3>
                  <p className="text-gray-500">
                    {sanitizeContent(details && details.Team.summary3)}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white overflow-hidden">
                <img
                  className="w-full h-64 rounded-md object-cover"
                  src={details && details.Team.image4}
                  alt={sanitizeContent(details && details.Team.header4)}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold font-Raj">
                    {sanitizeContent(details && details.Team.header4)}
                  </h3>
                  <p className="text-gray-500">
                    {sanitizeContent(details && details.Team.summary4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WhiteContactForm ecosystemDomain={subdomain} />

      <footer class="px-6 bg-gray-900 py-6">
        <div class=" flex flex-col h-full py-4 px-6 md:px-32 text-center sm:text-left">
          <div class="flex flex-col items-center border-white/10 pt-6 md:flex-row md:items-center">
            {/* <!-- Navigation Links --> */}
            <div class="w-full mb-4 md:mb-0">
              <ul class="flex flex-wrap justify-center space-x-4 text-white text-lg">
                <li>
                  <a
                    href="#home"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#instructors"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Instructors
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- Copyright Text --> */}
            <div class="w-full text-center md:text-right mt-4 md:mt-0">
              <p class="text-[#706F6B] text-lg">
                © {new Date().getFullYear()} Proudly Powered by
                <a
                  href="https://www.dimpified.com/"
                  target="_blank"
                  rel="noreferrer"
                  class="text-white underline hover:text-white"
                >
                  Dimpified
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GymTemplate;
