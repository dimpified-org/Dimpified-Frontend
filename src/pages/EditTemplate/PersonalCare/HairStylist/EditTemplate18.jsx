import React, { useState, useEffect } from "react";
import {
  FaPlay,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
// import { HairSalon } from "../../../../data/Services";
// import BookingModal from "../../../../features/Booking/BookingModal";
import axios from "axios";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";
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

const ThirdStylist = ({ userDetails, subdomain }) => {
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
        
      const userCurrency = response.data.flatMap((item) => item.currency);
        const allServices = response.data.flatMap((item) => item.services);
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

  const services = [
    {
      id: 1,
      title: details && details.Events.section1header,
      description: details && details.Events.section1paragraphy,
      icon: details && details.Events.sectionImage1,
    },
    {
      id: 2,
      title: details && details.Events.section2header,
      description: details && details.Events.section2paragraphy,
      icon: details && details.Events.sectionImage2,
    },
    {
      id: 3,
      title: details && details.Events.section3header,
      description: details && details.Events.section3paragraphy,
      icon: details && details.Events.sectionImage3,
    },
  ];

  const testimonials = [
    {
      imgSrc: details && details.Reviews.image1,
      name: details && details.Reviews.header1,
      rating: details && details.Reviews.title1,
      content: details && details.Reviews.summary1,
    },
    {
      imgSrc: details && details.Reviews.image2,
      name: details && details.Reviews.header2,
      rating: details && details.Reviews.title2,
      content: details && details.Reviews.summary2,
    },
    {
      imgSrc: details && details.Reviews.image3,
      name: details && details.Reviews.header3,
      rating: details && details.Reviews.title3,
      content: details && details.Reviews.summary3,
    },
   
  ];

  const imageLinks = [
    { type: "image", url: details?.Gallery?.image2 },
    { type: "summary", url: details?.Gallery?.summary2 },
    { type: "image", url: details?.Gallery?.image3 },
    { type: "summary", url: details?.Gallery?.summary3 },
    { type: "image", url: details?.Gallery?.image4 },
    { type: "summary", url: details?.Gallery?.summary4 },
    { type: "image", url: details?.Gallery?.image5 },
    { type: "summary", url: details?.Gallery?.summary5 },
    { type: "image", url: details?.Gallery?.image6 },
    { type: "summary", url: details?.Gallery?.summary6 },
  ].filter(({ url }) => url);

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="font-Raj">
      <header className="sticky top-0 z-50 bg-black text-white">
        <nav className="flex flex-wrap items-center justify-between py-4 px-6 lg:px-8">
          {/* Logo */}
          <a href="/" className="text-3xl font-bold">
            {userDetails && userDetails.ecosystemName}
            <span className="text-gray-400">.</span>
          </a>

          {/* Main Menu */}
          <div className="hidden lg:flex space-x-6">
            <a href="#home" className="hover:text-gray-300">
              Home
            </a>
            <a href="#about" className="hover:text-gray-300">
              About us
            </a>
            <a href="#services" className="hover:text-gray-300">
              Services
            </a>
            <a href="#pricing" className="hover:text-gray-300">
              Pricing
            </a>

            <a href="#contact" className="hover:text-gray-300">
              Contact
            </a>
            <button
              onClick={handleModalOpen}
              className="px-3 py-1 bg-black text-white rounded-full hover:bg-white hover:text-black border border-white"
            >
              Book Now
            </button>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-400 focus:outline-none"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </nav>

        {/* Responsive Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-black text-white space-y-2 px-4 py-2">
            <a href="#home" className="block hover:text-gray-300">
              Home
            </a>
            <a href="#about" className="block hover:text-gray-300">
              About us
            </a>
            <a href="#services" className="block hover:text-gray-300">
              Services
            </a>
            <a href="#pricing" className="block hover:text-gray-300">
              Pricing
            </a>

            <a href="#contact" className="block hover:text-gray-300">
              Contact
            </a>
            <button
              onClick={handleModalOpen}
              className="block px-4 py-2 bg-white text-black rounded-full text-center"
            >
              Book Now
            </button>
          </div>
        )}
        {/* Horizontal Line */}
        <div className="border-t border-gray-600 "></div>
      </header>
      <section id="home" className="hero bg-black relative overflow-hidden">
        <div className="flex flex-wrap px-4 lg:px-32 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 px-6">
              <div className="mb-6">
                <h3 className="text-white uppercase text-lg font-medium mb-3 animate-fadeInUp">
                  {sanitizeContent(details && details.hero.title1)}
                </h3>
                <h1 className="text-5xl text-white lg:text-6xl font-bold leading-tight animate-fadeInUp">
                  {sanitizeContent(details && details.hero.title2)} with{" "}
                  {userDetails && userDetails.ecosystemName
                    ? userDetails.ecosystemName
                    : ""}{" "}
                </h1>
              </div>

              <div
                className="animate-fadeInUp text-gray-600 leading-relaxed mb-8"
                style={{ animationDelay: "0.5s" }}
              >
                <p className="mb-4 text-white">
                  {sanitizeContent(details && details.hero.summary1)}
                </p>
                <ul className="space-y-2 list-disc list-inside text-white">
                  <p>{sanitizeContent(details && details.hero.span1)}</p>
                  {/* Horizontal Line */}
                  <div className="border-t border-gray-600 my-6"></div>
                  <p>{sanitizeContent(details && details.hero.span2)}</p>
                </ul>
              </div>
              {/* {isModalOpen && (
                <BookingModal
                  isOpen={isModalOpen}
                  handleClose={handleModalClose}
                />
              )} */}

              <div
                className="flex justify-center lg:justify-start space-x-4 animate-fadeInUp"
                style={{ animationDelay: "0.75s" }}
              >
                <button
                  onClick={handleModalOpen}
                  className="bg-black text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition border border-white"
                >
                  Book Now
                </button>
                <a
                  href="#services"
                  className="bg-black text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition border border-white"
                >
                  Our Services
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <div
                className="relative hover:scale-105 transition-transform duration-500 animate-fadeInUp"
                style={{ animationDelay: "0.75s" }}
              >
                <img
                  src={details && details.hero.backgroundImage1}
                  alt="Hero"
                  className="rounded-3xl w-full max-w-lg h-auto"
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
            </div>
          </div>

          {/* Scroll Down Arrow */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <a
              href="#aboutus"
              className="block text-gray-600 hover:text-black transition animate-bounce"
            >
              <span className="w-8 h-8 border-2 border-gray-600 rounded-full flex items-center justify-center">
                ▼
              </span>
            </a>
          </div>
        </div>
      </section>
      <div className="mb-10 px-4  lg:px- ">
        <h1>Edit Hero Section</h1>
        <div className="mt-7">
          <div className="lg:flex gap-4">
            <div className="flex-1">
              <h1> header text 1</h1>
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
          <div className="lg:flex gap-4">
            <div className="flex-1">
              <h1>Section text 1</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.hero.span1)}
                onChange={(event) =>
                  handleContentChange("hero", "span1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
            <div className="flex-1">
              <h1>Section text 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.hero.span2)}
                onChange={(event) =>
                  handleContentChange("hero", "span2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>
          <div className="flex-1">
            <h1> hero content 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.summary1)}
              onChange={(event) =>
                handleContentChange("hero", "summary1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
        </div>
      </div>

      <div id="about" className="bg-white">
        <div
          id="aboutus"
          className="flex justify-between flex-col  lg:flex-row px-4 lg:px-20 py-16"
        >
          {/* Left Section */}
          <div className="flex flex-col flex-1 lg:flex-row items-center ">
            <div className=" grid grid-cols-2 gap-4 relative">
              <div className="col-span-1 relative">
                <img
                  src={details && details.aboutUs.image1}
                  alt="Salon Interior"
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
              <div className="col-span-1 flex flex-col items-center justify-between ">
                <div className="bg-black text-white p-4 rounded-md text-center">
                  <h4 className="text-2xl font-bold">
                    {sanitizeContent(details && details.aboutUs.image5)}
                  </h4>
                </div>

                {/* Editable Name Section */}
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.aboutUs.image5)}
                  onChange={(e) => handleContentChange("aboutUs", "image5", e)}
                  placeholder="Edit testimonial name..."
                  className="text-lg font-bold py-12"
                />
                <div className="relative">
                  <img
                    src={details && details.aboutUs.image2}
                    alt="Haircut Image"
                    className="rounded-md shadow-lg mt-4"
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
                      onChange={(e) =>
                        handleImageChange(e, "aboutUs", "image2")
                      }
                      style={{ display: "none" }}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8">
            <h3 className="text-gray-500 uppercase tracking-wide text-sm">
              About{" "}
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}
            </h3>
            <h2 className="text-2xl font-bold mt-2">
              {sanitizeContent(details && details.aboutUs.title2)}
            </h2>
            <p className="text-gray-600 mt-4">
              {sanitizeContent(details && details.aboutUs.text1)}
            </p>
            <ul className="mt-6 space-y-4 text-gray-800">
              <li>{sanitizeContent(details && details.aboutUs.text2)}</li>
              <div className="border-t border-gray-300 my-6"></div>
              <li>{sanitizeContent(details && details.aboutUs.image3)}</li>
              <div className="border-t border-gray-300 my-6"></div>
              <li>{sanitizeContent(details && details.aboutUs.image4)}</li>
            </ul>
            <a href="#services">
              <button className="mt-6 bg-black text-white hover:text-black px-6 py-2 rounded-md hover:bg-gray-100">
                Explore our services
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="lg:flex gap-4 lg:mx-20">
        <div className="flex-1 mt-5">
          <h1>section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.aboutUs.title2)}
            onChange={(event) =>
              handleContentChange("aboutUs", "title2", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
        <div className="flex-1 mt-5">
          <h1>section header 2</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.aboutUs.text1)}
            onChange={(event) => handleContentChange("aboutUs", "text1", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
      </div>
      <div className="lg:flex gap-4 lg:mx-20">
        <div className="flex-1 mt-5">
          <h1>section header 3</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.aboutUs.text2)}
            onChange={(event) => handleContentChange("aboutUs", "text2", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
        <div className="flex-1 mt-5">
          <h1>section header 4</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.aboutUs.image3)}
            onChange={(event) =>
              handleContentChange("aboutUs", "image3", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
        <div className="flex-1 mt-5">
          <h1>section header 5</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.aboutUs.image4)}
            onChange={(event) =>
              handleContentChange("aboutUs", "image4", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
      </div>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h3 className="text-gray-500 uppercase tracking-wide mb-2">
              {sanitizeContent(details && details.Events.heading)}
            </h3>

            <EditTemplateLongInput
              value={sanitizeContent(details && details.Events.heading)}
              onChange={(event) =>
                handleContentChange("Events", "heading", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />

            <h2 className="text-3xl font-bold">
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

          {/* Services List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                id="services"
                className={`flex flex-col items-center text-center p-6 ${
                  index !== 0 ? "border-l border-gray-300" : ""
                }`}
              >
                <div className="bg-black rounded-full p-6 mb-4 relative">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-12 h-12"
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
                              "Events",
                              `sectionImage${index + 1}`
                            )
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Icon"}
                        </ButtonSmallPurple>
                      ) : null*/}
                    </div>
                    <input
                      type="file"
                      ref={(ref) =>
                        (fileInputRefs.current[
                          `Events-sectionImage${index + 1}`
                        ] = ref)
                      }
                      onChange={(e) =>
                        handleImageChange(
                          e,
                          "Events",
                          `sectionImage${index + 1}`
                        )
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Editable Content Section */}
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Events?.[`section${index + 1}header`]
                  )}
                  onChange={(e) =>
                    handleContentChange(
                      "Events",
                      `section${index + 1}header`,
                      e
                    )
                  }
                  placeholder="Edit testimonial content..."
                  className="text-gray-500 text-2xl leading-relaxed mb-4"
                />

                {/* Editable Name Section */}
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Events?.[`section${index + 1}paragraphy`]
                  )}
                  onChange={(e) =>
                    handleContentChange(
                      "Events",
                      `section${index + 1}paragraphy`,
                      e
                    )
                  }
                  placeholder="Edit testimonial name..."
                  className="text-lg font-bold "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="bg-white py-12">
        <div className="flex flex-wrap px-4 lg:px-32">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Section - Text and Features */}
            <div className="lg:w-1/2">
              {/* Section Title */}
              <div className="mb-8">
                <h3 className="text-gray-400 uppercase tracking-wide mb-2 font-medium">
                  {sanitizeContent(
                    details && details.Statistics.section1header
                  )}
                </h3>
                <h2 className="text-2xl font-bold leading-tight text-gray-900">
                  {sanitizeContent(
                    details && details.Statistics.section1paragraphy
                  )}
                </h2>
              </div>

              {/* Features List */}
              <div className="space-y-6">
                {/* Feature Item 1 */}
                <div>
                  <div className="flex items-center">
                    <div className="bg-gray-900 text-white rounded-full p-3 flex-shrink-0 mr-4">
                      <img
                        src={details && details.Statistics.section2icon}
                        alt="Certified Stylists"
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
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
                  {/* Horizontal Line */}
                  <div className="border-t border-gray-300 my-6"></div>
                </div>

                {/* Feature Item 2 */}
                <div>
                  <div className="flex items-center">
                    <div className="bg-gray-900 text-white rounded-full p-3 flex-shrink-0 mr-4">
                      <img
                        src={details && details.Statistics.section3icon}
                        alt="100% Organic Cosmetics"
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
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

            {/* Right Section - Video */}
            <div className="lg:w-1/2 flex justify-center relative mt-12 lg:mt-0">
              {/* Circular Video Image */}
              <div className="relative w-72 h-72 lg:w-[400px] lg:h-[400px] overflow-hidden rounded-full shadow-lg">
                <img
                  src={details && details.Statistics.section1icon}
                  alt="Our Services in Action"
                  className="w-full h-full object-cover"
                />
                <div
                  style={{
                    width: "120px",
                    position: "absolute",
                    top: "50px",
                    left: "150px",
                    zIndex: 1000,
                  }}
                >
                  <div>
                    {/* userPlan && userPermissions.canEditImage ? (
                      <ButtonSmallPurple
                        width="40"
                        onClick={() =>
                          handleEditImageClick("Statistics", "section1icon")
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>
                  {/* <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current["Statistics-section1icon"] = ref)
                    }
                    onChange={(e) =>
                      handleImageChange(e, "Statistics", "section1icon")
                    }
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mb-16 px-4  lg:px- ">
        <h1>Edit About Us Section</h1>
        <div className="lg:flex gap-4">
          <div className="mt-7 flex-1">
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
          <div className="mt-7 flex-1">
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
        <div className="lg:flex gap-4">
          <div className="mt-7 flex-1">
            <h1>Section header 3</h1>
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
          <div className="mt-7 flex-1">
            <h1>Section header 4 </h1>
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
        <div className="lg:flex gap-4">
          <div className="mt-7 flex-1">
            <h1>Section header 5 </h1>
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
      </div>

      <section className="bg-gray-100 py-10">
        <div className="container mx-auto lg:px-32 px-4">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between">
            {/* Section Title */}
            <div className="lg:w-2/3 mb-6 lg:mb-0">
              <h3 className="text-gray-500 uppercase tracking-wide text-sm mb-2">
                {sanitizeContent(details && details.Statistics.section4header)}
              </h3>
              <h2 className="text-2xl font-bold text-gray-900">
                {sanitizeContent(
                  details && details.Statistics.section4paragraphy
                )}
              </h2>
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

            {/* Facts Items */}
            <div className="flex flex-row items-center justify-between w-full gap-8">
              {/* Fact 1 */}
              <div className="text-center">
                <h3 className="text-3xl font-bold mt-4">
                  {" "}
                  {sanitizeContent(details && details.Statistics.section4span)}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {sanitizeContent(details && details.Statistics.section4icon)}
                </p>
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section4span
                  )}
                  onChange={(event) =>
                    handleContentChange("Statistics", "section4span", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section4icon
                  )}
                  onChange={(event) =>
                    handleContentChange("Statistics", "section4icon", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>

              {/* Fact 2 */}
              <div className="text-center">
                <h3 className="text-3xl font-bold mt-4">
                  {" "}
                  {sanitizeContent(details && details.Statistics.section1span)}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {sanitizeContent(details && details.Statistics.section2span)}
                </p>
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
              </div>

              {/* Fact 3 */}
              <div className="text-center">
                <h3 className="text-3xl font-bold mt-4">
                  {" "}
                  {sanitizeContent(
                    details && details.Statistics.section3header
                  )}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {sanitizeContent(details && details.Statistics.section3span)}
                </p>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12" id="services">
        {/* Section Title */}
        <div className="text-center mb-10">
          <p className="uppercase text-sm tracking-widest text-gray-500">
            Hair Services
          </p>
          <h2 className="text-3xl font-bold">We have different styles</h2>
        </div>

        {/* Gift Cards */}
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
        <div className="flex flex-wrap lg:px-32 px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {eServices.map((service, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center rounded-lg border-2 overflow-hidden"
              >
                {/* Text Content */}
                <div className="p-6 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mt-2">
                    {service.shortDescription}
                  </p>
                  <button
                    onClick={handleModalOpen}
                    className="inline-block px-6 py-2 mt-4 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300"
                  >
                    Book Now
                  </button>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2">
                  {/* <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="bg-gray-50 py-10 px-4 ">
        <div className="max-w-7xl mx-auto text-center ">
          {/* Section Title */}
          <p className="text-sm uppercase text-gray-400 tracking-wide mb-2">
            Price List
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Our Best Prices
          </h2>

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

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {eServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border-2 text-left p-6 flex justify-between items-center hover:bg-black hover:text-white"
              >
                {/* Item Details */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 hover:text-white ">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {service.shortDescription}
                  </p>
                </div>
                {/* Price Tag */}
                <div className="relative bg-black text-white rounded-full p-4 flex items-center justify-center text-lg font-bold">
                  {getCurrencySymbol(currency)}{service.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 bg-white overflow-hidden">
        {/* Section Title */}
        <div className="container mx-auto px-4 lg:px-32 text-center mb-8">
          <h3 className="text-gray-600 uppercase tracking-wide text-sm mb-2">
            {sanitizeContent(details && details.Gallery.image1)}
          </h3>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Gallery.image1)}
            onChange={(event) =>
              handleContentChange("Gallery", "image1", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h2 className="text-3xl font-bold text-gray-900">
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
        {/* Responsive Grid */}
        <div className="mx-auto px-4 lg:px-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Dynamically Render Images */}
            {imageLinks.map(
              ({ type, url }, index) =>
                url && ( // Ensure only valid images are rendered
                  <div key={index} className="w-full h-60 relative">
                    <img
                      src={url}
                      alt={`Salon ${type} ${Math.floor(index / 2) + 2}`} // Correct indexing
                      className="rounded-lg object-cover w-full h-full"
                    />
                    <div
                      style={{
                        width: "120px",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        zIndex: 1000,
                      }}
                    >
                      {/* userPlan && userPermissions.canEditImage ? (
                        <ButtonSmallPurple
                          width="40"
                          onClick={() =>
                            handleEditImageClick(
                              "Gallery",
                              `${type}${Math.floor(index / 2) + 2}`
                            )
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                      ) : null*/}
                      <input
                        type="file"
                        ref={(ref) =>
                          (fileInputRefs.current[
                            `Gallery-${type}${Math.floor(index / 2) + 2}`
                          ] = ref)
                        }
                        onChange={(e) =>
                          handleImageChange(
                            e,
                            "Gallery",
                            `${type}${Math.floor(index / 2) + 2}`
                          )
                        }
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        ;
      </section>

      <section className="py-12 bg-gray-50">
        {/* Section Title */}
        <div className="text-center mb-10">
          <p className="uppercase text-gray-500 tracking-widest text-sm">
            Client Testimonials
          </p>
          <h2 className="text-2xl font-bold">What Our Clients Say</h2>
        </div>

        {/* Swiper Carousel */}
        <div className="flex flex-wrap md:px-32 px-4">
          <div className="grid grid-cols-1 gap-6 w-full">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border-2 relative"
              >
                {/* Quote Icon */}
                <span className="absolute text-gray-200 text-6xl top-4 right-6">
                  &#8220;
                </span>

                {/* Testimonial Content */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <img
                      src={testimonial.imgSrc}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover mb-4"
                    />
                    <div
                      style={{
                        width: "120px",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        zIndex: 1000,
                      }}
                    >
                      {/* userPlan && userPermissions.canEditImage ? (
                        <ButtonSmallPurple
                          width="40"
                          onClick={() =>
                            handleEditImageClick("Reviews", `image${index + 1}`)
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                      ) : null*/}
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
                  <h3 className="text-lg font-bold">{testimonial.name}</h3>
                  <div className="text-yellow-500 text-lg mb-2">
                    {testimonial.rating}
                  </div>
                  <p className="text-gray-500 leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>
                {/* Editable Content Section */}
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Reviews?.[`header${index + 1}`]
                  )}
                  onChange={(e) =>
                    handleContentChange("Reviews", `header${index + 1}`, e)
                  }
                  placeholder="Edit testimonial content..."
                  className="text-gray-500 text-2xl leading-relaxed mb-4"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Reviews?.[`title${index + 1}`]
                  )}
                  onChange={(e) =>
                    handleContentChange("Reviews", `title${index + 1}`, e)
                  }
                  placeholder="Edit testimonial content..."
                  className="text-gray-500 text-2xl leading-relaxed mb-4"
                />

                {/* Editable Name Section */}
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Reviews?.[`summary${index + 1}`]
                  )}
                  onChange={(e) =>
                    handleContentChange("Reviews", `summary${index + 1}`, e)
                  }
                  placeholder="Edit testimonial name..."
                  className="text-lg font-bold "
                />
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg border-2 relative">
            {/* Quote Icon */}
            <span className="absolute text-gray-200 text-6xl top-4 right-6">
              &#8220;
            </span>

            {/* Testimonial Content */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={details && details.contactUs.heading2}
                  alt={sanitizeContent(details && details.contactUs.heading1)}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                 <div
                      style={{
                        width: "120px",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        zIndex: 1000,
                      }}
                    >
                      {/* userPlan && userPermissions.canEditImage ? (
                        <ButtonSmallPurple
                          width="40"
                          onClick={() =>
                            handleEditImageClick(
                              "contactUs",
                              "heading2"
                            )
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                      ) : null*/}
                      <input
                        type="file"
                        ref={(ref) =>
                          (fileInputRefs.current[
                            "contactUs-heading2"
                          ] = ref)
                        }
                        onChange={(e) =>
                          handleImageChange(
                            e,
                            "contactUs",
                            "heading2"
                          )
                        }
                        style={{ display: "none" }}
                      />
                    </div>
              </div>

              <h3 className="text-lg font-bold">
                {sanitizeContent(details && details.contactUs.heading1)}
              </h3>
              <div className="text-yellow-500 text-lg mb-2">
                {sanitizeContent(details && details.contactUs.heading3)}
              </div>
              <p className="text-gray-500 leading-relaxed">
                {sanitizeContent(details && details.contactUs.heading4)}
              </p>
            </div>
            <EditTemplateLongInput
              value={sanitizeContent(details?.contactUs?.heading1)}
              onChange={(e) => handleContentChange("Reviews", `heading1`, e)}
              placeholder="Edit testimonial content..."
              className="text-gray-500 text-2xl leading-relaxed mb-4"
            />
            <EditTemplateLongInput
              value={sanitizeContent(details?.contactUs?.heading3)}
              onChange={(e) => handleContentChange("Reviews", `heading3`, e)}
              placeholder="Edit testimonial content..."
              className="text-gray-500 text-2xl leading-relaxed mb-4"
            />

            {/* Editable Name Section */}
            <EditTemplateLongInput
              value={sanitizeContent(details?.contactUs?.heading4)}
              onChange={(e) => handleContentChange("contactUs", `heading4`, e)}
              placeholder="Edit testimonial name..."
              className="text-lg font-bold "
            />
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white">
        {/* Footer Contact Information Section */}
        <div className="py-12" id="contact">
          <div className=" flex-wrap px-4 lg:px-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Our Location */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{sanitizeContent(details && details.footer.title1)}</h3>
              <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.title1)}
              onChange={(event) =>
                handleContentChange("footer", "title1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
              />
              <p className="text-gray-400 text-sm leading-relaxed">{userDetails && userDetails.address && userDetails.address}</p>
            </div>

            {/* Get in Touch */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{sanitizeContent(details && details.footer.title2)}</h3>
              <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.title2)}
              onChange={(event) =>
                handleContentChange("footer", "title2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
               {sanitizeContent(details && details.footer.paragraph2)} <br />
               {sanitizeContent(details && details.footer.paragraph3)} <br />
              </p>
              <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.paragraph2)}
              onChange={(event) =>
                handleContentChange("footer", "paragraph2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
              />
              <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.paragraph3)}
              onChange={(event) =>
                handleContentChange("footer", "paragraph3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
              />
            </div>

            {/* Working Hours */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{sanitizeContent(details && details.footer.title3)}</h3>
              <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.title3)}
              onChange={(event) =>
                handleContentChange("footer", "title3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
              {sanitizeContent(details && details.footer.paragraph4)}<br />
              {sanitizeContent(details && details.footer.paragraph5)}<br />
              {sanitizeContent(details && details.footer.paragraph6)}
              </p>
              <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.paragraph4)}
              onChange={(event) =>
                handleContentChange("footer", "paragraph4", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
              />
              <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.paragraph5)}
              onChange={(event) =>
                handleContentChange("footer", "paragraph5", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
              />
              <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.paragraph6)}
              onChange={(event) =>
                handleContentChange("footer", "paragraph6", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class text-black"
              />
            </div>
          </div>
        </div>

        {/* Main Footer Section */}
        <div className="border-t border-gray-700">
          <div className="flex-wrap px-4 lg:px-32 py-8 flex flex-col lg:flex-row items-center justify-between">
            {/* Footer Logo */}
            <div className="text-3xl font-bold mb-6 lg:mb-0">
            {userDetails && userDetails.ecosystemName && userDetails.ecosystemName}<span className="text-yellow-500">.</span>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4 mb-6 lg:mb-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaFacebookF className="text-lg" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
            </div>

            {/* Footer Menu */}
            <div className="text-center lg:text-right">
              <ul className="flex flex-wrap justify-center lg:justify-end space-x-4 text-gray-400 text-sm">
                <li>
                  <a
                    href="#home"
                    className="hover:text-white transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition duration-300"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#service"
                    className="hover:text-white transition duration-300"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition duration-300"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-gray-500 text-sm">
                Copyright &copy;{" "}
                <a href="https://dimpified.com" className="text-white ">
                  {" "}
                  Dimpified{" "}
                </a>
                . All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default ThirdStylist;
