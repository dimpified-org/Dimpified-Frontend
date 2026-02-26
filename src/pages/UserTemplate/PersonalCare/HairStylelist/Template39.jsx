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
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { useCountry } from "../../../pricing/CountryContext";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

const FourthStylist = ({ details, subdomain, userDetails }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [email, setEmail] = useState("");
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

  const galleryImages = [
    {
      url: details?.Gallery?.image1,
      alt: "Hair coloring",
    },
    {
      url: details?.Gallery?.image2,
      alt: "Braiding",
    },
    {
      url: details?.Gallery?.image3,
    },
    {
      url: details?.Gallery?.image4,
      alt: "Makeup",
    },
    {
      url: details?.Gallery?.image5,
      alt: "Natural hair",
    },
    {
      url: details?.Gallery?.image6,
      alt: "Styling",
    },
  ];

  const teamMembers = [
    {
      name: details && details.Team.header1,
      role: details && details.Team.summary1,
      bio: "Specializes in African hair braiding and extensions with 10+ years experience.",
      img: details && details.Team.image1,
    },
    {
      name: details && details.Team.header2,
      role: details && details.Team.summary2,
      bio: "Expert in vibrant colors and natural hair treatments for Nigerian textures.",
      img: details && details.Team.image2,
    },
    {
      name: details && details.Team.header3,
      role: details && details.Team.summary3,
      bio: "Helps clients find perfect styles for their face shape and lifestyle.",
      img: details && details.Team.image3,
    },
    {
      name: details && details.Team.header3,
      role: details && details.Team.summary3,
      bio: "Creates flawless looks for weddings, parties and special occasions.",
      img: details && details.Team.image3,
    },
  ];

  const testimonials = [
    {
      stars: 5,
      text: details && details.Reviews.summary1,
      name: details && details.Reviews.header1,
      title: details && details.Reviews.title1,
      avatar: details && details.Reviews.image1,
    },
    {
      stars: 5,
      text: details && details.Reviews.summary2,
      name: details && details.Reviews.header2,
      title: details && details.Reviews.title2,
      avatar: details && details.Reviews.image2,
    },
    {
      stars: 5,
      text: details && details.Reviews.summary3,
      name: details && details.Reviews.header3,
      title: details && details.Reviews.title3,
      avatar: details && details.Reviews.image3,
    },
  ];
  const services = [
    {
      icon: <IoMdCut className="text-3xl mb-4 text-purple-600" />,
      title: "Hair Cutting & Styling",
      description:
        "Precision cuts and modern styles tailored for African hair textures",
      image:
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop",
    },
    {
      icon: <MdOutlineColorLens className="text-3xl mb-4 text-purple-600" />,
      title: "Hair Coloring",
      description:
        "Vibrant colors and highlights that protect your hair's health",
      image:
        "https://images.unsplash.com/photo-1559599076-9c61d8ed1f50?w=500&auto=format&fit=crop",
    },
    {
      icon: <GiHairStrands className="text-3xl mb-4 text-purple-600" />,
      title: "Braiding & Weaving",
      description:
        "Traditional and modern braiding techniques with quality extensions",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop",
    },
    {
      icon: (
        <MdFaceRetouchingNatural className="text-3xl mb-4 text-purple-600" />
      ),
      title: "Makeup Services",
      description:
        "Flawless makeup application for all occasions and skin tones",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop",
    },
  ];

  return (
    <div className="font-sans">
      {/* Navigation */}
      <header className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <GiHairStrands className="text-3xl text-purple-600" />
            <span className="ml-2 font-bold text-xl">
              {userDetails?.ecosystemName}
            </span>
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
              // onClick={closeNav}
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
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {sanitizeContent(details && details.hero.title1)}
          </h1>
          <p className="text-lg md:text-xl mb-8">
            {sanitizeContent(details && details.hero.summary1)}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleModalOpen}
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition"
            >
              {sanitizeContent(details && details.hero.buttonText1)}
            </button>
            <a
              href="#services"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition"
            >
              {sanitizeContent(details && details.hero.buttonText2)}
            </a>
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
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="container mx-auto md:flex items-center gap-12">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img
              src={details && details.aboutUs.image1}
              alt="HairGlam Salon"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {sanitizeContent(details && details.aboutUs.title1)}
            </h2>
            <p className="text-gray-600 mb-6">
              {sanitizeContent(details && details.aboutUs.text1)}
            </p>
            <p className="text-gray-600 mb-6">
              {sanitizeContent(details && details.aboutUs.text2)}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <BiHappyHeartEyes className="text-2xl text-purple-600" />
              </div>
              <p className="text-gray-600">
                {sanitizeContent(details && details.aboutUs.title2)}
              </p>
            </div>
            <a
              href="#services"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
            >
              {sanitizeContent(details && details.aboutUs.buttonText1)}
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
            {eServices.map((service, index) => (
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
            <h2 className="text-3xl font-bold mb-4">
              {sanitizeContent(details && details.LargeCta.summary1)}
            </h2>
            <p className="max-w-2xl mx-auto">
              {sanitizeContent(details && details.LargeCta.summary2)}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GiHairStrands className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {sanitizeContent(details && details.LargeCta.header1)}
              </h3>
              <p>{sanitizeContent(details && details.LargeCta.image1)}</p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdOutlineColorLens className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {sanitizeContent(details && details.LargeCta.header3)}
              </h3>
              <p>{sanitizeContent(details && details.LargeCta.buttonText1)}</p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BiHappyHeartEyes className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {sanitizeContent(details && details.LargeCta.header2)}
              </h3>
              <p>{sanitizeContent(details && details.LargeCta.image2)}</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {galleryImages.map((image, index) => (
              <div className="relative">
                <img
                  key={index}
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
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
                <div className="relative">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                </div>
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
            {sanitizeContent(details && details.Vision.visiomheader)}
          </h2>
           <p className="text-xl mb-8">
            {sanitizeContent(details && details.Vision.visionsummary)}
          </p>
          <button
            onClick={handleModalOpen}
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition"
          >
            {sanitizeContent(details && details.LargeCta.impactheader)}
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="container mx-auto md:flex gap-12">
          <div className=" mb-10 md:mb-0">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
               {sanitizeContent(details && details.contactUs.heading1)}
            </h2>
             <p className="text-gray-600 mb-8">
              {sanitizeContent(details && details.contactUs.heading2)}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Location</h3>
                  <p className="text-gray-600">
                    {userDetails?.localgovernment}, {userDetails?.state},{" "}
                    {userDetails?.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaPhoneAlt className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                   <p className="text-gray-600"> {userDetails?.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaEnvelope className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600"> {userDetails?.email}</p>
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
      <section id="book" className=" bg-gray-50">
        <WhiteContactForm ecosystemDomain={subdomain} />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* About */}
            <div>
              <div className="flex items-center mb-4">
                <GiHairStrands className="text-2xl text-purple-400" />
                <span className="ml-2 font-bold text-xl"> {userDetails?.ecosystemName}</span>
              </div>
              <p className="text-gray-400 mb-4">
                {sanitizeContent(details && details.footer.paragraph1)}
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
                {eServices.slice(0, 5).map((service, index) => (
                  <li key={index}>
                    <a
                      href="#services"
                      className="text-gray-300 hover:text-yellow-500"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
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
              © {new Date().getFullYear()} {userDetails?.ecosystemName} Hair Salon. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FourthStylist;
