import React, { useState } from "react";
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

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { spa } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

// SpaBeautyTemplate Component
const FourthSpa = ({ userDetails }) => {
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
  const navLinks = [
    "Home",
    "About",
    "Services",
    "Pricing",
    "Portfolio",
    "Team",
  ];

  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { name: "All", filter: "" },
    { name: "Massage", filter: "image-1" },
    { name: "Facials", filter: "image-2" },
    { name: "Therapy", filter: "image-3" },
    { name: "Scrubs", filter: "image-4" },
  ];

  const teamMembers = [
    {
      name: "Ann Smith",
      image: "https://i.imghippo.com/files/LHAS4663Sx.jpg",
      role: "Founder & CEO",
      description:
        "Ann is the visionary behind our company, leading with innovation and passion to create exceptional experiences.",
    },
    {
      name: "Mary Lucas",
      image: "https://i.imghippo.com/files/KHtR1229VE.jpg",
      role: "Lead Designer",
      description:
        "Mary crafts stunning and user-friendly designs, ensuring a seamless experience for all our clients.",
    },
    {
      name: "Jennifer Roberts",
      image: "https://i.imghippo.com/files/nXcT8826gg.webp",
      role: "Marketing Director",
      description:
        "Jennifer drives our brand strategy, building meaningful connections with customers and expanding our reach.",
    },
    {
      name: "Candice Marshall",
      image: "https://i.imghippo.com/files/zwJb5715vl.webp",
      role: "Head of Operations",
      description:
        "Candice ensures smooth day-to-day operations, optimizing efficiency and delivering outstanding service.",
    },
  ];

  const testimonials = [
    {
      name: "Claudia Kennen",
      role: "Spa Enthusiast",
      image: "https://i.imghippo.com/files/LHAS4663Sx.jpg",
      feedback:
        "My experience at BeautyZone was truly relaxing. The staff is professional, and the treatments are incredibly soothing. Highly recommended!",
    },
    {
      name: "Elizabeth Ross",
      role: "Wellness Blogger",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      feedback:
        "BeautyZone is my go-to spa for relaxation and rejuvenation. The atmosphere is calming, and the massage therapy is top-notch!",
    },
    {
      name: "John Doe",
      role: "Frequent Spa Visitor",
      image: "https://i.imghippo.com/files/s3164s.jpg",
      feedback:
        "From facials to deep tissue massages, BeautyZone offers an exceptional experience. I always leave feeling refreshed and renewed!",
    },
    {
      name: "Sophia Williams",
      role: "Holistic Wellness Coach",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      feedback:
        "I love the personalized treatments at BeautyZone. The staff takes the time to understand your needs and provide the perfect spa experience!",
    },
    {
      name: "Alice Brown",
      role: "Luxury Spa Aficionado",
      image: "https://randomuser.me/api/portraits/women/12.jpg" ,
      feedback:
        "Every visit to BeautyZone is pure bliss! The aromatherapy and skilled therapists make it an unforgettable experience.",
    },
    {
      name: "Emma Johnson",
      role: "Massage Therapy Lover",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      feedback:
        "BeautyZone offers the best massages in town! The ambiance, service, and treatments are all five-star quality!",
    },
  ];

  const galleryItems = [
    {
      id: 1,
      img: "https://i.imghippo.com/files/FPu5241a.jpg",
      fullImg: "/assets/images/gallery/pic1.jpg",
      title: "Back Massage",
    },
    {
      id: 2,
      img: "https://i.imghippo.com/files/DB7044jEw.jpg",
      fullImg: "/assets/images/gallery/pic2.jpg",
      title: "Spa Massage Therapy",
    },
    {
      id: 3,
      img: "https://i.imghippo.com/files/NPVD4212mmA.jpg",
      fullImg: "/assets/images/gallery/pic3.jpg",
      title: "Face Massage",
    },
    {
      id: 4,
      img: "https://i.imghippo.com/files/fvpy9475vmQ.jpg",
      fullImg: "/assets/images/gallery/pic4.jpg",
      title: "Relaxing Spa",
    },
  ];

  const images = [
    {
      src: "https://i.imghippo.com/files/SuC4163NU.jpg",
      filter: ["image-1", "image-4"],
      title: "Back massage",
    },
    {
      src: "https://i.imghippo.com/files/fvpy9475vmQ.jpg",
      filter: ["image-2", "image-3"],
      title: "Shoulders massage",
    },
    {
      src: "https://i.imghippo.com/files/DB7044jEw.jpg",
      filter: ["image-2", "image-1"],
      title: "Face massage",
    },
    {
      src: "https://i.imghippo.com/files/NPVD4212mmA.jpg",
      filter: ["image-4", "image-2"],
      title: "Head massage",
    },
    {
      src: "https://i.imghippo.com/files/SuC4163NU.jpg",
      filter: ["image-1", "image-5"],
      title: "Back massage",
    },
    {
      src: "https://i.imghippo.com/files/fvpy9475vmQ.jpg",
      filter: ["image-2", "image-3"],
      title: "Shoulders massage",
    },
    {
      src: "https://i.imghippo.com/files/DB7044jEw.jpg",
      filter: ["image-2", "image-1"],
      title: "Face massage",
    },
    {
      src: "https://i.imghippo.com/files/NPVD4212mmA.jpg",
      filter: ["image-4", "image-5"],
      title: "Head massage",
    },
  ];

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
               <h2 className="text-pink-600 text-2xl">Spa Centre</h2> 
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
          backgroundImage: "url('https://i.imghippo.com/files/fYnD3552vg.jpg')",
        }}
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left Content */}
          <div className="text-left">
            <h1 className="md:text-5xl text-3xl text-[#FF5EA5] font-bold drop-shadow-md">
              {userDetails?.ecosystemName}
              <br />
              <span className="text-[#FF5EA5]">Spa Palace</span>
            </h1>
            <p className="mt-4 text-sm text-black drop-shadow-md">
              We offer a full range of spa services for men and women, massages
              and therapy, the services of spa attendant and therapist. Entrust
              your wellbeing to professionals who really care about your health
            </p>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleModalOpen}
                className="bg-pink-500 text-white px-6 py-3 rounded font-semibold hover:bg-pink-600"
              >
                Book us now
              </button>
              <a
                href="#about"
                className="bg-teal-500 text-white px-6 py-3 rounded font-semibold hover:bg-teal-600"
              >
                About us
              </a>

              {isModalOpen && (
                <BookingModal
                  isOpen={isModalOpen}
                  handleClose={handleModalClose}
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
          className="relative bg-white bg-cover px-4 md:py-20 py-7.5 bg-[url('https://i.imghippo.com/files/sI2566OxA.jpg')]"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/60"></div>

          {/* Content */}
          <div className="relative lg:px-32 flex flex-col px-4">
            <div className="grid grid-cols-12 gap-7.5">
              <div className="lg:col-span-5 col-span-12 mb-7.5 self-center">
                <div className="mb-7.5">
                  <h2 className="md:text-4.5xl text-3xl py-6 font-extrabold leading-[48px] text-[#232323] font-nunito">
                    Escape to Serenity
                  </h2>
                  <p className="font-bold text-lg mb-3.75 text-[#232323] font-nunito">
                    Lagos’ premier wellness sanctuary, blending therapeutic
                    massage, skin rejuvenation, and holistic therapies for total
                    renewal.
                  </p>
                  <ul className="text-lg font-Montserrat mb-5 space-y-2">
                    {[
                      "Expert therapists trained in Swedish, deep tissue & hot stone massage",
                      "Organic, plant-based products for gentle skincare",
                      "Tranquil ambiance designed to dissolve stress",
                      "Customized treatments for your wellness goals",
                      "Award-winning relaxation techniques",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="relative pl-7 before:content-['\2022'] before:absolute before:left-0 before:text-[#232323] before:text-2xl text-[#232323]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    onClick={handleModalOpen}
                    className="bg-teal-500 text-white py-4 px-4 rounded hover:bg-pink-600"
                  >
                    Book an appointment
                  </a>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="lg:col-span-7 md:mt-0 mt-12 col-span-12 lg:ml-15.5">
                <div className="grid grid-cols-2 gap-5">
                  {[
                    "https://i.imghippo.com/files/fYnD3552vg.jpg",
                    "https://i.imghippo.com/files/ibE7656A.jpg",
                    "https://i.imghippo.com/files/Vbbg5804fo.jpg",
                    "https://i.imghippo.com/files/Dky8498ZPI.jpg",
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
              {[
                {
                  num: 1,
                  imgSrc: "https://i.imghippo.com/files/WEn4820gZM.jpg",
                  title: "Skin Revival + Massage",
                  desc: "Facial treatments paired with lymphatic drainage massage to detoxify skin and reduce puffiness.",
                },
                {
                  num: 2,
                  imgSrc: "https://i.imghippo.com/files/ibE7656A.jpg",
                  title: "Therapeutic Massages",
                  desc: "Tailored deep tissue or aromatherapy massages to relieve muscle tension and restore balance.",
                },
              ].map((item, index) => (
                <React.Fragment key={index}>
                  {/* Left Text Box */}
                  <div className="bg-[#FF5EA5] flex items-center p-10 text-white">
                    <div className="max-w-md">
                      <p className="font-semibold text-sm mb-2">MOST BOOKED</p>
                      <h4 className="text-[30px] font-bold mb-4 font-nunito leading-9">
                        {item.title}
                      </h4>
                      <p className="mb-6 text-white text-justify leading-relaxed">
                        {item.desc}
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
            {spa.slice(0, 6).map((service, index) => (
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
            {spa.slice(0, 6).map((service, index) => (
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
                    {getFormattedPrice(service.price, countryCode)}
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
            Our Portfolio
          </h2>
          <p className="mx-auto max-w-[700px] pt-2.5 text-[#494949] max-sm:px-5">
            A sneek peek at some of our works
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-3 mb-8 ">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`px-4 py-2 border-b-2 ${
                activeTab === tab.name
                  ? "border-[#FF5EA5] text-[#FF5EA5]"
                  : "border-transparent text-black"
              } transition-all`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-5">
          {images
            .filter(
              (img) =>
                activeTab === "All" ||
                img.filter.includes(
                  tabs.find((t) => t.name === activeTab)?.filter
                )
            )
            .map((img, index) => (
              <div key={index} className="relative group">
                <div className="relative overflow-hidden before:absolute before:size-full before:opacity-0 before:left-0 before:top-0 before:z-[1] before:duration-500 before:bg-[linear-gradient(45deg,_#ff5ea5_5%,_#00becf_100%)] group-hover:before:opacity-80">
                  <img src={img.src} className="w-full" alt={img.title} />
                  <div className="absolute left-0 bottom-0 size-full text-center z-10 invisible group-hover:visible group-hover:duration-500">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="inline-block bg-white p-2 text-base rounded-full text-primary cursor-pointer">
                        <i className="text-base font-medium ti-fullscreen"></i>
                      </span>
                    </div>
                  </div>
                </div>
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
      <WhiteContactForm />
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
      <footer className=" bg-[#f9e8f9] px-6">
        {/* Footer Top */}
        <div className="md:pt-20 pt-4  px-6 pb-5  bg-cover bg-top bg-no-repeat">
          <div className="container mx-auto text-center px-4">
            {/* Logo */}
            <div className="max-w-[200px] mx-auto pb-7">
              <h3 className="text-gray-800 text-2xl">Beauty Spa</h3>
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
          <div className="container mx-auto  items-center px-4">
            <div className="mx-aut">
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
