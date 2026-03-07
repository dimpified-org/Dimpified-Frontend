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
  FaSeedling,
  FaRecycle,
  FaSolarPanel,
  FaLeaf
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LatestBookingModal from "../../features/Booking/LatestBookingModal";
import DimpifiedLogo from "../../pages/LandingPages/images/dimp-blue.png";

const PaidTemplateOne = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const businessInfo = {
    name: "EcoVital Sustainability",
    shortName: "EcoVital",
    description:
      "Sustainable solutions for a greener future. We help businesses transition to eco-friendly operations.",
    longDescription:
      "At EcoVital, we're passionate about creating a sustainable future. Our team of environmental experts provides comprehensive sustainability consulting, green technology implementation, and carbon footprint reduction strategies. Together, we can build a better world for future generations.",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "hello@ecovital.com",
      address: "123 Green Way, Portland, OR 97201",
    },
    social: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  };

  const services = [
    {
      _id: "1",
      name: "Sustainability Audit",
      shortDescription: "Comprehensive environmental impact assessment",
      category: "Consulting",
      price: 899,
      duration: "2 weeks",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400",
      rating: 4.9,
      features: ["Carbon Analysis", "Waste Audit", "Recommendations"]
    },
    {
      _id: "2",
      name: "Solar Installation",
      shortDescription: "Renewable energy solutions",
      category: "Energy",
      price: 15000,
      duration: "1 month",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      rating: 4.8,
      features: ["Panel Installation", "Grid Connection", "Monitoring"]
    },
    {
      _id: "3",
      name: "Waste Management",
      shortDescription: "Zero-waste program implementation",
      category: "Operations",
      price: 599,
      duration: "Weekly",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
      rating: 4.7,
      features: ["Recycling Program", "Composting", "Education"]
    }
  ];

  const teamMembers = [
    {
      _id: "1",
      name: "Dr. Elena Green",
      role: "Environmental Scientist",
      specialty: "Climate Solutions",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300",
      bio: "PhD in Environmental Science",
      rating: 4.9,
    },
    {
      _id: "2",
      name: "Marcus Chen",
      role: "Sustainability Consultant",
      specialty: "Green Building",
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
      bio: "LEED Accredited Professional",
      rating: 4.8,
    }
  ];

  const stats = [
    { value: "500+", label: "Projects Completed", icon: FaSeedling },
    { value: "50k+", label: "Tons CO2 Saved", icon: FaLeaf },
    { value: "100+", label: "Green Partners", icon: FaRecycle },
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <FaLeaf className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-900">
                  {businessInfo.shortName}
                </h1>
                <p className="text-xs text-green-600">Sustainability</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-green-700 hover:text-green-900 transition-colors">Home</a>
              <a href="#about" className="text-green-700 hover:text-green-900 transition-colors">Mission</a>
              <a href="#services" className="text-green-700 hover:text-green-900 transition-colors">Solutions</a>
              <a href="#team" className="text-green-700 hover:text-green-900 transition-colors">Team</a>
              <a href="#contact" className="text-green-700 hover:text-green-900 transition-colors">Contact</a>
            </div>

            <button
              onClick={openBookingModal}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
            >
              <FaCalendarCheck />
              <span className="hidden sm:inline">Go Green</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Fresh & Clean */}
      <section id="home" className="relative pt-32 pb-20 bg-gradient-to-br from-green-50 to-white overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6">
                <FaSeedling className="text-green-600" />
                <span className="text-sm font-medium text-green-700">Sustainable Future</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-green-900 mb-6 leading-tight">
                Grow Your Business
                <span className="text-green-600 block">
                  Sustainably
                </span>
              </h1>
              
              <p className="text-lg text-green-700 mb-8 leading-relaxed">
                {businessInfo.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={openBookingModal}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
                >
                  Start Your Green Journey
                  <FaArrowRight />
                </button>
                <a
                  href="#services"
                  className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all"
                >
                  Our Solutions
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index}>
                      <Icon className="text-green-600 text-3xl mb-2" />
                      <div className="text-2xl font-bold text-green-900">{stat.value}</div>
                      <div className="text-sm text-green-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800"
                  alt="Sustainable Future"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaRecycle className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">Zero Waste</p>
                    <p className="text-sm text-green-600">Certified</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaSolarPanel className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">100%</p>
                    <p className="text-sm text-green-600">Renewable</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Clean Cards */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Sustainable Solutions
            </h2>
            <p className="text-green-600 max-w-2xl mx-auto">
              Comprehensive environmental services for businesses of all sizes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300 cursor-pointer"
                onClick={openBookingModal}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
                  
                  {/* Category badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {service.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-2">{service.name}</h3>
                  <p className="text-green-600 text-sm mb-4">{service.shortDescription}</p>
                  
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-green-700">
                        <FaCheckCircle className="text-green-500 flex-shrink-0" size={14} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-green-100">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        {formatCurrency(service.price)}
                      </span>
                      <p className="text-xs text-green-400">Starting at</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" size={14} />
                      <span className="text-sm text-green-700">{service.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Fresh */}
      <section id="contact" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-green-900 mb-6">
                Let's Make a Difference
              </h2>
              <p className="text-green-700 text-lg mb-8">
                Ready to start your sustainability journey? Contact us today.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                    <FaPhone className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-green-500">Call us</p>
                    <p className="text-lg font-semibold text-green-900">{businessInfo.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-green-500">Email us</p>
                    <p className="text-lg font-semibold text-green-900">{businessInfo.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-green-500">Visit us</p>
                    <p className="text-lg font-semibold text-green-900">{businessInfo.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-green-900 mb-6">Send a Message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Tell us about your sustainability goals"
                  rows={4}
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaLeaf className="text-green-400 text-2xl" />
                <span className="text-xl font-bold">{businessInfo.shortName}</span>
              </div>
              <p className="text-green-300 text-sm leading-relaxed">
                {businessInfo.description}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-green-300">Quick Links</h4>
              <ul className="space-y-2 text-green-200">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Our Mission</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Solutions</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">Team</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-green-300">Solutions</h4>
              <ul className="space-y-2 text-green-200">
                {services.map((service) => (
                  <li key={service._id}>
                    <a href="#services" className="hover:text-white transition-colors">
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-green-300">Connect</h4>
              <div className="flex gap-4 mb-6">
                <a href="#" className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors">
                  <FaLinkedin />
                </a>
                <a href="#" className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors">
                  <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors">
                  <FaInstagram />
                </a>
              </div>
              
              <div className="pt-6 border-t border-green-800">
                <div className="flex items-center gap-2 text-green-400">
                  <span className="text-xs">Powered by</span>
                  <Link to="/" className="hover:opacity-80 transition-opacity">
                    <img src={DimpifiedLogo} alt="Dimpified" className="h-5 w-auto brightness-0 invert opacity-70" />
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
    </div>
  );
};

export default PaidTemplateOne;