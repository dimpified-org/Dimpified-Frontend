import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FaFacebookF,
  FaFacebook,
  FaPhoneAlt,
  FaTwitter,

  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
  FaArrowLeft,
  FaPlus,
  FaPhone,
 
  FaBars,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { FaXmark, FaMagnifyingGlass } from "react-icons/fa6";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

import { HairSalon } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { GiHairStrands } from "react-icons/gi";

const testimonials = [
  {
    text: `I had the privilege of working with Demure on
            a complex business litigation case.`,
    name: "KENDE ATTILA",
    role: "Software Tester",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    text: `Demure completely transformed my look –
            brilliant colour work!`,
    name: "SARAH JOHNSON",
    role: "Marketing Executive",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    text: `Demure completely transformed my look –
            brilliant colour work!`,
    name: "MONICA WELLS",
    role: "Bank Manager",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    text: `Demure completely transformed my look –
            brilliant colour work!`,
    name: "SAM JOE",
    role: "Entrepreneur",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
  },
];
const faqs = [
  {
    id: "1",
    question: "Can you help me decide on a new hairstyle?",
    answer:
      "Absolutely! Our stylists are trained to consult with you about your lifestyle, face shape, hair texture, and personal preferences to recommend styles that will complement you perfectly.",
  },
  {
    id: "2",
    question: "Do I need to book an appointment?",
    answer:
      "While walk-ins are welcome, we highly recommend booking an appointment to ensure availability with your preferred stylist and to minimize wait times.",
  },
  {
    id: "3",
    question: "What services do you offer?",
    answer:
      "We offer a comprehensive range of services including haircuts, coloring, treatments, styling, extensions, and more. Visit our services page for a complete list.",
  },
  {
    id: "4",
    question: "How long will my case take to resolve?",
    answer:
      "This depends on the service complexity. Feel free to consult with our specialists.",
  },
  {
    id: "5",
    question: "How can I book an appointment?",
    answer:
      "You can book online through our website, call us directly, or use our mobile app for convenient scheduling.",
  },
  {
    id: "6",
    question: "What products do you use?",
    answer:
      "We use professional-grade products from top brands known for their quality and results.",
  },
];


