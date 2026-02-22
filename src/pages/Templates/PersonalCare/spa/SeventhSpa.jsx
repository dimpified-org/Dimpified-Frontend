import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaTimes,
  FaBars,
} from "react-icons/fa";

import { spa } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext"; // Adjust path
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

const SeventhSpa = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  return (
    <div className="relative">
      {/* Sidebar and Mobile Toggle */}
      <div id="betty-page">
        {/* Sidebar Section */}
        <aside
          id="betty-aside"
          className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-pink-600 to-orange-500 text-white z-40 overflow-y-auto transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <div className="p-6 min-h-screen flex flex-col justify-start">
            {/* Logo */}
            <div className="mb-12">
              <a href="index.html" className="flex items-center">
                <img
                  src="https://i.imghippo.com/files/yzr7217BM.webp"
                  alt="Betty Logo"
                  className="w-12 h-12 mr-3"
                />
                <div>
                  <h1 className="text-xl font-bold">Betty</h1>
                  <span className="text-sm block mt-1 font-light">
                    Center of Relaxation
                  </span>
                </div>
              </a>
            </div>

            {/* Menu */}
            <nav className="mb-12">
              <ul className="space-y-4">
                <li>
                  <a href="#home" className="block hover:text-white/80">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="block hover:text-white/80">
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" className="block hover:text-white/80">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="block hover:text-white/80">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#team" className="block hover:text-white/80">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#contact" className="block hover:text-white/80">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            {/* Info */}
            <div className="mb-6">
              <h2>Opening Hours</h2>
              <div className="flex items-start mb-4">
                <div>
                  <p className="font-semibold">Mon-Fri: 08.00 - 19.00</p>
                  <p className="text-sm text-white/80">Sunday: Closed</p>
                </div>
              </div>
              <div className="flex items-start">
                <div>
                  <p className="font-semibold">+234 81 1234 5678</p>
                  <p className="text-sm text-white/80">Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto">
              <ul className="flex space-x-4">
                <li>
                  <a href="#">
                    <FaFacebookF className="hover:text-white/80" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaTwitter className="hover:text-white/80" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaInstagram className="hover:text-white/80" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaPinterestP className="hover:text-white/80" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Mobile Menu Toggle Button */}
        <button
          className="fixed top-4 left-4 z-50 md:hidden bg-[#E52E71] text-white p-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Main Content Section */}
      <div id="home" className="flex-1 md:ml-64">
        {/* Hero Section */}
        <aside id="betty-hero" className="relative h-screen">
          <div className="h-full relative">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://i.imghippo.com/files/CHB2058nVc.jpg)",
              }}
            ></div>

            {/* Content Overlay Box */}
            <div className="absolute bottom-10 left-10 bg-white p-6 rounded shadow-lg max-w-md z-10">
              <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Welcome to Betty Relaxation and Spa!
              </h1>
              <p className="text-gray-600 mb-6">
                We're commited to making you feel relaxed and bringing out your
                inner strenght
              </p>
              <a
                href="#services"
                className="bg-[#E52E71] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#E52E71] transition"
              >
                Explore and book services
              </a>
            </div>
          </div>
        </aside>

        {/* About Us */}
        <div id="about" className="py-20 px-4 md:px-8">
          <div className="container mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl text-[#E52E71] font-bold mb-2">
                About Us
              </h2>
              <span className="text-gray-500">
                Welcome to the best Relaxation experience!
              </span>
            </div>
            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )}

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <img
                  src="https://i.imghippo.com/files/QQLW5016ulg.jpg"
                  className="w-full rounded-lg shadow-lg"
                  alt="Our Relaxation Salon"
                />
              </div>

              <div className="md:w-1/2">
                <p className="mb-4 text-gray-700">
                  At Betty Relaxation Center, we believe that Relaxation comes
                  from confidence and self-care. Our team of certified
                  professionals is dedicated to providing you with the highest
                  quality services in a relaxing environment.
                </p>
                <p className="mb-4 text-gray-700">
                  Founded in 2010, we've been serving our clients with
                  exceptional Relaxation treatments, using only premium products
                  and the latest techniques in the industry.
                </p>
                <p className="mb-6 text-gray-700">
                  Our mission is to enhance your natural essence while ensuring
                  you feel pampered and rejuvenated. From skincare to haircare,
                  we offer a comprehensive range of services tailored to your
                  individual needs.
                </p>

                <h2 className="text-2xl font-bold mb-6">
                  Betty White
                  <br />
                  <span className="text-lg font-normal text-[#E52E71]">
                    Salon Owner
                  </span>
                </h2>
                <button
                  onClick={handleModalOpen}
                  className="bg-[#E52E71]  text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#E52E71] transition"
                >
                  Book appointment now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          id="services"
          className="betty-makeup py-20 bg-gray-100 px-4 md:px-8"
        >
          <div className="container mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl text-[#E52E71] font-bold mb-2">
                Our Services
              </h2>
              <span className="text-gray-500">
                Professional makeup for every occasion
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {spa.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md text-center"
                >
                  <div className="relative">
                    {/* <img
                      src={service.serviceImage}
                      alt={service.name}
                      className="w-full h-48  object-cover relative rounded-xl"
                    /> */}
                    <span className="bg-white/10 backdrop-blur-md text-md px-2 py-1 rounded-full text-white absolute right-1 bottom-1 shadow-lg">
                      {getFormattedPrice(service.price, countryCode)}
                    </span>{" "}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2  py-2">
                      {service.name}
                    </h4>
                    <p className="text-gray-600 py-2">
                      {service.shortDescription}
                    </p>
                    <button
                      onClick={handleModalOpen}
                      className="justify-center items-center mt-2 px-6 py-2  bg-gradient-to-r from-[#E52E71] to-pink-300 text-white rounded-full hover:opacity-90 focus:outline-none"
                    >
                      Book Now
                    </button>{" "}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}

        <div id="team" className="py-20 px-4 md:px-8 bg-pink-50">
          <div className="container mx-auto">
            {/* Header */}
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-4xl font-bold text-[#E52E71]">Our Team</h2>
              <p className="italic text-lg text-gray-700 mt-2">
                Choose your preffered specialist
              </p>
            </div>

            {/* Team Members */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white rounded-xl shadow-xl p-6 flex items-center space-x-6">
                <img
                  src="https://i.imghippo.com/files/ZYzb3688FdY.jpg"
                  alt="Emma White"
                  className="w-32 h-32 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Emma White{" "}
                    <span className="text-pink-500 font-normal text-base ml-2">
                      Makeup Specialist
                    </span>
                  </h3>
                  <p className="text-gray-600 mt-2 mb-4">
                    With over 10 years of experience, Emma transforms every body
                    into a canvas of elegance and natural essence.
                  </p>
                  <div className="flex space-x-4 text-pink-500">
                    <FaPinterestP className="w-6 h-6 border border-pink-500 p-1 rounded-full" />
                    <FaTwitter className="w-6 h-6 border border-pink-500 p-1 rounded-full" />
                    <FaInstagram className="w-6 h-6 border border-pink-500 p-1 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white rounded-xl shadow-xl p-6 flex items-center space-x-6">
                <img
                  src="https://i.imghippo.com/files/GlUc3741IA.jpg"
                  alt="Arya Brown"
                  className="w-32 h-32 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Arya Brown{" "}
                    <span className="text-pink-500 font-normal text-base ml-2">
                      Body Treatments
                    </span>
                  </h3>
                  <p className="text-gray-600 mt-2 mb-4">
                    Arya blends science and serenity, offering personalized
                    treatments that rejuvenate both body and spirit.
                  </p>
                  <div className="flex space-x-4 text-pink-500">
                    <FaPinterestP className="w-6 h-6 border border-pink-500 p-1 rounded-full" />
                    <FaTwitter className="w-6 h-6 border border-pink-500 p-1 rounded-full" />
                    <FaInstagram className="w-6 h-6 border border-pink-500 p-1 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div id="gallery" className="py-20 px-4 md:px-8">
          <div className="container mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl text-[#E52E71] font-bold mb-2">
                Our Gallery
              </h2>
              <span className="text-gray-500">
                We offer a wide range of Relaxation services
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Makeup",
                  img: "https://i.imghippo.com/files/YTJ2757CpU.jpg",
                },
                {
                  title: "Hairdressing",
                  img: "https://i.imghippo.com/files/jmex4449PNs.jpg",
                },
                {
                  title: "Hair Treatment",
                  img: "https://i.imghippo.com/files/uwSu9971Xgc.jpg",
                },
                {
                  title: "Massage Therapy",
                  img: "https://i.imghippo.com/files/MnIg4877YA.jpg",
                },
                {
                  title: "Body Treatments",
                  img: "https://i.imghippo.com/files/RVC2875M.jpg",
                },
                {
                  title: "Aromatherapy",
                  img: "https://i.imghippo.com/files/lLin8923U.jpg",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg"
                >
                  <img
                    src={service.img}
                    className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                    alt={service.title}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <a
                      href="#"
                      className="text-white text-xl font-bold flex items-center"
                    >
                      {service.title} <span className="ml-2">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Makeup Services */}

        {/* Testimonials */}
        <div
          className="betty-testimonial py-20 px-4 md:px-8 bg-fixed bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://i.imghippo.com/files/VxW1962dQ.jpg)",
          }}
        >
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Left Section: Heading */}
              <div className="md:w-1/2 text-white">
                <h2 className="text-3xl md:text-4xl font-bold text-[#E52E71] mb-4">
                  What our clients say <br /> about Betty
                </h2>
                <p className="text-white text-lg">
                  Our clients trust us to help them feel their best — relaxed,
                  confident, and radiant. Here’s what they have to say.
                </p>

                {/* Navigation Arrows */}
                <div className="flex space-x-4 mt-6">
                  <button className="w-10 h-10 rounded-full border border-white text-white flex items-center justify-center hover:bg-[#E52E71] hover:text-white transition">
                    &lt;
                  </button>
                  <button className="w-10 h-10 rounded-full border border-white text-white flex items-center justify-center hover:bg-[#E52E71] hover:text-white transition">
                    &gt;
                  </button>
                </div>
              </div>

              {/* Right Section: Testimonials */}
              <div className="md:w-1/2 flex flex-col md:flex-row gap-6">
                {/* Testimonial Card 1 */}
                <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-full">
                  <p className="text-gray-800 mb-4">
                    I’ve never felt more pampered. The staff are attentive, the
                    environment is so calming, and I always leave with a renewed
                    sense of confidence.
                  </p>
                  <div className="flex items-center">
                    <img
                      src="https://i.imghippo.com/files/NnmY9738o.jpg"
                      alt="Jasmine White"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h6 className="font-bold text-black">Jasmine White</h6>
                      <span className="text-gray-600 text-sm">Model</span>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 2 */}
                <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-full">
                  <p className="text-gray-800 mb-4">
                    Betty’s spa treatments are a game-changer. It’s my sanctuary
                    of peace where I reconnect with myself every month. Highly
                    recommended!
                  </p>
                  <div className="flex items-center">
                    <img
                      src="https://i.imghippo.com/files/xkh7341WK.jpg"
                      alt="Emily Smith"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h6 className="font-bold text-black">Emily Smith</h6>
                      <span className="text-gray-600 text-sm">
                        Psychologist
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div id="contact" className="py-20 bg-white px-4 md:px-16">
          <WhiteContactForm />
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              {/* Left Section - Info */}
              <div className="md:w-1/4 space-y-6">
                {/* Phone */}
                <div className="flex items-start">
                  <span className="text-pink-600 text-3xl mr-4">📱</span>
                  <div>
                    <h5 className="font-bold text-black">Phone Text</h5>
                    <p className="text-gray-600">+1 203–123–0606</p>
                  </div>
                </div>

                {/* Address */}
              </div>
              <div className="md:w-1/4 space-y-6">
                {/* Phone */}
                <div className="flex items-start">
                  <span className="text-pink-600 text-3xl mr-4">📧</span>
                  <div>
                    <h5 className="font-bold text-black">E-Mail</h5>
                    <p className="text-gray-600">info@betty.com</p>
                  </div>
                </div>
              </div>

              {/* Right Section - Form */}
              <div className="md:w-1/4">
                {/* Hours */}
                <div className="flex items-start">
                  <span className="text-pink-600 text-3xl mr-4">⏰</span>
                  <div>
                    <h5 className="font-bold text-black">
                      Mon–Fri: 08.00 – 19.00
                    </h5>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/4">
                <div className="flex items-start">
                  <span className="text-pink-600 text-3xl mr-4">📍</span>
                  <div>
                    <h5 className="font-bold text-black">Address</h5>
                    <p className="text-gray-600">Lagos, Nigeria</p>
                  </div>
                </div>
                {/* Email */}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#E52E71] text-white py-12 px-4 md:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              
              <h2 className="text-2xl font-bold">
                Betty{" "}
                <span className="block text-sm font-normal mt-1">
                  Center of Relaxation
                </span>
              </h2>
            </div>

            <div className="text-center text-white">
              <p>
                &copy; {new Date().getFullYear()} Built with{" "}
                <a href="https://dimpified.com" className="hover:text-black">
                  Dimpified
                </a>{" "}
                . All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeventhSpa;