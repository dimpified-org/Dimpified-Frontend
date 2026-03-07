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
  FaPalette,
  FaCamera,
  FaPenFancy
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LatestBookingModal from "../../features/Booking/LatestBookingModal";
import DimpifiedLogo from "../../pages/LandingPages/images/dimp-blue.png";

const PaidTemplateOne = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const businessInfo = {
    name: "Creative Studio",
    shortName: "Creative Co",
    description:
      "A modern creative studio specializing in design, photography, and digital art. We bring your vision to life.",
    longDescription:
      "Creative Studio is where imagination meets execution. Our team of talented artists, designers, and photographers collaborate to create stunning visual experiences. From brand identity to commercial photography, we deliver exceptional creative solutions that tell your story.",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "hello@creativestudio.com",
      address: "456 Design District, New York, NY 10001",
    },
    social: {
      instagram: "https://instagram.com",
      behance: "https://behance.net",
      linkedin: "https://linkedin.com",
    },
  };

  const services = [
    {
      _id: "1",
      name: "Brand Identity",
      shortDescription: "Complete brand design package",
      category: "Design",
      price: 899,
      duration: "2 weeks",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
      rating: 4.9,
      features: ["Logo Design", "Color Palette", "Brand Guidelines"]
    },
    {
      _id: "2",
      name: "Photography",
      shortDescription: "Professional photo sessions",
      category: "Photography",
      price: 399,
      duration: "3 hours",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400",
      rating: 4.8,
      features: ["Commercial", "Portrait", "Product"]
    },
    {
      _id: "3",
      name: "Web Design",
      shortDescription: "Custom website design",
      category: "Digital",
      price: 1299,
      duration: "3 weeks",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400",
      rating: 4.7,
      features: ["Responsive Design", "UX/UI", "SEO Optimized"]
    }
  ];

  const teamMembers = [
    {
      _id: "1",
      name: "Alex Rivera",
      role: "Creative Director",
      specialty: "Brand Strategy",
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      bio: "Award-winning designer with global experience",
      rating: 4.9,
    },
    {
      _id: "2",
      name: "Maya Patel",
      role: "Lead Photographer",
      specialty: "Commercial Photography",
      experience: "8+ years",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=300",
      bio: "Published in Vogue and Architectural Digest",
      rating: 4.8,
    }
  ];

  const stats = [
    { value: "500+", label: "Projects", icon: FaPalette },
    { value: "50+", label: "Awards", icon: FaAward },
    { value: "200+", label: "Happy Clients", icon: FaHeart },
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
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">CS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">
                  {businessInfo.shortName}
                </h1>
                <p className="text-xs text-blue-400">Creative Studio</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-blue-700 hover:text-blue-900 transition-colors">Home</a>
              <a href="#work" className="text-blue-700 hover:text-blue-900 transition-colors">Work</a>
              <a href="#services" className="text-blue-700 hover:text-blue-900 transition-colors">Services</a>
              <a href="#team" className="text-blue-700 hover:text-blue-900 transition-colors">Team</a>
              <a href="#contact" className="text-blue-700 hover:text-blue-900 transition-colors">Contact</a>
            </div>

            <button
              onClick={openBookingModal}
              className="bg-blue-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
            >
              <FaCalendarCheck />
              <span className="hidden sm:inline">Start Project</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Creative */}
      <section id="home" className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-100/50 rounded-bl-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold text-blue-900 mb-6 leading-tight">
                Create
                <span className="text-blue-400 block">
                  Without Limits
                </span>
              </h1>
              
              <p className="text-xl text-blue-700 mb-8 leading-relaxed">
                {businessInfo.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={openBookingModal}
                  className="bg-blue-400 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
                >
                  Start Your Project
                  <FaArrowRight />
                </button>
                <a
                  href="#work"
                  className="border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all"
                >
                  View Portfolio
                </a>
              </div>

              {/* Creative Stats */}
              <div className="flex gap-8">
                {stats.slice(0, 3).map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-3">
                        <Icon className="text-blue-400 text-2xl" />
                      </div>
                      <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
                      <div className="text-sm text-blue-500">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800"
                  alt="Creative Studio"
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              
              {/* Creative floating elements */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 transform rotate-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaPenFancy className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Design</p>
                    <p className="text-sm text-blue-400">Award Winning</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 transform -rotate-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaCamera className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Photography</p>
                    <p className="text-sm text-blue-400">Professional</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Creative Cards */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Our Creative Services
            </h2>
            <p className="text-blue-600 max-w-2xl mx-auto">
              We offer a full range of creative services to bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                onClick={openBookingModal}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-900 px-4 py-2 rounded-full text-sm font-semibold">
                      {service.category}
                    </span>
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full">
                    <FaStar className="text-yellow-500" size={14} />
                    <span className="text-sm font-semibold text-blue-900">{service.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{service.name}</h3>
                  <p className="text-blue-600 text-sm mb-4">{service.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                    <div>
                      <span className="text-2xl font-bold text-blue-900">
                        {formatCurrency(service.price)}
                      </span>
                      <p className="text-xs text-blue-400">Starting at</p>
                    </div>
                    <span className="text-sm text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                      {service.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Creative */}
      <section id="contact" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left side - Creative contact info */}
              <div className="bg-blue-400 p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">Let's Create Together</h2>
                <p className="text-blue-50 text-lg mb-8">
                  Have a project in mind? We'd love to hear about it. Let's make something amazing.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaPhone className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-blue-50 text-sm">Call us</p>
                      <p className="text-lg font-semibold">{businessInfo.contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-blue-50 text-sm">Email us</p>
                      <p className="text-lg font-semibold">{businessInfo.contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaMapMarkerAlt className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-blue-50 text-sm">Visit us</p>
                      <p className="text-lg font-semibold">{businessInfo.contact.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="p-12">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">Send a Message</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Tell us about your project"
                    rows={4}
                    className="w-full px-4 py-3 border border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-400 text-white py-4 rounded-full font-semibold hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CS</span>
                </div>
                <span className="text-xl font-bold text-blue-900">{businessInfo.shortName}</span>
              </div>
              <p className="text-blue-500 text-sm leading-relaxed">
                {businessInfo.description}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-blue-900 mb-4">Explore</h4>
              <ul className="space-y-2 text-blue-500">
                <li><a href="#home" className="hover:text-blue-700 transition-colors">Home</a></li>
                <li><a href="#work" className="hover:text-blue-700 transition-colors">Our Work</a></li>
                <li><a href="#services" className="hover:text-blue-700 transition-colors">Services</a></li>
                <li><a href="#team" className="hover:text-blue-700 transition-colors">Team</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-900 mb-4">Services</h4>
              <ul className="space-y-2 text-blue-500">
                {services.map((service) => (
                  <li key={service._id}>
                    <a href="#services" className="hover:text-blue-700 transition-colors">
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-900 mb-4">Connect</h4>
              <div className="flex gap-4 mb-6">
                <a href="#" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <FaInstagram className="text-blue-500" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <FaFacebook className="text-blue-500" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <FaLinkedin className="text-blue-500" />
                </a>
              </div>
              
              <div className="pt-6 border-t border-blue-100">
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="text-xs">Powered by</span>
                  <Link to="/" className="hover:opacity-80 transition-opacity">
                    <img src={DimpifiedLogo} alt="Dimpified" className="h-5 w-auto" />
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