import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

import {
  FaPhone,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPlay,
  FaCut,
  FaShower,
  FaHandScissors,
  FaSprayCan,
  FaSpa,
  FaHeart,
  FaPhoneAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { barber } from "../../../../data/Services";
import BookingModal from "../../../../features/Booking/NewBookingModal";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

const BarberFourth = ({ details, subdomain, userDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [eServices, setEServices] = useState([]);
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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const testimonials = [
    {
      name: details && details.Reviews.header1,
      position: details && details.Reviews.title1,
      testimonial: details && details.Reviews.summary1,
      image: details && details.Reviews.image1,
      rating: 5,
    },
    {
      name: details && details.Reviews.header2,
      position: details && details.Reviews.title2,
      testimonial: details && details.Reviews.summary2,
      image: details && details.Reviews.image2,
      rating: 5,
    },
    {
      name: details && details.Reviews.header3,
      position: details && details.Reviews.title3,
      testimonial: details && details.Reviews.summary3,
      image: details && details.Reviews.image3,
      rating: 4.9,
    },
  ];

  const images = [
    details && details.Gallery.image1,
    details && details.Gallery.image2,
    details && details.Gallery.image3,
    details && details.Gallery.image4,
    details && details.Gallery.image5,
    details && details.Gallery.image6,
  ];

  const services = [
    {
      title: details && details.Statistics.section1header,
      icon: <FaCut className="text-yellow-500 text-4xl mb-4" />,
      description: details && details.Statistics.section1paragraphy,
    },
    {
      title: details && details.Statistics.section2header,
      icon: <FaHandScissors className="text-yellow-500 text-4xl mb-4" />,
      description: details && details.Statistics.section2paragraphy,
    },
    {
      title: details && details.Statistics.section3header,
      icon: <FaSprayCan className="text-yellow-500 text-4xl mb-4" />,
      description: details && details.Statistics.section3paragraphy,
    },
    {
      title: details && details.Statistics.section4header,
      icon: <FaHeart className="text-yellow-500 text-4xl mb-4" />,
      description: details && details.Statistics.section4paragraphy,
    },
  ];
  return (
    <div className="bg-black font-Urbanist">
      <header className=" shadow">
        <div className="flex flex-col">
          {/* Top Header */}

          {/* Navbar */}
          <div className="lg:px-20 px-4   flex flex-wrap justify-between text-white items-center py-4">
            <a href="#" className="text-xl font-Raj font-bold text-yellow-500">
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}
            </a>
            <nav className="hidden md:flex space-x-6 uppercase font-bold">
              <a href="#" className=" hover:text-yellow-500">
                Home
              </a>
              <a href="#services" className=" hover:text-yellow-500">
                Services
              </a>
              <a href="#pricing" className=" hover:text-yellow-500">
                Pricing
              </a>
              <a href="#gallery" className=" hover:text-yellow-500">
                Gallery
              </a>
              <a href="#reviews" className=" hover:text-yellow-500">
                Testimonials
              </a>
            </nav>
            <button
              onClick={handleModalOpen}
              className="rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white p-4 hidden md:block"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </header>
      <section
        className="relative bg-cover bg-black bg-center py-32 h-[400px] lg:h-screen"
        style={{
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
        }}
      >
        <div className="container mx-auto flex flex-wrap justify-between items-center text-white">
          <div className="w-full md:w-2/3">
            <h1 className="text-8xl font-Raj font-bold uppercase mb-4">
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}{" "}
              <br /> Haircut
            </h1>
            <p className="mt-4 mb-6 text-lg">
              {sanitizeContent(details && details.hero.title2)}
            </p>
            <a
              href="#services"
              className="bg-yellow-500 text-lg font-bold text-white px-6 py-4 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
             {sanitizeContent(details && details.hero.buttonText1)}
            </a>
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

          <div className="w-full md:w-1/3 flex justify-end">
            <button
              onClick={handleModalOpen}
              className="text-6xl text-yellow-500 rounded-full bg-white p-8 shadow-lg hover:scale-105 transition duration-300"
            >
              <FaCalendarCheck />
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="bg-white border-l border-gray-600 py-16">
        <div className="container mx-auto flex flex-wrap">
          {/* Left Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={details && details.aboutUs.image1}
              alt="Barber at work"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-6">
            <h2 className="text-3xl font-bold font-Raj mb-4 text-gray-900">
            {sanitizeContent(details && details.aboutUs.title1)}
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
            {sanitizeContent(details && details.aboutUs.text1)}
            </p>

            <div className="grid grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
                >
                  {service.icon}
                  <h4 className="font-bold text-lg mb-2 text-gray-800">
                    {service.title}
                  </h4>
                  <p className="text-gray-500 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:px-24 px-4">
        <div className="flex  flex-wrap items-center">
          {/* Left Image */}
          <div className="flex flex-col w-full md:w-3/12 p-4">
            <img
              src={details && details.aboutUs.image2}
              alt="Traditional Nigerian Haircut"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          {/* Center Content */}
          <div className=" flex flex-col w-full md:w-6/12 p-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
            {sanitizeContent(details && details.aboutUs.title2)}
            </h2>
            <p className="text-gray-600 leading-relaxed">
            {sanitizeContent(details && details.aboutUs.text2)}
            </p>
          </div>
          {/* Right Image */}
          <div className=" flex-col w-full md:w-3/12 p-4">
            <img
              src={details && details.aboutUs.image3}
              alt="Barber in Lagos"
              className="w-full  object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 items-center bg-yellow-500 py-12 lg:px-80 px-6">
        <h2 className="text-3xl font-Raj font-bold uppercase text-white text-center  ">
        {sanitizeContent(details && details.LargeCta.header1)}
        </h2>
        <button
          onClick={handleModalOpen}
          className="ms-12 bg-white text-black font-normal text-sm px-6 py-4 rounded-md outline-4 hover:bg-orange-600"
        >
          {sanitizeContent(details && details.LargeCta.buttonText1)}
        </button>
      </section>
      <section id="services" className=" bg-white  py-4 lg:py-24">
        <div className="text-center">
          <h3 className="text-4xl uppercase font-bold mb-4">
            Services We Provide
          </h3>
          <p className="text-gray-600 mb-8">
            Experience top-notch services tailored to your needs with a Nigerian
            touch.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {eServices.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white mt-4 shadow-sm py-6 lg:w-72 w-96 "
            >
              <button onClick={handleModalOpen}>
                {/* <img src={service.serviceImage} className="rounded-lg" /> */}
              </button>
              <button onClick={handleModalOpen}>
                <h4 className="text-xl px-4 font-bold mt-4 items-start">
                  {service.name}
                </h4>
              </button>
              <p className="px-4 text-center">{service.shortDescription}</p>
              <button
                onClick={handleModalOpen}
                className="flex items-center text-yellow-600 hover:text-white  gap-2 rounded-md p-4 bg-yellow-50 mt-12 hover:bg-yellow-500 transition"
              >
                <h1 className="text-lg transition">Book Now</h1>
                <FaCalendarCheck className=" transition" />
              </button>
            </div>
          ))}
        </div>
      </section>
      <section id="pricing">
        <div className="flex flex-col items-center bg-yellow-800 py-12 lg:py-32 px-6">
          <h2 className="text-4xl font-Raj uppercase text-white font-bold text-center mb-6">
            Awesome Pricing Plan
          </h2>
          <p className="text-center text-white mb-8">
            Discover affordable, top-notch services inspired by Nigerian
            traditions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-32 ">
            {eServices.map((service, index) => (
              <div
                key={index}
                className={`flex items-center p-4 rounded-md ${
                  index % 2 === 0 ? "bg-yellow-50" : "bg-white"
                } shadow`}
              >
                {/* Service Image */}
                {/* service.serviceImage && (
                  <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-20 h-20 object-cover rounded-full mr-4"
                  />
                ) */}
                {/* Service Details */}
                <div className="flex-1">
                  <h5 className="text-lg font-semibold text-gray-800">
                    {service.name}
                  </h5>
                  <p className="text-sm text-gray-500">
                    {service.shortDescription}
                  </p>
                </div>
                {/* Price */}
                <div className="text-yellow-500 font-bold text-xl">
                  {getCurrencySymbol(currency)}{service.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="gallery"
        className="bg-yellow-50 font-Urbanist py-10 px-4 lg:px-32 lg:py-32  overflow-hidden "
      >
        <div className="flex flex-wrap items-end justify-center mb-5 text-center md:text-start">
          <div className="xl:w-7/12 lg:w-5/12 md:w-10/12">
            <h1 className="text-4xl font-Raj font-bold mb-4 uppercase">
            {sanitizeContent(details && details.Gallery.summary1)}
            </h1>
          </div>
          <div className="xl:w-5/12 lg:w-7/12 md:w-10/12 ">
            {" "}
            <button
              onClick={handleModalOpen}
              className="ms-12 border-2 border-gray-800 text-black font-normal text-sm px-6 py-4 justify-end rounded-md outline-4 hover:bg-orange-400"
            >
             {sanitizeContent(details && details.Gallery.summary5)}
            </button>
          </div>
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
          className="!pb-12 !w-full"
        >
          {" "}
          {images.map((image, index) => (
            <SwiperSlide>
              <div className="relative bg-white  overflow-hidden h-80">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section
        id="reviews"
        className="py-16 bg-gray-50 lg:px-32 px-4 "
      >
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8">
          What Our Clients Say
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30} // Adjust spacing for better layout
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 }, // Mobile (default)
            768: { slidesPerView: 2 }, // Tablets & Laptops
            1024: { slidesPerView: 2 }, // Desktops
          }}
          className="flex flex-col !pb-12 !w-full"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
            >
              <div className="flex flex-col md:flex-row h-[350px] overflow-hidden shadow-2xl">
                {/* Image Section */}
                <div
                  className="w-full md:w-1/2 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${testimonial.image})`,
                  }}
                ></div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 bg-white p-6 flex flex-col justify-center items-start">
                  {/* Rating */}
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={i < testimonial.rating ? "#f39c12" : "#e0e0e0"}
                        viewBox="0 0 20 20"
                        className="w-5 h-5 mr-1"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.049 2.927a1 1 0 011.902 0l1.645 3.33 3.68.268a1 1 0 01.55 1.806l-2.654 2.247.976 3.992a1 1 0 01-1.486 1.053L10 13.3l-3.527 2.274a1 1 0 01-1.487-1.053l.975-3.993-2.653-2.246a1 1 0 01.55-1.806l3.68-.268L9.05 2.927z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 mb-4">
                  {sanitizeContent(testimonial.testimonial)}
                  </p>

                  {/* Name */}
                  <div className="mt-4 flex items-center">
                    <span className="h-px w-8 bg-gray-800 mr-3"></span>
                    <a
                      href="#"
                      className="text-gray-800 hover:text-gray-600 text-sm font-medium"
                    >
                      {sanitizeContent(testimonial.name)}
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div
        id="team"
        className="font-jak bg-yellow-50 flex flex-col p-4 lg:px-32  lg:py-24 "
      >
        {/* Section Header */}
        <div className="flex justify-center mb-3">
          <div className="text-center">
            <span className="font-semibold tracking-[1px] text-base uppercase text-gray-500 mb-1 block">
            {sanitizeContent(details && details.Blog.author1)}
            </span>
            <h2 className="font-semibold  text-gray-800 text-3xl">
            {sanitizeContent(details && details.Blog.content1)}
            </h2>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="relative overflow-hidden mb-8">
              <img
                src={details && details.Team.image1}
                className="h-100 w-100"
                alt={details && details.Team.header1}
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg"> {sanitizeContent(details && details.Team.header1)}</h3>
            <p>{sanitizeContent(details && details.Team.summary1)}</p>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="relative overflow-hidden mb-8">
              <img
                src={details && details.Team.image2}
                className="h-100 w-100"
                alt={details && details.Team.header2}
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg"> {sanitizeContent(details && details.Team.header2)}</h3>
            <p>{sanitizeContent(details && details.Team.summary2)}</p>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="relative overflow-hidden mb-8">
              <img
                src={details && details.Team.image3}
                className="h-100 w-100"
                alt={details && details.Team.header3}
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg"> {sanitizeContent(details && details.Team.header3)}</h3>
            <p>{sanitizeContent(details && details.Team.summary3)}</p>
          </div>

          {/* Team Member 4 */}
          <div className="text-center">
            <div className="relative overflow-hidden mb-8">
              <img
                src={details && details.Team.image4}
                className="h-100 w-100"
                alt={details && details.Team.header4}
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg"> {sanitizeContent(details && details.Team.header4)}</h3>
            <p>{sanitizeContent(details && details.Team.summary4)}</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 py-10 px-5 lg:px-64 md:px-20">
        <div className="flex flex-col md:flex-row items-center justify-center text-center">
          {/* Left Section */}
          <div className="flex flex-col lg:me-12 items-center justify-center px-12 mb-10 md:mb-0 md:w-5/12 bg-orange-300 h-[500px] text-center">
            <h2 className="text-3xl font-Raj font-bold uppercase text-white mb-4">
            {sanitizeContent(details && details.Blog.header1)}
            </h2>
            <p className="text-white mb-6">
            {sanitizeContent(details && details.Blog.summary1)}
            </p>
            <button
              onClick={handleModalOpen}
              className="border-2 border-white text-white font-bold py-2 px-6 rounded"
            >
              {sanitizeContent(details && details.Blog.date1)}
            </button>
          </div>

          {/* Right Section */}
          <div className="relative md:w-7/12">
            <img
              src={details && details.Blog.image1}
              alt="Barber"
              className="w-full h-[500px]  shadow-lg"
            />
            {/* Play Button */}
          </div>
        </div>
      </div>
      <WhiteContactForm ecosystemDomain={subdomain} />
      <footer className="pt-10 px-4 font-jak bg-black text-white">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 mb-8">
              {/* about company */}
              <div className="mb-4">
                <h1 className="text-white capitalize font-Raj font-semibold text-2xl">
                {userDetails && userDetails.ecosystemName}
                </h1>
                <div className="mt-4">
                  <p>
                  {userDetails && userDetails.ecosystemDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/12 mb-8">
              <h6 className="mb-2 text-white font-bold">BUSINESS</h6>
              <ul className="space-y-2">
                <li>About</li>
                <li>Pricing</li>
                <li>Services</li>
                <li>Our Team</li>
              </ul>
            </div>

            <div className="w-full lg:w-2/12 mb-8">
              <h6 className="mb-2 text-white">Socials</h6>
              <ul className="space-y-2">
                <li>Facebook</li>
                <li>Instagram</li>
              </ul>
            </div>

            <div className="w-full lg:w-4/12 mb-8">
              {/* contact info */}
              <div className="mb-4">
                <h6 className="mb-2 text-white">GET IN TOUCH</h6>
                <p>{userDetails && userDetails.address}</p>

                <p>
                  Phone:{" "}
                  <span className="text-white font-semibold">
                  {userDetails && userDetails.phoneNumber}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 py-4 mt-6 flex justify-between items-center">
            <span>
              {" "}
              © {new Date().getFullYear()} Dimpified. All Rights Reserved
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BarberFourth;
