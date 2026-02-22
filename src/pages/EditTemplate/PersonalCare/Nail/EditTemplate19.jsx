import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import BookingModal from "../../../../features/Booking/BookingModal";
import axios from "axios";
import {
  LoadingMany,
  LoadingSmall,
} from "../../../../component/LoadingSpinner";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import { EditTemplateLongInput } from "../../../../component/Inputs";
import { updateContent } from "../../../../features/Template/editTemplate";
import { ButtonSmallPurple } from "../../../../component/Buttons";
// import { useImageEditor } from "../../../../helper/UploadImage";
import { PERMISSIONS } from "../../../../component/Permission/Creator";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";
const FirstNail = ({ userDetails, subdomain }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [services, setServices] = useState([]);
  const [currency, setCurrency] = useState([]);
  const userPlan = useSelector((state) => state.ecosystemPlan.plan);
  const userPermissions = PERMISSIONS[userPlan] || {};
  const dispatch = useDispatch();
  const details = useSelector(
    (state) => state.editTemplate.editcurrentTemplate
  );

  // service section
  useEffect(() => {
    const getServiceeDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`
        );
        const allServices = response.data.flatMap((item) => item.services);
         const userCurrency = response.data.flatMap((item) => item.currency);
          setCurrency(userCurrency);
        setServices(allServices);
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

//   const {
//     fileInputRefs,
//     handleEditImageClick,
//     handleImageChange,
//     loadingImage,
//   } = useImageEditor();

  // to change content
  const handleContentChange = (section, field, event, index = null) => {
    const value = event.target.value;
    dispatch(updateContent({ section, field, value, index }));
  };
  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const testimonials = [
    {
      name: details && details.Reviews.header1,

      content: details && details.Reviews.summary1,
    },
    {
      name: details && details.Reviews.header2,

      content: details && details.Reviews.summary2,
    },
    {
      name: details && details.Reviews.header3,

      content: details && details.Reviews.summary3,
    },
  ];

  const offers = [
    {
      img: details && details.Patrners.sectionImage1,
      title: details && details.Patrners.section1header,
      link: "/service-mani",
    },
    {
      img: details && details.Patrners.sectionImage2,
      title: details && details.Patrners.section2header,
      link: "/service-pedi",
    },
    {
      img: details && details.Patrners.sectionImage3,
      title: details && details.Patrners.section3header,
      link: "/service-nailart",
    },
    {
      img: details && details.Patrners.sectionImage4,
      title: details && details.Patrners.section4header,
      link: "/service-parahand",
    },
  ];

  const gallery = [
    {
      image: details?.Gallery?.image2 || "",
      summary: details?.Gallery?.summary2 || "",
    },
    {
      image: details?.Gallery?.image3 || "",
      summary: details?.Gallery?.summary3 || "",
    },
    {
      image: details?.Gallery?.image4 || "",
      summary: details?.Gallery?.summary4 || "",
    },
    {
      image: details?.Gallery?.image5 || "",
      summary: details?.Gallery?.summary5 || "",
    },
  ].filter((item) => item.image || item.summary);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  return (
    <div className="font-Urbanist">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="flex-wrap lg:px-32 flex items-center justify-between py-4 px-4 md:px-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-3xl font-bold font-Marcellus">
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}{" "}
              <span className="text-gray-400 font-Marcellus">.</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-6 font-bold">
            <a href="/" className="text-gray-700 hover:text-pink-600">
              Home
            </a>
            <a href="#about" className="text-gray-700 hover:text-pink-600">
              About
            </a>
            <a href="#services" className="text-gray-700 hover:text-pink-600">
              Services
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-pink-600">
              Pricing
            </a>
            <a href="#gallery" className="text-gray-700 hover:text-pink-600">
              Gallery
            </a>
            <button
              onClick={handleModalOpen}
              className="px-4 py-2 border-2 border-pink-600  hover:bg-pink-600 hover:text-white transition font-bold"
            >
              Book Appointment
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="block lg:hidden text-gray-700"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white text-black py-4 px-4 space-y-4">
            <a href="#" className="block hover:text-pink-600">
              Home
            </a>
            <a href="#" className="block hover:text-pink-600">
              About
            </a>
            <a href="#" className="block hover:text-pink-600">
              Services
            </a>

            <a href="#" className="block hover:text-pink-600">
              Pricing
            </a>
            <a href="#" className="block hover:text-pink-600">
              Gallery
            </a>
            <button
              onClick={handleModalOpen}
              className="block px-4 py-2 border border-pink-600  hover:bg-white hover:text-black text-center transition"
            >
              Book Appointment
            </button>
          </div>
        )}
      </header>
      <section
        id="home"
        className="bg-cover bg-center md:h-screen h-[60vh] relative flex items-center justify-center"
        style={{
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
        }}
      >
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className="relative text-center text-white z-10">
          <h1 className="text-4xl md:text-8xl font-bold mb-4 font-Marcellus uppercase">
            {sanitizeContent(details && details.hero.title1)} {""}
            {userDetails && userDetails.ecosystemName
              ? userDetails.ecosystemName
              : ""}{" "}
            NAILCURE STUDIO
          </h1>
          <p className="text-lg md:text-2xl mb-6">
            {sanitizeContent(details && details.hero.title2)}
          </p>
          {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )}
          <button
            onClick={handleModalOpen}
            className="border py-4 text-white px-6 hover:bg-pink-500"
          >
            Book An Appointment
          </button>
        </div>
        <div
          style={{
            width: "250px",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 1000,
          }}
        >
          <div>
            {/* userPlan && userPermissions.canEditImage ? (
              <ButtonSmallPurple
                onClick={() => handleEditImageClick("hero", "backgroundImage1")}
              >
                {loadingImage ? <LoadingSmall /> : "Edit Image"}
              </ButtonSmallPurple>
            ) : null*/}
          </div>
          {/* <input
            type="file"
            ref={(ref) =>
              (fileInputRefs.current["hero-backgroundImage1"] = ref)
            }
            onChange={(e) => handleImageChange(e, "hero", "backgroundImage1")}
            style={{ display: "none" }}
          /> */}
        </div>
      </section>
      <div className="mb-10 px-4  lg:px- ">
        <h1>Edit Hero Section</h1>
        <div className="mt-7">
          <div className="lg:flex gap-4">
            <div className="flex-1">
              <h1> header logo 1</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.hero.title1)}
                onChange={(event) =>
                  handleContentChange("hero", "title1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
            <div className="flex-1">
              <h1>Section header 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.hero.title2)}
                onChange={(event) =>
                  handleContentChange("hero", "title2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>
        </div>
      </div>

      <div id="about" className="pt-24 pb-24 bg-white">
        <div className="flex flex-wrap lg:px-32 px-4 justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div data-aos="fade-up " className="relative">
              <img
                src={details && details.aboutUs.image1}
                alt="Professional NailCure Session"
              />

              <div
                style={{
                  width: "250px",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: 1000,
                }}
              >
                <div>
                  {/* userPlan && userPermissions.canEditImage ? (
                    <ButtonSmallPurple
                      onClick={() => handleEditImageClick("aboutUs", "image1")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null*/}
                </div>
                {/* <input
                  type="file"
                  ref={(ref) => (fileInputRefs.current["aboutUs-image1"] = ref)}
                  onChange={(e) => handleImageChange(e, "aboutUs", "image1")}
                  style={{ display: "none" }}
                /> */}
              </div>
            </div>

            {/* Right Section */}
            <div data-aos="fade-up">
              <h3 className="text-3xl md:text-4xl font-Marcellus font-bold pb-4 leading-snug">
                {sanitizeContent(details && details.aboutUs.title1)
                  .split("Nail Salon")
                  .map((part, index, array) =>
                    index === array.length - 1 ? (
                      part
                    ) : (
                      <>
                        {part}
                        <span className="text-pink-600">Nail Salon</span>
                      </>
                    )
                  )}
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed">
                {sanitizeContent(details && details.aboutUs.text1)}
              </p>
              <div className="mt-6">
                <button
                  onClick={handleModalOpen}
                  className="inline-block border-2 border-pink-600 text-pink-600 py-4 px-6  font-medium hover:bg-pink-700 hover:text-white transition duration-300"
                >
                  Book an appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-16 px-4  lg:px- ">
        <h1>Edit About Us Section</h1>
        <div className="lg:flex gap-4">
          <div className="mt-7 flex-1">
            <h1>Section header 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.aboutUs.title1)}
              onChange={(event) =>
                handleContentChange("aboutUs", "title1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
        </div>
        <div className="mt-7">
          <h1>Section header 3</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.aboutUs.text1)}
            onChange={(event) => handleContentChange("aboutUs", "text1", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
      </div>

      <div id="services" className="offer-main-wrapper pt-0">
        <div className="flex flex-wrap lg:px-32 px-4 justify-center items-center pb-12">
          {/* Offer Images */}
          <div className="offer-img-wrapper grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {offers.map((offer, index) => (
              <div key={index} className="relative offer-img overflow-hidden">
                {/* Image */}
                <img
                  src={offer.img}
                  alt={offer.title}
                  className="w-60 h-auto rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Edit Button (if editing is allowed) */}
                {userPlan && userPermissions.canEditImage && (
                  <div
                    style={{
                      width: "250px",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      zIndex: 1000,
                    }}
                  >
                    <ButtonSmallPurple
                      onClick={() =>
                        handleEditImageClick(
                          "Patrners",
                          `sectionImage${index + 1}`
                        )
                      }
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>

                    <input
                      type="file"
                      ref={(ref) =>
                        (fileInputRefs.current[
                          `Patrners-sectionImage${index + 1}`
                        ] = ref)
                      }
                      onChange={(e) =>
                        handleImageChange(
                          e,
                          "Patrners",
                          `sectionImage${index + 1}`
                        )
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                )}

                {/* Image Title */}
                <div className="items-center justify-center text-center pt-6">
                  <h3 className="text-black text-xl font-semibold">
                    {offer.title}
                  </h3>
                </div>

                {/* Editable Input Field */}
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Patrners?.[`section${index + 1}header`]
                  )}
                  onChange={(event) =>
                    handleContentChange(
                      "Patrners",
                      `section${index + 1}header`,
                      event
                    )
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="pricing" className="py-8 bg-pink-50">
        <section className="px-6 py-12">
          <div className="max-w-6xl text-center mx-auto gap-8">
            <h1 className="text-center">Services Section</h1>
            <div className="flex flex-col mt-10 justify-end">
              <button className="bg-sec8 p-4 text-primary1 rounded-md">
                Section Not Editable
              </button>
              <p>You can edit your service in the edit service page</p>
            </div>
          </div>
        </section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {/* Section Title */}
          <div className="text-center mb-10">
            <span className="text-gray-500 text-3xl uppercase tracking-wide text-sm">
              Make an Impression
            </span>
            <h2 className="text-gray-800 text-4xl font-Marcellus font-semibold mt-2">
              Popular services and pricing
            </h2>
          </div>

          {/* Pricing Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <ul className="space-y-4">
              {services
                .slice(0, Math.ceil(services.length / 2))
                .map((service, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-pink-600 pb-4"
                  >
                    <div>
                      <h4 className="text-lg font-medium">{service.name}</h4>
                      <p className="text-sm text-gray-500">
                        {service.shortDescription}
                      </p>
                    </div>
                    <span className="text-xl font-semibold text-gray-800">
                      {getCurrencySymbol(currency)}{service.price}
                    </span>
                  </li>
                ))}
            </ul>

            {/* Right Column */}
            <ul className="space-y-4">
              {services
                .slice(Math.ceil(services.length / 2))
                .map((service, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-pink-600 pb-4"
                  >
                    <div>
                      <h4 className="text-lg font-medium">{service.name}</h4>
                      <p className="text-sm text-gray-500">
                        {service.shortDescription}
                      </p>
                    </div>
                    <span className="text-xl font-semibold text-gray-800">
                      {getCurrencySymbol(currency)}{service.price}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Button */}
          <div className="text-center mt-10">
            <a
              href="#"
              className="inline-block bg-transparent border-2 border-gray-800 text-gray-800 py-2 px-6  hover:bg-gray-800 hover:text-white transition-all"
            >
              View All Prices
            </a>
          </div>
        </div>
      </div>
      <section id="gallery" className="py-4 lg:py-24 bg-gray-50">
        {/* Section Title */}
        <div className="text-center mb-10">
          <p className="uppercase text-gray-500 tracking-widest text-sm">
            {sanitizeContent(details && details.Gallery.image1)}
          </p>
          <div className="">
            <h1>Section header 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Gallery.image1)}
              onChange={(event) =>
                handleContentChange("Gallery", "image1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <h2 className="text-4xl font-bold font-Marcellus">
            {sanitizeContent(details && details.Gallery.summary1)}
          </h2>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Gallery.summary1)}
            onChange={(event) =>
              handleContentChange("Gallery", "summary1", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>

        <div className="offer-main-wrapper pt-0">
          <div className="flex flex-wrap lg:px-32 px-4 justify-center items-center pb-12">
            {/* Offer Images */}
            <div className="offer-img-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {gallery.map((item, index) => (
                <div key={index} className="offer-img relative overflow-hidden">
                  {/* Image Section */}
                  {item.image && (
                    <div className="relative">
                      <img
                        src={
                          item.image.match(/\.(jpeg|jpg|png|gif|webp)$/i)
                            ? item.image
                            : `${item.image}.jpg`
                        }
                        alt={`Gallery Image ${index + 1}`}
                        className="lg:w-80 w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {userPlan && userPermissions.canEditImage && (
                        <div
                          className="absolute top-0 left-0 w-full  bg-opacity-50 p-2"
                          style={{ zIndex: 1000 }}
                        >
                          <ButtonSmallPurple
                            onClick={() =>
                              handleEditImageClick(
                                "Gallery",
                                `image${index + 2}`
                              )
                            }
                          >
                            {loadingImage ? <LoadingSmall /> : "Edit Image"}
                          </ButtonSmallPurple>

                          <input
                            type="file"
                            ref={(ref) =>
                              (fileInputRefs.current[
                                `Gallery-image${index + 2}`
                              ] = ref)
                            }
                            onChange={(e) =>
                              handleImageChange(
                                e,
                                "Gallery",
                                `image${index + 2}`
                              )
                            }
                            style={{ display: "none" }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Summary Section */}
                  {item.summary && (
                    <div className="relative mt-2">
                      <img
                        src={
                          item.summary.match(/\.(jpeg|jpg|png|gif|webp)$/i)
                            ? item.summary
                            : `${item.summary}.jpg`
                        }
                        alt={`Gallery Summary ${index + 1}`}
                        className="lg:w-80 w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {userPlan && userPermissions.canEditImage && (
                        <div
                          className="absolute top-0 left-0 w-full  bg-opacity-50 p-2"
                          style={{ zIndex: 1000 }}
                        >
                          <ButtonSmallPurple
                            onClick={() =>
                              handleEditImageClick(
                                "Gallery",
                                `summary${index + 2}`
                              )
                            }
                          >
                            {loadingImage ? <LoadingSmall /> : "Edit Image"}
                          </ButtonSmallPurple>

                          <input
                            type="file"
                            ref={(ref) =>
                              (fileInputRefs.current[
                                `Gallery-summary${index + 2}`
                              ] = ref)
                            }
                            onChange={(e) =>
                              handleImageChange(
                                e,
                                "Gallery",
                                `summary${index + 2}`
                              )
                            }
                            style={{ display: "none" }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section
        className="relative py-16 bg-cover bg-center text-center text-white h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${details && details.LargeCta.image1})`,
        }}
      >
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 px-4">
          <h2 className="text-2xl font-bold">
            <span className="text-yellow-400">
              {sanitizeContent(details && details.LargeCta.header1)}
            </span>
          </h2>
          <h3 className="text-5xl mt-4 font-Marcellus">
            {sanitizeContent(details && details.LargeCta.header2)}
          </h3>
          <button
            onClick={handleModalOpen}
            className="mt-8 inline-block bg-transparent border border-white px-6 py-3 text-xl text-white font-bold hover:bg-white hover:text-gray-800 transition"
          >
            Book an Appointment
          </button>
        </div>
      </section>
      <div className="flex-1">
        <h1>Section header 1</h1>
        <EditTemplateLongInput
          value={sanitizeContent(details && details.LargeCta.header1)}
          onChange={(event) =>
            handleContentChange("LargeCta", "header1", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>
      <div className="flex-1">
        <h1>Section header 1</h1>
        <EditTemplateLongInput
          value={sanitizeContent(details && details.LargeCta.header2)}
          onChange={(event) =>
            handleContentChange("LargeCta", "header2", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>
      <section className="py-12 bg-gray-50">
        <div className="text-center mb-10">
          <p className="uppercase text-gray-500 tracking-widest text-sm">
            {sanitizeContent(details && details.Reviews.image1)}
          </p>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Reviews.image1)}
            onChange={(event) =>
              handleContentChange("Reviews", "image1", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h2 className="text-4xl font-bold font-Marcellus">
            {sanitizeContent(details && details.Reviews.image2)}
          </h2>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Reviews.image2)}
            onChange={(event) =>
              handleContentChange("Reviews", "image2", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>

        <div className="flex flex-wrap md:px-32 px-4">
          {/* Map through testimonials */}
          {testimonials.map((testimonial, index) => (
            <div key={index} className="grid grid-cols-1 w-full mb-12">
              <div className="lg:px-56">
                <div className="flex flex-col items-center text-center">
                  {/* Display Content */}
                  <h3 className="italic font-bold">
                    <span className="text-pink-700 text-8xl">&#8220;</span>
                  </h3>

                  <p className="text-gray-500 text-2xl leading-relaxed">
                    {testimonial.content}
                  </p>

                  <h3 className="text-lg font-bold py-12">
                    {testimonial.name}
                  </h3>
                  <div className="text-yellow-500 text-lg mb-2">
                    {testimonial.rating}
                  </div>

                  {/* Editable Content Section */}
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details?.Reviews?.[`summary${index + 1}`]
                    )}
                    onChange={(e) =>
                      handleContentChange("Reviews", `summary${index + 1}`, e)
                    }
                    placeholder="Edit testimonial content..."
                    className="text-gray-500 text-2xl leading-relaxed mb-4"
                  />

                  {/* Editable Name Section */}
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details?.Reviews?.[`header${index + 1}`]
                    )}
                    onChange={(e) =>
                      handleContentChange("Reviews", `header${index + 1}`, e)
                    }
                    placeholder="Edit testimonial name..."
                    className="text-lg font-bold py-12"
                  />

                  {/* Optional Rating (if applicable) */}
                  <div className="text-yellow-500 text-lg mb-2">
                    {testimonial.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-black text-white py-10">
        <div className="flex flex-wrap lg:px-32 justify-center items-center px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Logo and About Section */}
            <div>
              <div className="mb-4">
                <div className="flex-shrink-0">
                  <a href="/" className="text-3xl font-bold font-Marcellus">
                    {userDetails && userDetails.ecosystemName}
                    <span className="text-gray-400 font-Marcellus">.</span>
                  </a>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                {sanitizeContent(details && details.footer.header)}
              </p>
              {/* <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-500"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-500"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-500"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-500"
                >
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </div> */}
              <EditTemplateLongInput
                value={sanitizeContent(details && details.footer.header)}
                onChange={(event) =>
                  handleContentChange("footer", "header", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
            </div>

            {/* Useful Links Section */}
            <div>
              <h5 className="text-lg font-semibold mb-4">Useful Links</h5>
              <ul className="space-y-2">
                {["Home", "About Us", "Services", "Pricing", "Gallery"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center space-x-2 text-gray-400 hover:text-pink-500"
                      >
                        <i className="fas fa-chevron-right"></i>
                        <span>{link}</span>
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact Info Section */}
            <div>
              <h5 className="text-lg font-semibold mb-4">Contact Info</h5>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <i className="fas fa-map-marker-alt text-pink-500 mt-1"></i>
                  <div>
                    <span className="block font-semibold">Address</span>
                    <p>{userDetails && userDetails.address}</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-phone text-pink-500 mt-1"></i>
                  <div>
                    <span className="block font-semibold">
                      {sanitizeContent(details && details.footer.paragraph4)}
                    </span>
                    <p>
                      {sanitizeContent(details && details.footer.paragraph5)}
                    </p>
                  </div>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details && details.footer.paragraph5
                    )}
                    onChange={(event) =>
                      handleContentChange("footer", "paragraph5", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class text-black"
                  />
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-envelope text-pink-500 mt-1"></i>
                  <div>
                    <span className="block font-semibold">
                      {sanitizeContent(details && details.footer.paragraph6)}
                    </span>
                    <p>
                      {sanitizeContent(details && details.footer.paragraph7)}
                    </p>
                  </div>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details && details.footer.paragraph7
                    )}
                    onChange={(event) =>
                      handleContentChange("footer", "paragraph7", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class text-black"
                  />
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-10 text-center text-white-800 text-sm">
            <p>
              <span>
                © {new Date().getFullYear()}{" "}
                <a
                  href="https://dimpified.com"
                  className="hover:text-pink-600"
                  target="_blank"
                >
                  Dimpified.
                </a>{" "}
                All Rights Reserved
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default FirstNail;
