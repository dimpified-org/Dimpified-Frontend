import React, { useState, useEffect } from "react";
import {
  FaPhone,
  FaTimes,
  FaBars,
  FaFacebookF,
  FaGooglePlusG,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

// SpaBeautyTemplate Component
const FourthSpa = ({ details, subdomain, userDetails }) => {
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
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    "Home",
    "About",
    "Services",
    "Pricing",
    "Portfolio",
    "Team",
  ];

  const teamMembers = [
    {
      name: details && details.Team.summary1,
      image: details && details.Team.image1,
      role: details && details.Team.header1,
    },
    {
      name: details && details.Team.summary2,
      image: details && details.Team.image2,
      role: details && details.Team.header2,
    },
    {
      name: details && details.Team.summary3,
      image: details && details.Team.image3,
      role: details && details.Team.header3,
    },
    {
      name: details && details.Team.summary4,
      image: details && details.Team.image4,
      role: details && details.Team.header4,
    },
  ];

  const testimonials = Object.keys(details?.Blog || {})
    .filter((key) => key.startsWith("header"))
    .map((key) => {
      const index = key.replace("header", "");

      return {
        name: details.Blog[`header${index}`],
        role: details.Blog[`summary${index}`] || "", // fallback if no summary
        image: details.Blog[`image${index}`],
        feedback: details.Blog[`content${index}`],
        index: Number(index),
      };
    });

  const galleryItems = Object.keys(details?.contactUs || {})
    .filter(
      (key) => key.startsWith("heading") && !isNaN(key.replace("heading", ""))
    )
    .map((key) => {
      const index = key.replace("heading", "");
      return {
        id: Number(index),
        img: details.contactUs[`heading${index}`],
        title: `Gallery Item ${index}`,
      };
    })
    .slice(0, 4);

  return (
    <div>
      <header className="relative z-10 px-6">
        {/* Top Bar */}

        {/* Main Header */}
        <div className="sticky top-0 bg-white  py-3">
          <div className="container mx-auto flex justify-between items-center lg:grid lg:grid-cols-3">
            {/* Left Navigation */}
            <nav className="hidden lg:flex lg:justify-start">
              <ul className="flex space-x-6">
                {navLinks.slice(0, 3).map((name, index) => (
                  <li key={index}>
                    <a
                      href={`#${name.toLowerCase()}`}
                      className="block py-2 px-4 hover:text-primary"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Center Logo */}
            <div className="flex justify-center">
              <Link to="/" className="w-40">
                <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
              </Link>
            </div>

            {/* Right Navigation */}
            <nav className="hidden lg:flex lg:justify-end">
              <ul className="flex space-x-6">
                {navLinks.slice(3).map((name, index) => (
                  <li key={name}>
                    <a
                      href={`#${name.toLowerCase()}`}
                      className="block py-2 px-4 hover:text-primary"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2">
              <FaBars className="text-gray-600 text-xl" />
            </button>

            {/* Mobile Navigation */}
            <div
              className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-lg transform ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              } transition-transform duration-300 lg:hidden`}
            >
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-600 text-xl"
                >
                  <FaTimes />
                </button>
              </div>
              <ul className="flex flex-col p-6 space-y-4">
                {navLinks.map((name, index) => (
                  <li key={index}>
                    <a
                      href={`#${name.toLowerCase()}`}
                      className="block py-2 px-4 hover:text-primary"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div
        className="relative w-full md:h-screen  h-[60vh]  flex items-center justify-center bg-[#FF5EA5] p-14 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
        }}
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left Content */}
          <div className="text-left">
            <h1 className="md:text-5xl text-3xl text-[#FF5EA5] font-bold drop-shadow-md">
              {userDetails && userDetails.ecosystemName}
              <br />
              <span className="text-[#FF5EA5]">
                {sanitizeContent(details && details.hero.title1)}
              </span>
            </h1>
            <p className="mt-4 text-sm text-black drop-shadow-md">
              {sanitizeContent(details && details.hero.summary1)}
            </p>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleModalOpen}
                className="bg-pink-500 text-white px-6 py-3 rounded font-semibold hover:bg-pink-600"
              >
                {sanitizeContent(details && details.hero.buttonText1)}
              </button>
              <a
                href="#about"
                className="bg-teal-500 text-white px-6 py-3 rounded font-semibold hover:bg-teal-600"
              >
                {sanitizeContent(details && details.hero.buttonText2)}
              </a>

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
          </div>
        </div>
      </div>
      <div>
        {/* Why Our Clients Choose Us */}
        <section
          id="about"
          className="relative bg-white bg-cover px-4 bg-[url('https://gfa-tech.com/dimp-template-images/spa/bg7.jpg')] md:py-20 py-7.5"
        >
          <div className="lg:px-32 flex flex-col px-4">
            <div className="grid grid-cols-12 gap-7.5">
              <div className="lg:col-span-5 col-span-12 mb-7.5 self-center">
                <div className="mb-7.5">
                  <h2 className="md:text-4.5xl text-3xl py-6 font-extrabold leading-[48px] text-[#232323] font-nunito">
                    {sanitizeContent(details && details.aboutUs.title1)}
                  </h2>
                  <p className="font-bold text-lg mb-3.75 text-[#232323] font-nunito">
                    {sanitizeContent(details && details.aboutUs.title2)}
                  </p>
                  <ul className="text-lg font-Montserrat mb-5 space-y-2">
                    {[
                      "Expert therapists trained in Swedish, deep tissue & hot stone massage",
                      "Organic, plant-based products for gentle skincare",
                      details && details.aboutUs.buttonText2,
                      details && details.aboutUs.text2,
                      details && details.aboutUs.text1,
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="relative pl-7 before:content-['\2022'] before:absolute before:left-0 before:text-[#777] before:text-2xl text-[#6f6f6f]"
                      >
                        {sanitizeContent(item)}
                      </li>
                    ))}
                  </ul>
                  <a
                    onClick={handleModalOpen}
                    className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                  >
                    {sanitizeContent(details && details.aboutUs.buttonText1)}
                  </a>
                </div>
              </div>

              {/* Gallery Images (Updated Alt Tags for SEO) */}
              <div className="lg:col-span-7 md:mt-0 mt-12 col-span-12 lg:ml-15.5">
                <div className="grid grid-cols-2 gap-5">
                  {[
                    details && details.aboutUs.image1,
                    details && details.aboutUs.image2,
                    details && details.aboutUs.image3,
                    details && details.aboutUs.image4,
                  ].map((image, index) => (
                    <div key={index} className="px-2.5">
                      <img
                        className="border-8 border-white shadow-lg w-full"
                        src={image}
                        alt={`Spa therapy ${
                          index + 1
                        } - Massage, facial, or wellness treatment`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Now Paired with Massage Benefits */}
        <section className="relative bg-white">
          <div className="w-full mx-auto md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-4">
              {(() => {
                const splitTitles = (details?.LargeCta?.header3 || "").split(
                  "||"
                );

                return [
                  {
                    num: 1,
                    imgSrc: details?.LargeCta?.image1,
                    title: splitTitles[0] || "", // First part
                    desc: details?.LargeCta?.summary1,
                  },
                  {
                    num: 2,
                    imgSrc: details?.LargeCta?.image2,
                    title: splitTitles[1] || "", // Second part
                    desc: details?.LargeCta?.summary2,
                  },
                ];
              })().map((item, index) => (
                <React.Fragment key={index}>
                  {/* Left Text Box */}
                  <div className="bg-[#FF5EA5] flex items-center p-10 text-white">
                    <div className="max-w-md">
                      <p className="font-semibold text-sm mb-2">
                        {sanitizeContent(details && details.LargeCta.header1)}
                      </p>
                      <h4 className="text-[30px] font-bold mb-4 font-nunito leading-9">
                        {sanitizeContent(item.title)}
                      </h4>
                      <p className="mb-6 text-white text-justify leading-relaxed">
                        {sanitizeContent(item.desc)}
                      </p>
                      <button
                        onClick={handleModalOpen}
                        className="border border-white text-white py-3 px-6 rounded-md hover:bg-white hover:text-[#FF5EA5] transition duration-300"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>

                  {/* Right Image Box */}
                  <div className="h-full">
                    <img
                      src={item.imgSrc}
                      className="w-full h-full object-cover"
                      alt={`${item.title} service at our spa`}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      </div>
      <section
        id="services"
        className="py-10 md:py-20 px-4 relative bg-gray-100"
      >
        <div className="container mx-auto relative z-10  text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#FF5EA5]">
            Our Services
          </h2>
          <div className="relative inline-block mt-4 mb-6">
            <i className="flaticon-spa text-[#FF5EA5] text-4xl"></i>
            <div className="absolute top-1/2 w-20 h-4 bg-center bg-no-repeat bg-contain left-[-60px] bg-[url('/images/line.png')]"></div>
            <div className="absolute top-1/2 w-20 h-4 bg-center bg-no-repeat bg-contain right-[-60px] bg-[url('/images/line1.png')]"></div>
          </div>
          <p className="max-w-xl mx-auto text-gray-600">
            Get best possible treatment with our Spa Services
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  mx-4  mt-10">
            {eServices.map((service, index) => (
              <div
                key={index}
                className="relative text-center p-6 border border-gray-200 bg-white hover:shadow-2xl hover:scale-105 transform duration-300"
              >
                <div className="w-32 h-32 mx-auto flex items-center justify-center">
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-full h-full object-contain rounded-full "
                  /> */}
                </div>
                <h3 className="text-xl font-bold mt-4">{service.name}</h3>
                <p className="text-gray-500 mt-2">{service.shortDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="pricing"
        className="pt-10 pb-14 bg-[#fef7fe] bg-bottom bg-cover px-6  bg-no-repeat"
      >
        <div className="container mx-auto  text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#FF5EA5]">
            Our Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-gray-700 mt-2 mb-10">
            We offer the best services within the most professional price range
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg text-start transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="flex justify-start items-start ">
                  <div>
                    <h4 className="text-[#FF5EA5] text-lg md:text-xl font-bold">
                      {service.name}
                    </h4>
                    <p className="text-gray-600"> {service.shortDescription}</p>
                  </div>
                  <h3 className="text-[#00BECF] text-2xl md:text-3xl font-extrabold">
                    {getCurrencySymbol(currency)}
                    {service.price}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center py-6 rounded-md flex justify-center items-center space-x-4">
            <p className="text-lg text-gray-800 mb-0">
              Looking for spa & beauty services? Book an appointment now.
            </p>
            <button className="bg-[#00BECF] text-white py-2 px-6 rounded-full font-semibold text-lg hover:bg-black transition">
              Book Now
            </button>
          </div>
        </div>
      </section>
      <section id="portfolio" className="md:pt-20 pt-7.5  px-6">
        <div className="text-center mb-5">
          <h2 className="lg:text-4.5xl text-3xl font-extrabold mb-2.5 text-primary font-nunito">
            {sanitizeContent(details?.Gallery?.summary1)}
          </h2>
          <p className="mx-auto max-w-[700px] pt-2.5 text-[#494949] max-sm:px-5">
            {sanitizeContent(details?.Gallery?.summary2)}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((num, index) => (
            <div
              key={num}
              className="relative group overflow-hidden rounded-xl"
            >
              <img
                src={details?.Gallery?.[`image${num}`]}
                alt={`Gallery image ${num}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
      <section className="py-10 md:py-20 bg-white  px-6 relative">
        <div id="team" className="container mx-auto text-center  px-6">
          {/* Heading */}
          <h2 className="text-[#FF5EA5] text-3xl md:text-4xl font-extrabold mb-4">
            Our Professional Team
          </h2>
          {/* Decorative Icon */}
          <div className="relative inline-block">
            <span className="text-[#FF5EA5] text-4xl">❀</span>
          </div>
          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-gray-600 mt-3"></p>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative p-5">
                  {/* Profile Image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full shadow-md border-[10px] border-white w-full"
                  />
                </div>
                {/* Name */}
                <h3 className="text-[#FF5EA5] uppercase text-lg font-bold mt-2">
                  {member.name}
                </h3>
                {/* Description */}
                <p className="text-gray-600 px-4">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="py-8 px-6 lg:py-20 bg-cover bg-bottom relative"
         style={{
          backgroundImage:
            "url('https://i.imghippo.com/files/zelY7681XjI.jpg')",
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-14  px-6">
            <h2 className="text-3xl lg:text-4.5xl font-extrabold text-primary font-nunito">
              Client Testimonials
            </h2>
            <div className="overflow-hidden inline-block relative">
              <i className="flaticon-spa text-primary text-4.5xl"></i>
            </div>
            <p className="max-w-xl mx-auto pt-2.5 text-[#494949]">
              Our client love what we do and here are some reviews to back it up{" "}
            </p>
          </div>

          {/* Swiper Carousel */}
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
              1024: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              0: { slidesPerView: 1, spaceBetween: 10 },
            }}
            className="testimonial-carousel"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="p-3 h-full flex items-center">
                  <div className="bg-white py-8 px-6 shadow-lg text-center border-b-[5px] border-[#FF5EA5] rounded-lg h-full flex flex-col justify-between">
                    <div className="mb-4 w-24 h-24 mx-auto rounded-full overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-black  text-[15px] mb-4">
                      {testimonial.feedback}
                    </p>
                    <div>
                      <strong className="text-black font-bold uppercase">
                        {testimonial.name}
                      </strong>
                      <br />
                      <span className="text-sm text-[#888] capitalize font-medium">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Dots Below */}
          <div className="flex justify-center mt-6">
            <div className="swiper-pagination"></div>
          </div>
        </div>

        {/* Custom Styles for Pagination */}
        <style jsx>{`
          .swiper-pagination {
            position: relative !important;
            bottom: 0 !important;
            display: flex;
            justify-content: center;
          }

          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background-color: #ddd; /* Default gray */
            opacity: 0.5;
            transition: opacity 0.3s ease-in-out, background-color 0.3s;
          }

          .swiper-pagination-bullet-active {
            background-color: #ff5ea5 !important; /* Pink color */
            opacity: 1;
            width: 12px;
            height: 12px;
          }
        `}</style>
      </section>
      <WhiteContactForm ecosystemDomain={subdomain} />
      <section className="py-10  px-6">
        <div className="container mx-auto  px-6">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            className="gallery-swiper"
          >
            {galleryItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative group">
                  <a href={item.fullImg} className="block relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="rounded-lg w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF5EA5] to-[#00BEFF] opacity-0 group-hover:opacity-80 transition duration-500"></div>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <footer className=" px-6">
        {/* Footer Top */}
        <div className="md:pt-20 pt-4  px-6 pb-5 bg-white bg-[url('https://gfa-tech.com/dimp-template-images/spa/bg8.jpg')] bg-cover bg-top bg-no-repeat">
          <div className="container mx-auto text-center px-4">
            {/* Logo */}
            <div className="max-w-[200px] mx-auto pb-7">
              <a href="/">
                <img
                  src={details && details.footer.logo}
                  alt="BeautyZone Logo"
                />
              </a>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center mt-6 gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#3B5998] text-white rounded-full hover:opacity-80"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="https://www.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#DE4E43] text-white rounded-full hover:opacity-80"
              >
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#007BB6] text-white rounded-full hover:opacity-80"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#8A5A4E] text-white rounded-full hover:opacity-80"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:opacity-80"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 bg-[#f9e8f9] text-center text-sm">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
            <div>
              <span className="text-black">Copyright © 2025</span>
              <a
                href="https://dimpified.com/"
                className="ml-1 text-black font-semibold hover:text-[#FF5EA5]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dimpified
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default FourthSpa;
