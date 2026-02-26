import React, { useRef, Fragment, useState, useEffect } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaRegCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
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
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

const EditTemplate10 = ({ userDetails, subdomain }) => {
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

  // List of images
  const images = [
    details ? details.Gallery.image1 : "",
    details ? details.Gallery.image2 : "",
    details ? details.Gallery.image3 : "",
    details ? details.Gallery.image4 : "",
    details ? details.Gallery.image5 : "",
    details ? details.Gallery.image6 : "",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
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
    <Fragment>
      {/* Navbar Section */}

      <nav className="font-sen bg-white px-4 py-4 lg:px-10 mt-10 w-full z-50">
        <div className="relative container mx-auto flex items-center justify-between">
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
                Hair Services
              </a>
              <a
                href="#gallery"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </a>
              <a
                href="#pricing"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="font-semibold text-base hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </a>
              <button className="px-8 py-4 rounded-full shadow-lg text-black bg-white hover:bg-yellow-500 flex items-center justify-center gap-2">
                <span className="font-semibold hover:text-gray-100">
                  Online appointment
                </span>
                <FaRegCalendarAlt />
              </button>
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
              Hair Services
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
              href="#testimonials"
              className="font-semibold text-base hover:text-gray-700"
            >
              Reviews
            </a>
          </div>
          <button className="px-8 py-4 rounded-full shadow-lg text-white bg-yellow-600 hover:bg-gray-500 flex items-center justify-center gap-2">
            <span className="font-semibold hover:text-gray-100">
              Online appointment
            </span>
            <FaRegCalendarAlt />
          </button>
        </div>
      </nav>

      {/* Home Section */}
      <section
        id="home"
        className="relative font-sen px-4 h-screen bg-dark-gray"
        style={{
          backgroundImage: `url(${details && details.hero.backgroundImage1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-lvh flex flex-col items-center justify-center">
          <div className="text-center">
            <span className="text-lg text-white uppercase tracking-wider block mb-6 sm:mb-4">
              {sanitizeContent(details && details.hero.title1)}
            </span>
            <h1 className="font-limelight text-[2rem] lg:text-[6rem] px-4 lg:px-48 leading-none tracking-normal text-white mb-8 md:mb-5 shadow-lg">
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}
              <br />
              {sanitizeContent(details && details.hero.title2)}
            </h1>
            <div className="flex items-center justify-center">
              <button className="px-8 py-4 rounded-full shadow-lg text-black bg-white hover:bg-yellow-500 flex items-center justify-center gap-2">
                <span className="font-semibold hover:text-gray-100">
                  Online appointment
                </span>
                <FaRegCalendarAlt />
              </button>
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
      {/* edit hero section */}
      <div className="mb-16 px-4  lg:px- ">
        <h1 className="mt-5">Edit Hero Section</h1>
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

      {/* About Section */}
      <section id="about" className="px-4 font-sen bg-yellow-50 relative pb-8">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-32">
          <div className="flex flex-wrap items-center mb-12 sm:mb-10">
            {/* Text Section */}
            <div className="font-sen w-full xl:w-5/12 lg:w-6/12 mt-4 xl:mt-6 md:mt-8 xs:mt-10">
              <h2 className="font-limelight text-5xl font-light tracking-normal text-gray-800 mb-4">
                Award{" "}
                <span className="relative text-yellow-500">
                  winning
                  <span className="absolute bg-yellow-500 h-1 w-full bottom-2 left-0"></span>
                </span>{" "}
                barbershop.
              </h2>
              <p className="w-11/12 xl:w-full mb-8 sm:mb-6">
                {sanitizeContent(details && details.aboutUs.text1)}
              </p>

              <div className="inline-block">
                <a
                  href="#services"
                  className="inline-flex items-center text-white bg-yellow-500 hover:bg-yellow-600 text-lg px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
                >
                  Explore Services
                  <FaArrowRight className="ml-2" />
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-6/12 xl:pl-8 relative mt-12 md:mt-10">
              <div className="relative w-9/12 md:w-7/12 transition-transform transform hover:scale-105">
                <img
                  src={details && details.aboutUs.image1}
                  className="rounded-lg  w-auto"
                  alt="font-sen Studio"
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
                  alt="font-sen's Work"
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
      </section>
      {/* edit about us section */}
      <div className="mb-10 mt-10 px-4  lg:px- ">
        <h1>Edit About Us Section</h1>
        <div className="mt-7">
          <h1>Section header 1</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.aboutUs.text1)}
            onChange={(event) => handleContentChange("aboutUs", "text1", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
      </div>

      <section
        id="services"
        className="relative font-sen bg-yellow-100 px-4 pt-4 overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute left-0 top-[-50px] md:top-[-30px] w-full h-[100px] md:h-[50px] bg-no-repeat bg-left-top bg-cover"
          style={{ backgroundImage: `url(images/demo-barber-home-bg-up.png)` }}
        ></div>
        <div className="flex flex-col mt-10 justify-end">
          <button className="bg-sec8 p-4 text-primary1 rounded-md">
            Section Not Editable
          </button>
          <p>You can edit your service in the edit service page</p>
        </div>

        {/* Floating Image */}
        <div className="absolute left-0 top-[-130px] lg:top-[-90px] hidden md:block">
          <img
            src="https://gfa-tech.com/dimp-template-images/images/demo-barber-home-03.png"
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
            <h2 className="font-limelight text-4xl font-bold text-gray-800">
              Barbershop{" "}
              <span className=" relative text-yellow-600">
                services
                <span className="block w-full h-[2px] bg-yellow-600 absolute bottom-[-8px] left-0"></span>
              </span>
            </h2>
          </div>

          {/* Service Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {services &&
              services.length > 0 &&
              services.map((service, index) => (
                <div
                  key={index}
                  className="text-center px-12 lg:px-8 py-10 border-gray-200"
                >
                  <div className="relative mb-6 ">
                    {/* <img
                      src={service.serviceImage}
                      className="rounded-md"
                      alt={service.name}
                    /> */}
                  </div>
                  <span className="text-lg font-semibold text-gray-800 block mb-2">
                    {service.name}
                  </span>
                  <p className="leading-7 text-gray-600">
                    {service.shortDescription}
                  </p>
                  <div className="border-t border-b border-gray-200 py-2 my-4">
                    <span className="text-sm font-bold text-gray-800">
                      {getCurrencySymbol(currency)}{service.price}
                    </span>
                  </div>
                  <div className="bg-gray-800 hover:bg-yellow-600 text-white py-2">
                    <a
                      href="#"
                      className="flex justify-center items-center gap-2 text-sm"
                    >
                      Request an appointment{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              ))}
          </div>

          {/* Bottom Message */}
          <div className="text-center">
            <img
              src="https://gfa-tech.com/dimp-template-images/images/demo-barber-icon-05.png"
              className="inline h-[20px]"
              alt="Icon"
            />
            <p className="text-lg text-gray-800 inline-block ml-2">
              We're dedicated to empowering men to look and feel fantastic.
            </p>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="font-sen px-4 bg-very-light-yellow relative py-10"
      >
        <div className="flex flex-col h-full  py-4 px-4 lg:px-20">
          <div className="row mb-6">
            <div className="col-12 text-center">
              <h2 className="font-limelight text-4xl font-bold text-gray-800">
                Flexible{" "}
                <span className=" relative text-yellow-600">
                  pricing
                  <span className="block w-full h-[2px] bg-yellow-600 absolute bottom-[-8px] left-0"></span>
                </span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:mb-2">
            {services &&
              services.length > 0 &&
              services.map((item, index) => (
                <div
                  key={index}
                  className={`col ${
                    item.special ? "border border-light-yellow rounded" : ""
                  } p-0`}
                >
                  <div
                    className={`w-full px-8 py-4 ${
                      item.special ? "bg-light-yellow text-dark-gray" : ""
                    }`}
                  >
                    <div className="text-lg flex items-baseline w-full">
                      <span className="font-bold text-dark-gray flex-grow">
                        {item.name}
                      </span>
                      <div className="text-dark-gray">
                        {getCurrencySymbol(currency)}{item.price}
                      </div>
                    </div>
                    <div className="text-md flex items-baseline w-full">
                      <span className="font-bold text-dark-gray flex-grow">
                        <p>{item.shortDescription}</p>
                      </span>
                      <div className="rounded bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-2 ">
                        <a className="flex justify-center text-center items-center gap-2 text-sm">
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
      <section id="gallery" className="px-6 pb-8 bg-yellow-50 relative">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-20">
          <div className="w-full flex justify-center py-6">
            <h2 className="font-limelight text-4xl font-bold text-gray-800">
              Featured{" "}
              <span className=" relative text-yellow-600">
                gallery
                <span className="block w-full h-[2px] bg-yellow-600 absolute bottom-[-8px] left-0"></span>
              </span>
            </h2>
          </div>

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
      <section
        className="font-sen px-4 py-10 bg-yellow-100 relative"
        id="testimonials"
      >
        <div
          className="absolute left-0 top-[-50px] md:top-[-30px] sm:top-[-25px] xs:top-[-15px] bg-cover w-full h-[100px]"
          style={{
            backgroundImage: `url('https://gfa-tech.com/dimp-template-imags/images/demo-barber-home-bg-up.png')`,
          }}
        ></div>

        <div className="container mx-auto">
          <div className="w-full flex justify-center mb-6 lg:mb-10">
            <h2 className="font-limelight text-4xl  font-bold text-gray-800">
              Satisfied{" "}
              <span className=" relative text-yellow-600">
                customers
                <span className="block w-full h-[2px] bg-yellow-600 absolute bottom-[-8px] left-0"></span>
              </span>
            </h2>
          </div>

          <div className="container mx-auto">
            <div className=" relative px-5 sm:px-0 text-center md:text-left">
              <div className="text-center">
                <span className="text-xl ov leading-8 block mb-6">
                  {sanitizeContent(details && details.Reviews.summary1)}
                </span>
                <span className="text-lg font-bold text-gray-700 py-3 ">
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
                      value={sanitizeContent(details && details.Reviews.title1)}
                      onChange={(event) =>
                        handleContentChange("Reviews", "title1", event)
                      }
                      placeholder="Enter your domain..."
                      className="custom-input-class"
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-10">
                <span className="text-xl leading-8 block mb-2">
                  {sanitizeContent(details && details.Reviews.summary2)}
                </span>
                <span className="text-lg font-bold text-gray-700 py-3">
                  {sanitizeContent(details && details.Reviews.title2)}
                </span>
                <div className="mb-10 mt-10 px-4  lg:px- ">
                  <h1>Edit Review 2</h1>
                  <div className="mt-7">
                    <h1>Customer Review 2</h1>
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
              <div className="text-center mt-10">
                <span className="text-xl leading-8 block mb-2">
                  {sanitizeContent(details && details.Reviews.summary3)}
                </span>
                <span className="text-lg font-bold text-gray-700 py-3">
                  {sanitizeContent(details && details.Reviews.title3)}
                </span>
                <div className="mb-10 mt-10 px-4  lg:px- ">
                  <h1>Edit Review 3</h1>
                  <div className="mt-7">
                    <h1>Customer Review 3</h1>
                    <EditTemplateLongInput
                      value={sanitizeContent(
                        details && details.Reviews.summary3
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
                      value={sanitizeContent(details && details.Reviews.title3)}
                      onChange={(event) =>
                        handleContentChange("Reviews", "title3", event)
                      }
                      placeholder="Enter your domain..."
                      className="custom-input-class"
                    />
                  </div>
                </div>
              </div>
              <div
                className="autoplay-progress"
                slot="container-end"
                ref={progressCircle}
              >
                <span ref={progressContent}></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="font-sen px-4 py-4 lg:pb-10 bg-yellow-100 relative">
        <div
          className="absolute left-0 top-[-50px] md:top-[-30px] sm:top-[-25px] xs:top-[-15px] bg-cover w-full h-[100px]"
          style={{
            backgroundImage: "url('images/demo-barber-home-bg-up.png')",
          }}
        ></div>

        <div className="container mx-auto mt-10">
          <div className="grid grid-cols-1  counter-style-04">
            {/* Start counter item */}

            <div className="text-center mt-10">
              <h2 className="text-4xl font-limelight font-bold text-gray-800 mb-0">
                {sanitizeContent(details && details.Statistics.section1header)}
              </h2>
              <span className="text-lg text-gray-700 block">
                {sanitizeContent(
                  details && details.Statistics.section1paragraphy
                )}
              </span>
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
            {/* End counter item */}

            {/* Start counter item */}
            <div className="text-center mt-10">
              <h2 className="text-4xl font-limelight font-bold text-gray-800 mb-0">
                {sanitizeContent(details && details.Statistics.section2header)}
              </h2>
              <span className="text-lg text-gray-700 block">
                {sanitizeContent(
                  details && details.Statistics.section2paragraphy
                )}
              </span>
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
            {/* End counter item */}

            {/* Start counter item */}
            <div className="text-center mt-10">
              <h2 className="text-4xl font-limelight font-bold text-gray-800 mb-0">
                {sanitizeContent(details && details.Statistics.section3header)}
              </h2>
              <span className="text-lg text-gray-700 block">
                {sanitizeContent(
                  details && details.Statistics.section3paragraphy
                )}
              </span>
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
            {/* End counter item */}

            {/* Start counter item */}
            <div className="text-center mt-10">
              <h2 className="text-4xl font-limelight font-bold text-gray-800 mb-0">
                {sanitizeContent(details && details.Statistics.section4header)}
              </h2>
              <span className="text-lg text-gray-700 block">
                {sanitizeContent(
                  details && details.Statistics.section4paragraphy
                )}
              </span>
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
            {/* End counter item */}
          </div>
        </div>
      </section>
      <section className="font-sen relative z-10 pb-0">
        <div className="flex flex-col py-4 px-4 lg:px-32 lg:py-20">
          <div className="flex flex-wrap">
            <div className="lg:w-1/2 s:w-10/12 pb-7 sm:pb-10 px-6">
              <span className="font-lime text-base uppercase text-dark   font-bold mb-2 inline-block">
                Feel free to contact us.
              </span>
              <h2 className="font-limelight text-2xl font-normal text-yellow-600 tracking-normaler w-4/5 lg:w-full mb-10 sm:mb-8">
                Your looking good is our priority.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 mb-8 xs:mb-6">
                <div>
                  <span className="font-primary text-lg font-semibold text-dark-gray">
                    Visit our barbing salon
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

                <div>
                  <h1>Edit Opening Hour</h1>
                  <span className="font-primary text-lg font-semibold text-dark-gray">
                    {sanitizeContent(details && details.contactUs.heading4)}
                  </span>
                  <div className="mb-2 mt-2 px-4  lg:px- ">
                    <div className="mt-7">
                      <h1>Edit opening header</h1>
                      <EditTemplateLongInput
                        value={sanitizeContent(
                          details && details.contactUs.heading4
                        )}
                        onChange={(event) =>
                          handleContentChange("contactUs", "heading4", event)
                        }
                        placeholder="Enter your domain..."
                        className="custom-input-class"
                      />
                    </div>
                  </div>

                  <div className="h-px w-4/5 sm:w-full bg-dark-gray mt-2 mb-2"></div>
                  <div className="w-full">
                    <span className="font-primary block">
                      <span className="font-primary font-semibold text-dark-gray">
                        {sanitizeContent(details && details.contactUs.heading6)}
                      </span>{" "}
                    </span>
                    <h1>Edit opening hour</h1>
                    <EditTemplateLongInput
                      value={sanitizeContent(
                        details && details.contactUs.heading6
                      )}
                      onChange={(event) =>
                        handleContentChange("contactUs", "heading6", event)
                      }
                      placeholder="Enter your domain..."
                      className="custom-input-class"
                    />
                    <div className="mb-2 mt-10 px-4  lg:px- "></div>
                    <span className="font-primary block">
                      <span className="font-primary font-semibold text-dark-gray">
                        {sanitizeContent(details && details.contactUs.heading7)}
                      </span>{" "}
                    </span>
                    <div className="mt-7">
                      <h1>Edit weekend opening hour</h1>
                      <EditTemplateLongInput
                        value={sanitizeContent(
                          details && details.contactUs.heading7
                        )}
                        onChange={(event) =>
                          handleContentChange("contactUs", "heading7", event)
                        }
                        placeholder="Enter your domain..."
                        className="custom-input-class"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-5/12 sm:w-auto sm:mb-12 px-5" id="book">
              <div className="bg-dark-gray shadow-lg lg:p-10 rounded-lg xs:m-4 relative overflow-hidden">
                <h2 className="font-limelight text-2xl text-yellow-600 xs:mb-4  tracking-normal">
                  We're open to your feedbacks!
                </h2>
                <form
                  action="email-templates/contact-form.php"
                  method="post"
                  className=""
                >
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
                    className="inline-flex items-center text-white bg-yellow-500 hover:bg-yellow-600 text-lg px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
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
      <footer
        className="font-sen relative px-4 py-4 lg:py-20 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(https://gfa-tech.com/dimp-template-images/images/demo-barber-home-footer-bg.jpg)`,
        }}
      >
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div className="text-center md:w-10/12">
              <a
                href="demo-barber.html"
                className="relative z-10 inline-block mb-4"
              >
                <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
              </a>

              <span className="block font-limelight  text-gray-50 opacity-40 mt-[10px] mb-8 text-2xl xs:text-xl tracking-normal xs:tracking-normaler">
                {sanitizeContent(details && details.footer.header)}
              </span>
              <div className="mt-7">
                <h1 className="text-primary1">Edit footer header</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.footer.header)}
                  onChange={(event) =>
                    handleContentChange("footer", "header", event)
                  }
                  placeholder="Enter details..."
                  className="custom-input-class"
                />
              </div>
              {userDetails &&
                userDetails.socialMedia &&
                userDetails.socialMedia.length > 0 && (
                  <div className="mb-8">
                    <ul className="flex justify-center space-x-6">
                      <li>
                        <a
                          className="text-gray-50 hover:text-blue-600"
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaFacebookF className="w-6 h-6" />
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-gray-50 hover:text-blue-600"
                          href="https://www.instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaInstagram className="w-6 h-6" />
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-gray-50 hover:text-blue-600"
                          href="https://www.twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaTwitter className="w-6 h-6" />
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              <p className="mb-0 text-gray-100 text-base">
                &copy; 2024 Proudly powered by{" "}
                <a
                  href="https://www.dimpified.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-white hover:text-gray-300"
                >
                  DIMP
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default EditTemplate10;
