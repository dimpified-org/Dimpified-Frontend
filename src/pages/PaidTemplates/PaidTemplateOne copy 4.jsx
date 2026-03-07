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
  FaLeaf,
  FaHandHoldingHeart,
  FaFeather
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LatestBookingModal from "../../features/Booking/LatestBookingModal";
import DimpifiedLogo from "../../pages/LandingPages/images/dimp-blue.png";

const PaidTemplateOne = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const businessInfo = {
    name: "Serenity Wellness Spa",
    shortName: "Serenity",
    description:
      "A peaceful sanctuary for holistic wellness and rejuvenation. Experience true relaxation and healing.",
    longDescription:
      "At Serenity Wellness Spa, we believe in the power of holistic healing. Our tranquil environment combined with expert therapists provides the perfect escape from daily stress. From therapeutic massages to rejuvenating facials, every treatment is designed to restore balance and harmony to your mind, body, and spirit.",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "hello@serenityspa.com",
      address: "789 Peaceful Lane, Sedona, AZ 86336",
    },
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      pinterest: "https://pinterest.com",
    },
  };

  const services = [
    {
      _id: "1",
      name: "Swedish Massage",
      shortDescription: "Gentle, relaxing full-body massage",
      category: "Massage",
      price: 95,
      duration: "60 min",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
      rating: 4.9,
      features: ["Gentle Pressure", "Aromatherapy", "Hot Towels"]
    },
    {
      _id: "2",
      name: "Deep Tissue",
      shortDescription: "Therapeutic deep muscle work",
      category: "Massage",
      price: 115,
      duration: "60 min",
      image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400",
      rating: 4.8,
      features: ["Targeted Relief", "Chronic Pain", "Sports Therapy"]
    },
    {
      _id: "3",
      name: "Signature Facial",
      shortDescription: "Rejuvenating facial treatment",
      category: "Facial",
      price: 85,
      duration: "75 min",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
      rating: 4.7,
      features: ["Deep Cleanse", "Mask Therapy", "Facial Massage"]
    }
  ];

  const teamMembers = [
    {
      _id: "1",
      name: "Emma Thompson",
      role: "Lead Massage Therapist",
      specialty: "Deep Tissue & Sports Massage",
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300",
      bio: "Certified in multiple massage modalities",
      rating: 4.9,
    },
    {
      _id: "2",
      name: "Sophia Martinez",
      role: "Esthetician",
      specialty: "Organic Facials",
      experience: "8+ years",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
      bio: "Specializes in natural skincare",
      rating: 4.8,
    }
  ];

  const stats = [
    { value: "15+", label: "Years of Peace", icon: FaLeaf },
    { value: "10k+", label: "Happy Souls", icon: FaHeart },
    { value: "30+", label: "Treatments", icon: FaSpa },
    { value: "7 Days", label: "Open Weekly", icon: FaClock },
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
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-cream-100/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blush-300 rounded-full flex items-center justify-center">
                <FaFeather className="text-cream-50 text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-light text-brown-800">
                  {businessInfo.shortName}
                </h1>
                <p className="text-xs text-blush-400 font-light">Wellness Spa</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-brown-600 hover:text-blush-400 transition-colors">Home</a>
              <a href="#about" className="text-brown-600 hover:text-blush-400 transition-colors">About</a>
              <a href="#services" className="text-brown-600 hover:text-blush-400 transition-colors">Treatments</a>
              <a href="#team" className="text-brown-600 hover:text-blush-400 transition-colors">Therapists</a>
              <a href="#contact" className="text-brown-600 hover:text-blush-400 transition-colors">Contact</a>
            </div>

            <button
              onClick={openBookingModal}
              className="bg-blush-300 text-cream-50 px-6 py-3 rounded-full font-light hover:bg-blush-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
            >
              <FaCalendarCheck />
              <span className="hidden sm:inline">Find Peace</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Soft & Organic */}
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
                <FaLeaf className="text-blush-400 text-sm" />
                <span className="text-sm font-light text-brown-600">Your sanctuary awaits</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-light text-brown-800 mb-6 leading-tight">
                Find Your
                <span className="font-normal text-blush-400 block">
                  Inner Peace
                </span>
              </h1>
              
              <p className="text-lg text-brown-600 mb-8 leading-relaxed font-light">
                {businessInfo.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={openBookingModal}
                  className="bg-blush-300 text-cream-50 px-8 py-4 rounded-full font-light hover:bg-blush-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                >
                  Begin Your Journey
                  <FaArrowRight />
                </button>
                <a
                  href="#services"
                  className="border border-brown-200 text-brown-600 px-8 py-4 rounded-full font-light hover:bg-cream-100 transition-all"
                >
                  Explore Treatments
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon className="text-blush-400 text-xl" />
                      </div>
                      <div className="text-2xl font-light text-brown-800">{stat.value}</div>
                      <div className="text-sm text-brown-500 font-light">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-full overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbe518?w=800"
                  alt="Serene Spa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blush-200/30 to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-6 -left-6 bg-cream-50 rounded-2xl shadow-xl p-4 backdrop-blur-sm bg-opacity-80">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blush-100 rounded-full flex items-center justify-center">
                    <FaHeart className="text-blush-400 text-xl" />
                  </div>
                  <div>
                    <p className="font-light text-brown-800">10k+</p>
                    <p className="text-sm text-brown-500 font-light">Peaceful souls</p>
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
                    <p className="text-sm text-brown-500 font-light">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Soft Cards */}
      <section id="services" className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-brown-800 mb-4">
              Healing <span className="font-normal text-blush-400">Treatments</span>
            </h2>
            <p className="text-brown-600 font-light max-w-2xl mx-auto">
              Choose from our selection of therapeutic treatments designed to restore balance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="group bg-cream-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                onClick={openBookingModal}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-800/40 to-transparent"></div>
                  
                  {/* Category */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-cream-50/90 backdrop-blur-sm text-brown-600 px-4 py-2 rounded-full text-sm font-light">
                      {service.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-light text-brown-800">{service.name}</h3>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-blush-400" size={14} />
                      <span className="text-sm text-brown-600">{service.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-brown-500 text-sm font-light mb-4">{service.shortDescription}</p>
                  
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-brown-600">
                        <FaFeather className="text-blush-300 flex-shrink-0" size={12} />
                        <span className="font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-cream-200">
                    <div>
                      <span className="text-2xl font-light text-brown-800">
                        {formatCurrency(service.price)}
                      </span>
                      <p className="text-xs text-brown-400 font-light">Starting at</p>
                    </div>
                    <span className="text-sm text-brown-500 bg-cream-200 px-3 py-1 rounded-full font-light">
                      {service.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Organic */}
      <section id="about" className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600"
                  alt="Spa Interior"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Natural elements */}
              <div className="absolute -bottom-4 -right-4 bg-cream-50 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <FaLeaf className="text-blush-400 text-2xl" />
                  <div>
                    <p className="text-sm font-light text-brown-600">100% Natural</p>
                    <p className="text-xs text-brown-400">Organic products</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-light text-brown-800 mb-6">
                A Sanctuary for
                <span className="font-normal text-blush-400 block">
                  Body & Soul
                </span>
              </h2>
              <p className="text-brown-600 text-lg leading-relaxed mb-6 font-light">
                {businessInfo.longDescription}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cream-100 rounded-xl p-4">
                  <FaHandHoldingHeart className="text-blush-400 text-2xl mb-2" />
                  <h4 className="font-light text-brown-800 mb-1">Holistic Approach</h4>
                  <p className="text-xs text-brown-500">Mind-body wellness</p>
                </div>
                <div className="bg-cream-100 rounded-xl p-4">
                  <FaLeaf className="text-blush-400 text-2xl mb-2" />
                  <h4 className="font-light text-brown-800 mb-1">Organic Products</h4>
                  <p className="text-xs text-brown-500">Naturally sourced</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Soft */}
      <section id="contact" className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-light text-brown-800 mb-4">
              Begin Your <span className="font-normal text-blush-400">Wellness Journey</span>
            </h2>
            <p className="text-brown-600 font-light">
              Reach out to us and take the first step toward inner peace
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="bg-cream-50 rounded-3xl p-8 shadow-xl">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-cream-50 border border-cream-200 rounded-full focus:ring-2 focus:ring-blush-300 focus:border-transparent font-light"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-cream-50 border border-cream-200 rounded-full focus:ring-2 focus:ring-blush-300 focus:border-transparent font-light"
                />
                <textarea
                  placeholder="How can we help you find peace?"
                  rows={4}
                  className="w-full px-4 py-3 bg-cream-50 border border-cream-200 rounded-2xl focus:ring-2 focus:ring-blush-300 focus:border-transparent font-light"
                />
                <button
                  type="submit"
                  className="w-full bg-blush-300 text-cream-50 py-4 rounded-full font-light hover:bg-blush-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-cream-200">
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <FaPhone className="text-blush-400 text-xl mx-auto mb-2" />
                    <p className="text-sm text-brown-600 font-light">{businessInfo.contact.phone}</p>
                  </div>
                  <div className="text-center">
                    <FaEnvelope className="text-blush-400 text-xl mx-auto mb-2" />
                    <p className="text-sm text-brown-600 font-light">{businessInfo.contact.email}</p>
                  </div>
                </div>
              </div>
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
                <FaFeather className="text-blush-300 text-2xl" />
                <span className="text-xl font-light">{businessInfo.shortName}</span>
              </div>
              <p className="text-cream-200 text-sm font-light leading-relaxed">
                {businessInfo.description}
              </p>
            </div>

            <div>
              <h4 className="font-light mb-4">Explore</h4>
              <ul className="space-y-2 text-cream-200 font-light">
                <li><a href="#home" className="hover:text-cream-50 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-cream-50 transition-colors">Our Philosophy</a></li>
                <li><a href="#services" className="hover:text-cream-50 transition-colors">Treatments</a></li>
                <li><a href="#team" className="hover:text-cream-50 transition-colors">Therapists</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-light mb-4">Treatments</h4>
              <ul className="space-y-2 text-cream-200 font-light">
                {services.map((service) => (
                  <li key={service._id}>
                    <a href="#services" className="hover:text-cream-50 transition-colors">
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-light mb-4">Connect</h4>
              <div className="flex gap-4 mb-6">
                <a href="#" className="w-10 h-10 bg-brown-700 rounded-full flex items-center justify-center hover:bg-blush-400 transition-colors">
                  <FaInstagram />
                </a>
                <a href="#" className="w-10 h-10 bg-brown-700 rounded-full flex items-center justify-center hover:bg-blush-400 transition-colors">
                  <FaFacebook />
                </a>
              </div>
              
              <div className="pt-6 border-t border-brown-700">
                <div className="flex items-center gap-2 text-cream-300">
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

      <style jsx>{`
        .bg-cream-50 { background-color: #fefaf5; }
        .bg-cream-100 { background-color: #fdf5e6; }
        .bg-cream-200 { background-color: #f9ebd2; }
        .text-cream-50 { color: #fefaf5; }
        .text-cream-200 { color: #f9ebd2; }
        .text-cream-300 { color: #f5dbb1; }
        .border-cream-200 { border-color: #f9ebd2; }
        
        .bg-blush-100 { background-color: #ffe4e1; }
        .bg-blush-300 { background-color: #f9c5c0; }
        .bg-blush-400 { background-color: #f5b0a8; }
        .text-blush-300 { color: #f9c5c0; }
        .text-blush-400 { color: #f5b0a8; }
        
        .bg-brown-100 { background-color: #e6d5c0; }
        .bg-brown-700 { background-color: #8b6b4d; }
        .bg-brown-800 { background-color: #6b4f3a; }
        .text-brown-800 { color: #6b4f3a; }
        .text-brown-600 { color: #8b6b4d; }
        .text-brown-500 { color: #a58c74; }
        .text-brown-400 { color: #c0a78b; }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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
      `}</style>
    </div>
  );
};

export default PaidTemplateOne;