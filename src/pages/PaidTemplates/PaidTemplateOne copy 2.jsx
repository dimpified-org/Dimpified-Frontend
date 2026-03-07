import React, { useState, useEffect } from "react";
import { 
  FaTooth, 
  FaStar, 
  FaCalendarCheck, 
  FaUserMd, 
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
  FaCreditCard,
  FaUniversity,
  FaHeart,
  FaShieldAlt,
  FaAward,
  FaUserFriends,
  FaBriefcase,
  FaLaptop,
  FaChartLine
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LatestBookingModal from "../../features/Booking/LatestBookingModal";
import DimpifiedLogo from "../../pages/LandingPages/images/dimp-blue.png";

const PaidTemplateOne = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const businessInfo = {
    name: "Elite Professional Services",
    shortName: "Elite Pro",
    description:
      "Expert consulting and professional services for modern businesses. We deliver strategic solutions that drive growth and efficiency.",
    longDescription:
      "At Elite Professional Services, we combine industry expertise with innovative approaches to help businesses thrive. Our team of certified consultants specializes in strategic planning, operational excellence, and digital transformation. We're committed to delivering measurable results that exceed expectations.",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "hello@elitepro.com",
      address: "123 Business Ave, New York, NY 10001",
    },
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  };

  const services = [
    {
      _id: "1",
      name: "Business Consulting",
      shortDescription: "Strategic planning and business optimization",
      category: "Consulting",
      price: 299,
      duration: "2 hours",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
      rating: 4.9,
      features: ["Market Analysis", "Strategy Development", "Implementation"]
    },
    {
      _id: "2",
      name: "Financial Advisory",
      shortDescription: "Expert financial planning and analysis",
      category: "Finance",
      price: 399,
      duration: "1.5 hours",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      rating: 4.8,
      features: ["Budget Planning", "Investment Strategy", "Risk Management"]
    },
    {
      _id: "3",
      name: "Digital Transformation",
      shortDescription: "Modernize your business operations",
      category: "Technology",
      price: 499,
      duration: "3 hours",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      rating: 4.7,
      features: ["Process Automation", "Cloud Solutions", "Digital Strategy"]
    }
  ];

  const teamMembers = [
    {
      _id: "1",
      name: "David Chen",
      role: "Senior Consultant",
      specialty: "Business Strategy",
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
      bio: "Harvard MBA with expertise in corporate strategy",
      rating: 4.9,
    },
    {
      _id: "2",
      name: "Sarah Williams",
      role: "Financial Advisor",
      specialty: "Investment Planning",
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300",
      bio: "CFA charterholder with wealth management background",
      rating: 4.8,
    }
  ];

  const stats = [
    { value: "15+", label: "Years Experience", icon: FaAward },
    { value: "500+", label: "Projects Completed", icon: FaBriefcase },
    { value: "98%", label: "Client Satisfaction", icon: FaHeart },
    { value: "24/7", label: "Support", icon: FaClock },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-offwhite-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-offwhite-100/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-darkgray-800 rounded flex items-center justify-center">
                <span className="text-offwhite-50 font-bold text-xl">EP</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-darkgray-900">
                  {businessInfo.shortName}
                </h1>
                <p className="text-xs text-darkgray-500">Professional Services</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-darkgray-700 hover:text-darkgray-900 transition-colors">Home</a>
              <a href="#about" className="text-darkgray-700 hover:text-darkgray-900 transition-colors">About</a>
              <a href="#services" className="text-darkgray-700 hover:text-darkgray-900 transition-colors">Services</a>
              <a href="#team" className="text-darkgray-700 hover:text-darkgray-900 transition-colors">Team</a>
              <a href="#contact" className="text-darkgray-700 hover:text-darkgray-900 transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={openBookingModal}
                className="bg-darkgray-800 text-offwhite-50 px-6 py-3 rounded font-semibold hover:bg-darkgray-900 transition-all duration-300 shadow-sm hover:shadow flex items-center gap-2"
              >
                <FaCalendarCheck />
                <span className="hidden sm:inline">Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Minimalist */}
      <section id="home" className="relative pt-32 pb-20 bg-offwhite-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-darkgray-100 px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-darkgray-500"></div>
                <span className="text-sm font-medium text-darkgray-700">Trusted by 500+ businesses</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-light text-darkgray-900 mb-6 leading-tight">
                Strategic Solutions for
                <span className="font-bold block mt-2">
                  Modern Business
                </span>
              </h1>
              
              <p className="text-lg text-darkgray-600 mb-8 leading-relaxed max-w-xl">
                {businessInfo.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={openBookingModal}
                  className="bg-darkgray-800 text-offwhite-50 px-8 py-4 font-semibold hover:bg-darkgray-900 transition-all duration-300 shadow-sm hover:shadow flex items-center gap-2"
                >
                  Schedule Consultation
                  <FaArrowRight />
                </button>
                <a
                  href="#services"
                  className="border border-darkgray-300 text-darkgray-700 px-8 py-4 font-semibold hover:bg-darkgray-100 transition-all"
                >
                  View Services
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index}>
                      <Icon className="text-darkgray-400 text-2xl mb-2" />
                      <div className="text-2xl font-bold text-darkgray-900">{stat.value}</div>
                      <div className="text-sm text-darkgray-500">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="bg-darkgray-100 p-8">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"
                  alt="Professional Consulting"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Minimal floating element */}
              <div className="absolute -bottom-4 -left-4 bg-offwhite-50 p-4 shadow-sm border border-darkgray-200">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-darkgray-600 text-xl" />
                  <div>
                    <p className="font-semibold text-darkgray-900">98% Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Grid Layout */}
      <section id="services" className="py-20 bg-offwhite-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-darkgray-900 mb-4">
              Our <span className="font-bold">Services</span>
            </h2>
            <p className="text-darkgray-600 max-w-2xl mx-auto">
              Comprehensive professional solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-offwhite-50 border border-darkgray-200 hover:shadow-lg transition-all duration-300 p-6 cursor-pointer"
                onClick={openBookingModal}
              >
                <div className="mb-4">
                  <span className="text-xs font-semibold text-darkgray-500 tracking-wider">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-bold text-darkgray-900 mt-1">{service.name}</h3>
                </div>
                
                <p className="text-darkgray-600 text-sm mb-6">{service.shortDescription}</p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-darkgray-600">
                      <FaCheckCircle className="text-darkgray-400" size={14} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-darkgray-200">
                  <div>
                    <span className="text-2xl font-bold text-darkgray-900">
                      {formatCurrency(service.price)}
                    </span>
                    <p className="text-xs text-darkgray-500">Starting at</p>
                  </div>
                  <span className="text-sm text-darkgray-500 bg-darkgray-100 px-3 py-1">
                    {service.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Minimal */}
      <section id="contact" className="py-20 bg-offwhite-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-light text-darkgray-900 mb-6">
                Get in <span className="font-bold">Touch</span>
              </h2>
              <p className="text-darkgray-600 text-lg mb-8">
                Ready to transform your business? Let's talk about your goals.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-darkgray-100 flex items-center justify-center">
                    <FaPhone className="text-darkgray-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-darkgray-500">Call us</p>
                    <p className="text-lg font-semibold text-darkgray-900">{businessInfo.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-darkgray-100 flex items-center justify-center">
                    <FaEnvelope className="text-darkgray-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-darkgray-500">Email us</p>
                    <p className="text-lg font-semibold text-darkgray-900">{businessInfo.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-offwhite-100 p-8 border border-darkgray-200">
              <h3 className="text-xl font-bold text-darkgray-900 mb-6">Send a Message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-offwhite-50 border border-darkgray-200 focus:border-darkgray-400 outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-offwhite-50 border border-darkgray-200 focus:border-darkgray-400 outline-none"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-offwhite-50 border border-darkgray-200 focus:border-darkgray-400 outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-darkgray-800 text-offwhite-50 py-4 font-semibold hover:bg-darkgray-900 transition-all"
                >
                  Send Message
                </button>
              </form>
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
                  <span className="text-darkgray-900 font-bold text-lg">EP</span>
                </div>
                <span className="text-xl font-bold">{businessInfo.shortName}</span>
              </div>
              <p className="text-offwhite-300 text-sm leading-relaxed">
                {businessInfo.description}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-offwhite-300">
                <li><a href="#home" className="hover:text-offwhite-50 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-offwhite-50 transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-offwhite-50 transition-colors">Services</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-offwhite-300">
                {services.map((service) => (
                  <li key={service._id}>
                    <a href="#services" className="hover:text-offwhite-50 transition-colors">
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-darkgray-800 flex items-center justify-center hover:bg-darkgray-700 transition-colors">
                  <FaLinkedin />
                </a>
                <a href="#" className="w-10 h-10 bg-darkgray-800 flex items-center justify-center hover:bg-darkgray-700 transition-colors">
                  <FaTwitter />
                </a>
              </div>
              
              <div className="pt-6 mt-6 border-t border-darkgray-800">
                <div className="flex items-center gap-2 text-offwhite-400">
                  <span className="text-xs">Powered by</span>
                  <Link to="/" className="hover:opacity-80 transition-opacity">
                    <img src={DimpifiedLogo} alt="Dimpified" className="h-5 w-auto brightness-0 invert" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <LatestBookingModal
        isOpen={isBookingModalOpen}
        handleClose={closeBookingModal}
        serviceCurrency="USD"
        subdomain="demo"
      />

      <style jsx>{`
        .bg-offwhite-50 { background-color: #faf9f7; }
        .bg-offwhite-100 { background-color: #f5f3f0; }
        .text-offwhite-50 { color: #faf9f7; }
        .text-offwhite-300 { color: #d1cdc5; }
        .border-offwhite-200 { border-color: #e5e1db; }
        
        .bg-darkgray-800 { background-color: #2d2d2d; }
        .bg-darkgray-800 { background-color: #2d2d2d; }
        .bg-darkgray-900 { background-color: #1a1a1a; }
        .bg-darkgray-100 { background-color: #e8e8e8; }
        .text-darkgray-900 { color: #1a1a1a; }
        .text-darkgray-700 { color: #4a4a4a; }
        .text-darkgray-600 { color: #666666; }
        .text-darkgray-500 { color: #808080; }
        .text-darkgray-400 { color: #999999; }
        .border-darkgray-200 { border-color: #e0e0e0; }
        .border-darkgray-300 { border-color: #d0d0d0; }
        .border-darkgray-800 { border-color: #333333; }
        .hover\:bg-darkgray-700:hover { background-color: #404040; }
        .hover\:bg-darkgray-900:hover { background-color: #1a1a1a; }
        .hover\:bg-darkgray-100:hover { background-color: #e8e8e8; }
        .focus\:border-darkgray-400:focus { border-color: #999999; }
      `}</style>
    </div>
  );
};

export default PaidTemplateOne;