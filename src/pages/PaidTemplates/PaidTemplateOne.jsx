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
  FaUserFriends
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LatestBookingModal from "../../features/Booking/LatestBookingModal";
import DimpifiedLogo from "../../pages/LandingPages/images/dimp-blue.png";

const PaidTemplateOne = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Business information (same as in booking modal)
  const businessInfo = {
    name: "Elite Beauty Studio",
    shortName: "Elite Beauty",
    description:
      "Professional beauty and wellness services delivered by certified experts. We're committed to making you look and feel your absolute best.",
    longDescription:
      "At Elite Beauty Studio, we believe that everyone deserves to feel beautiful and confident. Our team of certified professionals is dedicated to providing exceptional beauty and wellness services in a relaxing, modern environment. From precision haircuts to rejuvenating facials, we use only the highest quality products and techniques to ensure you leave feeling refreshed and radiant.",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "hello@elitebeauty.com",
      address: "123 Beauty Street, New York, NY 10001",
    },
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  };

  // Services data (same as in booking modal)
  const services = [
    {
      _id: "1",
      name: "Haircut & Styling",
      shortDescription: "Professional haircut with blow dry and styling",
      category: "Hair",
      price: 65,
      duration: "1 hour",
      image: "https://images.unsplash.com/photo-1560067174-c5a3a8f37060?w=400",
      rating: 4.8,
      features: ["Expert Stylists", "Premium Products", "Style Consultation"]
    },
    {
      _id: "2",
      name: "Hair Coloring",
      shortDescription: "Full hair color with conditioning treatment",
      category: "Hair",
      price: 120,
      duration: "2 hours",
      image: "https://images.unsplash.com/photo-1605493625523-0ba31a26092e?w=400",
      rating: 4.9,
      features: ["Custom Color", "Damage Protection", "Gloss Treatment"]
    },
    {
      _id: "3",
      name: "Spa Facial",
      shortDescription: "Relaxing facial with massage and mask",
      category: "Skincare",
      price: 85,
      duration: "1.5 hours",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
      rating: 4.7,
      features: ["Deep Cleaning", "Anti-aging", "Hydrating Mask"]
    },
    {
      _id: "4",
      name: "Manicure & Pedicure",
      shortDescription: "Full hand and foot care with polish",
      category: "Nails",
      price: 55,
      duration: "1 hour",
      image: "https://images.unsplash.com/photo-1610992015732-2449b0bb0a86?w=400",
      rating: 4.6,
      features: ["Nail Shaping", "Cuticle Care", "Polish Application"]
    },
    {
      _id: "5",
      name: "Makeup Application",
      shortDescription: "Professional makeup for special occasions",
      category: "Makeup",
      price: 75,
      duration: "1 hour",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ff9e?w=400",
      rating: 4.9,
      features: ["Airbrush Options", "Long-lasting", "Custom Look"]
    },
    {
      _id: "6",
      name: "Massage Therapy",
      shortDescription: "60-minute full body relaxation massage",
      category: "Wellness",
      price: 95,
      duration: "1 hour",
      image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400",
      rating: 4.8,
      features: ["Deep Tissue", "Swedish Technique", "Aromatherapy"]
    },
  ];

  // Team members data
  const teamMembers = [
    {
      _id: "1",
      name: "Sarah Johnson",
      role: "Senior Stylist",
      specialty: "Hair & Makeup",
      experience: "8+ years",
      image: "https://images.unsplash.com/photo-1494790108777-466d5a9b3c4e?w=300",
      bio: "Specializes in modern haircuts and creative coloring techniques",
      rating: 4.9,
    },
    {
      _id: "2",
      name: "Emily Chen",
      role: "Skincare Expert",
      specialty: "Facials & Treatments",
      experience: "6+ years",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
      bio: "Certified aesthetician with expertise in advanced facial treatments",
      rating: 4.8,
    },
    {
      _id: "3",
      name: "Michael Rodriguez",
      role: "Nail Artist",
      specialty: "Manicure & Pedicure",
      experience: "5+ years",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
      bio: "Award-winning nail artist specializing in creative designs",
      rating: 4.7,
    },
    {
      _id: "4",
      name: "Jessica Williams",
      role: "Massage Therapist",
      specialty: "Therapeutic Massage",
      experience: "7+ years",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
      bio: "Licensed massage therapist with expertise in deep tissue and relaxation",
      rating: 4.9,
    },
  ];

  // Stats for the about section
  const stats = [
    { value: "10+", label: "Years Experience", icon: FaAward },
    { value: "15k+", label: "Happy Clients", icon: FaHeart },
    { value: "50+", label: "Services", icon: FaCheckCircle },
    { value: "24/7", label: "Support", icon: FaClock },
  ];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  // Format currency
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
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300">
                <span className="text-white font-bold text-xl">EB</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {businessInfo.shortName}
                </h1>
                <p className="text-xs text-gray-500">Beauty & Wellness</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">About</a>
              <a href="#services" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Services</a>
              <a href="#team" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Team</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Contact</a>
            </div>

            {/* Contact & CTA */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 text-purple-600 bg-purple-50 px-4 py-2 rounded-full">
                <FaPhone size={14} />
                <span className="font-semibold text-sm">{businessInfo.contact.phone}</span>
              </div>
              <button
                onClick={openBookingModal}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                <FaCalendarCheck />
                <span className="hidden sm:inline">Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 bg-gradient-to-br from-purple-50 via-pink-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Open 7 days a week</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Where Beauty Meets
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                  Excellence
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                {businessInfo.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={openBookingModal}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                >
                  Book Your Appointment
                  <FaArrowRight />
                </button>
                <a
                  href="#services"
                  className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300"
                >
                  View Services
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center group">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="text-purple-600 text-xl" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800"
                alt="Beauty Salon"
                className="relative rounded-3xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FaCheckCircle className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">15k+</p>
                    <p className="text-sm text-gray-500">Happy Clients</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-float-delay">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FaStar className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">4.9/5</p>
                    <p className="text-sm text-gray-500">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                About
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                  Elite Beauty Studio
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {businessInfo.longDescription}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center mb-3">
                    <FaShieldAlt className="text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Certified Experts</h4>
                  <p className="text-sm text-gray-600">Licensed professionals</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-pink-200 rounded-lg flex items-center justify-center mb-3">
                    <FaHeart className="text-pink-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Premium Products</h4>
                  <p className="text-sm text-gray-600">Top quality brands</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {teamMembers.slice(0, 3).map((member) => (
                    <img
                      key={member._id}
                      src={member.image}
                      alt={member.name}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Our Expert Team</p>
                  <p className="font-semibold text-gray-900">{teamMembers.length}+ Professionals</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400"
                  alt="Salon Interior"
                  className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
                <img
                  src="https://images.unsplash.com/photo-1560067174-c5a3a8f37060?w=400"
                  alt="Hair Styling"
                  className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400"
                  alt="Facial Treatment"
                  className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
                <img
                  src="https://images.unsplash.com/photo-1610992015732-2449b0bb0a86?w=400"
                  alt="Nail Care"
                  className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Dynamic Grid */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our wide range of professional beauty and wellness services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={openBookingModal}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <FaStar className="text-yellow-500" size={14} />
                    <span className="text-sm font-semibold text-gray-900">{service.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {service.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.shortDescription}</p>
                  
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheckCircle className="text-green-500 flex-shrink-0" size={14} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-2xl font-bold text-purple-600">
                        {formatCurrency(service.price)}
                      </span>
                      <p className="text-xs text-gray-500">Starting at</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {service.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={openBookingModal}
              className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all"
            >
              View All Services
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Team Section - Dynamic Grid */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Experts
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team of certified professionals is dedicated to providing you with the best service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm opacity-90">{member.bio}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" size={14} />
                      <span className="text-sm font-semibold">{member.rating}</span>
                    </div>
                  </div>
                  <p className="text-purple-600 font-semibold text-sm mb-1">{member.role}</p>
                  <p className="text-gray-500 text-sm mb-3">{member.specialty}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {member.experience}
                    </span>
                    <button
                      onClick={openBookingModal}
                      className="text-purple-600 hover:text-purple-700 text-sm font-semibold"
                    >
                      Book with {member.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience the difference
          </p>
          <button
            onClick={openBookingModal}
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-2"
          >
            <FaCalendarCheck />
            Schedule Your Visit
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FaPhone className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call us</p>
                    <p className="text-lg font-semibold text-gray-900">{businessInfo.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <FaEnvelope className="text-pink-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email us</p>
                    <p className="text-lg font-semibold text-gray-900">{businessInfo.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Visit us</p>
                    <p className="text-lg font-semibold text-gray-900">{businessInfo.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EB</span>
                </div>
                <span className="text-xl font-bold">{businessInfo.shortName}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {businessInfo.description}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                {services.slice(0, 4).map((service) => (
                  <li key={service._id}>
                    <a href="#services" className="hover:text-white transition-colors">
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4 mb-6">
                <a href={businessInfo.social.facebook} className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <FaFacebook />
                </a>
                <a href={businessInfo.social.twitter} className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <FaTwitter />
                </a>
                <a href={businessInfo.social.instagram} className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <FaInstagram />
                </a>
                <a href={businessInfo.social.linkedin} className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <FaLinkedin />
                </a>
              </div>
              
              {/* Powered by */}
              <div className="pt-6 border-t border-gray-800">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-xs">Powered by</span>
                  <Link to="/" className="hover:opacity-80 transition-opacity">
                    <img src={DimpifiedLogo} alt="Dimpified" className="h-5 w-auto" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <LatestBookingModal
        isOpen={isBookingModalOpen}
        handleClose={closeBookingModal}
        serviceCurrency="USD"
        subdomain="demo"
      />

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default PaidTemplateOne;