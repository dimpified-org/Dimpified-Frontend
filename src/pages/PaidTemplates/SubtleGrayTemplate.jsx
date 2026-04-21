import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaStar,
  FaCalendarCheck,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaHeart,
  FaAward,
  FaBriefcase,
  FaImage,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import PaidBookingModal from "./BookingModal/PaidBookingModal";
import DimpifiedLogo from "../../pages/LandingPages/images/dimp-blue.png";
import axios from "axios";

// Demo fallback data (used when no subdomain/userDetails provided, e.g. preview mode)
const demoBusinessContact = {
  phone: "2348109174125",
  email: "premiumcuts.barber@gmail.com",
  address: "Shop 5, Unity Plaza, Allen Avenue, Ikeja, Lagos",
};

const demoBusinessInfo = {
  name: "Premium Cuts Barbershop",
  shortName: "Premium Cuts",
  description:
    "Where style meets precision. We offer professional barbering services tailored to your unique style. Our experienced barbers use premium products and techniques to give you the perfect cut every time.",
  contact: demoBusinessContact,
};

const demoServices = [
  {
    _id: "1",
    name: "Executive Haircut",
    shortDescription: "Precision haircut with hot towel treatment",
    price: 5000,
    duration: "45 mins",
    image:
      "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    _id: "2",
    name: "Luxury Beard Trim",
    shortDescription: "Expert beard shaping and grooming",
    price: 3500,
    duration: "30 mins",
    image:
      "https://images.pexels.com/photos/3998427/pexels-photo-3998427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    _id: "3",
    name: "Complete Package",
    shortDescription: "Haircut + Beard trim + Hot towel",
    price: 7500,
    duration: "75 mins",
    image:
      "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    _id: "4",
    name: "Royal Shave",
    shortDescription: "Traditional straight razor shave",
    price: 4000,
    duration: "40 mins",
    image:
      "https://images.pexels.com/photos/3998412/pexels-photo-3998412.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    _id: "5",
    name: "Kids Haircut",
    shortDescription: "Friendly cuts for the little ones",
    price: 3000,
    duration: "30 mins",
    image:
      "https://images.pexels.com/photos/3993446/pexels-photo-3993446.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    _id: "6",
    name: "Hair Tattoo & Design",
    shortDescription: "Creative hair designs and line work",
    price: 4500,
    duration: "50 mins",
    image:
      "https://images.pexels.com/photos/3778699/pexels-photo-3778699.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];
// Function to get initials from business name
const getBusinessInitials = (businessName) => {
  const words = businessName.trim().split(/\s+/);
  if (words.length === 1) {
    // If one word, take first letter only
    return words[0][0].toUpperCase();
  } else {
    // If multiple words, take first letter of first two words
    return (words[0][0] + words[1][0]).toUpperCase();
  }
};

// Function to get initials from service name
const getServiceInitials = (serviceName) => {
  const words = serviceName.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  } else {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
};

// Get random images for hero section - only from services that have images
const getHeroImages = (servicesList) => {
  const servicesWithImages = (servicesList || []).filter(
    (service) => (service.image || service.serviceImage) && (service.image || service.serviceImage).trim() !== "",
  );

  if (servicesWithImages.length === 0) {
    return [];
  }

  // Create a copy of the array to shuffle
  const shuffled = [...servicesWithImages];

  // Fisher-Yates shuffle algorithm for better randomization
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled
    .slice(0, Math.min(3, servicesWithImages.length))
    .map((service) => ({
      image: service.image || service.serviceImage,
      initials: getServiceInitials(service.name),
    }));
};

const SubtleGrayTemplate = ({ subdomain, userDetails }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [heroImages, setHeroImages] = useState([]);
  const [services, setServices] = useState(demoServices);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  // Derive business info: prefer API response data, then userDetails prop, then demo fallback
  const businessName =
    apiData?.businessHoursRecords?.[0]?.ecosystemName ||
    userDetails?.ecosystemName ||
    demoBusinessInfo.name;
  const businessShortName = businessName.split(" ").slice(0, 2).join(" ");
  const businessDescription =
    apiData?.description ||
    userDetails?.ecosystemDescription ||
    demoBusinessInfo.description;
  const businessContact = {
    phone: apiData?.phoneNumber || userDetails?.phoneNumber || demoBusinessContact.phone,
    email: apiData?.email || userDetails?.email || demoBusinessContact.email,
    address:
      apiData?.localGovernment ||
      userDetails?.address ||
      demoBusinessContact.address,
  };
  const businessInfo = {
    name: businessName,
    shortName: businessShortName,
    description: businessDescription,
    contact: businessContact,
  };
  const serviceCurrency = apiData?.currency || "NGN";

  // Get business initials dynamically
  const businessInitials = getBusinessInitials(businessName);

  // Fetch real services when subdomain is provided
  useEffect(() => {
    if (!subdomain) return;

    let isMounted = true;
    const controller = new AbortController();

    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`,
          { signal: controller.signal }
        );
        if (isMounted && response.data?.length > 0) {
          const firstItem = response.data[0];
          setApiData(firstItem);
          const allServices = response.data.flatMap((item) => item.services);
          if (allServices.length > 0) {
            setServices(allServices);
          }
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching services:", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchServices();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [subdomain]);

  useEffect(() => {
    // Set random hero images on component mount
    setHeroImages(getHeroImages(services));
  }, [services]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openBookingModal = (service = null) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedService(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Handle image error for service cards
  const handleImageError = (e, serviceName) => {
    e.target.onerror = null;
    e.target.style.display = "none";
    const parent = e.target.parentElement;
    const initials = getServiceInitials(serviceName);
    parent.innerHTML = `
      <div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-2xl">
        ${initials}
      </div>
    `;
  };

  // Handle image error for hero section - remove the image if it fails to load
  const handleHeroImageError = (e, index) => {
    e.target.onerror = null;
    // Remove this image from heroImages
    setHeroImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  // Determine grid layout based on number of images
  const getHeroGridLayout = () => {
    const count = heroImages.length;

    if (count === 1) {
      return "grid-cols-1";
    } else if (count === 2) {
      return "grid-cols-2";
    } else if (count === 3) {
      return "grid-cols-2"; // 2 columns layout for 3 images (first image spans full width)
    }
    return "grid-cols-2";
  };

  // Determine if first image should span full width
  const shouldFirstImageSpanFull = () => {
    return heroImages.length === 3;
  };

  return (
    <div className="min-h-screen bg-offwhite-50">
      <PaidBookingModal
        isOpen={isBookingModalOpen}
        handleClose={closeBookingModal}
        serviceCurrency={serviceCurrency}
        subdomain={subdomain || "demo"}
        businessInfo={businessInfo}
        initialSelectedService={selectedService}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-offwhite-100/95 backdrop-blur-md shadow-sm py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-darkgray-800 rounded flex items-center justify-center">
                <span className="text-offwhite-50 font-bold text-xl">
                  {businessInitials}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-darkgray-900">
                  {businessInfo.shortName}
                </h1>
                <p className="text-xs text-darkgray-500">Book an appointment</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#home"
                className="text-darkgray-700 hover:text-darkgray-900 transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-darkgray-700 hover:text-darkgray-900 transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="text-darkgray-700 hover:text-darkgray-900 transition-colors"
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-darkgray-700 hover:text-darkgray-900 transition-colors"
              >
                Contact
              </a>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => openBookingModal()}
                className="bg-darkgray-800 text-offwhite-50 px-6 py-3 rounded font-semibold hover:bg-darkgray-900 transition-all duration-300 shadow-sm hover:shadow flex items-center gap-2"
              >
                <FaCalendarCheck />
                <span className="hidden sm:inline">Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Random Images - Only shows if images exist */}
      <section id="home" className="relative pt-32 pb-20 bg-offwhite-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-darkgray-100 px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-darkgray-500"></div>
                <span className="text-sm font-medium text-darkgray-700">
                  Reserve your spot
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-light text-darkgray-900 mb-6 leading-tight">
                Welcome to
                <span className="font-bold block mt-2">
                  {businessInfo.name}
                </span>
              </h1>

              <p
                id="about"
                className="text-lg text-darkgray-600 mb-8 leading-relaxed max-w-xl"
              >
                {businessInfo.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => openBookingModal()}
                  className="bg-darkgray-800 text-offwhite-50 px-8 py-4 font-semibold hover:bg-darkgray-900 transition-all duration-300 shadow-sm hover:shadow flex items-center gap-2"
                >
                  Book Your Session
                  <FaArrowRight />
                </button>
                <a
                  href="#services"
                  className="border border-darkgray-300 text-darkgray-700 px-8 py-4 font-semibold hover:bg-darkgray-100 transition-all"
                >
                  View Services
                </a>
              </div>
            </div>

            <div className="relative">
              {/* Image Grid - Only shows if we have images, otherwise nothing */}
              {heroImages.length > 0 && (
                <div className={`grid ${getHeroGridLayout()} gap-4`}>
                  {heroImages.map((heroImage, index) => {
                    // For 3 images, make the first one span full width
                    const isFirstAndThree =
                      index === 0 && shouldFirstImageSpanFull();

                    return (
                      <div
                        key={index}
                        className={`bg-darkgray-100 overflow-hidden ${isFirstAndThree ? "col-span-2" : ""}`}
                      >
                        <img
                          src={heroImage.image}
                          alt={`Fitness ${index + 1}`}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                          onError={(e) => handleHeroImageError(e, index)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Clickable Cards */}
      <section id="services" className="py-20 bg-offwhite-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-darkgray-900 mb-4">
              Our <span className="font-bold">Services</span>
            </h2>
            <p className="text-darkgray-600 max-w-2xl mx-auto">
              Choose from our range of professional fitness services tailored to
              your goals
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <button
                    key={service._id}
                    onClick={() => openBookingModal(service)}
                    className="group cursor-pointer bg-offwhite-50 border border-darkgray-200 hover:border-darkgray-400 hover:shadow-lg transition-all duration-300 p-0 overflow-hidden text-left w-full"
                  >
                    {/* Service Image with Fallback */}
                    <div className="h-48 overflow-hidden bg-gray-200">
                      {(service.image || service.serviceImage) ? (
                        <img
                          src={service.image || service.serviceImage}
                          alt={service.name}
                          className="w-full h-full object-cover transition group-hover:scale-110"
                          onError={(e) => handleImageError(e, service.name)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-600 font-semibold text-2xl">
                            {getServiceInitials(service.name)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-darkgray-900 mt-1 group-hover:text-darkgray-700">
                          {service.name}
                        </h3>
                      </div>

                      <p className="text-darkgray-600 text-sm mb-6">
                        {service.shortDescription}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-darkgray-200">
                        <div>
                          <span className="text-2xl font-bold text-darkgray-900">
                            {formatCurrency(service.price)}
                          </span>
                        </div>
                        <span className="text-sm text-darkgray-500 bg-darkgray-100 px-3 py-1">
                          {service.duration || `${service.deliveryTime} mins`}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Desktop Footer */}
              <div className="hidden md:block text-center mt-16 text-sm text-gray-500">
                Click{" "}
                <a
                  href="https://dimpified.com/free/auth/pre-signup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-purple-600 font-medium cursor-pointer hover:underline">
                    here
                  </span>
                </a>{" "}
                to also get a free booking link for your business.
              </div>
            </>
          )}
        </div>
      </section>

      {/* Contact Section - Minimal (No Business Hours) */}
      <section id="contact" className="py-20 bg-offwhite-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-darkgray-900 mb-4">
                Get in <span className="font-bold">Touch</span>
              </h2>
              <p className="text-darkgray-600 text-lg">
                Ready to start your fitness journey? Reach out to us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-offwhite-100 p-6 border border-darkgray-200 text-center">
                <div className="w-12 h-12 bg-darkgray-200 flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="text-darkgray-600 text-xl" />
                </div>
                <p className="text-sm text-darkgray-500 mb-1">Call us</p>
                <p className="text-lg font-semibold text-darkgray-900">
                  {businessInfo.contact.phone}
                </p>
              </div>

              <div className="bg-offwhite-100 p-6 border border-darkgray-200 text-center">
                <div className="w-12 h-12 bg-darkgray-200 flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="text-darkgray-600 text-xl" />
                </div>
                <p className="text-sm text-darkgray-500 mb-1">Email us</p>
                <p className="text-lg font-semibold text-darkgray-900 break-all">
                  {businessInfo.contact.email}
                </p>
              </div>

              <div className="bg-offwhite-100 p-6 border border-darkgray-200 text-center">
                <div className="w-12 h-12 bg-darkgray-200 flex items-center justify-center mx-auto mb-4">
                  <FaMapMarkerAlt className="text-darkgray-600 text-xl" />
                </div>
                <p className="text-sm text-darkgray-500 mb-1">Visit us</p>
                <p className="text-lg font-semibold text-darkgray-900">
                  {businessInfo.contact.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-darkgray-900 text-offwhite-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-offwhite-50 flex items-center justify-center">
                  <span className="text-darkgray-900 font-bold text-lg">
                    {businessInitials}
                  </span>
                </div>
                <span className="text-xl font-bold">
                  {businessInfo.shortName}
                </span>
              </div>
              <p className="text-offwhite-300 text-sm leading-relaxed">
                {businessInfo.description}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-offwhite-300">
                <li>
                  <a
                    href="#home"
                    className="hover:text-offwhite-50 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-offwhite-50 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-offwhite-50 transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-offwhite-50 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-offwhite-300">
                {services.slice(0, 4).map((service) => (
                  <li key={service._id}>
                    <button
                      onClick={() => openBookingModal(service)}
                      className="hover:text-offwhite-50 transition-colors text-left"
                    >
                      {service.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div>
                <div className="flex gap-4 mb-6">
                  <a
                    href={`tel:${businessContact.phone}`}
                    className="w-10 h-10 bg-darkgray-800 flex items-center justify-center hover:bg-darkgray-700 transition-colors"
                  >
                    <FaPhone />
                  </a>
                  <a
                    href={`mailto:${businessContact.email}`}
                    className="w-10 h-10 bg-darkgray-800 flex items-center justify-center hover:bg-darkgray-700 transition-colors"
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-darkgray-800">
                <div className="flex items-center gap-2 text-offwhite-400">
                  <span className="text-xs">Powered by</span>
                  <a
                    href="https://dimpified.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={DimpifiedLogo}
                      alt="Dimpified"
                      className="h-5 w-auto brightness-0 invert"
                    />
                  </a>
                </div>
                <p className="text-xs text-offwhite-500 mt-2">
                  © {new Date().getFullYear()} {businessInfo.name}. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <div className="md:hidden text-center px-4 pb-10 bg-darkgray-900">
        <p className="text-sm text-white mb-3">
          Click{" "}
          <a
            href="https://dimpified.com/free/auth/pre-signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-purple-600 font-medium cursor-pointer hover:underline">
              here
            </span>
          </a>{" "}
          to also get a free booking link for your business.
        </p>
      </div>

      <style jsx>{`
        .bg-offwhite-50 {
          background-color: #faf9f7;
        }
        .bg-offwhite-100 {
          background-color: #f5f3f0;
        }
        .text-offwhite-50 {
          color: #faf9f7;
        }
        .text-offwhite-300 {
          color: #d1cdc5;
        }
        .text-offwhite-500 {
          color: #a09b94;
        }
        .border-offwhite-200 {
          border-color: #e5e1db;
        }

        .bg-darkgray-800 {
          background-color: #2d2d2d;
        }
        .bg-darkgray-900 {
          background-color: #1a1a1a;
        }
        .bg-darkgray-100 {
          background-color: #e8e8e8;
        }
        .bg-darkgray-200 {
          background-color: #d4d4d4;
        }
        .text-darkgray-900 {
          color: #1a1a1a;
        }
        .text-darkgray-700 {
          color: #4a4a4a;
        }
        .text-darkgray-600 {
          color: #666666;
        }
        .text-darkgray-500 {
          color: #808080;
        }
        .text-darkgray-400 {
          color: #999999;
        }
        .border-darkgray-200 {
          border-color: #e0e0e0;
        }
        .border-darkgray-300 {
          border-color: #d0d0d0;
        }
        .border-darkgray-400 {
          border-color: #999999;
        }
        .border-darkgray-800 {
          border-color: #333333;
        }
        .hover\:bg-darkgray-700:hover {
          background-color: #404040;
        }
        .hover\:bg-darkgray-900:hover {
          background-color: #1a1a1a;
        }
        .hover\:bg-darkgray-100:hover {
          background-color: #e8e8e8;
        }
        .hover\:border-darkgray-400:hover {
          border-color: #999999;
        }
        .hover\:text-darkgray-700:hover {
          color: #4a4a4a;
        }
        .break-all {
          word-break: break-all;
        }
      `}</style>
    </div>
  );
};

SubtleGrayTemplate.propTypes = {
  subdomain: PropTypes.string,
  userDetails: PropTypes.object,
};

export default SubtleGrayTemplate;
