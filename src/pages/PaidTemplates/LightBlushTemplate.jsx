import React, { useState, useEffect } from "react";
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
  FaShieldAlt,
  FaAward,
  FaSpa,
  FaHandHoldingHeart,
  FaFeather,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import PaidBookingModal from "./BookingModal/PaidBookingModal";
import DimpifiedLogo from "../../pages/LandingPages/images/dimp-blue.png";
import axios from "axios";

// Demo fallback data (used when no subdomain/userDetails provided, e.g. preview mode)
const demoBusinessContact = {
  phone: "+234 800 000 0000",
  email: "hello@serenityspa.com",
  address: "15 Peaceful Close, Victoria Island, Lagos",
};

const demoBusinessInfo = {
  name: "Serenity Wellness Spa",
  shortName: "Serenity",
  description:
    "A peaceful sanctuary for holistic wellness and rejuvenation. Experience true relaxation and healing.",
  contact: demoBusinessContact,
};

const demoServices = [
  {
    _id: "1",
    name: "Swedish Massage",
    shortDescription: "Gentle, relaxing full-body massage",
    price: 45000,
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
  },
  {
    _id: "2",
    name: "Deep Tissue",
    shortDescription: "Therapeutic deep muscle work",
    price: 55000,
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400",
  },
  {
    _id: "3",
    name: "Signature Facial",
    shortDescription: "Rejuvenating facial treatment",
    price: 40000,
    duration: "75 min",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
  },
  {
    _id: "4",
    name: "Hot Stone Massage",
    shortDescription: "Warm stone therapy for deep relaxation",
    price: 60000,
    duration: "75 min",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734ab6?w=400",
  },
  {
    _id: "5",
    name: "Aromatherapy",
    shortDescription: "Essential oil healing experience",
    price: 50000,
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1600617184130-0c7b2d206c8b?w=400",
  },
  {
    _id: "6",
    name: "Couples Massage",
    shortDescription: "Share the relaxation experience",
    price: 105000,
    duration: "90 min",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400",
  },
];

