import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaQuoteLeft,
  FaArrowLeft,
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaCut,
} from "react-icons/fa";
import { GiHairStrands } from "react-icons/gi";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

const Template48 = ({ details, subdomain, userDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eServices, setEServices] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [current, setCurrent] = useState(0);

  const { country } = useCountry();
  const countryCode = country || "NG";

  // Fetch services
  useEffect(() => {
    const getServiceDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`
        );
        const userCurrency = response.data.flatMap((item) => item.currency);
        const allServices = response.data.flatMap((item) => item.services);
        setCurrency(userCurrency);
        setEServices(allServices);
      } catch (error) {
        console.log("Error fetching services", error);
      }
    };
    getServiceDetails();
  }, [subdomain]);

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sanitizeContent = (html) => {
    return sanitizeHtml(html, {
      allowedTags: [],
      allowedAttributes: {},
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonialsData.length);
  };

  const prev = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  // Map JSON data to sections
  const navLinks = [
    details?.navbar?.link1 || "Home",
    details?.navbar?.link2 || "About",
    details?.navbar?.link3 || "Services",
    details?.navbar?.link4 || "Pricing",
    details?.navbar?.link5 || "Contact",
  ].filter((link) => link !== "not available");

  const testimonialsData = [
    {
      quote:
        details?.Reviews?.summary1 ||
        "I had the privilege of working with HairGlam on a complex styling session. Their professionalism, attention to detail, and strategic approach resulted in a stunning transformation that exceeded my expectations.",
      name: details?.Reviews?.header1 || "Kende Attila",
      role: details?.Reviews?.title1 || "Software Tester",
      image:
        details?.Reviews?.image1 ||
        "https://randomuser.me/api/portraits/women/21.jpg",
    },
    {
      quote:
        details?.Reviews?.summary2 ||
        "The team at HairGlam is exceptional. They took the time to understand my needs and delivered a hairstyle that perfectly matched my personality. I couldn't be happier with the results!",
      name: details?.Reviews?.header2 || "Sarah Johnson",
      role: details?.Reviews?.title2 || "Marketing Director",
      image:
        details?.Reviews?.image2 ||
        "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      quote:
        details?.Reviews?.summary3 ||
        "From the moment I walked in, I knew I was in good hands. The stylists at HairGlam are true artists who care about their craft. My hair has never looked better!",
      name: details?.Reviews?.header3 || "Michael Chen",
      role: details?.Reviews?.title3 || "Graphic Designer",
      image:
        details?.Reviews?.image3 ||
        "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      quote:
        details?.Reviews?.summary4 ||
        "HairGlam transformed my damaged hair into a healthy, shiny masterpiece. Their knowledge of hair care and styling techniques is unmatched. Highly recommend!",
      name: details?.Reviews?.header4 || "Emily Rodriguez",
      role: details?.Reviews?.title4 || "Teacher",
      image:
        details?.Reviews?.image4 ||
        "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ];

  const galleryImages = [
    details?.Gallery?.image1 || "https://i.imghippo.com/files/nGzy7975jmg.jpg",
    details?.Gallery?.image2 ||
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop",
    details?.Gallery?.image3 ||
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop",
    details?.Gallery?.image4 || "https://i.imghippo.com/files/GPw7426C.jpg",
    "https://i.imghippo.com/files/pF2187MIk.jpg",
    "https://i.imghippo.com/files/AnBh4680GqM.jpg",
  ].filter((image) => image !== "not available");

  return (
    <div className={`font-sans `}>
      {/* Navbar */}
      <nav
        className={` w-full z-50 transition-colors duration-300 ${
          scrolled
            ?"bg-[#D6B981]"
            : "bg-transparent"
        } "text-white"`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <a href="#home" className="text-2xl flex items-center gap-2">
              <GiHairStrands className="text-white" />
             {sanitizeContent(userDetails?.ecosystemName)}
            </a>
          </div>
          <div className="hidden md:flex space-x-4 text-lg items-center">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-[#d5b46c] font-medium"
              >
                {sanitizeContent(link)}
              </a>
            ))}
          </div>
          <div
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-transparent w-full px-4 pb-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block hover:text-[#d5b46c] font-medium"
              >
                {sanitizeContent(link)}
              </a>
            ))}
            <div className="flex space-x-6 mt-2">
              <FaShoppingCart className="cursor-pointer" />
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className={`relative bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-[60vh] md:min-h-[100vh] ${
        "text-white"
        }`}
        style={{
          backgroundImage: `url(${
            details?.hero?.backgroundImage1 ||
            "https://i.imghippo.com/files/TU4797XU.jpg"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 w-full text-center px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl font-bold md:text-xl mb-4">
              {sanitizeContent(
                details?.hero?.title1 || "Creating Styles, Inspiring Smiles"
              )}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
              {sanitizeContent(
                details?.hero?.title2 || "YOUR HAIR, YOUR STYLE"
              )}
            </h1>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {sanitizeContent(
                details?.hero?.summary2 ||
                  "We believe every strand tells a story, and we're here to help you tell yours with elegance and style."
              )}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button
                onClick={handleModalOpen}
                className="bg-[#D6B981] text-white font-semibold px-8 py-3 rounded hover:bg-white hover:text-black transition"
              >
                {sanitizeContent(
                  details?.navbar?.buttonText1 || "Book an Appointment"
                )}
              </button>
              <a
                href="#services"
                className="border border-white text-white font-semibold px-8 py-3 rounded hover:bg-white hover:text-black transition"
              >
                {sanitizeContent(
                  details?.aboutUs?.buttonText1 || "Explore Services"
                )}
              </a>
            </div>
          </div>
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
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`w-full py-16 px-4 ${
          details?.aboutUs?.styles?.backgroundColor || "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-8 mb-14">
            <div>
              <h4 className="text-[#D6B981] text-xl font-semibold mb-2">
                {sanitizeContent(
                  details?.aboutUs?.title1 || "Our Story, Your Style"
                )}
              </h4>
              <h2 className="text-4xl md:text-5xl text-black leading-tight">
                {sanitizeContent(
                  details?.aboutUs?.title2 ||
                    "Transforming Hair Style Empowering Beauty"
                )}
              </h2>
            </div>
            <div className="max-w-xl">
              <p className="text-gray-600 leading-relaxed mb-4">
                {sanitizeContent(
                  details?.aboutUs?.text1 ||
                    "We believe beauty is more than skin deep—it's a reflection of your inner confidence and individuality, one style at a time."
                )}
              </p>
              <a
                href="#services"
                className="text-[#D6B981] font-semibold border-b border-[#D6B981] hover:opacity-80"
              >
                {sanitizeContent(
                  details?.aboutUs?.buttonText1 || "See All Services"
                )}{" "}
                →
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: details?.Events?.section1header || "Expert Stylists",
                image:
                  details?.Events?.sectionImage1 ||
                  "https://i.imghippo.com/files/wlf8271PVI.jpg",
              },
              {
                title: details?.Events?.section2header || "Premium Products",
                image: "https://i.imghippo.com/files/JP8890tA.jpg",
              },
              {
                title:
                  details?.Events?.section3header || "Personalized Services",
                image: "https://i.imghippo.com/files/ECLe1506HWA.jpg",
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition rounded"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white">
                  <h3 className="text-lg font-semibold">
                    {sanitizeContent(item.title)}
                  </h3>
                  <p className="text-sm">Beauty Hair & Spa Salon</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours Section */}
      <section className="w-full text-[#1d1d1d] font-sans mt-9">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <div className="w-full h-full">
            <img
              src={
                details?.aboutUs?.image1 ||
                "https://i.imghippo.com/files/Omp6603YUQ.jpg"
              }
              alt="Hair Wash"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative flex items-center px-6 py-16 lg:px-16 bg-[#f8f8f8]">
            <div className="relative z-10 w-full max-w-xl">
              <p className="text-[#c7ae85] font-medium text-xl mb-2">
                Hair Salon
              </p>
              <h2 className="text-4xl font-semibold mb-4">Working Hours</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Visit us during our working hours and enjoy top-notch salon
                services. Our team is always ready to give you a refreshing
                experience with professional care.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">
                    {sanitizeContent(
                      details?.contactUs?.heading2 || "Mon to Friday"
                    )}
                  </span>
                  <span className="text-gray-800 font-medium">
                    {sanitizeContent(
                      details?.contactUs?.heading4 || "09:30 AM – 20:30 PM"
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-semibold">
                    {sanitizeContent(
                      details?.contactUs?.heading3 || "Saturday"
                    )}
                  </span>
                  <span className="text-gray-800 font-medium">
                    {sanitizeContent(
                      details?.contactUs?.heading5 || "02:30 AM – 19:00 PM"
                    )}
                  </span>
                </div>
              </div>
              <button
                onClick={handleModalOpen}
                className="mt-8 bg-[#D6B981] text-white font-medium px-6 py-3 border border-black rounded hover:bg-white hover:text-black transition"
              >
                {sanitizeContent(details?.navbar?.buttonText1 || "BOOK NOW")} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 px-4 md:px-16 bg-white">
        <h1 className="absolute text-[80px] md:text-[200px] font-bold opacity-5 left-1/2 top-10 transform -translate-x-1/2 select-none pointer-events-none">
          Services
        </h1>
        <div className="text-center mb-12 z-10 relative">
          <p className="text-[#D6B981] font-semibold text-xl mb-2">
            {sanitizeContent(details?.Events?.heading || "What We Offer")}
          </p>
          <h2 className="text-4xl md:text-5xl text-gray-900">
            {sanitizeContent(
              details?.Events?.summary || "Quality Hair Treatments"
            )}
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 z-10 relative">
          {eServices.map((service, index) => (
            <div
              key={index}
              className="relative p-6 text-center border rounded shadow bg-white"
            >
              <div className="relative w-28 h-28 mx-auto mb-4">
                {/* <img
                  src={service.serviceImage}
                  alt={service.name}
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow"
                /> */}
                <div className="absolute -top-2 -right-2 bg-white hover:bg-[#D6B981] transition rounded-full shadow-md p-2">
                  <FaCut className="text-[#D6B981] hover:text-white transition" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {service.shortDescription}
              </p>
              <p className="price font-semibold text-gray-800">
                  {getCurrencySymbol(currency)}
                      {service.price}
              </p>
              <button
                onClick={handleModalOpen}
                className="inline-block uppercase mt-4 text-[#D6B981] hover:text-gray-700 font-medium"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
       
        <div className="fixed bottom-5 right-5 z-50">
          <button className="bg-[#D6B981] text-white w-10 h-10 flex items-center justify-center rounded">
            ▲
          </button>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="relative overflow-hidden py-20 px-4 md:px-32 bg-[#f8f8f8]"
      >
        <h1 className="absolute text-[80px] md:text-[200px] font-bold opacity-5 left-1/2 top-10 transform -translate-x-1/2 select-none pointer-events-none">
          Gallery
        </h1>
        <div className="text-center mb-12 z-10 relative">
          <p className="text-[#D6B981] font-semibold text-xl mb-2">
            {sanitizeContent(details?.Gallery?.title1 || "Showcase Creativity")}
          </p>
          <h2 className="text-4xl md:text-5xl text-gray-900">
            {sanitizeContent(
              details?.Gallery?.title2 || "Highlights of Our Expertise"
            )}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white w-full mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          <div className="flex flex-col justify-between p-10 bg-[#f8f8f8] min-h-[600px] relative">
            <div className="flex flex-col justify-center items-center text-center mt-6">
              <h2 className="absolute text-[80px] text-gray-200 top-6 left-1/2 transform -translate-x-1/2 z-0 pointer-events-none">
                Feedback
              </h2>
              <FaQuoteLeft className="text-4xl text-[#D6B981] mb-4 z-10" />
              <p className="text-lg font-medium mb-6 z-10 max-w-xl leading-relaxed text-center">
                {testimonialsData[current].quote
                  .split("\n")
                  .map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
              </p>
              <div className="flex items-center space-x-3 z-10 mt-2">
                <img
                  src={testimonialsData[current].image}
                  alt={testimonialsData[current].name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-sm">
                    {sanitizeContent(testimonialsData[current].name)}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {sanitizeContent(testimonialsData[current].role)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="bg-white shadow border px-3 py-2 hover:bg-gray-100"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={next}
                className="bg-white shadow border px-3 py-2 hover:bg-gray-100"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
          <div className="h-[600px] w-full">
            <img
              src={
                details?.Reviews?.image5 ||
                "https://i.imghippo.com/files/Jq8617dE.jpg"
              }
              alt="client"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white">
        <WhiteContactForm ecosystemDomain={subdomain} />
      </section>

      {/* Footer */}
      <footer
        className={`bg-[#1c1c1c] text-white px-4 md:px-10 py-16 text-sm ${
          details?.footer?.styles?.color || ""
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h4 className="font-semibold text-xl mb-5">
              {sanitizeContent(details?.footer?.title2 || "About")}
            </h4>
            <ul className="space-y-3 text-gray-400 text-lg">
              {[
                { text: details?.footer?.title1 || "Home", href: "#home" },
                { text: details?.footer?.title4 || "About Us", href: "#about" },
                {
                  text: details?.footer?.paragraph5 || "Service",
                  href: "#services",
                },
                {
                  text: details?.footer?.paragraph6 || "Pricing",
                  href: "#pricing",
                },
                {
                  text: details?.footer?.paragraph7 || "Contact us",
                  href: "#contact",
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:rounded-full before:bg-[#D6B981]"
                >
                  <a href={item.href}>{sanitizeContent(item.text)}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xl mb-5">
              {sanitizeContent(details?.footer?.title5 || "Services")}
            </h4>
            <ul className="space-y-3 text-gray-400 text-lg">
              {eServices.slice(0, 6).map((service, index) => (
                <li
                  key={index}
                  className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:rounded-full before:bg-[#D6B981]"
                >
                  <button onClick={handleModalOpen}>{service.name}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xl mb-5">
              {sanitizeContent(details?.footer?.title3 || "Contact")}
            </h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#D6B981] mt-1" />
                <div>
                  <p className="text-white">
                    {sanitizeContent(details?.footer?.title3 || "Location")}
                  </p>
                  <p>
                    {sanitizeContent(
                      userDetails?.address ||
                        details?.footer?.paragraph2 ||
                        "3605 Parker Rd."
                    )}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-[#D6B981] mt-1" />
                <div>
                  <p className="text-white">
                    {sanitizeContent(details?.footer?.title3 || "Hotline")}
                  </p>
                  <p>
                    {sanitizeContent(
                      userDetails?.phoneNumber ||
                        details?.footer?.paragraph4 ||
                        "(808) 555-0111"
                    )}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-[#D6B981] mt-1" />
                <div>
                  <p className="text-white">
                    {sanitizeContent(details?.footer?.title3 || "Email")}
                  </p>
                  <p>
                    {sanitizeContent(
                      userDetails?.email ||
                        details?.footer?.paragraph3 ||
                        "info@example.com"
                    )}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xl mb-5">Socials</h4>
            <div className="flex gap-4">
              {[
                { icon: <FaFacebookF />, label: "Facebook" },
                { icon: <FaTwitter />, label: "Twitter" },
                { icon: <FaLinkedinIn />, label: "LinkedIn" },
                { icon: <FaYoutube />, label: "YouTube" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 border border-gray-500 flex items-center justify-center rounded-full hover:bg-gray-700"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xl py-4">
          <p>
            {sanitizeContent(
              details?.footer?.privacy ||
                `© ${new Date().getFullYear()} HairGlam. All rights reserved.`
            )}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Template48;
