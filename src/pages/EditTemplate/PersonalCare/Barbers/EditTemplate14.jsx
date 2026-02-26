import React, { useRef, Fragment, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { barber } from "../../../../data/Services";
import BookingModal from "../../../../features/Booking/BookingModal";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";
import {
  FaCalendarCheck,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa6";

import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import {
  LoadingMany,
  LoadingSmall,
} from "../../../../component/LoadingSpinner";
import { EditTemplateLongInput } from "../../../../component/Inputs";
import { updateContent } from "../../../../features/Template/editTemplate";
import { ButtonSmallPurple } from "../../../../component/Buttons";
// import { useImageEditor } from "../../../../helper/UploadImage";
import api from "../../../../api/Template";
import { showToast } from "../../../../component/ShowToast";
import { PERMISSIONS } from "../../../../component/Permission/Creator";
import axios from "axios";

const EditTemplate14 = ({ userDetails, subdomain }) => {
  const [services, setServices] = useState([]);
  const [currency, setCurrency] = useState([]);
  const userPlan = useSelector((state) => state.ecosystemPlan.plan);
  const userPermissions = PERMISSIONS[userPlan] || {};
  const dispatch = useDispatch();
  const details = useSelector(
    (state) => state.editTemplate.editcurrentTemplate
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // service section
  useEffect(() => {
    const getServiceeDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`
        );
         const userCurrency = response.data.flatMap((item) => item.currency);
        const allServices = response.data.flatMap((item) => item.services);
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

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Works", href: "#works" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  const testimonial1 = {
    name: details ? details.Reviews.header1 : "",
    role: details ? details.Reviews.title1 : "",
    image: details ? details.Reviews.image1 : "",
    text: details ? details.Reviews.summary1 : "",
  };

  const testimonial2 = {
    name: details ? details.Reviews.header2 : "",
    role: details ? details.Reviews.title2 : "",
    image: details ? details.Reviews.image2 : "",
    text: details ? details.Reviews.summary2 : "",
  };

  const testimonial3 = {
    name: details ? details.Reviews.header3 : "",
    role: details ? details.Reviews.title3 : "",
    image: details ? details.Reviews.image3 : "",
    text: details ? details.Reviews.summary3 : "",
  };

  const testimonial4 = {
    name: details ? details.Blog.header3 : "",
    role: details ? details.Blog.summary3 : "",
    image: details ? details.Blog.image3 : "", // Replace with the actual image URL
    text: details ? details.Blog.content3 : "",
  };

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Get the current testimonial to display
  let testimonial;
  switch (currentTestimonialIndex) {
    case 0:
      testimonial = testimonial1;
      break;
    case 1:
      testimonial = testimonial2;
      break;
    case 2:
      testimonial = testimonial3;
      break;
    case 3:
      testimonial = testimonial4;
      break;
    default:
      testimonial = testimonial1;
  }

  const images = [
    details ? details.Gallery.image1 : "",
    details ? details.Gallery.image2 : "",
    details ? details.Gallery.image3 : "",
    details ? details.Gallery.image4 : "",
    details ? details.Gallery.image5 : "",
    details ? details.Gallery.image6 : "",
  ];
  // Utility function to chunk images
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Group images into chunks of 3
  const imageChunks = chunkArray(images, 6);

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

  return (
    <div className="font-sen">
      <div className="bg-black text-white">
        {/* Navbar */}
        <nav className="max-w-7xl mx-auto px-6 lg:px-16 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
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
                      onClick={() => handleEditImageClick("navbar", "logo")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null*/}
                </div>
                {/* <input
                  type="file"
                  ref={(ref) => (fileInputRefs.current["navbar-logo"] = ref)}
                  onChange={(e) => handleImageChange(e, "navbar", "logo")}
                  style={{ display: "none" }}
                /> */}
              </div>
            </div>
            <span className="text-xl font-bold">
              {sanitizeContent(details && details.navbar.link1)}
            </span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden lg:flex space-x-8 text-sm uppercase">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-gray-400 cursor-pointer"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Book Appointment Button */}
          <div className="hidden lg:block">
            <button
              onClick={handleModalOpen}
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-400 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-16 left-0 w-full bg-black text-white px-6 py-4 space-y-4 text-sm uppercase z-50">
              {links.map((link) => (
                <ul>
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-gray-400 cursor-pointer block"
                    >
                      {link.name}
                    </a>
                  </li>
                </ul>
              ))}
              <div>
                <button
                  onClick={handleModalOpen}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-sm hover:bg-orange-600 transition duration-300 w-full"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="h-[500px] lg:h-[600px] bg-cover bg-center flex items-center justify-center relative"
          style={{
            backgroundImage: `url(${details && details.hero.backgroundImage1})`, // Replace with the actual image URL
          }}
        >
          <div className="text-center text-white px-6">
            <p className="uppercase text-sm tracking-wide mb-4">
              {sanitizeContent(details && details.hero.title1)}
            </p>
            <h1 className="text-5xl lg:text-6xl uppercase font-bold mb-6">
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}{" "}
              {""}
              {sanitizeContent(details && details.hero.title2)}
            </h1>
            <p className="text-sm mb-8">
              {" "}
              {userDetails && userDetails.address && userDetails.address}
            </p>
            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )}
            <button
              onClick={handleModalOpen}
              className=" bg-yellow-500 text-white text-base py-4 px-5 shadow-md rounded-md  hover:bg-yellow-700 transition duration-300 mr-6"
            >
              Book Appointment
            </button>

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
                    onClick={() =>
                      handleEditImageClick("hero", "backgroundImage1")
                    }
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
                onChange={(e) =>
                  handleImageChange(e, "hero", "backgroundImage1")
                }
                style={{ display: "none" }}
              /> */}
            </div>
          </div>
          <div className="absolute bottom-10 text-white text-3xl"></div>
        </section>
      </div>
      {/* edit hero section */}
      <div className="mb-16 px-4  lg:px- ">
        <h1 className="mt-5">Edit Hero Section</h1>
        <div className="mt-7">
          <h1>Logo Text</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.navbar.link1)}
            onChange={(event) => handleContentChange("navbar", "link1", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h1>Section header 2</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.hero.title1)}
            onChange={(event) => handleContentChange("hero", "title1", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h1>Section header 2</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.hero.title2)}
            onChange={(event) => handleContentChange("hero", "title2", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-[#f8f5f1] py-16">
        <div className=" mx-auto px-4 lg:px-24">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-16">
            {/* Images */}

            {/* Left Side - Images */}
            <div className="relative w-full lg:w-1/2 mb-12 mr-5 lg:mb-4">
              <div className="w-3/4 mx-auto overflow-hidden rounded-lg relative">
                <img
                  src={details && details.aboutUs.image1}
                  alt="Primary Image"
                  className="w-full object-cover"
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
                        onClick={() =>
                          handleEditImageClick("aboutUs", "image1")
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>
                  {/* <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current["aboutUs-image1"] = ref)
                    }
                    onChange={(e) => handleImageChange(e, "aboutUs", "image1")}
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
              <div className="absolute right-[-15px] md:right-[15px] bottom-[-50px] w-1/2 md:w-2/5 rounded-lg overflow-hidden">
                <img
                  src={details && details.aboutUs.image2}
                  alt="Secondary Image"
                  className="w-full object-cover"
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
                        onClick={() =>
                          handleEditImageClick("aboutUs", "image2")
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>
                  {/* <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current["aboutUs-image2"] = ref)
                    }
                    onChange={(e) => handleImageChange(e, "aboutUs", "image2")}
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
            </div>
            {/* Text Content */}
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <p className="uppercase text-sm font-bold text-gray-600 mb-2">
                {sanitizeContent(details && details.aboutUs.title1)}
              </p>
              <h2 className="text-4xl font-bold text-black mb-6">
                {sanitizeContent(details && details.aboutUs.title2)}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {sanitizeContent(details && details.aboutUs.text1)}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {sanitizeContent(details && details.aboutUs.text2)}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  {sanitizeContent(
                    details && details.Statistics.section1header
                  )}
                </li>
                <li className="flex items-center text-gray-800">
                  {sanitizeContent(
                    details && details.Statistics.section2header
                  )}
                </li>
                <li className="flex items-center text-gray-800">
                  {sanitizeContent(
                    details && details.Statistics.section3header
                  )}
                </li>
              </ul>
              <div className="flex-col flex lg:inline-block mt-6">
                <a
                  onClick={handleModalOpen}
                  className="btn bg-yellow-500 text-white text-base py-4 px-5 shadow-md rounded-md  hover:bg-yellow-700 transition duration-300 mr-6"
                >
                  Book Appointment
                </a>
                <a
                  href="#services"
                  className="btn text-yellow-500 shadow-md border rounded-md py-4 px-5 text-lg hover:underline xs:mt-4 xs:mb-4"
                >
                  Our Services
                </a>
              </div>
            </div>
          </div>
          {/* edit about us section */}
          <div className="mb-10 mt-10 px-4  lg:px- ">
            <h1>Edit About Us Section</h1>
            <div className="mt-7">
              <h1>Section header 1</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.aboutUs.title1)}
                onChange={(event) =>
                  handleContentChange("aboutUs", "title1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Section header 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.aboutUs.title2)}
                onChange={(event) =>
                  handleContentChange("aboutUs", "title2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Section header 3</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.aboutUs.text1)}
                onChange={(event) =>
                  handleContentChange("aboutUs", "text1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Section header 4</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.aboutUs.text2)}
                onChange={(event) =>
                  handleContentChange("aboutUs", "text2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <div className="lg:flex w-full gap-3 justify-between">
                <div className="w-full">
                  <h1>Section header 5</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details && details.Statistics.section1header
                    )}
                    onChange={(event) =>
                      handleContentChange("Statistics", "section1header", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                </div>
                <div className="w-full">
                  <h1>Section header 6</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details && details.Statistics.section2header
                    )}
                    onChange={(event) =>
                      handleContentChange("Statistics", "section2header", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                </div>
                <div className="w-full">
                  <h1>Section header 7</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details && details.Statistics.section3header
                    )}
                    onChange={(event) =>
                      handleContentChange("Statistics", "section3header", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="flex flex-wrap justify-between mt-16 px-4 lg:px-24">
            {/* Service 1 */}
            <div className="flex flex-col  w-full md:w-1/3 mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {" "}
                {sanitizeContent(details && details.Statistics.section1span)}
              </h3>
              <p className="text-gray-600">
                {sanitizeContent(
                  details && details.Statistics.section1paragraphy
                )}
              </p>

              <div className="mb-5 mt-5 px-4  lg:px- ">
                <h1>Edit About Us Section 1</h1>
                <div className="mt-2">
                  <h1>Section header 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details && details.Statistics.section1span
                    )}
                    onChange={(event) =>
                      handleContentChange("Statistics", "section1span", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                  <h1>Section header 2</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details && details.Statistics.section1paragraphy
                    )}
                    onChange={(event) =>
                      handleContentChange(
                        "Statistics",
                        "section1paragraphy",
                        event
                      )
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex flex-col w-full md:w-1/3 mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {sanitizeContent(details && details.Statistics.section2span)}
              </h3>
              <p className="text-gray-600">
                {sanitizeContent(
                  details && details.Statistics.section2paragraphy
                )}
              </p>

              <div className="mb-5 mt-5 px-4  lg:px- ">
                <h1>Edit About Us Section 2</h1>
                <div className="mt-2">
                  <h1>Section header 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details && details.Statistics.section2span
                    )}
                    onChange={(event) =>
                      handleContentChange("Statistics", "section2span", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                  <h1>Section header 2</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details && details.Statistics.section2paragraphy
                    )}
                    onChange={(event) =>
                      handleContentChange(
                        "Statistics",
                        "section2paragraphy",
                        event
                      )
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex flex-col  w-full md:w-1/3 mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {sanitizeContent(details && details.Statistics.section3span)}
              </h3>
              <p className="text-gray-600">
                {sanitizeContent(
                  details && details.Statistics.section3paragraphy
                )}
              </p>
              <div className="mb-5 mt-5 px-4  lg:px- ">
                <h1>Edit About Us Section 3</h1>
                <div className="mt-2">
                  <h1>Section header 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details && details.Statistics.section3span
                    )}
                    onChange={(event) =>
                      handleContentChange("Statistics", "section3span", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                  <h1>Section header 2</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details && details.Statistics.section3paragraphy
                    )}
                    onChange={(event) =>
                      handleContentChange(
                        "Statistics",
                        "section3paragraphy",
                        event
                      )
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-wrap items-center">
          {/* Image Section */}
          <div className=" relative w-full lg:w-1/2 mb-8 lg:pe-12">
            <img
              src={details && details.Blog.image1}
              alt="Barber at work"
              className="rounded-lg shadow-lg object-cover"
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
                    onClick={() => handleEditImageClick("Blog", "image1")}
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Image"}
                  </ButtonSmallPurple>
                ) : null*/}
              </div>
              {/* <input
                type="file"
                ref={(ref) => (fileInputRefs.current["Blog-image1"] = ref)}
                onChange={(e) => handleImageChange(e, "Blog", "image1")}
                style={{ display: "none" }}
              /> */}
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-6">
            <p className="uppercase text-sm tracking-widest text-gray-400">
              {sanitizeContent(details && details.Blog.header1)}
            </p>
            <h2 className="text-4xl font-bold leading-snug">
              {sanitizeContent(details && details.Blog.summary1)}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {sanitizeContent(details && details.Blog.content1)}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {sanitizeContent(details && details.Blog.content2)}
            </p>
            <div>
              <p className="font-medium">
                {sanitizeContent(details && details.Blog.date1)}
              </p>
              <p className="font-bold text-lg">
                {sanitizeContent(details && details.Blog.author1)}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mb-10 mt-10 px-4  lg:px- ">
        <h1>Edit Blog Section</h1>
        <div className="mt-7">
          <div className="lg:flex justify-between gap-4">
            <div className="w-full">
              <h1>Section header 1</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Blog.header1)}
                onChange={(event) =>
                  handleContentChange("Blog", "header1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
            <div className="w-full">
              <h1>Section header 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Blog.summary1)}
                onChange={(event) =>
                  handleContentChange("Blog", "summary1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>
          <h1>Section header 3</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Blog.content1)}
            onChange={(event) => handleContentChange("Blog", "content1", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h1>Section header 4</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Blog.content2)}
            onChange={(event) => handleContentChange("Blog", "content2", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <div className="lg:flex justify-between gap-4">
            <div className="w-full">
              <h1>Section header 5</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Blog.date1)}
                onChange={(event) =>
                  handleContentChange("Blog", "date1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
            <div className="w-full">
              <h1>Section header 6</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Blog.author1)}
                onChange={(event) =>
                  handleContentChange("Blog", "author1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>
        </div>
      </div>

      <section id="services" className="bg-cream text-black py-16">
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
        <div className="  px-6 lg:px-32 ">
          {/* Section Title */}
          <p className="text-sm uppercase text-gray-600 tracking-wider mb-2">
            What We're Offering
          </p>
          <h2 className="text-4xl font-bold mb-2 ">Barber Services</h2>
          <p className="text-sm  text-gray-600 tracking-wider  mb-12">
            Select any service style to start the booking process
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {services.map((service, index) => (
              <div key={index} className="text-left relative mb-8 md:mb-0">
                {/* Background Image */}
                <div className="relative rounded-md  overflow-hidden ">
                  {/* <img
                    src={service.serviceImage}
                    onClick={handleModalOpen}
                    alt="Bridal Makeup"
                    className="w-full h-full object-cover"
                  /> */}

                  {/* Overlay Content */}
                  <figcaption className="absolute inset-0 flex flex-col items-start justify-center p-12 sm:p-4 z-10">
                    {/* Offer Badge */}
                    <span className="px-4 py-2 text-xs uppercase text-gray-800 font-bold bg-white rounded-md">
                      Flat 50% off
                    </span>

                    {/* Title & Description */}
                    <div className="flex w-full items-center mt-auto">
                      <div className="pr-4">
                        <h5 className="text-lg font-semibold text-white">
                          {" "}
                          {service.name}
                        </h5>
                        <p className="text-sm text-white opacity-70">
                          {service.shortDescription}
                        </p>
                      </div>

                      {/* Circular Icon */}
                      <button
                        href=""
                        className="w-16 h-16 px-4 sm:w-12 sm:h-12 bg-transparent border border-white/50 rounded-full flex items-center justify-center "
                      >
                        <FaCalendarCheck className="text-white hover:text-yellow-500  text-2xl" />
                      </button>
                    </div>
                  </figcaption>

                  {/* Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-90 z-0"></div>

                  {/* Clickable Link */}
                  <a
                    onClick={handleModalOpen}
                    className="absolute inset-0 z-20"
                    aria-label="Book Appointment"
                  ></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className="bg-cover text-white bg-yellow-500 bg-center py-10 lg:py-32"
        style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
      >
        <h2 className="text-center text-white text-3xl font-bold mb-8">
          What Our Clients Say
        </h2>

        <div className=" rounded-lg p-6  flex flex-col items-center text-center">
          <h2 className="text-white text-3xl mb-4">★★★★★</h2>
          <p className="text-lg italic mb-4">{testimonial1.text}</p>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={testimonial1.image}
                alt={testimonial1.name}
                className="w-20 h-20 rounded-full border-4 text-white"
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
                      onClick={() => handleEditImageClick("Reviews", "image1")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null*/}
                </div>
                {/* <input
                  type="file"
                  ref={(ref) => (fileInputRefs.current["Reviews-image1"] = ref)}
                  onChange={(e) => handleImageChange(e, "Reviews", "image1")}
                  style={{ display: "none" }}
                /> */}
              </div>
            </div>
            <div>
              <p className="font-bold text-xl">{testimonial1.name}</p>
              <p className="text-sm text-white">{testimonial1.role}</p>
            </div>
          </div>
          <div className="mb-10 mt-5 px-4  lg:px- ">
            <h1>Edit Testimonial Section 1</h1>
            <div className="mt-3">
              <div className="flex w-full justify-between gap-3">
                <div className="w-full">
                  <h1>Section header 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Reviews.header1)}
                    onChange={(event) =>
                      handleContentChange("Reviews", "header1", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class text-black"
                  />
                </div>
                <div className="w-full">
                  <h1>Section header 2</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Reviews.title1)}
                    onChange={(event) =>
                      handleContentChange("Reviews", "title1", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class text-black"
                  />
                </div>
              </div>
              <h1>Section header 3</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Reviews.summary1)}
                onChange={(event) =>
                  handleContentChange("Reviews", "summary1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
            </div>
          </div>
        </div>

        <div className=" rounded-lg p-6  flex flex-col items-center text-center">
          <h2 className="text-white text-3xl mb-4">★★★★★</h2>
          <p className="text-lg italic mb-4">{testimonial2.text}</p>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={testimonial2.image}
                alt={testimonial2.name}
                className="w-20 h-20 rounded-full border-4 text-white"
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
                      onClick={() => handleEditImageClick("Reviews", "image2")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null*/}
                </div>
                {/* <input
                  type="file"
                  ref={(ref) => (fileInputRefs.current["Reviews-image2"] = ref)}
                  onChange={(e) => handleImageChange(e, "Reviews", "image2")}
                  style={{ display: "none" }}
                /> */}
              </div>
            </div>
            <div>
              <p className="font-bold text-xl">{testimonial2.name}</p>
              <p className="text-sm text-white">{testimonial2.role}</p>
            </div>
          </div>
          <div className="mb-10 mt-5 px-4  lg:px- ">
            <h1>Edit Testimonial Section 1</h1>
            <div className="mt-3">
              <div className="flex w-full justify-between gap-3">
                <div className="w-full">
                  <h1>Section header 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Reviews.header2)}
                    onChange={(event) =>
                      handleContentChange("Reviews", "header2", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class text-black"
                  />
                </div>
                <div className="w-full">
                  <h1>Section header 2</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Reviews.title2)}
                    onChange={(event) =>
                      handleContentChange("Reviews", "title2", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class text-black"
                  />
                </div>
              </div>
              <h1>Section header 3</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Reviews.summary2)}
                onChange={(event) =>
                  handleContentChange("Reviews", "summary2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
            </div>
          </div>
        </div>

        <div className=" rounded-lg p-6  flex flex-col items-center text-center">
          <h2 className="text-white text-3xl mb-4">★★★★★</h2>
          <p className="text-lg italic mb-4">{testimonial3.text}</p>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={testimonial3.image}
                alt={testimonial3.name}
                className="w-20 h-20 rounded-full border-4 text-white"
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
                      onClick={() => handleEditImageClick("Reviews", "image3")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null*/}
                </div>
                {/* <input
                  type="file"
                  ref={(ref) => (fileInputRefs.current["Reviews-image3"] = ref)}
                  onChange={(e) => handleImageChange(e, "Reviews", "image3")}
                  style={{ display: "none" }}
                /> */}
              </div>
            </div>
            <div>
              <p className="font-bold text-xl">{testimonial3.name}</p>
              <p className="text-sm text-white">{testimonial3.role}</p>
            </div>
          </div>
          <div className="mb-10 mt-5 px-4  lg:px- ">
            <h1>Edit Testimonial Section 1</h1>
            <div className="mt-3">
              <div className="flex w-full justify-between gap-3">
                <div className="w-full">
                  <h1>Section header 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Reviews.header3)}
                    onChange={(event) =>
                      handleContentChange("Reviews", "header3", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class text-black"
                  />
                </div>
                <div className="w-full">
                  <h1>Section header 2</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Reviews.title3)}
                    onChange={(event) =>
                      handleContentChange("Reviews", "title3", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class text-black"
                  />
                </div>
              </div>
              <h1>Section header 3</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Reviews.summary3)}
                onChange={(event) =>
                  handleContentChange("Reviews", "summary3", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
            </div>
          </div>
        </div>

        <div className=" rounded-lg p-6  flex flex-col items-center text-center">
          <h2 className="text-white text-3xl mb-4">★★★★★</h2>
          <p className="text-lg italic mb-4">{testimonial4.text}</p>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={testimonial4.image}
                alt={testimonial4.name}
                className="w-20 h-20 rounded-full border-4 text-white"
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
                      onClick={() => handleEditImageClick("Blog", "image3")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null*/}
                </div>
                {/* <input
                  type="file"
                  ref={(ref) => (fileInputRefs.current["Blog-image3"] = ref)}
                  onChange={(e) => handleImageChange(e, "Blog", "image3")}
                  style={{ display: "none" }}
                /> */}
              </div>
            </div>
            <div>
              <p className="font-bold text-xl">{testimonial4.name}</p>
              <p className="text-sm text-white">{testimonial4.role}</p>
            </div>
          </div>
          <div className="mb-10 mt-5 px-4  lg:px- ">
            <h1>Edit Testimonial Section 1</h1>
            <div className="mt-3">
              <div className="flex w-full justify-between gap-3">
                <div className="w-full">
                  <h1>Section header 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Blog.header3)}
                    onChange={(event) =>
                      handleContentChange("Blog", "header3", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class text-black"
                  />
                </div>
                <div className="w-full">
                  <h1>Section header 2</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Blog.summary3)}
                    onChange={(event) =>
                      handleContentChange("Blog", "summary3", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class text-black"
                  />
                </div>
              </div>
              <h1>Section header 3</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Blog.content3)}
                onChange={(event) =>
                  handleContentChange("Blog", "content3", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
            </div>
          </div>
        </div>
      </div>

      <section id="pricing" className="bg-cream text-black py-16 px-4 lg:px-32">
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
        <div className="">
          {/* Section Title */}
          <p className="text-sm uppercase text-gray-600  tracking-wider mb-2">
            Pricing Plan
          </p>
          <h2 className="text-4xl font-bold  mb-12">Affordable Pricing</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:mb-2">
            {services.map((item, index) => (
              <div
                key={index}
                className={`col ${
                  item.special ? "border border-light-yellow rounded" : ""
                } p-0`}
              >
                <div
                  className={`w-full px-8 py-4 ${
                    item.special ? "bg-light-yellow text-yellow-500" : ""
                  }`}
                >
                  <div className="text-lg flex items-baseline w-full">
                    <span className="font-bold text-yellow-500 flex-grow">
                      {item.name}
                    </span>
                    <div className="text-yellow-950 font-body font-bold">
                      {getCurrencySymbol(currency)}{item.price}
                    </div>
                  </div>
                  <div className="text-md flex items-baseline w-full">
                    <span className=" text-gray-500 flex-grow">
                      <p>{item.shortDescription}</p>
                    </span>
                    <div className=" bg-yellow-500 hover:bg-yellow-700 text-white rounded-md ">
                      <button
                        className="rounded-lg flex justify-center w-[120px] text-center items-center gap-2 text-sm  py-1 px-2"
                        onClick={handleModalOpen}
                      >
                        {" "}
                        Book Now
                        <span className="w-12 h-12 sm:w-12 sm:h-12 bg-transparent  flex items-center justify-center ml-auto">
                          <FaCalendarCheck className=" text-2xl" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="works"
        className="bg-yellow-500 font-Urbanist py-10 px-4 lg:px-32 lg:py-32 overflow-hidden w-full"
      >
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-wide text-white">
            {sanitizeContent(details && details.Gallery.summary2)}
          </h2>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Gallery.summary2)}
            onChange={(event) =>
              handleContentChange("Gallery", "summary2", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h1 className="text-4xl font-bold text-white">
            {" "}
            {sanitizeContent(details && details.Gallery.summary1)}
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Gallery.summary1)}
              onChange={(event) =>
                handleContentChange("Gallery", "summary1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
            />
          </h1>
        </div>
        <div className="w-full overflow-hidden relative">
          {imageChunks.map((chunk, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-center items-center gap-6 mb-8"
            >
              {chunk.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full sm:w-1/2 md:w-3/12 transition-transform transform hover:scale-105"
                >
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={img}
                      className="w-full h-64 object-cover transition-transform duration-300 ease-in-out"
                      alt={`Gallery Image ${idx + 1}`}
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
                            onClick={() =>
                              handleEditImageClick("Gallery", `image${idx + 1}`)
                            }
                          >
                            {loadingImage ? <LoadingSmall /> : "Edit Image"}
                          </ButtonSmallPurple>
                        ) : null*/}
                      </div>
                      {/* <input
                        type="file"
                        ref={(ref) =>
                          (fileInputRefs.current[`Gallery-image${idx + 1}`] =
                            ref)
                        }
                        onChange={(e) =>
                          handleImageChange(e, "Gallery", `image${idx + 1}`)
                        }
                        style={{ display: "none" }}
                      /> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div id="team" className="flex flex-col p-4 lg:px-32  lg:py-24 ">
        {/* Section Header */}
        <div className="flex justify-center mb-3">
          <div className="text-center">
            <span className="font-semibold tracking-[1px] text-base uppercase text-orange-500 mb-1 block">
              {sanitizeContent(details && details.LargeCta.header1)}
            </span>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.LargeCta.header1)}
              onChange={(event) =>
                handleContentChange("LargeCta", "header1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <h2 className="font-semibold  text-gray-800 text-3xl">
              {sanitizeContent(details && details.LargeCta.image2)}
            </h2>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.LargeCta.image2)}
              onChange={(event) =>
                handleContentChange("LargeCta", "image2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="relative rounded-md overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={details && details.Team.image1}
                  className="h-100 w-100"
                  alt="Bryan Johnson"
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
                        onClick={() => handleEditImageClick("Team", "image1")}
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>
                  {/* <input
                    type="file"
                    ref={(ref) => (fileInputRefs.current["Team-image1"] = ref)}
                    onChange={(e) => handleImageChange(e, "Team", "image1")}
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 flex flex-col justify-center items-center p-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="space-x-4 text-white text-lg">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    href="http://www.dribbble.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-dribbble"></i>
                  </a>
                  <a
                    href="https://www.twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">
              {sanitizeContent(details && details.Team.summary1)}
            </h3>
            <p> {sanitizeContent(details && details.Team.header1)}</p>
            <div className="mb-6 px-4  lg:px- ">
              <div className="mt-7">
                <h1>Section header 1</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Team.summary1)}
                  onChange={(event) =>
                    handleContentChange("Team", "summary1", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <h1>Section header 2</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Team.header1)}
                  onChange={(event) =>
                    handleContentChange("Team", "header1", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="relative rounded-md overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={details && details.Team.image2}
                  className="h-100 w-100"
                  alt="Bryan Johnson"
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
                        onClick={() => handleEditImageClick("Team", "image2")}
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>
                  {/* <input
                    type="file"
                    ref={(ref) => (fileInputRefs.current["Team-image2"] = ref)}
                    onChange={(e) => handleImageChange(e, "Team", "image2")}
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 flex flex-col justify-center items-center p-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="space-x-4 text-white text-lg">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    href="http://www.dribbble.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-dribbble"></i>
                  </a>
                  <a
                    href="https://www.twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">
              {" "}
              {sanitizeContent(details && details.Team.summary2)}
            </h3>
            <p> {sanitizeContent(details && details.Team.header2)}</p>

            <div className="mb-6 px-4  lg:px- ">
              <div className="mt-7">
                <h1>Section header 1</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Team.summary2)}
                  onChange={(event) =>
                    handleContentChange("Team", "summary2", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <h1>Section header 2</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Team.header2)}
                  onChange={(event) =>
                    handleContentChange("Team", "header2", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="relative rounded-md overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={details && details.Team.image3}
                  className="h-100 w-100"
                  alt="Bryan Johnson"
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
                        onClick={() => handleEditImageClick("Team", "image3")}
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>
                  {/* <input
                    type="file"
                    ref={(ref) => (fileInputRefs.current["Team-image3"] = ref)}
                    onChange={(e) => handleImageChange(e, "Team", "image3")}
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 flex flex-col justify-center items-center p-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="space-x-4 text-white text-lg">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    href="http://www.dribbble.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-dribbble"></i>
                  </a>
                  <a
                    href="https://www.twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">
              {" "}
              {sanitizeContent(details && details.Team.summary3)}
            </h3>
            <p> {sanitizeContent(details && details.Team.header3)}</p>
            <div className="mb-6 px-4  lg:px- ">
              <div className="mt-7">
                <h1>Section header 1</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Team.summary3)}
                  onChange={(event) =>
                    handleContentChange("Team", "summary3", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <h1>Section header 2</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Team.header3)}
                  onChange={(event) =>
                    handleContentChange("Team", "header3", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
            </div>
          </div>

          {/* Team Member 4 */}
          <div className="text-center">
            <div className="relative rounded-md overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={details && details.Team.image4}
                  className="h-100 w-100"
                  alt="Bryan Johnson"
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
                        onClick={() => handleEditImageClick("Team", "image4")}
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>
                  {/* <input
                    type="file"
                    ref={(ref) => (fileInputRefs.current["Team-image4"] = ref)}
                    onChange={(e) => handleImageChange(e, "Team", "image4")}
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 flex flex-col justify-center items-center p-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="space-x-4 text-white text-lg">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    href="http://www.dribbble.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-dribbble"></i>
                  </a>
                  <a
                    href="https://www.twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">
              {" "}
              {sanitizeContent(details && details.Team.summary4)}
            </h3>
            <p> {sanitizeContent(details && details.Team.header4)}</p>
            <div className="mb-6 px-4  lg:px- ">
              <div className="mt-7">
                <h1>Section header 1</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Team.summary4)}
                  onChange={(event) =>
                    handleContentChange("Team", "summary4", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <h1>Section header 2</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Team.header4)}
                  onChange={(event) =>
                    handleContentChange("Team", "header4", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-yellow-500 text-white">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center p-8 lg:p-16">
          {/* Left Content */}
          <div className="container mx-auto gap-4 text-center">
            <h2 className="text-white text-lg font-bold">★★★★★</h2>
            <h1 className="text-4xl font-bold">
              {sanitizeContent(details && details.contactUs.heading1)}
            </h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.contactUs.heading1)}
              onChange={(event) =>
                handleContentChange("contactUs", "heading1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
            />

            <div className="inline-block mt-6">
              <a
                onClick={handleModalOpen}
                className="btn bg-black text-white text-base py-4 px-5 shadow-md  hover:bg-yellow-700 transition duration-300 mr-6"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-black text-white p-4 lg:px-32  lg:py-24">
          <div className="flex flex-wrap justify-between gap-8">
            {/* Contact */}
            <div>
              <h2 className="text-lg font-bold mb-4">{sanitizeContent(details && details.contactUs.heading2)}</h2>
              <p> {userDetails && userDetails.address
                    ? userDetails.address
                    : ""}</p>
              
              <p className="font-bold mt-4">{sanitizeContent(details && details.contactUs.heading5)}</p>
              <p>{sanitizeContent(details && details.contactUs.heading6)}</p>

              <h1 className="mt-7">Edit Contact 1</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.contactUs.heading2
                )}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
              <h1 className="mt-7">Edit Contact 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.contactUs.heading5
                )}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading5", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
              <h1 className="mt-7">Edit Contact 3</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.contactUs.heading6
                )}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading6", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />

            </div>

            {/* Work Time */}
            <div>
              <h2 className="text-lg font-bold mb-4">{sanitizeContent(details && details.footer.header)}</h2>
              <p>{sanitizeContent(details && details.footer.paragraph1)}</p>
              <p>{sanitizeContent(details && details.footer.paragraph2)}</p>
              <p>{sanitizeContent(details && details.footer.paragraph3)}</p>
              <p>{sanitizeContent(details && details.footer.paragraph4)}</p>
              <p>{sanitizeContent(details && details.footer.paragraph5)}</p>
              <p>{sanitizeContent(details && details.footer.paragraph6)}</p>
              
              <h1 className="mt-4">Edit footer 1</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.footer.header
                )}
                onChange={(event) =>
                  handleContentChange("footer", "header", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
              <h1 className="mt-2">Edit footer 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.footer.paragraph1
                )}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
              <h1 className="mt-2">Edit footer 3</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.footer.paragraph2
                )}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
              <h1 className="mt-2">Edit footer 4</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.footer.paragraph3
                )}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph3", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
              <h1 className="mt-2">Edit footer 5</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.footer.paragraph4
                )}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph4", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
              <h1 className="mt-2">Edit footer 6</h1>
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
              <h1 className="mt-2">Edit footer 7</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.footer.paragraph6
                )}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph6", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
            </div>

            {/* Subscribe */}
            <div>
              <h2 className="text-lg font-bold mb-4">Social Media</h2>

              {userDetails &&
              userDetails.socialMedia &&
              userDetails.socialMedia.length > 0 && (
                <div className="last-paragraph-no-margin xs:mb-6">
                  <span className="font-primary text-lg font-semibold text-dark-gray">
                    Follow on Social Media
                  </span>
                  <div className="h-px w-4/5 sm:w-full bg-dark-gray mt-2 mb-2"></div>
                  <div className="w-full">
                    <span className="font-primary block">
                      <span className="font-primary font-semibold text-dark-gray">
                        Instagram:
                      </span>{" "}
                      <a
                        href="https://instagram.com/"
                        className="hover:text-medium-gray text-yellow-600"
                      >
                        Instagram Handle
                      </a>
                    </span>
                    <span className="font-primary block">
                      <span className="font-primary font-semibold text-dark-gray">
                        Facebook:
                      </span>{" "}
                      <a
                        href="https://facebook.com/"
                        className="hover:text-medium-gray text-yellow-600"
                      >
                        Facebook Handle
                      </a>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditTemplate14;
