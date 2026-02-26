import React, { useEffect, useState } from "react";
import { FiPlay } from "react-icons/fi";
import { barber } from "../../../../data/Services";
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
const BarberFresh = ({ userDetails, subdomain }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
        console.log(allServices)
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const galleryItems = [
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
  const specialists = [
    {
      name: details && details.Team.header1,
      designation: details && details.Team.summary1,
      image: details && details.Team.image1,
    },
    {
      name: details && details.Team.header2,
      designation: details && details.Team.summary2,
      image: details && details.Team.image2,
    },
    {
      name: details && details.Team.header3,
      designation: details && details.Team.summary3,
      image: details && details.Team.image3,
    },
    {
      name: details && details.Team.header4,
      designation: details && details.Team.summary4,
      image: details && details.Team.image4,
    },
  ];

  return (
    <div className="font-jak">
      <header
        className={`top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black bg-opacity-90 text-white shadow-md"
            : "bg-transparent text-black"
        }`}
      >
        <div className="flex-wrap flex justify-between items-center py-4 px-4 lg:px-32">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a
              href="#"
              className="text-2xl font-Raj font-bold uppercase text-yellow-500"
            >
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}{" "}
            </a>
          </div>

          {/* Desktop Navbar */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 text-md  font-bold">
              <li>
                <a href="#home" className="hover:text-yellow-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-yellow-500">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-yellow-500">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-yellow-500">
                  Gallery
                </a>
              </li>

              <li>
                <a href="#team" className="hover:text-yellow-500">
                  Team
                </a>
              </li>
            </ul>
          </nav>

          {/* Appointment Button */}
          <button
            onClick={handleModalOpen}
            className="hidden md:inline-block px-5 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition uppercase font-bold"
          >
            Book an appointment
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open Menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-black bg-opacity-90 text-white shadow-md md:hidden">
            <ul className="flex flex-col space-y-4 py-4 px-6">
              <li>
                <a href="#home" className="hover:text-yellow-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-yellow-500">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-yellow-500">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-yellow-500">
                  Gallery
                </a>
              </li>

              <li>
                <a href="#team" className="hover:text-yellow-500">
                  Team
                </a>
              </li>
            </ul>
            <button
              onClick={handleModalOpen}
              className="hidden md:inline-block px-5 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition uppercase font-bold"
            >
              Book an appointment
            </button>
          </div>
        )}
      </header>
      <section
        id="home"
        className="hero-section bg-cover bg-center lg:h-screen h-[700px] text-white relative"
        style={{
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
        }}
      >
        {/* {isModalOpen && (
          <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
        )} */}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="flex flex-wrap relative z-10 h-full items-center px-6 lg:px-32">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            {/* Text Section */}
            <div className="max-w-lg text-left">
              <h1 className="text-5xl md:text-8xl uppercase font-bold mb-4">
                {userDetails && userDetails.ecosystemName
                  ? userDetails.ecosystemName
                  : ""}{" "}
                {sanitizeContent(details && details.hero.title1)}
              </h1>
              <p className="mb-6 leading-relaxed text-lg">
                {sanitizeContent(details && details.hero.summary1)}
              </p>
              <button
                onClick={handleModalOpen}
                className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition"
              >
                {sanitizeContent(details && details.hero.buttonText1)}
              </button>
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
              value={sanitizeContent(details && details.hero.buttonText1)}
              onChange={(event) =>
                handleContentChange("hero", "buttonText1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
        </div>
        <div className="mt-7 flex-1">
          <h1>Section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.hero.summary1)}
            onChange={(event) => handleContentChange("hero", "summary1", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
      </div>

      <section className="relative pb-32 lg:pb-24 -mt-16 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            {/* Image Section */}
            <div className="w-full xl:w-1/3">
              <div
                className="bg-cover relative bg-center h-full rounded-md shadow-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${details && details.aboutUs.image3})`,
                  minHeight: "400px",
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
                        onClick={() =>
                          handleEditImageClick("aboutUs", "image3")
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>
                  {/* <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current["aboutUs-image3"] = ref)
                    }
                    onChange={(e) => handleImageChange(e, "aboutUs", "image3")}
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="w-full xl:w-2/3 flex flex-col justify-center bg-white p-8 rounded-md shadow-md">
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-4">
                  {sanitizeContent(details && details.Statistics.section1span)}
                </h2>
                <p className="text-gray-700">
                  {sanitizeContent(details && details.Statistics.section1icon)}
                </p>
              </div>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.Statistics.section1span
                )}
                onChange={(event) =>
                  handleContentChange("Statistics", "section1span", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-6"
              />
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.Statistics.section1icon
                )}
                onChange={(event) =>
                  handleContentChange("Statistics", "section1icon", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-6"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Service - Hair Cutting */}
                <div className="p-6 border rounded-md bg-white flex items-start">
                  <div className="mr-4">
                    <i className="text-yellow-600 text-3xl flaticon-scissors"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">
                      {sanitizeContent(
                        details && details.Statistics.section1header
                      )}
                    </h4>
                    <p>
                      {sanitizeContent(
                        details && details.Statistics.section1paragraphy
                      )}
                    </p>
                    <EditTemplateLongInput
                      value={sanitizeContent(
                        details && details.Statistics.section1header
                      )}
                      onChange={(event) =>
                        handleContentChange(
                          "Statistics",
                          "section1header",
                          event
                        )
                      }
                      placeholder="Enter your domain..."
                      className="custom-input-class my-6 "
                    />
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
                      className="custom-input-class mb-6"
                    />
                  </div>
                </div>

                {/* Service - Classic Shavings */}
                <div className="p-6 border rounded-md bg-white flex items-start">
                  <div className="mr-4">
                    <i className="text-yellow-600 text-3xl flaticon-scissors"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">
                      {sanitizeContent(
                        details && details.Statistics.section2header
                      )}
                    </h4>
                    <p>
                      {sanitizeContent(
                        details && details.Statistics.section2paragraphy
                      )}
                    </p>
                    <EditTemplateLongInput
                      value={sanitizeContent(
                        details && details.Statistics.section2header
                      )}
                      onChange={(event) =>
                        handleContentChange(
                          "Statistics",
                          "section2header",
                          event
                        )
                      }
                      placeholder="Enter your domain..."
                      className="custom-input-class my-6 "
                    />
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
                      className="custom-input-class mb-6"
                    />
                  </div>
                </div>

                {/* Service - Hair Dyeing */}
                <div className="p-6 border rounded-md bg-white flex items-start">
                  <div className="mr-4">
                    <i className="text-yellow-600 text-3xl flaticon-scissors"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">
                      {sanitizeContent(
                        details && details.Statistics.section3header
                      )}
                    </h4>
                    <p>
                      {sanitizeContent(
                        details && details.Statistics.section3paragraphy
                      )}
                    </p>
                    <EditTemplateLongInput
                      value={sanitizeContent(
                        details && details.Statistics.section3header
                      )}
                      onChange={(event) =>
                        handleContentChange(
                          "Statistics",
                          "section3header",
                          event
                        )
                      }
                      placeholder="Enter your domain..."
                      className="custom-input-class my-6 "
                    />
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
                      className="custom-input-class mb-6"
                    />
                  </div>
                </div>

                {/* Service - Hair Treatments */}
                <div className="p-6 border rounded-md bg-white flex items-start">
                  <div className="mr-4">
                    <i className="text-yellow-600 text-3xl flaticon-scissors"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">
                      {sanitizeContent(
                        details && details.Statistics.section4header
                      )}
                    </h4>
                    <p>
                      {sanitizeContent(
                        details && details.Statistics.section4paragraphy
                      )}
                    </p>
                    <EditTemplateLongInput
                      value={sanitizeContent(
                        details && details.Statistics.section4header
                      )}
                      onChange={(event) =>
                        handleContentChange(
                          "Statistics",
                          "section4header",
                          event
                        )
                      }
                      placeholder="Enter your domain..."
                      className="custom-input-class my-6 "
                    />
                    <EditTemplateLongInput
                      value={sanitizeContent(
                        details && details.Statistics.section4paragraphy
                      )}
                      onChange={(event) =>
                        handleContentChange(
                          "Statistics",
                          "section4paragraphy",
                          event
                        )
                      }
                      placeholder="Enter your domain..."
                      className="custom-input-class mb-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 lg:px-32 py-16">
        <div className="flex flex-wrap items-center justify-between">
          {/* Left Image */}
          <div className="w-full md:w-1/3 p-4 relative">
            <img
              src={details && details.aboutUs.image2}
              alt="Barbershop Interior"
              className="w-full rounded-md shadow-lg"
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
                ref={(ref) => (fileInputRefs.current["aboutUs-image3"] = ref)}
                onChange={(e) => handleImageChange(e, "aboutUs", "image3")}
                style={{ display: "none" }}
              /> */}
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/3 p-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              {sanitizeContent(details && details.aboutUs.title1)}
            </h2>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.aboutUs.title1)}
              onChange={(event) =>
                handleContentChange("aboutUs", "title1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class mb-6"
            />
            <p className="mt-4 text-gray-600 leading-relaxed">
              {sanitizeContent(details && details.aboutUs.text1)}
            </p>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.aboutUs.text1)}
              onChange={(event) =>
                handleContentChange("aboutUs", "text1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class mb-6"
            />

            {/* Author */}
            <div className="mt-8 flex flex-col items-center">
              <div className="relative">
                <img
                  src={details && details.aboutUs.image1}
                  alt="Barber Owner"
                  className="mt-2 object-cover rounded-full w-12 h-12"
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
                      (fileInputRefs.current["aboutUs-image3"] = ref)
                    }
                    onChange={(e) => handleImageChange(e, "aboutUs", "image3")}
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold">
                  {sanitizeContent(details && details.aboutUs.title2)}
                </h4>
                <p className="text-gray-500 text-sm">
                  {sanitizeContent(details && details.aboutUs.text2)}
                </p>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.aboutUs.title2)}
                  onChange={(event) =>
                    handleContentChange("aboutUs", "title2", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class mb-6"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.aboutUs.text2)}
                  onChange={(event) =>
                    handleContentChange("aboutUs", "text2", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class mb-6"
                />
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/3 p-4 relative">
            <img
              src={details && details.aboutUs.image2}
              alt="Professional Barber"
              className="w-full rounded-md shadow-lg"
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
                ref={(ref) => (fileInputRefs.current["aboutUs-image3"] = ref)}
                onChange={(e) => handleImageChange(e, "aboutUs", "image3")}
                style={{ display: "none" }}
              /> */}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-500 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            {sanitizeContent(details && details.Vision.visiomheader)}
          </h2>
          <button
            onClick={handleModalOpen}
            className="inline-block mt-4 px-6 py-3 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-yellow-500 transition"
          >
            {sanitizeContent(details && details.Vision.visionsummary)}
          </button>
        </div>
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Vision.visiomheader)}
          onChange={(event) =>
            handleContentChange("Vision", "visiomheader", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class my-6 text-black"
        />
        <EditTemplateLongInput
          value={sanitizeContent(details && details.Vision.visionsummary)}
          onChange={(event) =>
            handleContentChange("Vision", "visionsummary", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class mb-6 text-black"
        />
      </section>
      <section
        className="relative z-10 py-16 lg:px-32 px-4 bg-gray-50"
        id="services"
      >
        <div className="flex flex-col">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black uppercase">
              Our Services
            </h2>
            <p className="mt-3 text-gray-500">
              Experience top-tier grooming services tailored just for you.{" "}
              <br />
              From classic cuts to modern styles, we've got you covered.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="relative bg-white shadow-lg group">
                <div className="relative overflow-hidden bg-gradient-to-b rounded-md from-black via-transparent to-black">
                  <button onClick={handleModalOpen}>
                    {/* <img
                      src={service.serviceImage}
                      alt={service.name}
                      className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-300"
                    /> */}
                  </button>
                  <div className="absolute bottom-0 left-0 w-full px-6 py-2 bg-gradient-to-r from-black/60 to-[#cb54d1]/60 backdrop-blur-lg border border-white/20 shadow-xl">
                    <button onClick={handleModalOpen}>
                      <h3 className="text-white text-lg font-semibold">
                        {service.name}
                      </h3>
                    </button>
                    <p className="text-white text-xs opacity-80">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Images */}
        <div className="absolute top-0 left-0">
          <img
            src="https://gfa-tech.com/dimp-template-images/barber/barbernew/barber22.jpg"
            alt="Decorative Shape"
            className="w-24 h-24"
          />
        </div>
        <div className="absolute bottom-0 right-0">
          <img
            src="https://gfa-tech.com/dimp-template-images/barber/barbernew/barber23.jpg"
            alt="Decorative Shape"
            className="w-24 h-24"
          />
        </div>
      </section>

      <section
        className="py-12 bg-gray-100"
        id="pricing"
        style={{
          backgroundImage: `url(https://gfa-tech.com/dimp-template-images/barber/barbernew/barber24.jpg)`,
        }}
      >
        <div className="container mx-auto max-w-6xl bg-white rounded-md shadow-lg">
          {/* Section Heading */}
          <div className="text-center py-8 bg-black text-white">
            <h2 className="text-4xl font-bold uppercase">
              Affordable Pricing Plans
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Premium grooming at unbeatable prices. <br />
              Choose the perfect service that suits your style.
            </p>
          </div>

          {/* Pricing List */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-md ${
                    index % 2 === 0 ? "bg-yellow-50" : "bg-white"
                  } shadow`}
                >
                  {/* Service Image */}
                  {/* service.serviceImage && (
                    <img
                      src={service.serviceImage}
                      alt={service.name}
                      className="w-20 h-20 object-cover rounded-full mr-4"
                    />
                  ) */}
                  {/* Service Details */}
                  <div className="flex-1">
                    <h5 className="text-lg font-semibold text-gray-800">
                      {service.name}
                    </h5>
                    <p className="text-sm text-gray-500">
                      {service.shortDescription}
                    </p>
                  </div>
                  {/* Price */}
                  <div className="text-yellow-500 font-bold text-xl">
                    {getCurrencySymbol(currency)}{service.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="pt-28 pb-20 bg-[#f9f9f9] px-4 lg:px-24">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="flex flex-wrap justify-between items-end mb-10">
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <h2 className="text-4xl font-bold text-gray-800">
                {sanitizeContent(details && details.Gallery.summary1)}
              </h2>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Gallery.summary1)}
                onChange={(event) =>
                  handleContentChange("Gallery", "summary1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-6 text-black"
              />
              <p className="mt-2 text-gray-600">
                {sanitizeContent(details && details.Gallery.summary2)}
              </p>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Gallery.summary2)}
                onChange={(event) =>
                  handleContentChange("Gallery", "summary2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-6 text-black"
              />
            </div>
            <div className="w-full lg:w-auto">
              <a
                href=""
                className="inline-block bg-yellow-500 text-white font-medium py-3 px-6 rounded hover:bg-yellow-600 transition duration-300"
              >
                {sanitizeContent(details && details.Gallery.summary3)}
                <i className="fas fa-long-arrow-alt-right ml-2"></i>
              </a>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Gallery.summary3)}
                onChange={(event) =>
                  handleContentChange("Gallery", "summary3", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-6 text-black"
              />
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-md shadow-lg bg-white"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.description}</p>
                  <a
                    href=""
                    className="mt-4 inline-block bg-yellow-500 text-white font-medium py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
                  >
                    <i className="fas fa-long-arrow-alt-right"></i>
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
                          handleEditImageClick("Gallery", `image${index + 1}`)
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>
                  {/* <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current[`Gallery-image${index + 1}`] = ref)
                    }
                    onChange={(e) =>
                      handleImageChange(e, "Gallery", `image${index + 1}`)
                    }
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-2 bg-[#faf3eb]" id="contact">
        <div className="container mx-auto px-4 py-12 flex flex-wrap">
          {/* Left Content */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
            <div className="bg-[#d8a44d] text-white text-center py-10 px-8 lg:py-16 lg:px-12 shadow-lg">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-4">
                  {sanitizeContent(details && details.LargeCta.header1)}
                </h2>
                <p className="text-sm">
                  {sanitizeContent(details && details.LargeCta.header2)}
                </p>
              </div>
              <button
                onClick={handleModalOpen}
                className="inline-block mt-6 text-sm bg-white text-[#d8a44d] border border-white py-2 px-6 rounded-md shadow-md transition hover:bg-transparent hover:text-white"
              >
                {sanitizeContent(details && details.LargeCta.buttonText1)}
              </button>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.LargeCta.header1)}
                onChange={(event) =>
                  handleContentChange("LargeCta", "header1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-6 text-black"
              />
              <EditTemplateLongInput
                value={sanitizeContent(details && details.LargeCta.header2)}
                onChange={(event) =>
                  handleContentChange("LargeCta", "header2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-6 text-black"
              />
              <EditTemplateLongInput
                value={sanitizeContent(details && details.LargeCta.buttonText1)}
                onChange={(event) =>
                  handleContentChange("LargeCta", "buttonText1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-6 text-black"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-2/3 mt-8 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src={details && details.LargeCta.image1}
                alt="Video"
                className="rounded-md shadow-lg"
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
          </div>
        </div>
      </section>
      <section id="team" className="pt-16 pb-16 bg-white px-4 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Meet Our Specialists</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Our team of experienced professionals is here to bring your vision
            to life.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {specialists.map((specialist, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={specialist.image}
                  alt={specialist.name}
                  className="w-40 h-40 sm:w-72 sm:h-72 rounded-md shadow-lg"
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
                          handleEditImageClick("Team", `image${index + 1}`)
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>
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
              </div>
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-semibold">
                  {sanitizeContent(specialist.name)}
                </h3>
                <p className="text-yellow-500">
                  {sanitizeContent(specialist.designation)}
                </p>
              </div>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.Team?.[`header${index + 1}`]
                )}
                onChange={(event) =>
                  handleContentChange("Team", `header${index + 1}`, event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.Team?.[`summary${index + 1}`]
                )}
                onChange={(event) =>
                  handleContentChange("Team", `summary${index + 1}`, event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          ))}
        </div>
      </section>

      <footer
        className="bg-black text-white py-6 bg-cover"
        style={{
          backgroundImage: `url('/assets/images/background/footer.png')`,
        }}
      >
        <div className="container mx-auto px-4 lg:px-32">
          {/* Grid Layout for Better Responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-6">
            {/* Logo Section */}
            <div className="flex flex-col items-center sm:items-start">
              <a
                href="#"
                className="text-2xl font-bold uppercase text-yellow-500"
              >
                {userDetails && userDetails.ecosystemName}
              </a>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#services"
                    className="hover:text-yellow-400 transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-yellow-400 transition">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#Gallery"
                    className="hover:text-yellow-400 transition"
                  >
                    Gallery
                  </a>
                </li>
              </ul>
            </div>

            {/* Business Section */}
            <div>
              <h5 className="text-lg font-bold mb-4">Business</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#services"
                    className="hover:text-yellow-400 transition"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-yellow-400 transition"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#team" className="hover:text-yellow-400 transition">
                    Team
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h5 className="text-lg font-bold mb-4">Contact Us</h5>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="far fa-map-marker-alt text-yellow-400 mr-3"></i>
                  <span>{userDetails && userDetails.address}</span>
                </li>
                <li className="flex items-start">
                  <i className="far fa-phone text-yellow-400 mr-3"></i>
                  <a href="tel:+0123456789" className="hover:text-yellow-400">
                    {userDetails && userDetails.phoneNumber}
                  </a>
                </li>
                <li className="flex items-start">
                  <i className="far fa-clock text-yellow-400 mr-3"></i>
                  <span>Sun - Friday, 08 am - 09 pm</span>
                </li>
                <li className="flex items-start">
                  <i className="far fa-envelope text-yellow-400 mr-3"></i>
                  <a
                    href="mailto:support@gmail.com"
                    className="hover:text-yellow-400"
                  >
                    {userDetails && userDetails.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center border-t border-gray-700 mt-6 pt-4">
            <p>
              © {new Date().getFullYear()}{" "}
              <a href="https://dimpified.com" className="hover:text-yellow-400">
                Dimpified
              </a>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BarberFresh;
