import React, { useState, useEffect } from "react";

import {
  FaEnvelope,
  FaPhone,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaStar,
  FaPlay,
  FaPaperPlane,
  FaTwitter,
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { spa } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

const SecondSpa = ({ userDetails }) => {
  useEffect(() => {
    const textElement = document.getElementById("curved-text");
    if (textElement) {
      const text = textElement.innerText.trim();
      textElement.innerHTML = "";

      text.split("").forEach((char, i) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.position = "absolute";
        span.style.transformOrigin = "50% 50%";
        span.style.transform = `rotate(${i * 14}deg) translate(3.5rem)`;
        textElement.appendChild(span);
      });
    }
  }, []);

  const features = [
    {
      id: 1,
      title: "Online",
      subtitle: "Booking",
      image: "https://i.imghippo.com/files/JbDJ4327xXI.webp",
      icon: "icon-booking",
      description:
        "Easily schedule appointments online with our hassle-free booking system, available anytime.",
    },
    {
      id: 2,
      title: "Expert",
      subtitle: "Therapist",
      image: "https://i.imghippo.com/files/qdM9464yEQ.jpg",
      icon: "icon-group",
      description:
        "Get connected with certified and experienced therapists for professional wellness support.",
    },
    {
      id: 3,
      title: "Special",
      subtitle: "Discount",
      image: "https://i.imghippo.com/files/BZFl9728eQ.jpg",
      icon: "icon-tag",
      description:
        "Enjoy exclusive discounts on spa services when you book through our platform.",
    },
  ];

  const testimonials = [
    {
      name: "Kevin Martin",
      role: "Entrepreneurer",
      image: "https://i.imghippo.com/files/vE8876t.jpg",
      text: "I had an amazing experience at Teju Spa. The massage was incredibly relaxing, and the atmosphere was perfect. The staff was very professional, making sure I felt comfortable throughout the entire session. From the moment I walked in, I felt at ease.",
    },
    {
      name: "Sarah Albert",
      role: "Gym Instructor",
      image: "https://i.imghippo.com/files/Imi5543yI.jpg",
      text: "Teju Spa provided the best massage therapy I've ever had. The staff is professional and friendly! I was greeted immediately upon arrival and shown to a cozy waiting area where I could relax before my treatment.",
    },
    {
      name: "David Cooper",
      role: "User",
      image: "https://i.imghippo.com/files/eDZD5180jZU.jpg",
      text: "The spa services at Teju were top-notch. I left feeling refreshed and rejuvenated. Highly recommend! From the moment I walked in, I was greeted with a warm welcome.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const images = [
    "https://i.imghippo.com/files/LFaa8455zA.jpg",
    "https://i.imghippo.com/files/vIg9532jgo.jpg",
    "https://i.imghippo.com/files/hRGz9598osc.jpg",
    "https://i.imghippo.com/files/hiaa9038rI.jpg",
    "https://i.imghippo.com/files/gqFr8528aEY.jpg",
    "https://i.imghippo.com/files/dAVl5719Cus.jpg",
  ];
  return (
    <div className="bg-gray-100">
      <nav className="left-0 w-full z-50 bg-white shadow-md">
        <div className="container mx-auto px-8 lg:px-12 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center text-gray-800">
          
            <span className="text-xs leading-tight">
              Wellness <br />
              <span className="text-yellow-600">Beauty and Spa</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-gray-800 font-medium">
            {["Home", "About", "Services", "Gallery"].map((item) => (
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
          className={`md:hidden fixed top-16 left-0 w-full bg-white z-50 shadow-md transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
        >
          <ul className="space-y-4 p-6 text-gray-800 font-medium">
            {["Home", "About", "Services", "Gallery"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="block text-black hover:text-blue-600"
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
      <div
        id="home"
        className="relative w-full md:h-screen h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://i.imghippo.com/files/ucuj7037yRc.jpg)",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-3xl">
          <p className="text-lg italic text-start mb-2">Get true wellness</p>
          <h1 className="md:text-6xl text-4xl font-bold tracking-wide uppercase">
            {userDetails?.ecosystemName} BEAUTY & SPA
          </h1>

          {/* Button */}
          <button
            onClick={handleModalOpen}
            className="mt-6 bg-[#c9a14a] rounded-md text-white font-semibold py-3 px-6 uppercase tracking-wide"
          >
            Book Now
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute right-6 bottom-12 flex flex-col space-y-2">
          <div className="w-3 h-3 border-2 border-white rounded-full"></div>
          <div className="w-3 h-3 bg-[#c9a14a] rounded-full"></div>
          <div className="w-3 h-3 border-2 border-white rounded-full"></div>
        </div>

        {/* Foggy Bottom Effect */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>
      <section
        className="relative py-16 bg-gray-100"
        style={{
          backgroundImage:
            "url('https://i.imghippo.com/files/Exo5774aA.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`relative text-center px-8 py-12 ${
                  index !== features.length - 1
                    ? "border-r border-gray-300"
                    : ""
                }`}
              >
                {/* Feature Image */}

                {/* Text Content */}
                <h4 className="text-lg font-medium text-gray-600">
                  {feature.title}
                </h4>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {feature.subtitle}
                </h3>

                {/* Decorative Line */}
                <div className="my-4 w-16 mx-auto border-b-4 border-gray-400"></div>

                {/* Feature Description */}
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="bg-white py-16">
        <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-10">
          {/* Image Section */}
          <div className="relative lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://i.imghippo.com/files/TnU6377jJ.jpg"
                alt="Spa Treatment"
                className="rounded-md w-full h-auto"
              />
              <img
                src="https://i.imghippo.com/files/kzp4023cA.jpg"
                alt="Luxury Spa Bath"
                className="rounded-md w-full h-auto"
              />
            </div>
            {/* Booking Info */}
          </div>

          {/* Text Content Section */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <div className="mb-6">
              <img
                src="https://i.imghippo.com/files/Gvlt3169dG.jpg"
                alt="Get to know us"
                className="mx-auto lg:mx-0"
              />
              <h6 className="text-gold text-lg font-semibold italic">
                Get to know us
              </h6>
              <h3 className="text-3xl font-bold text-gray-900">
                Welcome to Spa & Beauty Salon
              </h3>
            </div>

            {/* Features */}
            <div className="flex justify-center lg:justify-start gap-4 mb-6">
              <div className="flex items-center gap-2 bg-gray-100 py-3 px-5 rounded-md shadow-md">
                <span className="text-gold text-xl">💆‍♀️</span>
                <p className="text-gray-800 font-semibold">Best services</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 py-3 px-5 rounded-md shadow-md">
                <span className="text-gold text-xl">🎁</span>
                <p className="text-gray-800 font-semibold">Awesome Packages</p>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              We offer a variety of facial services tailored to your skin care
              needs. Our treatments are designed to rejuvenate and enhance your
              natural beauty.
            </p>
            <p className="text-gray-700 mb-6">
              From luxurious massages to hydrating facials, our spa experience
              is crafted to provide relaxation and wellness, ensuring you leave
              refreshed and revitalized.
            </p>

            {/* Call to Action */}
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <button
                onClick={handleModalOpen}
                className="bg-yellow-600 text-white px-6 py-3 rounded-md shadow-md font-semibold hover:bg-black transition"
              >
                Book Now
              </button>
              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src="https://i.imghippo.com/files/Imi5543yI.jpg"
                  alt="Co-Founder"
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <img
                    src="https://i.imghippo.com/files/UDEK9615SI.jpg"
                    alt="Signature"
                    className="w-24"
                  />
                  <p className="text-gray-700 font-medium">
                    Olamide - Co-Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="relative bg-yellow-600 bg-center text-white py-20 px-6"
        style={{
          backgroundImage: `url('https://yourwebsite.com/path-to-background-image.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left Section */}
          <div className="md:w-3/4 text-left">
            <h4 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              BOOK & FEEL OUR <br />
              INCREDIBLE SPA EXPERIENCE
            </h4>
            <button
              onClick={handleModalOpen}
              className="mt-6 inline-block bg-[#C1A359] text-white text-lg font-semibold py-3 px-6 rounded-md hover:bg-[#A58D41] transition"
            >
              Reserve your spot now!
            </button>
          </div>

          {/* Right Section */}
          <div className="md:w-1/4 flex flex-col items-center text-center md:text-right">
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Rotating Circular Text */}
              <div
                id="curved-text"
                className="absolute w-full h-full flex items-center justify-center"
                style={{
                  position: "absolute",
                  width: "8rem",
                  height: "8rem",
                  fontSize: "12px",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  animation: "rotateText 6s linear infinite",
                }}
              >
                RESERVE YOUR SOPT NOW &nbsp;
              </div>

              {/* Video Button (Centered) */}
              <button
                onClick={handleModalOpen}
                className="absolute w-16 h-16 flex items-center justify-center bg-white text-[#C1A359] rounded-full shadow-lg hover:scale-110 transition"
              >
                <FaPlay className="text-2xl" />
              </button>
            </div>
          </div>
        </div>

        {/* CSS Animation */}
        <style>
          {`
            @keyframes rotateText {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </section>
      <section className="relative bg-gray-100 py-16">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[#C2A74E] bg-center opacity-10"
          style={{
            backgroundImage: "url('/assets/images/shapes/service-bg-1.jpg')",
          }}
        ></div>
        {isModalOpen && (
          <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
        )}

        <div
          id="services"
          className="container mx-auto px-6 lg:px-16 relative z-10"
        >
          {/* Section Title */}
          <div className="text-center mb-10">
            <img
              src="https://i.imghippo.com/files/Exo5774aA.jpg"
              alt="Teju"
              className="mx-auto mb-2"
            />
            <h6 className="text-gold font-semibold text-lg italic">
              Get best treatment
            </h6>
            <h3 className="text-4xl font-bold text-gray-800">
              Our Spa Services
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {spa.slice(0, 12).map((service, index) => (
              <div key={index} className="overflow-hidden group relative">
                <div className="relative">
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-full h-100 rounded-md object-cover"
                  /> */}
                  <ul className="absolute inset-0 flex justify-center items-center space-x-4 opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition">
                    <li>
                      <button
                        onClick={handleModalOpen}
                        className="bg-[#6D4032] text-white px-8 py-3 rounded-full hover:bg-[#5A3426] transition"
                      >
                        Book Appointment
                      </button>
                    </li>
                  </ul>
                </div>

                
                <div className="p-4 text-center">
                  <h6 className="text-[#5e2f1e] font-semibold mb-2">
                    {service.name}
                  </h6>
                  <div className="text-gray-600">
                   
                    <span className="text-lg font-bold text-gray-800">
                      {getFormattedPrice(service.price, countryCode)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Section */}
          <div className="mt-10 text-center bg-white shadow-md p-6 rounded-md flex justify-center items-center space-x-4">
            <p className="text-lg text-gray-800 mb-0">
              Looking for spa & beauty services? Book an appointment now.
            </p>
            <button
              onClick={handleModalOpen}
              className="bg-yellow-600 text-white py-2 px-6 rounded-full font-semibold text-lg hover:bg-black transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>
      <section
        className="bg-white py-16 px-4 md:px-8 bg-cover bg-center"
        style={{ backgroundImage: `url('/path/to/your/image.jpg')` }}
      >
        <div className="max-w-5xl w-full mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h6 className="text-lg text-gold italic font-medium">
                Our Testimonials
              </h6>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                What They Say?
              </h3>
            </div>
            <p className="text-gray-600 text-md md:max-w-lg">
              Hear from our satisfied clients who have experienced relaxation
              and rejuvenation at Teju Spa.
            </p>
          </div>

          {/* Swiper Carousel */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={1}
            navigation
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="py-6"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white shadow-lg rounded-md p-6 border border-gray-200 h-[380px] flex flex-col justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-2 border-gold"
                    />
                    <div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-gold" />
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold mt-1">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  {/* Horizontal line between name, role, and text */}
                  <div className="my-4 border-t border-gray-200"></div>
                  <p className="text-gray-600 mt-4 flex-grow">
                    {testimonial.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="relative bg-[#FDF8F1] py-16 px-4 lg:px-0">
        {/* Background Shape */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/images/shapes/why-choose-1-bg-s1.png')] bg-cover opacity-10"></div>

        <div className="container mx-auto lg:flex items-center gap-10">
          {" "}
          {/* Fix: Add lg:flex */}
          {/* Left Section */}
          <div className="lg:w-1/2 text-left">
            <div className="relative inline-block">
              <img
                src="https://i.imghippo.com/files/dAVl5719Cus.jpg"
                alt="Our benefits"
                className="absolute -top-4 left-0 w-12"
              />
              <h6 className="text-[#A38B5F] font-semibold text-xl italic">
                Our benefits
              </h6>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mt-3">
              Why Choose Us?
            </h3>
            <p className="text-[#A38B5F] text-lg font-medium mt-4">
              Book and enjoy our special treatments
            </p>
            <p className="text-gray-600 mt-4">
              Experience premium relaxation and rejuvenation with our expert
              therapists. We provide top-tier spa services tailored to your
              needs, ensuring a blissful experience.
            </p>

            {/* Features List */}
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#A38B5F] text-white rounded-full">
                  ✓
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Expert Staff
                  </h4>
                  <p className="text-gray-600">
                    Our team consists of experienced professionals dedicated to
                    providing top-notch services.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#A38B5F] text-white rounded-full">
                  ✓
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Brilliant Services
                  </h4>
                  <p className="text-gray-600">
                    We offer a variety of luxurious treatments designed to
                    refresh your body and mind.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          {/* Right Section (Image) */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="https://i.imghippo.com/files/Dcxq6332hO.jpg"
              alt="Spa Massage"
              className="rounded-md shadow-lg w-full max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </section>
      <section id="gallery" className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h5 className="text-center text-gray-700 text-lg font-semibold mb-6">
            <span className="border-b-2 border-gray-300 pb-1">Our Gallery</span>
          </h5>

          {/* Swiper Carousel */}
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={false}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              360: { slidesPerView: 2, spaceBetween: 10 },
              576: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
              1200: { slidesPerView: 5 },
              1400: { slidesPerView: 6 },
            }}
            className="w-full"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={src}
                    alt="Teju Spa Instagram"
                    className="rounded-md shadow-md w-full h-[200px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <div className="bg-[#B89545] py-10 px-4 flex justify-center">
        <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-6 md:space-y-0">
          {/* Item 1 */}
          <div className="flex items-center space-x-3">
            <div className="text-center md:text-left">
              <p className="text-white text-3xl font-semibold">23</p>
              <p className="text-white text-lg">Years of Experience</p>
            </div>
          </div>

          {/* Vertical Line - Hidden on Mobile */}
          <div className="hidden md:block h-16 w-px bg-white"></div>

          {/* Item 2 */}
          <div className="flex items-center space-x-3">
            <div className="text-center md:text-left">
              <p className="text-white text-3xl font-semibold">870</p>
              <p className="text-white text-lg">Wellness & Spa</p>
            </div>
          </div>

          {/* Vertical Line - Hidden on Mobile */}
          <div className="hidden md:block h-16 w-px bg-white"></div>

          {/* Item 3 */}
          <div className="flex items-center space-x-3">
            <div className="text-center md:text-left">
              <p className="text-white text-3xl font-semibold">30</p>
              <p className="text-white text-lg">Herbal Treatment</p>
            </div>
          </div>

          {/* Vertical Line - Hidden on Mobile */}
          <div className="hidden md:block h-16 w-px bg-white"></div>

          {/* Item 4 */}
          <div className="flex items-center space-x-3">
            <div className="text-center md:text-left">
              <p className="text-white text-3xl font-semibold">980</p>
              <p className="text-white text-lg">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>

      <section
        className="relative bg-cover bg-center py-16 px-6 lg:px-12"
        style={{
          backgroundImage:
            "url('https://i.imghippo.com/files/uio5256UvA.jpg')",
        }}
      >
        {/* Background Shape */}
        <div className="absolute inset-0">
          <img
            src="https://i.imghippo.com/files/tuQ3935Bg.jpg"
            alt="Teju"
            className="absolute left-0 top-0 w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="lg:w-2/3 text-center lg:text-left">
            <h5 className="text-white italic text-2xl mb-4 font-semibold">
              Book your services
            </h5>
            <h3 className="text-white text-4xl lg:text-5xl font-bold mb-6 leading-tight uppercase">
              Need to get relax or <br /> want to recharge?
            </h3>
            <button
              onClick={handleModalOpen}
              className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition"
            >
              Book Appointment
            </button>
          </div>

          {/* Right Image Section */}
          <div className="lg:w-1/3 flex flex-col relative mt-10 lg:mt-0">
            {/* First Image */}
            <div className="relative transform rotate-3 shadow-lg w-64 mx-auto">
              <img
                src="https://i.imghippo.com/files/Zw4803zyw.jpg"
                alt="Relaxing massage"
                className="rounded-md border-4 border-white"
              />
            </div>

            {/* Second Image */}
            <div className="relative transform -rotate-3 shadow-lg w-64 mx-auto mt-6">
              {/* Flower Overlay */}
              <img
                src="https://i.imghippo.com/files/Jo9601sOY.jpg"
                alt="Flower"
                className="absolute -top-6 -right-6 w-20"
              />
              <img
                src="https://i.imghippo.com/files/uio5256UvA.jpg"
                alt="Luxury Spa"
                className="rounded-md border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-black text-white py-12 relative">
        {/* Footer Container */}
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Email Subscription */}
            <div>
             <h3 className="text-[#B89545]"> Wellness</h3>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">LINKS</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#about" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white">
                    Services
                  </a>
                </li>

                <li>
                  <a href="#gallery" className="hover:text-white">
                    Gallery
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">CONTACT</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="tel:+8112345678" className="hover:text-white">
                    +234 81 1234 5678
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:needhelp@company.com"
                    className="hover:text-white"
                  >
                    contact@teju.dimpified.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://goo.gl/maps"
                    target="_blank"
                    className="hover:text-white"
                  >
                    {userDetails?.address}
                  </a>
                </li>
              </ul>
            </div>

            {/* Timing & Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">OPENING HOURS</h3>
              <p className="text-gray-400">Mon to Sat: 9:00am – 6:00pm</p>
              <p className="text-gray-400">Sunday: Closed</p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://twitter.com"
                  className="text-gray-400 hover:text-white text-lg"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://facebook.com"
                  className="text-gray-400 hover:text-white text-lg"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://pinterest.com"
                  className="text-gray-400 hover:text-white text-lg"
                >
                  <FaPinterestP />
                </a>
                <a
                  href="https://instagram.com"
                  className="text-gray-400 hover:text-white text-lg"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>
            {" "}
            &copy; {new Date().getFullYear()} built with{" "}
            <a
              href="https://dimpified.com"
              className="text-gray-400 hover:text-white text-lg"
            >
              Dimpified
            </a>
          </p>
        </div>

        {/* Back to Top */}
        <button className="absolute right-8 bottom-6 w-10 h-10 border border-yellow-500 text-yellow-500 flex items-center justify-center rounded-full hover:bg-yellow-500 hover:text-black transition">
          ↑
        </button>
      </footer>
    </div>
  );
};

export default SecondSpa;