import { useState, useEffect } from "react";
import { FaBars, FaArrowRight, FaCheckCircle, FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { gym } from "../../../../data/Services";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { BlackContactForm } from "../../../../features/ContactForm/ContactForm";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

const ThirdGym = ({ details, subdomain, userDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [eServices, setEServices] = useState([]);
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    const getServiceeDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`
        );
        const allServices = response.data.flatMap((item) => item.services);
        const userCurrency = response.data.flatMap((item) => item.currency);
          setCurrency(userCurrency);
        setEServices(allServices);
      } catch (error) {
        console.log("not working", error);
      } finally {
        console.log("finish loading");
      }
    };
    getServiceeDetails();
  }, []);

  const sanitizeContent = (html) => {
    return sanitizeHtml(html, {
      allowedTags: [],
      allowedAttributes: {},
    });
  };

  const testimonials = [
    {
      name: details && details.Reviews.header1,
      role: details && details.Reviews.title1,
      image: details && details.Reviews.image1,
      text: details && details.Reviews.summary1,
    },
    {
      name: details && details.Reviews.header2,
      role: details && details.Reviews.title2,
      image: details && details.Reviews.image2,
      text: details && details.Reviews.summary2,
    },
  ];
  const teams = [
    {
      name: details && details.Team.header1,
      role: details && details.Team.summary1,
      image: details && details.Team.image1,
    },
    {
      name: details && details.Team.header2,
      role: details && details.Team.summary2,
      image: details && details.Team.image2,
    },
    {
      name: details && details.Team.header3,
      role: details && details.Team.summary3,
      image: details && details.Team.image3,
    },
    {
      name: details && details.Team.header4,
      role: details && details.Team.summary4,
      image: details && details.Team.image4,
    },
  ];

  const instaImages = [
    details && details.Gallery.image1,
    details && details.Gallery.image2,
    details && details.Gallery.image3,
    details && details.Gallery.image4,
    details && details.Gallery.image5,
  ];

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the mobile menu when a link is clicked
  };

  return (
    <div className="bg-gray-100">
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="flex flex-wrap md:px-32 px-5 py-5  justify-between items-center">
          <div className="text-2xl font-bold text-black">
            <span className="text-black">
              {userDetails?.ecosystemName?.slice(
                0,
                Math.floor(userDetails.ecosystemName.length / 2)
              )}
            </span>
            <span className="text-[#C7D300]">
              {userDetails?.ecosystemName?.slice(
                Math.floor(userDetails.ecosystemName.length / 2)
              )}
            </span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex text-xl space-x-6 text-black">
            {["Home", "About", "Plans", "Trainers", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-lime-500"
              >
                {item}
              </a>
            ))}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <FaTimes className="text-2xl text-black" />
              ) : (
                <FaBars className="text-2xl text-black" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md flex flex-col items-center space-y-4 py-4">
            {["Home", "About", "Plans", "Trainers", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-lime-500"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>
      <section
        id="home"
        className="relative w-full md:h-screen h-[90vh] bg-cover bg-center flex items-center justify-cente"
        style={{
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Text Content */}
        <div className="relative flex flex-col lg:px-32 px-6 text-left text-white max-w-3xl">
          <p className="text-white uppercase tracking-wider text-xl">
            {sanitizeContent(details && details.hero.title1)}{" "}
            {userDetails?.ecosystemName}
          </p>
          <h1 className="text-4xl md:text-7xl font-bold leading-snug">
            <span>
              {details?.hero?.title2?.slice(
                0,
                Math.floor(details?.hero?.title2?.length / 2)
              )}
            </span>
            <br />
            <span className="text-[#C7D300]">
              {details?.hero?.title2?.slice(
                Math.floor(details?.hero?.title2?.length / 2)
              )}
            </span>
          </h1>
          <p className="mt-4 text-lg">
            {sanitizeContent(details && details.hero.summary1)}
          </p>

          {/* Call-To-Action Button */}
          <button
            onClick={handleModalOpen}
            className="mt-6 bg-[#C7D300] w-60 text-black font-bold py-3 px-8 rounded-none hover:bg-black hover:text-lime-500"
          >
            {sanitizeContent(details && details.hero.buttonText1)}
          </button>
        </div>
        {isModalOpen && (
          <BookingModal
            isOpen={isModalOpen}
            handleClose={handleModalClose}
            information={eServices}
            subdomain={subdomain}
            serviceCurrency={currency}
          />
        )}
      </section>
      <section id="about" className="py-16 bg-white">
        <div className="flex flex-col h-full  py-4 px-6 lg:px-32 md:px-12 md:flex-row items-center gap-10">
          {/* Text Content */}
          <div className="md:w-1/2">
            <h5 className="text-lg font-bold uppercase tracking-wide mb-2">
            {sanitizeContent(details && details.aboutUs.title1)}
            </h5>
            <h2 className="text-5xl font-bold leading-tight mb-4 uppercase">
            {sanitizeContent(details && details.aboutUs.title2)}
            </h2>
            <p className="text-gray-600 mb-6">
            {sanitizeContent(details && details.aboutUs.text1)}
            </p>
            <ul className="space-y-3">
              {[
                details && details.aboutUs.text2,
                details && details.aboutUs.buttonText1,
                details && details.aboutUs.buttonText2,
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="text-[#C7D300]" size={20} />
                  <p className="text-gray-700">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 relative">
            <div className="relative z-10">
              <img
                src={details && details.aboutUs.image1}
                alt="Gym Training"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="absolute top-5 left-5 w-full h-full border-4 border-[#C7D300] -z-10"></div>
          </div>
        </div>
      </section>
      <section id="plans" className="py-16 bg-white">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-6xl font-bold uppercase">
              Our <span className="text-[#C7D300]">Membership Plans</span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eServices.map((service, index) => (
                <div
                  key={index}
                  className="relative bg-gray-100 py-8 px-12 rounded-lg overflow-hidden "
                >
                  <span className="text-sm font-semibold uppercase bg-white shadow-md rounded-full px-4 py-1 mb-4 inline-block">
                    {service.name}
                  </span>
                  <h2 className="text-4xl py-3 font-Raj font-bold text-gray-800">
                    
                    {getCurrencySymbol(currency)}{service.price}
                  </h2>
                  {/* <span className="block text-sm font-semibold uppercase text-gray-700 mb-4">
                {services.}
              </span> */}
                  <div className="space-y-2 mb-6">
                    <p className="flex items-center mb-2 pe-6 text-gray-700">
                      {service.shortDescription}
                    </p>
                  </div>

                  <button
                    onClick={handleModalOpen}
                    className="inline-block bg-[#C7D300] text-white py-2 px-6 rounded-sm hover:bg-gray-700 transition"
                  >
                    Choose plan
                  </button>
                  <div
                    className="absolute top-0 right-0 h-full w-16 bg-cover bg-center"
                    /* style={{ backgroundImage: `url(${service.serviceImage})` }} */
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        id="testimonials"
        className="relative bg-cover bg-center text-white py-16 px-6 md:px-12"
        style={{
          backgroundImage: `url(${details && details.LargeCta.image1})`,
        }}
      >
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Free Trial Training Section */}
          <div className="text-left">
            <h3 className="text-4xl font-extrabold"> {sanitizeContent(details && details.LargeCta.header1)}</h3>
            <p className="mt-4 text-gray-300 leading-relaxed">
            {sanitizeContent(details && details.LargeCta.summary1)}
            </p>
            <a
              onClick={handleModalOpen}
              className="mt-6 inline-block bg-[#C7D300] text-black font-semibold py-3 px-6 rounded-lg hover:bg-lime-600 transition-all"
            >
              {sanitizeContent(details && details.LargeCta.buttonText1)}
            </a>
          </div>

          {/* Testimonials Section */}
          <div className="bg-white text-black p-8 rounded-lg shadow-lg relative">
            <h4 className="text-2xl font-bold text-center">
              What <span className="text-[#C7D300]">Clients</span> Say
            </h4>
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 1 },
              }}
              className="mt-6"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="p-6 text-center">
                    <p className="italic text-gray-700 text-lg leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex justify-center items-center mt-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-gray-300"
                      />
                      <div className="ml-4 text-left">
                        <h6 className="font-bold text-lg">
                          {testimonial.name}
                        </h6>
                        <span className="text-gray-500 text-sm">
                          {testimonial.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <section
        id="trainers"
        className="py-12 bg-white justify-center items-center flex"
      >
        <div className="h-full  py-4 px-6 md:px-32">
          <div className=" ">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold uppercase">
              <span>
                  {details?.LargeCta?.header2?.slice(
                    0,
                    Math.floor(details?.LargeCta?.header2?.length / 2)
                  )}
                </span>

                <span className="text-[#C7D300]">
                  {details?.LargeCta?.header2?.slice(
                    Math.floor(details?.LargeCta?.header2?.length / 2)
                  )}
                </span>
              </h2>
              <p className="text-gray-700">
              {sanitizeContent(details && details.LargeCta.summary1)}
              </p>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-4">
            {teams.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-white overflow-hidden">
                  <div className="relative">
                    <img
                      className="w-full h-64 rounded-md object-cover"
                      src={member.image}
                      alt={member.name}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold font-Raj">
                      {member.name}
                    </h3>
                    <p className="text-gray-500">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-black" id="contact">
        {/* Clients Section */}
        <BlackContactForm ecosystemDomain={subdomain} />

        {/* Instagram Section */}
        <div className="insta container mx-auto px-4 py-8">
          <div className="grid grid-cols-5 gap-2">
            {instaImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Instagram ${index}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <i className="text-white text-3xl fab fa-instagram"></i>
                </div>
              </div>
            ))}
          </div>

          {/* Follow Section */}
          {/* <div className="flex justify-center mt-4">
            <a
              href="#0"
              className="bg-white text-black py-2 px-4 rounded-lg shadow-md flex items-center"
            >
              <i className="fab fa-instagram text-xl mr-2"></i> / NoStop
            </a>
          </div> */}
        </div>
      </div>
      <footer className="bg-black text-white py-10">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24 md:px-12 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Contact Section */}
            <div>
              <h4 className="text-3xl font-bold">CONTACT</h4>
              <p className="mt-4 text-gray-300">
                {userDetails?.address}, {userDetails?.country}
              </p>
              <p className="mt-2 text-gray-300">
                Phone:{userDetails?.phoneNumber}
              </p>
              <p className="mt-2 border-b-2 border-[#C7D300] inline-block text-gray-300 pb-1">
                {userDetails?.email}
              </p>
            </div>
            <div>
              <h4 className="text-3xl font-bold">QUICK LINKS</h4>
              <ul class="  text-white text-lg">
                <li>
                  <a href="#home" class="alt-font Contact hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" class="alt-font Contact hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#plans" class="alt-font Contact hover:underline">
                    Membership Plans
                  </a>
                </li>
                <li>
                  <a href="#trainers" class="alt-font Contact hover:underline">
                    Trainers
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    class="alt-font Contact hover:underline"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#contact" class="alt-font Contact hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Opening Hours Section */}
            <div>
              <h4 className="text-3xl font-bold">OPENING HOURS</h4>
              <ul className="mt-4 space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-300">Monday - Friday</span>
                  <span className="text-gray-300">06:00 - 22:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-300">Saturday</span>
                  <span className="text-gray-300">08:00 - 17:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-300">Sunday</span>
                  <span className="text-gray-300">Closed</span>
                </li>
              </ul>
            </div>

            {/* Subscribe Section */}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 text-center text-gray-400 py-4">
          <p>
            © {new Date().getFullYear()} Proudly Powered by
            <a
              href="https://www.dimpified.com/"
              className="text-[#C7D300] ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dimpified
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ThirdGym;
