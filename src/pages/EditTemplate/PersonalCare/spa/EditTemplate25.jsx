import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
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
import NewBookingModal from "../../../../features/Booking/NewBookingModal";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";
const FirstSpa = ({ userDetails, subdomain }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [eServices, setEServices] = useState([]);
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
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [timeLeft, setTimeLeft] = useState({
    days: 350,
    hours: 30,
    minutes: 50,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                clearInterval(timer);
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      title: details && details.Events.section1header,
      description: details && details.Events.section1paragraphy,
      icon: details && details.Events.buttonText1,
      image: details && details.Events.sectionImage1,
    },
    {
      title: details && details.Events.section2header,
      description: details && details.Events.section2paragraphy,
      icon: details && details.Events.buttonText2,
      image: details && details.Events.sectionImage2,
    },
    {
      title: details && details.Events.section3header,
      description: details && details.Events.section3paragraphy,
      icon: details && details.Events.buttonText3,
      image: details && details.Events.sectionImage3,
    },
  ];

  const products = [
    {
      id: 1,
      image: details && details.Gallery.image1,
    },
    {
      id: 2,
      image: details && details.Gallery.image2,
    },
    {
      id: 3,
      image: details && details.Gallery.image3,
    },
    {
      id: 4,
      image: details && details.Gallery.image4,
    },
  ];

  const testimonials = [
    {
      text: details && details.Reviews.summary1,
      name: details && details.Reviews.title1,
      designation: details && details.Reviews.header1,
    },
    {
      text: details && details.Reviews.summary2,
      name: details && details.Reviews.title2,
      designation: details && details.Reviews.header2,
    },
    {
      text: details && details.Reviews.summary3,
      name: details && details.Reviews.title3,
      designation: details && details.Reviews.header3,
    },
  ];

  const teamMembers = [
    {
      name: details && details.Team.summary1,
      role: details && details.Team.header1,
    },
    {
      name: details && details.Team.summary2,
      role: details && details.Team.header2,
    },
    {
      name: details && details.Team.summary3,
      role: details && details.Team.header3,
    },
    {
      name: details && details.Team.summary4,
      role: details && details.Team.header4,
    },
  ];

  const funFacts = [
    {
      value: details && details.Statistics.section1header,
      label: details && details.Statistics.section1paragraphy,
    },
    {
      value: details && details.Statistics.section2header,
      label: details && details.Statistics.section2paragraphy,
    },
    {
      value: details && details.Statistics.section3header,
      label: details && details.Statistics.section3paragraphy,
    },
    {
      value: details && details.Statistics.section4header,
      label: details && details.Statistics.section4paragraphy,
    },
  ];

  return (
    <div className="bg-gray-100">
      <>
        {/* Navbar */}
        <nav className=" top-0 left-0 w-full z-50 bg-white shadow-md">
          <div className="container mx-auto px-8 lg:px-12 py-4 flex justify-between items-center">
            {/* Logo */}
            <a href="#" className="flex items-center text-gray-800">
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
                        width="50"
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
              </div>

              <span className="text-xs leading-tight">
                {userDetails && userDetails.ecosystemName}
                <br />
                <span className="text-yellow-600">Beauty and Spa</span>
              </span>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 text-gray-800 font-medium">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-blue-600 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-800 focus:outline-none"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden fixed top-16 left-0 w-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5 pointer-events-none"
            }`}
          >
            <ul className="space-y-4 p-6 text-gray-800 font-medium">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <button
                onClick={handleModalOpen}
                className="mt-6 px-4 lg:px-6 py-2 lg:py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition"
              >
                BOOK NOW
              </button>
            </ul>
          </div>
        </nav>
      </>

      <section
        id="home"
        className="relative w-full md:min-h-screen h-[70] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
        }}
      >
        {/* Hero Content */}
        <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center text-center lg:text-left">
          {/* Left Content */}
          <div className="lg:w-1/2 md:mt-0 mt-40">
            <p className="text-black italic text-sm lg:text-lg">
              {sanitizeContent(details && details.hero.title1)}
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-1000 mt-2 leading-tight">
              {sanitizeContent(details && details.hero.title2)}
            </h1>
            <p className="text-gray-900 mt-4 text-sm lg:text-base">
              {sanitizeContent(details && details.hero.summary1)}
            </p>
            <button
              onClick={handleModalOpen}
              className="mt-6 px-4 lg:px-6 py-2 lg:py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition"
            >
              {sanitizeContent(details && details.hero.buttonText1)}
            </button>

            {isModalOpen && (
              <NewBookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )}
          </div>

          {/* Right Image */}
         <div className="lg:w-1/2 mt-6 lg:mt-0 relative flex justify-center">
            <img
              src="https://gfa-tech.com/dimp-template-images/spa/slide2-2-removebg-preview.png"
              alt="Beauty Spa"
              className="w-[280px] lg:w-[600px] max-w-full max-h-[400px] lg:max-h-[600px]"
            />
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
      <div className="mb-16 px-4  lg:px- ">
        <h1>Edit Hero Section</h1>
        <div className="lg:flex gap-4">
          <div className="mt-7 flex-1">
            <h1>Section header 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.title1)}
              onChange={(event) => handleContentChange("hero", "title1", event)}
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7 flex-1">
            <h1>Section header 2</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.title2)}
              onChange={(event) => handleContentChange("hero", "title2", event)}
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
        </div>
        <div className="lg:flex gap-4">
          <div className="mt-7 flex-1">
            <h1>Section header 3</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.summary1)}
              onChange={(event) =>
                handleContentChange("hero", "summary1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7 flex-1">
            <h1>Section header 4</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.buttonText1)}
              onChange={(event) =>
                handleContentChange("hero", "buttonText1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
        </div>
      </div>
      <section id="services" className="relative py-16 bg-gray-100 ">
        {/* Decorative Images */}
     
         <img
          src="https://i.imghippo.com/files/TLI6303dI.jpg"
          alt="Decorative Left"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-20 opacity-50 hidden md:block"
        />
        <img
          src="https://i.imghippo.com/files/bTmw4851HL.jpg"
          alt="Decorative Right"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-20 opacity-50 hidden md:block"
        />

        {/* Services Content */}
        <div className="lg:px-40 px-6">
          {/* Header */}
          <div className="text-center">
           
            <span className="text-lg text-yellow-600 font-semibold">
              {sanitizeContent(details && details.Events.heading)}
            </span>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Events.heading)}
              onChange={(event) =>
                handleContentChange("Events", "heading", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <h2 className="text-4xl font-bold mt-2">
              {sanitizeContent(details && details.Events.summary)}
            </h2>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Events.summary)}
              onChange={(event) =>
                handleContentChange("Events", "summary", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>

          {/* Services Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden h-full flex flex-col "
              >
                <div className="p-6 flex-grow flex flex-col items-center text-center">
                  <div className="relative">
                    <img
                      src={service.icon}
                      alt="Service Icon"
                      className="w-12 mb-4"
                    />
                    {/* userPlan && userPermissions.canEditImage && (
                      <div className="absolute top-2 left-2">
                        <ButtonSmallPurple
                          width="110"
                          onClick={() =>
                            handleEditImageClick(
                              "Events",
                              `buttonText${index + 1}`
                            )
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                      </div>
                    )*/}
                    <input
                      type="file"
                      ref={(ref) =>
                        (fileInputRefs.current[
                          `Events-buttonText${index + 1}`
                        ] = ref)
                      }
                      onChange={(e) =>
                        handleImageChange(e, "Events", `buttonText${index + 1}`)
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                </div>
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* userPlan && userPermissions.canEditImage && (
                    <div className="absolute top-2 left-2">
                      <ButtonSmallPurple
                        width="110"
                        onClick={() =>
                          handleEditImageClick(
                            "Events",
                            `sectionImage${index + 1}`
                          )
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    </div>
                  )*/}
                  <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current[
                        `Events-sectionImage${index + 1}`
                      ] = ref)
                    }
                    onChange={(e) =>
                      handleImageChange(e, "Events", `sectionImage${index + 1}`)
                    }
                    style={{ display: "none" }}
                  />
                </div>

               

                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Events?.[`section${index + 1}header`]
                  )}
                  onChange={(event) =>
                    handleContentChange(
                      "Events",
                      `section${index + 1}header`,
                      event
                    )
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class my-6"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Events?.[`section${index + 1}paragraphy`]
                  )}
                  onChange={(event) =>
                    handleContentChange(
                      "Events",
                      `section${index + 1}paragraphy`,
                      event
                    )
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class mb-6"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="relative py-16 bg-white">
        <div className="w-full lg:px-32 px-6 flex flex-wrap md:flex-nowrap justify-between gap-x-12">
          {/* Left Section */}
          <div className="w-full md:w-1/2 flex flex-col space-y-6">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <img
                    src={details && details.aboutUs.image1}
                    alt="Image 1"
                    className="w-full rounded-lg h-full"
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
                    {/* userPlan && userPermissions.canEditImage ? (
                      <ButtonSmallPurple
                        onClick={() =>
                          handleEditImageClick("aboutUs", "image1")
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}

                    {/* <input
                      type="file"
                      ref={(ref) =>
                        (fileInputRefs.current[`aboutUs-image1`] = ref)
                      }
                      onChange={(e) =>
                        handleImageChange(e, "aboutUs", "image1")
                      }
                      style={{ display: "none" }}
                    /> */}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={details && details.aboutUs.image2}
                      alt="Image 2"
                      className="w-full rounded-lg"
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
                      {/* userPlan && userPermissions.canEditImage ? (
                        <ButtonSmallPurple
                          onClick={() =>
                            handleEditImageClick("aboutUs", "image2")
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                      ) : null*/}

                      {/* <input
                        type="file"
                        ref={(ref) =>
                          (fileInputRefs.current[`aboutUs-image2`] = ref)
                        }
                        onChange={(e) =>
                          handleImageChange(e, "aboutUs", "image2")
                        }
                        style={{ display: "none" }}
                      /> */}
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={details && details.aboutUs.image3}
                      alt="Image 3"
                      className="w-full rounded-lg"
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
                      {/* userPlan && userPermissions.canEditImage ? (
                        <ButtonSmallPurple
                          onClick={() =>
                            handleEditImageClick("aboutUs", "image3")
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                      ) : null*/}

                      {/* <input
                        type="file"
                        ref={(ref) =>
                          (fileInputRefs.current[`aboutUs-image3`] = ref)
                        }
                        onChange={(e) =>
                          handleImageChange(e, "aboutUs", "image3")
                        }
                        style={{ display: "none" }}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h4 className="text-yellow-600">
              {" "}
              {sanitizeContent(details && details.aboutUs.title1)}
            </h4>
            <h2 className="text-3xl font-bold text-gray-900">
              {sanitizeContent(details && details.aboutUs.title2)}
            </h2>
            <p className="text-gray-600">
              {sanitizeContent(details && details.aboutUs.text1)}
            </p>
            <div className="flex space-x-8 mt-6">
              <div className="flex flex-col items-center">
                <img
                  src="https://i.imghippo.com/files/PI4311zs.jpg"
                  alt="Manicure"
                  className="w-12"
                />
                <h4 className="mt-2 text-lg font-semibold">Manicure</h4>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="https://i.imghippo.com/files/BezV8981xhg.jpg"
                  alt="Make-up"
                  className="w-12"
                />
                <h4 className="mt-2 text-lg font-semibold">Make-up</h4>
              </div>
              <div className="flex flex-col items-center">
              <img
                  src="https://i.imghippo.com/files/MFr8486gH.jpg"
                  alt="Body Message"
                  className="w-12"
                />
                <h4 className="mt-2 text-lg font-semibold">Body Message</h4>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <button
                onClick={handleModalOpen}
                className="bg-yellow-600 text-white py-2 px-6 rounded-lg text-lg
                font-semibold"
              >
                {" "}
                {sanitizeContent(details && details.aboutUs.buttonText1)}
              </button>
              <div className="ml-6 flex items-center">
                <img
                  src="https://i.imghippo.com/files/pwH7765aI.jpg"
                  alt="Chat"
                  className="w-8"
                />
                <div className="ml-2 text-gray-900">
                  <p>Chat Us Anytime</p>
                  <a
                    href={`tel:${userDetails && userDetails.phoneNumber}`}
                    className="text-lg font-semibold"
                  >
                    {userDetails && userDetails.phoneNumber}
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:flex gap-5 mt-5">
              <EditTemplateLongInput
                value={sanitizeContent(details && details.aboutUs.title1)}
                onChange={(event) =>
                  handleContentChange("aboutUs", "title1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <EditTemplateLongInput
                value={sanitizeContent(details && details.aboutUs.title2)}
                onChange={(event) =>
                  handleContentChange("aboutUs", "title2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
            <div className="lg:flex gap-5 py-5">
              <EditTemplateLongInput
                value={sanitizeContent(details && details.aboutUs.text1)}
                onChange={(event) =>
                  handleContentChange("aboutUs", "text1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <EditTemplateLongInput
                value={sanitizeContent(details && details.aboutUs.buttonText1)}
                onChange={(event) =>
                  handleContentChange("aboutUs", "buttonText1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="text-center  w-full max-w-5xl py-16 px-4 bg-white relative">
        {/* Right Decorative Image */}
        <img
          src="https://i.imghippo.com/files/lt4581vqk.jpg"
          alt="Decorative Right"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-24 h-24 mt-5 opacity-50"
        />
        {/* Section Title */}
        <h3 className="text-lg italic text-gold">Come & Explore</h3>
        <h2 className="text-4xl font-serif font-bold mb-10">
          Massage & Treatments
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Pagination]}
          slidesPerView={2}
          spaceBetween={20}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          breakpoints={{
            320: { slidesPerView: 2 }, // Small phones
            480: { slidesPerView: 2 }, // Slightly wider phones
            640: { slidesPerView: 2 }, // Tablets in portrait mode
            768: { slidesPerView: 3 }, // Tablets in landscape mode
            1024: { slidesPerView: 4 }, // Laptops
            1280: { slidesPerView: 4 }, // Large screens
            1440: { slidesPerView: 4 }, // Extra-large screens
          }}
          className="w-full max-w-6xl mx-auto pb-10"
        >
          {eServices.map((service, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center">
              {/* Circular Image */}
              <button onClick={handleModalOpen}>
                {" "}
                <div className="w-48 h-48 rounded-full border border-gray-300 overflow-hidden">
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  /> */}
                </div>
              </button>
              {/* Service Title & Price */}
              <button onClick={handleModalOpen}>
                <h4 className="text-xl font-semibold mt-4">{service.name}</h4>
              </button>
              <p className="text-gold text-lg font-medium">{getCurrencySymbol(currency)}{service.price}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <section
        className="relative  bg-center text-white py-20"
        style={{
          backgroundImage:
            "url(https://i.imghippo.com/files/OuV6061hvk.jpg)",
        }}
      >
       
        <div className="container mx-auto px-6 relative">
          <div className="flex md:justify-end justify-center ">
            <div className="text-center max-w-xl">
              <h1 className="text-5xl font-serif">
                {sanitizeContent(details && details.LargeCta.header1)}
              </h1>
              <span className="text-xl block mt-2">
                {sanitizeContent(details && details.LargeCta.header2)}
              </span>
              <p className="mt-4 text-gray-300">
                {sanitizeContent(details && details.LargeCta.summary1)}
              </p>
              <span className="text-lg block mt-6 text-yellow-500 font-semibold">
                {sanitizeContent(details && details.LargeCta.header3)}
              </span>
              {/* <div className="flex justify-center gap-4 mt-6">
                {Object.entries(timeLeft).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col items-center bg-yellow-500 text-black p-4 rounded-full w-24"
                  >
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-sm uppercase">{key}</div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <div className="lg:flex py-5 gap-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.LargeCta.header1)}
          onChange={(event) =>
            handleContentChange("LargeCta", "header1", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <EditTemplateLongInput
          value={sanitizeContent(details && details.LargeCta.header2)}
          onChange={(event) =>
            handleContentChange("LargeCta", "header2", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>
      <div className="lg:flex py-5 gap-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.LargeCta.summary1)}
          onChange={(event) =>
            handleContentChange("LargeCta", "summary1", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <EditTemplateLongInput
          value={sanitizeContent(details && details.LargeCta.header3)}
          onChange={(event) =>
            handleContentChange("LargeCta", "header3", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>

      <section id="gallery" className="py-16 bg-white relative lg:px-32 px-6">
        <div className="flex flex-wrap items-end justify-center mb-5 text-center md:text-start ">
          <div className="xl:w-5/12 lg:w-5/12 md:w-10/12 w-full ">
            <p className="text-xl italic text-[#c9a76a] font-semibold tracking-wide">
              {sanitizeContent(details && details.Gallery.summary1)}
            </p>
            <h2 className="text-5xl font-extrabold text-gray-900 leading-tight md:w-3/4 ">
              {sanitizeContent(details && details.Gallery.summary2)}
            </h2>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Gallery.summary1)}
              onChange={(event) =>
                handleContentChange("Gallery", "summary1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class "
            />
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Gallery.summary2)}
              onChange={(event) =>
                handleContentChange("Gallery", "summary2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class "
            />
          </div>
          <div className="xl:w-7/12 md:w-7/12 w-12/12 ">
            {" "}
            <p className="text-gray-600 text-lg leading-relaxed md:w-2/3 w-full">
              {sanitizeContent(details && details.Gallery.summary3)}
            </p>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Gallery.summary3)}
              onChange={(event) =>
                handleContentChange("Gallery", "summary3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class "
            />
          </div>
        </div>

        <div className=" mt-10">
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="text-left">
                <a
                  href={product.link}
                  className="block rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[350px] object-cover rounded-lg shadow-lg"
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
                      {/* userPlan && userPermissions.canEditImage ? (
                        <ButtonSmallPurple
                          onClick={() =>
                            handleEditImageClick(
                              "Gallery",
                              `image${product.id}`
                            )
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                      ) : null*/}

                      <input
                        type="file"
                        ref={(ref) =>
                          (fileInputRefs.current[`Gallery-image${product.id}`] =
                            ref)
                        }
                        onChange={(e) =>
                          handleImageChange(e, "Gallery", `image${product.id}`)
                        }
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-16 bg-white">
        {/* Left Decorative Image */}
      <img
          src="https://i.imghippo.com/files/veeS8977FY.jpg"
          alt="Decorative Left"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-24 h-24 opacity-50"
        />

        {/* Right Decorative Image */}
        <img
          src="https://i.imghippo.com/files/bTmw4851HL.jpg"
          alt="Decorative Right"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-24 h-24 opacity-50"
        />

        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="text-lg text-gold italic"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
          
            Testimonial
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-semibold mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            What they say?
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto mt-10 relative flex flex-col items-center">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center w-full my-5"
            >
              {/* Star Ratings */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-gold text-xl" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 italic text-lg">
                “ {sanitizeContent(testimonial.text)} ”
              </p>

              {/* Name & Designation */}
              <h4 className="mt-4 font-semibold text-lg">
                {sanitizeContent(testimonial.name)} -
              </h4>
              <span className="text-gray-500">
                {sanitizeContent(testimonial.designation)}
              </span>

              <EditTemplateLongInput
                value={sanitizeContent(
                  details?.Reviews?.[`summary${index + 1}`]
                )}
                onChange={(event) =>
                  handleContentChange("Reviews", `summary${index + 1}`, event)
                }
                placeholder="Enter coach name..."
                className="custom-input-class mt-3"
              />

              {/* Editable Description */}
              <EditTemplateLongInput
                value={sanitizeContent(details?.Reviews?.[`title${index + 1}`])}
                onChange={(event) =>
                  handleContentChange("Reviews", `title${index + 1}`, event)
                }
                placeholder="Enter full name..."
                className="custom-input-class mt-3"
              />

              {/* Editable Experience */}
              <EditTemplateLongInput
                value={sanitizeContent(
                  details?.Reviews?.[`header${index + 1}`]
                )}
                onChange={(event) =>
                  handleContentChange("Reviews", `header${index + 1}`, event)
                }
                placeholder="Enter experience..."
                className="custom-input-class mt-3"
              />
            </motion.div>
          ))}

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index ? "bg-gold" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-16 bg-white">
        <div className="w-full px-6 lg:px-16 flex flex-wrap lg:flex-nowrap items-center">
          {/* Left Image Section */}
          <div className="w-full lg:w-[55%] relative">
            <img
              src={details && details.Patrners.sectionImage3}
              alt="Feature"
              className="rounded-full w-full max-w-[600px] h-auto object-cover"
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
              {/* userPlan && userPermissions.canEditImage ? (
                <ButtonSmallPurple
                  onClick={() =>
                    handleEditImageClick("Patrners", "sectionImage3")
                  }
                >
                  {loadingImage ? <LoadingSmall /> : "Edit Image"}
                </ButtonSmallPurple>
              ) : null*/}

              {/* <input
                type="file"
                ref={(ref) =>
                  (fileInputRefs.current[`Patrners-sectionImage3`] = ref)
                }
                onChange={(e) =>
                  handleImageChange(e, "Patrners", "sectionImage3")
                }
                style={{ display: "none" }}
              /> */}
            </div>
          </div>

          {/* Right Content Section */}
          <div className="w-full lg:w-[45%] lg:pl-12">
            <div className="text-center lg:text-left">
           <img
                src="https://i.imghippo.com/files/wiaX5094.jpg"
                alt="Icon"
                className="mx-auto lg:mx-0 mb-4"
              />
              <p className="text-gold italic text-lg">
                {sanitizeContent(details && details.Patrners.section1header)}
              </p>
              <h2 className="text-4xl font-bold leading-tight my-3">
                {sanitizeContent(details && details.Patrners.section3header)}
              </h2>
              <p className="text-gray-500 text-lg">
                {sanitizeContent(details && details.Patrners.section4header)}
              </p>
            </div>
            <EditTemplateLongInput
              value={sanitizeContent(details.Patrners.section1header)}
              onChange={(event) =>
                handleContentChange("Patrners", "section1header", event)
              }
              placeholder="Enter experience..."
              className="custom-input-class mt-3"
            />

            {/* Editable Description */}
            <EditTemplateLongInput
              value={sanitizeContent(details.Patrners.section3header)}
              onChange={(event) =>
                handleContentChange("Patrners", "section3header", event)
              }
              placeholder="Enter experience..."
              className="custom-input-class mt-3"
            />

            {/* Editable Experience */}
            <EditTemplateLongInput
              value={sanitizeContent(details.Patrners.section4header)}
              onChange={(event) =>
                handleContentChange("Patrners", "section4header", event)
              }
              placeholder="Enter experience..."
              className="custom-input-class mt-3"
            />

            {/* Features List */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Body Scrubs",
                "Cellulite Treatments",
                "Back Treatments",
                "Body Polish",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                 <img
                    src="https://i.imghippo.com/files/pwH7765aI.jpg"
                    alt="Icon"
                    className="w-5"
                  />
                  <h3 className="text-lg font-medium">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white px-4 text-center">
       
        <h3 className="text-lg italic text-gray-500">Our team</h3>
        <h2 className="text-4xl font-serif font-bold mt-2">
          Meet Certified Therapist
        </h2>
        <div className="mt-8 space-y-4 max-w-3xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="justify-between items-center border-b pb-3"
            >
              <p className="text-xl font-semibold flex ">
                {sanitizeContent(member.name)}
                <span className="text-gray-500">
                  / {sanitizeContent(member.role)}
                </span>
              </p>
              <EditTemplateLongInput
                value={sanitizeContent(details.Team?.[`summary${index + 1}`])}
                onChange={(event) =>
                  handleContentChange("Team", `summary${index + 1}`, event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <EditTemplateLongInput
                value={sanitizeContent(details.Team?.[`header${index + 1}`])}
                onChange={(event) =>
                  handleContentChange("Team", `header${index + 1}`, event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          ))}
        </div>
      </section>
      <section
        className="py-16 text-center relative bg-cover bg-center mt-10 bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://i.imghippo.com/files/hRGz9598osc.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        

        {/* Fun Facts Content */}
        <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
          {funFacts.map((fact, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl text-black font-bold">
                {sanitizeContent(fact.value)}
              </p>
              <p className="text-xl text-black">
                {sanitizeContent(fact.label)}
              </p>

              <EditTemplateLongInput
                value={sanitizeContent(
                  details.Statistics?.[`section${index + 1}header`]
                )}
                onChange={(event) =>
                  handleContentChange(
                    "Statistics",
                    `section${index + 1}header`,
                    event
                  )
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
              <EditTemplateLongInput
                value={sanitizeContent(
                  details.Statistics?.[`section${index + 1}paragraphy`]
                )}
                onChange={(event) =>
                  handleContentChange(
                    "Statistics",
                    `section${index + 1}paragraphy`,
                    event
                  )
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
            </div>
          ))}
        </div>
      </section>
      <footer id="contact" className="relative bg-black text-white py-12">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/images/background/bg-footer1.jpg')",
          }}
        ></div>
        <div className="relative container mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            {/* Logo */}
            <a href="/" className="flex items-center text-gray-800">
              <div className="relative">
                <img
                  src={details && details.footer.logo}
                  alt="logo"
                  className="w-10 h-10 mr-2"
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
                  {/* userPlan && userPermissions.canEditImage ? (
                    <ButtonSmallPurple
                      width="50"
                      onClick={() => handleEditImageClick("footer", "logo")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit logo"}
                    </ButtonSmallPurple>
                  ) : null*/}

                  {/* <input
                    type="file"
                    ref={(ref) => (fileInputRefs.current["footer-logo"] = ref)}
                    onChange={(e) => handleImageChange(e, "footer", "logo")}
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
              <span className="text-xl text-white leading-tight">
                {userDetails && userDetails.ecosystemName} <br />
                <span className="text-yellow-600">Beauty and Spa</span>
              </span>
            </a>
            <p className="mb-4 mt-6">
              {sanitizeContent(details && details.footer.paragraph1)}
            </p>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.paragraph1)}
              onChange={(event) =>
                handleContentChange("footer", "paragraph1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
            />

            <div className="flex space-x-4 mt-4 text-xl">
              <a href="#" className="hover:text-gold">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-gold">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gold">
                <FaTwitter />
              </a>
            </div>
          </div>
          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-gold">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold">
                  Gallery
                </a>
              </li>
              <li>
                <button onClick={handleModalOpen} className="hover:text-gold">
                  Book an Appointment
                </button>
              </li>
            </ul>
          </div>
          {/* Open Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {sanitizeContent(details && details.contactUs.heading5)}
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gold">
                  {sanitizeContent(details && details.contactUs.heading6)}
                </span>
              </li>
              <li>
                <span className="text-gold">
                  {sanitizeContent(details && details.contactUs.heading7)}
                </span>
              </li>
              <li>
                <span className="text-gold">
                  {sanitizeContent(details && details.contactUs.paragraph1)}
                </span>
              </li>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading5)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading5", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading6)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading6", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading7)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading7", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.paragraph1)}
                onChange={(event) =>
                  handleContentChange("contactUs", "paragraph1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>{userDetails && userDetails.address}</p>
            <p className="text-gold font-bold mt-2">{userDetails && userDetails.phoneNumber}</p>
            <a
              href="mailto:info@Bliss & Glowspa.com"
              className="text-gold hover:underline"
            >
              {userDetails && userDetails.email}
            </a>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="relative text-center text-sm mt-10 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} {userDetails && userDetails.ecosystemName}. All
          Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default FirstSpa;
