import React, { useRef, Fragment, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { barber } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

import {
  FaCalendarCheck,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa6";
const testimonials = [
  {
    name: "Oluwaloseyi",
    role: "Customer review",
    image: "https://gfa-tech.com/dimp-template-images/barber/instructor1.jpg", // Replace with the actual image URL
    text: "The professionalism and quality of service here are unmatched. I always leave feeling refreshed and taken care of. Highly recommend!",
  },
  {
    name: "Adebola Johnson",
    role: "Customer review",
    image: "https://gfa-tech.com/dimp-template-images/barber/instructor4.jpg", // Replace with the actual image URL
    text: "The barbing salon in Lagos is truly exceptional! The attention to detail and warm customer service make it worth every penny.",
  },
  {
    name: "Chidinma Okoro",
    role: "Customer review",
    image: "https://gfa-tech.com/dimp-template-images/barber/instructor2.jpg", // Replace with the actual image URL
    text: "I love how they understand what I need without even saying much. The vibe is perfect, and the results are always top-notch.",
  },
  {
    name: "Ibrahim Musa",
    role: "Customer review",
    image: "https://gfa-tech.com/dimp-template-images/barber/instructor1.jpg", // Replace with the actual image URL
    text: "From the moment I walked in, I felt at home. The skill level here is amazing. Definitely the best grooming experience in Abuja.",
  },
];
const images = [
  "https://gfa-tech.com/dimp-template-images/barber/hair.jpg",
  "https://gfa-tech.com/dimp-template-images/barber/dye.jpeg",
  "https://gfa-tech.com/dimp-template-images/barber/plait.jpg",
  "https://gfa-tech.com/dimp-template-images/barber/weaving.jpg",
  "https://gfa-tech.com/dimp-template-images/barber/fade.jpg",
  "https://gfa-tech.com/dimp-template-images/barber/barb.jpg",
];

const BarberPosh = ({ userDetails }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Works", href: "#works" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  // const { country } = useCountry(); // Access country code from context
  // const countryCode = country || "NG"; // Fallback to 'US'

  return (
    <Fragment>
      <div className="font-sen  ">
        <div className="bg-black text-white">
          {/* Navbar */}
          <nav className="max-w-7xl mx-auto px-6 lg:px-16 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
              <span className="text-xl font-bold">Perukar Barber Shop</span>
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
              backgroundImage:
                "url('https://gfa-tech.com/dimp-template-images/barber/barber-bg1.jpg')", // Replace with the actual image URL
            }}
          >
            <div className="text-center text-white px-6">
              <p className="uppercase text-sm tracking-wide mb-4">
                Stay Sharp, Look Good
              </p>
              <h1 className="text-5xl lg:text-6xl uppercase font-bold mb-6">
                {userDetails && userDetails.ecosystemName
                  ? userDetails.ecosystemName
                  : ""}{" "}
                {""}
                Barber Shop
              </h1>
              <p className="text-sm mb-8">Broadway St, Lagos.</p>
              {isModalOpen && (
                <BookingModal
                  isOpen={isModalOpen}
                  handleClose={handleModalClose}
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
                    src="https://gfa-tech.com/dimp-template-images/barber/barber6.jpg"
                    alt="Primary Image"
                    className="w-full object-cover"
                  />
                </div>
                <div className="absolute right-[-15px] md:right-[15px] bottom-[-50px] w-1/2 md:w-2/5 rounded-lg overflow-hidden">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/barber/hair.jpg"
                    alt="Secondary Image"
                    className="w-full object-cover"
                  />
                </div>
              </div>
              {/* Text Content */}
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <p className="uppercase text-sm font-bold text-gray-600 mb-2">
                  Since 2006
                </p>
                <h2 className="text-4xl font-bold text-black mb-6">
                  {userDetails && userDetails.ecosystemName
                    ? userDetails.ecosystemName
                    : ""}{" "}
                  {""}
                  Barber Shop
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {userDetails && userDetails.ecosystemDescription
                    ? userDetails.ecosystemDescription
                    : ""}
                </p>

                <ul className="space-y-2">
                  <li className="flex items-center text-gray-800">
                    ✓ Experienced and certified barbers
                  </li>
                  <li className="flex items-center text-gray-800">
                    ✓ Premium grooming products
                  </li>
                  <li className="flex items-center text-gray-800">
                    ✓ A commitment to customer satisfaction
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
                  Cuts
                </h3>
                <p className="text-gray-600">
                  Experience sharp, tailored cuts that reflect your style and
                  the Nigerian vibrancy.
                </p>
              </div>

              {/* Service 2 */}
              <div className="flex flex-col w-full md:w-1/3 mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Fades
                </h3>
                <p className="text-gray-600">
                  Get expertly crafted fades that are precise, smooth, and
                  on-trend.
                </p>
              </div>

              {/* Service 3 */}
              <div className="flex flex-col  w-full md:w-1/3 mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Shaves
                </h3>
                <p className="text-gray-600">
                  Enjoy a classic, clean shave with the highest level of care
                  and precision.
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
                src="https://gfa-tech.com/dimp-template-images/barber/barber5.jpg" // Replace with the actual image URL
                alt="Barber at work"
                className="rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-6">
              <p className="uppercase text-sm tracking-widest text-gray-400">
                17 Years of Excellence
              </p>
              <h2 className="text-4xl font-bold leading-snug">
                Making Nigerians Look Good Since 2006
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Experience a premium and authentic Nigerian barbershop, where we
                celebrate the rich culture of grooming and style. From
                traditional cuts to modern trends, we ensure every client leaves
                feeling confident and refined.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our expert barbers combine decades of experience with a deep
                understanding of African hair textures, offering services
                tailored to suit every style and personality.
              </p>
              <div>
                <p className="font-medium">Barber, Founder</p>
                <p className="font-bold text-lg">Chukwuemeka Okafor</p>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="services" className="bg-cream text-black py-16">
          <div className="  px-6 lg:px-32 ">
           
            <p className="text-sm uppercase text-gray-600 tracking-wider mb-2">
              What We're Offering
            </p>
            <h2 className="text-4xl font-bold mb-2 ">Barber Services</h2>
            <p className="text-sm  text-gray-600 tracking-wider  mb-12">
              Select any service style to start the booking process
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              {barber.map((service, index) => (
                <div key={index} className="text-left relative mb-8 md:mb-0">
                  
                  <div className="relative rounded-md  overflow-hidden ">
                    <img
                      src={service.serviceImage}
                      onClick={handleModalOpen}
                      alt="Bridal Makeup"
                      className="w-full h-full object-cover"
                    />

                    
                    <figcaption className="absolute inset-0 flex flex-col items-start justify-center p-12 sm:p-4 z-10">
                  
                      <span className="px-4 py-2 text-xs uppercase text-gray-800 font-bold bg-white rounded-md">
                        Flat 50% off
                      </span>

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

                        
                        <button
                          href=""
                          className="w-16 h-16 px-4 sm:w-12 sm:h-12 bg-transparent border border-white/50 rounded-full flex items-center justify-center "
                        >
                          <FaCalendarCheck className="text-white hover:text-yellow-500  text-2xl" />
                        </button>
                      </div>
                    </figcaption>

                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-90 z-0"></div>

                    
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
        </section> */}

        <div
          className="bg-cover bg-yellow-500 bg-center py-10 lg:py-32 "
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

            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:mb-2">
              {barber.map((item, index) => (
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
                        #{item.price}
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
            </div> */}
          </div>
        </section>

        <section
          id="works"
          className="container  bg-yellow-500 font-Urbanist py-10 px-4 lg:px-32 lg:py-32  overflow-hidden"
        >
          <div className=" mb-8">
            <h2 className="text-sm uppercase tracking-wide text-white">
              Gallery
            </h2>
            <h1 className="text-4xl font-bold text-white">Our Superb Works</h1>
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
                Meet our team
              </span>
              <h2 className="font-semibold  text-gray-800 text-3xl">
                Talented Hair Experts
              </h2>
            </div>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="relative rounded-md overflow-hidden mb-8">
                <img
                  src="https://gfa-tech.com/dimp-template-images/barber/instructor1.jpg"
                  className="h-100 w-100"
                  alt="Bryan Johnson"
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
                Olamide Johnson
              </h3>
              <p>Director - Head Barber</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="relative rounded-md overflow-hidden mb-8">
                <img
                  src="https://gfa-tech.com/dimp-template-images/barber/instructor2.jpg"
                  alt="Jeremy Dupont"
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
              <h3 className="font-semibold text-gray-800 text-lg">Subomi</h3>
              <p>Dread Specialist</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="relative rounded-md overflow-hidden mb-8">
                <img
                  src="https://gfa-tech.com/dimp-template-images/barber/instructor3.jpg"
                  alt="Matthew Taylor"
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
              <h3 className="font-semibold text-gray-800 text-lg">Risikat</h3>
              <p>Dye Attendant</p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center">
              <div className="relative rounded-md overflow-hidden mb-8">
                <img
                  src="https://gfa-tech.com/dimp-template-images/barber/instructor4.jpg"
                  alt="Johncy Parker"
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
              <h3 className="font-semibold text-gray-800 text-lg">Maleek</h3>
              <p>Barber</p>
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
                We Are Best Barbers & Hair Cutting Salon
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

          {/* Footer Section */}
          <div className="bg-black text-white p-4 lg:px-32  lg:py-24">
            <div className="flex flex-wrap justify-between gap-8">
              {/* Contact */}
              <div>
                <h2 className="text-lg font-bold mb-4">Contact</h2>
                <p>
                  {" "}
                  {userDetails && userDetails.address && userDetails.address}
                </p>
                <p className="font-bold mt-4">+2348112345678</p>
                <p>info@barber.com</p>
              </div>

              {/* Work Time */}
              <div>
                <h2 className="text-lg font-bold mb-4">Work Time</h2>
                <p>Monday: 10:00 - 20:00</p>
                <p>Tuesday: 10:00 - 20:00</p>
                <p>Thursday: 10:00 - 20:00</p>
                <p>Friday: 10:00 - 20:00</p>
                <p>Saturday: 10:00 - 20:00</p>
                <p>Weekend: Closed</p>
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
export default BarberPosh;
