import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

const FirstSpa = ({ details, subdomain, userDetails }) => {
  const [activeIndex, setActiveIndex] = useState(0);
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
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [timeLeft, setTimeLeft] = useState({
    days: 350,
    hours: 30,
    minutes: 50,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                clearInterval(timer);
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      title: details && details.Events.section1header,
      description: details && details.Events.section1paragraphy,
      icon: details && details.Events.buttonText1,
      image: details && details.Events.sectionImage1,
    },
    {
      title: details && details.Events.section2header,
      description: details && details.Events.section2paragraphy,
      icon: details && details.Events.buttonText2,
      image: details && details.Events.sectionImage2,
    },
    {
      title: details && details.Events.section3header,
      description: details && details.Events.section3paragraphy,
      icon: details && details.Events.buttonText3,
      image: details && details.Events.sectionImage3,
    },
  ];

  const products = [
    {
      id: 1,
      image: details && details.Gallery.image1,
    },
    {
      id: 2,
      image: details && details.Gallery.image2,
    },
    {
      id: 3,
      image: details && details.Gallery.image3,
    },
    {
      id: 4,
      image: details && details.Gallery.image4,
    },
  ];

  const testimonials = [
    {
      text: details && details.Reviews.summary1,
      name: details && details.Reviews.title1,
      designation: details && details.Reviews.header1,
    },
    {
      text: details && details.Reviews.summary2,
      name: details && details.Reviews.title2,
      designation: details && details.Reviews.header2,
    },
    {
      text: details && details.Reviews.summary3,
      name: details && details.Reviews.title3,
      designation: details && details.Reviews.header3,
    },
  ];

  const teamMembers = [
    {
      name: details && details.Team.summary1,
      role: details && details.Team.header1,
    },
    {
      name: details && details.Team.summary2,
      role: details && details.Team.header2,
    },
    {
      name: details && details.Team.summary3,
      role: details && details.Team.header3,
    },
    {
      name: details && details.Team.summary4,
      role: details && details.Team.header4,
    },
  ];

  const funFacts = [
    {
      value: details && details.Statistics.section1header,
      label: details && details.Statistics.section1paragraphy,
    },
    {
      value: details && details.Statistics.section2header,
      label: details && details.Statistics.section2paragraphy,
    },
    {
      value: details && details.Statistics.section3header,
      label: details && details.Statistics.section3paragraphy,
    },
    {
      value: details && details.Statistics.section4header,
      label: details && details.Statistics.section4paragraphy,
    },
  ];

  return (
    <div className="bg-gray-100">
      <>
        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
          <div className="container mx-auto px-8 lg:px-12 py-4 flex justify-between items-center">
            {/* Logo */}
            <a href="#" className="flex items-center text-gray-800">
              <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
              <span className="text-xs leading-tight">
                {userDetails && userDetails.ecosystemName} <br />
                <span className="text-yellow-600">Beauty and Spa</span>
              </span>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 text-gray-800 font-medium">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-blue-600 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-800 focus:outline-none"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden fixed top-16 left-0 w-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5 pointer-events-none"
            }`}
          >
            <ul className="space-y-4 p-6 text-gray-800 font-medium">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <button
                onClick={handleModalOpen}
                className="mt-6 px-4 lg:px-6 py-2 lg:py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition"
              >
                BOOK NOW
              </button>
            </ul>
          </div>
        </nav>
      </>

      <section
        id="home"
        className="relative w-full md:min-h-screen h-[70] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
        }}
      >
        {/* Hero Content */}
        <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center text-center lg:text-left">
          {/* Left Content */}
          <div className="lg:w-1/2 md:mt-0 mt-40">
            <p className="text-black italic text-sm lg:text-lg">
              {sanitizeContent(details && details.hero.title1)}
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-1000 mt-2 leading-tight">
              {sanitizeContent(details && details.hero.title2)}
            </h1>
            <p className="text-gray-900 mt-4 text-sm lg:text-base">
              {sanitizeContent(details && details.hero.summary1)}
            </p>
            <button
              onClick={handleModalOpen}
              className="mt-6 px-4 lg:px-6 py-2 lg:py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition"
            >
              {sanitizeContent(details && details.hero.buttonText1)}
            </button>

            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
                information={eServices}
                subdomain={subdomain}
                serviceCurrency={currency}
              />
            )}
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 mt-6 lg:mt-0 relative flex justify-center">
            <img
              src="https://gfa-tech.com/dimp-template-images/spa/slide2-2-removebg-preview.png"
              alt="Beauty Spa"
              className="w-[280px] lg:w-[600px] max-w-full max-h-[400px] lg:max-h-[600px]"
            />
          </div>
        </div>
      </section>
      <section id="services" className="relative py-16 bg-gray-100 ">
        {/* Decorative Images */}
        <img
          src="https://i.imghippo.com/files/TLI6303dI.jpg"
          alt="Decorative Left"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-20 opacity-50 hidden md:block"
        />
        <img
          src="https://i.imghippo.com/files/bTmw4851HL.jpg"
          alt="Decorative Right"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-20 opacity-50 hidden md:block"
        />

        {/* Services Content */}
        <div className="lg:px-40 px-6">
          {/* Header */}
          <div className="text-center">
            <span className="text-lg text-yellow-600 font-semibold">
              {sanitizeContent(details && details.Events.heading)}
            </span>
            <h2 className="text-4xl font-bold mt-2">
              {sanitizeContent(details && details.Events.summary)}
            </h2>
          </div>

          {/* Services Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden h-full flex flex-col transform transition-transform duration-300 hover:scale-105"
              >
                <div className="p-6 flex-grow flex flex-col items-center text-center">
                  <img
                    src={service.icon}
                    alt="Service Icon"
                    className="w-12 mb-4"
                  />
                  <h3 className="text-xl font-semibold">
                    {sanitizeContent(service.title)}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {sanitizeContent(service.description)}
                  </p>
                </div>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="relative py-16 bg-white">
        <div className="w-full lg:px-32 px-6 flex flex-wrap md:flex-nowrap justify-between gap-x-12">
          {/* Left Section */}
          <div className="w-full md:w-1/2 flex flex-col space-y-6">
            <div className="relative">
              <div className="absolute top-0 left-0 w-24 h-24 bg-gold rounded-full flex items-center justify-center"></div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={details && details.aboutUs.image1}
                  alt="Image 1"
                  className="w-full rounded-lg h-full"
                />
                <div className="space-y-4">
                  <img
                    src={details && details.aboutUs.image2}
                    alt="Image 2"
                    className="w-full rounded-lg"
                  />
                  <img
                    src={details && details.aboutUs.image3}
                    alt="Image 3"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h4 className="text-yellow-600">
              {" "}
              {sanitizeContent(details && details.aboutUs.title1)}
            </h4>
            <h2 className="text-3xl font-bold text-gray-900">
              {sanitizeContent(details && details.aboutUs.title2)}
            </h2>
            <p className="text-gray-600">
              {sanitizeContent(details && details.aboutUs.text1)}
            </p>
            <div className="flex space-x-8 mt-6">
              <div className="flex flex-col items-center">
                <img
                  src="https://i.imghippo.com/files/PI4311zs.jpg"
                  alt="Manicure"
                  className="w-12"
                />
                <h4 className="mt-2 text-lg font-semibold">Manicure</h4>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="https://i.imghippo.com/files/BezV8981xhg.jpg"
                  alt="Make-up"
                  className="w-12"
                />
                <h4 className="mt-2 text-lg font-semibold">Make-up</h4>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="https://i.imghippo.com/files/MFr8486gH.jpg"
                  alt="Body Message"
                  className="w-12"
                />
                <h4 className="mt-2 text-lg font-semibold">Body Message</h4>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <button
                onClick={handleModalOpen}
                className="bg-yellow-600 text-white py-2 px-6 rounded-lg text-lg
                font-semibold"
              >
                {" "}
                {sanitizeContent(details && details.aboutUs.buttonText1)}
              </button>
              <div className="ml-6 flex items-center">
                <img
                  src="https://i.imghippo.com/files/pwH7765aI.jpg"
                  alt="Chat"
                  className="w-8"
                />
                <div className="ml-2 text-gray-900">
                  <p>Chat Us Anytime</p>
                  <a
                    href={`tel:${userDetails && userDetails.phoneNumber}`}
                    className="text-lg font-semibold"
                  >
                    {userDetails && userDetails.phoneNumber}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center py-16 px-4 bg-white relative">
        {/* Right Decorative Image */}
        <img
          src="https://i.imghippo.com/files/lt4581vqk.jpg"
          alt="Decorative Right"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-24 h-24 mt-5 opacity-50"
        />
        {/* Section Title */}
        <h3 className="text-lg italic text-gold">Come & Explore</h3>
        <h2 className="text-4xl font-serif font-bold mb-10">
          Massage & Treatments
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Pagination]}
          slidesPerView={2}
          spaceBetween={20}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          breakpoints={{
            320: { slidesPerView: 2 }, // Small phones
            480: { slidesPerView: 2 }, // Slightly wider phones
            640: { slidesPerView: 2 }, // Tablets in portrait mode
            768: { slidesPerView: 3 }, // Tablets in landscape mode
            1024: { slidesPerView: 4 }, // Laptops
            1280: { slidesPerView: 4 }, // Large screens
            1440: { slidesPerView: 4 }, // Extra-large screens
          }}
          className="w-full max-w-6xl mx-auto pb-10"
        >
          {eServices.map((service, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center">
              {/* Circular Image */}
              <button onClick={handleModalOpen}>
                {" "}
                <div className="w-48 h-48 rounded-full border border-gray-300 overflow-hidden">
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  /> */}
                </div>
              </button>
              {/* Service Title & Price */}
              <button onClick={handleModalOpen}>
                <h4 className="text-xl font-semibold mt-4">{service.name}</h4>
              </button>
              <p className="text-gold text-lg font-medium">
                {getCurrencySymbol(currency)}
                {service.price}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <section
        className="relative  bg-center text-white py-20"
        style={{
          backgroundImage: "url(https://i.imghippo.com/files/OuV6061hvk.jpg)",
        }}
      >
        <div className="container mx-auto px-6 relative">
          <div className="flex md:justify-end justify-center ">
            <div className="text-center max-w-xl">
              <h1 className="text-5xl font-serif">
                {sanitizeContent(details && details.LargeCta.header1)}
              </h1>
              <span className="text-xl block mt-2">
                {sanitizeContent(details && details.LargeCta.header2)}
              </span>
              <p className="mt-4 text-gray-300">
                {sanitizeContent(details && details.LargeCta.summary1)}
              </p>
              <span className="text-lg block mt-6 text-yellow-500 font-semibold">
                {sanitizeContent(details && details.LargeCta.header3)}
              </span>
              {/* <div className="flex justify-center gap-4 mt-6">
                {Object.entries(timeLeft).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col items-center bg-yellow-500 text-black p-4 rounded-full w-24"
                  >
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-sm uppercase">{key}</div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section id="gallery" className="py-16 bg-white relative lg:px-32 px-6">
        <div className="flex flex-wrap items-end justify-center mb-5 text-center md:text-start ">
          <div className="xl:w-5/12 lg:w-5/12 md:w-10/12 w-full ">
            <p className="text-xl italic text-[#c9a76a] font-semibold tracking-wide">
              {sanitizeContent(details && details.Gallery.summary1)}
            </p>
            <h2 className="text-5xl font-extrabold text-gray-900 leading-tight md:w-3/4 ">
              {sanitizeContent(details && details.Gallery.summary2)}
            </h2>
          </div>
          <div className="xl:w-7/12 md:w-7/12 w-12/12">
            {" "}
            <p className="text-gray-600 text-lg leading-relaxed md:w-2/3 w-full">
              {sanitizeContent(details && details.Gallery.summary3)}
            </p>
          </div>
        </div>

        <div className=" mt-10">
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="text-left">
                <a
                  href={product.link}
                  className="block rounded-lg overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={sanitizeContent(product.title)}
                    className="w-full h-[350px] object-cover rounded-lg shadow-lg"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-16 bg-white">
        {/* Left Decorative Image */}
        <img
          src="https://i.imghippo.com/files/veeS8977FY.jpg"
          alt="Decorative Left"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-24 h-24 opacity-50"
        />

        {/* Right Decorative Image */}
        <img
          src="https://i.imghippo.com/files/bTmw4851HL.jpg"
          alt="Decorative Right"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-24 h-24 opacity-50"
        />

        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="text-lg text-gold italic"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Testimonial
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-semibold mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            What they say?
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto mt-10 relative">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-gold text-xl" />
              ))}
            </div>
            <p className="text-gray-600 italic text-lg">
              “ {testimonials[activeIndex].text} ”
            </p>
            <h4 className="mt-4 font-semibold text-lg">
              {testimonials[activeIndex].name} -
            </h4>
            <span className="text-gray-500">
              {testimonials[activeIndex].designation}
            </span>
          </motion.div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index ? "bg-gold" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-16 bg-white">
        <div className="w-full px-6 lg:px-16 flex flex-wrap lg:flex-nowrap items-center">
          {/* Left Image Section */}
          <div className="w-full lg:w-[55%]">
            <img
              src={details && details.Patrners.sectionImage3}
              alt="Feature"
              className="rounded-full w-full max-w-[600px] h-auto object-cover"
            />
          </div>

          {/* Right Content Section */}
          <div className="w-full lg:w-[45%] lg:pl-12">
            <div className="text-center lg:text-left">
              <img
                src="https://i.imghippo.com/files/wiaX5094.jpg"
                alt="Icon"
                className="mx-auto lg:mx-0 mb-4"
              />
              <p className="text-gold italic text-lg">
                {sanitizeContent(details && details.Patrners.section1header)}
              </p>
              <h2 className="text-4xl font-bold leading-tight my-3">
                {sanitizeContent(details && details.Patrners.section3header)}
              </h2>
              <p className="text-gray-500 text-lg">
                {sanitizeContent(details && details.Patrners.section4header)}
              </p>
            </div>

            {/* Features List */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Body Scrubs",
                "Cellulite Treatments",
                "Back Treatments",
                "Body Polish",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img
                    src="https://i.imghippo.com/files/pwH7765aI.jpg"
                    alt="Icon"
                    className="w-5"
                  />
                  <h3 className="text-lg font-medium">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white px-4 text-center">
        <h3 className="text-lg italic text-gray-500">Our team</h3>
        <h2 className="text-4xl font-serif font-bold mt-2">
          Meet Certified Therapist
        </h2>
        <div className="mt-8 space-y-4 max-w-3xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-3"
            >
              <p className="text-xl font-semibold">
                {sanitizeContent(member.name)}{" "}
                <span className="text-gray-500">
                  / {sanitizeContent(member.role)}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>
      <section
        className="py-16 text-center relative bg-cover bg-center mt-10 bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://i.imghippo.com/files/hRGz9598osc.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Fun Facts Content */}
        <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
          {funFacts.map((fact, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl text-black font-bold">
                {sanitizeContent(fact.value)}
              </p>
              <p className="text-xl text-black">
                {sanitizeContent(fact.label)}
              </p>
            </div>
          ))}
        </div>
      </section>
      <WhiteContactForm ecosystemDomain={subdomain} />
      <footer id="contact" className="relative bg-black text-white py-12">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/images/background/bg-footer1.jpg')",
          }}
        ></div>
        <div className="relative container mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            {/* Logo */}
            <a href="/" className="flex items-center text-gray-800">
              <img
                src={details && details.footer.logo}
                alt="logo"
                className="w-10 h-10 mr-2"
              />
              <span className="text-xl text-white leading-tight">
                {userDetails && userDetails.ecosystemName} <br />
                <span className="text-yellow-600">Beauty and Spa</span>
              </span>
            </a>
            <p className="mb-4 mt-6">
              {sanitizeContent(details && details.footer.paragraph1)}
            </p>

            <div className="flex space-x-4 mt-4 text-xl">
              <a href="#" className="hover:text-gold">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-gold">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gold">
                <FaTwitter />
              </a>
            </div>
          </div>
          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-gold">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold">
                  Gallery
                </a>
              </li>
              <li>
                <button onClick={handleModalOpen} className="hover:text-gold">
                  Book an Appointment
                </button>
              </li>
            </ul>
          </div>
          {/* Open Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {sanitizeContent(details && details.contactUs.heading5)}
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gold">
                  {sanitizeContent(details && details.contactUs.heading6)}
                </span>
              </li>
              <li>
                <span className="text-gold">
                  {sanitizeContent(details && details.contactUs.heading7)}
                </span>
              </li>
              <li>
                <span className="text-gold">
                  {sanitizeContent(details && details.contactUs.paragraph1)}
                </span>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>{userDetails && userDetails.address}</p>
            <p className="text-gold font-bold mt-2">
              {userDetails && userDetails.phoneNumber}
            </p>
            <a
              href={`mailto:${userDetails && userDetails.email}`}
              className="text-gold hover:underline"
            >
              {userDetails && userDetails.email}
            </a>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="relative text-center text-sm mt-10 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()}{" "}
          {userDetails && userDetails.ecosystemName}. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default FirstSpa;