const SixthStylist = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("collapseThree");
  const [openIndex, setOpenIndex] = useState(2);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? "" : id);
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

  // Mobile menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Search popup toggle
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Back to top button
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10); // change threshold if needed
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Mobile Menu */}
      {/* Mobile Navbar */}

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      <header
        className={`fixed inset-0 z-50 bg-black transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden overflow-y-auto`}
      >
        <div className="container mx-auto px-0">
          <nav className="px-4">
            <div className="flex justify-between items-center w-full py-4">
              <div className="flex items-center justify-between w-full">
                <a href="#" className="flex items-center text-white text-xl">
                  Demure{" "}
                  <GiHairStrands className="text-[#c59c7b] text-xl ml-2" />
                </a>
                <button onClick={toggleMenu} className="text-white text-2xl">
                  <FaXmark />
                </button>
              </div>
            </div>

            <ul className="space-y-4 text-white text-base">
              {["Home", "About Us", "Service", "Blog", "Shop", "Pages"].map(
                (text, idx) => (
                  <li key={idx}>
                    <a
                      href={`/${text.toLowerCase().replace(/ /g, "-")}.html`}
                      onClick={toggleMenu}
                    >
                      {text}
                    </a>
                  </li>
                )
              )}
            </ul>

            <button
              onClick={handleModalOpen}
              className="primary-btn w-full mt-4"
            >
              Book Now
            </button>
          </nav>
        </div>
      </header>

      {/* Desktop Navbar */}
      <header
        id="header"
        className={`fixed w-full top-0 left-0 z-30 transition-all duration-300 shadow-sm ${
          isScrolled ? "bg-black" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <a
            href="tel:+13165550116"
            className="hidden lg:flex items-center gap-3 border border-[#c59c7b] px-4 py-2 text-sm text-[#c59c7b] hover:bg-[#c59c7b]/10"
          >
            <FaPhone /> (316) 555‑0116
          </a>

          <div className="hidden lg:flex flex-1 justify-center items-center gap-16">
            <ul className="flex items-center gap-8 text-white text-xl">
              <li>
                <a href="#home" className="hover:text-[#c59c7b]">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#c59c7b]">
                  About
                </a>
              </li>
            </ul>

            <a href="#home" className="flex text-white text-xl items-center">
              Demure <GiHairStrands className="text-[#c59c7b]" />
            </a>

            <ul className="flex items-center gap-8 text-xl text-white">
              <li>
                <a href="#services" className="hover:text-[#c59c7b]">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#c59c7b]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleModalOpen}
              className="hidden lg:inline-block bg-[#c59c7b] px-6 py-2 text-sm text-black font-serif hover:opacity-90"
            >
              BOOK NOW
            </button>

            <button
              onClick={toggleMenu}
              className="lg:hidden text-xl text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Banner section */}
      <section
        id="banner"
        className="banner-two relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.imghippo.com/files/Yon3768yEQ.jpg')",
        }}
      >
        {isModalOpen && (
          <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
        )}
        <div className="container mx-auto px-4 relative z-10">
          <div className="content text-center text-white">
            <h4 className="sub-heading text-primary mb-4 animate-fade-up text-[#c59c7b]">
              Luxury Haircare You Deserve
            </h4>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-up uppercase"
              style={{ animationDelay: "0.3s" }}
            >
              Custom Styles for Every <br /> Personality
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto mb-8 animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              Welcome to Demure, where creativity meets expertise to bring out
              the best in your hair. Whether you're looking for a bold
              transformation or a subtle refresh, we've got you covered.
            </p>

            <div className="relative">
              <button
                onClick={handleModalOpen}
                className="w-auto bg-white hover:bg-gray-800 bg-opacity-20 backdrop-blur-sm py-4 px-6 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {" "}
                Book an appointment
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </section>

      {/* About us section */}
      <section className="relative bg-[#fdf7f3] overflow-hidden">
        {/* Scroll Arrow Left Side */}

        {/* Text Section */}
        <div className="container mx-auto px-6 pt-16 pb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="lg:w-2/3 mb-6 lg:mb-0">
              <p className="text-sm italic mb-2">About Demure</p>
              <h2 className="text-3xl md:text-4xl font-bold uppercase text-[#1a1a1a]">
                Expert Care for Every Strand
              </h2>
            </div>
            <div className="lg:w-1/3 text-left">
              <p className="text-gray-700 mb-4 text-sm">
                We believe that hair is more than just a style—it’s an
                expression of individuality,
              </p>
              <a
                href="#services"
                className="inline-flex items-center text-sm uppercase font-medium text-[#1a1a1a] border border-[#d5bca9] px-6 py-3 bg-[#c59c7b] hover:bg-[#d5bca9] transition-colors duration-300"
              >
                Explore Services
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Full-width Image Section */}
        <div className="w-full ml-16">
          <img
            src="https://i.imghippo.com/files/lh4643TQ.jpg"
            alt="Salon Treatment"
            className="w-full h-[700px] object-cover"
          />
        </div>
      </section>

      {/* What we offer section */}
      <section className="relative overflow-hidden">
        {/* grid wrapper */}
        <div className="flex flex-col lg:grid lg:grid-cols-12">
          {/* left image */}
          <div className="lg:col-span-5 relative">
            <img
              src="https://i.imghippo.com/files/gJLf4641uBg.jpg"
              alt="Salon services"
              className="w-full h-full object-cover"
            />

            {/* scroll‑down arrow  */}
            <div className="hidden lg:flex w-full justify-center">
              <div className="bg-[#ede4dd] flex flex-col items-center py-10">
                <div className="w-16 h-16 bg-white flex items-center justify-center">
                  <span className="w-5 h-5 border-b-2 border-l-2 border-[#b68c6d] rotate-45 block" />
                </div>
              </div>
            </div>
          </div>

          {/* right content  */}
          <div className="lg:col-span-7 bg-[#fdf7f3] py-14 px-6 md:px-10 xl:px-16">
            {/* headline block */}
            <div className="max-w-xl mb-10">
              <p className="text-sm italic text-[#c59c7b] mb-3">
                What We Offer
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold uppercase leading-snug mb-4">
                Explore Our Wide <br /> Range of Premium Services
              </h2>
              <p className="text-gray-700 text-sm md:text-base">
                We’re dedicated to transforming your hair into a masterpiece.
                Our expert stylists offer a wide range of services tailored.
              </p>
            </div>

            {/* swiper carousel */}
            <div className="relative" id="services">
              <Swiper
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                  nextEl: ".solution-next",
                  prevEl: ".solution-prev",
                }}
                breakpoints={{
                  1024: { slidesPerView: 2 },
                  640: { slidesPerView: 1.3 },
                }}
                className="services-swiper pb-6"
              >
                {HairSalon.map((service, index) => (
                  <SwiperSlide key={index}>
                    <article className="border border-[#e7e1da] bg-white">
                      {/* card header */}
                      <h4 className="px-6 pt-6 text-sm font-semibold uppercase tracking-wider">
                        {service.name}
                      </h4>

                      {/* service image with icon */}
                      <div className="relative mt-4">
                        {/* <img
                          src={service.serviceImage}
                          alt={service.name}
                          className="w-full h-48 object-cover"
                        /> */}
                        {/* <img
                          src={s.icon}
                          alt=""
                          className="absolute top-3 left-3 w-10 h-10 bg-white p-1 object-cover"
                        /> */}
                      </div>

                      {/* description */}
                      <div className="px-6 py-5 border-t border-[#e7e1da]">
                        <p className="text-sm text-gray-700">
                          {service.shortDescription}
                        </p>
                      </div>

                      {/* details link */}
                      <div className="px-6 py-4">
                        <button
                          onClick={handleModalOpen}
                          className="flex items-center gap-2 text-[#b68c6d] uppercase text-xs tracking-wider"
                        >
                          Book Now <FaArrowRight size={10} />
                        </button>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* prev / next buttons */}
              <div className="flex gap-4 mt-2">
                <button className="solution-prev w-10 h-10 border border-[#e7e1da] flex items-center justify-center">
                  <FaArrowLeft size={14} />
                </button>
                <button className="solution-next w-10 h-10 border border-[#e7e1da] flex items-center justify-center">
                  <FaArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose section */}
      <section id="#about" className="relative bg-white pb-20 mt-16">
        {/* Background Image */}
        <div className="w-full h-[600px] overflow-hidden relative ">
          <img
            src="https://i.imghippo.com/files/kZ6424j.jpg"
            alt="Salon Interior"
            className="w-full h-full object-cover"
          />

          {/* White Info Card  */}
          <div className="absolute left-8 md:left-16 bottom-[-100px] bg-[#f7f1ec] p-6 md:p-10 max-w-xl shadow-lg z-10">
            <p className="italic text-sm text-[#c59c7b] mb-2">
              Why Choose Demure?
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2f2f2f] mb-4">
              YOUR BEAUTY IS IN EXPERT HANDS
            </h2>
            <p className="text-gray-700 mb-6">
              We're not just a salon; we’re your partners in beauty and
              confidence. With a focus on delivering tailored services, premium
              care, and exceptional results.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm font-medium text-[#2f2f2f]">
              <ul className="space-y-1">
                <li>• Exceptional Client Care</li>
                <li>• Premium Products</li>
              </ul>
              <ul className="space-y-1">
                <li>• Personalized Services</li>
                <li>• Expert Stylists</li>
              </ul>
            </div>
            <a
              href="#services"
              className="mt-6 inline-block bg-[#e6d5c4] hover:bg-[#d5bca9] text-black text-sm px-6 py-2 border border-[#c5b2a0] transition-colors duration-300"
            >
              EXPLORE SERVICES →
            </a>
          </div>
        </div>

        {/* Counters */}
        <div className="container mx-auto mt-20 px-5 grid grid-cols-2 md:grid-cols-4 gap-6 ">
          {[
            { count: "14", label: "Happy Clients" },
            { count: "18", label: "Years of experiences" },
            { count: "152", label: "Unique Services" },
            { count: "52", label: "Expert Analysts" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-black text-white py-10 text-center hover:bg-[#c59c7b]"
            >
              <h3 className="text-4xl md:text-5xl font-semibold mb-2 text-[#c59c7b] hover:text-black">
                {item.count}+
              </h3>
              <p className="text-sm uppercase tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Beauty specialists section */}
      <section className="services experts py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="row flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div className="md:w-1/2">
              <h4 className="sub-heading text-[#c59c7b] mb-4 animate-fade-up">
                Our Skilled Stylists
              </h4>
              <h2 className="text-3xl md:text-3xl font-bold animate-fade-up mb-0 uppercase">
                Meet Haircare Specialists
              </h2>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <div className="btns flex gap-4">
                <button className="expert-prev bg-white bg-opacity-10 border border-[#c59c7b] text-white w-10 h-10 flex items-center justify-center hover:bg-primary transition-colors">
                  <FaArrowLeft className="text-[#c59c7b] " />
                </button>
                <button className="expert-next bg-white bg-opacity-10 text-white border border-[#c59c7b] w-10 h-10 flex items-center justify-center hover:bg-primary transition-colors">
                  <FaArrowRight className="text-[#c59c7b]" />
                </button>
              </div>
            </div>
          </div>

          <div className="swiper expertSwiper">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                nextEl: ".expert-next",
                prevEl: ".expert-prev",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
            >
              {[
                {
                  name: "Bessie Cooper",
                  role: "Hair Color Specialist",
                  image: "https://randomuser.me/api/portraits/women/12.jpg",
                },
                {
                  name: "Darrell Steward",
                  role: "Master Barber",
                  image: "https://randomuser.me/api/portraits/women/14.jpg",
                },
                {
                  name: "Floyd Miles",
                  role: "Hair Color Specialist",
                  image: "https://randomuser.me/api/portraits/women/65.jpg",
                },
                {
                  name: "Bessie Cooper",
                  role: "Hair Color Specialist",
                  image: "https://randomuser.me/api/portraits/women/44.jpg",
                },
                {
                  name: "Floyd Miles",
                  role: "Master Barber",
                  image: "https://randomuser.me/api/portraits/women/33.jpg",
                },
                {
                  name: "Darrell Steward",
                  role: "Hair Color Specialist",
                  image: "https://randomuser.me/api/portraits/women/21.jpg",
                },
              ].map((expert, index) => (
                <SwiperSlide key={index}>
                  <div className="expert-card-2 bg-gray-800 rounded-lg overflow-hidden">
                    <div className="img-box h-80 overflow-hidden">
                      <img
                        src={expert.image}
                        className="w-full h-full object-cover"
                        alt={expert.name}
                      />
                    </div>
                    <div className="card-footer p-4 flex items-center gap-3 relative">
                      <ul className="links flex gap-2 mb-0">
                        <li>
                          <a
                            href="#"
                            className="text-white hover:text-primary transition-colors"
                          >
                            <FaFacebook />
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-white hover:text-primary transition-colors"
                          >
                            <FaTwitter />
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-white hover:text-primary transition-colors"
                          >
                            <FaInstagram />
                          </a>
                        </li>
                      </ul>
                      <button className="social-btn bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
                        <FaPlus className="text-sm" />
                      </button>
                      <div>
                        <h5 className="text-white font-semibold">
                          {expert.name}
                        </h5>
                        <p className="text-white mb-0 text-sm">{expert.role}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Gallery section */}
      <section className="gallery py-20 relative">
        <div className="container mx-auto px-4">
          <div className="section-title text-center mb-12">
            <h4 className="sub-heading text-primary mb-4 animate-fade-up">
              Showcase Of Beauty
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4 animate-fade-up">
              Every Client, a Work of Art
            </h2>
            <p className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
              Welcome to the Demure Gallery, where beauty and creativity come
              alive. Each image <br /> represents our dedication to crafting
              stunning styles that enhance your natural beauty.
            </p>
          </div>

          <div className="row grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <div className="md:col-span-1">
              <div className="grid grid-cols-1 gap-4 lg:gap-6" id="gallery">
                <div className="col-12">
                  <a
                    href="#"
                    className="project-card glightbox block relative group overflow-hidden rounded-lg"
                  >
                    <img
                      src="https://i.imghippo.com/files/xRzw4021yms.jpg"
                      className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Salon Work"
                    />
                    <div className="info absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-end p-4">
                        <div className="plus-icon bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center">
                          <FaPlus />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-12">
                  <a
                    href="#"
                    className="project-card glightbox block relative group overflow-hidden rounded-lg"
                  >
                    <img
                      src="https://i.imghippo.com/files/CSdW1458uw.jpg"
                      className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Salon Work"
                    />
                    <div className="info absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-end p-4">
                        <div className="plus-icon bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center">
                          <FaPlus />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <a
                href="#"
                className="project-card glightbox block relative group overflow-hidden rounded-lg h-full"
              >
                <img
                  src="https://i.imghippo.com/files/nqy7714gQ.jpg"
                  className="w-full h-full min-h-[520px] object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Salon Work"
                />
                <div className="info absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-end p-4">
                    <div className="plus-icon bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center">
                      <FaPlus />
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div className="md:col-span-1">
              <div className="grid grid-cols-1 gap-4 lg:gap-6">
                <div className="col-12">
                  <a
                    href="#"
                    className="project-card glightbox block relative group overflow-hidden rounded-lg"
                  >
                    <img
                      src="https://i.imghippo.com/files/lNG3443dI.jpg"
                      className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Salon Work"
                    />
                    <div className="info absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-end p-4">
                        <div className="plus-icon bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center">
                          <FaPlus />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-12">
                  <a
                    href="#"
                    className="project-card glightbox block relative group overflow-hidden rounded-lg"
                  >
                    <img
                      src="https://i.imghippo.com/files/CSdW1458uw.jpg"
                      className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Salon Work"
                    />
                    <div className="info absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-end p-4">
                        <div className="plus-icon bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center">
                          <FaPlus />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-16 flex justify-center">
            <a
              href="#"
              className="border border-[#2b2c3f] text-[#2b2c3f] uppercase px-6 py-2 font-semibold text-sm hover:bg-[#b8937e] hover:text-white transition inline-flex items-center"
            >
              See All Images <FaArrowRight className="ml-2 text-xs" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <section className="bg-[#fdf7f3] py-20 overflow-hidden">
        <div className="max-w-none w-full lg:grid lg:grid-cols-12">
          {/* left image */}
          <div className="hidden lg:block lg:col-span-5 h-full">
            <img
              src="https://i.imghippo.com/files/lNG3443dI.jpg"
              alt="Happy salon client"
              className="w-full h-full object-cover"
            />
          </div>

          {/* right content */}
          <div className="lg:col-span-7 px-6 md:px-10 xl:px-16 py-12 bg-white">
            {/* heading */}
            <p className="text-sm italic text-[#c59c7b] mb-2">
              What Our Clients Say
            </p>
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">
              Client&apos;s Success Stories
            </h2>
            <p className="max-w-xl mb-8 text-[#5c5c5c]">
              We believe in continuous improvement and ensuring the best
              possible experience for our clients. Your feedback is essential to
              us and helps us elevate our services.
            </p>

            {/* swiper */}
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{ prevEl: ".client-prev", nextEl: ".client-next" }}
              breakpoints={{ 768: { slidesPerView: 2 } }}
              className="pb-8"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={i}>
                  <article className="bg-white border border-[#e7e1da] p-6 relative h-full">
                    {/* rating */}
                    <div className="flex gap-1 text-[#c59c7b]">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                      <FaStarHalfAlt />
                    </div>

                    <p className="text-sm text-[#333] mt-4 mb-6 leading-relaxed">
                      {t.text}
                    </p>

                    <footer className="flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h5 className="font-semibold">{t.name}</h5>
                        <span className="text-xs text-[#777] uppercase tracking-wider">
                          {t.role}
                        </span>
                      </div>
                    </footer>

                    {/* decorative quote icon */}
                    <img
                      src="https://i.imghippo.com/files/adv5111rWo.webp"
                      alt=""
                      className="absolute top-6 right-6 w-10 opacity-10 pointer-events-none"
                    />
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* nav buttons */}
            <div className="btns flex gap-4">
              <button className="client-prev border border-[#c59c7b] bg-white bg-opacity-10 text-[#c59c7b] w-10 h-10 flex items-center justify-center hover:bg-primary transition-colors">
                <FaArrowLeft />
              </button>
              <button className="client-next border border-[#c59c7b] bg-white bg-opacity-10 text-[#c59c7b] w-10 h-10 flex items-center justify-center hover:bg-primary transition-colors">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="w-full bg-[#f9f1eb] text-[#1e1e1e] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Left: FAQ */}
          <div ref={leftRef}>
            <p className="italic text-sm text-[#c59c7b] mb-2">
              Reserve Your Glow
            </p>
            <h2 className="text-3xl md:text-3xl  mb-4 uppercase">
              FAQs About Going to the Salon
            </h2>
            <p className="text-[#5e5e5e] mb-8 max-w-lg">
              We understand that every client has unique questions and concerns
              about their salon experience.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full text-left px-6 py-4 flex justify-between items-center font-medium text-lg bg-white hover:bg-gray-100 transition ${
                      openIndex === index ? "bg-[#c59c7b] text-black" : ""
                    }`}
                  >
                    {faq.question}
                    <span className="text-2xl">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="bg-[#c7a189] text-black px-6 py-4">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Booking Form + Image */}
          {/* Opening Hours */}
          <div className="w-full lg:w-6/12 bg-[#c59c7b] p-10 rounded shadow text-center text-black flex flex-col justify-between">
            <div>
              <div className="mb-6 flex flex-col items-center">
                <svg
                  className="w-12 h-12 text-black mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3M12 6a9 9 0 100 18 9 9 0 000-18z"
                  />
                </svg>
                <h3 className="text-2xl font-bold uppercase">Opening Hours</h3>
              </div>

              <div className="mb-6">
                <p className="text-xl font-medium mb-1">09:30 AM – 20:30 PM</p>
                <p className="text-sm">Saturday to Thursday</p>
              </div>

              <hr className="border-black opacity-20 mb-6" />

              <div className="mb-6">
                <p className="text-xl font-medium mb-1">09:30 AM – 20:30 PM</p>
                <p className="text-sm">Saturday to Thursday</p>
              </div>
            </div>

            <a
              href="#"
              className="mt-4 inline-flex uppercase items-center justify-center bg-black text-[#c59c7b] px-6 py-3 rounded hover:bg-gray-900 transition"
            >
              Get Direction&nbsp;
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer Booking Section */}
      <footer className="footer footer-two relative bg-gray-100 pt-20 pb-12">
        <div className="container mx-auto px-4 reserve">
          {/* Top Section: Booking Form & Opening Hours */}
          <WhiteContactForm />

          {/* Middle Section: Logo + Socials */}
          <div className="flex flex-col lg:flex-row justify-between gap-10 pb-12 border-b border-gray-200 mt-9">
            <div className="flex-1 max-w-lg">
              <a
                href="#home"
                aria-label="Go to Homepage"
                className="flex items-center gap-2 text-xl font-bold text-[#2b2c3f]"
              >
                Demure <GiHairStrands className="text-[#c59c7b]" />
              </a>
              <p className="text-[#2b2c3f] mb-6 mt-2">
                Demure is a conceptual name chosen for a modern and stylish Hair
                Salons and Hairdressers Website. It embodies elegance and
                professionalism.
              </p>
              <div className="flex gap-3">
                {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 border border-[#ccc] flex items-center justify-center hover:text-[#b8937e] transition"
                    >
                      <Icon size={16} />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-12">
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">QUICK LINKS</h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", id: "home" },
                  { label: "About Us", id: "about" },
                  { label: "Service", id: "services" },
                  { label: "Contact Us", id: "contact" },
                ].map(({ label, id }, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${id}`}
                      className="hover:text-[#b8937e] transition"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pages */}
            <div>
              <h4 className="text-lg font-semibold mb-6">PAGES</h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", id: "home" },
                  { label: "About Us", id: "about" },
                  { label: "Service", id: "services" },
                  { label: "Contact Us", id: "contact" },
                ].map(({ label, id }, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${id}`}
                      className="hover:text-[#b8937e] transition"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h4 className="text-lg font-semibold mb-6">OPENING HOURS</h4>
              <ul className="space-y-3 text-sm text-[#2b2c3f]">
                <li className="flex justify-between">
                  <span>Mon – Wed:</span>
                  <span>9:00 AM – 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Thu – Fri:</span>
                  <span>10:00 AM – 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM – 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">CONTACT</h4>
              <ul className="space-y-5 text-sm">
                <li className="flex gap-4 items-start">
                  <FaPhoneAlt className="mt-1 text-[#b8937e]" />
                  <div>
                    <p>(808) 555-0111</p>
                    <p>(302) 555-0107</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-6 text-sm text-[#777]">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-[#2b2c3f]">Demure</span> All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SixthStylist;
