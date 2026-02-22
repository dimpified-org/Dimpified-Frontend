import React, { useState, useRef } from "react";
import {
  FaBars,
  FaPlay,
  FaArrowLeft,
  FaCheck,
  FaArrowRight,
  FaRegStar,
  FaTooth,
  FaChevronDown,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaChevronUp,
  FaUserMd,
  FaHeartbeat,
  FaSmile,
  FaPhone,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import { dental } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

const FirstDentist = ({ userDetails }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const teamMembers = [
    {
      name: "Dr. Johan Joe",
      role: "Lead Dentist",
      image: "https://i.imghippo.com/files/HXz5419ZdU.jpg",
    },
    {
      name: "Dr. Mike Johnson",
      role: "Senior Dentist",
      image: "https://i.imghippo.com/files/TNv2117JfQ.jpg",
    },
    {
      name: "Dr. Alison Banson",
      role: "Orthodontist",
      image: "https://i.imghippo.com/files/KLxo5232koo.jpg",
    },
    {
      name: "Dr. Christopher Case",
      role: "Periodontist",
      image: "https://i.imghippo.com/files/TNv2117JfQ.jpg",
    },
  ];

  const testimonials = [
    {
      id: 1,
      image:
        "https://gfa-tech.com/dimp-template-images/dentist/testimonials-img.jpg",
      rating: 4.7,
      text: "The best dental experience I've ever had! The team was professional and friendly, and the results were amazing. Highly recommend! Dr. Smith and his staff are fantastic! They made me feel comfortable and at ease during my visit.",
      author: {
        name: "Banson Doe",
        role: "Teacher",
        image: "https://i.imghippo.com/files/Imi5543yI.jpg",
      },
    },
    {
      id: 2,
      image: "/images/testimonials-img-2.jpg",
      rating: 4.9,
      text: "Amazing service and results! The team is very friendly, and the clinic atmosphere is welcoming. Highly recommend to anyone looking for top-notch dental care.",
      author: {
        name: "Adams George",
        role: "Marketing Manager",
        image: "https://i.imghippo.com/files/eDZD5180jZU.jpg",
      },
    },
    {
      id: 3,
      image: "/images/testimonials-img-3.jpg",
      rating: 5.0,
      text: "Fantastic experience! Everything was explained in detail, and I felt truly cared for. The best dental clinic I’ve ever visited.",
      author: {
        name: "Michael Brown",
        role: "Software Engineer",
        image: "https://i.imghippo.com/files/vE8876t.jpg",
      },
    },
  ];

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];
  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  // const { country } = useCountry();
  // Access country code from context
  // const countryCode = country || "NG";
  // Fallback to 'US'

  const featuresLeft = [
    {
      title: "Experienced Doctors",
      description:
        "Our team of highly skilled and certified doctors brings years of expertise to ensure you receive top-quality dental care.",
      icon: "https://i.imghippo.com/files/uGb6574tTw.png",
    },
    {
      title: "Personalized Care",
      description:
        "We tailor every treatment plan to your unique needs, ensuring a comfortable and effective dental experience.",
      icon: "https://i.imghippo.com/files/rHa8802wKA.png",
    },
    {
      title: "Flexible Payment Options",
      description:
        "We offer a variety of payment plans and insurance options to make quality dental care accessible to everyone.",
      icon: "https://i.imghippo.com/files/uis9964tjU.png",
    },
  ];

  const featuresRight = [
    {
      title: "Emergency Services",
      description:
        "Dental emergencies can happen anytime—our clinic provides urgent care to address pain and unexpected issues promptly.",
      icon: "https://i.imghippo.com/files/QKQD6587kvw.png",
    },
    {
      title: "Positive Patient Reviews",
      description:
        "Our patients love us! We take pride in our excellent ratings and testimonials, reflecting our commitment to exceptional care.",
      icon: "https://i.imghippo.com/files/Fl1828WAg.png",
    },
    {
      title: "State-of-the-Art Technology",
      description:
        "We utilize the latest advancements in dental technology for accurate diagnoses, efficient treatments, and superior results.",
      icon: "https://i.imghippo.com/files/DQH7852xko.png",
    },
  ];

  return (
    <div>
      <header className="bg-blue-50 shadow-md relative">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center text-gray-800">
            <FaTooth className="text-[#1E84B5] text-xl" />
            <span className="text-md text-[#1E84B5] font-semibold leading-tight">
              FirstDentist <br />
            </span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About Us
            </a>
            <a href="#services" className="hover:text-blue-600">
              Services
            </a>
            <a href="#how" className="hover:text-blue-600">
              How we work?
            </a>
          </nav>

          {/* Book Appointment Button */}
          <button
            onClick={handleModalOpen}
            className="hidden md:block bg-[#1E84B5] text-white px-5 py-2 rounded-full hover:bg-[#0F3A51] transition"
          >
            Book Appointment →
          </button>

          {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Mobile Menu - No Absolute Positioning */}
        <div
          className={`md:hidden bg-white shadow-md w-full transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col space-y-4 p-6">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About Us
            </a>
            <a href="#services" className="hover:text-blue-600">
              Services
            </a>
            <a href="#how" className="hover:text-blue-600">
              How we work?
            </a>
            <button
              onClick={handleModalOpen}
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-[#0F3A51] transition text-center"
            >
              Book Appointment →
            </button>
          </ul>
        </div>
      </header>
      <section id="#home" className="bg-blue-50 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
          {/* Left Side Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Experience{" "}
              <span className="text-[#1E84B5]">Dental Excellence</span> with a
              Gentle Touch
            </h1>
            <p className="mt-4 text-gray-600">
              We provide top-notch dental care with modern technology and
              experienced professionals. Your smile deserves the best!
            </p>

            <div className="mt-6">
              <button
                onClick={handleModalOpen}
                className="bg-[#1E84B5] text-white px-6 py-3 rounded-full hover:bg-[#0F3A51] transition"
              >
                Make an Appointment →
              </button>
            </div>

            {/* Google Rating */}
            <div className="mt-6 flex items-center space-x-3 text-gray-700">
              <span className="text-lg">Google Rating</span>
              <span className="text-yellow-500 font-bold text-lg">5.0</span>
              <div className="flex space-x-1">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <span key={index} className="text-yellow-500">
                      ⭐
                    </span>
                  ))}
              </div>
              <span className="text-sm">Based on 492 reviews</span>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="md:w-1/2 flex justify-center mt-8 md:mt-0 relative">
            {/* Dentist Image */}
            <img
              src="https://i.imghippo.com/files/btI6682iPs.jpg"
              alt="Dentist"
              className="w-80 md:w-96 mix-blend-normal rounded-full "
            />

            {/* Doctor's Profile Box */}
            <div className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg flex items-center p-3">
              <img
                src="https://i.imghippo.com/files/Imi5543yI.jpg"
                alt="Dr. Clara Lee"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3">
                <h3 className="font-bold text-gray-900">Dr. Clara Lee</h3>
                <p className="text-gray-600 text-sm">Dentist</p>
              </div>
            </div>

            {/* Surrounding Icons */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Top-Left Icon */}
              <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 bg-blue-100 p-3 rounded-full shadow-md">
                <FaTooth className="text-blue-600 text-xl" />
              </div>

              {/* Top-Right Icon */}
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-blue-100 p-3 rounded-full shadow-md">
                <FaUserMd className="text-blue-600 text-xl" />
              </div>

              {/* Bottom-Left Icon */}
              <div className="absolute bottom-0 left-0 transform -translate-x-4 translate-y-4 bg-blue-100 p-3 rounded-full shadow-md">
                <FaHeartbeat className="text-blue-600 text-xl" />
              </div>

              {/* Bottom-Right Icon */}
              <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 bg-blue-100 p-3 rounded-full shadow-md">
                <FaSmile className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="relative bg-white">
        {/* Top CTA Section */}
        <div className="bg-[#0F3A51] text-white py-6 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-3">
            <FaPhone className="text-xl" />
            <div>
              <h3 className="font-semibold text-lg">Need Dental Services ?</h3>
              <p className="text-sm">Call on : (+01) 987 828 745</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <FaClock className="text-xl" />
            <div>
              <h3 className="font-semibold text-lg">Opening Hours</h3>
              <p className="text-sm">Mon to Sat 9:00AM to 9:00PM</p>
            </div>
          </div>
          <button
            onClick={handleModalOpen}
            className="bg-[#1E84B5] hover:bg-[#0F3A51] transition duration-300 flex items-center gap-2 px-5 py-2 rounded-full text-white"
          >
            Make An Appointment <span className="text-lg">➜</span>
          </button>
        </div>
        {/* About Us Section */}
        <div className="container mx-auto py-16 px-6 md:px-12 flex flex-col lg:flex-row items-center lg:gap-x-16">
          {/* Image Section */}
          <div className="relative lg:w-1/2 mb-10 lg:mb-0 flex flex-col items-center">
            {/* First Image (Large) */}
            <div className="relative w-full">
              <img
                src="https://i.imghippo.com/files/KRtw9377bY.jpg"
                alt="Dental Treatment"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute top-8 left-8 bg-[#0F3A51] text-white px-4 py-1 rounded-full text-sm">
                15+ YEARS OF EXPERIENCE
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2">
            <h3 className="text-[#1E84B5] uppercase text-sm font-semibold">
              + About Us
            </h3>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">
              Your <span className="text-[#1E84B5]">Journey</span> to a
              Healthier Smile Begins Here
            </h2>
            <p className="text-gray-600 mt-4">
              {userDetails?.ecosystemDescription}
            </p>

            {/* Key Points (Prevent Breaking) */}
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 min-w-0">
              {[
                "Experienced Team",
                "Comprehensive Services",
                "State-Of-The-Art Tech",
                "Emergency Dental Services",
              ].map((text, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 whitespace-nowrap flex-shrink-0"
                >
                  <span className="bg-[#0FA8E3] text-white p-2 rounded-full">
                    <FaCheck />
                  </span>
                  <span className="font-semibold">{text}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <a
              href="#services"
              className="mt-6 bg-[#1E84B5] hover:bg-[#0F3A51] transition duration-300 flex items-center gap-2 px-6 py-3 rounded-full text-white w-56 font-semibold"
            >
              Explore our services <span className="text-lg">➜</span>
            </a>
          </div>
        </div>
      </section>
      <section id="services" className="bg-blue-50 py-16 px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-lg uppercase text-[#1E84B5] tracking-wide">
            Our Services
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            <span className="text-[#1E84B5]">High Quality</span> Services for
            You.
          </h2>
          <p className="text-gray-500 mt-4">
            We are committed to sustainability and eco-friendly initiatives.
          </p>
        </div>

        {/* Services Cards */}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto ">
          {dental.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center transition-all duration-300 hover:bg-[#d7e8f2] hover:text-white"
            >
              <div className="flex justify-center">
                {/* <img
                  src={service.serviceImage}
                  alt={service.name}
                  className="w-24 h-24 rounded-full "
                /> */}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-white">
                {service.name}
              </h3>
              <p className="mt-2 text-gray-600">{service.shortDescription}</p>
              <button
                onClick={handleModalOpen}
                className="mt-4 inline-flex items-center text-[#1E84B5] font-semibold hover:underline"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg">
            We believe in using the latest technology and techniques to ensure
            the best outcomes for our patients.
          </p>
        </div>

        {/* Counter Section */}
        <div className="max-w-7xl  mx-auto px-6 lg:px-12 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: "75+", label: "Insurance Covered" },
            { number: "2K", label: "Realized Projects" },
            { number: "22K", label: "Happy Customers" },
            { number: "18+", label: "Experienced Doctors" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <h2 className="text-3xl font-bold  text-[#0F3A51]">
                {item.number}
              </h2>
              <h3 className="text-lg font-semibold  mt-1 text-[#0F3A51]">
                {item.label}
              </h3>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#E8F4FA] py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[#1E84B5] text-sm font-semibold">
            + WHY CHOOSE US
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
            <span className="text-[#1E84B5]">Diagnosis of</span> Dental Diseases
          </h2>
          <p className="text-gray-600 mt-4">
            We are committed to sustainability, eco-friendly initiatives.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-8">
            {/* Left Features (Icon after content) */}
            <div className="flex flex-col space-y-10 w-full md:w-1/3">
              {featuresLeft.map((feature, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-10 h-10"
                  />
                </div>
              ))}
            </div>

            {/* Center Image */}
            <div className="w-60 h-60 mx-10 flex items-center justify-center bg-white shadow-lg rounded-full border border-gray-300 relative">
              <img
                src="https://i.imghippo.com/files/zp5785NVY.png"
                alt="Tooth"
                className="w-50 h-60 "
              />
            </div>

            {/* Right Features (Icon before content) */}
            <div className="flex flex-col space-y-10 w-full md:w-1/3">
              {featuresRight.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-10 h-10"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="relative">
              <img
                src="https://i.imghippo.com/files/IHa8479e.jpg"
                alt="Dental Checkup"
                className="rounded-lg shadow-lg w-full"
              />
            </div>

            {/* Content Section */}
            <div id="how">
              <p className="text-[#1E84B5]  uppercase text-sm font-semibold tracking-wide">
                + How It Works
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                <span className="text-[#1E84B5] ">What We Do</span> for Your
                Teeth
              </h2>
              <p className="mt-4 text-gray-600">
                We are committed to sustainability. Our clinic practices
                eco-friendly initiatives like digital records to reduce paper
                waste and energy-efficient equipment.
              </p>

              {/* Accordion */}
              <div className="mt-6 space-y-4">
                {/* Item 1 */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleAccordion(1)}
                    className="w-full flex items-center justify-between px-5 py-3 text-lg font-semibold text-gray-800 bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src="https://i.imghippo.com/files/uGb6574tTw.png"
                        alt="Icon 1"
                        className="w-8 h-8"
                      />
                      <span>Book An Appointment</span>
                    </div>
                    {openAccordion === 1 ? (
                      <FaChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <FaChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  {openAccordion === 1 && (
                    <div className="p-4 text-gray-600 bg-white">
                      Schedule an appointment with our expert dentists and
                      receive top-notch dental care at your convenience.
                    </div>
                  )}
                </div>

                {/* Item 2 */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleAccordion(2)}
                    className="w-full flex items-start justify-start px-5 py-3 text-lg font-semibold text-gray-800 bg-gray-100"
                  >
                    <div className="flex items-start  gap-3">
                      <img
                        src="https://i.imghippo.com/files/rHa8802wKA.png"
                        alt="Icon 2"
                        className="w-8 h-8"
                      />
                      <span>What Conditions Can Manual Therapy Treat?</span>
                    </div>
                    {openAccordion === 2 ? (
                      <FaChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <FaChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  {openAccordion === 2 && (
                    <div className="p-4 text-gray-600 bg-white">
                      Manual therapy can treat jaw misalignment, TMJ disorders,
                      and other dental issues requiring non-invasive correction.
                    </div>
                  )}
                </div>

                {/* Item 3 */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleAccordion(3)}
                    className="w-full flex items-center justify-between px-5 py-3 text-lg font-semibold text-gray-800 bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src="https://i.imghippo.com/files/uis9964tjU.png"
                        alt="Icon 3"
                        className="w-8 h-8"
                      />
                      <span>Expert Care</span>
                    </div>
                    {openAccordion === 3 ? (
                      <FaChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <FaChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  {openAccordion === 3 && (
                    <div className="p-4 text-gray-600 bg-white">
                      Our team of experienced dental professionals is dedicated
                      to providing high-quality, personalized care.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center px-4">
          <h3 className="uppercase tracking-widest text-[#1E84B5]">
            + Our Team
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#0F3A51]">
            <span className="text-[#1E84B5]">Our Friendly</span> Dentists Team
          </h2>
          <p className="text-gray-600 mt-4">
            We are committed to sustainability. Eco-friendly initiatives.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative group">
                  {/* Image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover rounded-lg shadow-lg"
                  />

                  {/* Social Icons (Only on Image Hover) */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    {[
                      { icon: FaFacebookF, link: "#" },
                      { icon: FaYoutube, link: "#" },
                      { icon: FaInstagram, link: "#" },
                      { icon: FaTwitter, link: "#" },
                    ].map(({ icon: Icon, link }, i) => (
                      <a
                        key={i}
                        href={link}
                        className="p-2 rounded-full bg-[#0F3A51] text-white hover:scale-110 transition-transform"
                      >
                        <Icon />
                      </a>
                    ))}
                  </div>   
                </div>                  

                {/* Name and Role (No Hover Effect) */}
                <h3 className="mt-3 text-lg font-bold text-[#0F3A51]">
                  {member.name}
                </h3>
                <p className="text-[#1E84B5]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="py-12 px-6 min-h-screen bg-white">
        <div className=" flex flex-col h-full  py-4 px-4 lg:px-32">
          {/* Title Section */}
          <div className="text-center mb-10">
            <p className="text-[#1E84B5] uppercase tracking-widest">
              Testimonial
            </p>
            <h2 className="text-3xl font-bold text-[#0F3A51]">
              <span className="text-[#1E84B5]">What our</span> Clients Say
            </h2>
            <p className="text-gray-600 mt-2">
              We are committed to sustainability and eco-friendly initiatives.
            </p>
          </div>

          {/* Content Section */}
          <div className="grid md:grid-cols-2 items-center">
            {/* Left - Static Image and Rating Box */}
            <div className="relative">
              <img
                src="https://i.imghippo.com/files/GUEO9349IVY.jpg"
                alt="Testimonial"
                className="rounded-lg w-[500px] h-[500px] shadow-lg"
              />
              <div className="absolute  text-[#1E84B5] bottom-4 left-4 p-4 rounded-lg shadow-lg w-3/4 bg-opacity-80 bg-[#1E84B5] backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white">4.8/5</h3>
                <p className="text-sm text-white">
                  This rating is given by users after visiting our location
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm mt-1 text-white">
                  For Excellence Services
                </p>
              </div>
            </div>

            {/* Right - Changing Testimonial Text & Author */}
            <div>
              <p className="text-[#1E84B5] text-3xl font-bold mb-3">“</p>
              <p className="text-gray-700 italic text-3xl">
                {currentTestimonial.text}
              </p>
              <div className="flex items-center mt-4">
                <img
                  src={currentTestimonial.author.image}
                  alt={currentTestimonial.author.name}
                  className="w-12 h-12 rounded-full border-2 border-gray-300"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {currentTestimonial.author.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {currentTestimonial.author.role}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons Below Author's Name */}
              <div className="flex justify-center gap-6 mt-6">
                <button
                  className="p-2 border border-gray-300 rounded-full hover:bg-gray-200"
                  onClick={prevTestimonial}
                >
                  <FaArrowLeft className="text-gray-600" />
                </button>
                <button
                  className="p-2 border border-gray-300 rounded-full hover:bg-gray-200"
                  onClick={nextTestimonial}
                >
                  <FaArrowRight className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[#0F2C3F] text-white py-10">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* About Section */}
            <div>
              <div className="flex items-center space-x-2">
                <a href="#" className="flex items-center text-gray-800">
                  <FaTooth className="text-white text-xl" />
                  <span className="text-md text-white font-semibold leading-tight">
                    FirstDentist <br />
                  </span>
                </a>
              </div>
              <p className="mt-4 text-gray-300">
                The goal of our clinic is to provide friendly, caring dentistry
                and the highest level of general, cosmetic, and specialist
                dental treatments.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-gray-300 hover:text-[#4CAFE0]"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-[#4CAFE0]"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-300 hover:text-[#4CAFE0]"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleModalOpen}
                    className="text-gray-300 hover:text-[#4CAFE0]"
                  >
                    Book Appointment
                  </button>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Social Media</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#4CAFE0]">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#4CAFE0]">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#4CAFE0]">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#4CAFE0]">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">info@domain.com</p>
              <p className="text-gray-300 mt-2">+(123) 698-5245</p>
            </div>
          </div>

          {/* Copyright */}
          <hr className="mt-10 border-t-[1px]" />
          <div className="text-center text-gray-400 text-sm mt-10">
            <p>
              {" "}
              &copy; {new Date().getFullYear()} Built with{" "}
              <a
                href="https://dimpified.com"
                className="text-gray-400 hover:text-white text-sm"
              >
                Dimpified
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FirstDentist;
