import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaQuoteLeft,
  FaArrowLeft,
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaCut,
} from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";

import { HairSalon } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { GiHairStrands } from "react-icons/gi";

const services = [
  {
    title: "Hair Style Mix",
    subtitle: "Beauty Salon",
    image: "https://gfa-tech.com/dimp-template-images/hairstylist/hair7.11.jpg",
  },
  {
    title: "Hair Style Mix",
    subtitle: "Beauty Salon",
    image: "https://gfa-tech.com/dimp-template-images/hairstylist/hair7.12.jpg",
  },
  {
    title: "Women Hair Color",
    subtitle: "Beauty Salon",
    image: "https://gfa-tech.com/dimp-template-images/hairstylist/hair7.13.jpg",
  },
];
const services2 = [
  {
    title: "Hair Colors",
    image: "https://gfa-tech.com/dimp-template-images/hairstylist/hair7.7.jpg",
    bgLabel: "Color",
    description: "Get a vibrant, personalized color treatment just for you.",
  },
  {
    title: "Hair Washing",
    image: "https://gfa-tech.com/dimp-template-images/hairstylist/hair7.8.jpg",
    bgLabel: "Wash",
    description: "Relax and refresh with a deep, cleansing hair wash.",
  },
  {
    title: "Hair Cutting",
    image: "https://gfa-tech.com/dimp-template-images/hairstylist/hair7.9.jpg",
    bgLabel: "Cut",
    description: "Professional haircuts tailored to your unique style.",
  },
  {
    title: "Hair Massage",
    image: "https://gfa-tech.com/dimp-template-images/hairstylist/hair7.10.jpg",
    bgLabel: "Style",
    description: "Experience soothing scalp massage for total relaxation.",
  },
];
const testimonials = [
  {
    quote:
      "This salon truly transformed my hair. \n\nFrom the calming ambiance to the professional stylists, \n\nevery visit is an absolute treat. Highly recommended!",
    name: "Isabella Thompson",
    role: "Client, Beauty Enthusiast",
  },
  {
    quote:
      "My facial experience was so soothing I nearly fell asleep. \n\nMy skin feels soft, glowy, and refreshed. \n\nI can’t wait to book my next appointment!",
    name: "Liam Edwards",
    role: "Skin Care Blogger",
  },
  {
    quote:
      "They understood exactly what I wanted with my haircut. \n\nThe stylist was patient, and the result exceeded my expectations. \n\n10/10 service!",
    name: "Sophia Martin",
    role: "Marketing Executive",
  },
  {
    quote:
      "The aroma, the energy, the comfort—everything \n\nabout this spa feels luxurious. \n\nIt's a perfect escape from daily stress.",
    name: "Daniel Brooks",
    role: "Fitness Coach",
  },
];

