import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaQuoteLeft,
  FaQuoteRight,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaDumbbell,
  FaRunning,
  FaUserCog,
  FaChalkboardTeacher,
  FaSuperpowers,
  FaUserAlt,
  FaUsersCog,
  FaUserFriends,
} from "react-icons/fa";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import { gym } from "../../../../data/Services";
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
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";


// --- Hero Section ---

// App Component
const FourthGym = ({ userDetails, subdomain }) => {
  const [hovered, setHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
const [currency, setCurrency] = useState([]);
  const [eServices, setEServices] = useState([]);
  const userPlan = useSelector((state) => state.ecosystemPlan.plan);
  const userPermissions = PERMISSIONS[userPlan] || {};
  const dispatch = useDispatch();
  const [showSocials, setShowSocials] = useState(false);
  const details = useSelector(
    (state) => state.editTemplate.editcurrentTemplate
  );

  // service section
  useEffect(() => {
    const getServiceDetails = async () => {
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
    getServiceDetails();
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

  const handleContentChange = (section, field, event, index = null) => {
    const value = event.target.value;
    dispatch(updateContent({ section, field, value, index }));
  };

  const images = [
    details && details.Gallery.image1,
    details && details.Gallery.image2,
    details && details.Gallery.image3,
  ];
  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  const features = [
    {
      id: details && details.Statistics.section1header,
      title: details && details.Statistics.section1span,
      description: details && details.Statistics.section1paragraphy,
      icon: <FaUserFriends className="w-16 h-16 text-teal-500" />,
      color: "text-black",
    },
    {
      id: details && details.Statistics.section2header,
      title: details && details.Statistics.section2span,
      description: details && details.Statistics.section2paragraphy,
      icon: <FaDumbbell className="w-16 h-16 text-teal-500" />,
      color: "text-[#00C0D7]",
    },
    {
      id: 3,
      title: details && details.Statistics.section3header,
      description: details && details.Statistics.section3paragraphy,
      icon: <FaChalkboardTeacher className="w-16 h-16 text-teal-500" />,
      color: "text-black",
    },
  ];

  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };
  const testimonials = [1, 2, 3].map((i) => ({
    image:
      (details &&
        details?.Reviews?.[`image${i}`]?.replace("not available", "")) ||
      "",
    name: (details && details?.Reviews?.[`header${i}`]) || "",
    role: (details && details?.Reviews?.[`title${i}`]) || "",
    text: (details && details?.Reviews?.[`summary${i}`]) || "",
  }));

  return (
    <div>
      <nav className="w-full bg-white  z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center text-2xl font-bold text-teal-500">
            <FaDumbbell className="w-10 h-10 mr-2" />
            <span>{userDetails && userDetails.ecosystemName}</span>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-teal-500"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-black font-medium">
            {[
              "Home",
              "About Us",
              "Services",
              "Memberships",
              "Facility",
              "Contact Us",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                  className="hover:text-teal-700 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Search */}
          <div className="hidden md:block">
            <button
              onClick={handleModalOpen}
              className="inline-block bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition"
            >
              {sanitizeContent(details && details.navbar.buttonText1)}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white px-4 pb-4">
            <ul className="flex flex-col space-y-4 text-teal-500 font-medium">
              {[
                "Home",
                "About Us",
                "Services",
                "Memberships",
                "Facility",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                    className="block hover:text-teal-700"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <div id="home" className="relative text-white text-center mt-4">
        <div className="absolute inset-0 bg-teal-900 bg-opacity-40 flex flex-col items-center justify-center z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
            Welcome to
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            {userDetails && userDetails.ecosystemName} Gym
          </h1>
          <p className="text-lg sm:text-xl mt-4">
            {sanitizeContent(details && details.hero.title2)}
          </p>
        </div>

        <img
          src={details && details.hero.backgroundImage1}
          alt="Fitness"
          className="w-full h-[500px] object-cover"
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
      </div>
      <div className="mb-16 px-4  lg:px- ">
        <h1>Edit Hero Section</h1>
        <div className="lg:flex gap-4">
          <div className="mt-7 flex-1">
            <h1>Section header 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.title2)}
              onChange={(event) => handleContentChange("hero", "title2", event)}
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7 flex-1">
            <h1>Section header 2</h1>
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
      </div>

      <section
        id="aboutus"
        className="relative lg:px-32 flex flex-col md:flex-row items-center p-6 md:p-12 bg-gray-100 gap-8"
      >
        <div className="w-full md:w-1/2">
          <h4 className="text-gray-500 uppercase font-semibold tracking-wider">
            {sanitizeContent(details && details.aboutUs.title1)}
          </h4>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mt-2">
            <span className="text-teal-500">
              {sanitizeContent(details && details.aboutUs.title2)}
            </span>
          </h1>
          <p className="text-gray-600 text-lg mt-4 font-medium">
            {sanitizeContent(details && details.aboutUs.text1)}
          </p>
          <p className="text-gray-600 mt-4">
            {sanitizeContent(details && details.aboutUs.text2)}
          </p>

          <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg border border-teal-100 w-full max-w-lg">
            <h3 className="font-bold text-gray-800 text-lg mb-4">
              WHAT YOU'LL GET:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <p className="flex items-center text-gray-700 font-medium">
                <span className="bg-teal-500 text-white p-1 rounded-full mr-3">
                  ✓
                </span>{" "}
                1-on-1 Training Sessions
              </p>
              <p className="flex items-center text-gray-700 font-medium">
                <span className="bg-teal-500 text-white p-1 rounded-full mr-3">
                  ✓
                </span>{" "}
                Custom Nutrition Plans
              </p>
              <p className="flex items-center text-gray-700 font-medium">
                <span className="bg-teal-500 text-white p-1 rounded-full mr-3">
                  ✓
                </span>{" "}
                24/7 Gym Access
              </p>
              <p className="flex items-center text-gray-700 font-medium">
                <span className="bg-teal-500 text-white p-1 rounded-full mr-3">
                  ✓
                </span>{" "}
                Group Fitness Classes
              </p>
              <p className="flex items-center text-gray-700 font-medium">
                <span className="bg-teal-500 text-white p-1 rounded-full mr-3">
                  ✓
                </span>{" "}
                Progress Tracking
              </p>
              <p className="flex items-center text-gray-700 font-medium">
                <span className="bg-teal-500 text-white p-1 rounded-full mr-3">
                  ✓
                </span>{" "}
                Premium Equipment
              </p>
            </div>
          </div>
          {/* {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )} */}

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleModalOpen}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg shadow-lg font-bold text-lg transition-all transform hover:scale-105"
            >
              {sanitizeContent(details && details.aboutUs.buttonText1)}
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative">
          <img
            src={details && details.aboutUs.image1}
            alt="Trainer"
            className="w-full max-w-md mx-auto"
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
          {/* <div className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 bg-teal-500 text-white p-4 text-center shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold">20</h2>
            <p className="text-sm sm:text-base">Year Experience</p>
          </div> */}
        </div>
      </section>
      <div className="mb-16 px-4  lg:px- ">
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
          <div className="mt-7 flex-1">
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
          <div className="mt-7 flex-1">
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

        <div className="lg:flex gap-4">
          <div className="mt-7 flex-1">
            <h1>Section header 4</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.aboutUs.text2)}
              onChange={(event) =>
                handleContentChange("aboutUs", "text2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7 flex-1">
            <h1>Button Text 1</h1>
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

      <section
        id="services"
        className=" lg:px-8 flex flex-col md:flex-row justify-between gap-8  bg-[#FAF3F0] py-16"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative w-[200px] md:w-[250px] text-left group"
          >
            {feature.icon}

            <h3 className="font-bold text-xl text-black mb-2">
              {feature.title}
            </h3>

            <p className="text-gray-600 mb-4">{feature.description}</p>

            <div className="absolute -top-16 right-0 md:-right-6 flex items-center">
              <div
                className={`relative text-[160px] font-bold leading-none opacity-30 ${feature.color}`}
              >
                {feature.id}
              </div>
            </div>
            <EditTemplateLongInput
              value={sanitizeContent(
                details?.Statistics?.[`section${index + 1}header`]
              )}
              onChange={(event) =>
                handleContentChange(
                  "Statistics",
                  `section${index + 1}header`,
                  event
                )
              }
              placeholder="Enter your domain..."
              className="custom-input-class my-6"
            />
            <EditTemplateLongInput
              value={sanitizeContent(
                details?.Statistics?.[`section${index + 1}paragraphy`]
              )}
              onChange={(event) =>
                handleContentChange(
                  "Statistics",
                  `section${index + 1}paragraphy`,
                  event
                )
              }
              placeholder="Enter your domain..."
              className="custom-input-class my-6"
            />
            {index !== 2 && (
              <EditTemplateLongInput
                value={sanitizeContent(
                  details?.Statistics?.[`section${index + 1}span`]
                )}
                onChange={(event) =>
                  handleContentChange(
                    "Statistics",
                    `section${index + 1}span`,
                    event
                  )
                }
                placeholder="Enter your domain..."
                className="custom-input-class my-6"
              />
            )}
          </div>
        ))}
      </section>

      <div
        id="memberships"
        className=" lg:px-32 bg-gray-50 py-10 px-5 md:px-20"
      >
        <div className="text-left">
          <h2 className="text-lg fomt-bold text-teal-500">MEMBERSHIP PLANS</h2>
          <h1 className="text-3xl md:text-5xl font-bold mt-2">
            Bring Your Fitness{" "}
            <span className="text-teal-500">Ideas To Life</span>
          </h1>
        </div>

        <section className="flex flex-col h-full  py-12">
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
          <div className="flex flex-col md:flex-row items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eServices.map((service, index) => (
                <div
                  key={index}
                  className="relative bg-gray-100 py-8 px-12 rounded-sm overflow-hidden "
                >
                  <span className="text-sm font-semibold uppercase bg-white shadow-md rounded-full px-4 py-1 mb-4 inline-block">
                    {service.name}
                  </span>
                  <h2 className="text-4xl py-3 font-Raj font-bold text-gray-800">
                    {getCurrencySymbol(currency)}{service.price}
                  </h2>

                  <div className="space-y-2 mb-6">
                    <p className="flex items-center mb-2 pe-6 text-gray-700">
                      {service.shortDescription}
                    </p>
                  </div>

                  <button
                    onClick={handleModalOpen}
                    className="inline-block bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition"
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
        </section>
      </div>

      <div className=" lg:px-8 flex items-center justify-center py-12 bg-gradient-to-b from-white to-gray-100 px-4">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative w-full md:w-1/2 h-[400px]">
            <div
              className="absolute w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${details && details.LargeCta.image1})`,
              }}
            >
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
                      onClick={() => handleEditImageClick("LargeCta", "image1")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null*/}
                </div>
                {/* <input
                  type="file"
                  ref={(ref) =>
                    (fileInputRefs.current["LargeCta-image1"] = ref)
                  }
                  onChange={(e) => handleImageChange(e, "LargeCta", "image1")}
                  style={{ display: "none" }}
                /> */}
              </div>
            </div>
            <div
              className="absolute top-0 right-0 h-full bg-cover bg-center"
              style={{
                width: `${sliderPosition}%`,
                backgroundImage: `url(${details && details.LargeCta.image2})`,
              }}
            >
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
                      onClick={() => handleEditImageClick("LargeCta", "image2")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null*/}
                </div>
                {/* <input
                  type="file"
                  ref={(ref) =>
                    (fileInputRefs.current["LargeCta-image2"] = ref)
                  }
                  onChange={(e) => handleImageChange(e, "LargeCta", "image2")}
                  style={{ display: "none" }}
                /> */}
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black text-white flex items-center justify-center rounded-full cursor-pointer border-4 border-white shadow-lg">
              <FaArrowLeft className="mr-1" />
              <FaArrowRight />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 cursor-pointer opacity-0"
            />
          </div>

          <div className="p-8 md:w-1/2">
            <p className="text-gray-500 uppercase text-sm font-semibold">
              {sanitizeContent(details && details.LargeCta.header2)}
            </p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              <span className="text-teal-500">
                {sanitizeContent(details && details.LargeCta.header1)}
              </span>
            </h2>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              {sanitizeContent(details && details.LargeCta.header3)}
            </p>
            <button
              onClick={handleModalOpen}
              className="inline-block bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition"
            >
              {sanitizeContent(details && details.LargeCta.buttonText1)}
            </button>
          </div>
        </div>
      </div>
      <div className="lg:flex gap-4">
        <div className="mt-7 flex-1">
          <h1>Section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.LargeCta.header1)}
            onChange={(event) =>
              handleContentChange("LargeCta", "header1", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class text-black"
          />
        </div>
        <div className="mt-7 flex-1">
          <h1>Section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.LargeCta.header2)}
            onChange={(event) =>
              handleContentChange("LargeCta", "header2", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class text-black"
          />
        </div>
      </div>
      <div className="lg:flex gap-4">
        <div className="mt-7 flex-1">
          <h1>Section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.LargeCta.header3)}
            onChange={(event) =>
              handleContentChange("LargeCta", "header3", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class text-black"
          />
        </div>
        <div className="mt-7 flex-1">
          <h1>Section header 2</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.LargeCta.buttonText1)}
            onChange={(event) =>
              handleContentChange("LargeCta", "buttonText1", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class text-black"
          />
        </div>
      </div>

      <div id="facility" className="lg:px-8 relative  px-4 py-5">
        <div className="text-left py-6">
          <h2 className="text-lg fomt-bold text-teal-500">
            {sanitizeContent(details && details.Gallery.summary2)}
          </h2>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Gallery.summary2)}
            onChange={(event) =>
              handleContentChange("Gallery", "summary2", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class my-6"
          />
          <h1 className="text-3xl md:text-5xl font-bold mt-2">
            <span className="text-teal-500">
              {sanitizeContent(details && details.Gallery.summary1)}
            </span>
          </h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Gallery.summary1)}
            onChange={(event) =>
              handleContentChange("Gallery", "summary1", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class my-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Gym ${index + 1}`}
                className="w-full h-[260px] rounded-md object-cover"
              />

              {/* userPlan && userPermissions?.canEditImage && (
                <div className="absolute top-2 left-2">
                  <ButtonSmallPurple
                    width="50"
                    onClick={() =>
                      handleEditImageClick("Gallery", `image${index + 1}`)
                    }
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Image"}
                  </ButtonSmallPurple>
                </div>
              )*/}

              <input
                type="file"
                ref={(ref) => {
                  if (fileInputRefs?.current) {
                    fileInputRefs.current[`Gallery-image${index + 1}`] = ref;
                  }
                }}
                onChange={(e) =>
                  handleImageChange(e, "Gallery", `image${index + 1}`)
                }
                style={{ display: "none" }}
              />
            </div>
          ))}
        </div>
      </div>

      <section
        id="testimonial"
        className="relative bg-gradient-to-b from-white to-teal-100 py-12 w-full max-w-5xl mx-auto"
      >
        <div className="px-6 md:px-8 lg:px-10">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Testimonial
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            What <span className="text-teal-500">Client</span> Say’s
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row items-center bg-white shadow-md rounded-xl p-6"
              >
                <div className="w-full lg:w-1/4 flex justify-center lg:justify-end mb-4 lg:mb-0">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="rounded-full shadow-lg h-28 w-28 object-cover"
                      loading="lazy"
                    />
                    {/* userPlan && userPermissions.canEditImage && (
                      <div className="absolute top-2 left-2">
                        <ButtonSmallPurple
                          width="50"
                          onClick={() =>
                            handleEditImageClick("Reviews", `image${index + 1}`)
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                      </div>
                    )*/}
                    <input
                      type="file"
                      ref={(ref) =>
                        (fileInputRefs.current[`Reviews-image${index + 1}`] =
                          ref)
                      }
                      onChange={(e) =>
                        handleImageChange(e, "Reviews", `image${index + 1}`)
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-3/4 text-center lg:text-left px-4">
                  <p className="text-gray-600 leading-relaxed">
                    <FaQuoteLeft className="text-teal-500 text-xl mb-2 inline" />{" "}
                    {testimonial.text}{" "}
                    <FaQuoteRight className="text-teal-500 text-xl mt-2 inline" />
                  </p>

                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-teal-500 font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details?.Reviews?.[`header${index + 1}`]
                    )}
                    onChange={(event) =>
                      handleContentChange(
                        "Reviews",
                        `header${index + 1}`,
                        event
                      )
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class my-6"
                  />
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details?.Reviews?.[`title${index + 1}`]
                    )}
                    onChange={(event) =>
                      handleContentChange("Reviews", `title${index + 1}`, event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class my-6"
                  />
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details?.Reviews?.[`summary${index + 1}`]
                    )}
                    onChange={(event) =>
                      handleContentChange(
                        "Reviews",
                        `summary${index + 1}`,
                        event
                      )
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class my-6"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <WhiteContactForm /> */}
      <footer class="px-6 bg-gray-900 py-6">
        <div class=" flex flex-col h-full py-4 px-6 md:px-32 text-center sm:text-left">
          <div class="flex flex-col items-center border-white/10 pt-6 md:flex-row md:items-center">
            {/* <!-- Navigation Links --> */}
            <div class="w-full mb-4 md:mb-0">
              <ul class="flex flex-wrap justify-center space-x-4 text-white text-lg">
                <li>
                  <a
                    href="#home"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#aboutus"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="memberships"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Membership Plans
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- Copyright Text --> */}
            <div class="w-full text-center md:text-right mt-4 md:mt-0">
              <p class="text-[#706F6B] text-lg">
                © {new Date().getFullYear()} Proudly Powered by
                <a
                  href="https://www.dimpified.com/"
                  target="_blank"
                  rel="noreferrer"
                  class="text-white underline hover:text-white"
                >
                  Dimpified
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FourthGym;
