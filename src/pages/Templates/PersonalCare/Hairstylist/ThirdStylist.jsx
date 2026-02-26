import React, { useState } from "react";
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
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

const services = [
  {
    id: 1,
    title: "Cutting & Styling",
    description:
      "Experience precision cutting and tailored styling from professionals who bring out the best in your look. We ensure every haircut complements your style and personality.",
    icon: "https://i.imghippo.com/files/inNN1281V.jpg",
  },
  {
    id: 2,
    title: "Hair Treatments",
    description:
      "Revitalize your hair with our nourishing treatments designed to repair, protect, and enhance hair health, leaving it silky, shiny, and full of life.",
    icon: "https://i.imghippo.com/files/YmL9721Qg.jpg",
  },
  {
    id: 3,
    title: "Hair dyeing",
    description:
      "Add vibrance to your look with our premium hair dyeing services. From subtle highlights to bold transformations, we deliver flawless, lasting results.",
    icon: "https://i.imghippo.com/files/rxTU4925km.jpg",
  },
];

const ServiceItem = ({ title, description, icon, withBorder }) => {
  return (
    <div
      id="services"
      className={`flex flex-col items-center text-center p-6 ${
        withBorder ? "border-l border-gray-300" : ""
      }`}
    >
      <div className="bg-black rounded-full p-6 mb-4">
        <img src={icon} alt={title} className="w-12 h-12" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};
const imageLinks = [
  "https://i.imghippo.com/files/rxTU4925km.jpg",
  "https://i.imghippo.com/files/YmL9721Qg.jpg",
  "https://i.imghippo.com/files/inNN1281V.jpg",
  "https://i.imghippo.com/files/qvU1495LjM.jpg",
  "https://i.imghippo.com/files/FEgT8873v.jpg",
  "https://i.imghippo.com/files/ZrzW9432UuA.jpg",
  "https://i.imghippo.com/files/iqH4667OI.jpg",
  "https://i.imghippo.com/files/yOAs2005tqM.jpg",
  "https://i.imghippo.com/files/FFc1602vk.jpg",
  "https://i.imghippo.com/files/Ohg2306ZgM.jpg",
];

const GiftCard = ({ title, description, imgSrc, reverse }) => {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center bg-gray-100 p-6 rounded-lg shadow-lg`}
    >
      {/* Text Content */}
      <div className="flex-1 text-center lg:text-left space-y-4">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        <a
          href="#"
          className="inline-block px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300"
        >
          Get Now
        </a>
      </div>

      {/* Image */}
      <div className="flex-1 mt-6 lg:mt-0">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
};
const testimonials = [
  {
    imgSrc: "https://i.imghippo.com/files/s3164s.jpg",
    name: "Amaka Okafor",
    rating: "★★★★★",
    content:
      "Absolutely in love with my new hairstyle! They took the time to understand my hair type and recommended the perfect cut and color. My confidence has skyrocketed!",
  },
  {
    imgSrc: "https://i.imghippo.com/files/FEgT8873v.jpg",
    name: "Funke Balogun",
    rating: "★★★★★",
    content:
      "The best hair salon experience I've ever had! My stylist was incredibly skilled, and the products they used made my hair feel so soft and healthy. I’ll definitely be coming back!",
  },
  {
    imgSrc: "https://i.imghippo.com/files/hG2582tU.jpg",
    name: "Chiamaka Eze",
    rating: "★★★★★",
    content:
      "From silk press to braids, they always get it right! My hair has never been this well taken care of. The salon is professional, welcoming, and always up to date with the latest styles.",
  },
  {
    imgSrc: "https://i.imghippo.com/files/LHAS4663Sx.jpg",
    name: "Yemi Adewale",
    rating: "★★★★★",
    content:
      "Their services have completely transformed my look! I get so many compliments on my hair, and the styling lasts much longer than anywhere else I've been. Highly recommended!",
  },
];

const ContactInfoBox = ({ icon, title, children }) => (
  <div id="contact" className="text-center">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
  </div>
);

const ThirdStylist = ({ userDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="font-Raj">
      <header className="sticky top-0 z-50 bg-black text-white">
        <nav className="flex flex-wrap px-4 lg:px-32 items-center justify-between py-4 ">
          <a href="/" className="text-3xl font-bold">
            Hair cure<span className="text-gray-400">.</span>
          </a>

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

          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-400 focus:outline-none"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </nav>

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

        <div className="border-t border-gray-600 "></div>
      </header>
      <section id="home" className="hero bg-black relative overflow-hidden">
        <div className="flex flex-wrap px-4 lg:px-32 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 px-6">
              <div className="mb-6">
                <h3 className="text-white uppercase text-lg font-medium mb-3 animate-fadeInUp">
                  Welcome to{" "}
                  {userDetails && userDetails.ecosystemName
                    ? userDetails.ecosystemName
                    : ""}{" "}
                  Hair Salon
                </h3>
                <h1 className="text-5xl text-white lg:text-6xl font-bold leading-tight animate-fadeInUp">
                  Redefine Your Style <br /> With a Classic Touch from{" "}
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
                  {userDetails && userDetails.ecosystemDescription
                    ? userDetails.ecosystemDescription
                    : ""}
                </p>
                <ul className="space-y-2 list-disc list-inside text-white">
                  <p>01. Look Sharp, Feel Confident</p>
                  {/* Horizontal Line */}
                  <div className="border-t border-gray-600 my-6"></div>
                  <p>02. Perfect for Every Occasion</p>
                </ul>
              </div>
              {isModalOpen && (
                <BookingModal
                  isOpen={isModalOpen}
                  handleClose={handleModalClose}
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
                  src="https://i.imghippo.com/files/YmL9721Qg.jpg"
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
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-gray-500 uppercase tracking-wide mb-2">
              Professional Services
            </h3>
            <h2 className="text-3xl font-bold">We are Expert in</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceItem
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                withBorder={index !== 0} // Add border to all except the first item
              />
            ))}
          </div>
        </div>
      </div>

      <section className="bg-white py-12">
        <div className="flex flex-wrap px-4 lg:px-32">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2">
              <div className="mb-8">
                <h3 className="text-gray-400 uppercase tracking-wide mb-2 font-medium">
                  Why Choose Us?
                </h3>
                <h2 className="text-2xl font-bold leading-tight text-gray-900">
                  Ready to Transform Your Look?
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center">
                    <div className="bg-gray-900 text-white rounded-full p-3 flex-shrink-0 mr-4">
                      <img
                        src="https://i.imghippo.com/files/iqH4667OI.jpg"
                        alt="Certified Stylists"
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Certified Stylists
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Our expert stylists are trained and certified to deliver
                        top-notch results, tailored to your personal style and
                        preferences.
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
                        src="https://i.imghippo.com/files/FFc1602vk.jpg"
                        alt="100% Organic Cosmetics"
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        100% Organic Cosmetics
                      </h3>
                      <p className="text-gray-600 mt-1">
                        We use premium, organic products to ensure your hair and
                        scalp stay healthy while promoting eco-friendly
                        practices.
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
                  src="https://i.imghippo.com/files/Ohg2306ZgM.jpg"
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
                Company Overview
              </h3>
              <h2 className="text-2xl font-bold text-gray-900">
                Facts & Figures
              </h2>
            </div>

            {/* Facts Items */}
            <div className="flex flex-row items-center justify-between w-full gap-8">
              {/* Fact 1 */}
              <div className="text-center">
                <h3 className="text-3xl font-bold mt-4">19+</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Years of Experience
                </p>
              </div>

              {/* Fact 2 */}
              <div className="text-center">
                <h3 className="text-3xl font-bold mt-4">200+</h3>
                <p className="text-gray-500 text-sm mt-1">Company Clients</p>
              </div>

              {/* Fact 3 */}
              <div className="text-center">
                <h3 className="text-3xl font-bold mt-4">28+</h3>
                <p className="text-gray-500 text-sm mt-1">Staff Members</p>
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
            {HairSalon.map((service, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center rounded-lg border-2 overflow-hidden"
              >
            
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
            {HairSalon.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border-2 text-left p-6 flex justify-between items-center hover:bg-black hover:text-white"
              >
                
                <div>
                  <h3 className="text-lg font-bold text-gray-800 hover:text-white ">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {service.shortDescription}
                  </p>
                </div>
               
                <div className="relative bg-black text-white rounded-full p-4 flex items-center justify-center text-lg font-bold">
                  {getFormattedPrice(service.price, countryCode)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 bg-white overflow-hidden">
        {/* Heading Section */}
        <div className="container mx-auto px-4 lg:px-32 text-center mb-8">
          <h3 className="text-gray-600 uppercase tracking-wide text-sm mb-2">
            Photo Gallery
          </h3>
          <h2 className="text-3xl font-bold text-gray-900">
            Inside Look at Our Salon
          </h2>
        </div>

        {/* Marquee Section */}
        <div className="relative w-full overflow-hidden">
          <div className="flex space-x-4 animate-marquee whitespace-nowrap">
            {/* Single Set of Images */}
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="w-[200px] sm:w-[300px] flex-shrink-0"
              >
                <img
                  src={imageLinks[index % imageLinks.length]}
                  alt={`Salon Image ${index + 1}`}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Animation Styles */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(
                -50%
              ); /* Adjust to -50% for seamless looping */
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
        <div className="flex flex-wrap md:px-32 px-4 w-full max-w-screen-xl mx-auto">
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
                  <span className="absolute text-gray-200 text-6xl top-4 right-6">
                    &#8220;
                  </span>

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

      <footer className="bg-gray-900 text-white">
        {/* Footer Contact Information Section */}
        <div className="py-12" id="contact">
          <div className="flex flex-wrap px-4 lg:px-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Our Location */}
            <ContactInfoBox title="Our Location">
              {userDetails && userDetails.address && userDetails.address}
            </ContactInfoBox>

            {/* Get in Touch */}
            <ContactInfoBox title="Get in Touch">
              Phone: +234 123 456 7890 <br />
              Email: info@domain.com <br />
            </ContactInfoBox>

            {/* Working Hours */}
            <ContactInfoBox title="Working Hours">
              Mon-Fri: 10:00 AM - 9:00 PM <br />
              Saturday: 10:00 AM - 7:00 PM <br />
              Sunday: 10:00 PM - 7:00 PM
            </ContactInfoBox>
          </div>
        </div>

        {/* Main Footer Section */}
        <div className="border-t border-gray-700">
          <div className="flex flex-wrap px-4 lg:px-32 py-8 flex flex-col lg:flex-row items-center justify-between">
            {/* Footer Logo */}
            <div className="text-3xl font-bold mb-6 lg:mb-0">
              Hair cure<span className="text-yellow-500">.</span>
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
