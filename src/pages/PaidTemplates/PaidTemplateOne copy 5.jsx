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
  FaGem,
  FaCrown,
 
  FaGlassMartini
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LatestBookingModal from "../../features/Booking/LatestBookingModal";
import DimpifiedLogo from "../../pages/LandingPages/images/dimp-blue.png";

const PaidTemplateOne = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const businessInfo = {
    name: "Royal Luxury Concierge",
    shortName: "Royal Luxe",
    description:
      "Exclusive premium services for discerning clientele. Experience unparalleled luxury and personalized attention.",
    longDescription:
      "Royal Luxury Concierge redefines the art of exceptional service. We cater to individuals who demand the finest things in life. From private jet charters to exclusive event access, our dedicated team ensures every detail is perfection. Experience a world where your wishes are our commands.",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "concierge@royalluxe.com",
      address: "1 Penthouse Avenue, Manhattan, NY 10022",
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
      name: "Private Aviation",
      shortDescription: "Luxury private jet charter",
      category: "Travel",
      price: 15000,
      duration: "Custom",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400",
      rating: 5.0,
      features: ["Global Access", "VIP Terminal", "Personal Attendant"]
    },
    {
      _id: "2",
      name: "Yacht Charter",
      shortDescription: "Exclusive yacht experiences",
      category: "Marine",
      price: 25000,
      duration: "Day",
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400",
      rating: 4.9,
      features: ["Crew Included", "Gourmet Dining", "Water Toys"]
    },
    {
      _id: "3",
      name: "VIP Event Access",
      shortDescription: "Exclusive event experiences",
      category: "Events",
      price: 5000,
      duration: "Event",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
      rating: 4.8,
      features: ["Front Row", "Meet & Greet", "Champagne Service"]
    }
  ];

  const teamMembers = [
    {
      _id: "1",
      name: "James Sterling",
      role: "Head Concierge",
      specialty: "Luxury Travel",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=300",
      bio: "Former 5-star hotel manager",
      rating: 5.0,
    },
    {
      _id: "2",
      name: "Victoria Windsor",
      role: "Lifestyle Manager",
      specialty: "Event Planning",
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300",
      bio: "Platinum event planner",
      rating: 4.9,
    }
  ];

  const stats = [
    { value: "25+", label: "Years of Excellence", icon: FaCrown },
    { value: "1000+", label: "VIP Clients", icon: FaGem },
    { value: "150+", label: "Luxury Partners", icon: FaGem },
    { value: "24/7", label: "Dedicated Support", icon: FaClock },
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        scrolled ? 'bg-black/95 backdrop-blur-md border-b border-gold-500/20 py-2' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-sm flex items-center justify-center">
                <FaCrown className="text-black text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-gold-400">
                  {businessInfo.shortName}
                </h1>
                <p className="text-xs text-gold-600/80 font-light tracking-widest">EST. 2010</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gold-300 hover:text-gold-400 transition-colors uppercase text-sm tracking-wider">Home</a>
              <a href="#about" className="text-gold-300 hover:text-gold-400 transition-colors uppercase text-sm tracking-wider">About</a>
              <a href="#services" className="text-gold-300 hover:text-gold-400 transition-colors uppercase text-sm tracking-wider">Services</a>
              <a href="#team" className="text-gold-300 hover:text-gold-400 transition-colors uppercase text-sm tracking-wider">Concierges</a>
              <a href="#contact" className="text-gold-300 hover:text-gold-400 transition-colors uppercase text-sm tracking-wider">Contact</a>
            </div>

            <button
              onClick={openBookingModal}
              className="bg-gradient-to-r from-gold-400 to-gold-600 text-black px-8 py-3 font-semibold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 shadow-lg shadow-gold-500/20 flex items-center gap-2 uppercase tracking-wider text-sm"
            >
              <FaGem />
              <span className="hidden sm:inline">Request Service</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Opulent */}
      <section id="home" className="relative min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1600"
            alt="Luxury Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-gold-500/30 px-4 py-2 mb-6">
              <FaGem className="text-gold-400 text-sm" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold-400">Since 2010</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-serif font-bold text-gold-400 mb-6 leading-none">
              Live
              <span className="text-white block">
                Exclusively
              </span>
            </h1>
            
            <p className="text-xl text-gold-300/80 mb-8 leading-relaxed max-w-xl font-light">
              {businessInfo.description}
            </p>

            <div className="flex flex-wrap gap-6 mb-12">
              <button
                onClick={openBookingModal}
                className="bg-gradient-to-r from-gold-400 to-gold-600 text-black px-10 py-4 font-semibold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 shadow-2xl shadow-gold-500/20 flex items-center gap-2 uppercase tracking-wider group"
              >
                Begin Your Journey
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#services"
                className="border border-gold-500/50 text-gold-400 px-10 py-4 font-semibold hover:bg-gold-500/10 transition-all uppercase tracking-wider"
              >
                Our Offerings
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index}>
                    <Icon className="text-gold-400 text-3xl mb-3" />
                    <div className="text-3xl font-serif font-bold text-white">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wider text-gold-500/70">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-[2px] h-16 bg-gradient-to-b from-gold-400 to-transparent"></div>
        </div>
      </section>

      {/* Services Section - Luxury Cards */}
      <section id="services" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gold-400 mb-4">
              Exquisite Services
            </h2>
            <p className="text-gold-500/70 max-w-2xl mx-auto uppercase tracking-wider text-sm">
              Curated exclusively for our distinguished clientele
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="group relative bg-gradient-to-b from-gold-900/20 to-black border border-gold-500/20 hover:border-gold-500/50 transition-all duration-500 cursor-pointer overflow-hidden"
                onClick={openBookingModal}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                </div>
                
                <div className="relative p-8 h-full flex flex-col">
                  {/* Category */}
                  <div className="mb-4">
                    <span className="text-gold-400 text-xs uppercase tracking-[0.2em] border-b border-gold-500/30 pb-1">
                      {service.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-gold-300/70 text-sm mb-6 font-light">{service.shortDescription}</p>
                  
                  <div className="space-y-2 mb-6 flex-grow">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gold-300">
                        <FaGem className="text-gold-400 flex-shrink-0" size={10} />
                        <span className="font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gold-500/20">
                    <div>
                      <span className="text-3xl font-serif font-bold text-gold-400">
                        {formatCurrency(service.price)}
                      </span>
                      <p className="text-xs text-gold-600 uppercase tracking-wider">Starting at</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-gold-400" size={14} />
                      <span className="text-sm text-gold-300">{service.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Opulent */}
      <section id="about" className="py-32 bg-gradient-to-b from-black to-gold-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gold-400 mb-6">
                The Art of
                <span className="text-white block">
                  Exclusive Living
                </span>
              </h2>
              <p className="text-gold-300/80 text-lg leading-relaxed mb-8 font-light">
                {businessInfo.longDescription}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gold-500/20 p-6">
                  <FaCrown className="text-gold-400 text-3xl mb-3" />
                  <h4 className="font-serif text-white mb-1">White Glove</h4>
                  <p className="text-xs text-gold-500/70 uppercase tracking-wider">Personal Service</p>
                </div>
                <div className="border border-gold-500/20 p-6">
                  <FaGem className="text-gold-400 text-3xl mb-3" />
                  <h4 className="font-serif text-white mb-1">Global Access</h4>
                  <p className="text-xs text-gold-500/70 uppercase tracking-wider">Worldwide</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 border border-gold-500/30 p-4">
                <img
                  src="https://images.unsplash.com/photo-1576013551727-3cf5b4c265b9?w=600"
                  alt="Luxury Lifestyle"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border border-gold-500/20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-gold-500/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Luxurious */}
      <section id="contact" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gold-400 mb-4">
                Inquire for Exclusivity
              </h2>
              <p className="text-gold-500/70 uppercase tracking-wider text-sm">
                Our concierges await your request
              </p>
            </div>

            <div className="border border-gold-500/30 p-12">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-4 bg-transparent border border-gold-500/30 text-gold-300 placeholder-gold-700 focus:border-gold-400 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-4 bg-transparent border border-gold-500/30 text-gold-300 placeholder-gold-700 focus:border-gold-400 outline-none"
                  />
                </div>
                <textarea
                  placeholder="Your Request"
                  rows={5}
                  className="w-full px-4 py-4 bg-transparent border border-gold-500/30 text-gold-300 placeholder-gold-700 focus:border-gold-400 outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-black py-5 font-semibold hover:from-gold-500 hover:to-gold-700 transition-all duration-300 uppercase tracking-wider text-sm"
                >
                  Send Inquiry
                </button>
              </form>

              <div className="mt-12 pt-12 border-t border-gold-500/20">
                <div className="flex justify-center gap-12">
                  <div className="text-center">
                    <FaPhone className="text-gold-400 text-2xl mx-auto mb-3" />
                    <p className="text-sm text-gold-300">{businessInfo.contact.phone}</p>
                    <p className="text-xs text-gold-600 uppercase tracking-wider mt-1">24/7 Line</p>
                  </div>
                  <div className="text-center">
                    <FaEnvelope className="text-gold-400 text-2xl mx-auto mb-3" />
                    <p className="text-sm text-gold-300">{businessInfo.contact.email}</p>
                    <p className="text-xs text-gold-600 uppercase tracking-wider mt-1">Priority Response</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gold-950 text-gold-300 py-16 border-t border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaCrown className="text-gold-400 text-2xl" />
                <span className="text-xl font-serif font-bold text-gold-400">{businessInfo.shortName}</span>
              </div>
              <p className="text-gold-500/70 text-sm font-light leading-relaxed">
                {businessInfo.description}
              </p>
            </div>

            <div>
              <h4 className="font-serif text-gold-400 mb-4 uppercase tracking-wider text-sm">Navigation</h4>
              <ul className="space-y-2 text-gold-500/70 font-light">
                <li><a href="#home" className="hover:text-gold-400 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-gold-400 transition-colors">The Legacy</a></li>
                <li><a href="#services" className="hover:text-gold-400 transition-colors">Services</a></li>
                <li><a href="#team" className="hover:text-gold-400 transition-colors">The Concierges</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-gold-400 mb-4 uppercase tracking-wider text-sm">Offerings</h4>
              <ul className="space-y-2 text-gold-500/70 font-light">
                {services.map((service) => (
                  <li key={service._id}>
                    <a href="#services" className="hover:text-gold-400 transition-colors">
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-gold-400 mb-4 uppercase tracking-wider text-sm">Connect</h4>
              <div className="flex gap-4 mb-6">
                <a href="#" className="w-10 h-10 border border-gold-500/30 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors">
                  <FaInstagram />
                </a>
                <a href="#" className="w-10 h-10 border border-gold-500/30 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors">
                  <FaLinkedin />
                </a>
                <a href="#" className="w-10 h-10 border border-gold-500/30 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors">
                  <FaTwitter />
                </a>
              </div>
              
              <div className="pt-6 border-t border-gold-500/20">
                <div className="flex items-center gap-2 text-gold-600">
                  <span className="text-xs uppercase tracking-wider">Powered by</span>
                  <Link to="/" className="hover:opacity-80 transition-opacity">
                    <img src={DimpifiedLogo} alt="Dimpified" className="h-5 w-auto brightness-0 invert opacity-50" />
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
        .bg-gold-950 { background-color: #1a150e; }
        .bg-gold-900 { background-color: #2a2319; }
        .text-gold-300 { color: #e5c9a0; }
        .text-gold-400 { color: #d4af37; }
        .text-gold-500 { color: #c5a028; }
        .text-gold-600 { color: #b69020; }
        .text-gold-700 { color: #a68018; }
        .border-gold-500 { border-color: #c5a028; }
        .border-gold-500\/20 { border-color: rgba(197, 160, 40, 0.2); }
        .border-gold-500\/30 { border-color: rgba(197, 160, 40, 0.3); }
        .border-gold-500\/50 { border-color: rgba(197, 160, 40, 0.5); }
        .hover\:border-gold-400:hover { border-color: #d4af37; }
        .hover\:border-gold-500\/50:hover { border-color: rgba(197, 160, 40, 0.5); }
        .bg-gradient-to-br.from-gold-400.to-gold-600 {
          background-image: linear-gradient(to bottom right, #d4af37, #b69020);
        }
        .from-gold-400.to-gold-600 {
          background-image: linear-gradient(to right, #d4af37, #b69020);
        }
        .from-gold-500.to-gold-700 {
          background-image: linear-gradient(to right, #c5a028, #a68018);
        }
        .shadow-gold-500\/20 {
          box-shadow: 0 25px 50px -12px rgba(197, 160, 40, 0.25);
        }
      `}</style>
    </div>
  );
};

export default PaidTemplateOne;