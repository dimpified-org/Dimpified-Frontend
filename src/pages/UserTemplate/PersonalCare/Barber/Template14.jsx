import React, { useRef, Fragment, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

import {
  FaCalendarCheck,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa6";
import { BlackContactForm } from "../../../../features/ContactForm/ContactForm";

const Template14 = ({ details, subdomain, userDetails }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Works", href: "#works" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const testimonials = [
    {
      name: details.Reviews.header1,
      role: details.Reviews.title1,
      image: details.Reviews.image1,
      text: details.Reviews.summary1,
    },
    {
      name: details.Reviews.header2,
      role: details.Reviews.title2,
      image: details.Reviews.image2,
      text: details.Reviews.summary2,
    },
    {
      name: details.Reviews.header3,
      role: details.Reviews.title3,
      image: details.Reviews.image3,
      text: details.Reviews.summary3,
    },
    {
      name: details.Blog.header3,
      role: details.Blog.summary3,
      image: details.Blog.image3,
      text: details.Blog.content3,
    },
  ];
  const images = [
    details.Gallery.image1,
    details.Gallery.image2,
    details.Gallery.image3,
    details.Gallery.image4,
    details.Gallery.image5,
    details.Gallery.image6,
  ];
  return (
    <Fragment>
      <div className="font-sen">
        <div className="bg-black text-white">
          {/* Navbar */}
          <nav className="max-w-7xl mx-auto px-6 lg:px-16 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
              <span className="text-xl font-bold">
                {sanitizeContent(details.navbar.link1)}
              </span>
            </div>

            {/* Desktop Links */}
            <ul className="hidden lg:flex space-x-8 text-sm uppercase">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-gray-400 cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Book Appointment Button */}
            <div className="hidden lg:block">
              <button
                onClick={handleModalOpen}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-400 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden absolute top-16 left-0 w-full bg-black text-white px-6 py-4 space-y-4 text-sm uppercase z-50">
                {links.map((link) => (
                  <ul>
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="hover:text-gray-400 cursor-pointer block"
                      >
                        {link.name}
                      </a>
                    </li>
                  </ul>
                ))}
                <div>
                  <button
                    onClick={handleModalOpen}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-sm hover:bg-orange-600 transition duration-300 w-full"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            )}
          </nav>

          {/* Hero Section */}
          <section
            id="home"
            className="h-[500px] lg:h-[600px] bg-cover bg-center flex items-center justify-center relative"
            style={{
              backgroundImage: `url(${
                details && details.hero.backgroundImage1
              })`,
            }}
          >
            <div className="text-center text-white px-6">
              <p className="uppercase text-sm tracking-wide mb-4">
                {sanitizeContent(details.hero.title1)}
              </p>
              <h1 className="text-5xl lg:text-6xl uppercase font-bold mb-6">
                {userDetails && userDetails.ecosystemName
                  ? userDetails.ecosystemName
                  : ""}{" "}
                {""}
                {sanitizeContent(details.hero.title2)}
              </h1>
              <p className="text-sm mb-8">
                {" "}
                {userDetails && userDetails.address ? userDetails.address : ""}
              </p>
              {isModalOpen && (
                <BookingModal
                  isOpen={isModalOpen}
                  handleClose={handleModalClose}
                  information={services}
                  subdomain={subdomain}
                  serviceCurrency={currency}
                />
              )}
              <button
                onClick={handleModalOpen}
                className=" bg-yellow-500 text-white text-base py-4 px-5 shadow-md rounded-md  hover:bg-yellow-700 transition duration-300 mr-6"
              >
                Book Appointment
              </button>
            </div>
            <div className="absolute bottom-10 text-white text-3xl"></div>
          </section>
        </div>

        {/* About Section */}
        <section id="about" className="bg-[#f8f5f1] py-16">
          <div className=" mx-auto px-4 lg:px-24">
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-16">
              {/* Images */}

              {/* Left Side - Images */}
              <div className="relative w-full lg:w-1/2 mb-12 mr-5 lg:mb-4">
                <div className="w-3/4 mx-auto overflow-hidden rounded-lg relative">
                  <img
                    src={details.aboutUs.image1}
                    alt="Primary Image"
                    className="w-full object-cover"
                  />
                </div>
                <div className="absolute right-[-15px] md:right-[15px] bottom-[-50px] w-1/2 md:w-2/5 rounded-lg overflow-hidden">
                  <img
                    src={details.aboutUs.image2}
                    alt="Secondary Image"
                    className="w-full object-cover"
                  />
                </div>
              </div>
              {/* Text Content */}
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <p className="uppercase text-sm font-bold text-gray-600 mb-2">
                  {sanitizeContent(details.aboutUs.title1)}
                </p>
                <h2 className="text-4xl font-bold text-black mb-6">
                  {sanitizeContent(details.aboutUs.title2)}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {sanitizeContent(details.aboutUs.text1)}
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {sanitizeContent(details.aboutUs.text2)}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-800">
                    {sanitizeContent(details.Statistics.section1header)}
                  </li>
                  <li className="flex items-center text-gray-800">
                    {sanitizeContent(details.Statistics.section2header)}
                  </li>
                  <li className="flex items-center text-gray-800">
                    {sanitizeContent(details.Statistics.section3header)}
                  </li>
                </ul>
                <div className="inline-block mt-6">
                  <a
                    onClick={handleModalOpen}
                    className="btn bg-yellow-500 text-white text-base py-4 px-5 shadow-md rounded-md  hover:bg-yellow-700 transition duration-300 mr-6"
                  >
                    Book Appointment
                  </a>
                  <a
                    href="#services"
                    className="btn text-yellow-500 shadow-md border rounded-md py-4 px-5 text-lg hover:underline xs:mt-4 xs:mb-4"
                  >
                    Our Services
                  </a>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="flex flex-wrap justify-between mt-16 px-4 lg:px-24">
              {/* Service 1 */}
              <div className="flex flex-col  w-full md:w-1/3 mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {sanitizeContent(details.Statistics.section1span)}
                </h3>
                <p className="text-gray-600">
                  {sanitizeContent(details.Statistics.section1paragraphy)}
                </p>
              </div>

              {/* Service 2 */}
              <div className="flex flex-col w-full md:w-1/3 mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {sanitizeContent(details.Statistics.section2span)}
                </h3>
                <p className="text-gray-600">
                  {sanitizeContent(details.Statistics.section2paragraphy)}
                </p>
              </div>

              {/* Service 3 */}
              <div className="flex flex-col  w-full md:w-1/3 mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {sanitizeContent(details.Statistics.section3span)}
                </h3>
                <p className="text-gray-600">
                  {sanitizeContent(details.Statistics.section3paragraphy)}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-wrap items-center">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 mb-8 lg:pe-12">
              <img
                src={details.Blog.image1}
                alt="Barber at work"
                className="rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-6">
              <p className="uppercase text-sm tracking-widest text-gray-400">
                {sanitizeContent(details.Blog.header1)}
              </p>
              <h2 className="text-4xl font-bold leading-snug">
                {sanitizeContent(details.Blog.summary1)}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {sanitizeContent(details.Blog.content1)}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {sanitizeContent(details.Blog.content2)}
              </p>
              <div>
                <p className="font-medium">
                  {sanitizeContent(details.Blog.date1)}
                </p>
                <p className="font-bold text-lg">
                  {sanitizeContent(details.Blog.author1)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-cream text-black py-16">
          <div className="  px-6 lg:px-32 ">
            {/* Section Title */}
            <p className="text-sm uppercase text-gray-600 tracking-wider mb-2">
              What We're Offering
            </p>
            <h2 className="text-4xl font-bold mb-2 ">Barber Services</h2>
            <p className="text-sm  text-gray-600 tracking-wider  mb-12">
              Select any service style to start the booking process
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              {services.map((service, index) => (
                <div key={index} className="text-left relative mb-8 md:mb-0">
                  {/* Background Image */}
                  <div className="relative rounded-md  overflow-hidden ">
                    {/* <img
                      src={service.serviceImage}
                      onClick={handleModalOpen}
                      alt="Bridal Makeup"
                      className="w-full h-full object-cover"
                    /> */}

                    {/* Overlay Content */}
                    <figcaption className="absolute inset-0 flex flex-col items-start justify-center p-12 sm:p-4 z-10">
                      {/* Offer Badge */}
                      <span className="px-4 py-2 text-xs uppercase text-gray-800 font-bold bg-white rounded-md">
                        Flat 50% off
                      </span>

                      {/* Title & Description */}
                      <div className="flex w-full items-center mt-auto">
                        <div className="pr-4">
                          <h5 className="text-lg font-semibold text-white">
                            {" "}
                            {service.name}
                          </h5>
                          <p className="text-sm text-white opacity-70">
                            {service.shortDescription}
                          </p>
                        </div>

                        {/* Circular Icon */}
                        <button
                          href=""
                          className="w-16 h-16 px-4 sm:w-12 sm:h-12 bg-transparent border border-white/50 rounded-full flex items-center justify-center "
                        >
                          <FaCalendarCheck className="text-white hover:text-yellow-500  text-2xl" />
                        </button>
                      </div>
                    </figcaption>

                    {/* Background Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-90 z-0"></div>

                    {/* Clickable Link */}
                    <a
                      onClick={handleModalOpen}
                      className="absolute inset-0 z-20"
                      aria-label="Book Appointment"
                    ></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div
          className="bg-cover bg-yellow-500 bg-center py-10 lg:py-32"
          style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="max-w-4xl mx-auto"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col items-center text-center text-white px-4"
              >
                {" "}
                <h2 className="text-white text-lg font-bold">★★★★★</h2>
                <div className="text-lg italic mb-4">{testimonial.text}</div>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />
                  <div>
                    <p className="font-bold text-lg">{testimonial.name}</p>
                    <p className="text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <section
          id="pricing"
          className="bg-cream text-black py-16 px-4 lg:px-32"
        >
          <div className="">
            {/* Section Title */}
            <p className="text-sm uppercase text-gray-600  tracking-wider mb-2">
              Pricing Plan
            </p>
            <h2 className="text-4xl font-bold  mb-12">Affordable Pricing</h2>

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
                      item.special ? "bg-light-yellow text-yellow-500" : ""
                    }`}
                  >
                    <div className="text-lg flex items-baseline w-full">
                      <span className="font-bold text-yellow-500 flex-grow">
                        {item.name}
                      </span>
                      <div className="text-yellow-950 font-body font-bold">
                        {getCurrencySymbol(currency)}{item.price}
                      </div>
                    </div>
                    <div className="text-md flex items-baseline w-full">
                      <span className=" text-gray-500 flex-grow">
                        <p>{item.shortDescription}</p>
                      </span>
                      <div className=" bg-yellow-500 hover:bg-yellow-700 text-white rounded-md ">
                        <button
                          className="rounded-lg flex justify-center w-[120px] text-center items-center gap-2 text-sm  py-1 px-2"
                          onClick={handleModalOpen}
                        >
                          {" "}
                          Book Now
                          <span className="w-12 h-12 sm:w-12 sm:h-12 bg-transparent  flex items-center justify-center ml-auto">
                            <FaCalendarCheck className=" text-2xl" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="works"
          className="bg-yellow-500 font-Urbanist py-10 px-4 lg:px-32 lg:py-32  overflow-hidden"
        >
          <div className=" mb-8">
            <h2 className="text-sm uppercase tracking-wide text-white">
              {sanitizeContent(details.Gallery.summary2)}
            </h2>
            <h1 className="text-4xl font-bold text-white">
              {sanitizeContent(details.Gallery.summary1)}
            </h1>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            // navigation
            // pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="rounded-xl"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative bg-yellow-800 rounded-lg overflow-hidden h-80">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity">
                    <FaCalendarCheck />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <div id="team" className="flex flex-col p-4 lg:px-32  lg:py-24 ">
          {/* Section Header */}
          <div className="flex justify-center mb-3">
            <div className="text-center">
              <span className="font-semibold tracking-[1px] text-base uppercase text-orange-500 mb-1 block">
                {sanitizeContent(details.LargeCta.header1)}
              </span>
              <h2 className="font-semibold  text-gray-800 text-3xl">
                {sanitizeContent(details.LargeCta.image2)}
              </h2>
            </div>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="relative rounded-md overflow-hidden mb-8">
                <img
                  src={details.Team.image1}
                  className="h-full w-full"
                  style={{ height: "340px" }}
                  alt={sanitizeContent(details.Team.summary1)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 flex flex-col justify-center items-center p-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="space-x-4 text-white text-lg">
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a
                      href="http://www.dribbble.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-dribbble"></i>
                    </a>
                    <a
                      href="https://www.twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">
                {sanitizeContent(details.Team.summary1)}
              </h3>
              <p>{sanitizeContent(details.Team.header1)}</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="relative rounded-md overflow-hidden mb-8">
                <img
                  src={details.Team.image2}
                  className="w-full h-full"
                  style={{ height: "340px" }}
                  alt={sanitizeContent(details.Team.summary2)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 flex flex-col justify-center items-center p-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="space-x-4 text-white text-lg">
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>

                    <a
                      href="http://www.dribbble.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-dribbble"></i>
                    </a>
                    <a
                      href="https://www.twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">
                {sanitizeContent(details.Team.summary2)}
              </h3>
              <p>{sanitizeContent(details.Team.header2)}</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="relative rounded-md overflow-hidden mb-8">
                <img
                  src={details.Team.image3}
                  className="w-full h-full"
                  style={{ height: "340px" }}
                  alt={sanitizeContent(details.Team.summary3)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 flex flex-col justify-center items-center p-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="space-x-4 text-white text-lg">
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a
                      href="http://www.dribbble.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-dribbble"></i>
                    </a>
                    <a
                      href="https://www.twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">
                {sanitizeContent(details.Team.summary3)}
              </h3>
              <p>{sanitizeContent(details.Team.header3)}</p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center">
              <div className="relative rounded-md overflow-hidden mb-8">
                <img
                  src={details.Team.image4}
                  className="w-full h-full"
                  style={{ height: "340px" }}
                  alt={sanitizeContent(details.Team.summary4)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 flex flex-col justify-center items-center p-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="space-x-4 text-white text-lg">
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a
                      href="http://www.dribbble.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-dribbble"></i>
                    </a>
                    <a
                      href="https://www.twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">
                {sanitizeContent(details.Team.summary4)}
              </h3>
              <p>{sanitizeContent(details.Team.header4)}</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-500 text-white">
          {/* Top Section */}
          <div className="flex flex-wrap justify-between items-center p-8 lg:p-16">
            {/* Left Content */}
            <div className="container mx-auto gap-4 text-center">
              <h2 className="text-white text-lg font-bold">★★★★★</h2>
              <h1 className="text-4xl font-bold">
                {sanitizeContent(details.contactUs.heading1)}
              </h1>

              <div className="inline-block mt-6">
                <a
                  onClick={handleModalOpen}
                  className="btn bg-black text-white text-base py-4 px-5 shadow-md  hover:bg-yellow-700 transition duration-300 mr-6"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </div>

          <BlackContactForm ecosystemDomain={subdomain} />
          {/* Footer Section */}
          <div className="bg-black text-white p-4 lg:px-32  lg:py-24">
            <div className="flex flex-wrap justify-between gap-8">
              {/* Contact */}
              <div>
                <h2 className="text-lg font-bold mb-4">
                  {sanitizeContent(details.contactUs.heading2)}
                </h2>
                <p>
                  {" "}
                  {userDetails && userDetails.address
                    ? userDetails.address
                    : ""}
                </p>

                <p className="font-bold mt-4">
                  {sanitizeContent(details.contactUs.heading5)}
                </p>
                <p>{sanitizeContent(details.contactUs.heading6)}</p>
              </div>

              {/* Work Time */}
              <div>
                <h2 className="text-lg font-bold mb-4">
                  {sanitizeContent(details.footer.header)}
                </h2>
                <p>{sanitizeContent(details.footer.paragraph1)}</p>
                <p>{sanitizeContent(details.footer.paragraph2)}</p>
                <p>{sanitizeContent(details.footer.paragraph3)}</p>
                <p>{sanitizeContent(details.footer.paragraph4)}</p>
                <p>{sanitizeContent(details.footer.paragraph5)}</p>
                <p>{sanitizeContent(details.footer.paragraph6)}</p>
              </div>

              {/* Subscribe */}
              <div>
                <h2 className="text-lg font-bold mb-4">Social Media</h2>

                {userDetails &&
                  userDetails.socialMedia &&
                  userDetails.socialMedia.length > 0 && (
                    <div className="last-paragraph-no-margin xs:mb-6">
                      <span className="font-primary text-lg font-semibold text-dark-gray">
                        Follow on Social Media
                      </span>
                      <div className="h-px w-4/5 sm:w-full bg-dark-gray mt-2 mb-2"></div>
                      <div className="w-full">
                        <span className="font-primary block">
                          <span className="font-primary font-semibold text-dark-gray">
                            Instagram:
                          </span>{" "}
                          <a
                            href="https://instagram.com/"
                            className="hover:text-medium-gray text-yellow-600"
                          >
                            Instagram Handle
                          </a>
                        </span>
                        <span className="font-primary block">
                          <span className="font-primary font-semibold text-dark-gray">
                            Facebook:
                          </span>{" "}
                          <a
                            href="https://facebook.com/"
                            className="hover:text-medium-gray text-yellow-600"
                          >
                            Facebook Handle
                          </a>
                        </span>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Template14;
