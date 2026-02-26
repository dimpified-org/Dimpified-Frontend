import React, { Fragment, useState, useEffect } from "react";
import {
  FaMousePointer,
  FaArrowRight,
  FaUser,
  FaEnvelope,
  FaCommentDots,
} from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { LoadingMany, LoadingSmall } from "../../component/LoadingSpinner";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import { EditTemplateLongInput } from "../../component/Inputs";
import { updateContent } from "../../features/Template/editTemplate";
import { ButtonSmallPurple } from "../../component/Buttons";
// import { useImageEditor } from "../../helper/UploadImage";
import api from "../../api/Template";
import { showToast } from "../../component/ShowToast";
import { PERMISSIONS } from "../../component/Permission/Creator";
import { getCurrencySymbol } from "../../helper/getCurrencySymbol";

// SalonTemplate Component
const Template11 = ({ userDetails, subdomain }) => {
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

  // Gallery Section
  const galleryItems = [
    {
      src: details ? details.Gallery.image1 : "",
      alt: "Image 1",
    },
    {
      src: details ? details.Gallery.image2 : "",
      alt: "Image 2",
    },
    {
      src: details ? details.Gallery.image3 : "",
      alt: "Image 3",
    },
    {
      src: details ? details.Gallery.image4 : "",
      alt: "Image 4",
    },
  ];

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

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState("");
  const [activeLink, setActiveLink] = useState("");

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink("");
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Fragment>
      <nav className="  px-4 py-4 lg:px-10 mt-10 w-full z-50  bg-primary2 ">
        {" "}
        {/* Use fixed to keep it at the top */}
        <div className=" container lg:pr-16 flex justify-between  items-center">
          {/* Logo */}
          <div className="relative container mx-auto flex items-center justify-between">
            <a
              href="#home"
              className="font-Marcellus font-bold text-white flex items-center"
            >
              <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
            </a>
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

            {/* Hamburger Icon for mobile view */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-black-600"
              aria-controls="navbar-collapse"
              aria-expanded={isOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-4">
              {["about", "services", "gallery", "reviews", "contact"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link}`}
                    className={`font-Marcellus font-semibold text-base ${
                      activeLink === link ? "text-purple-600" : "text-white"
                    } hover:text-gray-800`}
                    onMouseEnter={() => handleMouseEnter(link)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleLinkClick(link)}
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                )
              )}
            </div>

            {/* Book Appointment Button for Desktop */}
            <div className="hidden md:flex">
              <a
                href="#contact"
                className="bg-white text-gray-800 font-Marcellus font-semibold py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-200 flex items-center"
              >
                Book Appointment
                <FaArrowRight className="ml-2" />
              </a>
            </div>
          </div>
          {/* Mobile Navigation Links */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:hidden bg-white text-black space-y-2 absolute top-0 left-0 right-0 p-6`}
          >
            <div className="flex justify-between items-center">
              {/* Logo in mobile menu */}
              <a
                href="#home"
                className="font-Marcellus font-bold text-black flex items-center"
              >
                <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
              </a>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-black focus:outline-none"
                aria-controls="navbar-collapse"
                aria-expanded={isOpen}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Links */}
            {["about", "services", "gallery", "reviews", "contact"].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className="block text-black font-Marcellus font-semibold py-2 px-4"
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
              )
            )}

            {/* Book Appointment Button for Mobile */}
            <a
              href="#contact-section"
              className=" bg-white text-gray-800 font-Marcellus font-semibold py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-200 flex items-center"
            >
              Book Appointment
              <FaArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </nav>

      <>
        <section
          id="home"
          className="relative bg-dark-gray  flex items-center justify-between bg-cover bg-fixed bg-center"
          style={{
            backgroundImage: `url(${details && details.hero.backgroundImage1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {/* Content */}
          <div className="flex flex-col h-[400px] lg:h-[700px] py-4 px-4 lg:px-24 mt-40 ">
            {/* Text Section */}
            <div className="flex flex-wrap md:w-1/2">
              <h1 className="text-white text-4xl sm:text-[64px] lg:text-[90px] font-Marcellus font-bold leading-tight mb-6 tracking-wide">
                {userDetails && userDetails.ecosystemName
                  ? userDetails.ecosystemName
                  : ""}
                <br />
                {sanitizeContent(details && details.hero.title1)}
              </h1>
              <p className="text-[#fff] text-lg lg:text-2xl mb-10 w-3/4">
                {sanitizeContent(details && details.hero.title2)}
              </p>

              {/* Book Appointment Button */}
              <a
                href="#contact"
                className="bg-[#FFA085] text-black text-lg font-Marcellus font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-[#FFA085] transition-all inline-flex items-center relative group"
              >
                <span className="mr-2 group-hover:mr-8 transition-all">
                  Book appointment
                </span>

                {/* Icon on the left (hidden initially, appears on hover) */}
                <span className="btn-icon opacity-0 group-hover:opacity-100 absolute left-0 group-hover:mr-2 transition-all duration-300">
                  <i className="fa-solid fa-arrow-right text-sm"></i>
                </span>

                {/* Icon on the right (visible initially, disappears on hover) */}
                <span className="btn-icon transition-all group-hover:opacity-0 duration-300">
                  <i className="fa-solid fa-arrow-right text-sm"></i>
                </span>
              </a>
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
        </section>
      </>
      {/* edit hero section */}
      <div className="mb-10 px-4  lg:px- ">
        <h1>Edit Hero Section</h1>
        <div className="mt-7">
          <h1>Section header 1</h1>
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

      <Fragment>
        <section className="px-4 relative border-b bg-white border-color-extra-medium-gray font-Marcellus alt-font">
          {/* Left section with yellow box */}
          <div className="w-1/2 bg-white absolute -top-9 left-0 text-right">
            <div className="text-dark-gray text-[20px] leading-[30px] pt-1 pb-1 px-[25px] font-Marcellus font-bold inline-block bg-[#FFEA23]">
              {sanitizeContent(details && details.Statistics.section1header)}
            </div>
          </div>

          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            {/* Adjusting the layout to be vertical on mobile and horizontal on larger screens */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center border-b border-gray-300">
              {/* Left side: Best Hair salon */}
              <div className="w-full lg:w-1/2 pt-[40px] pb-[40px] pr-8 lg:pr-15 border-b lg:border-b-0 lg:border-r border-gray-300">
                <div className="flex items-center">
                  {/* Icon */}
                  <div className="mr-6">
                    <img
                      src="https://gfa-tech.com/dimp-template-images/images/demo-beauty-salon-icon-01.png"
                      className="h-[50px]"
                      alt="award icon"
                    />
                  </div>
                  {/* Text */}
                  <div>
                    <h6 className="text-dark-gray font-Marcellus font-medium text-[1.5rem] mb-0">
                      {sanitizeContent(
                        details && details.Statistics.section1paragraphy
                      )}
                    </h6>
                    <p className="text-gray-500">
                      {sanitizeContent(
                        details && details.Statistics.section1span
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side: Get 20% off */}
              <div className="w-full lg:w-1/2 pt-[40px] pb-[40px] pl-8 lg:pl-15">
                <h6 className="font-Marcellus font-medium text-[1.25rem] mb-0">
                  <a
                    href="#contact"
                    className="text-dark-gray hover:text-dark-gray-hover"
                  >
                    {sanitizeContent(
                      details && details.Statistics.section2header
                    )}
                  </a>
                  {/* Icon */}
                  <i className="bi bi-arrow-right align-middle text-[1.25rem] relative top-[3px] md:top-0 ml-2"></i>
                </h6>
              </div>
            </div>
          </div>
        </section>
        <div className="mb-10 mt-10 px-4  lg:px- ">
          <h1>Edit Statistics Section</h1>
          <div className="mt-7">
            <h1>Section header 1</h1>
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
          <div className="mt-7">
            <h1>Section header 2</h1>
            <EditTemplateLongInput
              value={sanitizeContent(
                details && details.Statistics.section1paragraphy
              )}
              onChange={(event) =>
                handleContentChange("Statistics", "section1paragraphy", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7">
            <h1>Section header 3</h1>
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
          </div>
          <div className="mt-7">
            <h1>Section header 4</h1>
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
        </div>
      </Fragment>

      <>
        {/* Main Section with Image and About Content */}
        <section id="about" className="bg-white py-16">
          <div className="flex flex-col h-full py-4 px-4 lg:px-32">
            <div className="flex flex-wrap items-center mb-12 sm:mb-10">
              {/* Left Image */}
              <div className="lg:w-7/12 mb-4 lg:mb-0 relative">
                <img
                  src={details && details.aboutUs.image1}
                  alt="Salon"
                  className="rounded-[20px] w-full object-cover"
                  style={{ height: "28rem" }}
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

              {/* Right Content */}
              <div className="lg:w-5/12 text-center lg:text-left lg:px-12">
                <span className="text-sm uppercase font-Marcellus font-semibold text-orange-900 mb-4 block">
                  {sanitizeContent(details && details.aboutUs.title1)}
                </span>
                <h2 className="text-4xl font-Marcellus font-bold text-gray-900 mb-4">
                  {sanitizeContent(details && details.aboutUs.title2)}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {sanitizeContent(details && details.aboutUs.text1)}
                </p>

                <a
                  href="#contact"
                  className="bg-gray-800 text-white text-lg font-Marcellus font-semibold py-2 px-4 rounded-lg mt-6 hover:bg-gray-700 transition-all"
                >
                  Book Your Style &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* edit about us section */}
        <div className="mb-16 mt-5 px-4  lg:px- ">
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
          </div>
          <div className="mt-7">
            <h1>Section header 2</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.aboutUs.title2)}
              onChange={(event) =>
                handleContentChange("aboutUs", "title2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7">
            <h1>Section header 3</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.aboutUs.text1)}
              onChange={(event) =>
                handleContentChange("aboutUs", "text1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
        </div>

        {/* Service Features Section */}
        <section className="bg-white py-12 border-b border-gray-200">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center">
            {[
              {
                number: "01",
                title: "Precision braids",
                description: "Tailored to your unique style",
              },
              {
                number: "02",
                title: "Ethically Sourced",
                description: "Sustainable products",
              },
              {
                number: "03",
                title: "Certified Stylists",
                description: "Skilled and trained professionals",
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`flex items-center mb-12 md:mb-0 ${
                  index > 0 ? "md:pl-8" : ""
                }`}
              >
                <div className="flex items-center space-x-5">
                  <span className="text-3xl font-Marcellus font-semibold text-gray-900">
                    {service.number}
                  </span>
                  <span className="text-orange-500 text-2xl">—</span>
                  <div className="text-left">
                    <h4 className="text-xl font-Marcellus font-semibold text-gray-900 mb-1">
                      {service.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>

                {index < 2 && (
                  <div className="hidden md:block h-12 border-l border-gray-300 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        </section>
      </>

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

      <>
        <section
          id="services"
          className="px-4 py-12 bg-white border-b border-gray-200"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-10">
              <span className="text-lg uppercase font-Marcellus font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#2e3844] via-[#455161] to-[#db7f68]">
                Hairstyling Services
              </span>
              <h3 className="mt-2 font-Marcellus text-2xl font-normal text-gray-700 tracking-tight">
                Expert Hair Solutions
              </h3>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  img: "https://gfa-tech.com/dimp-template-images/hairstylist/treatment-img.jpg",
                  title: "Hair Treatment",
                  description: "Revitalize and nourish your hair.",
                },
                {
                  img: "https://gfa-tech.com/dimp-template-images/hairstylist/hairstyle-img.jpg",
                  title: "Hair Styling",
                  description: "Transform your look with expert styling.",
                },
                {
                  img: "//gfa-tech.com/dimp-template-images/hairstylist/braids.jpg",
                  title: "Braiding",
                  description: "Traditional and contemporary braiding styles.",
                },
                {
                  img: "//gfa-tech.com/dimp-template-images/hairstylist/weaving-img.jpg",
                  title: "Weaving",
                  description: "Seamless weaving for natural-looking hair.",
                },
                {
                  img: "//gfa-tech.com/dimp-template-images/hairstylist/dye-img.jpg",
                  title: "Hair Coloring",
                  description: "Bold and beautiful color treatments.",
                },
                {
                  img: "//gfa-tech.com/dimp-template-images/hairstylist/grooming-img.jpg",
                  title: "Hair Grooming",
                  description: "Precision cuts for all hair types.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="relative h-72 md:h-56 overflow-hidden group">
                    <a
                      href="#contact"
                      className="relative block w-full h-full overflow-hidden group"
                    >
                      <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
                      />
                    </a>

                    <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href="#contact"
                        className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center"
                      >
                        <FaArrowRight className="text-white text-3xl" />
                      </a>
                    </div>
                  </div>

                  <div className="p-6 text-center">
                    <h5 className="text-lg font-Marcellus font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h5>
                    <p className="text-gray-500">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>

      <div>
        {/* Text and Information Section */}
        <section id="gallery" className="px-4 py-8 bg-white">
          <div className="flex flex-col md:flex-row items-center px-4 lg:px-24">
            <div className="w-full md:w-9/12 mb-4 md:mb-0">
              <h3 className="font-Marcellus text-bold text-3xl md:text-4xl tracking-tight">
                {sanitizeContent(details && details.Gallery.summary1)}
              </h3>
              <p className="text-gray-600 mt-4">
                {sanitizeContent(details && details.Gallery.summary2)}
              </p>
            </div>
          </div>
        </section>

        <div className="mb-10 mt-10 px-4  lg:px- ">
          <h1>Edit Gallery Section</h1>
          <div className="mt-7">
            <h1>Section header 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Gallery.summary1)}
              onChange={(event) =>
                handleContentChange("Gallery", "summary1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7">
            <h1>Section header 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Gallery.summary2)}
              onChange={(event) =>
                handleContentChange("Gallery", "summary2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
        </div>

        {/* Swiper Gallery Section */}
        <section id="gallery" className="px-6 pb-8 bg-yellow-50 relative">
          <div className="flex flex-col h-full py-4 px-4 lg:px-20">
            <div className="w-full flex justify-center py-6">
              <h2 className="font-limelight text-4xl font-bold text-gray-800">
                Featured{" "}
                <span className="relative text-yellow-600">
                  gallery
                  <span className="block w-full h-[2px] bg-yellow-600 absolute bottom-[-8px] left-0"></span>
                </span>
              </h2>
            </div>

            {/* Gallery grid with 4 columns on large screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryItems.map((img, index) => (
                <div
                  key={index}
                  className="relative w-full transition-transform transform hover:scale-105"
                >
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={img.src}
                      className="w-full h-64 object-cover transition-transform duration-300 ease-in-out"
                      alt={img.alt}
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
                              handleEditImageClick(
                                "Gallery",
                                `image${index + 1}`
                              )
                            }
                          >
                            {loadingImage ? <LoadingSmall /> : "Edit Image"}
                          </ButtonSmallPurple>
                        ) : null*/}
                      </div>
                      {/* <input
                        type="file"
                        ref={(ref) =>
                          (fileInputRefs.current[`Gallery-image${index + 1}`] =
                            ref)
                        }
                        onChange={(e) =>
                          handleImageChange(e, "Gallery", `image${index + 1}`)
                        }
                        style={{ display: "none" }}
                      /> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="Hair px-4 relative bg-white">
        {/* Decorative Mouse Pointer */}
        <div className="hidden md:flex mb-4">
          <a href="#down-section" className="absolute inset-x-0 mx-auto top-0">
            <div className="flex justify-center items-center mx-auto rounded-full h-[70px] w-[70px] text-[22px] text-dark-gray bg-white shadow">
              <FaMousePointer />
            </div>
          </a>
        </div>

        {/* Main Content */}
        <div className="flex flex-col h-full py-4 px-4 lg:px-24">
          <div className="flex flex-col lg:flex-row justify-center mb-4 items-center lg:items-start">
            {/* Left Section */}
            <div className="lg:w-1/3 md:w-5/12 px-6 pt-12 pb-12 lg:p-8 text-left flex flex-col items-center lg:items-start">
              <span className="text-lg uppercase font-Marcellus font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#2e3844] via-[#455161] to-[#db7f68] via-[#e17a60] to-[#e47256]">
                {sanitizeContent(details && details.Blog.header1)}
              </span>
              <h2 className="font-Marcellus alt-font text-4xl text-dark-gray font-bold mt-2 leading-tight text-center lg:text-left">
                {sanitizeContent(details && details.Blog.summary1)}
              </h2>
              <button
                className="bg-gray-800 text-white text-lg font-Marcellus font-semibold py-3 px-6 rounded-lg mt-6 hover:bg-gray-700 transition-all"
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                {sanitizeContent(details && details.Blog.buttonText1)} &rarr;
              </button>
            </div>

            {/* Middle Section - Image */}
            <div className="lg:w-1/2 md:w-6/12 sm:w-11/12 relative flex justify-center">
              <div className="relative">
                {/* Main Image */}
                <img
                  src={details && details.Blog.image1}
                  className="w-full rounded-lg h-[600px]"
                  alt="Client Review"
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

                {/* Decorative Story Image */}
                <div className="absolute left-[-40px] lg:left-[-70px] bottom-[-30px] lg:bottom-[-50px] hidden sm:flex items-center justify-center w-[140px] h-[140px] lg:w-[120px] lg:h-[120px] bg-white rounded-full shadow-xl">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/images/demo-beauty-salon-story-02.png"
                    className="w-[70px] lg:w-[100px] absolute"
                    alt="Decorative Story"
                  />
                </div>
              </div>
              <img
                src="https://gfa-tech.com/dimp-template-images/images/demo-yoga-and-meditation-about-02.png"
                className="absolute top-[65px] right-[-150px] hidden md:block"
                alt="Decorative Element"
              />
            </div>

            {/* Right Section - Info */}
            <div className="lg:w-1/2 md:w-5/12 flex flex-col justify-start px-6 pt-24 pb-12 lg:p-8 text-left items-center lg:items-start">
              <div className="relative">
                <img
                  src={details && details.Blog.image4}
                  className="mb-5 w-[70px] lg:w-[150px]"
                  alt="Company Logo"
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
                        onClick={() => handleEditImageClick("Blog", "image4")}
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>
                  {/* <input
                    type="file"
                    ref={(ref) => (fileInputRefs.current["Blog-image4"] = ref)}
                    onChange={(e) => handleImageChange(e, "Blog", "image4")}
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
              <h6 className="font-Marcellus alt-font text-3xl text-dark-gray font-bold leading-tight mb-4 text-center lg:text-left">
                {sanitizeContent(details && details.Blog.header2)}
              </h6>
              <p className="primary-font font-Marcellus text-lg text-gray-700 mt-2 mb-4 text-center lg:text-left">
                {sanitizeContent(details && details.Blog.summary2)}
              </p>
              <div className="flex items-center justify-center lg:justify-start">
                <h2 className="text-dark-gray font-Marcellus alt-font text-4xl ">
                  {sanitizeContent(details && details.Blog.date2)}
                </h2>
                <div className="border-l border-gray-300 pl-6 ml-6 text-left">
                  <div className="flex items-center bg-light-gray text-[22px] leading-[28px] ">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <span className="text-lg uppercase font-Marcellus font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#2e3844] via-[#455161] to-[#db7f68] via-[#e17a60] to-[#e47256]">
                      {sanitizeContent(details && details.Blog.author2)}
                    </span>
                  </div>
                  <span className="primary-font font-Marcellus text-[16px] font-medium leading-[22px] text-dark-gray">
                    {sanitizeContent(details && details.Blog.content2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* edit hero section */}
      <div className="mb-16 px-4  lg:px- ">
        <h1 className="mt-5">Edit Blog Section</h1>
        <div className="mt-7">
          <h1>Section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Blog.header1)}
            onChange={(event) => handleContentChange("Blog", "header1", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h1>Section header 2</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Blog.summary1)}
            onChange={(event) => handleContentChange("Blog", "summary1", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h1>Section header 3</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Blog.buttonText1)}
            onChange={(event) =>
              handleContentChange("Blog", "buttonText1", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h1>Section header 4</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Blog.header2)}
            onChange={(event) => handleContentChange("Blog", "header2", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h1>Section header 5</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Blog.summary2)}
            onChange={(event) => handleContentChange("Blog", "summary2", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h1>Section header 6</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Blog.date2)}
            onChange={(event) => handleContentChange("Blog", "date2", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h1>Section header 7</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Blog.author2)}
            onChange={(event) => handleContentChange("Blog", "author2", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h1>Section header 8</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Blog.content2)}
            onChange={(event) => handleContentChange("Blog", "content2", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
      </div>

      <section id="contact" className="bg-gray-100 py-12">
        <div className="flex flex-col h-full py-4 px-4 lg:px-24 lg:flex-row items-start justify-between space-y-12 lg:space-y-0">
          {/* Left Side (Contact Info) */}
          <div className="lg:w-1/2 w-full">
            <span className="text-orange-500 text-lg font-Marcellus font-bold uppercase tracking-widest">
              {sanitizeContent(details && details.contactUs.heading1)}
            </span>
            <div className="mt-7">
              <h1>Edit Contact 1</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading1)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
            <h2 className="text-4xl font-Marcellus font-semibold text-gray-800 mt-2 mb-10">
              {sanitizeContent(details && details.contactUs.heading2)}
            </h2>
            <div className="mt-7">
              <h1>Edit Contact 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading2)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
            {/* First Row: Visit our Hair salon and Book an appointment */}
            <div className="flex flex-col lg:flex-row lg:justify-between mb-5">
              {/* Visit our Hair salon */}
              <div className="lg:w-1/2 w-full lg:mr-4 mb-6 lg:mb-0">
                <h3 className="text-xl font-Marcellus font-semibold text-gray-700">
                  {sanitizeContent(details && details.contactUs.heading3)}
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600 font-Marcellus">
                  {userDetails && userDetails.address
                    ? userDetails.address
                    : ""}
                </p>
              </div>
              {/* Book an appointment */}
              <div className="lg:w-1/2 w-full">
                <h3 className="text-xl font-Marcellus font-semibold text-gray-700">
                  {sanitizeContent(details && details.contactUs.heading5)}
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600">
                  <a
                    href="mailto:info@yourdomain.com"
                    className="underline font-Marcellus"
                  >
                    {sanitizeContent(details && details.contactUs.heading6)}
                  </a>
                  <br />
                  <a
                    href="mailto:booking@yourdomain.com"
                    className="underline font-Marcellus"
                  >
                    {sanitizeContent(details && details.contactUs.heading7)}
                  </a>
                </p>
              </div>
            </div>
            {/* Second Row: Let's talk and Opening hours */}
            <div className="flex flex-col lg:flex-row lg:justify-between mb-5">
              {/* Let's talk */}
              <div className="lg:w-1/2 w-full lg:mr-4 mb-6 lg:mb-0">
                <h3 className="text-xl font-Marcellus font-semibold text-gray-700">
                  {sanitizeContent(details && details.Reviews.header1)}
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600 font-Marcellus">
                  <a href="tel:1800222000">
                    {sanitizeContent(details && details.Reviews.title1)}
                  </a>
                  <br />
                  {sanitizeContent(details && details.Reviews.summary1)}
                </p>
              </div>
              {/* Opening hours */}
              <div className="lg:w-1/2 w-full">
                <h3 className="text-xl font-Marcellus font-semibold text-gray-700">
                  {sanitizeContent(details && details.Reviews.header2)}
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600 font-Marcellus">
                  {sanitizeContent(details && details.Reviews.summary2)}
                  <br />
                  {sanitizeContent(details && details.Reviews.title2)}
                </p>
              </div>
            </div>
            <div className="mt-7">
              <h1>Edit contact 3</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading3)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading3", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Edit contact 4</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading5)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading5", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Edit contact 5</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading6)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading6", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Edit contact 6</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading7)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading7", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>
          {/* Right Side (Form) */}
          <div className="lg:w-1/2 w-full relative">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg ml-auto relative">
              {/* Heading */}
              <h2 className="text-3xl font-Marcellus font-bold text-white mb-8">
                Book Now!
              </h2>

              {/* Form */}
              <form className="space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <FaUser className="text-gray-400 mb-2" />
                  <input
                    type="text"
                    placeholder="Enter your name*"
                    className="w-full border-b border-gray-400 bg-transparent text-gray-300 placeholder-gray-400 py-2 focus:outline-none focus:border-white"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <FaEnvelope className="text-gray-400 mb-2" />
                  <input
                    type="email"
                    placeholder="Enter your email address*"
                    className="w-full border-b border-gray-400 bg-transparent text-gray-300 placeholder-gray-400 py-2 focus:outline-none focus:border-white"
                    required
                  />
                </div>

                {/* Service Input */}
                <div className="relative">
                  <FaCommentDots className="text-gray-400 mb-2" />
                  <textarea
                    placeholder="Which service would you like to book?"
                    className="w-full border-b border-gray-400 bg-transparent text-gray-300 placeholder-gray-400 py-2 focus:outline-none focus:border-white"
                    rows="2"
                    required
                  />
                </div>

                {/* Special Requests Input */}
                <div>
                  <textarea
                    placeholder="Any special requests or notes"
                    className="w-full border-b border-gray-400 bg-transparent text-gray-300 placeholder-gray-400 py-2 focus:outline-none focus:border-white"
                    rows="4"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-4 bg-white text-gray-900 py-3 px-8 rounded shadow-md font-Marcellus font-semibold hover:bg-gray-100 transition-colors"
                >
                  Book Appointment
                </button>
              </form>

              {/* Decorative Circle with Image */}
            </div>
            <div className="mt-7 ml-5 ">
              <h1>Edit Contact 7</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Reviews.header1)}
                onChange={(event) =>
                  handleContentChange("Reviews", "header1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Edit Contact 8</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Reviews.title1)}
                onChange={(event) =>
                  handleContentChange("Reviews", "title1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Edit Contact 9</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Reviews.summary1)}
                onChange={(event) =>
                  handleContentChange("Reviews", "summary1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Edit Contact 10</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Reviews.header2)}
                onChange={(event) =>
                  handleContentChange("Reviews", "header2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Edit Contact 11</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Reviews.summary2)}
                onChange={(event) =>
                  handleContentChange("Reviews", "summary2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Edit Contact 12</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Reviews.title2)}
                onChange={(event) =>
                  handleContentChange("Reviews", "title2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className=" flex flex-col px-4 lg:px-24 bg-gradient-to-r from-[#2c3846] via-[#333945] to-[#8b4d41] ">
        <div className=" flex flex-col lg:flex-row justify-center pt-[55px] pb-[55px] sm:pt-[40px] sm:pb-[40px] text-center sm:text-center lg:text-left">
          {/* Footer Logo */}
          <div className="lg:w-1/4 md:w-1/2 sm:w-full mb-6">
            <div className="relative">
              <a href="#home" className="footer-logo inline-block mb-4">
                <img
                  src={details && details.footer.logo}
                  alt="Logo"
                  width="146"
                  height="42"
                  className="mx-auto lg:mx-0"
                />
              </a>
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
                      onClick={() => handleEditImageClick("footer", "logo")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null*/}
                </div>
                {/* <input
                  type="file"
                  ref={(ref) => (fileInputRefs.current["footer-logo"] = ref)}
                  onChange={(e) => handleImageChange(e, "footer", "logo")}
                  style={{ display: "none" }}
                /> */}
              </div>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="lg:w-1/4 md:w-1/2 sm:w-full mb-6">
            <span className="primary-font font-Marcellus block text-[#FFA085] text-sm mb-[5px] uppercase font-semibold">
              {sanitizeContent(details && details.footer.header)}
            </span>
            <p className="primary-font font-Marcellus leading-[30px] text-white">
              {userDetails && userDetails.address && userDetails.address}
            </p>
          </div>

          {/* Need Support */}
          <div className="lg:w-1/4 md:w-1/2 sm:w-full mb-6">
            <span className="primary-font block text-[#FFA085] text-sm mb-[5px] uppercase font-Marcellus font-semibold">
              {sanitizeContent(details && details.footer.title2)}
            </span>
            <a
              href="tel:08012345678"
              className="text-white font-Marcellus block"
            >
              {sanitizeContent(details && details.footer.title3)}
            </a>
            <a
              href="mailto:info@yourdomain.com"
              className="text-white font-Marcellus block"
            >
              {sanitizeContent(details && details.footer.title4)}
            </a>
          </div>

          {/* Connect with Us */}
          <div className="lg:w-1/4 md:w-1/2 sm:w-full mb-6">
            <span className="primary-font block text-[#FFA085] text-sm mb-[10px] uppercase font-Marcellus font-semibold">
              Connect with us
            </span>
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

        <div className=" pt-[20px] pb-[20px] border-t border-gray-300 text-center text-white">
          <p className=" text-white mt-4 text-sm sm:text-center">
            © 2024 Proudly Powered by{" "}
            <a
              href="https://www.dimpified.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white"
            >
              DIMP
            </a>
          </p>
        </div>

        {/* Bottom Section */}
      </footer>
    </Fragment>
  );
};
export default Template11;
