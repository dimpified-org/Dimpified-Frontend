import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Logo from "../../../../src/assets/DIMP logo colored.png";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import { Helmet } from "react-helmet";
import { getFormattedPrice } from "../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../features/Booking/FreeBookingModal";
import { useCountry } from "../../pricing/CountryContext";

const Header = ({ userDetails }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const businessName = userDetails?.ecosystemName || "Your Business";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getFirstLetter = () => {
    if (!businessName || businessName.trim().length === 0) {
      return "D"; // Default fallback
    }
    return businessName.trim().charAt(0).toUpperCase();
  };

  return (
    <>
      <header className="bg-transparent py-4 px-2">
        <div className="flex flex-col lg:px-16 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {/* Dynamic Logo with first letter of business name in circle */}
              <div className="flex items-center justify-center w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r from-[#4f2683] via-[#9966cc] to-[#ff8201] shadow-lg">
                <span className="text-white font-bold text-lg lg:text-xl">
                  {getFirstLetter()}
                </span>
              </div>
              <span className="lg:text-2xl text-lg bg-gradient-to-r from-[#4f2683] via-[#9966cc] to-[#ff8201] text-transparent bg-clip-text font-semibold">
                {businessName}
              </span>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-primary3 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-primary3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Menu Slide-in */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4 border-b">
          <button
            onClick={closeMenu}
            className="text-gray-600 hover:text-primary3 transition-colors"
            aria-label="Close menu"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="p-6">
          <nav className="space-y-6">
            <a
              href="https://dimpified.com/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="block text-primary3 hover:text-purple-800 font-medium text-lg transition-colors"
            >
              Upgrade this template
            </a>
            <a
              href="https://dimpified.com/auth/personal-information"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="block text-primary3 hover:text-purple-800 font-medium text-lg transition-colors"
            >
              Create your own booking website
            </a>
          </nav>

          {/* Additional Info */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">Powered by Dimpified</p>
          </div>
        </div>
      </div>
    </>
  );
};

const BookQuickServicesNew = ({ userDetails, serviceData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { country } = useCountry();
  const countryCode = country || "NG";

  // Update year automatically
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <Helmet>
        <title>Book our Services - {userDetails?.ecosystemName || "Dimpified"}</title>
        <meta name="description" content="Book Instant Services" />
        <meta property="og:title" content={`Book Instant Services - ${userDetails?.ecosystemName || "Dimpified"}`} />
        <meta property="og:description" content="Book Instant Services" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header userDetails={userDetails} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Left Section - Services (2/3 on desktop) */}
          <div className="lg:w-2/3 w-full p-4 lg:p-4">
            <div className="flex flex-col lg:px-16 px-4">
              {/* Services Header */}
              <div className="text-start mt-4 mb-8">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800">
                  Make A Reservation
                </h2>
                <p className="text-gray-500 text-sm lg:text-base mt-2">
                  Kindly select and book any service of your choice
                </p>
              </div>

              {/* Booking Modal */}
              {isModalOpen && (
                <BookingModal
                  isOpen={isModalOpen}
                  handleClose={handleModalClose}
                />
              )}

              {/* Services Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {serviceData && serviceData.length > 0 ? (
                  serviceData.map((service, index) => (
                    <div
                      key={index}
                      onClick={handleModalOpen}
                      className="relative flex border-2 rounded-lg cursor-pointer transition-all duration-300 border-gray-300 hover:border-purple-500 hover:shadow-lg bg-white"
                    >
                      {/* <img
                        src={service.serviceImage}
                        alt={service.name}
                        className="h-auto w-24 lg:h-auto lg:w-28 object-cover rounded-l-lg flex-shrink-0"
                      /> */}
                      <div className="flex-1 p-3 lg:p-4">
                        <h4 className="text-sm lg:text-md font-semibold text-gray-800 mb-1">
                          {service.name}
                        </h4>
                        <div className="flex items-center gap-1 text-gray-500 text-xs lg:text-sm">
                          <span>{service.shortDescription}</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end p-3 lg:p-4">
                        <span className="text-sm lg:text-md font-bold text-primary3">
                          {getFormattedPrice(service.price, countryCode)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm lg:text-base">
                    No services available.
                  </p>
                )}
              </div>

              {/* Additional Links */}
              <div className="flex flex-col items-center mt-8 lg:mt-12">
                {/* Centered Logo - Smaller */}
                <div className="mb-4 flex justify-center">
                  <Link to="/" className="flex items-center">
                    <img
                      src={Logo}
                      alt="Dimpified Logo"
                      className="h-6 lg:h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </div>

                {/* Links */}
                <div className="flex flex-row gap-2 mb-4 justify-center">
                  <a
                    href="https://dimpified.com/auth/login"
                    className="inline-block px-4 py-2 text-primary3 hover:text-purple-800 text-sm lg:text-base transition-colors"
                  >
                    Upgrade this template
                  </a>
                  <a
                    href="https://dimpified.com/auth/personal-information"
                    className="inline-block px-4 py-2 text-primary3 hover:text-purple-800 text-sm lg:text-base transition-colors"
                  >
                    Own a booking Website
                  </a>
                </div>
                <div className="container mx-auto text-center">
                  <p className="text-sm">
                    &copy; {currentYear} Dimpified. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Slider (1/3 on desktop) */}
          <div className="lg:w-1/3 w-full lg:block hidden relative">
            <img
              src="https://i.imghippo.com/files/ecl3499BP.png"
              alt="side booking"
              className="w-full h-full object-cover transition duration-1000 ease-in-out"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookQuickServicesNew;