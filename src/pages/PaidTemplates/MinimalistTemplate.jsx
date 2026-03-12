import React, { useState, useEffect } from "react";
import Logo from "../../pages/LandingPages/images/dimp-blue.png";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiMenu,
  HiX,
} from "react-icons/hi";
import PaidBookingModal from "./BookingModal/PaidBookingModal";

const businessName = "Maverique";
const businessLogo = "";

// Business contact information - matching the modal
const businessContact = {
  phone: "2348109174125",
  email: "message.abdulazeez@gmail.com",
  address: "4, Rajab Quarters, Islamic Village, Gerewu",
};

// Business description
const businessDescription =
  "We offer different fitness packages tailored towards your body and your desired shape. Our facilities are well equiped to allow you to get the best results in the least amount of time.";

// Bank account details for payments
const bankDetails = {
  accountName: "Maverique Fitness LLC",
  bankName: "GTBank",
  accountNumber: "0123456789",
};

// Team members data
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

const services = [
  {
    _id: "1",
    name: "Full Cardio",
    shortDescription: "Professional full cardio service",
    description: "Professional full cardio service for endurance and fat loss",
    category: "Cardio",
    price: 4000,
    duration: "120 mins",
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e",
    rating: 4.8,
  },
  {
    _id: "2",
    name: "Abs Only",
    shortDescription: "Focused abdominal workout",
    description: "Intense abdominal workout to build core strength",
    category: "Strength",
    price: 2000,
    duration: "30 mins",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    rating: 4.6,
  },
  {
    _id: "3",
    name: "Strength Training",
    shortDescription: "Build strength and endurance",
    description: "Comprehensive strength training for muscle building",
    category: "Strength",
    price: 5000,
    duration: "90 mins",
    
    rating: 4.9,
  },
  {
    _id: "4",
    name: "Personal Training",
    shortDescription: "1-on-1 professional training",
    description: "Personalized one-on-one training session with expert",
    category: "Personal",
    price: 6500,
    duration: "120 mins",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    rating: 5.0,
  },
  {
    _id: "5",
    name: "Yoga Session",
    shortDescription: "Relaxing yoga training",
    description: "Relaxing and rejuvenating yoga session",
    category: "Wellness",
    price: 3500,
    duration: "60 mins",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3",
    rating: 4.7,
  },
  {
    _id: "6",
    name: "HIIT Workout",
    shortDescription: "High intensity interval training",
    description: "High intensity interval training for maximum calorie burn",
    category: "Cardio",
    price: 4500,
    duration: "45 mins",
    
    rating: 4.8,
  },
];

// Function to get initials from service name
const getServiceInitials = (serviceName) => {
  const words = serviceName.trim().split(/\s+/);

  if (words.length === 1) {
    // If one word, take first 2 letters
    return words[0].slice(0, 2).toUpperCase();
  } else {
    // If multiple words, take first letter of first two words
    return (words[0][0] + words[1][0]).toUpperCase();
  }
};

