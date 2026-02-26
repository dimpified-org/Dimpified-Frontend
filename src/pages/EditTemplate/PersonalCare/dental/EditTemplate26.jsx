import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTooth,
  FaPhoneAlt,
  FaCheck,
  FaMapMarkerAlt,
  FaEnvelope,
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaTwitter,
  FaPhone,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

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

const ContactCard = ({ icon, title, description }) => (
  <div className="inline-flex items-center gap-4">
    <span className="bg-[#1E84B5] p-2 rounded-full">
      <img src={icon} alt={title} className="w-12 h-12" />
    </span>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const SecondDentist = ({ userDetails, subdomain }) => {
  const [eServices, setEServices] = useState([]);
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

  const handleContentChange = (section, field, event, index = null) => {
    const value = event.target.value;
    dispatch(updateContent({ section, field, value, index }));
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex + itemsPerPage >= testimonials.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? testimonials.length - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  const testimonials = [
    {
      id: 1,
      name: details && details.Blog.header1,
      role: details && details.Blog.summary1,
      image: details && details.Blog.image1,
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: details && details.Blog.content1,
    },
    {
      id: 2,
      name: details && details.Blog.header2,
      role: details && details.Blog.summary2,
      image: details && details.Blog.image2,
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: details && details.Blog.content2,
    },
    {
      id: 3,
      name: details && details.Blog.header3,
      role: details && details.Blog.summary3,
      image: details && details.Blog.image3,
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: details && details.Blog.content3,
    },
    {
      id: 4,
      name: details && details.Blog.header4,
      role: details && details.Blog.summary4,
      image: details && details.Blog.image4,
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: details && details.Blog.content4,
    },
  ];

  const teamMembers = [
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

  const features = [
    {
      id: 1,
      icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-process-1.png",
      title: details && details.Patrners.section1header,
      description: details && details.Patrners.section4header,
    },
    {
      id: 2,
      icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-process-2.png",
      title: details && details.Patrners.section2header,
      description: details && details.Patrners.sectionImage4,
    },
    {
      id: 3,
      icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-process-3.png",
      title: details && details.Patrners.section3header,
      description: details && details.Patrners.buttonText1,
    },
  ];

  const stats = [
    { label: details && details.Events.buttonText1 },
    { label: details && details.Events.sectionImage2 },
    { label: details && details.Events.section2header },
  ];

  return (
    <div>
      <header className="bg-white shadow-md relative">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center text-gray-800">
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
            <span className="text-md text-[#1E84B5] font-semibold leading-tight">
              {userDetails?.ecosystemName} <br />
            </span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About Us
            </a>
            <a href="#services" className="hover:text-blue-600">
              Services
            </a>
            <a href="#how" className="hover:text-blue-600">
              How we work?
            </a>
          </nav>

          {/* Book Appointment Button */}
          <button
            onClick={handleModalOpen}
            className="hidden md:block bg-[#1E84B5] text-white px-5 py-2 rounded-full hover:bg-[#0F3A51] transition"
          >
            Book Appointment →
          </button>

          {/* {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )} */}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Mobile Menu - No Absolute Positioning */}
        <div
          className={`md:hidden bg-white shadow-md w-full transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col space-y-4 p-6">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About Us
            </a>
            <a href="#services" className="hover:text-blue-600">
              Services
            </a>
            <a href="#how" className="hover:text-blue-600">
              How we work?
            </a>
            <button
              onClick={handleModalOpen}
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-[#0F3A51] transition text-center"
            >
              Book Appointment →
            </button>
          </ul>
        </div>
      </header>
      <section
        id="home"
        className="relative bg-cover bg-center md:h-screen h-[70vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="flex flex-col md:px-32 px-6 text-center justify-center items-center  relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {sanitizeContent(details && details.hero.title1)}
          </h1>
          <p className="mb-6 text-lg ">
          {sanitizeContent(details && details.hero.title2)}
          </p>

          <button
            onClick={handleModalOpen}
            className=" bg-[#1E84B5] hover:bg-[#0d3550] text-white py-3 px-6 rounded-lg transition"
          >
            {sanitizeContent(details && details.hero.buttonText1)} →
          </button>

          <div className="md:block hidden">
            <div className=" mt-10 grid grid-cols-3 md:grid-cols-3 gap-6 ">
              {[
                {
                  icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-hero1.png",
                  text: details && details.hero.summary1,
                },
                {
                  icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-hero2.png",
                  text: details && details.hero.summary2,
                },
                {
                  icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-hero3.png",
                  text: details && details.hero.summary3,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-cover bg-opacity-20 p-4 rounded-lg"
                >
                  <img src={item.icon} alt={item.text} className="h-10" />
                  <p className="text-white font-semibold">
                    {sanitizeContent(item.text)}
                  </p>
                </div>
              ))}
            </div>
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
            <h1>Section header 3</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.summary2)}
              onChange={(event) =>
                handleContentChange("hero", "summary2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7 flex-1">
            <h1>Section header 3</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.summary3)}
              onChange={(event) =>
                handleContentChange("hero", "summary3", event)
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
      <div className="w-full flex flex-col h-full justify-center items-center  py-4  lg:px-24">
        {/* Top Contact Section */}
        <div className="bg-cover py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContactCard
            icon="https://gfa-tech.com/dimp-template-images/dentist/icon-phone.png"
            title="Need Dental Services?"
            description={[`Call on : ${userDetails?.phoneNumber}`]}
          />
          <ContactCard
            icon="https://gfa-tech.com/dimp-template-images/dentist/icon-clock.png"
            title="Opening Hours"
            description="Mon to Sat 9:00AM to 9:00PM"
          />
          <ContactCard
            icon="https://gfa-tech.com/dimp-template-images/dentist/icon-mail.png"
            title="Schedule Appointment"
            description={[`Mail us : ${userDetails?.email}`]}
          />
        </div>
        {/* About Us Section */}
        <div className="flex flex-col  px-6 py-16  md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image Section */}
            <div className="relative">
              <img
                src={details && details.aboutUs.image1}
                alt="Dental Clinic"
                className="w-full rounded-xl shadow-lg"
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
                    onClick={() => handleEditImageClick("aboutUs", "image1")}
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Image"}
                  </ButtonSmallPurple>
                ) : null*/}

                {/* <input
                  type="file"
                  ref={(ref) => (fileInputRefs.current[`aboutUs-image1`] = ref)}
                  onChange={(e) => handleImageChange(e, "aboutUs", "image1")}
                  style={{ display: "none" }}
                /> */}
              </div>
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-70 p-4 rounded-lg flex items-center gap-3">
                <FaTooth className="text-2xl text-teal-500" />
                <div>
                  <p className="text-sm text-gray-600">
                    {sanitizeContent(details && details.Vision.missionsummary)}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div>
              <h3 className="text-[#1E84B5] text-sm uppercase font-semibold mb-2">
                {sanitizeContent(details && details.aboutUs.title1)}
              </h3>
              <h2 className="text-4xl font-bold text-gray-800 leading-snug mb-4">
                {sanitizeContent(details && details.aboutUs.title2)}
              </h2>
              <p className="text-gray-600 mb-6">
                {sanitizeContent(details && details.aboutUs.text1)}
              </p>

              <div className="flex items-start gap-8">
                {/* Left: Features List */}
                <ul className="space-y-4 flex-1">
                  {[
                    details && details.Vision.visiomheader,
                    details && details.Vision.visionsummary,
                    details && details.Vision.impactheader,
                    details && details.Vision.impactsummary,
                  ].map((item, index) => (
                    <li key={index} className="">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaCheck className="text-[#1E84B5]" />
                        </div>
                        <span className="text-gray-700">
                          {sanitizeContent(item)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Right: 25+ Years Experience */}
                <div className="bg-[#0d3550] text-white p-4 rounded-xl flex items-center gap-3">
                  <FaTooth className="text-3xl" />
                  <div>
                    <p className="text-sm">
                      {sanitizeContent(details && details.Vision.missionheader)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Read More Button */}
              <div className="mt-6">
                <a
                  href="#services"
                  className="bg-[#1E84B5] text-white py-4 px-6 rounded-lg hover:bg-[#0d3550] transition"
                >
                  {sanitizeContent(details && details.aboutUs.buttonText1)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex gap-5 mt-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.aboutUs.title1)}
          onChange={(event) => handleContentChange("aboutUs", "title1", event)}
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <EditTemplateLongInput
          value={sanitizeContent(details && details.aboutUs.title2)}
          onChange={(event) => handleContentChange("aboutUs", "title2", event)}
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>
      <div className="lg:flex gap-5 py-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.aboutUs.text1)}
          onChange={(event) => handleContentChange("aboutUs", "text1", event)}
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
      <div className="lg:flex gap-5 py-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Vision.missionsummary)}
          onChange={(event) =>
            handleContentChange("Vision", "missionsummary", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Vision.missionheader)}
          onChange={(event) =>
            handleContentChange("Vision", "missionheader", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>
      <div className="lg:flex gap-5 py-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Vision.visiomheader)}
          onChange={(event) =>
            handleContentChange("Vision", "visiomheader", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Vision.visionsummary)}
          onChange={(event) =>
            handleContentChange("Vision", "visionsummary", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Vision.impactsummary)}
          onChange={(event) =>
            handleContentChange("Vision", "impactsummary", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Vision.impactheader)}
          onChange={(event) =>
            handleContentChange("Vision", "impactheader", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>

      <section id="services" className="bg-blue-50 py-16">
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
        <div className="flex flex-col md:px-32 px-6 ">
          {/* Section Header */}
          <div className="text-center mb-10">
            <p className="text-[#1E84B5] font-semibold flex items-center justify-center gap-2">
              <FaTooth /> Our Services
            </p>
            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              Explore the services we provide
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The goal of our clinic is to provide friendly, caring dentistry
              and the highest level of general, cosmetic, and specialist dental
              treatments. With dental practices throughout the world.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg transition-all transform [#1E84B5]:scale-105 [#1E84B5]:bg-blue-700 [#1E84B5]:text-white"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-3">
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-12 h-12 "
                  /> */}
                </div>
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <p className="mt-2">{service.shortDescription}</p>
                <hr className="my-4 border-gray-300" />
                <button
                  onClick={handleModalOpen}
                  className="text-[#1E84B5] hover:text-blue-600 font-medium flex items-center gap-1 [#1E84B5]:underline"
                >
                  Book Now <span className="ml-1">➜</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div id="how" className="bg-white py-16">
        <div className="flex flex-col md:px-32 px-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side Content */}
            <div>
              <div className="mb-8">
                <h3 className="text-[#1E84B5] font-semibold text-lg uppercase">
                  {sanitizeContent(
                    details && details.Statistics.section1header
                  )}
                </h3>
                <h2 className="text-4xl font-bold text-gray-800 mt-2">
                  {sanitizeContent(
                    details && details.Statistics.section1paragraphy
                  )}
                </h2>
                <p className="text-gray-600 mt-4">
                  {sanitizeContent(details && details.Statistics.section1span)}
                </p>
              </div>

              <a
                href="#services"
                className="inline-flex items-center bg-[#1E84B5] text-white font-medium px-6 py-3 hover:bg-[#0d3550] rounded-full [#1E84B5]:bg-blue-800 transition duration-300"
              >
                {sanitizeContent(details && details.Statistics.section1icon)}
                <span className="ml-2">→</span>
              </a>
            </div>

            {/* Right Side Process List */}
            <div className="space-y-8">
              {/* Process Item 1 */}
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <img
                      src="https://gfa-tech.com/dimp-template-images/dentist/icon-process-1.png"
                      alt="Initial Consultation"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-[#1E84B5] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {sanitizeContent(
                      details && details.Statistics.section2header
                    )}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {sanitizeContent(
                      details && details.Statistics.section2paragraphy
                    )}
                  </p>
                </div>
              </div>

              {/* Process Item 2 */}
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <img
                      src="https://gfa-tech.com/dimp-template-images/dentist/icon-process-2.png"
                      alt="Treatment by Experts"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-[#1E84B5] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {sanitizeContent(
                      details && details.Statistics.section2span
                    )}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {sanitizeContent(
                      details && details.Statistics.section2icon
                    )}
                  </p>
                </div>
              </div>

              {/* Process Item 3 */}
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <img
                      src="https://gfa-tech.com/dimp-template-images/dentist/icon-process-3.png"
                      alt="Follow-Up Care"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-[#1E84B5] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {sanitizeContent(
                      details && details.Statistics.section3header
                    )}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {sanitizeContent(
                      details && details.Statistics.section3paragraphy
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex py-5 gap-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Statistics.section1header)}
          onChange={(event) =>
            handleContentChange("Statistics", "section1header", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
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
      <div className="lg:flex py-5 gap-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Statistics.section1span)}
          onChange={(event) =>
            handleContentChange("Statistics", "section1span", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Statistics.section1icon)}
          onChange={(event) =>
            handleContentChange("Statistics", "section1icon", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>
      <div className="lg:flex py-5 gap-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Statistics.section2header)}
          onChange={(event) =>
            handleContentChange("Statistics", "section2header", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
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
      <div className="lg:flex py-5 gap-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Statistics.section2span)}
          onChange={(event) =>
            handleContentChange("Statistics", "section2span", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Statistics.section2icon)}
          onChange={(event) =>
            handleContentChange("Statistics", "section2icon", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>
      <div className="lg:flex py-5 gap-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Statistics.section3header)}
          onChange={(event) =>
            handleContentChange("Statistics", "section3header", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
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

      <div className="bg-white py-12">
        <div className=" md:px-32 px-6  grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Section - Image with Blurred Feature Overlay */}
          <div className="relative">
            <img
              src={details && details.Statistics.section3icon}
              alt="Dental Care"
              className="w-full h-full object-cover rounded-lg"
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
                    width="70px"
                    onClick={() =>
                      handleEditImageClick("Statistics", "section3icon")
                    }
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Back Image"}
                  </ButtonSmallPurple>
                ) : null*/}
              </div>
              {/* <input
                type="file"
                ref={(ref) =>
                  (fileInputRefs.current["Statistics-section3icon"] = ref)
                }
                onChange={(e) =>
                  handleImageChange(e, "Statistics", "section3icon")
                }
                style={{ display: "none" }}
              /> */}
            </div>

            <div className="absolute inset-0 flex justify-center items-center">
              <div className="bg-white/20 backdrop-blur-xl rounded-lg p-6 w-[80%]">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-center gap-4 p-4 bg-white/60 rounded-lg shadow-lg mb-4"
                  >
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-10 h-10"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div>
            <h3 className="text-[#1E84B5] font-medium flex items-center gap-2">
              <span role="img" aria-label="tooth">
                🦷
              </span>
              {sanitizeContent(details && details.Events.heading)}
            </h3>
            <h2 className="text-3xl font-bold text-[#0d3550] mt-2 leading-snug">
              {sanitizeContent(details && details.Events.summary)}
            </h2>
            <p className="mt-4 text-sm font-bold text-[#0d3550]">
              {sanitizeContent(details && details.Events.section1header)}
            </p>
            <p className="mt-5 text-[#0d3550]">
              {sanitizeContent(details && details.Events.section1paragraphy)}
            </p>

            {/* Statistics Section */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={stat.id}
                  className={`text-center  ${
                    index !== 0 ? "border-l border-gray-300" : ""
                  }`}
                >
                  <p className="text-[#0d3550]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex gap-4">
        <div className="mt-7 flex-1">
          <h1>Section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Patrners.section1header)}
            onChange={(event) =>
              handleContentChange("Patrners", "section1header", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
        <div className="mt-7 flex-1">
          <h1>Section header 2</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Patrners.section4header)}
            onChange={(event) =>
              handleContentChange("Patrners", "section4header", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
        <div className="mt-7 flex-1">
          <h1>Section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Patrners.section2header)}
            onChange={(event) =>
              handleContentChange("Patrners", "section2header", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
        <div className="mt-7 flex-1">
          <h1>Section header 2</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Patrners.sectionImage4)}
            onChange={(event) =>
              handleContentChange("Patrners", "sectionImage4", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
      </div>
      <div className="lg:flex gap-4">
        <div className="mt-7 flex-1">
          <h1>Section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Patrners.section3header)}
            onChange={(event) =>
              handleContentChange("Patrners", "section3header", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
        <div className="mt-7 flex-1">
          <h1>Section header 2</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Patrners.buttonText1)}
            onChange={(event) =>
              handleContentChange("Patrners", "buttonText1", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
        <div className="mt-7 flex-1">
          <h1>Section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Events.heading)}
            onChange={(event) =>
              handleContentChange("Events", "heading", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
        <div className="mt-7 flex-1">
          <h1>Section header 2</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Events.summary)}
            onChange={(event) =>
              handleContentChange("Events", "summary", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
      </div>
      <div className="lg:flex gap-4">
        <div className="mt-7 flex-1">
          <h1>Section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Events.section1header)}
            onChange={(event) =>
              handleContentChange("Events", "section1header", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
        <div className="mt-7 flex-1">
          <h1>Section header 2</h1>
          <EditTemplateLongInput
            value={sanitizeContent(
              details && details.Events.section1paragraphy
            )}
            onChange={(event) =>
              handleContentChange("Events", "section1paragraphy", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
        <div className="mt-7 flex-1">
          <h1>Section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Events.buttonText1)}
            onChange={(event) =>
              handleContentChange("Events", "buttonText1", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
        <div className="mt-7 flex-1">
          <h1>Section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Events.section2header)}
            onChange={(event) =>
              handleContentChange("Events", "section2header", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
        <div className="mt-7 flex-1">
          <h1>Section header 2</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Events.sectionImage2)}
            onChange={(event) =>
              handleContentChange("Events", "sectionImage2", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="flex flex-col md:px-32 px-6 ">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="text-[#1E84B5] font-semibold text-lg">
              {sanitizeContent(details && details.Reviews.header2)}
            </h3>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Reviews.header2)}
              onChange={(event) =>
                handleContentChange("Reviews", "header2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <h2 className="text-3xl font-bold text-[#0d3550]">
              {sanitizeContent(details && details.Reviews.summary2)}
            </h2>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Reviews.summary2)}
              onChange={(event) =>
                handleContentChange("Reviews", "summary2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <p className="text-gray-600 mt-2">
              {sanitizeContent(details && details.Reviews.title2)}
            </p>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Reviews.title2)}
              onChange={(event) =>
                handleContentChange("Reviews", "title2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>

          <div className="w-full">
            <div className="flex flex-col gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-blue-50 p-6 rounded-xl shadow-md w-full"
                >
                  {/* Quote Icon at the Top */}
                  <div className="flex justify-center mb-4">
                    <img
                      src={testimonial.quoteIcon}
                      alt="Quote Icon"
                      className="w-10 h-10"
                    />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 mb-4 text-center">
                    {testimonial.text}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-center mt-6">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      {/* userPlan && userPermissions.canEditImage && (
                        <div className="absolute top-2 left-2">
                          <ButtonSmallPurple
                            width="110"
                            onClick={() =>
                              handleEditImageClick("Blog", `image${index + 1}`)
                            }
                          >
                            {loadingImage ? <LoadingSmall /> : "Edit Image"}
                          </ButtonSmallPurple>
                        </div>
                      )*/}
                      <input
                        type="file"
                        ref={(ref) =>
                          (fileInputRefs.current[`Blog-image${index + 1}`] =
                            ref)
                        }
                        onChange={(e) =>
                          handleImageChange(e, "Blog", `image${index + 1}`)
                        }
                        style={{ display: "none" }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details?.Blog?.[`header${index + 1}`]
                    )}
                    onChange={(event) =>
                      handleContentChange("Blog", `header${index + 1}`, event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class my-6"
                  />
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details?.Blog?.[`summary${index + 1}`]
                    )}
                    onChange={(event) =>
                      handleContentChange("Blog", `summary${index + 1}`, event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class "
                  />
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details?.Blog?.[`content${index + 1}`]
                    )}
                    onChange={(event) =>
                      handleContentChange("Blog", `content${index + 1}`, event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class "
                  />
                </div>
              ))}
            </div>
            <div className="bg-blue-50 p-6 rounded-xl shadow-md w-full mt-6">
              {/* Quote Icon at the Top */}
              <div className="flex justify-center mb-4">
                <img
                  src={details && details.Reviews.image2}
                  alt="Quote Icon"
                  className="w-10 h-10"
                />
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-4 text-center">
                {details && details.Reviews.summary1}
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-center mt-6">
                <div className="relative">
                  <img
                    src={details && details.Reviews.image1}
                    alt={details && details.Reviews.header1}
                    className="w-12 h-12 rounded-full mr-4"
                  />

                  {/* userPlan && userPermissions.canEditImage && (
                    <div className="absolute top-2 left-2">
                      <ButtonSmallPurple
                        width="110"
                        onClick={() =>
                          handleEditImageClick("Reviews", "image1")
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    </div>
                  )*/}
                  {/* <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current["Reviews-image1"] = ref)
                    }
                    onChange={(e) => handleImageChange(e, "Reviews", "image1")}
                    style={{ display: "none" }}
                  /> */}
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {details && details.Reviews.header1}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {details && details.Reviews.title1}
                  </p>
                </div>
              </div>
              <EditTemplateLongInput
                value={sanitizeContent(details.Reviews.header1)}
                onChange={(event) =>
                  handleContentChange("Reviews", "header1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class my-6"
              />
              <EditTemplateLongInput
                value={sanitizeContent(details.Reviews.title1)}
                onChange={(event) =>
                  handleContentChange("Reviews", "title1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class my-6"
              />
              <EditTemplateLongInput
                value={sanitizeContent(details.Reviews.summary1)}
                onChange={(event) =>
                  handleContentChange("Reviews", "summary1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class my-6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0D3B4F] text-white py-16">
        <div className="flex flex-col md:px-32 px-6 ">
          {/* Top Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span role="img" aria-label="tooth">
                  🦷
                </span>{" "}
                {sanitizeContent(details && details.Events.section2paragraphy)}
              </h3>
              <h2 className="text-4xl font-bold leading-tight mt-2">
                {sanitizeContent(details && details.Events.buttonText2)}
              </h2>
              <p className="mt-4 text-lg">
                {sanitizeContent(details && details.Events.section3header)}
              </p>
            </div>

            {/* Right Image/Video Section */}
            <div className="relative">
              {/* <a
                href="https://www.youtube.com/watch?v=Y-x0efG1seA"
                target="_blank"
                rel="noopener noreferrer"
              > */}
              <img
                src={details && details.Events.sectionImage3}
                alt="Dental Facility"
                className="w-full h-auto rounded-xl shadow-lg"
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
                      handleEditImageClick("Events", "sectionImage3")
                    }
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Image"}
                  </ButtonSmallPurple>
                ) : null*/}

                {/* <input
                  type="file"
                  ref={(ref) =>
                    (fileInputRefs.current[`Events-sectionImage3`] = ref)
                  }
                  onChange={(e) =>
                    handleImageChange(e, "Events", "sectionImage3")
                  }
                  style={{ display: "none" }}
                /> */}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white p-4 rounded-full shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-8 h-8 text-gray-700"
                  >
                    <path d="M10.804 8.171L6.69 10.801c-.28.168-.69.008-.69-.325V5.524c0-.333.41-.493.69-.325l4.114 2.63a.393.393 0 010 .674z" />
                  </svg>
                </button>
              </div>
              {/* </a> */}
            </div>
          </div>
          <div className="lg:flex gap-4 mt-5">
            <EditTemplateLongInput
              value={sanitizeContent(
                details && details.Events.section2paragraphy
              )}
              onChange={(event) =>
                handleContentChange("Events", "section2paragraphy", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
            />
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Events.buttonText2)}
              onChange={(event) =>
                handleContentChange("Events", "buttonText2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
            />
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Events.section3header)}
              onChange={(event) =>
                handleContentChange("Events", "section3header", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
            />
          </div>
          {/* Service Information - Uniform Alignment */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "1",
                titleKey: "section3paragraphy",
                descriptionKey: "buttonText3",
              },
              {
                id: "2",
                titleKey: "sectionImage4",
                descriptionKey: "section4header",
              },
              {
                id: "3",
                titleKey: "section4paragraphy",
                descriptionKey: "buttonText4",
              },
            ].map((item, index) => (
              <div key={item.id} className="flex flex-col gap-4">
                {/* ID Number & Static Text */}
                <div className="flex items-start gap-3">
                  <span className="bg-[#1E84B5] text-white w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold">
                    {item.id}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {details?.Events?.[item.titleKey] || "No Title"}
                    </h3>
                    <p className="mt-1 text-sm">
                      {details?.Events?.[item.descriptionKey] ||
                        "No Description"}
                    </p>
                  </div>
                </div>

                {/* Editable Inputs */}
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Events?.[item.titleKey] || ""
                  )}
                  onChange={(event) =>
                    handleContentChange("Events", item.titleKey, event)
                  }
                  placeholder="Enter title..."
                  className="custom-input-class my-2 text-black"
                />

                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Events?.[item.descriptionKey] || ""
                  )}
                  onChange={(event) =>
                    handleContentChange("Events", item.descriptionKey, event)
                  }
                  placeholder="Enter description..."
                  className="custom-input-class mb-6 text-black"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white py-16">
        <div className="flex flex-col md:px-32 px-6 ">
          <div className="text-center mb-12">
            <p className="text-[#1E84B5] uppercase font-semibold">
              {sanitizeContent(details && details.Reviews.header3)}
            </p>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Reviews.header3)}
              onChange={(event) =>
                handleContentChange("Reviews", "header3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d3550] mt-2">
              {sanitizeContent(details && details.Reviews.summary3)}
            </h2>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Reviews.summary3)}
              onChange={(event) =>
                handleContentChange("Reviews", "summary3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {sanitizeContent(details && details.Reviews.title3)}
            </p>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Reviews.title3)}
              onChange={(event) =>
                handleContentChange("Reviews", "title3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative overflow-hidden transition-transform transform [#1E84B5]:scale-105"
              >
                <div className="relative group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover bg-white rounded-xl shadow-lg "
                  />
                  {/* userPlan && userPermissions.canEditImage && (
                    <div className="absolute top-2 left-2">
                      <ButtonSmallPurple
                        onClick={() =>
                          handleEditImageClick("Team", `image${index + 1}`)
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    </div>
                  )*/}
                  {/* <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current[`Team-image${index + 1}`] = ref)
                    }
                    onChange={(e) =>
                      handleImageChange(e, "Team", `image${index + 1}`)
                    }
                    style={{ display: "none" }}
                  /> */}
                </div>

                <div className="text-center mt-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
                <EditTemplateLongInput
                  value={sanitizeContent(details?.Team?.[`header${index + 1}`])}
                  onChange={(event) =>
                    handleContentChange("Team", `header${index + 1}`, event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class my-6"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Team?.[`summary${index + 1}`]
                  )}
                  onChange={(event) =>
                    handleContentChange("Team", `summary${index + 1}`, event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class mb-6"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white py-16">
        <div className="flex flex-col md:px-32 px-6 ">
          {/* Section Title */}
          <div className="text-center mb-12">
            <p className="text-[#1E84B5] text-sm font-semibold flex justify-center items-center gap-2">
              <span role="img" aria-label="tooth">
                🦷
              </span>{" "}
              {sanitizeContent(details && details.contactUs.heading1)}
            </p>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.contactUs.heading1)}
              onChange={(event) =>
                handleContentChange("contactUs", "heading1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <h2 className="text-3xl font-bold text-gray-900">
              {sanitizeContent(details && details.contactUs.heading2)}
            </h2>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.contactUs.heading2)}
              onChange={(event) =>
                handleContentChange("contactUs", "heading2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {sanitizeContent(details && details.contactUs.heading3)}
            </p>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.contactUs.heading3)}
              onChange={(event) =>
                handleContentChange("contactUs", "heading3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>

          {/* Contact Info Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact Details */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex items-center">
              <div className="bg-[#1E84B5] text-white p-4 rounded-full mr-4">
                <FaPhoneAlt size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Contact Details
                </h3>
                <p className="text-gray-600">{userDetails?.phoneNumber}</p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex items-center">
              <div className="bg-[#1E84B5] text-white p-4 rounded-full mr-4">
                <FaMapMarkerAlt size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600"> {userDetails?.address} </p>
              </div>
            </div>

            {/* Email Us */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex items-center">
              <div className="bg-[#1E84B5] text-white p-4 rounded-full mr-4">
                <FaEnvelope size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Email Us
                </h3>
                <p className="text-gray-600">{userDetails?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[#0d3b4d] text-white py-10">
        <div className="flex flex-col md:px-32 px-6 ">
          {/* Booking Section */}
          <div className="flex flex-col bg-[#0d3b4d] text-center lg:flex-row items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">
              {sanitizeContent(details && details.footer.header)}
              <EditTemplateLongInput
                value={sanitizeContent(details && details.footer.header)}
                onChange={(event) =>
                  handleContentChange("footer", "header", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
            </h2>
            <div>
              <button
                onClick={handleModalOpen}
                className="mt-4 lg:mt-0 bg-[#1E84B5] hover:bg-[#0d3550] text-white py-2 px-6 rounded-full flex items-center gap-2 transition duration-300"
              >
                Book Appointment →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <div className="flex items-center mb-4">
                <a href="#" className="flex items-center text-gray-800">
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
                        ref={(ref) =>
                          (fileInputRefs.current["footer-logo"] = ref)
                        }
                        onChange={(e) => handleImageChange(e, "footer", "logo")}
                        style={{ display: "none" }}
                      /> */}
                    </div>
                  </div>
                  <span className="text-md text-[#1E84B5] font-semibold leading-tight">
                   {userDetails?.ecosystemName} <br />
                  </span>
                </a>
              </div>
              <p className="text-gray-300">
              {sanitizeContent(details && details.footer.paragraph6)}
              </p>
              <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.paragraph6)}
              onChange={(event) =>
                handleContentChange("footer", "paragraph6", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
            />
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[#1E84B5]:text-blue-400"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[#1E84B5]:text-blue-400"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[#1E84B5]:text-blue-400"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[#1E84B5]:text-blue-400"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-blue-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#how" className="hover:text-blue-400">
                    Our Process
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Dental Care
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Cosmetic Dentistry
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Dental Implants
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Teeth Whitening
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FaPhone className="text-blue-400" />
                  <p>{userDetails?.phoneNumber}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-400" />
                  <p>{userDetails?.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <p>{userDetails?.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-600 mt-10 pt-6 text-center">
            <p>
              {" "}
              &copy; {new Date().getFullYear()} Built with{" "}
              <a
                href="https://dimpified.com"
                className="text-gray-400 hover:text-white text-sm"
              >
                Dimpified
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SecondDentist;
