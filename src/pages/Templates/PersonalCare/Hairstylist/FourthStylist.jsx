import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaRegClock,
} from "react-icons/fa";
import { GiHairStrands } from "react-icons/gi";
import { IoMdCut } from "react-icons/io";
import { MdOutlineColorLens, MdFaceRetouchingNatural } from "react-icons/md";
import { BiHappyHeartEyes } from "react-icons/bi";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

import { HairSalon } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
const FourthStylist = ({ userDetails }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [email, setEmail] = useState("");

  const toggleNav = () => setNavOpen(!navOpen);
  const closeNav = () => setNavOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email.");
    alert(`Thanks for joining, ${email}!`);
    setEmail("");
  };

  const teamMembers = [
    {
      name: "Amina Adeleke",
      role: "Lead Stylist",
      bio: "Specializes in African hair braiding and extensions with 10+ years experience.",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop",
    },
    {
      name: "Chioma Eze",
      role: "Color Specialist",
      bio: "Expert in vibrant colors and natural hair treatments for Nigerian textures.",
      img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=200&auto=format&fit=crop",
    },
    {
      name: "Bisi Johnson",
      role: "Hair Consultant",
      bio: "Helps clients find perfect styles for their face shape and lifestyle.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop",
    },
    {
      name: "Funke Balogun",
      role: "Makeup Artist",
      bio: "Creates flawless looks for weddings, parties and special occasions.",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop",
    },
  ];

  const testimonials = [
    {
      stars: 5,
      text: "HairGlam transformed my natural hair! The stylists understood exactly what my 4C hair needed. My twistout has never looked better!",
      name: "Ngozi Okonkwo",
      title: "Lagos",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      stars: 5,
      text: "I got my wedding hairstyle done here and it was perfect! They worked with my vision and made me feel like a queen on my special day.",
      name: "Adebimpe Adeleke",
      title: "Abuja",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      stars: 5,
      text: "Best salon in Lagos! They know how to handle Nigerian hair textures. My color came out vibrant without damage. Will definitely return!",
      name: "Tolani Williams",
      title: "Port Harcourt",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  

  return (
    <div className="font-sans">
      {/* Navigation */}
      <header className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <GiHairStrands className="text-3xl text-purple-600" />
            <span className="ml-2 font-bold text-xl">HairGlam</span>
          </a>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-800 hover:text-purple-600 transition"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-800 hover:text-purple-600 transition"
            >
              About
            </a>
            <a
              href="#services"
              className="text-gray-800 hover:text-purple-600 transition"
            >
              Services
            </a>
            <a
              href="#gallery"
              className="text-gray-800 hover:text-purple-600 transition"
            >
              Gallery
            </a>
            <a
              href="#team"
              className="text-gray-800 hover:text-purple-600 transition"
            >
              Team
            </a>
            <a
              href="#contact"
              className="text-gray-800 hover:text-purple-600 transition"
            >
              Contact
            </a>
          </nav>

          <button
            onClick={handleModalOpen}
            href="#book"
            className="hidden md:block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
          >
            Book Now
          </button>

          <button
            className="md:hidden text-2xl text-gray-800 focus:outline-none"
            onClick={toggleNav}
          >
            {navOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {navOpen && (
          <div className="md:hidden bg-white px-6 py-4 space-y-4 border-t">
            <a
              href="#home"
              className="block py-2 text-gray-800 hover:text-purple-600 transition"
              onClick={closeNav}
            >
              Home
            </a>
            <a
              href="#about"
              className="block py-2 text-gray-800 hover:text-purple-600 transition"
              onClick={closeNav}
            >
              About
            </a>
            <a
              href="#services"
              className="block py-2 text-gray-800 hover:text-purple-600 transition"
              onClick={closeNav}
            >
              Services
            </a>
            <a
              href="#gallery"
              className="block py-2 text-gray-800 hover:text-purple-600 transition"
              onClick={closeNav}
            >
              Gallery
            </a>
            <a
              href="#team"
              className="block py-2 text-gray-800 hover:text-purple-600 transition"
              onClick={closeNav}
            >
              Team
            </a>
            <a
              href="#contact"
              className="block py-2 text-gray-800 hover:text-purple-600 transition"
              onClick={closeNav}
            >
              Contact
            </a>
            <button
              onClick={handleModalOpen}
              href="#book"
              className="block bg-purple-600 text-white py-2 px-4 rounded-full text-center hover:bg-purple-700 transition"
             
            >
              Book Now
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
         style={{
          backgroundImage:
            "url('https://i.imghippo.com/files/ycQw2570gq.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Experience Premium Hair Care in Lagos
          </h1>
          <p className="text-lg md:text-xl mb-8">
            At HairGlam, we specialize in African hair textures, offering modern
            styles with traditional care techniques.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleModalOpen}
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition"
            >
              Book Appointment
            </button>
            <a
              href="#services"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition"
            >
              Our Services
            </a>
          </div>
          {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="container mx-auto md:flex items-center gap-12">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img
              src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop"
              alt="HairGlam Salon"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Welcome to HairGlam - Lagos' Premier Hair Destination
            </h2>
            <p className="text-gray-600 mb-6">
              Founded in 2015, HairGlam has become the go-to salon for Nigerian
              women who want quality hair care that understands our unique
              textures.
            </p>
            <p className="text-gray-600 mb-6">
              Our stylists are trained in both traditional African techniques
              and modern styling methods to give you the perfect look that
              lasts.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <BiHappyHeartEyes className="text-2xl text-purple-600" />
              </div>
              <p className="text-gray-600">
                <span className="font-semibold">5000+</span> satisfied clients
                and counting
              </p>
            </div>
            <a
              href="#services"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            We offer a complete range of hair and beauty services tailored for
            Nigerian women
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HairSalon.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                {/* <img
                  src={service.serviceImage}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                /> */}
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {service.name}
                </h3>
                <p className="text-gray-600">{service.shortDescription}</p>
                <button
                  onClick={handleModalOpen}
                  className="inline-block mt-4 text-purple-600 hover:text-purple-700 font-medium"
                >
                  Book Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-purple-600 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose HairGlam?</h2>
            <p className="max-w-2xl mx-auto">
              We combine traditional hair care wisdom with modern styling
              techniques
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GiHairStrands className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                African Hair Experts
              </h3>
              <p>
                Specialized in all Nigerian hair types from 4A to 4C textures
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdOutlineColorLens className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Products</h3>
              <p>We use only the best products designed for African hair</p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BiHappyHeartEyes className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Satisfaction Guaranteed
              </h3>
              <p>Your happiness is our priority - we'll make it right</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Work</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See some of our recent transformations and styling work
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             <img
              src="https://i.imghippo.com/files/yus5990UTE.jpg"
              alt="Hair coloring"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop"
              alt="Braiding"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://i.imghippo.com/files/Wm9746TY.jpg"
              alt="Hair cutting"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://i.imghippo.com/files/Wm9746TY.jpg"
              alt="Makeup"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://i.imghippo.com/files/Wt1697P.jpg"
              alt="Natural hair"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://i.imghippo.com/files/QPV2962Ts.jpg"
              alt="Styling"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Meet Our Stylists
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our talented team of certified professionals
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-1 text-gray-800">
                  {member.name}
                </h3>
                <p className="text-purple-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="text-gray-500 hover:text-purple-600">
                    <FaInstagram />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-purple-600">
                    <FaTwitter />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-purple-600">
                    <FaFacebookF />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-purple-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Client Testimonials
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              What our clients say about their HairGlam experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex mb-4 text-yellow-400">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09L5.824 12 1 7.91l6.06-.88L10 2l2.94 5.03L19 7.91 14.176 12l1.702 6.09z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-purple-600 text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">
            Ready for Your Hair Transformation?
          </h2>
          <p className="text-xl mb-8">
            Book your appointment today and experience the HairGlam difference
          </p>
          <button
            onClick={handleModalOpen}
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition"
          >
            Book Now
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="container mx-auto md:flex gap-12">
          <div className=" mb-10 md:mb-0">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-8">
              Visit our salon in Victoria Island or reach out to book your
              appointment
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Location</h3>
                  <p className="text-gray-600">
                    123 Adeola Odeku Street, Victoria Island, Lagos
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaPhoneAlt className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+234 812 345 6789</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaEnvelope className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">hello@HairGlam.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaRegClock className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9am - 7pm
                    <br />
                    Saturday: 10am - 5pm
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="contact" className=" bg-gray-50">
        <WhiteContactForm />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* About */}
            <div>
              <div className="flex items-center mb-4">
                <GiHairStrands className="text-2xl text-purple-400" />
                <span className="ml-2 font-bold text-xl">HairGlam</span>
              </div>
              <p className="text-gray-400 mb-4">
                Lagos' premier hair salon specializing in African hair textures
                and styles.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#team"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Our Team
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Hair Cutting
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Hair Coloring
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Braiding
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Weaving
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Makeup
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to get updates on special offers and events.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-purple-600 px-4 py-2 rounded-r-lg hover:bg-purple-700 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} HairGlam Hair Salon. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FourthStylist;
