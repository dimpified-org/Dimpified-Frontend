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
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

import { spa } from "../../../../data/Services";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import axios from "axios";
import sanitizeHtml from "sanitize-html";

const ThirdSpa = ({ details, subdomain, userDetails }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [eServices, setEServices] = useState([]);
  const [showSocials, setShowSocials] = useState(false);
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
        setEServices(allServices);
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

  const testimonials = [
    {
      name: details && details.Blog.author1,
      title: details && details.Blog.header1,
      rating: details && details.Blog.date1,
      quote: details && details.Blog.summary1,
      image: details && details.Blog.image1,
      bgImage: details && details.Blog.content1,
    },
    {
      name: details && details.Blog.author2,
      title: details && details.Blog.header2,
      rating: details && details.Blog.date2,
      quote: details && details.Blog.summary2,
      image: details && details.Blog.image2,
      bgImage: details && details.Blog.content2,
    },
    {
      name: details && details.Blog.author3,
      title: details && details.Blog.header3,
      rating: details && details.Blog.date3,
      quote: details && details.Blog.summary3,
      image: details && details.Blog.image3,
      bgImage: details && details.Blog.content3,
    },
  ];

  const teamMembers = [
    {
      name: details && details.Team.header1,
      role: details && details.Team.summary1,
      image: details && details.Team.image1,
    },
    {
      name: details && details.Team.header2,
      role: details && details.Team.summary2,
      image: details && details.Team.image2,
    },
    {
      name: details && details.Team.header3,
      role: details && details.Team.summary3,
      image: details && details.Team.image3,
    },
  ];

  const statsData = [
    {
      value: parseInt(details && details.Statistics.section1header),
      title: details && details.Statistics.section1header.replace(/^\d+\s/, ""),
    },
    {
      value: parseInt(details && details.Statistics.section2header),
      title: details && details.Statistics.section2header.replace(/^\d+\s/, ""),
    },
    {
      value: parseInt(details && details.Statistics.section3header),
      title: details && details.Statistics.section3header.replace(/^\d+\s/, ""),
    },
    {
      value: parseInt(details && details.Statistics.section4header),
      title: details && details.Statistics.section4header.replace(/^\d+\s/, ""),
    },
  ];

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

  const currentTestimonial = testimonials[currentIndex];
  return (
    <div className="bg-gray-100">
      <header className="fixed top-0 left-0 w-full z-50">
        {/* Logo & Icons Line - Only visible before scroll */}
        {!isScrolled && (
          <div className="bg-[#f8f6f2] py-3 md:px-24 px-4 flex justify-between items-center border-b border-gray-300">
            {/* Logo */}
            <a href="#" className="flex items-center text-gray-800">
              <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
              <span className="text-xs leading-tight">
                {userDetails?.ecosystemName} <br />
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
              {sanitizeContent(details && details.hero.title1)}
            </p>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4 uppercase">
              {sanitizeContent(details && details.hero.title2)}
            </h1>
            <button
              onClick={handleModalOpen}
              className="bg-[#b19153] text-white px-6 md:px-8 py-3 md:py-4 rounded-md shadow-md hover:bg-black transition mt-4"
            >
              {sanitizeContent(details && details.hero.buttonText1)}
            </button>
          </div>
          {isModalOpen && (
            <BookingModal
              isOpen={isModalOpen}
              handleClose={handleModalClose}
              information={eServices}
              subdomain={subdomain}
              serviceCurrency={currency}
            />
          )}

          {/* Right Content (Image & Elements) */}
          <div className="relative flex justify-center items-center">
            {/* Circular Background */}
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] overflow-hidden rounded-full border-4 border-[#f3ede3] shadow-lg">
              <img
                src={details && details.hero.backgroundImage1}
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
              src={details && details.Events.sectionImage1}
              alt={details && details.Events.section1header}
              className="w-full sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-white bg-opacity-20 border border-white p-6 sm:p-4 flex flex-col justify-center text-center">
              <i>
                <div className="text-[#b19153] text-xl sm:text-2xl font-semibold tracking-wide mb-2">
                  {sanitizeContent(
                    details && details.Events.section1paragraphy
                  )}
                </div>
              </i>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {sanitizeContent(details && details.Events.section1header)}
              </h3>
              <div
                onClick={handleModalOpen}
                className="bg-[#b19153] text-white py-2 px-4 rounded-md font-semibold text-center cursor-pointer hover:bg-black transition w-fit mx-auto"
              >
                {sanitizeContent(details && details.Events.buttonText1)}
              </div>
            </div>
          </div>

          {/* Thai Massage Creams Card */}
          <div className="relative border border-gray-300 rounded-lg overflow-hidden">
            <img
              src={details && details.Events.sectionImage2}
              alt={details && details.Events.section2header}
              className="w-full sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-white bg-opacity-20 border border-white p-6 sm:p-4 flex flex-col justify-center text-center">
              <i>
                <div className="text-[#b19153] text-xl sm:text-2xl font-semibold tracking-wide mb-2">
                  {sanitizeContent(
                    details && details.Events.section2paragraphy
                  )}
                </div>
              </i>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {sanitizeContent(details && details.Events.section2header)}
              </h3>
              <div
                onClick={handleModalOpen}
                className="bg-[#b19153] text-white py-2 px-4 rounded-md font-semibold text-center cursor-pointer hover:bg-black transition w-fit mx-auto"
              >
                {sanitizeContent(details && details.Events.buttonText2)}
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
                src={details && details.aboutUs.image1}
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
            <h2 className="text-3xl font-bold">
              {sanitizeContent(details && details.aboutUs.title1)}
            </h2>
            <p className="text-[#b19153] font-semibold text-xl">
              {sanitizeContent(details && details.aboutUs.title2)}
            </p>
            <p className="text-gray-600">
              {sanitizeContent(details && details.aboutUs.text1)}
            </p>
            <button
              onClick={handleModalOpen}
              className="bg-[#b19153] text-white px-8 py-4 rounded-md shadow-md hover:bg-black transition mt-6"
            >
              {sanitizeContent(details && details.aboutUs.buttonText1)}
            </button>
          </div>

          {/* Benefits Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">
              {sanitizeContent(details && details.Patrners.sectionImage1)}
            </h3>
            <ul className="space-y-3">
              {[
                details && details.Patrners.section1header,
                details && details.Patrners.sectionImage2,
                details && details.Patrners.section2header,
                details && details.Patrners.section3header,
                details && details.Patrners.sectionImage3,
              ].map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-[#b19153] text-white rounded-full">
                    ✓
                  </span>
                  {sanitizeContent(benefit)}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <img
                src={details && details.Patrners.buttonText2}
                alt={details && details.Patrners.section4header}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">
                  {" "}
                  {sanitizeContent(details && details.Patrners.section4header)}
                </p>
                {/* <img
                  src="https://gfa-tech.com/dimp-template-images/spa/about-sign-2.png"
                  alt="Signature"
                  className="w-24"
                /> */}
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
            <h4 className="text-xl font-semibold">
              {sanitizeContent(details && details.Vision.visiomheader)}
            </h4>
          </div>
          <div>
            <p className="font-medium">
              {sanitizeContent(details && details.Vision.missionheader)}
            </p>
            <p>{sanitizeContent(details && details.Vision.impactsummary)}</p>
          </div>
          <div>
            <p className="font-medium">
              {sanitizeContent(details && details.Vision.impactheader)}
            </p>
            <p>{sanitizeContent(details && details.Vision.visionsummary)}</p>
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
            <img
              src="https://gfa-tech.com/dimp-template-images/spa/sec-title.png"
              alt="Spa services"
              className="mx-auto mb-2 w-16 h-16"
            />
            <h6 className="text-2xl text-[#b19153] italic">Spa Services</h6>
            <h3 className="text-5xl font-bold text-black">WHAT WE OFFER</h3>
          </div>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {eServices.map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden text-center p-10"
              >
                {/* Image Section */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="w-full h-full rounded-full border-4 border-[#C8A97E] overflow-hidden">
                    {/* <img
                      src={service.serviceImage}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    /> */}
                  </div>
                  {/* Service Icon */}
                  {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#b19153] w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                  <img src={service.icon} alt="icon" className="w-10 h-10" />
                </div> */}
                </div>

                {/* Text Content */}
                <h3 className="text-2xl font-semibold text-[#2D2A2A]">
                  {service.name}
                </h3>
                <div className="w-12 h-1 bg-[#C8A97E] mx-auto my-3"></div>
                <p className="text-gray-600">{service.shortDescription}</p>

                <p className="text-gray-900 text-lg py-3"> {getCurrencySymbol(currency)}{service.price}</p>

                {/* Button */}
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
                src={details && details.Gallery.image1}
                alt="Mirror Reflection"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Middle-Left Column (Two Stacked Images) */}
            <div className="flex flex-col gap-6">
              <img
                src={details && details.Gallery.image2}
                alt="Massage Image 1"
                className="w-full h-auto object-cover rounded-lg"
              />
              <img
                src={details && details.Gallery.image3}
                alt="Massage Image 2"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Middle-Right Column (Single Large Image) */}
            <div>
              <img
                src={details && details.Gallery.image4}
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
                  {sanitizeContent(details && details.Gallery.summary1)}
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
              {sanitizeContent(details && details.Blog.header4)}
            </h6>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 uppercase">
              {sanitizeContent(details && details.Blog.summary4)}
            </h3>
            <p className="text-sm md:text-base mb-6">
              {sanitizeContent(details && details.Blog.content4)}
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
            <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-6">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F8F5F0] py-16 flex justify-center px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl w-full">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative w-full max-w-[350px] mx-auto">
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
          ))}
        </div>
      </section>
      <section
        className="relative bg-cover bg-center pt-32 pb-16 text-white"
        style={{
          backgroundImage: `url(${details && details.LargeCta.image2})`,
        }}
      >
        <div className="flex flex-col h-full  py-4  lg:px-24 px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 4, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <img
                  src="https://gfa-tech.com/dimp-template-images/spa/sec-title.png"
                  alt="Decorative"
                  className="absolute -top-10 left-0 w-16 h-16 mb-4"
                />
                <h6 className="text-[#b19153] italic text-2xl ">
                  {sanitizeContent(details && details.LargeCta.header1)}
                </h6>
                <h2 className="text-5xl font-bold mt-4 leading-tight ">
                  {sanitizeContent(details && details.LargeCta.header2)}
                </h2>
              </div>
              <p className="mt-6 text-gray-400 text-lg">
                {sanitizeContent(details && details.LargeCta.header3)}
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
                details && details.LargeCta.summary1,
                details && details.LargeCta.summary2,
                details && details.LargeCta.buttonText1,
                details && details.LargeCta.buttonText2,
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
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center relative">
            {statsData.map((item, index) => (
              <li
                key={index}
                className="flex flex-col items-center space-y-4 relative"
              >
               
                <h3 className="text-4xl font-bold text-gray-900">
                  {item.value}
                </h3>
                <p className="text-gray-600 text-lg">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="contact" className="py-16 bg-white">
        <div className="flex flex-col px-4 lg:px-24  ">
          <div className="mb-12">
            
          </div>
          <WhiteContactForm ecosystemDomain={subdomain} />
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
              <img
                src={details && details.footer.logo}
                alt="Teju Beauty & Spa"
                className="w-15 mb-4"
              />
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
                  <a  href={`tel:${userDetails && userDetails.phoneNumber}`} className="hover:text-white">
                    {userDetails && userDetails.phoneNumber}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${userDetails && userDetails.email}`}
                    className="hover:text-white"
                  >
                    {userDetails && userDetails.email}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    className="hover:text-white"
                  >
                    {userDetails && userDetails.address},{" "}
                    {userDetails && userDetails.country}
                  </a>
                </li>
              </ul>
            </div>

            {/* Timing & Social Links */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Timing</h2>
              <p>{sanitizeContent(details && details.footer.paragraph5)}</p>
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
