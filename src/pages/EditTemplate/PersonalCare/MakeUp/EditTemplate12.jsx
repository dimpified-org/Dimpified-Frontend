import React, { Fragment, useEffect, useState } from "react";
import {
  FaFacebook,
  FaCommentDots,
  FaUser,
  FaEnvelope,
  FaTwitter,
  FaArrowRight,
  FaDollarSign,
  FaArrowLeft,
  FaPhoneAlt,
  FaDribbble,
  FaInstagram,
  FaLinkedin,
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
import api from "../../../../api/Template";
import { showToast } from "../../../../component/ShowToast";
import { PERMISSIONS } from "../../../../component/Permission/Creator";
import { MakeUp } from "../../../../data/Services";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";
const MakeupTemplate = ({ userDetails, subdomain }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  const ServiceBox = ({ title, description, img, icon, number }) => (
    <div className="font-sen flex flex-col sm:flex-row lg:flex-row lg:flex-grow lg:h-72 rounded-lg overflow-hidden shadow-lg hover:shadow-xl">
      <div
        className="relative bg-cover bg-center h-48 sm:h-48 lg:h-full lg:w-1/2 flex-shrink-0"
        style={{ backgroundImage: `url('${img}')` }}
      >
        <span className="absolute left-4 bottom-4 text-5xl sm:text-7xl font-bold text-gray-100">
          {number}
        </span>
      </div>
      <div className="relative bg-gray-100 p-6 flex-1 lg:w-1/2 lg:h-full">
        <div className="mb-4">
          <img className="w-16 sm:w-20" src={icon} alt="" />
        </div>
        <div>
          <span className="block text-lg sm:text-xl font-semibold text-dark-gray mb-2">
            {title}
          </span>
          <p className="text-gray-500 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      {/* Navbar section */}
      <nav className="font-sen w-full z-10 bg-black lg:text-white lg:bg-black">
        <div className="py-4 px-4 lg:px-24 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <div className="relative ">
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
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex space-x-8 items-center">
            {["about", "services", "pricing", "testimonials", "contact"].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className={`text-lg ${
                    activeLink === link ? "text-purple-600" : "text-white"
                  } hover:text-purple-400 transition`}
                  onClick={() => handleLinkClick(link)}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
              )
            )}
          </div>

          {/* Book Appointment Button for Desktop */}
          <a
            href="#contact"
            className="hidden lg:block text-white border border-white px-6 py-2 rounded-md hover:bg-white hover:text-gray-900 transition"
          >
            Book Appointment
          </a>

          {/* Hamburger Icon for Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700"
            aria-controls="navbar-collapse"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links (pushes hero down) */}
        {isOpen && (
          <div className="lg:hidden bg-orange-700 text-white w-full flex flex-col items-center space-y-4 py-4">
            {["about", "services", "pricing", "testimonials", "contact"].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className="block text-xl font-semibold py-2"
                  onClick={() => handleLinkClick(link)}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
              )
            )}

            {/* Book Appointment Button for Mobile */}
            <a
              href="#contact"
              className="block text-white border border-white text-center font-semibold py-2 px-4 rounded-lg hover:bg-orange-600"
            >
              Book Appointment
            </a>
          </div>
        )}
      </nav>

      {/* Hero section */}
      <section
        className="font-sen relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <span className="block text-lg mb-4 tracking-widest uppercase">
            {sanitizeContent(details && details.hero.title1)}
          </span>
          <h1 className="font-Rufina text-5xl lg:text-6xl font-bold mb-8">
            {sanitizeContent(details && details.hero.title2)} <br />
            {userDetails && userDetails.ecosystemName
              ? userDetails.ecosystemName
              : ""}
          </h1>
          {/* Buttons */}
          <a
            href="#contact"
            className="border border-white px-8 py-3 text-lg mb-4 inline-block rounded-md hover:bg-white hover:text-gray-900 transition"
          >
            Book Makeup Session
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

      {/* About section */}
      <Fragment>
        <section
          id="about"
          className="font-sen bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage:
              "url('https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-bg-01.jpg')",
          }}
        >
          <div className="flex flex-col h-full px-4 py-10 lg:px-24 lg:py-16">
            <div className="flex flex-wrap items-center mb-12 md:mb-20">
              <div className="w-full lg:w-5/12 md:mb-10 sm:mb-8">
                <span className="text-base-color text-sm mb-4 font-bold block uppercase tracking-wide">
                  {sanitizeContent(details && details.aboutUs.title1)}
                </span>
                <h3 className="font-Rufina text-3xl lg:text-5xl text-dark-gray tracking-tight mb-4">
                  {sanitizeContent(details && details.aboutUs.title2)}
                </h3>
                <p className="text-primary lg:w-10/12 leading-relaxed mb-10">
                  {sanitizeContent(details && details.aboutUs.text1)}
                </p>
                <div className="inline-block ">
                  <a
                    href="#contact"
                    className=" text-gray-800 font-Rufina font-semibold py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-200 flex items-center"
                  >
                    <span>
                      {sanitizeContent(details && details.aboutUs.buttonText1)}
                    </span>
                    <span className="ml-2">
                      <FaArrowRight />
                    </span>
                  </a>

                  <div className="inline-flex items-center text-dark-gray font-semibold text-lg xs:mt-5 xs:mb-5">
                    <FaPhoneAlt className="icon-small mr-3" />
                    <a
                      href={`tel:${sanitizeContent(
                        details && details.aboutUs.buttonText2
                      )}`}
                    >
                      {sanitizeContent(details && details.aboutUs.buttonText2)}
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 relative lg:ml-10 md:ml-8 mt-8 lg:mt-0">
                <span className="absolute font-Rufina text-6xl left-5 top-16 lg:top-10 text-dark-gray font-bold z-10 tracking-tight">
                  <span className="text-2xl max-w-40 font-Rufina block uppercase text-gray-800">
                    {sanitizeContent(details && details.aboutUs.text2)}
                  </span>
                </span>
                <div className="relative w-10/12 md:w-9/12 lg:w-8/12 overflow-hidden rounded-lg float-right">
                  <div className="relative">
                    <img
                      className="w-full h-auto"
                      src={`${details && details.aboutUs.image2}`}
                      alt="MakeUp"
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
                <div className="absolute left-[-70px] bottom-[-30px] w-8/12 overflow-hidden md:left-[-100px] sm:left-3 rounded-lg">
                  <div className="relative">
                    <img
                      className="w-full h-auto"
                      src={`${details && details.aboutUs.image1}`}
                      alt=""
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
            <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-4 sm:grid-cols-2 sm:text-left">
              <div className="mb-8">
                <h2 className="font-semibold text-5xl text-dark-gray m-0">
                  {sanitizeContent(
                    details && details.Statistics.section1header
                  )}
                </h2>
                <p className="text-dark-gray leading-7">
                  {sanitizeContent(
                    details && details.Statistics.section1paragraphy
                  )}
                </p>
              </div>
              <div className="mb-8">
                <h2 className="font-semibold text-5xl text-dark-gray m-0">
                  {sanitizeContent(
                    details && details.Statistics.section2header
                  )}
                </h2>
                <p className="text-dark-gray leading-7">
                  {sanitizeContent(
                    details && details.Statistics.section2paragraphy
                  )}
                </p>
              </div>
              <div className="mb-8">
                <h2 className="font-semibold text-5xl text-dark-gray m-0">
                  {sanitizeContent(
                    details && details.Statistics.section3header
                  )}
                </h2>
                <p className="text-dark-gray leading-7">
                  {sanitizeContent(
                    details && details.Statistics.section3paragraphy
                  )}
                </p>
              </div>
              <div className="mb-8">
                <h2 className="font-semibold text-5xl text-dark-gray m-0">
                  {sanitizeContent(
                    details && details.Statistics.section4header
                  )}
                </h2>
                <p className="text-dark-gray leading-7">
                  {sanitizeContent(
                    details && details.Statistics.section4paragraphy
                  )}
                </p>
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
              placeholder="Enter your header..."
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
              placeholder="Enter your header..."
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
              placeholder="Enter your header..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7">
            <h1>Section text 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.aboutUs.text2)}
              onChange={(event) =>
                handleContentChange("aboutUs", "text2", event)
              }
              placeholder="Enter your text..."
              className="custom-input-class"
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center gap-8 mt-10">
          <div>
            <h2 className="font-semibold  text-3xl text-yellow-950 m-0">
              {sanitizeContent(details && details.Statistics.section1header)}{" "}
            </h2>
            <p className="text-yellow-950">
              {sanitizeContent(
                details && details.Statistics.section1paragraphy
              )}{" "}
            </p>

            <div className="mb-10 mt-10 px-4  lg:px- ">
              <h1>Edit Statistics 1</h1>
              <div className="mt-7">
                <h1>Customer Number</h1>
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
                <h1>Customer details</h1>
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
          <div>
            <h2 className="font-semibold text-3xl  text-yellow-950 m-0">
              {sanitizeContent(details && details.Statistics.section2header)}
            </h2>
            <p className="text-yellow-950">
              {sanitizeContent(
                details && details.Statistics.section2paragraphy
              )}{" "}
            </p>
            <div className="mb-10 mt-10 px-4  lg:px- ">
              <h1>Edit Statistics 2</h1>
              <div className="mt-7">
                <h1>Customer Number</h1>
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
              <div className="mt-7">
                <h1>Customer details</h1>
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
          <div>
            <h2 className="font-semibold text-3xl  text-yellow-950 m-0">
              {sanitizeContent(details && details.Statistics.section3header)}
            </h2>
            <p className="text-yellow-950">
              {sanitizeContent(
                details && details.Statistics.section3paragraphy
              )}{" "}
            </p>
            <div className="mb-10 mt-10 px-4  lg:px- ">
              <h1>Edit Statistics 3</h1>
              <div className="mt-7">
                <h1>Customer Number</h1>
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
              <div className="mt-7">
                <h1>Customer details</h1>
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
          <div>
            <h2 className="font-semibold text-3xl  text-yellow-950 m-0">
              {sanitizeContent(details && details.Statistics.section4header)}
            </h2>
            <p className="text-yellow-950">
              {sanitizeContent(
                details && details.Statistics.section4paragraphy
              )}{" "}
            </p>
            <div className="mb-10 mt-10 px-4  lg:px- ">
              <h1>Edit Statistics 4</h1>
              <div className="mt-7">
                <h1>Customer Number</h1>
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
              </div>
              <div className="mt-7">
                <h1>Customer details</h1>
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
                  className="custom-input-class"
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>

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

      {/* services section */}
      <section
        id="services"
        className="font-sen relative bg-cover bg-no-repeat border-t border-light-gray z-10"
        style={{
          backgroundImage: `url('https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-bg-01.jpg')`,
        }}
      >
        <div className="absolute -left-24 top-1/2 -z-10 hidden lg:block">
          <img
            src="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-bg-img-03.png"
            alt=""
          />
        </div>
        <div className="container mx-auto pt-16 pb-8">
          <div className="flex justify-center mb-8">
            <div className="lg:w-1/2 text-center">
              <span className="text-lg mb-2 text-primary font-medium uppercase tracking-wider block">
                Premium Makeup Services
              </span>
              <h3 className="font-Rufina text-3xl lg:text-5xl text-dark-gray mx-auto leading-snug">
                Discover Our Makeup and Beauty Treatments
              </h3>
            </div>
          </div>
          <div className="mb-10 space-y-8 lg:flex lg:space-y-0 lg:space-x-8">
            <ServiceBox
              title="Makeup Artistry"
              description="Perfect your look with our expert makeup artists."
              img="https://gfa-tech.com/dimp-template-images/make-up/makeup-7.jpg"
              icon="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-icon-01.png"
              number="01"
            />
            <ServiceBox
              title="Skincare"
              description="Revitalize your skin with luxurious treatments."
              img="https://gfa-tech.com/dimp-template-images/make-up/makeup-4.jpg"
              icon="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-icon-02.png"
              number="02"
            />
          </div>
          <div className="space-y-8 lg:flex lg:space-y-0 lg:space-x-8">
            <ServiceBox
              title="Bridal Makeup"
              description="Look radiant on your special day with custom bridal makeup."
              img="https://gfa-tech.com/dimp-template-images/make-up/makeup-5.jpg"
              icon="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-icon-02.png"
              number="03"
            />
            <ServiceBox
              title="Glamour Makeup"
              description="Transform your look with our professional glamour makeup."
              img="https://gfa-tech.com/dimp-template-images/make-up/makeup-6.jpg"
              icon="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-icon-01.png"
              number="04"
            />
          </div>
        </div>
      </section>

      {/* pricing section */}
      <section
        id="pricing"
        className="font-sen relative z-10 bg-cover bg-no-repeat border-t border-gray-300"
        style={{
          backgroundImage: `url('https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-bg-01.jpg')`,
        }}
      >
        <div className="absolute -left-24 top-1/2 z-0 hidden lg:block transform -translate-y-1/2">
          <img
            src="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-bg-img-03.png"
            alt=""
          />
        </div>

        <div className="flex justify-center ">
          <div className="lg:w-5/6">
            <div className="flex flex-wrap">
              {eServices.map((service, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/2 lg:w-1/2 p-4 transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="flex items-center rounded-lg shadow-lg p-6 hover:bg-opacity-50">
                    {/* <img
                      src={service.serviceImage}
                      alt=""
                      className="w-32 h-32 rounded-full object-cover"
                    /> */}
                    <div className="ml-6 flex-grow">
                      <div className="flex items-center text-lg font-semibold">
                        <span className="text-gray-800">{service.name}</span>
                        <div className="flex-grow mx-4 border-t border-gray-300"></div>
                        <div className="text-gray-800 flex items-center">
                         {getCurrencySymbol(currency)}<span>{service.price}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery section */}
      <Fragment>
        <section
          className="font-sen relative z-10 bg-cover bg-no-repeat bg-top border-t border-gray-200"
          style={{
            backgroundImage: `url(${details && details.Blog.image1})`,
          }}
        >
          <div className="container mx-auto py-16">
            <div className="flex flex-wrap justify-center lg:justify-start items-center relative">
              <div className="lg:w-5/12 md:w-11/12 relative lg:ml-4 mb-8 lg:mb-0">
                <div className="relative">
                  <img
                    src={`${details && details.Blog.image2}`}
                    className="w-full rounded-md"
                    alt="Makeup Transformation"
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
                          onClick={() => handleEditImageClick("Blog", "image2")}
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                      ) : null*/}
                    </div>
                    {/* <input
                      type="file"
                      ref={(ref) =>
                        (fileInputRefs.current["Blog-image2"] = ref)
                      }
                      onChange={(e) => handleImageChange(e, "Blog", "image2")}
                      style={{ display: "none" }}
                    /> */}
                  </div>
                </div>
              </div>
              <div className="xl:w-5/12 lg:w-6/12 md:w-11/12 px-8 ml-7">
                <span className="block text-base tracking-widest text-primary font-medium text-uppercase mb-2">
                  {sanitizeContent(details && details.Blog.header1)}
                </span>
                <h3 className="font-serif text-4xl text-gray-800 mb-4">
                  {sanitizeContent(details && details.Blog.summary1)}
                </h3>
                <p className="text-gray-700 leading-relaxed max-w-md mb-4">
                  {sanitizeContent(details && details.Blog.date1)}
                </p>
                <ul className="list-none space-y-4">
                  <li className="border-t border-gray-200 py-4 text-gray-700">
                    {sanitizeContent(details && details.Blog.author1)}
                  </li>
                  <li className="border-t border-gray-200 py-4 text-gray-700">
                    {sanitizeContent(details && details.Blog.content1)}
                  </li>
                  <li className="border-t border-gray-200 py-4 text-gray-700">
                    {sanitizeContent(details && details.Blog.buttonText1)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section
          className="relative bg-cover bg-no-repeat p-0"
          style={{
            backgroundImage: `url(${details && details.Blog.image3})`,
          }}
        >
          <div className="container mx-auto p-0 flex items-center justify-center gap-0">
            <div className="w-full border-t border-gray-200"></div>

            <div className="relative w-1/3 max-w-[150px] text-center">
              {/* Rotating Image */}
              <style>
                {`
          @keyframes rotation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .animate-rotation {
            animation: rotation 5s linear infinite;
          }

          /* Media query for smaller screens */
          @media (max-width: 640px) {
            .container {
              flex-direction: column;
              gap: 2px; /* Adjust gap if needed */
            }
            .w-1/3 {
              width: 100%;
              max-width: 100px; /* Adjust for mobile */
            }
          }
        `}
              </style>
              <img
                src={`${details && details.Blog.image4}`}
                className="w-full animate-rotation"
                alt="Makeup Icon"
              />

              {/* <!-- Center Decoration Image --> */}
              <div class="absolute inset-0 mx-auto w-3/4 mt-4">
                <img
                  src="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-14.png"
                  alt="Makeup Decoration"
                />
              </div>
            </div>

            <div class="w-full border-t border-gray-200"></div>
          </div>
        </section>
        <div className="mb-16 mt-5 px-4  lg:px- ">
          <h1>Edit Blog Section</h1>
          <div className="mt-7">
            <h1>Section header 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Blog.header1)}
              onChange={(event) =>
                handleContentChange("Blog", "header1", event)
              }
              placeholder="Enter your header..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7">
            <h1>Section header 2</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Blog.summary1)}
              onChange={(event) =>
                handleContentChange("Blog", "summary1", event)
              }
              placeholder="Enter your header..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7">
            <h1>Section header 3</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Blog.date1)}
              onChange={(event) => handleContentChange("Blog", "date1", event)}
              placeholder="Enter your header..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7">
            <h1>Section author</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Blog.author1)}
              onChange={(event) =>
                handleContentChange("Blog", "author1", event)
              }
              placeholder="Enter your author..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7">
            <h1>Section content 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Blog.content1)}
              onChange={(event) =>
                handleContentChange("Blog", "content1", event)
              }
              placeholder="Enter your content..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7">
            <h1>Section content 2</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Blog.buttonText1)}
              onChange={(event) =>
                handleContentChange("Blog", "buttonText1", event)
              }
              placeholder="Enter your text..."
              className="custom-input-class"
            />
          </div>
        </div>
      </Fragment>

      {/* Testimonial section */}
      <section
        id="testimonials"
        className="relative bg-cover bg-no-repeat pt-16 md:pt-32"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-home-bg-01.jpg')",
        }}
      >
        <div className="absolute left-[-100px] top-1/2 transform -translate-y-1/2 hidden lg:block">
          <img
            src="https://gfa-tech.com/dimp-template-images/images/demo-spa-salon-bg-img-03.png"
            alt=""
          />
        </div>
        <div className="container mx-auto py-16">
          <div className="flex justify-center mb-6 md:mb-16 xs:mb-10">
            <div className="xl:w-10/12 relative px-4 text-center">
              <div className="relative">
                <div className="text-center">
                  <h6 className="font-serif leading-10 text-2xl text-gray-800 mb-5">
                    {sanitizeContent(details && details.Reviews.summary1)}
                  </h6>
                  <span className="block text-sm text-primary font-medium uppercase">
                    {sanitizeContent(details && details.Reviews.header1)}
                  </span>
                  <span className="block text-xs text-gray-800 font-medium uppercase">
                    {sanitizeContent(details && details.Reviews.title1)}
                  </span>

                  <div className="mb-10 mt-10 px-4  lg:px- ">
                    <h1>Edit Review 1</h1>
                    <div className="mt-7">
                      <h1>Customer Review 1</h1>
                      <EditTemplateLongInput
                        value={sanitizeContent(
                          details && details.Reviews.summary1
                        )}
                        onChange={(event) =>
                          handleContentChange("Reviews", "summary1", event)
                        }
                        placeholder="Enter your domain..."
                        className="custom-input-class"
                      />
                    </div>
                    <div className="mt-7">
                      <h1>Customer Review Name</h1>
                      <EditTemplateLongInput
                        value={sanitizeContent(
                          details && details.Reviews.title1
                        )}
                        onChange={(event) =>
                          handleContentChange("Reviews", "title1", event)
                        }
                        placeholder="Enter your domain..."
                        className="custom-input-class"
                      />
                    </div>
                    <div className="mt-7">
                      <h1>Customer Name</h1>
                      <EditTemplateLongInput
                        value={sanitizeContent(
                          details && details.Reviews.header1
                        )}
                        onChange={(event) =>
                          handleContentChange("Reviews", "header1", event)
                        }
                        placeholder="Enter your domain..."
                        className="custom-input-class"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h6 className="font-serif leading-10 text-2xl text-gray-800 mb-5">
                    {sanitizeContent(details && details.Reviews.summary2)}
                  </h6>
                  <span className="block text-sm text-primary font-medium uppercase">
                    {sanitizeContent(details && details.Reviews.header2)}
                  </span>
                  <span className="block text-xs text-gray-800 font-medium uppercase">
                    {sanitizeContent(details && details.Reviews.title2)}
                  </span>

                  <div className="mb-10 mt-10 px-4  lg:px- ">
                    <h1>Edit Review 2</h1>
                    <div className="mt-7">
                      <h1>Customer Review 1</h1>
                      <EditTemplateLongInput
                        value={sanitizeContent(
                          details && details.Reviews.summary2
                        )}
                        onChange={(event) =>
                          handleContentChange("Reviews", "summary2", event)
                        }
                        placeholder="Enter your domain..."
                        className="custom-input-class"
                      />
                    </div>
                    <div className="mt-7">
                      <h1>Customer Review Name</h1>
                      <EditTemplateLongInput
                        value={sanitizeContent(
                          details && details.Reviews.title2
                        )}
                        onChange={(event) =>
                          handleContentChange("Reviews", "title2", event)
                        }
                        placeholder="Enter your domain..."
                        className="custom-input-class"
                      />
                    </div>
                    <div className="mt-7">
                      <h1>Customer Name</h1>
                      <EditTemplateLongInput
                        value={sanitizeContent(
                          details && details.Reviews.header2
                        )}
                        onChange={(event) =>
                          handleContentChange("Reviews", "header2", event)
                        }
                        placeholder="Enter your domain..."
                        className="custom-input-class"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h6 className="font-serif leading-10 text-2xl text-gray-800 mb-5">
                    {sanitizeContent(details && details.Reviews.summary3)}
                  </h6>
                  <span className="block text-sm text-primary font-medium uppercase">
                    {sanitizeContent(details && details.Reviews.header3)}
                  </span>
                  <span className="block text-xs text-gray-800 font-medium uppercase">
                    {sanitizeContent(details && details.Reviews.title3)}
                  </span>

                  <div className="mb-10 mt-10 px-4  lg:px- ">
                    <h1>Edit Review 3</h1>
                    <div className="mt-7">
                      <h1>Customer Review 3</h1>
                      <EditTemplateLongInput
                        value={sanitizeContent(
                          details && details.Reviews.summary1
                        )}
                        onChange={(event) =>
                          handleContentChange("Reviews", "summary3", event)
                        }
                        placeholder="Enter your domain..."
                        className="custom-input-class"
                      />
                    </div>
                    <div className="mt-7">
                      <h1>Customer Review Name</h1>
                      <EditTemplateLongInput
                        value={sanitizeContent(
                          details && details.Reviews.title3
                        )}
                        onChange={(event) =>
                          handleContentChange("Reviews", "title3", event)
                        }
                        placeholder="Enter your domain..."
                        className="custom-input-class"
                      />
                    </div>
                    <div className="mt-7">
                      <h1>Customer Name</h1>
                      <EditTemplateLongInput
                        value={sanitizeContent(
                          details && details.Reviews.header3
                        )}
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
          </div>
          {/* Clients Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              "demo-spa-salon-client-01.png",
              "demo-spa-salon-client-02.png",
              "demo-spa-salon-client-03.png",
              "demo-spa-salon-client-04.png",
              "demo-spa-salon-client-05.png",
              "demo-spa-salon-client-06.png",
            ].map((client, index) => (
              <div key={index} className="mb-8">
                <div className="client-box">
                  <a href="#">
                    <img
                      src={`https://gfa-tech.com/dimp-template-images/images/${client}`}
                      className="h-[110px]"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* contact section */}
      <section id="contact" className="font-sen bg-[#f8f3ec] py-12">
        <div className="flex flex-col h-full py-4 px-4 lg:px-24 lg:flex-row items-start justify-between space-y-12 lg:space-y-0">
          {/* Left Side (Contact Info) */}
          <div className="lg:w-1/2 w-full">
            <span className="text-orange-500 text-lg font-sen font-bold uppercase tracking-widest">
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
            <h2 className="text-4xl font-Rufina font-semibold text-gray-800 mt-2 mb-10">
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
            {/* First Row: Visit our beauty salon and Book an appointment */}
            <div className="flex flex-col lg:flex-row lg:justify-between mb-5">
              {/* Visit our beauty salon */}
              <div className="lg:w-1/2 w-full lg:mr-4 mb-6 lg:mb-0">
                <h3 className="text-xl font-Rufina font-semibold text-gray-700">
                  {sanitizeContent(details && details.contactUs.heading3)}
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600 font-sen">
                  {userDetails && userDetails.address
                    ? userDetails.address
                    : ""}
                </p>
              </div>
              {/* Book an appointment */}
              <div className="lg:w-1/2 w-full">
                <h3 className="text-xl font-Rufina font-semibold text-gray-700 ">
                  {sanitizeContent(details && details.contactUs.heading4)}
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600">
                  <a
                    href={`mailto:${sanitizeContent(
                      details && details.contactUs.paragraph1
                    )}`}
                    className="underline font-sen"
                  >
                    {sanitizeContent(details && details.contactUs.paragraph1)}
                  </a>
                  <br />
                  <a
                    href={`mailto:${sanitizeContent(
                      details && details.contactUs.buttonText1
                    )}`}
                    className="underline font-sen"
                  >
                    {sanitizeContent(details && details.contactUs.buttonText1)}
                  </a>
                </p>
              </div>
            </div>
            {/* Second Row: Let's talk and Opening hours */}
            <div className="flex flex-col lg:flex-row lg:justify-between mb-5">
              {/* Let's talk */}
              <div className="lg:w-1/2 w-full lg:mr-4 mb-6 lg:mb-0">
                <h3 className="text-xl font-Rufina font-semibold text-gray-700">
                  {sanitizeContent(details && details.contactUs.heading5)}
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600 font-sen">
                  <a
                    href={`tel:${sanitizeContent(
                      details && details.footer.paragraph4
                    )}`}
                  >
                    {sanitizeContent(details && details.footer.paragraph4)}
                  </a>
                  <br />
                  {sanitizeContent(details && details.footer.paragraph5)}
                </p>
              </div>
              {/* Opening hours */}
              <div className="lg:w-1/2 w-full">
                <h3 className="text-xl font-Rufina font-semibold text-gray-700">
                  Opening hours
                </h3>
                <div className="border-b-2 border-gray-400 w-3/4 my-2"></div>
                <p className="text-gray-600 font-sen">
                  {sanitizeContent(details && details.footer.paragraph6)}
                  <br />
                  {sanitizeContent(details && details.footer.paragraph8)}
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
                placeholder="Enter your text..."
                className="custom-input-class"
              />
              <h1>Edit contact 4</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading5)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading5", event)
                }
                placeholder="Enter your text..."
                className="custom-input-class"
              />
              <h1>Edit contact 5</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading6)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading6", event)
                }
                placeholder="Enter your text..."
                className="custom-input-class"
              />
              <h1>Edit contact 6</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading4)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading4", event)
                }
                placeholder="Enter your text..."
                className="custom-input-class"
              />
            </div>
          </div>
          {/* Right Side (Form) */}
          <div className="lg:w-1/2 w-full relative">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg ml-auto relative">
              {/* Heading */}
              <h2 className="text-3xl font-sen font-bold text-white mb-8">
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
                  id="contact"
                  type="submit"
                  className="mt-4 bg-white text-gray-900 py-3 px-8 rounded shadow-md font-sen font-semibold hover:bg-gray-100 transition-colors"
                >
                  Book Appointment
                </button>
              </form>

              {/* Decorative Circle with Image */}
            </div>
            <div className="mt-7 ml-5 ">
              <h1>Edit Contact 7</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.paragraph1)}
                onChange={(event) =>
                  handleContentChange("contactUs", "paragraph1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Edit Contact 8</h1>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.contactUs.buttonText1
                )}
                onChange={(event) =>
                  handleContentChange("contactUs", "buttonText1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Edit Contact 9</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.footer.paragraph4)}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph4", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Edit Contact 10</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.footer.paragraph5)}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph5", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h1>Edit Contact 11</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.footer.paragraph6)}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph6", event)
                }
                placeholder="Enter your time..."
                className="custom-input-class"
              />
              <h1>Edit Contact 12</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.footer.paragraph8)}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph8", event)
                }
                placeholder="Enter your time..."
                className="custom-input-class"
              />
            </div>
          </div>
        </div>
      </section>

      {/* footer section */}
      <footer className="font-sen relative bg-[#f8f3ec] pt-16 pb-20 border-t border-gray-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left flex-wrap">
            {/* Left Column: Studio Location */}
            <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-left">
              <span className="text-xl font-medium text-gray-800 block mb-2">
                {sanitizeContent(details && details.footer.header)}
              </span>
              <p>
                {userDetails && userDetails.address ? userDetails.address : ""}
              </p>
              {/* Horizontal line under the left content */}
              <div className="border-t border-gray-300 w-full mt-4"></div>
            </div>

            {/* Center Column: Circular Image with Social Icons */}
            <div className="relative flex items-center justify-center w-full md:w-1/3 mb-8 md:mb-0">
              {/* Center Logo with Social Icons in Circular Path */}
              <div className="relative w-56 h-56 rounded-full flex items-center justify-center shadow-lg">
                <img
                  src={`${sanitizeContent(details && details.footer.logo)}`}
                  alt="Spa Salon"
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full flex flex-col items-center justify-between">
                    {/* Top Row: Facebook and Instagram */}
                    <div className="flex justify-between items-center w-full absolute top-1/2 transform -translate-y-1/2 px-4">
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform -rotate-45"
                      >
                        <FaFacebook className="text-gray-800 text-2xl" />
                      </a>
                      <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform -rotate-45"
                      >
                        <FaInstagram className="text-gray-800 text-2xl" />
                      </a>
                    </div>

                    {/* Center Row: Dribbble and Twitter inside the image */}
                    <div className="absolute flex justify-center items-center w-full h-full top-1/2 transform -translate-y-1/2">
                      <a
                        href="http://www.dribbble.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-2"
                      >
                        <FaDribbble className="text-gray-800 text-2xl" />
                      </a>
                      <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mx-2"
                      >
                        <FaTwitter className="text-gray-800 text-2xl" />
                      </a>
                    </div>

                    {/* Bottom Row: LinkedIn */}
                    <div className="absolute flex justify-center w-full bottom-2">
                      <a
                        href="http://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform -rotate-45"
                      >
                        <FaLinkedin className="text-gray-800 text-2xl" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Information */}
            <div className="w-full md:w-1/3 text-center md:text-right">
              <span className="text-xl font-medium text-gray-800 block mb-2">
                {sanitizeContent(details && details.footer.title2)}
              </span>
              <a href="mailto:info@example.com" className="block">
                {sanitizeContent(details && details.footer.title4)}
              </a>
              <a href="mailto:support@example.com" className="block">
                {sanitizeContent(details && details.footer.title3)}
              </a>
              {/* Horizontal line under the right content */}
              <div className="border-t border-gray-300 w-full mt-4"></div>
            </div>
            <h1>Edit Contact 13</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.title4)}
              onChange={(event) =>
                handleContentChange("footer", "title4", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <h1>Edit Contact 14</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.footer.title3)}
              onChange={(event) =>
                handleContentChange("footer", "title3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-10 text-center md:text-left space-y-2 md:space-y-0">
            <p className="w-full md:w-auto">
              © {new Date().getFullYear()} All rights reserved
            </p>
            <p className="w-full md:w-auto">
              <a
                href="https://www.dimpified.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-gray-800 font-medium"
              >
                {sanitizeContent(details && details.footer.paragraph1)}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default MakeupTemplate;
