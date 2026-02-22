import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaArrowRight,
  FaPhoneAlt,
} from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";
const Template13 = ({ details, subdomain, userDetails }) => {
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
    setIsOpen(false);
  };

  const testimonials = [
    {
      name: details.Reviews.header1,
      imgSrc: details.Reviews.image1,
      testimonial: details.Reviews.summary1,
      rating: details.Reviews.title1,
    },
    {
      name: details.Reviews.header2,
      imgSrc: details.Reviews.image2,
      testimonial: details.Reviews.summary2,
      rating: details.Reviews.title2,
    },
    {
      name: details.Reviews.header3,
      imgSrc: details.Reviews.image3,
      testimonial: details.Reviews.summary3,
      rating: details.Reviews.title3,
    },
    {
      name: details.Blog.author1,
      imgSrc: details.Blog.content1,
      testimonial: details.Blog.header2,
      rating: details.Blog.summary2,
    },
  ];

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change to next testimonial every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[currentTestimonialIndex];

  return (
    <Fragment>
      <div>
        {/* Navbar */}
        <nav className="font-jost w-full z-10 bg-white text-black lg:text-white lg:bg-transparent lg:absolute lg:top-0 lg:left-0">
          <div className="py-4 px-4 lg:px-24 flex justify-between items-center relative">
            {/* Left-aligned container for logo and menu */}
            <div className="flex items-center space-x-8 lg:space-x-12 mr-auto">
              <Link to="#home" className="flex items-center">
                <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
              </Link>

              {/* Desktop Menu  */}
              <div className="hidden lg:flex space-x-8 text-lg font-semibold">
                <a href="#about" className="hover:text-black">
                  About
                </a>
                <a href="#services" className="hover:text-black">
                  Services
                </a>
                <a href="#pricing" className="hover:text-black">
                  Pricing
                </a>
                <a href="#testimonials" className="hover:text-black">
                  Testimonials
                </a>
                <a href="#contact" className="hover:text-black">
                  Contact
                </a>
              </div>
            </div>

            {/* Right-aligned Book Appointment button */}
            <button
              onClick={handleModalOpen}
              className="hidden lg:inline border border-white-700 text-white-800 py-2 px-6 font-medium hover:border-gray-100"
            >
              Book Appointment
            </button>

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

          {/* Mobile Navigation Links */}
          {isOpen && (
            <div className="lg:hidden bg-[rgb(184,94,4)] text-white w-full flex flex-col items-center space-y-4 py-4">
              {["about", "services", "pricing", "testimonials", "contact"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link}`}
                    className="block text-xl font-semibold py-2"
                    onClick={handleLinkClick}
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                )
              )}
              <button
                className="block text-white border border-white text-center font-semibold py-2 px-4 rounded-lg hover:bg-orange-600"
                onClick={handleModalOpen}
              >
                Book Appointment
              </button>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section
          className="font-jost relative bg-cover bg-center h-[600px]"
          style={{
            backgroundImage: `url(${details && details.hero.backgroundImage1})`,
          }}
        >
          {isModalOpen && (
            <BookingModal
              isOpen={isModalOpen}
              handleClose={handleModalClose}
              information={services}
              subdomain={subdomain}
              serviceCurrency={currency}
            />
          )}
          <div className="inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          <div className="container mx-auto h-full flex items-center px-4 lg:px-12">
            <div className="text-white w-full text-center lg:text-left sm:text-center lg:w-1/2">
              <p className="mb-4 text-sm lg:text-lg font-bold mt-6">
                {sanitizeContent(details.hero.title1)}
              </p>
              <h1 className="font-bold font-jost text-4xl lg:text-7xl mb-4 leading-snug">
                {userDetails && userDetails.ecosystemName
                  ? userDetails.ecosystemName
                  : ""}
                <br />
                {sanitizeContent(details && details.hero.title2)}
              </h1>
              <button
                className="text-white border border-white text-center font-semibold py-2 px-4 rounded-lg hover:bg-orange-950"
                onClick={handleModalOpen}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </section>
      </div>

      <section
        className="font-jost bg-cover bg-repeat py-10"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-bg-01.jpg')",
        }}
      >
        <div className="flex flex-col h-full px-4">
          <div className="flex flex-wrap items-center  mb-10 md:mb-17 lg:px-32 px-4 ">
            {/* Image Section */}
            <div className="relative xl:w-1/2 lg:w-1/2 md:w-4/6 mb-8 lg:mb-0">
              <div className="w-4/5 overflow-hidden rounded-xl float-end relative">
                <img
                  className="w-4/4 rounded-xl"
                  src={details.aboutUs.image2}
                  alt=""
                />
              </div>
              <div className="absolute left-[-70px] bottom-[-30px] w-3/5 md:left-[-100px] sm:left-[-15px]">
                <img
                  className="w-4/4 rounded-xl"
                  src={details.aboutUs.image3}
                  alt=""
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="xl:w-1/2 lg:w-1/2 lg:pl-12 text-center lg:text-left">
              <span className="text-sm font-medium uppercase tracking-wider mb-3 inline-block">
                {sanitizeContent(details.aboutUs.title1)}
              </span>
              <h3 className="text-4xl font-jost font-semibold leading-snug text-yellow-950 mb-4 lg:w-7/12">
                {sanitizeContent(details.aboutUs.title2)}
              </h3>
              <p className="text-lg text-gray-500 leading-8 mb-8">
                {sanitizeContent(details.aboutUs.text1)}
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-6">
                <button
                  onClick={handleModalOpen}
                  className="btn-small btn-double-border border-2 border-black hover:border-4 btn-border-base-color text-black bg-white-500 p-3 rounded-lg flex items-center "
                >
                  <span>Book Appointment</span>
                  <FaArrowRight />
                </button>
                <div className="font-medium text-yellow-950 text-lg flex items-center gap-2">
                  <FaPhoneAlt className="text-orange-950" />
                  <a href="tel:1800222000">1 800 222 000</a>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center gap-8 mt-10">
            <div>
              <h2 className="font-semibold  text-3xl text-yellow-950 m-0">
                {sanitizeContent(details.Statistics.section1header)}
              </h2>
              <p className="text-yellow-950">
                {sanitizeContent(details.Statistics.section1paragraphy)}
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-3xl  text-yellow-950 m-0">
                {sanitizeContent(details.Statistics.section2header)}
              </h2>
              <p className="text-yellow-950">
                {" "}
                {sanitizeContent(details.Statistics.section2paragraphy)}
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-3xl  text-yellow-950 m-0">
                {sanitizeContent(details.Statistics.section3header)}
              </h2>
              <p className="text-yellow-950">
                {sanitizeContent(details.Statistics.section3paragraphy)}
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-3xl  text-yellow-950 m-0">
                {sanitizeContent(details.Statistics.section4header)}
              </h2>
              <p className="text-yellow-950">
                {sanitizeContent(details.Statistics.section4paragraphy)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services and pricing Section */}

      <section
        id="services"
        className="relative font-jost bg-orange-100 px-4 pt-4 overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute left-0 top-[-50px] md:top-[-30px] w-full h-[100px] md:h-[50px] bg-no-repeat bg-left-top bg-cover"
          style={{ backgroundImage: `url(images/demo-barber-home-bg-up.png)` }}
        ></div>

        {/* Floating Image */}
        <div className="absolute left-0 top-[-130px] lg:top-[-90px] hidden md:block">
          <img
            src="https://gfa-tech.com/dimp-template-images/images/demo-barber-home-03.png"
            alt="Floating Image"
            className="transition-transform translate-y-[50px] will-change-transform"
            onLoad={(e) =>
              (e.currentTarget.style.transform = "translateY(-50px)")
            }
          />
        </div>

        <div className="flex flex-col h-full py-4 px-3 lg:px-20">
          {/* Title Section */}
          <div className="text-center mb-6">
            <h2 className="font-jost text-4xl font-bold text-gray-800">
              Barbershop{" "}
              <span className=" relative text-yellow-950">
                services
                <span className="block w-full h-[2px] bg-yellow-950 absolute bottom-[-8px] left-0"></span>
              </span>
            </h2>
          </div>

          {/* Service Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="text-center px-3 lg:px-8 py-10 border-gray-200"
              >
                <div className="relative mb-6 ">
                  {/* <img
                    src={service.serviceImage}
                    className="rounded-md"
                    alt={service.name}
                  /> */}
                </div>
                <span className="text-lg font-semibold text-gray-800 block mb-2">
                  {service.name}
                </span>
                <p className="leading-7 text-gray-600">
                  {service.shortDescription}
                </p>
                <div className="border-t border-b border-gray-200 py-2 my-4">
                  <span className="text-sm font-bold text-gray-800">
                    Starting from {getCurrencySymbol(currency)}{service.price}
                  </span>
                </div>
                <div className="bg-orange-950 hover:bg-yellow-600 text-white py-2">
                  <button
                    onClick={handleModalOpen}
                    className="flex px-4 justify-center text-center items-center gap-2 text-sm"
                  >
                    Request an appointment{" "}
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Message */}
          <div className="text-center">
            <img
              src="https://gfa-tech.com/dimp-template-images/images/demo-barber-icon-05.png"
              className="inline h-[20px]"
              alt="Icon"
            />
            <p className="text-lg text-gray-800 inline-block ml-2">
              We're dedicated to empowering men to look and feel fantastic.
            </p>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="font-sen px-4 bg-very-light-yellow relative py-10"
      >
        <div className="flex flex-col h-full  py-4 px-4 lg:px-20">
          <div className="row mb-6">
            <div className="col-12 text-center">
              <h2 className="font-jost text-4xl font-bold text-gray-800">
                Flexible{" "}
                <span className=" relative text-yellow-950">
                  pricing
                  <span className="block w-full h-[2px] bg-yellow-950 absolute bottom-[-8px] left-0"></span>
                </span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:mb-2">
            {services.map((item, index) => (
              <div
                key={index}
                className={`col ${
                  item.special ? "border border-light-yellow rounded" : ""
                } p-0`}
              >
                <div
                  className={`w-full px-8 py-4 ${
                    item.special ? "bg-light-yellow text-yellow-950" : ""
                  }`}
                >
                  <div className="text-lg flex items-baseline w-full">
                    <span className="font-bold text-yellow-950 flex-grow">
                      {item.name}
                    </span>
                    <div className="text-yellow-950">{getCurrencySymbol(currency)}{item.price}</div>
                  </div>
                  <div className="text-md flex items-baseline w-full">
                    <span className="font-bold text-yellow-950 flex-grow">
                      <p>{item.shortDescription}</p>
                    </span>
                    <div className="rounded bg-yellow-950 hover:bg-yellow-500 text-white py-2 px-2 ">
                      <button
                        className="flex justify-center text-center items-center gap-2 text-sm"
                        onClick={handleModalOpen}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 font-jost text-center py-20 md:py-0 bg-left-top">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="mb-1">
            <div className="text-center mt-9">
              <h2
                className="text-4xl font-jost text-customcolor font-semibold text-primary tracking-tight"
                data-shadow-animation="true"
                data-animation-delay="700"
              >
                Featured{" "}
                <span className="relative">
                  Gallery
                  <span className="absolute w-full h-1 bg-primary bottom-2 left-0"></span>
                </span>
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap mb-10 px-10">
            {/* Gallery items */}
            {[
              details.Gallery.image1,
              details.Gallery.image2,
              details.Gallery.image3,
              details.Gallery.image4,
              details.Gallery.image5,
              details.Gallery.image6,
            ].map((image, idx) => (
              <div key={idx} className="w-full md:w-1/3 p-4">
                <div className="relative overflow-hidden rounded-md bg-gray-800 transition-all duration-300 hover:scale-105">
                  <a href={image} title="Lightbox gallery image title">
                    <img
                      src={image}
                      alt=""
                      className="w-full h-80 object-cover"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="#testimonials"
        className="font-jost bg-very-light-yellow py-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Two-column Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Section with Title and Heading */}
            <div className="lg:w-3/6 mb-8 lg:mb-0 text-left">
              <span className="text-yellow-950 font-semibold text-lg tracking-wider underline decoration-base-color">
                Customer Testimonials
              </span>
              <h2 className="text-3xl font-extrabold text-yellow-950 mt-3 lg:w-7/12 leading-tight">
                {sanitizeContent(details.Blog.date1)}
              </h2>
            </div>

            {/* Right Section with Testimonial Card */}
            <div className="lg:w-3/6 flex justify-center lg:justify-center">
              <div className="bg-white shadow-lg rounded-lg p-7 flex flex-col items-start max-w-md">
                <div className="flex items-center mb-4">
                  <img
                    className="rounded-full w-26 h-20 mr-4"
                    src={testimonial.imgSrc}
                    alt="Reviewer"
                  />
                  <div>
                    <div className="text-lg font-semibold text-yellow-950">
                      {testimonial.name}
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="bg-yellow-400 rounded-full px-2 py-0.5 text-sm font-medium">
                        {testimonial.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  {testimonial.testimonial}
                </p>
              </div>
            </div>
          </div>

          {/* Centered Rating Summary */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center text-2xl font-medium text-yellow-950">
              <div className="flex items-center text-base-color">
                {[...Array(5)].map((_, idx) => (
                  <AiFillStar key={idx} className="w-6 h-6 mr-1" />
                ))}
              </div>
              <span className="ml-3">
                {sanitizeContent(details && details.Blog.header1)}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="barbers" className="py-12 font-jost bg-white">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-wrap items-end mb-12">
            <div className="w-full lg:w-7/12 text-center lg:text-left mb-6 lg:mb-0">
              <div className="inline-block mb-3">
                <span className="text-base text-yellow-700 font-semibold underline underline-offset-[10px] decoration-yellow-700">
                  Experienced Barbers
                </span>
              </div>
              <h2 className="text-4xl text-yellow-700 font-bold leading-tight mb-3">
                {sanitizeContent(details.Blog.content2)}
              </h2>
            </div>
            <div className="w-full lg:w-5/12 text-center lg:text-left">
              <p className="text-gray-700">
                {sanitizeContent(details.Blog.header3)}
              </p>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  className="w-full h-64 object-cover"
                  src={details.Team.image1}
                  alt="Jessica Dover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {sanitizeContent(details.Team.header1)}
                  </h3>
                  <p className="text-gray-500">
                    {sanitizeContent(details.Team.summary1)}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  className="w-full h-64 object-cover"
                  src={details.Team.image2}
                  alt="Jeremy Dupont"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {sanitizeContent(details.Team.header2)}
                  </h3>
                  <p className="text-gray-500">
                    {" "}
                    {sanitizeContent(details.Team.summary2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  className="w-full h-64 object-cover"
                  src={details.Team.image3}
                  alt="Johncy Parker"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {sanitizeContent(details.Team.header3)}
                  </h3>
                  <p className="text-gray-500">
                    {" "}
                    {sanitizeContent(details.Team.summary3)}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  className="w-full h-64 object-cover"
                  src={details.Team.image4}
                  alt="Matthew Taylor"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {" "}
                    {sanitizeContent(details.Team.header4)}
                  </h3>
                  <p className="text-gray-500">
                    {sanitizeContent(details.Team.summary4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-orange-100 font-jost py-12">
        <div className="flex flex-col h-full py-4 px-4 lg:px-24 lg:flex-row items-start justify-between space-y-12 lg:space-y-0">
          {/* Left Side (Contact Info) */}
          <div className="lg:w-1/2 w-full">
            <span className="text-orange-950 text-lg  font-bold uppercase tracking-widest">
              {sanitizeContent(details.contactUs.heading1)}
            </span>
            <h2 className="text-4xl text-customcolor  font-semibold text-gray-800 mt-2 mb-10">
              {sanitizeContent(details.contactUs.heading2)}
            </h2>
            {/* First Row: Visit our beauty salon and Book an appointment */}
            <div className="flex flex-col lg:flex-row lg:justify-between mb-5">
              {/* Visit our beauty salon */}
              <div className="lg:w-1/2 w-full lg:mr-4 mb-6 lg:mb-0">
                <h3 className="text-xl  font-semibold text-gray-700">
                  {sanitizeContent(details.contactUs.heading3)}
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600 ">
                  {userDetails && userDetails.address
                    ? userDetails.address
                    : ""}
                </p>
              </div>
              {/* Book an appointment */}
              <div className="lg:w-1/2 w-full">
                <h3 className="text-xl  font-semibold text-gray-700">
                  {sanitizeContent(details.contactUs.heading5)}
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600">
                  <a
                    href={`mailto:${sanitizeContent(
                      details?.contactUs?.heading6
                    )}`}
                    className="underline "
                  >
                    {sanitizeContent(details.contactUs.heading6)}
                  </a>
                  <br />
                  <a
                    href={`mailto:${sanitizeContent(
                      details?.contactUs?.heading7
                    )}`}
                    className="underline "
                  >
                    {sanitizeContent(details.contactUs.heading7)}
                  </a>
                </p>
              </div>
            </div>
            {/* Second Row: Let's talk and Opening hours */}
            <div className="flex flex-col lg:flex-row lg:justify-between mb-5">
              {/* Let's talk */}
              <div className="lg:w-1/2 w-full lg:mr-4 mb-6 lg:mb-0">
                <h3 className="text-xl  font-semibold text-gray-700">
                  {sanitizeContent(details.contactUs.paragraph1)}
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600 ">
                  <a
                    href={`tel:${sanitizeContent(
                      details?.contactUs?.buttonText1
                    )}`}
                  >
                    {sanitizeContent(details.contactUs.buttonText1)}
                  </a>
                  <br />
                  {sanitizeContent(details.footer.title1)}
                </p>
              </div>
              {/* Opening hours */}
              <div className="lg:w-1/2 w-full">
                <h3 className="text-xl  font-semibold text-gray-700">
                  {sanitizeContent(details.footer.paragraph1)}
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600 ">
                  {sanitizeContent(details.footer.title2)}
                  <br />
                  {sanitizeContent(details.footer.title3)}
                </p>
              </div>
            </div>
          </div>
          {/* Right Side (Form) */}
          <div className="lg:w-1/2 w-full relative">
            <div className="w-full max-w-md bg-orange-950 p-8 rounded-lg shadow-lg ml-auto relative">
              {/* Heading */}
              <h2 className="text-3xl  font-bold text-white mb-8">Book Now!</h2>

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
                  onClick={handleModalOpen}
                  className="mt-4 bg-white text-gray-900 py-3 px-8 rounded shadow-md  font-semibold hover:bg-gray-100 transition-colors"
                >
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <WhiteContactForm ecosystemDomain={subdomain} />
      <footer class="px-4 font-jost bg-yellow-950 py-6">
        <div class="flex flex-col h-full py-4 px-4 lg:px-24 text-center sm:text-left">
          <div class="flex flex-col items-center border-t border-white/10 pt-6 lg:flex-row lg:items-center">
            {/* <!-- Navigation Links --> */}
            <div class="w-full lg:w-7/12 mb-4 lg:mb-0">
              <ul class="flex flex-wrap justify-center space-x-4 text-white text-lg">
                <li>
                  <a
                    href="#home"
                    class="font-jak text-[#706F6B] hover:underline"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    class="font-jak text-[#706F6B] hover:underline"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    class="font-jak text-[#706F6B] hover:underline"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#barbers"
                    class="font-jak text-[#706F6B] hover:underline"
                  >
                    barbers
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    class="font-jak text-[#706F6B] hover:underline"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    class="font-jak text-[#706F6B] hover:underline"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- Copyright Text --> */}
            <div class="w-full text-center lg:text-right lg:w-5/12 mt-4 lg:mt-0">
              <p class="text-[#706F6B] text-lg">
                © 2024 Proudly Powered by
                <a
                  href="https://www.dimpified.com/"
                  target="_blank"
                  rel="noreferrer"
                  class="text-white underline hover:text-white"
                >
                  DIMP
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};
export default Template13;
