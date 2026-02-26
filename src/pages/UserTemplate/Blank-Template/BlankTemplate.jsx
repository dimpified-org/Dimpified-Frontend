import React, { useRef, Fragment, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import sanitizeHtml from "sanitize-html";

import { barber } from "../../../data/Services";
import BookingModal from "../../../features/Booking/BookingModal";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaRegCalendarAlt,
  FaMouse,
  FaArrowRight,
  FaPhoneAlt,
} from "react-icons/fa";
import { WhiteContactForm } from "../../../features/ContactForm/ContactForm";

const BlankTemplate = ({ details, subdomain, userDetails }) => {
  // List of images
  const images = [
    details.Gallery.image1,
    details.Gallery.image2,
    details.Gallery.image3,
    details.Gallery.image4,
    details.Gallery.image5,
    details.Gallery.image6,
  ];
  const [isOpen, setIsOpen] = useState(false);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [services, setServices] = useState([]);

  useEffect(() => {
    const getServiceeDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`
        );
        const allServices = response.data.flatMap((item) => item.services);
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

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  // Utility function to chunk images
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Group images into chunks of 3
  const imageChunks = chunkArray(images, 6);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  return (
    <Fragment>
      {/* Navbar Section */}

      <nav className="font-jak bg-white px-4 py-4 lg:px-10  w-full z-50">
        <div className="container mx-auto flex items-center justify-between">
          <a href="#home" className="font-bold flex items-center">
            <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
          </a>
          <button
            onClick={toggleMenu}
            className="lg:hidden text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Mobile Menu */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } lg:hidden absolute top-16 left-0 w-full bg-white shadow-lg transition-all duration-300`}
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              <a
                href="#about"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </a>
              <a
                href="#services"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Services
              </a>
              <a
                href="#pricing"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#gallery"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </a>

              <a
                href="#testimonials"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </a>
              <a
                href="#team"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Team
              </a>
              <a
                href="#contact"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>

              <button
                onClick={handleModalOpen}
                className="px-8 py-4 rounded-full shadow-lg text-black bg-white hover:bg-gray-500 flex items-center justify-center gap-2"
              >
                <span className="font-semibold hover:text-gray-100">
                {sanitizeContent(details && details.navbar.buttonText1)}
                </span>
              </button>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8 mx-auto">
            <a
              href="#about"
              className="font-semibold text-base hover:text-gray-700"
            >
              About Us
            </a>
            <a
              href="#services"
              className="font-semibold text-base hover:text-gray-700"
            >
              Services
            </a>
            <a
              href="#gallery"
              className="font-semibold text-base hover:text-gray-700"
            >
              Gallery
            </a>
            <a
              href="#pricing"
              className="font-semibold text-base hover:text-gray-700"
            >
              Pricing
            </a>
            <a
              href="#team"
              className="font-semibold text-base hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Team
            </a>
            <a
              href="#testimonials"
              className="font-semibold text-base hover:text-gray-700"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="font-semibold text-base hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </div>
          <button
            onClick={handleModalOpen}
            className="px-8 py-4 rounded-full shadow-lg text-white bg-gray-600 hover:bg-gray-500 flex items-center justify-center gap-2"
          >
            <span className="font-semibold hover:text-gray-100">
            {sanitizeContent(details && details.navbar.buttonText1)}
            </span>
          </button>
        </div>
      </nav>

      {/* Home Section */}
      <section
        id="home"
        className="relative font-jak px-4 h-screen bg-dark-gray"
        style={{
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-lvh flex flex-col items-center justify-center">
          <div className="text-center">
            <span className="text-lg text-white uppercase tracking-wider block mb-6 sm:mb-4">
            {sanitizeContent(details && details.hero.title1)}
            </span>
            <h1 className="font-jak text-[2rem] lg:text-[6rem] px-4 lg:px-48 leading-none tracking-normal text-white mb-8 md:mb-5 shadow-lg">
            {sanitizeContent(details && details.hero.title2)}
            </h1>
            <div className="flex items-center justify-center">
              <button
                onClick={handleModalOpen}
                className="px-8 py-4 rounded-full shadow-lg text-black bg-white hover:bg-gray-500 flex items-center justify-center gap-2"
              >
                <span className="font-semibold hover:text-gray-100">
                {sanitizeContent(details && details.hero.buttonText1)}
                </span>
              </button>
              {isModalOpen && (
                <BookingModal
                  isOpen={isModalOpen}
                  handleClose={handleModalClose}
                  information={services}
                  subdomain={subdomain}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      {/* <section
        className="font-jost relative bg-cover bg-center h-[600px]"
        style={{
          backgroundImage: "url(https://dummyimage.com/1280x520/000/000)",
        }}
      >
        {isModalOpen && (
          <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
        )}
        <div className="inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        <div className="container mx-auto h-full flex items-center px-4 lg:px-12">
          <div className="text-white w-full text-center lg:text-left sm:text-center lg:w-1/2">
            <p className="mb-4 text-sm lg:text-lg font-bold mt-6">
              Catch Phrase text
            </p>
            <h1 className="font-bold font-jost text-4xl lg:text-7xl mb-4 leading-snug">
              Business <br />
              Name Hero Two
            </h1>
            <button
              className="text-white border border-white text-center font-semibold py-2 px-4 rounded-lg hover:bg-orange-950"
              onClick={handleModalOpen}
            >
              Call to action
            </button>
          </div>
        </div>
      </section> */}

      {/* About Section */}
      <section id="about" className="px-4 font-jak bg-gray-50 relative pb-8">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-32">
          <div className="flex flex-wrap items-center mb-12 sm:mb-10">
            {/* Text Section */}
            <div className="font-jak w-full xl:w-5/12 lg:w-6/12 mt-4 xl:mt-6 md:mt-8 xs:mt-10">
              <h2 className="font-jak text-5xl font-light tracking-normal text-gray-800 mb-4">
              {sanitizeContent(details && details.aboutUs.title1)}
              </h2>
              <p className="w-11/12 xl:w-full mb-8 sm:mb-6">
              {sanitizeContent(details && details.aboutUs.text1)}
              </p>

              <div className="inline-block">
                <a
                  href="#services"
                  className="inline-flex items-center text-white bg-gray-500 hover:bg-gray-600 text-lg px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
                >
                  {sanitizeContent(details && details.aboutUs.buttonText1)}
                  <FaArrowRight className="ml-2" />
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-6/12 xl:pl-8 relative mt-12 md:mt-10">
              <div className="relative w-9/12 md:w-7/12 transition-transform transform hover:scale-105">
                <img
                  src={details && details.aboutUs.image1}
                  className="rounded-lg  w-auto"
                  alt="font-jak Studio"
                />
              </div>
              <div className="absolute right-4 -bottom-16 w-8/12 lg:w-7/12 overflow-hidden rounded-lg shadow-xl">
                <img
                  src={details && details.aboutUs.image2}
                  alt="font-jak's Work"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section
        className="font-jak bg-cover bg-repeat py-10"
        style={{
          backgroundImage: "url('https://dummyimage.com/1280x720/fff/fff')",
        }}
      >
        <div className="flex flex-col h-full px-4">
          {/* <div className="flex flex-wrap items-center  mb-10 md:mb-17 lg:px-32 px-4 ">
         
            <div className="relative xl:w-1/2 lg:w-1/2 md:w-4/6 mb-8 lg:mb-0">
              <div className="w-4/5 overflow-hidden rounded-xl float-end relative">
                <img
                  className="w-4/4 rounded-xl"
                  src="https://dummyimage.com/400x400/aaa/fff"
                  alt=""
                />
              </div>
              <div className="absolute left-[-70px] bottom-[-30px] w-3/5 md:left-[-100px] sm:left-[-15px]">
                <img
                  className="w-4/4 rounded-xl"
                  src="https://dummyimage.com/400x400/aaa/fff"
                  alt=""
                />
              </div>
            </div>

            
            <div className="xl:w-1/2 lg:w-1/2 lg:pl-12 text-center lg:text-left">
              <span className="text-sm  font-medium uppercase tracking-wider mb-3 inline-block">
                About Us
              </span>
              <h3 className="text-4xl font-jost font-semibold leading-snug text-yellow-950 mb-4">
                About Sub-header
              </h3>
              <p className="text-lg text-gray-500 leading-8 mb-8">
                About text description About text description About text
                description About text description v About text description
                About text description About text description v
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-6">
                <button
                  onClick={handleModalOpen}
                  className="btn-small btn-double-border border-2 border-black hover:border-4 btn-border-base-color text-black bg-white-500 p-3 rounded-lg flex items-center "
                >
                  <span>Button</span>
                  <FaArrowRight />
                </button>
                <div className="font-medium text-yellow-950 text-lg flex items-center gap-2">
                  <FaPhoneAlt className="text-orange-950" />
                  <a href="tel:1800222000">1 800 222 000</a>
                </div>
              </div>
            </div>
          </div> */}

          {/* Statistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center gap-8 mt-10">
            <div>
              <h2 className="font-semibold  text-3xl text-yellow-950 m-0">
              {sanitizeContent(details && details.Statistics.section1header)}
              </h2>
              <p className="text-yellow-950">{sanitizeContent(details && details.Statistics.section1paragraphy)}</p>
            </div>
            <div>
              <h2 className="font-semibold  text-3xl text-yellow-950 m-0">
              {sanitizeContent(details && details.Statistics.section2header)}
              </h2>
              <p className="text-yellow-950">{sanitizeContent(details && details.Statistics.section2paragraphy)}</p>
            </div>
            <div>
              <h2 className="font-semibold  text-3xl text-yellow-950 m-0">
              {sanitizeContent(details && details.Statistics.section3header)}
              </h2>
              <p className="text-yellow-950">{sanitizeContent(details && details.Statistics.section3paragraphy)}</p>
            </div>
            <div>
              <h2 className="font-semibold  text-3xl text-yellow-950 m-0">
              {sanitizeContent(details && details.Statistics.section4header)}
              </h2>
              <p className="text-yellow-950">{sanitizeContent(details && details.Statistics.section4paragraphy)}</p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="services"
        className="relative font-jak bg-gray-100 px-4 pt-4 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute left-0 top-[-50px] md:top-[-30px] w-full h-[100px] md:h-[50px] bg-no-repeat bg-left-top bg-cover"></div>

        {/* Floating Image */}
        <div className="absolute left-0 top-[-130px] lg:top-[-90px] hidden md:block">
          <img
            src=""
            alt="Floating Image"
            className="transition-transform translate-y-[50px] will-change-transform"
            onLoad={(e) =>
              (e.currentTarget.style.transform = "translateY(-50px)")
            }
          />
        </div>

        <div className="flex flex-col h-full py-4 px-4 lg:px-20">
          {/* Title Section */}
          <div className="text-center mb-6">
            <h2 className="font-jak text-4xl font-bold text-gray-800">
              Our Services
            </h2>
          </div>

          {/* Service Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="text-center px-12 lg:px-8 py-10 border-gray-200"
              >
                <div className="relative mb-6 ">
                  {/* <img
                    src={service.serviceImage}
                    className="rounded-md"
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
                    #{service.price}
                  </span>
                </div>
                <div className="bg-gray-800 hover:bg-gray-600  rounded-lg text-white py-2">
                  <a
                    href="#"
                    onClick={handleModalOpen}
                    className="flex justify-center items-center gap-2 text-sm"
                  >
                    Book Service <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>

         
          
        </div>
      </section>
      {/* <section
        id="services"
        className="px-4 py-12 bg-white border-b font-jak border-gray-200"
      >
        <div className="max-w-7xl mx-auto">
        
          <div className="text-center mb-10">
            <span className="text-lg uppercase font-jak font-bold tracking-wider ">
              Services Description
            </span>
            <h3 className="mt-2 font-jak text-2xl font-normal text-gray-700 tracking-tight">
              Service Header
            </h3>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: "https://dummyimage.com/400x400/aaa/fff",
                title: "Service Title",
                description: "Service Description",
              },
              {
                img: "https://dummyimage.com/400x400/aaa/fff",
                title: "Service Title",
                description: "Service Description",
              },
              {
                img: "https://dummyimage.com/400x400/aaa/fff",
                title: "Service Title",
                description: "Service Description",
              },
              {
                img: "https://dummyimage.com/400x400/aaa/fff",
                title: "Service Title",
                description: "Service Description",
              },
              {
                img: "https://dummyimage.com/400x400/aaa/fff",
                title: "Service Title",
                description: "Service Description",
              },
              {
                img: "https://dummyimage.com/400x400/aaa/fff",
                title: "Service Title",
                description: "Service Description",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-72 md:h-56 overflow-hidden group">
                  <a
                    href="#contact"
                    className="relative block w-full h-full overflow-hidden group"
                  >
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
                    />
                  </a>

                  <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href="#contact"
                      className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center"
                    >
                      <FaArrowRight className="text-white text-3xl" />
                    </a>
                  </div>
                </div>

                <div className="p-6 text-center">
                  <h5 className="text-lg  font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h5>
                  <p className="text-gray-500">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section
        id="pricing"
        className="font-jak px-4 bg-very-light-gray relative py-10"
      >
        <div className="flex flex-col h-full  py-4 px-4 lg:px-20">
          <div className="row mb-6">
            <div className="col-12 text-center">
              <h2 className="font-jak text-4xl font-bold text-gray-800">
                Pricing list
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:mb-2">
            {services.map((item, index) => (
              <div
                key={index}
                className={`col ${
                  item.special ? "border border-light-gray rounded" : ""
                } p-0`}
              >
                <div
                  className={`w-full px-8 py-4 ${
                    item.special ? "bg-light-gray text-dark-gray" : ""
                  }`}
                >
                  <div className="text-lg flex items-baseline w-full">
                    <span className="font-bold text-dark-gray flex-grow">
                    {item.name}
                    </span>
                    <div className="text-dark-gray">#{item.price}</div>
                  </div>
                  <div className="text-md flex items-baseline w-full">
                    <span className="font-bold text-dark-gray flex-grow w-16">
                      <p>{item.shortDescription}</p>
                    </span>
                    <div className="rounded bg-gray-600 hover:bg-gray-500 text-white py-2 px-2 ">
                      <a
                        onClick={handleModalOpen}
                        className="flex justify-center text-center items-center gap-2 text-sm"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {/* <section id="gallery" className="px-6 pb-8 bg-gray-50 relative">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-20">
          <div className="w-full flex justify-center py-6">
            <h2 className="font-jak text-4xl font-bold text-gray-800">
              Gallery Section
            </h2>
          </div>

          {imageChunks.map((chunk, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-center items-center gap-6 mb-8"
            >
              {chunk.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full sm:w-1/2 md:w-3/12 transition-transform transform hover:scale-105"
                >
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={img}
                      className="w-full h-64 object-cover transition-transform duration-300 ease-in-out"
                      alt={`Gallery Image ${idx + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section> */}

      <section
        id="works"
        className="bg-gray-500 font-Urbanist py-10 px-4 lg:px-32 lg:py-32  overflow-hidden"
      >
        <div className=" mb-8">
          <h2 className="text-sm uppercase tracking-wide text-white">
            Gallery
          </h2>
          <h1 className="text-4xl font-bold text-white">Our Superb Works</h1>
        </div>
        <div className="container mx-auto">
          <div className=" relative px-10 sm:px-0 text-center md:text-left">
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
              <SwiperSlide>
                <div className="relative bg-yellow-800 rounded-lg overflow-hidden h-80">
                  <img
                    src={details.Gallery.image1}
                    className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative bg-yellow-800 rounded-lg overflow-hidden h-80">
                  <img
                    src={details.Gallery.image2}
                    className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative bg-yellow-800 rounded-lg overflow-hidden h-80">
                  <img
                    src={details.Gallery.image3}
                    className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative bg-yellow-800 rounded-lg overflow-hidden h-80">
                  <img
                    src={details.Gallery.image4}
                    className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative bg-yellow-800 rounded-lg overflow-hidden h-80">
                  <img
                    src={details.Gallery.image5}
                    className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative bg-yellow-800 rounded-lg overflow-hidden h-80">
                  <img
                    src={details.Gallery.image6}
                    className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
      <section
        className="font-jak px-4 py-10 bg-gray-100 relative"
        id="testimonials"
      >
        <div
          className="absolute left-0 top-[-50px] md:top-[-30px] sm:top-[-25px] xs:top-[-15px] bg-cover w-full h-[100px]"
          style={{
            backgroundImage: `url('')`,
          }}
        ></div>

        <div className="container mx-auto">
          <div className="w-full flex justify-center mb-6 lg:mb-10">
            <h2 className="font-jak text-4xl  font-bold text-gray-800">
              Testimonial Section
            </h2>
          </div>

          <div className="container mx-auto">
            <div className=" relative px-5 sm:px-0 text-center md:text-left">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {/* Start testimonial item */}
                <SwiperSlide>
                  <div className="text-center">
                    <span className="text-xl leading-8 block mb-2">
                    {sanitizeContent(details && details.Reviews.summary1)}
                    </span>
                    <span className="text-lg font-bold text-gray-700 py-3">
                    {sanitizeContent(details && details.Reviews.title1)}
                    </span>
                  </div>
                </SwiperSlide>
                {/* End testimonial item */}
                {/* Start testimonial item */}
                <SwiperSlide>
                  <div className="text-center">
                    <span className="text-xl leading-8 block mb-2">
                    {sanitizeContent(details && details.Reviews.summary2)}
                    </span>
                    <span className="text-lg font-bold text-gray-700 py-3">
                    {sanitizeContent(details && details.Reviews.header2)}
                    </span>
                  </div>
                </SwiperSlide>
                {/* End testimonial item */}
                {/* Start testimonial item */}
                <SwiperSlide>
                  <div className="text-center">
                    <span className="text-xl leading-8 block mb-2">
                    {sanitizeContent(details && details.Reviews.summary3)}
                    </span>
                    <span className="text-lg font-bold text-gray-700 py-3">
                    {sanitizeContent(details && details.Reviews.header3)}
                    </span>
                  </div>
                </SwiperSlide>
                <div
                  className="autoplay-progress mt-20"
                  slot="container-end"
                  ref={progressCircle}
                >
                  <span ref={progressContent}></span>
                </div>
                {/* End testimonial item */}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <section className="font-jak px-4 py-4 lg:pb-10 bg-gray-100 relative">
        <div
          className="absolute left-0 top-[-50px] md:top-[-30px] sm:top-[-25px] xs:top-[-15px] bg-cover w-full h-[100px]"
          style={{
            backgroundImage: "url('images/demo-barber-home-bg-up.png')",
          }}
        ></div>
      </section>
      <div id="team" className="font-jak flex flex-col p-4 lg:px-32  lg:py-24 ">
        {/* Section Header */}
        <div className="flex justify-center mb-3">
          <div className="text-center">
            <span className="font-semibold tracking-[1px] text-base uppercase text-gray-500 mb-1 block">
            {sanitizeContent(details && details.Blog.image1)}
            </span>
            <h2 className="font-semibold  text-gray-800 text-3xl">
            {sanitizeContent(details && details.Blog.header1)}
            </h2>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="relative rounded-md overflow-hidden mb-8">
              <img
                src={details && details.Team.image1}
                className="h-100 w-100"
                alt="Bryan Johnson"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg"> {sanitizeContent(details && details.Team.header1)}</h3>
            <p>{sanitizeContent(details && details.Team.summary1)}</p>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="relative rounded-md overflow-hidden mb-8">
              <img
                src={details && details.Team.image2}
                alt="Jeremy Dupont"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">{sanitizeContent(details && details.Team.header2)}</h3>
            <p>{sanitizeContent(details && details.Team.summary2)}</p>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="relative rounded-md overflow-hidden mb-8">
              <img
                src={details && details.Team.image3}
                alt="Matthew Taylor"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">{sanitizeContent(details && details.Team.header3)}</h3>
            <p>{sanitizeContent(details && details.Team.summary3)}</p>
          </div>

          {/* Team Member 4 */}
          <div className="text-center">
            <div className="relative rounded-md overflow-hidden mb-8">
              <img
                src={details && details.Team.image1}
                alt="Johncy Parker"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">{sanitizeContent(details && details.Team.header4)}</h3>
            <p>{sanitizeContent(details && details.Team.summary4)}</p>
          </div>
        </div>
      </div>
      <section className="font-jak relative z-10 pb-0 bg-gray-100">
        <div className="flex flex-col py-4 px-4 lg:px-32 lg:py-20">
          <div className="flex flex-wrap">
            <div className="lg:w-1/2 s:w-10/12 pb-7 sm:pb-10 px-6">
              <span className="font-lime text-base uppercase text-dark   font-bold mb-2 inline-block">
              {sanitizeContent(details && details.contactUs.heading1)}
              </span>
              <h2 className="font-jak text-2xl font-normal text-gray-600 tracking-normaler w-4/5 lg:w-full mb-10 sm:mb-8">
              {sanitizeContent(details && details.contactUs.heading2)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 mb-8 xs:mb-6">
  

                <div>
                  <span className="font-primary text-lg font-semibold text-dark-gray">
                  {sanitizeContent(details && details.contactUs.heading3)}
                  </span>
                  <div className="h-px w-4/5 sm:w-full bg-dark-gray mt-2 mb-2"></div>
                  <div className="w-full">
                    <p className="font-primary w-3/4 lg:w-11/12">
                      {userDetails &&
                        userDetails.address &&
                        userDetails.address}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
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
                            className="hover:text-medium-gray text-gray-600"
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
                            className="hover:text-medium-gray text-gray-600"
                          >
                            Facebook Handle
                          </a>
                        </span>
                      </div>
                    </div>
                  )}

                <div>
                  <span className="font-primary text-lg font-semibold text-dark-gray">
                  {sanitizeContent(details && details.contactUs.heading4)}
                  </span>
                  <div className="h-px w-4/5 sm:w-full bg-dark-gray mt-2 mb-2"></div>
                  <div className="w-full">
                    <span className="font-primary block">
                      <span className="font-primary font-semibold text-dark-gray">
                      {sanitizeContent(details && details.contactUs.heading5)}
                      </span> 
                    </span>
                    <span className="font-primary block">
                      <span className="font-primary font-semibold text-dark-gray">
                      {sanitizeContent(details && details.contactUs.heading6)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-5/12 sm:w-auto sm:mb-12 px-5" id="book">
              <div className="bg-dark-gray shadow-lg lg:p-10 rounded-lg xs:m-4 relative overflow-hidden">
                <h2 className="font-jak text-2xl text-gray-600 xs:mb-4  tracking-normal">
                  We're open to your feedbacks!
                </h2>
                <form
                  action="email-templates/contact-form.php"
                  method="post"
                  className=""
                >
                  <div className="relative mb-2">
                    <input
                      className="p-2 border-0 rounded-none text-lg bg-transparent border-transparent placeholder-medium-gray w-full"
                      type="text"
                      name="name"
                      placeholder="Enter your name*"
                      required
                    />
                  </div>
                  <div className="relative mb-2">
                    <input
                      className="p-2 border-0 rounded-none text-lg bg-transparent border-transparent placeholder-medium-gray w-full"
                      type="email"
                      name="email"
                      placeholder="Enter your email address*"
                      required
                    />
                  </div>
                  <div className="relative mb-2">
                    <textarea
                      className="p-2 border-0 rounded-none text-lg bg-transparent border-transparent placeholder-medium-gray w-full"
                      name="service"
                      placeholder="What aspect will you like us to improve?"
                      rows={2}
                      required
                    />
                  </div>
                  <div className="relative mb-3">
                    <textarea
                      className="p-2 border-0 rounded-none text-lg bg-transparent border-transparent placeholder-medium-gray w-full"
                      name="message"
                      placeholder="Please tell us more about that!"
                      rows={4}
                    />
                  </div>
                  <button
                    className="inline-flex items-center text-white bg-gray-500 hover:bg-gray-600 text-lg px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
                    type="submit"
                  >
                    Submit
                  </button>
                  <div className="form-results mt-5 hidden"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <footer
        className="font-jak relative px-4 py-4 lg:py-20 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(https://dummyimage.com/1280x400/fff/aaa)`,
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div className="text-center md:w-10/12">
              <a
                href="demo-barber.html"
                className="relative z-10 inline-block mb-4"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s"
                  alt="font-jak Logo"
                  className="mx-auto"
                />
              </a>
              <span className="block font-jak  text-black opacity-40 mt-[10px] mb-8 text-2xl xs:text-xl tracking-normal xs:tracking-normaler">
                Business Name
              </span>
              {userDetails &&
                userDetails.socialMedia &&
                userDetails.socialMedia.length > 0 && (
                  <div className="mb-8">
                    <ul className="flex justify-center space-x-6">
                      <li>
                        <a
                          className="text-black hover:text-blue-600"
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaFacebookF className="w-6 h-6" />
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-black hover:text-blue-600"
                          href="https://www.instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaInstagram className="w-6 h-6" />
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-black hover:text-blue-600"
                          href="https://www.twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaTwitter className="w-6 h-6" />
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              <p className="mb-0 text-black text-base">
                &copy; 2024 Proudly powered by{" "}
                <a
                  href="https://www.dimpified.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-black hover:text-gray-300"
                >
                  DIMP
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer> */}
      <WhiteContactForm ecosystemDomain={subdomain} />
      <footer className="beauty font-jak px-4 bg-gradient-to-r from-[#2c3846] via-[#333945] to-[#5b5857] ">
        <div className="flex flex-col lg:flex-row justify-center lg:px-32 pt-[55px] pb-[55px] sm:pt-[40px] sm:pb-[40px] text-center sm:text-center lg:text-left">
          {/* Footer Logo */}
          <div className="lg:w-1/4 md:w-1/2 sm:w-full mb-6">
            <a href="#home" className="footer-logo inline-block mb-4">
              <img
                src={details && details.footer.logo}
                alt="Logo"
                width="100"
                height="42"
                className="mx-auto lg:mx-0"
              />
            </a>
          </div>

          {/* Get in Touch */}
          <div className="lg:w-1/4 md:w-1/2 sm:w-full mb-6">
            <span className="primary-font  block text-white text-sm mb-[5px] uppercase font-semibold">
            {sanitizeContent(details && details.footer.title2)}
            </span>
            <p className="primary-font  leading-[30px] text-white">{sanitizeContent(details && details.footer.title3)}</p>
          </div>

          {/* Need Support */}
          <div className="lg:w-1/4 md:w-1/2 sm:w-full mb-6">
            <span className="primary-font block text-white  text-sm mb-[5px] uppercase  font-semibold">
            {sanitizeContent(details && details.footer.title4)}
            </span>
            <a href="tel:1800222000" className="text-white  block">
            {sanitizeContent(details && details.footer.paragraph2)}
            </a>
            <a  className="text-white  block">
            {sanitizeContent(details && details.footer.paragraph1)}
            </a>
          </div>

          {/* Connect with Us */}
          <div className="lg:w-1/4 md:w-1/2 sm:w-full mb-6">
            <span className="primary-font block text-white  text-sm mb-[10px] uppercase  font-semibold">
            {sanitizeContent(details && details.footer.paragraph3)}
            </span>
            <div className="elements-social text-2xl social-icon-style-09">
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

        {/* Bottom Section */}
        <div className=" pt-[20px] pb-[20px] border-t border-gray-300 text-center text-white">
          <nav className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-8 text-lg gap-0">
            <a href="#home" className="mx-2 sm:mx-4 text-white">
              Home
            </a>
            <a href="#about" className="mx-2 sm:mx-4 text-white">
              About
            </a>
            <a href="#services" className="mx-2 sm:mx-4 text-white">
              Services
            </a>
            <a href="#pricing" className="mx-2 sm:mx-4 text-white">
              Pricing
            </a>
            <a
              href="demo-beauty-salon-wedding.html"
              className="mx-2 sm:mx-4 text-white"
            >
              Gallery
            </a>
            <a
              href="demo-beauty-salon-review.html"
              className="mx-2 sm:mx-4 text-white"
            >
              Reviews
            </a>
            <a href="#team" className="mx-2 sm:mx-4 text-white">
              Team
            </a>
            <a href="#contact" className="mx-2 sm:mx-4 text-white">
              Contact
            </a>
          </nav>
          <p className="text-white mt-4 text-sm sm:text-base">
            © 2024 Proudly Powered by{" "}
            <a
              href="https://www.dimpified.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white"
            >
              Dimpified from GFA Technologies
            </a>
          </p>
        </div>
      </footer>
    </Fragment>
  );
};

export default BlankTemplate;