const EightStylist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = ["Home", "About", "Services", "Gallery", "Contact"];
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };
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
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          scrolled ? "bg-[#D6B981]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a
              href="#home"
              className="text-white text-2xl flex items-center  gap-2"
            >
              <GiHairStrands className="text-white" />
              LuxHair
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 text-lg items-center">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white hover:text-[#d5b46c] font-medium"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Mobile Icon */}
          <div
            className="md:hidden text-2xl text-white cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-transparent w-full px-4 pb-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block text-white hover:text-[#d5b46c] font-medium"
              >
                {link}
              </a>
            ))}
            <div className="flex space-x-6 mt-2 text-white">
              <i className="fas fa-shopping-cart cursor-pointer"></i>
              <i className="fas fa-search cursor-pointer"></i>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-[60vh] md:min-h-[100vh]"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/hairstylist/hair7.2.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 w-full text-center px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-white text-xl font-bold md:text-xl mb-4">
              Welcome to LuxHair
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
              Quality Hair <br /> Salon Center
            </h1>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button
                onClick={handleModalOpen}
                className="bg-[#D6B981] text-white font-semibold px-8 py-3 rounded hover:bg-white hover:text-black transition"
              >
                Book an Appointmnent
              </button>
              <a
                href="#services"
                className="border border-white text-white font-semibold px-8 py-3 rounded hover:bg-white hover:text-black transition"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
        )}
      </section>
      <section id="about" className="w-full bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-8 mb-14">
            {/* Left */}
            <div>
              <h4 className="text-[#D6B981] text-xl font-semibold mb-2">
                Who We Are
              </h4>
              <h2 className="text-4xl md:text-5xl text-black leading-tight">
                We’re Best Quality Hair <br /> Treatment Center
              </h2>
            </div>

            {/* Right */}
            <div className="max-w-xl">
              <p className="text-gray-600 leading-relaxed mb-4">
                Experience the finest in hair care at our premium salon. Our
                expert stylists combine modern techniques with personalized
                attention to deliver exceptional haircuts, treatments, and
                styles tailored just for you.
              </p>
              <a
                href="#read-more"
                className="text-[#D6B981] font-semibold border-b border-[#D6B981] hover:opacity-80"
              >
                READ MORE →
              </a>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative group">
              <img
                src="https://gfa-tech.com/dimp-template-images/hairstylist/hair7.3.jpg"
                alt="Hair Cutting"
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition rounded"></div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white">
                <h3 className="text-lg font-semibold">Hair Cutting</h3>
                <p className="text-sm">Beauty Hair & Spa Salon</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative group">
              <img
                src="https://gfa-tech.com/dimp-template-images/hairstylist/hair7.4.jpg"
                alt="Hair Cutting"
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition rounded"></div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white">
                <h3 className="text-lg font-semibold">Hair Styling</h3>
                <p className="text-sm">Beauty Hair & Spa Salon</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative group">
              <img
                src="https://gfa-tech.com/dimp-template-images/hairstylist/hair7.5.jpg"
                alt="Hair Cutting"
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition rounded"></div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white">
                <h3 className="text-lg font-semibold">Hair Curling</h3>
                <p className="text-sm">Beauty Hair & Spa Salon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white text-[#1d1d1d] font-sans mt-9">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Image */}
          <div className="w-full h-full">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair7.6.jpg"
              alt="Hair Wash"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="relative flex items-center px-6 py-16 lg:px-16 bg-[#f8f8f8]">
            <div className="relative z-10 w-full max-w-xl">
              <p className="text-[#c7ae85] font-medium text-xl mb-2">
                Hair Salon
              </p>
              <h2 className="text-4xl font-semibold mb-4">Working Hours</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Visit us during our working hours and enjoy top-notch salon
                services. Our team is always ready to give you a refreshing
                experience with professional care.
              </p>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Mon to Friday</span>
                  <span className="text-gray-800 font-medium">
                    7:30 am — 1:00 am
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Saturday</span>
                  <span className="text-gray-800 font-medium">
                    7:30 am — 1:00 am
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Wednesday</span>
                  <span className="text-gray-800 font-medium">
                    7:30 am — 1:00 am
                  </span>
                </div>
              </div>

              <button
                onClick={handleModalOpen}
                className="mt-8 bg-[#D6B981] text-white font-medium px-6 py-3 border border-black rounded hover:bg-white hover:text-black transition"
              >
                BOOK NOW →
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="relative py-20 px-4 md:px-16 bg-white">
        {/* Decorative BG text */}
        <h1 className="absolute text-[80px] md:text-[200px] font-bold opacity-5 left-1/2 top-10 transform -translate-x-1/2 select-none pointer-events-none">
          Services
        </h1>

        {/* Section Heading */}
        <div className="text-center mb-12 z-10 relative">
          <p className="text-[#D6B981] font-semibold text-xl mb-2">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl text-gray-900">
            Quality Hair Treatments
          </h2>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 z-10 relative">
          {HairSalon.map((service, index) => (
            <div
              key={index}
              className="relative p-6 text-center border rounded shadow bg-white"
            >
              {/* BG Text */}
              {/* <p className="absolute text-[80px] md:text-[100px] font-bold opacity-5 left-1/2 top-12 transform -translate-x-1/2 select-none pointer-events-none">
                {service.bgLabel}
              </p> */}
              {/* Circular Image */}
              <div className="relative w-28 h-28 mx-auto mb-4">
                {/* <img
                  src={service.serviceImage}
                  alt={service.name}
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow"
                /> */}
                <div className="absolute -top-2 -right-2 bg-white hover:bg-[#D6B981] transition rounded-full shadow-md p-2">
                  <FaCut className="text-[#D6B981]  hover:text-white transition " />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
              <p className="price font-semibold text-gray-800">
                {getFormattedPrice(service.price, countryCode)}
              </p>{" "}
              <button
                onClick={handleModalOpen}
                className="inline-block uppercase mt-4 text-[#D6B981] hover:text-gray-700 font-medium"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* Scroll Button */}
        <div className="fixed bottom-5 right-5 z-50">
          <button className="bg-[#D6B981] text-white w-10 h-10 flex items-center justify-center rounded">
            ▲
          </button>
        </div>
      </section>

      <section className="bg-[#f8f8f8] relative overflow-hidden py-20 px-4 md:px-16">
        <section id="gallery" className="relative px-4 md:px-32 ">
          <h1 className="absolute text-[80px] md:text-[200px] font-bold opacity-5 left-1/2 top-10 transform -translate-x-1/2 select-none pointer-events-none">
            Gallery
          </h1>

          {/* Section Heading */}
          <div className="text-center mb-12 z-10 relative">
            <p className="text-[#D6B981] font-semibold text-xl mb-2">
              Our Portfolio
            </p>
            <h2 className="text-4xl md:text-5xl text-gray-900">
              Quality Hair Treatments
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-08.jpg"
              alt="Hair coloring"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop"
              alt="Braiding"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop"
              alt="Hair cutting"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-12.jpg"
              alt="Makeup"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-13.jpg"
              alt="Natural hair"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-14.jpg"
              alt="Styling"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </section>
      </section>
      <section className="bg-white w-full mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          {/* Left: Testimonial Text */}
          <div className="flex flex-col justify-between p-10 bg-[#f8f8f8] min-h-[600px] relative">
            <div className="flex flex-col justify-center items-center text-center mt-6">
              <h2 className="absolute text-[80px] text-gray-200 top-6 left-1/2 transform -translate-x-1/2 z-0 pointer-events-none">
                Feedback
              </h2>
              <FaQuoteLeft className="text-4xl text-[#D6B981] mb-4 z-10" />
              <p className="text-lg font-medium mb-6 z-10 max-w-xl leading-relaxed text-center">
                {testimonials[current].quote.split("\n").map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>

              <div className="flex items-center space-x-3 z-10 mt-2">
                <img
                  src="https://gfa-tech.com/dimp-template-images/hairstylist/hair7.5.jpg"
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-sm">
                    {testimonials[current].name}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Arrows */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="bg-white shadow border px-3 py-2 hover:bg-gray-100"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={next}
                className="bg-white shadow border px-3 py-2 hover:bg-gray-100"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="h-[600px] w-full">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair7.15.jpg"
              alt="client"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      <section id="contact" className="bg-white ">
        <WhiteContactForm />
      </section>
      <footer className="bg-[#1c1c1c] text-white px-4 md:px-10 py-16 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h4 className="text-white font-semibold text-xl mb-5">About</h4>
            <ul className="space-y-3 text-gray-400 text-lg">
              {["Home", "About", "Services", "Gallery", "Contact"].map(
                (item, i) => (
                  <li
                    key={i}
                    className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:rounded-full before:bg-[#D6B981]"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-xl mb-5">Services</h4>
            <ul className="space-y-3 text-gray-400 text-lg">
              {HairSalon.slice(0, 6).map((service, index) => (
                <li
                  key={index}
                  className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:rounded-full before:bg-[#D6B981]"
                >
                  <button onClick={handleModalOpen}> {service.name} </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-xl mb-5">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#D6B981] mt-1" />
                <div>
                  <p className="text-white">Location</p>
                  <p>523 Main Street, New York</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-[#D6B981] mt-1" />
                <div>
                  <p className="text-white">Hotline</p>
                  <p>Call : +012 (345) 6789</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-[#D6B981] mt-1" />
                <div>
                  <p className="text-white">Email</p>
                  <p>support@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-xl mb-5">Socials</h4>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 border border-gray-500 flex items-center justify-center rounded-full hover:bg-gray-700"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-500 flex items-center justify-center rounded-full hover:bg-gray-700"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-500 flex items-center justify-center rounded-full hover:bg-gray-700"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-500 flex items-center justify-center rounded-full hover:bg-gray-700"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-gray-700 mt-10 flex flex-col h-full  py-4 px-3 lg:px-20 md:flex-row justify-between items-center text-gray-400 text-xl">
          <p>
            © {new Date().getFullYear()}. All rights reserved. LuxHair, All
            Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default EightStylist;
