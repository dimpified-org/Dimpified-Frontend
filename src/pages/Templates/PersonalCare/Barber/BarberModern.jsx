import React, { useRef, Fragment, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { barber } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaRegCalendarAlt,
  FaMouse,
  FaArrowRight,
} from "react-icons/fa";

const BarberMordern = ({ userDetails }) => {
  // List of images
  const images = [
    "https://gfa-tech.com/dimp-template-images/barber/hair.jpg",
    "https://gfa-tech.com/dimp-template-images/barber/dye.jpeg",
    "https://gfa-tech.com/dimp-template-images/barber/plait.jpg",
    "https://gfa-tech.com/dimp-template-images/barber/weaving.jpg",
    "https://gfa-tech.com/dimp-template-images/barber/fade.jpg",
    "https://gfa-tech.com/dimp-template-images/barber/barb.jpg",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
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
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  return (
    <Fragment>
      {/* Navbar Section */}

      <nav className="font-sen bg-white px-4 py-4 lg:px-10  w-full z-50">
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
                Hair Services
              </a>
              <a
                href="#gallery"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </a>
              <a
                href="#pricing"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </a>
              <button
                onClick={handleModalOpen}
                className="px-8 py-4 rounded-full shadow-lg text-black bg-white hover:bg-yellow-500 flex items-center justify-center gap-2"
              >
                <span className="font-semibold hover:text-gray-100">
                  Online appointment
                </span>
                <FaRegCalendarAlt />
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
              Hair Services
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
              href="#testimonials"
              className="font-semibold text-base hover:text-gray-700"
            >
              Reviews
            </a>
          </div>
          <button
            onClick={handleModalOpen}
            className="px-8 py-4 rounded-full shadow-lg text-white bg-yellow-600 hover:bg-gray-500 flex items-center justify-center gap-2"
          >
            <span className="font-semibold hover:text-gray-100">
              Online appointment
            </span>
            <FaRegCalendarAlt />
          </button>
        </div>
      </nav>

      {/* Home Section */}
      <section
        id="home"
        className="relative font-sen px-4 h-screen bg-dark-gray"
        style={{
          backgroundImage: `url(https://gfa-tech.com/dimp-template-images/barber/bg-barbers.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-lvh flex flex-col items-center justify-center">
          <div className="text-center">
            <span className="text-lg text-white uppercase tracking-wider block mb-6 sm:mb-4">
              BEST HAIRCUTS AND TREATMENTS
            </span>
            <h1 className="font-limelight text-[2rem] lg:text-[6rem] px-4 lg:px-48 leading-none tracking-normal text-white mb-8 md:mb-5 shadow-lg">
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}
              <br />
              barber studio
            </h1>
            <div className="flex items-center justify-center">
              <button
                onClick={handleModalOpen}
                className="px-8 py-4 rounded-full shadow-lg text-black bg-white hover:bg-yellow-500 flex items-center justify-center gap-2"
              >
                <span className="font-semibold hover:text-gray-100">
                  Online appointment
                </span>
                <FaRegCalendarAlt />
              </button>
              {isModalOpen && (
                <BookingModal
                  isOpen={isModalOpen}
                  handleClose={handleModalClose}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-4 font-sen bg-yellow-50 relative pb-8">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-32">
          <div className="flex flex-wrap items-center mb-12 sm:mb-10">
            {/* Text Section */}
            <div className="font-sen w-full xl:w-5/12 lg:w-6/12 mt-4 xl:mt-6 md:mt-8 xs:mt-10">
              <h2 className="font-limelight text-5xl font-light tracking-normal text-gray-800 mb-4">
                Award{" "}
                <span className="relative text-yellow-500">
                  winning
                  <span className="absolute bg-yellow-500 h-1 w-full bottom-2 left-0"></span>
                </span>{" "}
                barbershop.
              </h2>
              <p className="w-11/12 xl:w-full mb-8 sm:mb-6">
                {userDetails && userDetails.ecosystemDescription
                  ? userDetails.ecosystemDescription
                  : ""}
              </p>

              <div className="inline-block">
                <a
                  href="#services"
                  className="inline-flex items-center text-white bg-yellow-500 hover:bg-yellow-600 text-lg px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
                >
                  Explore Services
                  <FaArrowRight className="ml-2" />
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-6/12 xl:pl-8 relative mt-12 md:mt-10">
              <div className="relative w-9/12 md:w-7/12 transition-transform transform hover:scale-105">
                <img
                  src="https://gfa-tech.com/dimp-template-images/barber/barb.jpg"
                  className="rounded-lg  w-auto"
                  alt="font-sen Studio"
                />
              </div>
              <div className="absolute right-4 -bottom-16 w-8/12 lg:w-7/12 overflow-hidden rounded-lg shadow-xl">
                <img
                  src="https://gfa-tech.com/dimp-template-images/barber/hair.jpg"
                  alt="font-sen's Work"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section
        id="services"
        className="relative font-sen bg-yellow-100 px-4 pt-4 overflow-hidden"
      >
       
        <div
          className="absolute left-0 top-[-50px] md:top-[-30px] w-full h-[100px] md:h-[50px] bg-no-repeat bg-left-top bg-cover"
          style={{ backgroundImage: `url(images/demo-barber-home-bg-up.png)` }}
        ></div>

        
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

        <div className="flex flex-col h-full py-4 px-4 lg:px-20">
         
          <div className="text-center mb-6">
            <h2 className="font-limelight text-4xl font-bold text-gray-800">
              Barbershop{" "}
              <span className=" relative text-yellow-600">
                services
                <span className="block w-full h-[2px] bg-yellow-600 absolute bottom-[-8px] left-0"></span>
              </span>
            </h2>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {barber.map((service, index) => (
              <div
                key={index}
                className="text-center px-12 lg:px-8 py-10 border-gray-200"
              >
                <div className="relative mb-6 ">
                  <img
                    src={service.serviceImage}
                    className="rounded-md"
                    alt={service.name}
                  />
                </div>
                <span className="text-lg font-semibold text-gray-800 block mb-2">
                  {service.name}
                </span>
                <p className="leading-7 text-gray-600">
                  {service.shortDescription}
                </p>
                <div className="border-t border-b border-gray-200 py-2 my-4">
                  <span className="text-sm font-bold text-gray-800">
                    Starting from #{" "}
                    {getFormattedPrice(service.price, countryCode)}
                  </span>
                </div>
                <div className="bg-gray-800 hover:bg-yellow-600 text-white py-2">
                  <a
                    href="#"
                    onClick={handleModalOpen}
                    className="flex justify-center items-center gap-2 text-sm"
                  >
                    Request an appointment{" "}
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>

          
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
      </section> */}

      {/* <section
        id="pricing"
        className="font-sen px-4 bg-very-light-yellow relative py-10"
      >
        <div className="flex flex-col h-full  py-4 px-4 lg:px-20">
          <div className="row mb-6">
            <div className="col-12 text-center">
              <h2 className="font-limelight text-4xl font-bold text-gray-800">
                Flexible{" "}
                <span className=" relative text-yellow-600">
                  pricing
                  <span className="block w-full h-[2px] bg-yellow-600 absolute bottom-[-8px] left-0"></span>
                </span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:mb-2">
            {barber.map((item, index) => (
              <div
                key={index}
                className={`col ${
                  item.special ? "border border-light-yellow rounded" : ""
                } p-0`}
              >
                <div
                  className={`w-full px-8 py-4 ${
                    item.special ? "bg-light-yellow text-dark-gray" : ""
                  }`}
                >
                  <div className="text-lg flex items-baseline w-full">
                    <span className="font-bold text-dark-gray flex-grow">
                      {item.name}
                    </span>
                    <div className="text-dark-gray">#{item.price}</div>
                  </div>
                  <div className="text-md flex items-baseline w-full">
                    <span className="font-bold text-dark-gray flex-grow">
                      <p>{item.shortDescription}</p>
                    </span>
                    <div className="rounded bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-2 ">
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
      </section> */}

      {/* Gallery Section */}
      <section id="gallery" className="px-6 pb-8 bg-yellow-50 relative">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-20">
          <div className="w-full flex justify-center py-6">
            <h2 className="font-limelight text-4xl font-bold text-gray-800">
              Featured{" "}
              <span className=" relative text-yellow-600">
                gallery
                <span className="block w-full h-[2px] bg-yellow-600 absolute bottom-[-8px] left-0"></span>
              </span>
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
      </section>
      <section
        className="font-sen px-4 py-10 bg-yellow-100 relative"
        id="testimonials"
      >
        <div
          className="absolute left-0 top-[-50px] md:top-[-30px] sm:top-[-25px] xs:top-[-15px] bg-cover w-full h-[100px]"
          style={{
            backgroundImage: `url('https://gfa-tech.com/dimp-template-imags/images/demo-barber-home-bg-up.png')`,
          }}
        ></div>

        <div className="container mx-auto">
          <div className="w-full flex justify-center mb-6 lg:mb-10">
            <h2 className="font-limelight text-4xl  font-bold text-gray-800">
              Satisfied{" "}
              <span className=" relative text-yellow-600">
                customers
                <span className="block w-full h-[2px] bg-yellow-600 absolute bottom-[-8px] left-0"></span>
              </span>
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
                    <span className="text-xl ov leading-8 block mb-6">
                      I’ve been coming to this barbershop for years, and they
                      never disappoint! The barbers are friendly, and they
                      always give me the perfect cut. I always leave here
                      feeling confident and looking sharp. Highly recommend!
                    </span>
                    <span className="text-lg font-bold text-gray-700 py-3">
                      Oluwatomiwa B.
                    </span>
                  </div>
                </SwiperSlide>
                {/* End testimonial item */}
                {/* Start testimonial item */}
                <SwiperSlide>
                  <div className="text-center">
                    <span className="text-xl leading-8 block mb-2">
                      The attention to detail here is amazing! They listen to
                      what you want and deliver exactly that. I was impressed by
                      the professionalism and the clean environment. Definitely
                      my go-to barbershop from now on!
                    </span>
                    <span className="text-lg font-bold text-gray-700 py-3">
                      Micheal S.
                    </span>
                  </div>
                </SwiperSlide>
                {/* End testimonial item */}
                {/* Start testimonial item */}
                <SwiperSlide>
                  <div className="text-center">
                    <span className="text-xl leading-8 block mb-2">
                      Excellent service with a personal touch. The barbers are
                      very skilled, and they ensure you leave satisfied. From my
                      first visit, I knew this was the place for me. I
                      appreciate their commitment to quality.
                    </span>
                    <span className="text-lg font-bold text-gray-700 py-3">
                      Abdul-Razaq O.
                    </span>
                  </div>
                </SwiperSlide>
                <div
                  className="autoplay-progress"
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
      <section className="font-sen px-4 py-4 lg:pb-10 bg-yellow-100 relative">
        <div
          className="absolute left-0 top-[-50px] md:top-[-30px] sm:top-[-25px] xs:top-[-15px] bg-cover w-full h-[100px]"
          style={{
            backgroundImage: "url('images/demo-barber-home-bg-up.png')",
          }}
        ></div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-6 counter-style-04">
            {/* Start counter item */}
            <div className="text-center">
              <h2 className="text-4xl font-limelight font-bold text-gray-800 mb-0">
                100+
              </h2>
              <span className="text-lg text-gray-700 block">
                Haircuts per week
              </span>
            </div>
            {/* End counter item */}

            {/* Start counter item */}
            <div className="text-center">
              <h2 className="text-4xl font-limelight font-bold text-gray-800 mb-0">
                50+
              </h2>
              <span className="text-lg text-gray-700 block">
                shavings per week
              </span>
            </div>
            {/* End counter item */}

            {/* Start counter item */}
            <div className="text-center">
              <h2 className="text-4xl font-limelight font-bold text-gray-800 mb-0">
                20+
              </h2>
              <span className="text-lg text-gray-700 block">
                Custom Styles created per week
              </span>
            </div>
            {/* End counter item */}

            {/* Start counter item */}
            <div className="text-center">
              <h2 className="text-4xl font-limelight font-bold text-gray-800 mb-0">
                500+
              </h2>
              <span className="text-lg text-gray-700 block">
                Loyal Customers
              </span>
            </div>
            {/* End counter item */}
          </div>
        </div>
      </section>
      <section className="font-sen relative z-10 pb-0">
        <div className="flex flex-col py-4 px-4 lg:px-32 lg:py-20">
          <div className="flex flex-wrap">
            <div className="lg:w-1/2 s:w-10/12 pb-7 sm:pb-10 px-6">
              <span className="font-lime text-base uppercase text-dark   font-bold mb-2 inline-block">
                Feel free to contact us.
              </span>
              <h2 className="font-limelight text-2xl font-normal text-yellow-600 tracking-normaler w-4/5 lg:w-full mb-10 sm:mb-8">
                Your looking good is our priority.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 mb-8 xs:mb-6">
                {/* <div className="last-paragraph-no-margin xs:mb-6">
                  <span className="font-primary text-lg font-semibold text-dark-gray">
                    Meet our CEO
                  </span>
                  <div className="h-px w-4/5 sm:w-full bg-dark-gray mt-2 mb-2"></div>
                  <p className="font-primary w-3/4 lg:w-11/12">
                    Oluwaseun Owolabi
                  </p>
                </div> */}

                <div>
                  <span className="font-primary text-lg font-semibold text-dark-gray">
                    Visit our barbing salon
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

                <div>
                  <span className="font-primary text-lg font-semibold text-dark-gray">
                    Opening hours
                  </span>
                  <div className="h-px w-4/5 sm:w-full bg-dark-gray mt-2 mb-2"></div>
                  <div className="w-full">
                    <span className="font-primary block">
                      <span className="font-primary font-semibold text-dark-gray">
                        Mon - Fri:
                      </span>{" "}
                      09 am to 08 pm
                    </span>
                    <span className="font-primary block">
                      <span className="font-primary font-semibold text-dark-gray">
                        Sat - Sun:
                      </span>{" "}
                      09 am to 06 pm
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-5/12 sm:w-auto sm:mb-12 px-5" id="book">
              <div className="bg-dark-gray shadow-lg lg:p-10 rounded-lg xs:m-4 relative overflow-hidden">
                <h2 className="font-limelight text-2xl text-yellow-600 xs:mb-4  tracking-normal">
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
                    className="inline-flex items-center text-white bg-yellow-500 hover:bg-yellow-600 text-lg px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
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
      <footer
        className="font-sen relative px-4 py-4 lg:py-20 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(https://gfa-tech.com/dimp-template-images/images/demo-barber-home-footer-bg.jpg)`,
        }}
      >
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div className="text-center md:w-10/12">
              <a
                href="demo-barber.html"
                className="relative z-10 inline-block mb-4"
              >
                <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
              </a>
              <span className="block font-limelight  text-gray-50 opacity-40 mt-[10px] mb-8 text-2xl xs:text-xl tracking-normal xs:tracking-normaler">
                Award winning barber studio
              </span>
              {userDetails &&
                userDetails.socialMedia &&
                userDetails.socialMedia.length > 0 && (
                  <div className="mb-8">
                    <ul className="flex justify-center space-x-6">
                      <li>
                        <a
                          className="text-gray-50 hover:text-blue-600"
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaFacebookF className="w-6 h-6" />
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-gray-50 hover:text-blue-600"
                          href="https://www.instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaInstagram className="w-6 h-6" />
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-gray-50 hover:text-blue-600"
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
              <p className="mb-0 text-gray-100 text-base">
                © {new Date().getFullYear()} Proudly powered by{" "}
                <a
                  href="https://www.dimpified.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-white hover:text-gray-300"
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

export default BarberMordern;
