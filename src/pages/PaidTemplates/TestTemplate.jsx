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
  FaAward,
  FaBriefcase,
  FaImage,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import PaidBookingModal from "./BookingModal/PaidBookingModal";
import DimpifiedLogo from "../../pages/LandingPages/images/dimp-blue.png";

// Business contact information - Maverique details
const businessContact = {
  phone: "2348109174125",
  email: "message.abdulazeez@gmail.com",
  address: "4, Rajab Quarters, Islamic Village, Gerewu",
};

// Business information - Maverique details
const businessInfo = {
  name: "Maverique",
  shortName: "Maverique",
  description:
    "We offer different fitness packages tailored towards your body and your desired shape. Our facilities are well equiped to allow you to get the best results in the least amount of time.",
  longDescription:
    "At Maverique, we combine expert training with state-of-the-art facilities to help you achieve your fitness goals. Our team of certified trainers specializes in various fitness disciplines, ensuring you get personalized attention and results-driven workouts.",
  contact: businessContact,
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
};

// Bank account details for payments
const bankDetails = {
  accountName: "Maverique Fitness LLC",
  bankName: "GTBank",
  accountNumber: "0123456789",
};

// Time slots for bookings
const timeSlots = [
  { time: "09:00 AM", booked: false },
  { time: "10:00 AM", booked: false },
  { time: "11:00 AM", booked: false },
  { time: "12:00 PM", booked: false },
  { time: "01:00 PM", booked: false },
  { time: "02:00 PM", booked: false },
  { time: "03:00 PM", booked: false },
  { time: "04:00 PM", booked: false },
  { time: "05:00 PM", booked: false },
];

// Services data with images - Maverique fitness services
const services = [
  {
    _id: "1",
    name: "Full Cardio",
    shortDescription:
      "Professional full cardio service for endurance and fat loss",
    description:
      "Professional full cardio service for endurance and fat loss. High-intensity workouts designed to maximize calorie burn and improve cardiovascular health.",
    category: "Cardio",
    price: 4000,
    duration: "120 mins",
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400",
    rating: 4.8,
  },
  {
    _id: "2",
    name: "Abs Only",
    shortDescription: "Focused abdominal workout to build core strength",
    description:
      "Intense abdominal workout to build core strength and definition. Targeted exercises for a stronger, more stable midsection.",
    category: "Strength",
    price: 2000,
    duration: "30 mins",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    rating: 4.6,
  },
  {
    _id: "3",
    name: "Strength Training",
    shortDescription: "Build strength and endurance",
    description:
      "Comprehensive strength training for muscle building and overall strength development. Perfect for all fitness levels.",
    category: "Strength",
    price: 5000,
    duration: "90 mins",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400",
    rating: 4.9,
  },
  {
    _id: "4",
    name: "Personal Training",
    shortDescription: "1-on-1 professional training",
    description:
      "Personalized one-on-one training session with expert trainers. Get customized workouts and dedicated attention to achieve your specific goals.",
    category: "Personal",
    price: 6500,
    duration: "120 mins",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    rating: 5.0,
  },
  {
    _id: "5",
    name: "Yoga Session",
    shortDescription: "Relaxing yoga training",
    description:
      "Relaxing and rejuvenating yoga session combining traditional poses with modern techniques for flexibility and mental wellness.",
    category: "Wellness",
    price: 3500,
    duration: "60 mins",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400",
    rating: 4.7,
  },
  {
    _id: "6",
    name: "HIIT Workout",
    shortDescription: "High intensity interval training",
    description:
      "High intensity interval training for maximum calorie burn and improved cardiovascular fitness in minimal time.",
    category: "Cardio",
    price: 4500,
    duration: "45 mins",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400",
    rating: 4.8,
  },
];

// Team members data - Maverique fitness trainers
const teamMembers = [
  {
    _id: "1",
    name: "Ahmed Musa",
    role: "Head Trainer",
    specialty: "Cardio & Strength",
    experience: "10+ years",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300",
    bio: "Certified personal trainer specializing in cardio and strength training",
  },
  {
    _id: "2",
    name: "Aisha Bello",
    role: "Yoga Instructor",
    specialty: "Yoga & Meditation",
    experience: "7+ years",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300",
    bio: "Experienced yoga instructor helping clients find balance and flexibility",
  },
  {
    _id: "3",
    name: "John Okafor",
    role: "Strength Coach",
    specialty: "Strength Training",
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300",
    bio: "Specializes in building strength and muscle mass through effective training",
  },
  {
    _id: "4",
    name: "Fatima Ibrahim",
    role: "HIIT Specialist",
    specialty: "HIIT & Cardio",
    experience: "5+ years",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
    bio: "High energy trainer specializing in HIIT and fat burning workouts",
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
const getHeroImages = () => {
  const servicesWithImages = services.filter(
    (service) => service.image && service.image.trim() !== "",
  );

  if (servicesWithImages.length === 0) {
    return [];
  }

  const shuffled = [...servicesWithImages].sort(() => 0.5 - Math.random());
  return shuffled
    .slice(0, Math.min(3, servicesWithImages.length))
    .map((service) => ({
      image: service.image,
      initials: getServiceInitials(service.name),
    }));
};

const SubtleGrayTemplate = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [heroImages, setHeroImages] = useState([]);

  // Get business initials dynamically
  const businessInitials = getBusinessInitials(businessInfo.name);

  useEffect(() => {
    // Set random hero images on component mount
    setHeroImages(getHeroImages());
  }, []);

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
        serviceCurrency="NGN"
        subdomain="demo"
        businessInfo={businessInfo}
        services={services}
        teamMembers={teamMembers}
        timeSlots={timeSlots}
        bankDetails={bankDetails}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <button
                key={service._id}
                onClick={() => openBookingModal(service)}
                className="group cursor-pointer bg-offwhite-50 border border-darkgray-200 hover:border-darkgray-400 hover:shadow-lg transition-all duration-300 p-0 overflow-hidden text-left w-full"
              >
                {/* Service Image with Fallback */}
                <div className="h-48 overflow-hidden bg-gray-200">
                  {service.image ? (
                    <img
                      src={service.image}
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
                      {service.duration}
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
                <h4 className="font-semibold mb-4">Contact Us</h4>
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

export default SubtleGrayTemplate;
