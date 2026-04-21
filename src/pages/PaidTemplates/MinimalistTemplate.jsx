import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Logo from "../../pages/LandingPages/images/dimp-blue.png";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiMenu,
  HiX,
} from "react-icons/hi";
import PaidBookingModal from "./BookingModal/PaidBookingModal";
import axios from "axios";

// Fallback demo data (used when no subdomain/userDetails provided, e.g. preview mode)
const demoBusinessName = "Maverique";
const demoBusinessContact = {
  phone: "2348109174125",
  email: "message.abdulazeez@gmail.com",
  address: "4, Rajab Quarters, Islamic Village, Gerewu",
};
const demoBusinessDescription =
  "We offer different fitness packages tailored towards your body and your desired shape. Our facilities are well equiped to allow you to get the best results in the least amount of time.";
const demoServices = [
  {
    _id: "1",
    name: "Full Cardio",
    shortDescription: "Professional full cardio service",
    price: 4000,
    duration: "120 mins",
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e",
  },
  {
    _id: "2",
    name: "Abs Only",
    shortDescription: "Focused abdominal workout",
    price: 2000,
    duration: "30 mins",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
  },
  {
    _id: "3",
    name: "Strength Training",
    shortDescription: "Build strength and endurance",
    price: 5000,
    duration: "90 mins",
  },
  {
    _id: "4",
    name: "Personal Training",
    shortDescription: "1-on-1 professional training",
    price: 6500,
    duration: "120 mins",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
  },
  {
    _id: "5",
    name: "Yoga Session",
    shortDescription: "Relaxing yoga training",
    price: 3500,
    duration: "60 mins",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3",
  },
  {
    _id: "6",
    name: "HIIT Workout",
    shortDescription: "High intensity interval training",
    price: 4500,
    duration: "45 mins",
  },
];

const getServiceInitials = (serviceName) => {
  const words = serviceName.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
};

const MinimalistTemplate = ({ subdomain, userDetails }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState(demoServices);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  // Derive business info: prefer API response data, then userDetails prop, then demo fallback
  const businessName =
    apiData?.businessHoursRecords?.[0]?.ecosystemName ||
    userDetails?.ecosystemName ||
    demoBusinessName;
  const businessLogo = userDetails?.ecosystemLogo || "";
  const businessDescription =
    apiData?.description ||
    userDetails?.ecosystemDescription ||
    demoBusinessDescription;
  const businessContact = {
    phone: apiData?.phoneNumber || userDetails?.phoneNumber || demoBusinessContact.phone,
    email: apiData?.email || userDetails?.email || demoBusinessContact.email,
    address:
      apiData?.localGovernment ||
      userDetails?.address ||
      demoBusinessContact.address,
  };
  const serviceCurrency = apiData?.currency || "NGN";

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
        serviceCurrency={serviceCurrency}
        subdomain={subdomain || "demo"}
        businessInfo={{
          name: businessName,
          description: businessDescription,
          contact: businessContact,
        }}
        initialSelectedService={selectedService}
      />

      {/* HEADER */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="mx-auto px-6 md:px-32 lg:px-48 py-4 flex justify-between items-center">
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
            <div className="hidden md:block">
              <h2 className="font-semibold text-lg">{businessName}</h2>
              <p className="text-sm text-gray-500">
                Book your appointment online
              </p>
            </div>
          </div>

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

          <div className="flex items-center gap-3">
            <button
              onClick={() => openBookingModal()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
            >
              Book Now
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-2xl text-gray-600 hover:text-purple-600"
            >
              {isMobileMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

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

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service) => (
                <button
                  key={service._id}
                  onClick={() => openBookingModal(service)}
                  className="group cursor-pointer bg-white border rounded-xl hover:border-purple-600 p-4 flex gap-4 items-center hover:-translate-y-1 transition"
                >
                  <div className="overflow-hidden rounded-lg">
                    {service.image || service.serviceImage ? (
                      <img
                        src={service.image || service.serviceImage}
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

                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-800 group-hover:text-purple-600">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {service.shortDescription}
                    </p>
                    <div className="flex justify-between mt-2">
                      <span className="text-purple-600 font-semibold">
                        {"\u20A6"}
                        {Number(service.price).toLocaleString()}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {service.duration || `${service.deliveryTime} mins`}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

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
          <div>
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

MinimalistTemplate.propTypes = {
  subdomain: PropTypes.string,
  userDetails: PropTypes.object,
};

export default MinimalistTemplate;
