import { useEffect, useRef, useState } from "react";
import { FaRegHeart, FaUser, FaRegSmile } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

import { spa } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

const teamMembers = [
  {
    name: "Jackson Nash",
    role: "Massagist",
    image: "https://i.imghippo.com/files/mEXI5735be.jpg",
  },
  {
    name: "Ollie Schneider",
    role: "Orthopaedic Doctor",
    image: "https://i.imghippo.com/files/HcpB1578ws.jpg",
  },
  {
    name: "Roger West",
    role: "Skin Expert",
    image: "https://i.imghippo.com/files/UHJ8333qQU.jpg",
  },
  {
    name: "Alex Manning",
    role: "Chiropractic",
    image: "https://i.imghippo.com/files/mmUs8267FkE.jpg",
  },
];

// App Component
const FifthSpa = () => {
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
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "ALL GALLERY" },
    { id: "massage", label: "MASSAGE" },
    { id: "skincare", label: "SKIN CARE" },
    { id: "haircut", label: "HAIR CUT" },
    { id: "nailcare", label: "NAIL CARE" },
    { id: "beautyspa", label: "BEAUTY SPA" },
  ];

  const images = [
    {
      id: "massage",
      src: "https://i.imghippo.com/files/chu8182zY.jpg",
      title: "Full-body Massage",
      date: "08 Mar 2017",
    },
    {
      id: "skincare",
      src: "https://i.imghippo.com/files/wpfP1706sk.jpg",
      title: "Skin Treatment",
      date: "10 Apr 2018",
    },
    {
      id: "haircut",
      src: "https://i.imghippo.com/files/Onyn9273jJk.jpg",
      title: "Professional Haircut",
      date: "15 Jun 2019",
    },
    {
      id: "nailcare",
      src: "https://i.imghippo.com/files/kcb3423Fk.jpg",
      title: "Manicure & Pedicure",
      date: "22 Jul 2020",
    },
    {
      id: "beautyspa",
      src: "https://i.imghippo.com/files/DjOV8281Exk.jpg",
      title: "Relaxing Spa Treatment",
      date: "05 Sep 2021",
    },
    {
      id: "massage",
      src: "https://i.imghippo.com/files/X7218B.jpg",
      title: "Deep Tissue Massage",
      date: "12 Dec 2022",
    },
  ];
  return (
    <div>
      <header className="w-full bg-white md:px-32 px-1 ">
        {/* Topbar */}

        {/* Navbar */}
        <div className="relative flex justify-between items-center px-6 py-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Desktop Navbar (Centered Links) */}
          <nav className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
            {[
              { name: "Home", id: "home" },
              { name: "About Us", id: "about" },
              { name: "Services", id: "services" },
              { name: "Pricing", id: "pricing" },
              { name: "Gallery", id: "gallery" },
              { name: "Team", id: "team" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-700 hover:text-purple-500"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <Link href="/">
           <h2 className="text-purple-500 text-xl font-medium">Delight Spa</h2>
          </Link>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleModalOpen}
              className="bg-gradient-to-r from-purple-400 to-blue-300 text-white px-6 py-2 rounded-full"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Mobile Navbar */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-white ">
            {[
              { name: "Home", id: "home" },
              { name: "About Us", id: "about" },
              { name: "Services", id: "services" },
              { name: "Pricing", id: "pricing" },
              { name: "Gallery", id: "gallery" },
              { name: "Team", id: "team" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-700 hover:text-purple-500"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </header>
      <div
        id="#home"
        className="relative flex items-center justify-center bg-gray-100 min-h-screen px-6"
      >
        <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row items-center justify-between r md:text-left">
          {/* Text Section */}
          <div className="max-w-lg w-full md:w-1/2">
            <p className="text-lg italic text-gray-600">Paradise Spa</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Refresh & Rejuvenate
            </h1>
            <p className="text-gray-600 mt-4">
              We offer a full range of spa services for men and women, massages
              and therapy, the services of spa attendant and therapist. Entrust
              your wellbeing to professionals who really care about your health
            </p>
            <button
              onClick={handleModalOpen}
              className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-medium"
            >
              Book Appointment
            </button>
          </div>
          {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )}

          {/* Image Section */}
          <div className="max-w-lg w-full md:w-1/2 flex justify-center">
            <img
              src="https://i.imghippo.com/files/aMjK6575eM.jpg"
              alt="Beauty Spa"
              className="w-full rounded-full max-w-md md:max-w-lg"
            />
          </div>
        </div>
      </div>

      <section className="py-16 px-4 md:px-0 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-lg italic text-gray-500">Welcome to</h2>
            <h1 className="text-4xl font-bold text-gray-900">
              Paradise Spa and wellness centre
            </h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            We make you feel like a super person every day!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Paradise spa services combine botanical and advanced cosmeceutical
            ingredients with the Science of Beauty to bring you the ultimate in
            professional massage services
          </p>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="https://i.imghippo.com/files/UAFL4509GZE.jpg"
                alt="Paradise Center"
                className="max-w-sm w-full rounded-lg "
              />
            </div>

            <div className="w-full md:w-1/2 text-left">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="bg-purple-200 p-3 rounded-full text-purple-600 text-xl">
                    <FaRegHeart />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Variety Of Care
                    </h3>
                    <p className="text-gray-600">
                      Our Spa is unique among other Spas, all thanks to an
                      insurmountable level of service.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="bg-purple-200 p-3 rounded-full text-purple-600 text-xl">
                    <FaUser />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Qualified Staff
                    </h3>
                    <p className="text-gray-600">
                      Our Salon is unique among other Spas, all thanks to an
                      insurmountable team of professionals.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="bg-purple-200 p-3 rounded-full text-purple-600 text-xl">
                    <FaRegSmile />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Relaxation Centric
                    </h3>
                    <p className="text-gray-600">
                      Our Salon is unique among other Spas, all thanks to an
                      insurmountable focus on relaxation.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-lg italic text-gray-500">Explore</h2>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Services
            </h1>
            <div className="w-24 h-0.5 bg-gray-300 mx-auto mt-2"></div>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {spa.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg  p-6 flex flex-col items-center"
              >
               
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  /> */}
                </div>

                
                <h3 className="mt-5 text-xl text-center font-semibold text-gray-800">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-center mt-2">
                  {service.shortDescription}
                </p>

                
                <button
                  onClick={handleModalOpen}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full font-semibold text-sm hover:opacity-90 transition"
                >
                  BOOK NOW
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="gallery" className="bg-white py-16 px-4">
        <div className="flex flex-col lg:px-48 md:px-24">
          <div className="text-center mb-8">
            <h2 className="text-lg italic text-gray-500">Have a glance at </h2>
            <h2 className="text-3xl font-semibold text-gray-800">
              Our Gallery
            </h2>
            <div className="flex items-center justify-center mt-2">
              <hr className="w-24 border-t border-gray-400" />
              <br />
              <hr className="w-24 border-t border-gray-400" />
            </div>
          </div>

          {/* Filter Tabs */}

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images
              .filter((image) => activeTab === "all" || image.id === activeTab)
              .map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover rounded-lg "
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-all"></div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section id="team" className="py-16 bg-gray-100">
        <div className="flex flex-col lg:px-48 md:px-24 px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              <span className="block font-normal italic text-lg text-gray-500 ">
                Get the best services from
              </span>
              Our Prestigious Team
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                    <span className="block text-sm text-gray-500">
                      {member.role}
                    </span>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="flex flex-col lg:px-48 md:px-24 text-center">
          <h2 className="text-4xl font-semibold text-gray-900 pb-4">
            Our Pricing
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {spa.map((service, index) => (
              <div
                key={index}
                className="relative group p-8 h-[500px] bg-gray-100 rounded-2xl  text-center transition-all duration-300 hover:bg-gradient-to-r from-purple-400 to-pink-300 
               hover:bg-gradient-to-r from-purple-400 to-pink-300 text-white"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white ">
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  /> */}
                </div>
                <h3 className="mt-6 text-xl font-semibold transition-colors duration-300  text-black group-hover:text-white">
                  {service.name}
                </h3>
                <p className="text-lg  text-pink-600 ">
                  {" "}
                  {getFormattedPrice(service.price, countryCode)}
                </p>
                <ul className="mt-4 text-gray-700 space-y-1">
                  {service.shortDescription}
                </ul>
                <button
                  onClick={handleModalOpen}
                  className="flex absolute left-1/2 w-32 -translate-x-1/2 justify-center items-center mt-6 px-6 py-2 bottom-10 bg-gradient-to-r from-purple-400 to-pink-300 text-white rounded-full hover:opacity-90 focus:outline-none"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="#contact"
        className="bg-gray-100  flex flex-col md:flex-row items-center justify-center py-10 px-5 md:px-20"
      >
        {/* Left Image Section */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src="https://i.imghippo.com/files/zOlv2415st.jpg"
            alt="Appointment Image"
            className="w-80  rounded-full max-w-md md:max-w-full h-auto"
          />
        </div>

        {/* Right Content Section */}
        <div className="md:w-1/2 w-full text-center md:text-left mt-6 md:mt-0 px-8">
          <h2 className="text-gray-600 italic text-lg">Seamless Booking</h2>
          <h1 className="text-3xl font-bold text-gray-800">
            Make Reservations Now
          </h1>
          <div className="w-16 h-0.5 bg-gray-400 my-3 mx-auto md:mx-0"></div>

          <p className="text-gray-600 mt-2">
            Tap on the button below to experience a hassle free booking
            experience in seconds. Your spot will be totally reserved when you
            pay online and you get your services when you actuaslly book for
            without someone else taking your spot.
          </p>

          {/* Button */}
          <div className="mt-5">
            <button
              onClick={handleModalOpen}
              className="bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 px-6 rounded-full text-lg font-semibold  transition duration-300 hover:opacity-80"
            >
              Book an appointment now!
            </button>
          </div>
        </div>
      </section>
      <WhiteContactForm />

      <footer className="bg-gray-100 text-gray-600 text-sm">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Logo & Social Links */}
          <div>
            <img
              src="https://i.imghippo.com/files/hISx8518Y.jpg"
              alt="Logo"
              className="w-32 mb-3"
            />
            <p className="text-gray-700">Open hours: 8.00-18.00 Mon-Fri</p>
            <div className="flex space-x-3 mt-3">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-red-600">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-500">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Contacts</h3>
            <p className="text-gray-700">+234 80 1234 5678</p>
            <p className="text-gray-700">businessname@gmail.com</p>
            <p className="text-gray-700">Lagos, Nigeria</p>
          </div>

          {/* Newsletter */}

          {/* Image Widget */}
          <div className="grid grid-cols-3 gap-2">
            {[
              "https://i.imghippo.com/files/zOlv2415st.jpg",
              "https://i.imghippo.com/files/fHix4053Rw.jpg",
              "https://i.imghippo.com/files/aMjK6575eM.jpg",
              "https://i.imghippo.com/files/MsxU8527oSs.jpg",
              "https://i.imghippo.com/files/zOlv2415st.jpg",
              "https://i.imghippo.com/files/gIso3040aM.jpg",
            ].map((url, index) => (
              <a key={index} href="#">
                <img
                  src={url}
                  alt={`widget-${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className=" border-t border-gray-300 py-4 text-center text-gray-600 flex justify-between items-center px-6 max-w-6xl mx-auto">
          <span>
            Copyright &copy; 2025 Built with{" "}
            <a className="hover:text-primary3" href="https://dimpified.com">
              Dimpified
            </a>
          </span>
          <nav className="space-x-4">
            <a href="#about" className="hover:text-purple-400">
              About
            </a>
            <span>|</span>
            <a href="#services" className="hover:text-purple-400">
              Services
            </a>
            <span>|</span>
            <a href="#pricing" className="hover:text-purple-400">
              Pricing
            </a>
            <span>|</span>
            <a href="#gallery" className="hover:text-purple-400">
              Gallery
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
export default FifthSpa;