const MinimalistTemplate = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  const openBookingModal = (service = null) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };
  
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedService(null);
  };
  
  const initials = businessName.slice(0, 2).toUpperCase();

  const navigationItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "services", label: "Services", href: "#services" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PaidBookingModal
        isOpen={isBookingModalOpen}
        handleClose={closeBookingModal}
        serviceCurrency="NGN"
        subdomain="demo"
        businessInfo={{
          name: businessName,
          description: businessDescription,
          contact: businessContact,
        }}
        services={services}
        teamMembers={teamMembers}
        timeSlots={timeSlots}
        bankDetails={bankDetails}
        initialSelectedService={selectedService}
      />
      
      {/* HEADER */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="mx-auto px-6 md:px-32 lg:px-48 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              {businessLogo ? (
                <img
                  src={businessLogo}
                  alt={businessName}
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            {/* Hidden on mobile */}
            <div className="hidden md:block">
              <h2 className="font-semibold text-lg">{businessName}</h2>
              <p className="text-sm text-gray-500">
                Book your appointment online
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="hover:text-purple-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button and Book Now */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => openBookingModal()} 
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
            >
              Book Now
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-2xl text-gray-600 hover:text-purple-600"
            >
              {isMobileMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white border-t py-4 px-6">
            <div className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-gray-600 hover:text-purple-600 py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* MAIN */}
      <div className="grid lg:grid-cols-4 gap-10 flex-grow">
        {/* SERVICES */}
        <div id="services" className="lg:col-span-3 px-6 md:px-32 lg:px-48 py-12">
          <section id="home">
            <h1 className="text-3xl font-bold mb-3">
              Welcome to {businessName}
            </h1>
          </section>

          <section id="about" className="mb-8">
            <p className="text-gray-600 mb-8 max-w-3xl">
              {businessDescription}
            </p>
          </section>

          <h2 className="text-2xl font-semibold mb-6">
            Kindly select a service to book
          </h2>

          {/* SERVICE GRID */}
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service) => (
              <button
                key={service._id}
                onClick={() => openBookingModal(service)}
                className="group cursor-pointer bg-white border rounded-xl hover:border-purple-600 p-4 flex gap-4 items-center hover:-translate-y-1 transition"
              >
                {/* IMAGE - Using initials for default service image */}
                <div className="overflow-hidden rounded-lg">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-20 h-20 object-cover transition group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML = `
                          <div class="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
                            ${getServiceInitials(service.name)}
                          </div>
                        `;
                      }}
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
                      {getServiceInitials(service.name)}
                    </div>
                  )}
                </div>

                {/* TEXT */}
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-800 group-hover:text-purple-600">
                    {service.name}
                  </h3>

                  <p className="text-sm text-gray-500">{service.shortDescription}</p>

                  <div className="flex justify-between mt-2">
                    <span className="text-purple-600 font-semibold">
                      ₦{service.price.toLocaleString()}
                    </span>

                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {service.duration}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* DESKTOP FOOTER */}
          <div className="hidden md:block text-center mt-10 text-sm text-gray-500">
            Click{" "}
            <a href="https://dimpified.com/free/auth/pre-signup">
              <span className="text-purple-600 font-medium cursor-pointer hover:underline">
                here
              </span>
            </a>{" "}
            to also get a free booking link for your business.
          </div>

          <div className="hidden md:flex text-center text-xs text-gray-400 mt-6 items-center justify-center gap-2">
            <span>Powered by</span>

            <a
              href="https://dimpified.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Logo}
                alt="Dimpified Logo"
                className="h-4 object-contain"
              />
            </a>
          </div>
        </div>

        {/* SIDEBAR */}
        <div id="contact" className="bg-gray-50 px-6 md:px-8 py-10">
          <div className="">
            {/* PROFILE */}
            <div className="flex-col items-center text-center mb-6 hidden md:flex">
              <div className="h-14 w-14 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold mb-2">
                {businessLogo ? (
                  <img
                    src={businessLogo}
                    alt={businessName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <h3 className="font-semibold text-lg">{businessName}</h3>
            </div>

            {/* CONTACT CARD */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h4 className="font-semibold mb-4">Contact Information</h4>

              <div className="flex items-start gap-3 mb-3">
                <HiOutlineLocationMarker className="text-purple-600 text-lg mt-0.5" />
                <p>{businessContact.address}</p>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <HiOutlinePhone className="text-purple-600 text-lg" />
                <p>{businessContact.phone}</p>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlineMail className="text-purple-600 text-lg" />
                <p>{businessContact.email}</p>
              </div>
            </div>

            {/* SIDEBAR FOOTER (DESKTOP ONLY) */}
            <div className="hidden md:flex text-center text-xs text-gray-400 mt-6 items-center justify-center gap-2">
              <span>Powered by</span>

              <a
                href="https://dimpified.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={Logo}
                  alt="Dimpified Logo"
                  className="h-4 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FOOTER */}
      <div className="md:hidden text-center px-4 pb-10">
        <p className="text-sm text-gray-500 mb-3">
          Click{" "}
          <a href="https://dimpified.com/free/auth/pre-signup">
            <span className="text-purple-600 font-medium cursor-pointer hover:underline">
              here
            </span>
          </a>{" "}
          to also get a free booking link for your business.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <span>Powered by</span>

          <a
            href="https://dimpified.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Logo}
              alt="Dimpified Logo"
              className="h-4 object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MinimalistTemplate;