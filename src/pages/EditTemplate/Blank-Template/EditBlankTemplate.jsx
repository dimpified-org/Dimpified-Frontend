import React, { useRef, Fragment, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import api from "../../../api/Template";
import { showToast } from "../../../component/ShowToast";
import { PERMISSIONS } from "../../../component/Permission/Creator";
import axios from "axios";
import { LoadingMany, LoadingSmall } from "../../../component/LoadingSpinner";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import { EditTemplateLongInput } from "../../../component/Inputs";
import { updateContent } from "../../../features/Template/editTemplate";
import { ButtonSmallPurple } from "../../../component/Buttons";
// import { useImageEditor } from "../../../helper/UploadImage";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BookingModal from "../../../features/Booking/BookingModal";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaRegCalendarAlt,
  FaMouse,
  FaArrowRight,
  FaPhoneAlt,
} from "react-icons/fa";

const BlankTemplate = ({ userDetails, subdomain }) => {
  const [services, setServices] = useState([]);
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
        setServices(allServices);
      } catch (error) {
        console.log("not working", error);
      } finally {
        console.log("finish loading");
      }
    };
    getServiceeDetails();
  }, []);

  // List of images
  // Extracting gallery images dynamically and safely
  const images = Array.from(
    { length: 6 },
    (_, index) => details?.Gallery[`image${index + 1}`] || ""
  );

  const [isOpen, setIsOpen] = useState(false);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

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

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  // Utility function to chunk images

  // Utility function for chunking the array
  const chunkArray = (array, chunkSize) => {
    return array.reduce((result, _, index) => {
      if (index % chunkSize === 0) {
        result.push(array.slice(index, index + chunkSize));
      }
      return result;
    }, []);
  };

  // Group images into chunks of 3
  const imageChunks = chunkArray(images, 3);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  return (
    <Fragment>
      {/* Navbar Section */}

      <nav className="font-jak bg-white px-4 py-4 lg:px-10  w-full z-50">
        <div className=" relative container mx-auto flex items-center justify-between">
          <a href="#home" className="font-bold flex items-center">
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
                  {loadingImage ? <LoadingSmall /> : "Edit Logo"}
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
          <button
            onClick={toggleMenu}
            className="lg:hidden text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Mobile Menu */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } lg:hidden absolute top-16 left-0 w-full bg-white shadow-lg transition-all duration-300`}
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              <a
                href="#about"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </a>
              <a
                href="#services"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Services
              </a>
              <a
                href="#pricing"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#gallery"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </a>

              <a
                href="#testimonials"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </a>
              <a
                href="#team"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Team
              </a>
              <a
                href="#contact"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>

              <button
                onClick={handleModalOpen}
                className="px-8 py-4 rounded-full shadow-lg text-black bg-white hover:bg-gray-500 flex items-center justify-center gap-2"
              >
                <span className="font-semibold hover:text-gray-100">
                  {sanitizeContent(details && details.navbar.buttonText1)}
                </span>
              </button>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.navbar.buttonText1)}
                onChange={(event) =>
                  handleContentChange("navbar", "buttonText1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8 mx-auto">
            <a
              href="#about"
              className="font-semibold text-base hover:text-gray-700"
            >
              About Us
            </a>
            <a
              href="#services"
              className="font-semibold text-base hover:text-gray-700"
            >
              Services
            </a>
            <a
              href="#gallery"
              className="font-semibold text-base hover:text-gray-700"
            >
              Gallery
            </a>
            <a
              href="#pricing"
              className="font-semibold text-base hover:text-gray-700"
            >
              Pricing
            </a>
            <a
              href="#team"
              className="font-semibold text-base hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Team
            </a>
            <a
              href="#testimonials"
              className="font-semibold text-base hover:text-gray-700"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="font-semibold text-base hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </div>
          <div>
            <button
              onClick={handleModalOpen}
              className="px-8 py-4 rounded-full shadow-lg text-white bg-gray-600 hover:bg-gray-500 flex items-center justify-center gap-2"
            >
              <span className="font-semibold hover:text-gray-100">
                {sanitizeContent(details && details.navbar.buttonText1)}
              </span>
            </button>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.navbar.buttonText1)}
              onChange={(event) =>
                handleContentChange("navbar", "buttonText1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section
        id="home"
        className="relative font-jak px-4 h-screen bg-dark-gray"
        style={{
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-lvh flex flex-col items-center justify-center">
          <div className="text-center">
            <span className="text-lg text-black uppercase tracking-wider block mb-6 sm:mb-4">
              {sanitizeContent(details && details.hero.title1)}
            </span>
            <h1 className="font-jak text-[2rem] lg:text-[6rem] px-4 lg:px-48 leading-none tracking-normal text-black mb-8 md:mb-5 shadow-lg">
              {sanitizeContent(details && details.hero.title2)}
            </h1>
            <div className="flex items-center justify-center">
              <button
                onClick={handleModalOpen}
                className="px-8 py-4 rounded-full shadow-lg text-black bg-white hover:bg-gray-500 flex items-center justify-center gap-2"
              >
                <span className="font-semibold hover:text-gray-100">
                  {sanitizeContent(details && details.hero.buttonText1)}
                </span>
              </button>
              {isModalOpen && (
                <BookingModal
                  isOpen={isModalOpen}
                  handleClose={handleModalClose}
                />
              )}
            </div>
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
              onChange={(e) => handleImageChange(e, "hero", "backgroundImage1")}
              style={{ display: "none" }}
            /> */}
          </div>
        </div>
      </section>
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
        <h1>Section Button 1</h1>
        <EditTemplateLongInput
          value={sanitizeContent(details && details.hero.buttonText1)}
          onChange={(event) =>
            handleContentChange("hero", "buttonText1", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>
      {/* 
      <section
        className="font-jost relative bg-cover bg-center h-[600px]"
        style={{
          backgroundImage: "url(https://dummyimage.com/1280x520/000/000)",
        }}
      >
        {isModalOpen && (
          <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
        )}
        <div className="inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        <div className="container mx-auto h-full flex items-center px-4 lg:px-12">
          <div className="text-white w-full text-center lg:text-left sm:text-center lg:w-1/2">
            <p className="mb-4 text-sm lg:text-lg font-bold mt-6">
              {sanitizeContent(details && details.hero.summary1)}
            </p>
            <h1 className="font-bold font-jost text-4xl lg:text-7xl mb-4 leading-snug">
              {sanitizeContent(details && details.hero.summary2)}
            </h1>
            <button
              className="text-white border border-white text-center font-semibold py-2 px-4 rounded-lg hover:bg-orange-950"
              onClick={handleModalOpen}
            >
              {sanitizeContent(details && details.hero.buttonText2)}
            </button>
          </div>
        </div>
      </section>
      <div className="mt-7">
        <h1>Section header 1</h1>
        <EditTemplateLongInput
          value={sanitizeContent(details && details.hero.summary1)}
          onChange={(event) => handleContentChange("hero", "summary1", event)}
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <h1>Section header 2</h1>
        <EditTemplateLongInput
          value={sanitizeContent(details && details.hero.summary2)}
          onChange={(event) => handleContentChange("hero", "summary2", event)}
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <h1>Section Button 1</h1>
        <EditTemplateLongInput
          value={sanitizeContent(details && details.hero.buttonText2)}
          onChange={(event) =>
            handleContentChange("hero", "buttonText2", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div> */}

      {/* About Section */}
      <section id="about" className="px-4 font-jak bg-gray-50 relative pb-8">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-32">
          <div className="flex flex-wrap items-center mb-12 sm:mb-10">
            {/* Text Section */}
            <div className="font-jak w-full xl:w-5/12 lg:w-6/12 mt-4 xl:mt-6 md:mt-8 xs:mt-10">
              <h2 className="font-jak text-5xl font-light tracking-normal text-gray-800 mb-4">
                {sanitizeContent(details && details.aboutUs.title1)}
              </h2>
              <p className="w-11/12 xl:w-full mb-8 sm:mb-6">
                {sanitizeContent(details && details.aboutUs.text1)}
              </p>

              <div className="inline-block">
                <a
                  href="#services"
                  className="inline-flex items-center text-white bg-gray-500 hover:bg-gray-600 text-lg px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
                >
                  {sanitizeContent(details && details.aboutUs.buttonText1)}
                  <FaArrowRight className="ml-2" />
                </a>
              </div>
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
                  value={sanitizeContent(details && details.aboutUs.text1)}
                  onChange={(event) =>
                    handleContentChange("aboutUs", "text1", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <h1>Button text 1</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.aboutUs.buttonText1
                  )}
                  onChange={(event) =>
                    handleContentChange("aboutUs", "buttonText1", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-6/12 xl:pl-8 relative mt-12 md:mt-10">
              <div className="relative w-9/12 md:w-7/12 transition-transform transform hover:scale-105">
                <img
                  src={details && details.aboutUs.image1}
                  className="rounded-lg  w-auto"
                  alt="font-jak Studio"
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
              <div className="absolute right-4 -bottom-16 w-8/12 lg:w-7/12 overflow-hidden rounded-lg shadow-xl">
                <img
                  src={details && details.aboutUs.image2}
                  alt="font-jak's Work"
                  className="rounded-lg"
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
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center gap-8 mt-10">
          <div>
            <h2 className="font-semibold  text-3xl text-yellow-950 m-0">
              {sanitizeContent(details && details.Statistics.section1header)}
            </h2>
            <p className="text-yellow-950">
              {sanitizeContent(
                details && details.Statistics.section1paragraphy
              )}
            </p>

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
          </div>
          <div>
            <h2 className="font-semibold  text-3xl text-yellow-950 m-0">
              {sanitizeContent(details && details.Statistics.section2header)}
            </h2>
            <p className="text-yellow-950">
              {sanitizeContent(
                details && details.Statistics.section2paragraphy
              )}
            </p>

            <div className="mt-7">
              <h1>Section header 1</h1>
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
              <h1>Section header 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.Statistics.section2paragraphy
                )}
                onChange={(event) =>
                  handleContentChange("Statistics", "section2paragraphy", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>
          <div>
            <h2 className="font-semibold  text-3xl text-yellow-950 m-0">
              {sanitizeContent(details && details.Statistics.section3header)}
            </h2>
            <p className="text-yellow-950">
              {sanitizeContent(
                details && details.Statistics.section3paragraphy
              )}
            </p>
            <div className="mt-7">
              <h1>Section header 1</h1>
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
              <h1>Section header 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.Statistics.section3paragraphy
                )}
                onChange={(event) =>
                  handleContentChange("Statistics", "section3paragraphy", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>
          <div>
            <h2 className="font-semibold  text-3xl text-yellow-950 m-0">
              {sanitizeContent(details && details.Statistics.section4header)}
            </h2>
            <p className="text-yellow-950">
              {sanitizeContent(
                details && details.Statistics.section4paragraphy
              )}
            </p>
            <div className="mt-7">
              <h1>Section header 1</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.Statistics.section4header
                )}
                onChange={(event) =>
                  handleContentChange("Statistics", "section4header", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Section header 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.Statistics.section4paragraphy
                )}
                onChange={(event) =>
                  handleContentChange("Statistics", "section4paragraphy", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Statistics Section */}

      <section
        id="services"
        className="relative font-jak bg-gray-100 px-4 pt-4 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute left-0 top-[-50px] md:top-[-30px] w-full h-[100px] md:h-[50px] bg-no-repeat bg-left-top bg-cover"></div>

        {/* Floating Image */}
        <div className="absolute left-0 top-[-130px] lg:top-[-90px] hidden md:block">
          <img
            src=""
            alt="Floating Image"
            className="transition-transform translate-y-[50px] will-change-transform"
            onLoad={(e) =>
              (e.currentTarget.style.transform = "translateY(-50px)")
            }
          />
        </div>

        <div className="flex flex-col h-full py-4 px-4 lg:px-20">
          {/* Title Section */}
          <div className="text-center mb-6">
            <h2 className="font-jak text-4xl font-bold text-gray-800">
              Our Services
            </h2>
          </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="text-center px-12 lg:px-8 py-10 border-gray-200"
              >
                <div className="relative mb-6 ">
                  {/* <img src={service.serviceImage} className="rounded-md" /> */}
                </div>
                <span className="text-lg font-semibold text-gray-800 block mb-2">
                  {service.name}
                </span>
                <p className="leading-7 text-gray-600">
                  {service.shortDescription}
                </p>
                <div className="border-t border-b border-gray-200 py-2 my-4">
                  <span className="text-sm font-bold text-gray-800">
                    # {service.price}
                  </span>
                </div>
                <div className="bg-gray-800 hover:bg-gray-600  rounded-lg text-white py-2">
                  <a
                    href="#"
                    onClick={handleModalOpen}
                    className="flex justify-center items-center gap-2 text-sm"
                  >
                    Book Service <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Message */}
          <div className="text-center">
            <p className="text-lg text-gray-800 inline-block ml-2">
              Service buttom note - optional
            </p>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="font-jak px-4 bg-very-light-gray relative py-10"
      >
        <section className="px-6 py-12">
          <div className="max-w-6xl text-center mx-auto gap-8">
            <h1 className="text-center">Services Section</h1>
            <div className="flex flex-col mt-10 justify-end">
              <button className="bg-sec8 p-4 text-primary1 rounded-md">
                Section Not Editable, Edit your services to reflect your pricing
                list
              </button>
              <p>You can edit your service in the edit service page</p>
            </div>
          </div>
        </section>
        <div className="flex flex-col h-full  py-4 px-4 lg:px-20">
          <div className="row mb-6">
            <div className="col-12 text-center">
              <h2 className="font-jak text-4xl font-bold text-gray-800">
                Pricing list
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:mb-2">
            {services.map((item, index) => (
              <div
                key={index}
                className={`col ${
                  item.special ? "border border-light-gray rounded" : ""
                } p-0`}
              >
                <div
                  className={`w-full px-8 py-4 ${
                    item.special ? "bg-light-gray text-dark-gray" : ""
                  }`}
                >
                  <div className="text-lg flex items-baseline w-full">
                    <span className="font-bold text-dark-gray flex-grow">
                      {item.name}
                    </span>
                    <div className="text-dark-gray">#{item.price}</div>
                  </div>
                  <div className="text-md flex items-baseline w-full">
                    <span className="font-bold text-dark-gray w-16 flex-grow">
                      <p>{item.shortDescription}</p>
                    </span>
                    <div className="rounded bg-gray-600 hover:bg-gray-500 text-white py-2 px-2 ">
                      <a
                        onClick={handleModalOpen}
                        className="flex justify-center text-center items-center gap-2 text-sm"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="px-6 pb-8 bg-gray-50 relative">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-20">
          <div className="w-full flex justify-center py-6">
            <h2 className="font-jak text-4xl font-bold text-gray-800">
              Gallery Section
            </h2>
          </div>

          {imageChunks.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className="flex flex-wrap justify-center items-center gap-6 mb-8"
            >
              {chunk.map((img, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative w-full sm:w-1/2 md:w-3/12 transition-transform transform hover:scale-105"
                >
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={img || ""}
                      className="w-full h-64 object-cover transition-transform duration-300 ease-in-out"
                      alt={`Gallery Image ${
                        chunkIndex * chunk.length + imgIndex + 1
                      }`}
                    />
                    {userPlan && userPermissions.canEditImage && (
                      <div
                        className="absolute top-0 left-0 z-10"
                        style={{ width: "250px" }}
                      >
                        <ButtonSmallPurple
                          onClick={() =>
                            handleEditImageClick(
                              "Gallery",
                              `image${chunkIndex * chunk.length + imgIndex + 1}`
                            )
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                        {/* <input
                          type="file"
                          ref={(ref) =>
                            (fileInputRefs.current[
                              `Gallery-image${
                                chunkIndex * chunk.length + imgIndex + 1
                              }`
                            ] = ref)
                          }
                          onChange={(e) =>
                            handleImageChange(
                              e,
                              "Gallery",
                              `image${chunkIndex * chunk.length + imgIndex + 1}`
                            )
                          }
                          style={{ display: "none" }}
                        /> */}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section
        className="font-jak px-4 py-10 bg-gray-100 relative"
        id="testimonials"
      >
        <div
          className="absolute left-0 top-[-50px] md:top-[-30px] sm:top-[-25px] xs:top-[-15px] bg-cover w-full h-[100px]"
          style={{
            backgroundImage: `url('')`,
          }}
        ></div>

        <div className="container mx-auto">
          <div className="w-full flex justify-center mb-6 lg:mb-10">
            <h2 className="font-jak text-4xl  font-bold text-gray-800">
              Testimonial Section
            </h2>
          </div>

          <div className="container mx-auto">
            <div className="relative px-5 sm:px-0 text-center md:text-left">
              <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md transition-transform hover:scale-105">
                <span className="text-xl leading-8 block mb-4">
                  {sanitizeContent(details && details.Reviews.summary1)}
                </span>
                <span className="text-lg font-bold text-gray-700 py-3 block">
                  {sanitizeContent(details && details.Reviews.title1)}
                </span>
                <div className="mt-7">
                  <h1>Section header 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Reviews.summary1)}
                    onChange={(event) =>
                      handleContentChange("Reviews", "summary1", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                  <h1>Section header 2</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Reviews.title1)}
                    onChange={(event) =>
                      handleContentChange("Reviews", "title1", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                </div>
              </div>
              <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md transition-transform hover:scale-105">
                <span className="text-xl leading-8 block mb-4">
                  {sanitizeContent(details && details.Reviews.summary2)}
                </span>
                <span className="text-lg font-bold text-gray-700 py-3 block">
                  {sanitizeContent(details && details.Reviews.header2)}
                </span>
                <div className="mt-7">
                  <h1>Section header 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Reviews.summary2)}
                    onChange={(event) =>
                      handleContentChange("Reviews", "summary2", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                  <h1>Section header 2</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Reviews.header2)}
                    onChange={(event) =>
                      handleContentChange("Reviews", "header2", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                </div>
              </div>
              <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md transition-transform hover:scale-105">
                <span className="text-xl leading-8 block mb-4">
                  {sanitizeContent(details && details.Reviews.summary3)}
                </span>
                <span className="text-lg font-bold text-gray-700 py-3 block">
                  {sanitizeContent(details && details.Reviews.header3)}
                </span>

                <div className="mt-7">
                  <h1>Section header 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Reviews.summary3)}
                    onChange={(event) =>
                      handleContentChange("Reviews", "summary3", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                  <h1>Section header 2</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Reviews.header3)}
                    onChange={(event) =>
                      handleContentChange("Reviews", "header3", event)
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
      <section className="font-jak px-4 py-4 lg:pb-10 bg-gray-100 relative">
        <div
          className="absolute left-0 top-[-50px] md:top-[-30px] sm:top-[-25px] xs:top-[-15px] bg-cover w-full h-[100px]"
          style={{
            backgroundImage: "url('images/demo-barber-home-bg-up.png')",
          }}
        ></div>
      </section>
      <div id="team" className="font-jak flex flex-col p-4 lg:px-32  lg:py-24 ">
        {/* Section Header */}
        <div className="flex justify-center mb-3">
          <div className="text-center">
            <span className="font-semibold tracking-[1px] text-base uppercase text-gray-500 mb-1 block">
              {sanitizeContent(details && details.Blog.image1)}
            </span>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Blog.image1)}
              onChange={(event) => handleContentChange("Blog", "image1", event)}
              placeholder="Enter your domain..."
              className="custom-input-class"
            />

            <h2 className="font-semibold  text-gray-800 text-3xl">
              {sanitizeContent(details && details.Blog.header1)}
            </h2>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Blog.header1)}
              onChange={(event) =>
                handleContentChange("Blog", "header1", event)
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
            <h3 className="font-semibold text-gray-800 text-lg">
              {sanitizeContent(details && details.Team.header1)}
            </h3>
            <p>{sanitizeContent(details && details.Team.summary1)}</p>

            <div className="mt-7">
              <h1>Section header 1</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Team.header1)}
                onChange={(event) =>
                  handleContentChange("Team", "header1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />

              <h1>Section header 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Team.summary1)}
                onChange={(event) =>
                  handleContentChange("Team", "summary1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="relative rounded-md overflow-hidden mb-8">
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
            <h3 className="font-semibold text-gray-800 text-lg">
              {sanitizeContent(details && details.Team.header2)}
            </h3>
            <p>{sanitizeContent(details && details.Team.summary2)}</p>

            <div className="mt-7">
              <h1>Section header 1</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Team.header2)}
                onChange={(event) =>
                  handleContentChange("Team", "header2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />

              <h1>Section header 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Team.summary2)}
                onChange={(event) =>
                  handleContentChange("Team", "summary2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="relative rounded-md overflow-hidden mb-8">
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
            <h3 className="font-semibold text-gray-800 text-lg">
              {sanitizeContent(details && details.Team.header3)}
            </h3>
            <p>{sanitizeContent(details && details.Team.summary3)}</p>

            <div className="mt-7">
              <h1>Section header 1</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Team.header3)}
                onChange={(event) =>
                  handleContentChange("Team", "header3", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />

              <h1>Section header 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Team.summary3)}
                onChange={(event) =>
                  handleContentChange("Team", "summary3", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>

          {/* Team Member 4 */}
          <div className="text-center">
            <div className="relative rounded-md overflow-hidden mb-8">
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
            <h3 className="font-semibold text-gray-800 text-lg">
              {sanitizeContent(details && details.Team.header4)}
            </h3>
            <p>{sanitizeContent(details && details.Team.summary4)}</p>

            <div className="mt-7">
              <h1>Section header 1</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Team.header4)}
                onChange={(event) =>
                  handleContentChange("Team", "header4", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />

              <h1>Section header 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Team.summary4)}
                onChange={(event) =>
                  handleContentChange("Team", "summary4", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>
        </div>
      </div>
      <section className="font-jak relative z-10 pb-0 bg-gray-100">
        <div className="flex flex-col py-4 px-4 lg:px-32 lg:py-20">
          <div className="flex flex-wrap">
            <div className="lg:w-1/2 s:w-10/12 pb-7 sm:pb-10 px-6">
              <span className="font-lime text-base uppercase text-dark   font-bold mb-2 inline-block">
                {sanitizeContent(details && details.contactUs.heading1)}
              </span>
              <h2 className="font-jak text-2xl font-normal text-gray-600 tracking-normaler w-4/5 lg:w-full mb-10 sm:mb-8">
                {sanitizeContent(details && details.contactUs.heading2)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 mb-8 xs:mb-6">
                <div>
                  <span className="font-primary text-lg font-semibold text-dark-gray">
                    {sanitizeContent(details && details.contactUs.heading3)}
                  </span>
                  <div className="h-px w-4/5 sm:w-full bg-dark-gray mt-2 mb-2"></div>
                  <div className="w-full">
                    <p className="font-primary w-3/4 lg:w-11/12">
                      {userDetails &&
                        userDetails.address &&
                        userDetails.address}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
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
                            className="hover:text-medium-gray text-gray-600"
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
                            className="hover:text-medium-gray text-gray-600"
                          >
                            Facebook Handle
                          </a>
                        </span>
                      </div>
                    </div>
                  )}

                <div>
                  <span className="font-primary text-lg font-semibold text-dark-gray">
                    {sanitizeContent(details && details.contactUs.heading4)}
                  </span>
                  <div className="h-px w-4/5 sm:w-full bg-dark-gray mt-2 mb-2"></div>
                  <div className="w-full">
                    <span className="font-primary block">
                      <span className="font-primary font-semibold text-dark-gray">
                        {sanitizeContent(details && details.contactUs.heading5)}
                      </span>
                    </span>
                    <span className="font-primary block">
                      <span className="font-primary font-semibold text-dark-gray">
                        {sanitizeContent(details && details.contactUs.heading6)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-7">
                <h1>Section header 1</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.contactUs.heading1)}
                  onChange={(event) =>
                    handleContentChange("contactUs", "heading1", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.contactUs.heading2)}
                  onChange={(event) =>
                    handleContentChange("contactUs", "heading2", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.contactUs.heading3)}
                  onChange={(event) =>
                    handleContentChange("contactUs", "heading3", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.contactUs.heading4)}
                  onChange={(event) =>
                    handleContentChange("contactUs", "heading4", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.contactUs.heading5)}
                  onChange={(event) =>
                    handleContentChange("contactUs", "heading5", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.contactUs.heading6)}
                  onChange={(event) =>
                    handleContentChange("contactUs", "heading6", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
            </div>
            <div className="lg:w-5/12 sm:w-auto sm:mb-12 px-5" id="book">
              <div className="bg-dark-gray shadow-lg lg:p-10 rounded-lg xs:m-4 relative overflow-hidden">
                <h2 className="font-jak text-2xl text-gray-600 xs:mb-4  tracking-normal">
                  We're open to your feedbacks!
                </h2>
                <form method="post" className="">
                  <div className="relative mb-2">
                    <input
                      className="p-2 border-0 rounded-none text-lg bg-transparent border-transparent placeholder-medium-gray w-full"
                      type="text"
                      name="name"
                      placeholder="Enter your name*"
                      required
                    />
                  </div>
                  <div className="relative mb-2">
                    <input
                      className="p-2 border-0 rounded-none text-lg bg-transparent border-transparent placeholder-medium-gray w-full"
                      type="email"
                      name="email"
                      placeholder="Enter your email address*"
                      required
                    />
                  </div>
                  <div className="relative mb-2">
                    <textarea
                      className="p-2 border-0 rounded-none text-lg bg-transparent border-transparent placeholder-medium-gray w-full"
                      name="service"
                      placeholder="What aspect will you like us to improve?"
                      rows={2}
                      required
                    />
                  </div>
                  <div className="relative mb-3">
                    <textarea
                      className="p-2 border-0 rounded-none text-lg bg-transparent border-transparent placeholder-medium-gray w-full"
                      name="message"
                      placeholder="Please tell us more about that!"
                      rows={4}
                    />
                  </div>
                  <button
                    className="inline-flex items-center text-white bg-gray-500 hover:bg-gray-600 text-lg px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
                    type="submit"
                  >
                    Submit
                  </button>
                  <div className="form-results mt-5 hidden"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="beauty font-jak px-4 bg-gradient-to-r from-[#2c3846] via-[#333945] to-[#5b5857] ">
        <div className="flex flex-col lg:flex-row justify-center lg:px-32 pt-[55px] pb-[55px] sm:pt-[40px] sm:pb-[40px] text-center sm:text-center lg:text-left">
          {/* Footer Logo */}
          <div className="lg:w-1/4 md:w-1/2 sm:w-full mb-6">
            <div className="relative">
              <a href="#home" className="footer-logo inline-block mb-4">
                <img
                  src={details && details.footer.logo}
                  alt="Logo"
                  width="100"
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
                      {loadingImage ? <LoadingSmall /> : "Edit Logo"}
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
            <span className="primary-font  block text-white text-sm mb-[5px] uppercase font-semibold">
              {sanitizeContent(details && details.footer.title2)}
            </span>
            <p className="primary-font  leading-[30px] text-white">
              {" "}
              {sanitizeContent(details && details.footer.title3)}
            </p>
            <h1>Edit Footer 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.title2)}
              onChange={(event) =>
                handleContentChange("footer", "title2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <h1>Edit Footer2</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.title3)}
              onChange={(event) =>
                handleContentChange("footer", "title3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>

          {/* Need Support */}
          <div className="lg:w-1/4 md:w-1/2 sm:w-full mb-6">
            <span className="primary-font block text-white  text-sm mb-[5px] uppercase  font-semibold">
              {sanitizeContent(details && details.footer.title4)}
            </span>
            <a href="tel:1800222000" className="text-white  block">
              {sanitizeContent(details && details.footer.paragraph2)}
            </a>
            <a href="mailto:info@yourdomain.com" className="text-white  block">
              {sanitizeContent(details && details.footer.paragraph1)}
            </a>

            <h1>Edit Footer 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.title4)}
              onChange={(event) =>
                handleContentChange("footer", "title4", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <h1>Edit Footer 2</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.paragraph1)}
              onChange={(event) =>
                handleContentChange("footer", "paragraph1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <h1>Edit Footer 2</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.paragraph2)}
              onChange={(event) =>
                handleContentChange("footer", "paragraph2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>

          {/* Connect with Us */}
          <div className="lg:w-1/4 md:w-1/2 sm:w-full mb-6">
            <span className="primary-font block text-white  text-sm mb-[10px] uppercase  font-semibold">
              {sanitizeContent(details && details.footer.paragraph3)}
            </span>
            <h1>Edit Footer 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.paragraph3)}
              onChange={(event) =>
                handleContentChange("footer", "paragraph3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <div className="elements-social text-2xl social-icon-style-09">
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

        {/* Bottom Section */}
        <div className=" pt-[20px] pb-[20px] border-t border-gray-300 text-center text-white">
          <nav className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-8 text-lg gap-0">
            <a href="#home" className="mx-2 sm:mx-4 text-white">
              Home
            </a>
            <a href="#about" className="mx-2 sm:mx-4 text-white">
              About
            </a>
            <a href="#services" className="mx-2 sm:mx-4 text-white">
              Services
            </a>
            <a href="#pricing" className="mx-2 sm:mx-4 text-white">
              Pricing
            </a>
            <a
              href="demo-beauty-salon-wedding.html"
              className="mx-2 sm:mx-4 text-white"
            >
              Gallery
            </a>
            <a
              href="demo-beauty-salon-review.html"
              className="mx-2 sm:mx-4 text-white"
            >
              Reviews
            </a>
            <a href="#team" className="mx-2 sm:mx-4 text-white">
              Team
            </a>
            <a href="#contact" className="mx-2 sm:mx-4 text-white">
              Contact
            </a>
          </nav>
          <p className="text-white mt-4 text-sm sm:text-base">
            © 2024 Proudly Powered by{" "}
            <a
              href="https://www.dimpified.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white"
            >
              Dimpified from GFA Technologies
            </a>
          </p>
        </div>
      </footer>
    </Fragment>
  );
};

export default BlankTemplate;
