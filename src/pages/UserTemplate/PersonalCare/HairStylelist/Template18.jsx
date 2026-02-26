import React, { useState, useEffect } from "react";
import {
  FaPlay,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { HairSalon } from "../../../../data/Services";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

const ThirdStylist = ({ details, subdomain, userDetails }) => {
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

  const imageLinks = [
    details?.Gallery?.image2,
    details?.Gallery?.summary2,
    details?.Gallery?.image3,
    details?.Gallery?.summary3,
    details?.Gallery?.image4,
    details?.Gallery?.summary4,
    details?.Gallery?.image5,
    details?.Gallery?.summary5,
    details?.Gallery?.image6,
    details?.Gallery?.summary6,
  ];

  const services = [
    {
      id: 1,
      title: details && details.Events.section1header,
      description: details && details.Events.section1paragraphy,
      icon: details && details.Events.sectionImage1,
    },
    {
      id: 2,
      title: details && details.Events.section2header,
      description: details && details.Events.section2paragraphy,
      icon: details && details.Events.sectionImage2,
    },
    {
      id: 3,
      title: details && details.Events.section3header,
      description: details && details.Events.section3paragraphy,
      icon: details && details.Events.sectionImage3,
    },
  ];

  const testimonials = [
    {
      imgSrc: details && details.Reviews.image1,
      name: details && details.Reviews.header1,
      rating: details && details.Reviews.title1,
      content: details && details.Reviews.summary1,
    },
    {
      imgSrc: details && details.Reviews.image2,
      name: details && details.Reviews.header2,
      rating: details && details.Reviews.title2,
      content: details && details.Reviews.summary2,
    },
    {
      imgSrc: details && details.Reviews.image3,
      name: details && details.Reviews.header3,
      rating: details && details.Reviews.title3,
      content: details && details.Reviews.summary3,
    },
    {
      imgSrc: details && details.contactUs.heading2,
      name: details && details.contactUs.heading1,
      rating: details && details.contactUs.heading3,
      content: details && details.contactUs.heading4,
    },
  ];

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="font-Raj">
      <header className="sticky top-0 z-50 bg-black text-white">
        <nav className=" flex-wrap flex items-center justify-between py-4 px-6 lg:px-8">
          {/* Logo */}
          <div className="text-3xl font-bold">
            {userDetails && userDetails.ecosystemName}
            <span className="text-gray-400">.</span>
          </div>

          {/* Main Menu */}
          <div className="hidden lg:flex space-x-6">
            <a href="#home" className="hover:text-gray-300">
              Home
            </a>
            <a href="#about" className="hover:text-gray-300">
              About us
            </a>
            <a href="#services" className="hover:text-gray-300">
              Services
            </a>
            <a href="#pricing" className="hover:text-gray-300">
              Pricing
            </a>

            <a href="#contact" className="hover:text-gray-300">
              Contact
            </a>
            <button
              onClick={handleModalOpen}
              className="px-3 py-1 bg-black text-white rounded-full hover:bg-white hover:text-black border border-white"
            >
              Book Now
            </button>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-400 focus:outline-none"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </nav>

        {/* Responsive Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-black text-white space-y-2 px-4 py-2">
            <a href="#home" className="block hover:text-gray-300">
              Home
            </a>
            <a href="#about" className="block hover:text-gray-300">
              About us
            </a>
            <a href="#services" className="block hover:text-gray-300">
              Services
            </a>
            <a href="#pricing" className="block hover:text-gray-300">
              Pricing
            </a>

            <a href="#contact" className="block hover:text-gray-300">
              Contact
            </a>
            <button
              onClick={handleModalOpen}
              className="block px-4 py-2 bg-white text-black rounded-full text-center"
            >
              Book Now
            </button>
          </div>
        )}
        {/* Horizontal Line */}
        <div className="border-t border-gray-600 "></div>
      </header>
      <section id="home" className="hero bg-black relative overflow-hidden">
        <div className="flex flex-wrap px-4 lg:px-32 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 px-6">
              <div className="mb-6">
                <h3 className="text-white uppercase text-lg font-medium mb-3 animate-fadeInUp">
                  {sanitizeContent(details && details.hero.title1)}
                </h3>
                <h1 className="text-5xl text-white lg:text-6xl font-bold leading-tight animate-fadeInUp">
                  {sanitizeContent(details && details.hero.title2)} with{" "}
                  {userDetails && userDetails.ecosystemName
                    ? userDetails.ecosystemName
                    : ""}{" "}
                </h1>
              </div>

              <div
                className="animate-fadeInUp text-gray-600 leading-relaxed mb-8"
                style={{ animationDelay: "0.5s" }}
              >
                <p className="mb-4 text-white">
                  {sanitizeContent(details && details.hero.summary1)}
                </p>
                <ul className="space-y-2 list-disc list-inside text-white">
                  <p>{sanitizeContent(details && details.hero.span1)}</p>
                  {/* Horizontal Line */}
                  <div className="border-t border-gray-600 my-6"></div>
                  <p>{sanitizeContent(details && details.hero.span2)}</p>
                </ul>
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

              <div
                className="flex justify-center lg:justify-start space-x-4 animate-fadeInUp"
                style={{ animationDelay: "0.75s" }}
              >
                <button
                  onClick={handleModalOpen}
                  className="bg-black text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition border border-white"
                >
                  Book Now
                </button>
                <a
                  href="#services"
                  className="bg-black text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition border border-white"
                >
                  Our Services
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <div
                className="relative hover:scale-105 transition-transform duration-500 animate-fadeInUp"
                style={{ animationDelay: "0.75s" }}
              >
                <img
                  src={details && details.hero.backgroundImage1}
                  alt="Hero"
                  className="rounded-3xl w-full max-w-lg h-auto"
                />
              </div>
            </div>
          </div>

          {/* Scroll Down Arrow */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <a
              href="#aboutus"
              className="block text-gray-600 hover:text-black transition animate-bounce"
            >
              <span className="w-8 h-8 border-2 border-gray-600 rounded-full flex items-center justify-center">
                ▼
              </span>
            </a>
          </div>
        </div>
      </section>

      <div id="about" className="bg-white">
        {/* Ticker Section */}
        <div className="overflow-hidden bg-gray-100 py-3">
          <div className="flex space-x-20 animate-marquee whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, idx) => (
              <ul key={idx} className="flex space-x-10">
                {[
                  "Hair dressing",
                  "Dreadlocks",
                  "Braiding",
                  "Gele Styling",
                  "Weaves Installation",
                  "Wig Fixing",
                  "Hair Extensions",
                  "Hair dressing",
                  "Dreadlocks",
                  "Braiding",
                  "Gele Styling",
                  "Weaves Installation",
                  "Wig Fixing",
                  "Hair Extensions",
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="block h-2 w-2 bg-black rounded-full"></span>
                    <span className="text-black">{item}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* About Us Section */}
        <div id="aboutus" className="flex flex-wrap px-4 lg:px-32 py-16">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Image Section */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 relative">
              <div className="col-span-1">
                <img
                  src={details && details.aboutUs.image1}
                  alt="Salon Interior"
                  className="rounded-md shadow-lg"
                />
              </div>
              <div className="col-span-1 flex flex-col items-center justify-between">
                <div className="bg-black text-white p-4 rounded-md text-center">
                  <h4 className="text-2xl font-bold">
                    {sanitizeContent(details && details.aboutUs.image5)}
                  </h4>
                </div>
                <img
                  src={details && details.aboutUs.image2}
                  alt="Haircut Image"
                  className="rounded-md shadow-lg mt-4"
                />
              </div>
            </div>

            {/* Right Content Section */}
            <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8">
              <h3 className="text-gray-500 uppercase tracking-wide text-sm">
                About{" "}
                {userDetails && userDetails.ecosystemName
                  ? userDetails.ecosystemName
                  : ""}
              </h3>
              <h2 className="text-2xl font-bold mt-2">
                {sanitizeContent(details && details.aboutUs.title2)}
              </h2>
              <p className="text-gray-600 mt-4">
                {sanitizeContent(details && details.aboutUs.text1)}
              </p>
              <ul className="mt-6 space-y-4 text-gray-800">
                <li>{sanitizeContent(details && details.aboutUs.text2)}</li>
                <div className="border-t border-gray-300 my-6"></div>
                <li>{sanitizeContent(details && details.aboutUs.image3)}</li>
                <div className="border-t border-gray-300 my-6"></div>
                <li>{sanitizeContent(details && details.aboutUs.image4)}</li>
              </ul>
              <a href="#services">
                <button className="mt-6 bg-black text-white hover:text-black px-6 py-2 rounded-md hover:bg-gray-100">
                  Explore our services
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h3 className="text-gray-500 uppercase tracking-wide mb-2">
            {sanitizeContent(details && details.Events.heading)}
            </h3>
            <h2 className="text-3xl font-bold">{sanitizeContent(details && details.Events.summary)}</h2>
          </div>

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                id="services"
                className={`flex flex-col items-center text-center p-6 ${
                  index !== 0 ? "border-l border-gray-300" : ""
                }`}
              >
                <div className="bg-black rounded-full p-6 mb-4 relative">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="bg-white py-12">
        <div className="flex flex-wrap px-4 lg:px-32">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Section - Text and Features */}
            <div className="lg:w-1/2">
              {/* Section Title */}
              <div className="mb-8">
                <h3 className="text-gray-400 uppercase tracking-wide mb-2 font-medium">
                {sanitizeContent(
                    details && details.Statistics.section1header
                  )}
                </h3>
                <h2 className="text-2xl font-bold leading-tight text-gray-900">
                {sanitizeContent(
                    details && details.Statistics.section1paragraphy
                  )}
                </h2>
              </div>

              {/* Features List */}
              <div className="space-y-6">
                {/* Feature Item 1 */}
                <div>
                  <div className="flex items-center">
                    <div className="bg-gray-900 text-white rounded-full p-3 flex-shrink-0 mr-4">
                      <img
                        src={details && details.Statistics.section2icon}
                        alt="Certified Stylists"
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                      {sanitizeContent(
                          details && details.Statistics.section2header
                        )}
                      </h3>
                      <p className="text-gray-600 mt-1">
                      {sanitizeContent(
                          details && details.Statistics.section2paragraphy
                        )}
                      </p>
                    </div>
                  </div>
                  {/* Horizontal Line */}
                  <div className="border-t border-gray-300 my-6"></div>
                </div>

                {/* Feature Item 2 */}
                <div>
                  <div className="flex items-center">
                    <div className="bg-gray-900 text-white rounded-full p-3 flex-shrink-0 mr-4">
                      <img
                        src={details && details.Statistics.section3icon}
                        alt="100% Organic Cosmetics"
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                     
                      <p className="text-gray-600 mt-1">
                      {sanitizeContent(
                          details && details.Statistics.section3paragraphy
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Video */}
            <div className="lg:w-1/2 flex justify-center relative mt-12 lg:mt-0">
              {/* Circular Video Image */}
              <div className="relative w-72 h-72 lg:w-[400px] lg:h-[400px] overflow-hidden rounded-full shadow-lg">
                <img
                  src={details && details.Statistics.section1icon}
                  alt="Our Services in Action"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-10">
        <div className="container mx-auto lg:px-32 px-4">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between">
            {/* Section Title */}
            <div className="lg:w-2/3 mb-6 lg:mb-0">
              <h3 className="text-gray-500 uppercase tracking-wide text-sm mb-2">
              {sanitizeContent(details && details.Statistics.section4header)}
              </h3>
              <h2 className="text-2xl font-bold text-gray-900">
              {sanitizeContent(
                  details && details.Statistics.section4paragraphy
                )}
              </h2>
            </div>

            {/* Facts Items */}
            <div className="flex flex-row items-center justify-between w-full gap-8">
              {/* Fact 1 */}
              <div className="text-center">
                <h3 className="text-3xl font-bold mt-4">{sanitizeContent(details && details.Statistics.section4span)}</h3>
                <p className="text-gray-500 text-sm mt-1">
                {sanitizeContent(details && details.Statistics.section4icon)}
                </p>
              </div>

              {/* Fact 2 */}
              <div className="text-center">
                <h3 className="text-3xl font-bold mt-4"> {sanitizeContent(details && details.Statistics.section1span)}</h3>
                <p className="text-gray-500 text-sm mt-1"> {sanitizeContent(details && details.Statistics.section2span)}</p>
              </div>

              {/* Fact 3 */}
              <div className="text-center">
                <h3 className="text-3xl font-bold mt-4"> {sanitizeContent(
                    details && details.Statistics.section3header
                  )}</h3>
                <p className="text-gray-500 text-sm mt-1">  {sanitizeContent(details && details.Statistics.section3span)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12" id="services">
        {/* Section Title */}
        <div className="text-center mb-10">
          <p className="uppercase text-sm tracking-widest text-gray-500">
            Hair Services
          </p>
          <h2 className="text-3xl font-bold">We have different styles</h2>
        </div>

        {/* Gift Cards */}
        <div className="flex flex-wrap lg:px-32 px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {eServices.map((service, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center rounded-lg border-2 overflow-hidden"
              >
                {/* Text Content */}
                <div className="p-6 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mt-2">
                    {service.shortDescription}
                  </p>
                  <button
                    onClick={handleModalOpen}
                    className="inline-block px-6 py-2 mt-4 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300"
                  >
                    Book Now
                  </button>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2">
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="bg-gray-50 py-10 px-4 ">
        <div className="max-w-7xl mx-auto text-center ">
          {/* Section Title */}
          <p className="text-sm uppercase text-gray-400 tracking-wide mb-2">
            Price List
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Our Best Prices
          </h2>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {eServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border-2 text-left p-6 flex justify-between items-center hover:bg-black hover:text-white"
              >
                {/* Item Details */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 hover:text-white ">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {service.shortDescription}
                  </p>
                </div>
                {/* Price Tag */}
                <div className="relative bg-black text-white rounded-full p-4 flex items-center justify-center text-lg font-bold">
                  {getCurrencySymbol(currency)}{service.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 bg-white overflow-hidden">
        {/* Section Title */}
        <div className="container mx-auto px-4 lg:px-32  text-center mb-8">
          <h3 className="text-gray-600 uppercase tracking-wide text-sm mb-2">
          {sanitizeContent(details && details.Gallery.image1)}
          </h3>
          <h2 className="text-3xl font-bold text-gray-900">
          {sanitizeContent(details && details.Gallery.summary1)}
          </h2>
        </div>

        {/* Animated Image Slider */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex space-x-4 animate-marquee whitespace-nowrap"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            {/* Dynamically Render 10 Images */}
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="shrink-0 w-[200px] sm:w-[300px]"
                style={{ flex: "0 0 auto" }}
              >
                <img
                  src={imageLinks[index % imageLinks.length]}
                  alt={`Salon Image ${index + 1}`}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            ))}

            {/* Duplicate Set for Infinite Scroll */}
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={`dup-${index}`}
                className="shrink-0 w-[200px] sm:w-[300px]"
                style={{ flex: "0 0 auto" }}
              >
                <img
                  src={imageLinks[index % imageLinks.length]} // Use the URL from the array
                  alt={`Salon Image ${index + 1}`}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Animation Style */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 20s linear infinite;
            will-change: transform;
          }
        `}</style>
      </section>

      <section className="py-12 bg-gray-50">
        {/* Section Title */}
        <div className="text-center mb-10">
          <p className="uppercase text-gray-500 tracking-widest text-sm">
            Client Testimonials
          </p>
          <h2 className="text-2xl font-bold">What Our Clients Say</h2>
        </div>

        {/* Swiper Carousel */}
        <div className="flex flex-wrap md:px-32 px-4">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000, // Auto-swipes every 3 seconds
              disableOnInteraction: false, // Keeps autoplay even when interacting
            }}
            breakpoints={{
              1200: { slidesPerView: 3 },
              992: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              575: { slidesPerView: 2 },
            }}
            className="!pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="grid grid-cols-1 ">
                <div className="bg-white p-6 rounded-lg border-2 relative">
                  {/* Quote Icon */}
                  <span className="absolute text-gray-200 text-6xl top-4 right-6">
                    &#8220;
                  </span>
                  {/* Testimonial Content */}
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={testimonial.imgSrc}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <div className="text-yellow-500 text-lg mb-2">
                      {testimonial.rating}
                    </div>
                    <p className="text-gray-500 leading-relaxed">
                      {testimonial.content}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <WhiteContactForm ecosystemDomain={subdomain} />

      <footer className="bg-gray-900 text-white">
        {/* Footer Contact Information Section */}
        <div className="py-12" id="contact">
          <div className=" flex-wrap px-4 lg:px-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Our Location */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {sanitizeContent(details && details.footer.title1)}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {userDetails && userDetails.address && userDetails.address}
              </p>
            </div>

            {/* Get in Touch */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {sanitizeContent(details && details.footer.title2)}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                Phone: {userDetails && userDetails.phoneNumber} <br />
                Email: {userDetails && userDetails.email}  <br />
              </p>
            </div>

            {/* Working Hours */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {sanitizeContent(details && details.footer.title3)}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {sanitizeContent(details && details.footer.paragraph4)}
                <br />
                {sanitizeContent(details && details.footer.paragraph5)}
                <br />
                {sanitizeContent(details && details.footer.paragraph6)}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Section */}
        <div className="border-t border-gray-700">
          <div className="flex flex-wrap px-4 lg:px-32 py-8 flex-col lg:flex-row items-center justify-between">
            {/* Footer Logo */}
            <div className="text-3xl font-bold mb-6 lg:mb-0">
            {userDetails && userDetails.ecosystemName && userDetails.ecosystemName}<span className="text-yellow-500">.</span>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4 mb-6 lg:mb-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaFacebookF className="text-lg" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
            </div>

            {/* Footer Menu */}
            <div className="text-center lg:text-right">
              <ul className="flex flex-wrap justify-center lg:justify-end space-x-4 text-gray-400 text-sm">
                <li>
                  <a
                    href="#home"
                    className="hover:text-white transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition duration-300"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#service"
                    className="hover:text-white transition duration-300"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition duration-300"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-gray-500 text-sm">
                Copyright &copy;{" "}
                <a href="https://dimpified.com" className="text-white ">
                  {" "}
                  Dimpified{" "}
                </a>
                . All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default ThirdStylist;
