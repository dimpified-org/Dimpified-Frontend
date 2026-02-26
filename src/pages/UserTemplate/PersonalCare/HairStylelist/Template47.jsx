import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapPin,
  FaPaperPlane,
  FaCheckCircle,
  FaThLarge,
  FaShoppingCart,
  FaStar,
  FaRegStar,
  FaBars,
  FaArrowLeft,
  FaArrowRight,
  FaPlus,
} from "react-icons/fa";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { GiHairStrands } from "react-icons/gi";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { useCountry } from "../../../pricing/CountryContext";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

const Template47 = ({ details, subdomain, userDetails }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eServices, setEServices] = useState([]);
  const [currency, setCurrency] = useState([]);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

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

  // Sync heights for FAQ and contact form
  useEffect(() => {
    const syncHeight = () => {
      if (window.innerWidth >= 1024) {
        const leftHeight = leftRef.current?.offsetHeight;
        if (rightRef.current) rightRef.current.style.height = `${leftHeight}px`;
      } else {
        if (rightRef.current) rightRef.current.style.height = "auto";
      }
    };
    syncHeight();
    window.addEventListener("resize", syncHeight);
    return () => window.removeEventListener("resize", syncHeight);
  }, []);

  // Counter animation
  useEffect(() => {
    const counters = [
      {
        id: "odometer1",
        target: parseInt(details?.Statistics?.section4span) || 18,
      },
      {
        id: "odometer2",
        target: parseInt(details?.Statistics?.section1span) || 152,
      },
      {
        id: "odometer3",
        target: parseInt(details?.Statistics?.section3header) || 52,
      },
      { id: "odometer4", target: 10 },
    ];

    counters.forEach((counter) => {
      let current = 0;
      const increment = counter.target / 100;
      const element = document.getElementById(counter.id);

      if (element) {
        const updateCounter = () => {
          current += increment;
          if (current < counter.target) {
            element.textContent = Math.floor(current) + "+";
            setTimeout(updateCounter, 20);
          } else {
            element.textContent =
              counter.target + (counter.id === "odometer4" ? "k+" : "+");
          }
        };
        updateCounter();
      }
    });

    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }, [details]);

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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Map JSON data to sections
  const expertsData = [
    {
      image:
        details?.Team?.image1 ||
        "https://randomuser.me/api/portraits/women/12.jpg",
      name: details?.Team?.header1 || "Bessie Cooper",
      position: details?.Team?.summary1 || "Hair Color Specialist",
    },
    {
      image:
        details?.Team?.image2 ||
        "https://randomuser.me/api/portraits/women/14.jpg",
      name: details?.Team?.header2 || "Darrell Steward",
      position: details?.Team?.summary2 || "Master Barber",
    },
    {
      image:
        details?.Team?.image3 ||
        "https://randomuser.me/api/portraits/women/65.jpg",
      name: details?.Team?.header3 || "Floyd Miles",
      position: details?.Team?.summary3 || "Hair Color Specialist",
    },
  ];

  const testimonialsData = [
    {
      text:
        details?.Reviews?.summary1 ||
        "I had the privilege of working with Demure on a complex business litigation case.",
      name: details?.Reviews?.header1 || "KENDE ATTILA",
      position: details?.Reviews?.title1 || "Software Tester",
      image:
        details?.Reviews?.image1 ||
        "https://randomuser.me/api/portraits/men/19.jpg",
    },
    {
      text:
        details?.Reviews?.summary2 ||
        "Demure completely transformed my look – brilliant colour work!",
      name: details?.Reviews?.header2 || "SARAH JOHNSON",
      position: details?.Reviews?.title2 || "Marketing Executive",
      image:
        details?.Reviews?.image2 ||
        "https://randomuser.me/api/portraits/women/25.jpg",
    },
    {
      text:
        details?.Reviews?.summary3 ||
        "Demure completely transformed my look – brilliant colour work!",
      name: details?.Reviews?.header3 || "MONICA WELLS",
      position: details?.Reviews?.title3 || "Bank Manager",
      image:
        details?.Reviews?.image3 ||
        "https://randomuser.me/api/portraits/women/25.jpg",
    },
  ];

  const faqs = [
    {
      question:
        details?.Blog?.header1 || "Can you help me decide on a new hairstyle?",
      answer:
        details?.Blog?.summary1 ||
        "Absolutely! Our stylists are trained to consult with you about your lifestyle, face shape, hair texture, and personal preferences to recommend styles that will complement you perfectly.",
    },
    {
      question: details?.Blog?.header2 || "Do I need to book an appointment?",
      answer:
        details?.Blog?.summary2 ||
        "While walk-ins are welcome, we highly recommend booking an appointment to ensure availability with your preferred stylist and to minimize wait times.",
    },
    {
      question: details?.Blog?.header3 || "What services do you offer?",
      answer:
        details?.Blog?.summary3 ||
        "We offer a comprehensive range of services including haircuts, coloring, treatments, styling, extensions, and more. Visit our services page for a complete list.",
    },
    {
      question:
        details?.Blog?.header4 || "How long will my case take to resolve?",
      answer:
        details?.Blog?.summary4 ||
        "This depends on the service complexity. Feel free to consult with our specialists.",
    },
  ];

  const galleryImages = [
    { type: "image", url: details?.Gallery?.image2 },
    { type: "image", url: details?.Gallery?.image3 },
    { type: "image", url: details?.Gallery?.image4 },
    { type: "image", url: details?.Gallery?.image5 },
  ].filter(({ url }) => url && url !== "not available");

  return (
    <div
      className={`font-sans text-gray-800 `}
    >
      {/* Header */}
      <header
        className={`w-full fixed top-0 left-0 z-30 bg-black text-white shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center text-xl gap-2">
            <GiHairStrands className="text-[#c59c7b]" />
            {sanitizeContent(
              details?.navbar?.logo || userDetails?.ecosystemName || "Demure"
            )}
          </a>
          <ul className="hidden lg:flex items-center gap-6 text-xl">
            <li>
              <a
                href="#home"
                className="hover:text-[#c59c7b] transition-colors duration-200"
              >
                {sanitizeContent(details?.navbar?.link1 || "Home")}
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-[#c59c7b] transition-colors duration-200"
              >
                {sanitizeContent(details?.navbar?.link2 || "About")}
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="hover:text-[#c59c7b] transition-colors duration-200"
              >
                {sanitizeContent(details?.navbar?.link3 || "Services")}
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="hover:text-[#c59c7b] transition-colors duration-200"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-[#c59c7b] transition-colors duration-200"
              >
                {sanitizeContent(details?.navbar?.link4 || "Contact")}
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <button
              onClick={handleModalOpen}
              className="bg-[#c59c7b] px-6 py-2 text-sm text-black font-serif hover:opacity-90"
            >
              {sanitizeContent(details?.navbar?.buttonText1 || "BOOK NOW")}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white"
            >
              {mobileMenuOpen ? <FaBars /> : <FaBars /> }
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-gray-900 p-6 transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex justify-between items-center mb-6">
          <a href="#home" className="flex items-center text-xl gap-2">
            <GiHairStrands className="text-[#c59c7b]" />
            {sanitizeContent(
              details?.navbar?.logo || userDetails?.ecosystemName || "Demure"
            )}
          </a>
        </div>
        <ul className="space-y-4 text-white text-lg">
          <li>
            <a
              href="#home"
              className="hover:text-[#c59c7b] transition-colors duration-200"
            >
              {sanitizeContent(details?.navbar?.link1 || "Home")}
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-[#c59c7b] transition-colors duration-200"
            >
              {sanitizeContent(details?.navbar?.link2 || "About")}
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="hover:text-[#c59c7b] transition-colors duration-200"
            >
              {sanitizeContent(details?.navbar?.link3 || "Services")}
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="hover:text-[#c59c7b] transition-colors duration-200"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-[#c59c7b] transition-colors duration-200"
            >
              {sanitizeContent(details?.navbar?.link4 || "Contact")}
            </a>
          </li>
        </ul>
        <button
          onClick={handleModalOpen}
          className="block text-center mt-6 py-2 px-4 bg-[#c59c7b] text-black font-serif"
        >
          {sanitizeContent(details?.navbar?.buttonText1 || "BOOK NOW")}
        </button>
      </div>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Hero Section */}
      <section
        id="home"
        className={`relative min-h-screen flex flex-col lg:flex-row items-center pt-20 sm:pt-32 ${
          details?.hero?.styles?.backgroundColor || "bg-black"
        } ${details?.hero?.styles?.color || "text-white"} overflow-hidden`}
      >
        <div className="lg:w-1/2 px-6 sm:px-12 z-10">
          <p className="italic text-[#d4a373] mb-2 text-sm">
            {sanitizeContent(
              details?.hero?.title1 || "Luxury Haircare You Deserve"
            )}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight uppercase">
            {sanitizeContent(
              details?.hero?.title2 || "Custom Styles for Every Personality"
            )}{" "}
            with {userDetails?.ecosystemName || ""}
          </h1>
          <p className="text-lg text-white mt-6 max-w-md">
            {sanitizeContent(
              details?.hero?.summary1 ||
                "Welcome to Demure, where creativity meets expertise to bring out the best in your hair."
            )}
          </p>
          <button
            onClick={handleModalOpen}
            className="mt-6 bg-[#c59c7b] px-6 py-3 text-sm text-black font-serif hover:opacity-90"
          >
            {sanitizeContent(
              details?.hero?.buttonText1 || "Book an appointment"
            )}
          </button>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0 relative z-10">
          <img
            src={
              details?.hero?.backgroundImage1 ||
              "https://i.imghippo.com/files/Yon3768yEQ.jpg"
            }
            alt="Hairstylist"
            className="w-full h-[500px] object-cover"
          />
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 rotate-[-90deg] origin-left hidden lg:block">
          <p className="text-white font-semibold tracking-widest text-xl pl-4">
            YOUR HAIR, YOUR STYLE
          </p>
        </div>
        <div className="absolute left-8 bottom-6 lg:block hidden">
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
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

      {/* Counter Section */}
      <section className="bg-[#d4a373] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-6">
            <div>
              <p id="odometer1" className="text-3xl font-bold text-[#1e1e1e]">
                {sanitizeContent(details?.Statistics?.section4span || "18+")}
              </p>
              <p className="text-[#1e1e1e] text-sm mt-2">
                {sanitizeContent(
                  details?.Statistics?.section4icon || "Years of experiences"
                )}
              </p>
            </div>
            <div>
              <p id="odometer2" className="text-3xl font-bold text-[#1e1e1e]">
                {sanitizeContent(details?.Statistics?.section1span || "152+")}
              </p>
              <p className="text-[#1e1e1e] text-sm mt-2">
                {sanitizeContent(
                  details?.Statistics?.section2span || "Happy Clients"
                )}
              </p>
            </div>
            <div>
              <p id="odometer3" className="text-3xl font-bold text-[#1e1e1e]">
                {sanitizeContent(details?.Statistics?.section3header || "52+")}
              </p>
              <p className="text-[#1e1e1e] text-sm mt-2">
                {sanitizeContent(
                  details?.Statistics?.section3span || "Expert Analysts"
                )}
              </p>
            </div>
            <div>
              <p id="odometer4" className="text-3xl font-bold text-[#1e1e1e]">
                10k+
              </p>
              <p className="text-[#1e1e1e] text-sm mt-2">Unique Services</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`about py-20 relative ${
          details?.aboutUs?.styles?.backgroundColor || "bg-white"
        }`}
      >
        <div className="flex flex-col h-full py-4 px-4 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 relative">
              <img
                src={
                  details?.aboutUs?.image1 ||
                  "https://i.imghippo.com/files/lh4643TQ.jpg"
                }
                className="about-img w-[500px] h-[500px] rounded-lg shadow-lg"
                alt="About Demure"
              />
            </div>
            <div className="lg:w-1/2 relative z-10">
              <span className="sub-heading block text-[#D2B095] mb-2">
                {sanitizeContent(details?.aboutUs?.title1 || "About")}{" "}
                {userDetails?.ecosystemName || ""}
              </span>
              <h2 className="text-3xl font-bold mb-4 uppercase">
                {sanitizeContent(
                  details?.aboutUs?.title2 || "Expert Care for Every Strand"
                )}
              </h2>
              <p className="mb-6 max-w-lg">
                {sanitizeContent(
                  details?.aboutUs?.text1 ||
                    "We believe that hair is more than just a style—it’s an expression of individuality."
                )}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#D2B095]" />
                  <span>Personalized Styling</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#D2B095]" />
                  <span>Flexible Booking Options</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#D2B095]" />
                  <span>Satisfaction Guarantee</span>
                </li>
              </ul>
              <a
                href="#services"
                className="bg-[#D2B095] inline-flex items-center font-serif py-3 px-3"
              >
                {sanitizeContent(
                  details?.aboutUs?.buttonText1 || "Explore Services"
                )}{" "}
                <FaArrowRight className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className={`services py-20 ${
          details?.Events?.styles?.backgroundColor || "bg-[#F7F3F0]"
        }`}
        id="services"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
            <div className="lg:w-1/2">
              <span className="block text-[#D2B095] mb-2 italic">
                {sanitizeContent(
                  details?.Statistics?.section1header || "Why Choose Demure?"
                )}
              </span>
              <h2 className="text-3xl font-bold uppercase text-gray-900">
                {sanitizeContent(
                  details?.Statistics?.section1paragraphy ||
                    "YOUR BEAUTY IS IN EXPERT HANDS"
                )}
              </h2>
            </div>
            <div className="lg:w-1/2 text-gray-700 text-base">
              <p className="mb-4">
                {sanitizeContent(
                  details?.Statistics?.section1span ||
                    "We're not just a salon; we’re your partners in beauty and confidence."
                )}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-300">
            {eServices.map((service, index) => (
              <a
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-b border-r border-gray-300 p-6 flex flex-col items-start gap-4 transition-all duration-300 hover:border-2 hover:border-gray-500"
              >
                {/* <img
                  src={service.serviceImage}
                  alt={service.name}
                  className="w-12 h-12 object-cover rounded mb-2"
                /> */}
                <h4 className="text-[16px] font-bold uppercase text-gray-800">
                  {service.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {service.shortDescription}
                </p>
                <button
                  onClick={handleModalOpen}
                  className="text-xl text-gray-400 group-hover:text-gray-800 transition"
                >
                  BOOK NOW →
                </button>
              </a>
            ))}
          </div>
        </div>
       
      </section>

      {/* Why Choose Section */}
      <section className="whychoose py-20 relative bg-white">
        <div className="flex flex-col h-full py-4 px-4 lg:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="bg-[#F7F3F0] p-8 lg:p-12 lg:w-9/12 rounded shadow-sm">
              <span className="italic text-[#B99374] block mb-2">
                {sanitizeContent(
                  details?.Statistics?.section1header ||
                    "Exceptional Client Care"
                )}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 uppercase">
                {sanitizeContent(
                  details?.Statistics?.section1paragraphy || "Premium Products"
                )}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed max-w-2xl">
                {sanitizeContent(
                  details?.Statistics?.section2paragraphy ||
                    "Personalized Services"
                )}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-10 text-gray-800 text-base font-medium mb-6 list-disc list-inside">
                <li>
                  {sanitizeContent(
                    details?.Statistics?.section2header || "Expert Stylists"
                  )}
                </li>
                <li>Premium Products</li>
                <li>Personalized Services</li>
                <li>Client–Centric Approach</li>
              </ul>
              <a
                href="#services"
                className="inline-flex items-center bg-[#B99374] text-white px-6 py-3 uppercase tracking-wide text-sm hover:bg-[#a67a5e] transition-all"
              >
                Show Services
              </a>
            </div>
            <div className="lg:w-3/12 w-full flex justify-center relative">
              <img
                src={
                  details?.Statistics?.section1icon ||
                  "https://i.imghippo.com/files/kZ6424j.jpg"
                }
                alt="Stylist with client"
                className="rounded-md w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="pricing-section relative bg-[#F7F3F0] py-20"
      >
        <div className="right-text hidden xl:block absolute right-8 top-1/2 transform -translate-y-1/2">
          <h2 className="vertical-text uppercase tracking-wider text-gray-300">
            Pricing List
          </h2>
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="sub-heading block text-[#D2B095] mb-2 italic">
              Our Service Pricing
            </span>
            <h2 className="text-4xl font-bold uppercase mb-4 text-gray-900">
              Pricing That Works for You
            </h2>
            <p className="text-gray-700">
              We believe in delivering premium salon experiences at prices that
              suit your budget. Our pricing structure is transparent,
              competitive.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-stretch gap-8">
            <div className="lg:w-1/2 space-y-6">
              {eServices.slice(0, 6).map((service, index) => (
                <div key={index} className="pb-4">
                  <div className="flex items-center">
                    <p className="name font-medium text-gray-800">
                      {service.name}
                    </p>
                    <span className="flex-grow border-t border-dashed border-gray-400 mx-4"></span>
                    <p className="price font-semibold text-gray-800">
                      {getCurrencySymbol(currency)}{service.price}
                    </p>
                  </div>
                  <p className="text-gray-600 mt-1">
                    {service.shortDescription}
                  </p>
                </div>
              ))}
            </div>
            <div className="hidden lg:block w-px bg-gray-400"></div>
            <div className="lg:w-1/2 space-y-6">
              {eServices.slice(6, 12).map((service, index) => (
                <div key={index} className="pb-4">
                  <div className="flex items-center">
                    <p className="name font-medium text-gray-800">
                      {service.name}
                    </p>
                    <span className="flex-grow border-t border-dashed border-gray-400 mx-4"></span>
                    <p className="price font-semibold text-gray-800">
                     {getCurrencySymbol(currency)}{service.price}
                    </p>
                  </div>
                  <p className="text-gray-600 mt-1">
                    {service.shortDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={handleModalOpen}
              className="inline-flex items-center border border-gray-800 px-6 py-2 uppercase text-sm font-medium tracking-wide hover:bg-gray-800 hover:text-white transition"
            >
              Reserve your spot now
            </button>
          </div>
        </div>
        
      </section>

      {/* Experts Section */}
      <section
        className="services experts py-20 bg-gray-900 text-white relative"
        id="experts"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
            <div className="lg:w-1/2">
              <span className="sub-heading block text-primary mb-2">
                {sanitizeContent(
                  details?.Team?.title1 || "Our Skilled Stylists"
                )}
              </span>
              <h2 className="text-2xl font-bold uppercase">
                {sanitizeContent(
                  details?.Team?.title2 || "Meet Haircare Specialists"
                )}
              </h2>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <p className="text-white text-opacity-80">
                We take pride in our team of talented, passionate, and
                experienced professionals.
              </p>
            </div>
          </div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{ prevEl: ".expert-prev", nextEl: ".expert-next" }}
            className="expertSwiper mb-8"
          >
            {expertsData.map((expert, index) => (
              <SwiperSlide key={index}>
                <div className="expert-card bg-gray-800 rounded-lg overflow-hidden">
                  <div className="img-box relative group">
                    <img
                      src={expert.image}
                      className="w-full h-auto object-cover"
                      alt={expert.name}
                      width="352"
                      height="306"
                    />
                    <div className="social absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <ul className="links flex space-x-4 mb-0">
                        <li>
                          <a
                            aria-label="Facebook"
                            href="#"
                            className="text-white hover:text-primary"
                          >
                            <FaFacebook />
                          </a>
                        </li>
                        <li>
                          <a
                            aria-label="Twitter"
                            href="#"
                            className="text-white hover:text-primary"
                          >
                            <FaTwitter />
                          </a>
                        </li>
                      </ul>
                      <button
                        aria-label="show social links"
                        className="social-btn absolute bottom-4 right-4 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="card-footer p-4 flex justify-between items-end">
                    <div>
                      <h5 className="font-semibold text-white">
                        {expert.name}
                      </h5>
                      <p className="mb-0 text-white text-opacity-70">
                        {expert.position}
                      </p>
                    </div>
                    <div className="number text-white text-opacity-50 text-xl">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center">
            <div className="flex space-x-4">
              <button className="expert-prev bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-dark transition">
                <FaArrowLeft />
              </button>
              <button className="expert-next bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-dark transition">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery py-20 relative">
         <div className="right-text absolute right-8 top-1/2 transform -translate-y-1/2 hidden xl:block">
          <h2 className="vertical-text font-sans uppercase tracking-wider">
            Gallery
          </h2>
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="sub-heading block text-primary mb-2">
             Showcase Of Beauty
            </span>
            <h2 className="text-4xl font-bold uppercase mb-4">
              Every Client, a Work of Art
            </h2>
            <p>
              {sanitizeContent(
                details?.Gallery?.summary1 ||
                  "Welcome to the Demure Gallery, where beauty and creativity come alive."
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {galleryImages.map(({ url }, index) => (
              <div key={index} className="sm:col-span-1">
                <a
                  href="#"
                  className="project-card glightbox block relative group overflow-hidden rounded-lg"
                  aria-label="See Original Image"
                >
                  <img
                    src={url}
                    width="416"
                    height="768"
                    alt={`Salon Gallery ${index + 2}`}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="info absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="plus-icon bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center">
                      <FaPlus />
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="testimonial py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${
            details?.Reviews?.image1 ||
            "https://i.imghippo.com/files/lNG3443dI.jpg"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="right-text absolute right-8 top-1/2 transform -translate-y-1/2">
          <h2 className="vertical-text font-sans uppercase tracking-wider text-white">
            Testimonial
          </h2>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-end">
            <div className="w-full lg:w-10/12 xl:w-9/12 2xl:w-8/12">
              <div className="testimonial-inner bg-white bg-opacity-10 backdrop-blur-sm p-8 lg:p-12 rounded-lg">
                <span className="sub-heading block text-primary mb-2">
                  {sanitizeContent(
                    details?.Reviews?.header1 || "What Our Clients Say"
                  )}
                </span>
                <h2 className="text-4xl font-bold uppercase text-white mb-4">
                  {sanitizeContent(
                    details?.Reviews?.title1 || "Client's Success Stories"
                  )}
                </h2>
                <p className="mb-8 text-white text-opacity-80 max-w-2xl">
                  {sanitizeContent(
                    details?.Reviews?.summary1 ||
                      "We believe in continuous improvement and ensuring the best possible experience for our clients."
                  )}
                </p>
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation={{
                    prevEl: ".client-prev",
                    nextEl: ".client-next",
                  }}
                  className="clientSwiper mb-8"
                >
                  {testimonialsData.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                      <div className="testimonial-card bg-white p-8 rounded-lg relative">
                        <div className="flex gap-2 text-yellow-400">
                          {[...Array(4)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                          <FaRegStar />
                        </div>
                        <p className="mt-4 mb-6 text-gray-700">
                          {testimonial.text}
                        </p>
                        <div className="flex gap-4 items-center">
                          <div className="relative">
                            <img
                              width="60"
                              height="60"
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <h5 className="font-semibold mb-1">
                              {testimonial.name}
                            </h5>
                            <span className="text-gray-600">
                              {testimonial.position}
                            </span>
                          </div>
                        </div>
                        <img
                          src="/assets/images/quote.png"
                          alt="Quote"
                          className="absolute top-4 right-4 w-12 opacity-10"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="flex justify-center space-x-4">
                  <button className="client-prev bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-dark transition">
                    <FaArrowLeft />
                  </button>
                  <button className="client-next bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-dark transition">
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className={`w-full ${
          details?.faqStyles?.backgroundColor || "bg-[#f9f1eb]"
        } text-[#1e1e1e] py-16`}
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div ref={leftRef}>
            <p className="italic text-sm text-[#b1907f] mb-2">
              Quick Answers For You
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              FIND THE ANSWERS YOU NEED
            </h2>
            <p className="text-[#5e5e5e] mb-8 max-w-lg">
              We understand that you may have questions about our services.
              Below are some of the most frequently asked questions to help you.
            </p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full text-left px-6 py-4 flex justify-between items-center font-medium text-lg bg-white hover:bg-gray-100 transition ${
                      openIndex === index ? "bg-[#c7a189] text-black" : ""
                    }`}
                  >
                    {faq.question}
                    <span className="text-2xl">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="bg-[#c7a189] text-black px-6 py-4">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            ref={rightRef}
            className="flex flex-col bg-white shadow-md overflow-hidden"
          >
            <div id="contact">
              <WhiteContactForm ecosystemDomain={subdomain} />
            </div>
            <div className="w-full h-[220px] lg:h-[280px] relative">
              <img
                src={
                  details?.contactUs?.heading2 ||
                  "https://i.imghippo.com/files/oNU5238RU.jpg"
                }
                alt="Hair Stylist"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#faf7f5] text-[#1c2536] text-sm leading-relaxed">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/3">
              <a
                href="#home"
                className="flex items-center text-2xl font-bold gap-2"
              >
                <GiHairStrands className="text-[#c59c7b]" />
                {sanitizeContent(
                  details?.footer?.logo ||
                    userDetails?.ecosystemName ||
                    "Demure"
                )}
              </a>
              <p className="mb-8 max-w-sm">
                {sanitizeContent(
                  details?.footer?.header ||
                    "Demure is a conceptual name chosen for a modern and stylish Hair Salons and Hairdressers Website."
                )}
              </p>
              <ul className="flex gap-4">
                {[
                  { icon: <FaFacebook />, label: "Facebook" },
                  { icon: <FaInstagram />, label: "Instagram" },
                  { icon: <FaLinkedin />, label: "LinkedIn" },
                  { icon: <FaTwitter />, label: "Twitter" },
                ].map(({ icon, label }) => (
                  <li
                    key={label}
                    className="border border-[#d7d3cd] w-10 h-10 grid place-items-center transition hover:bg-[#cbb19c] hover:text-white"
                  >
                    <a href="#" aria-label={label}>
                      {icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-2/3">
              <div className="flex flex-col lg:flex-row items-center gap-6 pb-10 border-b border-[#e6e1da]">
                <div className="lg:w-1/3 flex items-center gap-4">
                  <img
                    src="https://i.imghippo.com/files/MAv2546HHc.png"
                    alt="Clock icon"
                    className="h-14"
                  />
                  <h2 className="text-2xl font-semibold tracking-wide uppercase">
                    {sanitizeContent(
                      details?.footer?.title3 || "OPENING HOURS"
                    )}
                  </h2>
                </div>
                <div className="lg:w-2/3 grid sm:grid-cols-2 w-full text-[#585858]">
                  <div className="border-b sm:border-b-0 sm:border-r border-[#e6e1da] py-6 sm:py-0 sm:px-6">
                    <p className="uppercase text-xs mb-1 tracking-wide">
                      {sanitizeContent(
                        details?.contactUs?.heading3 || "Saturday to Thursday"
                      )}
                    </p>
                    <p className="text-lg font-medium text-[#1c2536]">
                      {sanitizeContent(
                        details?.contactUs?.heading2 || "09:30 AM – 20:30 PM"
                      )}
                    </p>
                  </div>
                  <div className="py-6 sm:py-0 sm:px-6">
                    <p className="uppercase text-xs mb-1 tracking-wide">
                      {sanitizeContent(
                        details?.contactUs?.heading5 || "Saturday to Thursday"
                      )}
                    </p>
                    <p className="text-lg font-medium text-[#1c2536]">
                      {sanitizeContent(
                        details?.contactUs?.heading4 || "09:30 AM – 20:30 PM"
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 pt-10">
                <div>
                  <h4 className="mb-5 font-semibold uppercase tracking-wide">
                    {sanitizeContent(details?.footer?.title1 || "QUICK LINKS")}
                  </h4>
                  <ul className="space-y-2">
                    {[
                      {
                        text: details?.footer?.paragraph1 || "Home",
                        href: "#home",
                      },
                      {
                        text: details?.footer?.paragraph2 || "About Us",
                        href: "#about",
                      },
                      {
                        text: details?.footer?.paragraph3 || "Service",
                        href: "#services",
                      },
                      {
                        text: details?.footer?.paragraph4 || "Contact Us",
                        href: "#contact",
                      },
                    ].map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.href}
                          className="hover:text-[#c09f84] transition-colors"
                        >
                          {sanitizeContent(item.text)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-5 font-semibold uppercase tracking-wide">
                    {sanitizeContent(details?.footer?.title2 || "CONTACT")}
                  </h4>
                  <ul className="space-y-5">
                    <li className="flex gap-3">
                      <FaPhone className="min-w-5 mt-1 text-[#c09f84]" />
                      <div>
                        <a
                          href={`tel:${
                            userDetails?.phoneNumber || "(808) 555-0111"
                          }`}
                          className="block hover:text-[#c09f84]"
                        >
                          {sanitizeContent(
                            details?.footer?.paragraph9 ||
                              userDetails?.phoneNumber ||
                              "(808) 555-0111"
                          )}
                        </a>
                        <a
                          href="tel:(302) 555-0107"
                          className="block hover:text-[#c09f84]"
                        >
                          {sanitizeContent(
                            details?.footer?.paragraph10 || "(302) 555-0107"
                          )}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <FaEnvelope className="min-w-5 mt-1 text-[#c09f84]" />
                      <div>
                        <a
                          href={`mailto:${
                            userDetails?.email || "info@example.com"
                          }`}
                          className="block hover:text-[#c09f84]"
                        >
                          {userDetails?.email || "info@example.com"}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <FaMapPin className="min-w-5 mt-1 text-[#c09f84]" />
                      <div>
                        <p>
                          {sanitizeContent(
                            userDetails?.address || "3605 Parker Rd."
                          )}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-14 pt-6 border-t border-[#e6e1da] flex flex-wrap items-center justify-between gap-4">
            <p>
              {sanitizeContent(
                details?.footer?.privacy ||
                  `© ${new Date().getFullYear()} Demure All rights reserved.`
              )}
            </p>
          </div>
        </div>
        <a
          href="#"
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 w-11 h-11 bg-[#c09f84] text-[#1c2536] grid place-items-center shadow-sm hover:opacity-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8.354 3.646a.5.5 0 0 0-.708 0l-5 5a.5.5 0 1 0 .708.708L8 4.707l4.646 4.647a.5.5 0 0 0 .708-.708l-5-5z"
            />
          </svg>
        </a>
      </footer>
    </div>
  );
};

export default Template47;