// Function to get initials from business name
const getBusinessInitials = (businessName) => {
  const words = businessName.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  } else {
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

// Get random image for hero section - only from services that have images
const getHeroImage = (servicesList) => {
  const servicesWithImages = (servicesList || []).filter(
    (service) => (service.image || service.serviceImage) && (service.image || service.serviceImage).trim() !== "",
  );

  if (servicesWithImages.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * servicesWithImages.length);
  return servicesWithImages[randomIndex].image || servicesWithImages[randomIndex].serviceImage;
};

const LightBlushTemplate = ({ subdomain, userDetails }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
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
    // Set random hero image when services change
    setHeroImage(getHeroImage(services));
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
      <div class="w-full h-full bg-cream-200 flex items-center justify-center text-brown-600 font-semibold text-2xl">
        ${initials}
      </div>
    `;
  };

  // Handle image error for hero section - remove the image if it fails to load
  const handleHeroImageError = (e) => {
    e.target.onerror = null;
    setHeroImage(null);
  };

  return (
    <div className="min-h-screen bg-cream-50">
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
            ? "bg-cream-100/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blush-300 rounded-full flex items-center justify-center">
                <span className="text-cream-50 font-semibold text-lg">
                  {businessInitials}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-light text-brown-800">
                  {businessInfo.shortName}
                </h1>
                <p className="text-xs text-blush-400 font-light">
                  Wellness Spa
                </p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#home"
                className="text-brown-600 hover:text-blush-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-brown-600 hover:text-blush-400 transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="text-brown-600 hover:text-blush-400 transition-colors"
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-brown-600 hover:text-blush-400 transition-colors"
              >
                Contact
              </a>
            </div>

            <button
              onClick={() => openBookingModal()}
              className="bg-blush-300 text-cream-50 px-6 py-3 rounded-full font-light hover:bg-blush-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
            >
              <FaCalendarCheck />
              <span className="hidden sm:inline">Book an appointment</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Soft & Organic with Single Image */}
      <section id="home" className="relative pt-32 pb-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blush-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-cream-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-20 w-64 h-64 bg-brown-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-cream-200/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-light text-brown-600">
                  Hello there,
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-light text-brown-800 mb-6 leading-tight">
                Welcome to
                <span className="font-normal text-blush-400 block">
                  {businessInfo.name}
                </span>
              </h1>

              <p
                id="about"
                className="text-lg text-brown-600 mb-8 leading-relaxed font-light"
              >
                {businessInfo.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={() => openBookingModal()}
                  className="bg-blush-300 text-cream-50 px-8 py-4 rounded-full font-light hover:bg-blush-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                >
                  Book an appointment
                  <FaArrowRight />
                </button>
                <a
                  href="#services"
                  className="border border-brown-200 text-brown-600 px-8 py-4 rounded-full font-light hover:bg-cream-100 transition-all"
                >
                  Explore Our Services
                </a>
              </div>
            </div>

            <div className="relative">
              {/* Single Image - Only shows if image exists, and resized to 80% */}
              {heroImage ? (
                <div className="relative rounded-full overflow-hidden aspect-square w-4/5 mx-auto">
                  <img
                    src={heroImage}
                    alt="Serene Spa Treatment"
                    className="w-full h-full object-cover"
                    onError={handleHeroImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blush-200/30 to-transparent"></div>
                </div>
              ) : /* No placeholder - nothing displayed when no image */
              null}

              {/* Floating elements - only show if heroImage exists */}
              {heroImage && (
                <>
                  <div className="absolute -bottom-6 -left-6 bg-cream-50 rounded-2xl shadow-xl p-4 backdrop-blur-sm bg-opacity-80">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blush-100 rounded-full flex items-center justify-center">
                        <FaHeart className="text-blush-400 text-xl" />
                      </div>
                      <div>
                        <p className="font-light text-brown-800">1k+</p>
                        <p className="text-sm text-brown-500 font-light">
                          Happy Customers
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-6 -right-6 bg-cream-50 rounded-2xl shadow-xl p-4 backdrop-blur-sm bg-opacity-80">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blush-100 rounded-full flex items-center justify-center">
                        <FaStar className="text-blush-400 text-xl" />
                      </div>
                      <div>
                        <p className="font-light text-brown-800">4.9/5</p>
                        <p className="text-sm text-brown-500 font-light">
                          Rating
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Clickable Cards */}
      <section id="services" className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-brown-800 mb-4">
              Professional{" "}
              <span className="font-normal text-blush-400">Services</span>
            </h2>
            <p className="text-brown-600 font-light max-w-2xl mx-auto">
              Choose from our vast selection of professional services
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brown-600" />
            </div>
          ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <button
                key={service._id}
                onClick={() => openBookingModal(service)}
                className="group cursor-pointer bg-cream-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-left w-full"
              >
                <div className="relative h-48 overflow-hidden">
                  {(service.image || service.serviceImage) ? (
                    <img
                      src={service.image || service.serviceImage}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => handleImageError(e, service.name)}
                    />
                  ) : (
                    <div className="w-full h-full bg-cream-200 flex items-center justify-center">
                      <span className="text-brown-600 font-semibold text-2xl">
                        {getServiceInitials(service.name)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-800/40 to-transparent"></div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-light text-brown-800">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-blush-400" size={14} />
                    </div>
                  </div>

                  <p className="text-brown-500 text-sm font-light mb-4">
                    {service.shortDescription}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-cream-200">
                    <div>
                      <span className="text-2xl font-light text-brown-800">
                        {formatCurrency(service.price)}
                      </span>
                    </div>
                    <span className="text-sm text-brown-500 bg-cream-200 px-3 py-1 rounded-full font-light">
                      {service.duration || `${service.deliveryTime} mins`}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Desktop Footer */}
          <div className="hidden md:block text-center mt-16 text-sm text-brown-500">
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

      {/* About Section - Organic */}
      <section id="contact" className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-light text-brown-800 mb-4">
              Reach Out To{" "}
              <span className="font-normal text-blush-400">Us</span>
            </h2>
            <p className="text-brown-600 font-light">
              Reach out to us and take the first step toward inner peace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-cream-50 p-8 rounded-3xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blush-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-blush-400 text-2xl" />
              </div>
              <p className="text-sm text-brown-500 font-light mb-2">Call us</p>
              <p className="text-lg text-brown-800 font-light">
                {businessInfo.contact.phone}
              </p>
            </div>

            <div className="bg-cream-50 p-8 rounded-3xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blush-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-blush-400 text-2xl" />
              </div>
              <p className="text-sm text-brown-500 font-light mb-2">Email us</p>
              <p className="text-lg text-brown-800 font-light break-all">
                {businessInfo.contact.email}
              </p>
            </div>

            <div className="bg-cream-50 p-8 rounded-3xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blush-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-blush-400 text-2xl" />
              </div>
              <p className="text-sm text-brown-500 font-light mb-2">Visit us</p>
              <p className="text-lg text-brown-800 font-light">
                {businessInfo.contact.address}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brown-800 text-cream-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-cream-50 rounded-full flex items-center justify-center">
                  <span className="text-brown-800 font-semibold text-lg">
                    {businessInitials}
                  </span>
                </div>
                <span className="text-xl font-light">
                  {businessInfo.shortName}
                </span>
              </div>
              <p className="text-cream-200 text-sm font-light leading-relaxed">
                {businessInfo.description}
              </p>
            </div>

            <div>
              <h4 className="font-light mb-4">Explore</h4>
              <ul className="space-y-2 text-cream-200 font-light">
                <li>
                  <a
                    href="#home"
                    className="hover:text-cream-50 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-cream-50 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-cream-50 transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-cream-50 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-light mb-4">Services</h4>
              <ul className="space-y-2 text-cream-200 font-light">
                {services.slice(0, 4).map((service) => (
                  <li key={service._id}>
                    <button
                      onClick={() => openBookingModal(service)}
                      className="hover:text-cream-50 transition-colors text-left"
                    >
                      {service.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-light mb-4">Connect</h4>
              <div className="flex gap-4 mb-6">
                <a
                  href={`tel:${businessContact.phone}`}
                  className="w-10 h-10 bg-brown-700 rounded-full flex items-center justify-center hover:bg-blush-400 transition-colors"
                >
                  <FaPhone />
                </a>
                <a
                  href={`mailto:${businessContact.email}`}
                  className="w-10 h-10 bg-brown-700 rounded-full flex items-center justify-center hover:bg-blush-400 transition-colors"
                >
                  <FaEnvelope />
                </a>
              </div>

              <div className="pt-6 border-t border-brown-700">
                <div className="flex items-center gap-2 text-cream-300">
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
                      className="h-5 w-auto brightness-0 invert opacity-70"
                    />
                  </a>
                </div>
                <p className="text-xs text-cream-400 mt-2 font-light">
                  © {new Date().getFullYear()} {businessInfo.name}. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <div className="md:hidden text-center px-4 pb-10 bg-brown-800">
        <p className="text-sm text-cream-200 mb-3">
          Click{" "}
          <a
            href="https://dimpified.com/free/auth/pre-signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-purple-400 font-medium cursor-pointer hover:underline">
              here
            </span>
          </a>{" "}
          to also get a free booking link for your business.
        </p>
      </div>

      <style jsx>{`
        .bg-cream-50 {
          background-color: #fefaf5;
        }
        .bg-cream-100 {
          background-color: #fdf5e6;
        }
        .bg-cream-200 {
          background-color: #f9ebd2;
        }
        .text-cream-50 {
          color: #fefaf5;
        }
        .text-cream-200 {
          color: #f9ebd2;
        }
        .text-cream-300 {
          color: #f5dbb1;
        }
        .text-cream-400 {
          color: #e5c9a8;
        }
        .border-cream-200 {
          border-color: #f9ebd2;
        }

        .bg-blush-100 {
          background-color: #ffe4e1;
        }
        .bg-blush-300 {
          background-color: #f9c5c0;
        }
        .bg-blush-400 {
          background-color: #f5b0a8;
        }
        .text-blush-300 {
          color: #f9c5c0;
        }
        .text-blush-400 {
          color: #f5b0a8;
        }

        .bg-brown-100 {
          background-color: #e6d5c0;
        }
        .bg-brown-700 {
          background-color: #8b6b4d;
        }
        .bg-brown-800 {
          background-color: #6b4f3a;
        }
        .text-brown-800 {
          color: #6b4f3a;
        }
        .text-brown-600 {
          color: #8b6b4d;
        }
        .text-brown-500 {
          color: #a58c74;
        }
        .text-brown-400 {
          color: #c0a78b;
        }
        .border-brown-200 {
          border-color: #e6d5c0;
        }
        .border-brown-700 {
          border-color: #8b6b4d;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .break-all {
          word-break: break-all;
        }
      `}</style>
    </div>
  );
};

export default LightBlushTemplate;