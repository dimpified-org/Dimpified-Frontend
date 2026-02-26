import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaSkype,
  FaPlay,
} from "react-icons/fa";

import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

import { spa } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

export default function EightSpa() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const galleryImages = [
    "https://i.imghippo.com/files/Qf3453Bc.jpg",
    "https://i.imghippo.com/files/gsy8394hFM.jpg",
    "https://i.imghippo.com/files/dAkt4571Zw.jpg",
    "https://i.imghippo.com/files/Qf3453Bc.jpg",
    "https://i.imghippo.com/files/CRM2995UA.jpg",
    "https://i.imghippo.com/files/Qf3453Bc.jpg",
  ];
  const galleryImages2 = [
    "https://i.imghippo.com/files/IAl8473hM.jpg",
    "https://i.imghippo.com/files/LeYf9145Dc.jpg",
    "https://i.imghippo.com/files/fRC7625u.jpg",
    "https://i.imghippo.com/files/aNd3853wg.jpg",
    "https://i.imghippo.com/files/Bs6383Co.jpg",
    "https://i.imghippo.com/files/zyh1759cBQ.jpg",
    "https://i.imghippo.com/files/RGq3114DgM.jpg",
    "https://i.imghippo.com/files/mS2502Hc.jpg",
    "https://i.imghippo.com/files/iKnj6498IPo.jpg",
  ];

  return (
    <div className=" min-h-screen bg-[#ffece3] relative">
      {/* Navbar */}
      <header className="fixed w-full top-0 left-0 z-50 bg-[#ffece3] lg:px-24">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="text-xl font-bold flex items-center gap-2">
           
            <div>
              <h1 className="text-xl font-bold">FeelGood</h1>
              <p className="text-sm">Beauty And Spa</p>
            </div>
          </div>

          {/* Hamburger / Close Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6 text-sm text-black">
            {" "}
            <li>
              {" "}
              <a href="#about" className="hover:text-[#7B4F3D]">
                ABOUT
              </a>
            </li>
            <li>
              {" "}
              <a href="#services" className="hover:text-[#7B4F3D]">
                SERVICES
              </a>
            </li>
            <li>
              {" "}
              <a href="#gallery" className="hover:text-[#7B4F3D]">
                GALLERY
              </a>
            </li>
            <li>
              {" "}
              <a href="#contact" className="hover:text-[#7B4F3D]">
                CONTACT US
              </a>
            </li>
            <li>
              <button
                onClick={handleModalOpen}
                className="bg-[#7B4F3D] text-white px-4 py-2 rounded"
              >
                Book an Appointment
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden w-full bg-white px-6 py-4 shadow">
            <ul className="flex flex-col gap-4 text-sm text-black">
              <li>
                {" "}
                <a href="#about" className="hover:text-[#7B4F3D]">
                  ABOUT
                </a>
              </li>
              <li>
                {" "}
                <a href="#services" className="hover:text-[#7B4F3D]">
                  SERVICES
                </a>
              </li>
              <li>
                {" "}
                <a href="#gallery" className="hover:text-[#7B4F3D]">
                  GALLERY
                </a>
              </li>
              <li>
                {" "}
                <a href="#contact" className="hover:text-[#7B4F3D]">
                  CONTACT US
                </a>
              </li>
              <li>
                <button
                  onClick={handleModalOpen}
                  className="bg-[#7B4F3D] text-white px-4 py-2 rounded"
                >
                  Book an Appointment
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="#home"
        className={`w-full pt-[50px] ${
          isMenuOpen ? "pb-20" : ""
        } transition-all duration-300`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 gap-6 lg:h-[90vh]">
          {/* Left Text */}
          <div className="w-full lg:w-1/2 text-center pt-24 md:pt-0 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0b132a] leading-snug">
              Heal Your Body <br /> And Mind
            </h1>
            <p className="text-gray-700">
              In healing your body and mind with a fresh treatment
            </p>
            <button
              onClick={handleModalOpen}
              className="bg-[#7B4F3D] text-white px-6 py-3 rounded-md"
            >
              Book an Appointment
            </button>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="https://i.imghippo.com/files/pT8376Wbc.jpg"
              alt="hero"
              className="max-w-full rounded-full md:h-[500px] h-[350px] mb-12 md:mb-0"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-4">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between text-center lg:text-left space-y-16 lg:space-y-0 lg:space-x-12">
          {/* Left Image + Text */}
          <div className="flex flex-col items-center">
            <img
              src="https://i.imghippo.com/files/A4494h.jpg"
              alt="Skin Treatment"
              className="rounded-full w-72 h-72 object-cover  "
            />
            <h3 className="text-xl font-serif text-[#0f1b3d] mt-6">
              Skin Treatment
            </h3>
          </div>

          {/* Center Text */}
          <div id="about" className="lg:max-w-xl text-center">
            <p className="text-[#c76e3d] uppercase tracking-widest text-xl mb-2">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#0f1b3d] mb-4 leading-snug">
              World-Class Beauty <br /> Treatment
            </h2>
            <p className="text-gray-600 text-base mb-6 leading-relaxed">
              At FeelGood, we specialize in luxury spa experiences designed to
              rejuvenate your skin, mind, and spirit. From advanced skincare to
              holistic massage therapies, our team of experts is committed to
              providing the highest standard of care in a serene environment.
            </p>
            <a href="#services">
              {" "}
              <button className="bg-[#9A4C2B] text-white px-6 py-3 rounded-md text-sm hover:bg-[#7a3d24] transition">
                Explore our services
              </button>
            </a>
            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )}
          </div>

          {/* Right Image + Text */}
          <div className="flex flex-col items-center">
            <img
              src="https://i.imghippo.com/files/MkPL9063Vd.jpg"
              alt="Spa Massage"
              className="rounded-full w-72 h-72 object-cover"
            />
            <h3 className="text-xl font-serif text-[#0f1b3d] mt-6">
              Spa Massage
            </h3>
          </div>
        </div>

        {/* Logo Strip */}
        {/* <div className="max-w-6xl mx-auto mt-20 border-t pt-10 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/brand1.png"
            alt="Logo1"
            className="h-12"
          />
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/brand2.png"
            alt="Logo2"
            className="h-12"
          />
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/brand3.png"
            alt="Logo3"
            className="h-12 "
          />
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/brand4.png"
            alt="Logo4"
            className="h-12 hidden md:block"
          />
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/brand5.png"
            alt="Logo5"
            className="h-12 hidden md:block"
          />
          <img
            src="https://gfa-tech.com/dimp-template-images/make-up/brand2.png"
            alt="Logo6"
            className="h-12 hidden md:block"
          />
        </div> */}
      </section>
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Images */}
          <div className="relative w-full flex justify-center">
            <img
              src="https://i.imghippo.com/files/pT8376Wbc.jpg"
              alt="Hot Stone Massage"
              className="w-[90%] rounded-xl shadow-md"
            />
         
          </div>

          {/* Right: Text Content */}
          <div className="text-left">
            <p className="text-[#c76e3d] uppercase tracking-wider text-xl mb-2">
              Our Stories
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#0f1b3d] mb-4 leading-snug">
              Our Journey Started From 1990
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Since our humble beginnings in 1990, we’ve been dedicated to
              bringing peace, wellness, and beauty into the lives of our
              clients. From ancient therapies to modern techniques, our
              commitment to holistic care has stood the test of time.
            </p>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <img
                  src="https://i.imghippo.com/files/Oda5991yOo.jpg"
                  alt="Stone Icon"
                />
                <div>
                  <h4 className="text-xl font-serif text-[#0f1b3d] mb-1">
                    Premium Equipment
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We use only the finest spa and skincare tools, ensuring
                    every treatment delivers exceptional results in comfort and
                    style.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src="https://i.imghippo.com/files/HgQ5763Qk.jpg"
                  alt="Support Icon"
                />
                <div>
                  <h4 className="text-xl font-serif text-[#0f1b3d] mb-1">
                    Personalized Care
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Our team provides expert support tailored to your unique
                    needs, ensuring every visit leaves you feeling renewed and
                    cared for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="bg-[#8b4d32] text-white py-20 px-4">
        <div className="my-10 text-center">
          <p className="text-xl tracking-widest text-white font-medium uppercase mb-1">
            Services
          </p>
          <h2 className="text-4xl font-bold text-gray-100">
            Our Luxury Services
          </h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {spa.map((service, index) => (
            <div key={index}>
              <button onClick={handleModalOpen}>
                {" "}
                <div className="mb-4 text-white flex justify-center">
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-32 h-32 object-contain rounded-full "
                  /> */}
                </div>
              </button>
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              <p className="text-sm leading-relaxed text-white/90">
                {service.shortDescription}
              </p>
              <button
                onClick={handleModalOpen}
                className="hover:text-[#6e3a24] mt-4 underline"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-1 text-center bg-white">
        <div className="mb-14 mt-[10%]">
          <p className="text-[#B37148] uppercase text-sm tracking-wider mb-2">
            Intro Video
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#121212]">
            Live With Full Precious
          </h2>
        </div>

        {/* Video Section */}
        <div className="relative mx-auto mb-12">
          <img
            src="https://i.imghippo.com/files/hTT3554XM.jpg"
            alt="Spa video thumbnail"
            className="w-[100%] h-[60%] rounded-xl shadow-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-[#B37148] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform">
              <FaPlay />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto">
          <div>
            <h3 className="text-5xl font-semibold text-[#B37148]">1990</h3>
            <p className="uppercase text-xl text-gray-600 mt-2 tracking-wider">
              Cup of Coffee
            </p>
          </div>
          <div>
            <h3 className="text-5xl font-semibold text-[#B37148]">2398</h3>
            <p className="uppercase text-xl text-gray-600 mt-2 tracking-wider">
              Weeding Program
            </p>
          </div>
          <div>
            <h3 className="text-5xl font-semibold text-[#B37148]">500+</h3>
            <p className="uppercase text-xl text-gray-600 mt-2 tracking-wider">
              Projects Done
            </p>
          </div>
          <div>
            <h3 className="text-5xl font-semibold text-[#B37148]">9081</h3>
            <p className="uppercase text-xl text-gray-600 mt-2 tracking-wider">
              Active Members
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="mb-10 text-left md:text-left">
            <p className="text-xl tracking-widest text-[#a67554] font-medium uppercase mb-1">
              Gallery
            </p>
            <h2 className="text-4xl font-bold text-gray-800">
              We're great at what we do
            </h2>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full h-70  object-cover rounded-lg shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>
      <section
        className="bg-cover bg-center text-white py-24 px-4"
        style={{
          backgroundImage:
            "url('https://i.imghippo.com/files/sCnv4647X.jpg')",
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase text-xl font-bold tracking-widest mb-2">
            Make Easy Reservation
          </p>
          <h2 className="text-5xl font-extrabold mb-8">
            We Are  Waiting To Treat
            <br /> You Well
          </h2>

          <button
            onClick={handleModalOpen}
            className="bg-[#8b4d32] hover:bg-[#6e3a24] transition px-6 py-3 text-white"
          >
            Book an appointment
          </button>
        </div>
      </section>

      <section id="contact" className=" bg-white">
        <WhiteContactForm />
      </section>

      <footer className="bg-[#C27952] text-white relative">
        <div className=" flex-col h-full  py-4 px-4 lg:px-24 grid md:grid-cols-3 gap-10 items-center">
          {/* Logo and Text */}
          <div>
            <div className="flex items-center mb-4">
              
              <h2 className="text-2xl font-bold">FeelGood</h2>
            </div>
            <p className="text-white text-sm mb-6 max-w-xs">
              Indulge in tranquility with our luxurious spa treatments. From
              soothing massages to rejuvenating facials, we bring you the
              perfect escape for relaxation and self-care.
            </p>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-3 gap-2">
            {galleryImages2.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Gallery ${idx + 1}`}
                className="w-full rounded-lg h-20 object-cover"
              />
            ))}
          </div>

          {/* Follow Us */}
          <div className="bg-white text-center text-[#1c1c1c] p-6 rounded-md">
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <p className="text-sm mb-4 text-gray-600">
              Follow for get every single updates
            </p>
            <div className="flex justify-center gap-4 text-[#C27952] text-xl mb-4">
              <FaFacebookF />
              <FaTwitter />
              <FaSkype />
              <FaInstagram />
              <FaYoutube />
            </div>
            <p className="text-sm text-gray-700">info@example.com</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-4 px-4 flex justify-center items-center text-sm text-white container mx-auto lg:px-24">
          <p>
            Copyright © 2025. Bulit with
            <a
              href="https://dimpified.com/"
              className="ml-1 text-white font-semibold hover:text-[#FF5EA5]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dimpified
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}