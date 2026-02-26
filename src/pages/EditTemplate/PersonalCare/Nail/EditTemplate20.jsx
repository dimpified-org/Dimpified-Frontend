import React, { useState, useEffect } from "react";
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
// App Component
const SecondNail = ({ userDetails, subdomain }) => {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
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
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

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

  const galleryImages = [
    {
      id: 1,
      src: details && details.Gallery.image1,
      alt: "gallery-image",
    },
    {
      id: 2,
      src: details && details.Gallery.image2,
      alt: "gallery-image",
    },
    {
      id: 3,
      src: details && details.Gallery.image3,
      alt: "gallery-image",
    },
    {
      id: 4,
      src: details && details.Gallery.image4,
      alt: "gallery-image",
    },
    {
      id: 5,
      src: details && details.Gallery.image5,
      alt: "gallery-image",
    },
    {
      id: 6,
      src:details && details.Gallery.image6,
      alt: "gallery-image",
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-Urbanist">
      <>
        {/* Transparent Navbar */}
        <header className="sticky top-0  w-full z-50 text-white bg-black">
          <div className=" flex-wrap lg:px-32  px-4 py-6 flex justify-between items-center">
            <div className="text-3xl font-bold">
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}
            </div>
            {/* Hamburger Menu for Mobile */}
            <button
              className="md:hidden flex items-center space-x-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-sm">Menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-gray-300 font-bold">
                HOME
              </a>
              <a href="#about" className="hover:text-gray-300 font-bold">
                ABOUT
              </a>
              <a href="#services" className="hover:text-gray-300 font-bold">
                SERVICES
              </a>
              <a href="#pricing" className="hover:text-gray-300 font-bold">
                PRICING
              </a>
              <a href="#gallery" className="hover:text-gray-300 font-bold">
                GALLERY
              </a>

              <button
                onClick={handleModalOpen}
                className="px-4 py-2 border border-white rounded-lg    hover:border-pink-600 text-white  hover:bg-pink-600  transition font-bold"
              >
                BOOK APPOINTMENT
              </button>
            </nav>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-black text-white py-4 px-4 space-y-4">
              <a href="#home" className="block hover:text-gray-300">
                Home
              </a>
              <a href="#about" className="block hover:text-gray-300">
                About
              </a>
              <a href="#services" className="block hover:text-gray-300">
                Services
              </a>

              <a href="#pricing" className="block hover:text-gray-300">
                Pricing
              </a>
              <a href="#gallery" className="block hover:text-gray-300">
                Gallery
              </a>
              <button
                onClick={handleModalOpen}
                className="block px-4 py-2 border border-white    hover:border-pink-600 text-white  hover:bg-pink-600  text-center transition"
              >
                Book Appointment
              </button>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <div
          id="home"
          className="relative h-[60vh] md:h-screen bg-cover bg-center flex justify-center items-center"
          style={{
            backgroundImage: `url(${details && details.hero.backgroundImage1})`,
          }}
        >
          <div className="text-center space-y-6 px-4">
            <h1 className="text-4xl md:text-8xl text-white font-bold">
              {sanitizeContent(details && details.hero.title1)}
            </h1>
            <h1 className="text-4xl md:text-6xl text-white font-bold">
              with{" "}
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}
            </h1>
            <div className="mt-8">
              {" "}
              {/* Wrapper div to control spacing */}
              <button
                onClick={handleModalOpen}
                className="px-6 py-3 border rounded-lg border-white hover:border-pink-600 text-white  hover:bg-pink-600  transition uppercase"
              >
                {sanitizeContent(details && details.hero.buttonText1)}
              </button>
            </div>
            {/* {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )} */}
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
        <div className="flex gap-5 ">
          <div className="flex-1">
            <h1> header logo 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.title1)}
              onChange={(event) => handleContentChange("hero", "title1", event)}
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="flex-1">
            <h1> Button text 1</h1>
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
      </>
      <section id="about" className="py-12 bg-white">
        <div className="flex flex-col h-full py-4 px-4 lg:px-32">
          <div className="flex flex-col md:flex-row items-center h-full">
            {/* Text Block */}
            <div className="md:w-1/2 px-3 flex flex-col justify-center h-full">
              <span className="text-sm uppercase tracking-widest text-gray-600">
                {sanitizeContent(details && details.aboutUs.title1)}
              </span>
              <h2 className="text-3xl font-bold mt-4 text-gray-900 leading-snug">
                {sanitizeContent(details && details.aboutUs.title2)}
              </h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {sanitizeContent(details && details.aboutUs.text1)}
              </p>
            </div>

            {/* Image Block */}
            <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
              <img
                className="w-96 shadow-md rounded-full"
                src={details && details.aboutUs.image1}
                alt="Professional nail Session"
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
        </div>
        <div className="mt-7">
          <h1>Section header 2</h1>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.aboutUs.text1)}
            onChange={(event) => handleContentChange("aboutUs", "text1", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>
      </div>

      <div className="w-full bg-pink-600 py-8 lg:py-20 ">
        {/* Header Section */}
        <section id="services" className="text-center ">
          <div className="container mx-auto lg:px-32 px-4 justify-center items-center">
            <h2 className="text-4xl font-semibold text-white mb-4">
              {sanitizeContent(details && details.Events.heading)}
            </h2>
            <p className="text-slate-100  text-base leading-relaxed">
              {sanitizeContent(details && details.Events.summary)}
            </p>
          </div>
        </section>

        {/* Services Section */}
        <div className="pt-20 max-w-6xl mx-auto px-4">
          {/* Image Section */}

          {/* Service Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              {
                title: details && details.Events.section1header,
                description: details && details.Events.section1paragraphy,
                icon: details && details.Events.sectionImage1,
              },
              {
                title: details && details.Events.section2header,
                description: details && details.Events.section2paragraphy,
                icon: details && details.Events.sectionImage2,
              },
              {
                title: details && details.Events.section3header,
                description: details && details.Events.section3paragraphy,
                icon: details && details.Events.sectionImage3,
              },
              {
                title: details && details.Events.section4header,
                description: details && details.Events.section4paragraphy,
                icon: details && details.Events.sectionImage4,
              },
            ].map((service, index) => (
              <div key={index} className="space-y-4">
                <div className="relative">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="mx-auto w-36 h-36 rounded-full"
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
                            handleEditImageClick("aboutUs", `image${index + 1}`)
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                      ) : null*/}
                    </div>
                    <input
                      type="file"
                      ref={(ref) =>
                        (fileInputRefs.current[`aboutUs-image${index + 1}`] =
                          ref)
                      }
                      onChange={(e) =>
                        handleImageChange(e, "aboutUs", `image${index + 1}`)
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-lg text-slate-50">
                  {service.title}
                </h3>
                <p className="text-slate-50 text-sm">{service.description}</p>

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
                  className="custom-input-class"
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
                  className="custom-input-class"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="pricing" className="py-8">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-10">
            <span className="text-slate-50 uppercase tracking-wide text-sm">
              Focus On Beauty
            </span>
            <h2 className="text-gray-800 text-4xl font-semibold mt-2">
              Popular services
            </h2>
            <h3 className="text-lg text-gray-600 mt-4">Enhance Your Beauty</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <ul className="space-y-4">
              {services
                .slice(0, Math.ceil(services.length / 2))
                .map((service, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-300 pb-4"
                  >
                    <div>
                      <h4 className="text-lg font-medium">{service.name}</h4>
                      <p className="text-sm text-slate-50">
                        {service.shortDescription}
                      </p>
                    </div>
                    <span className="text-xl font-semibold text-gray-800">
                      {getCurrencySymbol(currency)}{service.price}
                    </span>
                  </li>
                ))}
            </ul>

            {/* Right Column */}
            <ul className="space-y-4">
              {services
                .slice(Math.ceil(services.length / 2))
                .map((service, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-300 pb-4"
                  >
                    <div>
                      <h4 className="text-lg font-medium">{service.name}</h4>
                      <p className="text-sm text-slate-50">
                        {service.shortDescription}
                      </p>
                    </div>
                    <span className="text-xl font-semibold text-gray-800">
                      {getCurrencySymbol(currency)}{service.price}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Button */}
          <div className="text-center mt-10">
            <button
              onClick={handleModalOpen}
              className="inline-block bg-transparent border-2 border-pink-600 text-pink-600 py-2 px-6 rounded-lg hover:bg-pink-600 hover:text-white transition-all"
            >
              Book Now!
            </button>
          </div>
        </div>
      </div>
      <section id="gallery" className="py-16 bg-pink-600">
        <div className="flex flex-wrap lg:px-32 px-4 justify-center items-center">
          {/* Section Title */}
          <div className="text-center mb-12">
            <span className="text-slate-50 uppercase text-sm tracking-wide ">
              {sanitizeContent(details && details.Gallery.summary1)}
            </span>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Gallery.summary1)}
              onChange={(event) =>
                handleContentChange("Gallery", "summary1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <h2 className="text-6xl text-pink-200 font-bold relative -top-6 opacity-10">
              {sanitizeContent(details && details.Gallery.summary3)}
            </h2>
            <h2 className="text-4xl font-semibold text-slate-50 relative">
              {sanitizeContent(details && details.Gallery.summary2)}
            </h2>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Gallery.summary3)}
              onChange={(event) =>
                handleContentChange("Gallery", "summary3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>

          {/* Gallery Images */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-2 md:col-span-2 relative">
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="w-full h-auto object-cover rounded-xl"
              />
              {/* Edit Button and File Input */}
              {/* userPlan && userPermissions.canEditImage && (
                <div className="absolute top-2 left-2 z-10">
                  <ButtonSmallPurple
                    width="60"
                    onClick={() => handleEditImageClick("Gallery", "image1")}
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Image"}
                  </ButtonSmallPurple>
                  <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current["Gallery-image1"] = ref)
                    }
                    onChange={(e) => handleImageChange(e, "Gallery", "image1")}
                    style={{ display: "none" }}
                  />
                </div>
              )*/}
            </div>
            <div className="col-span-5 relative">
              <img
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                className="w-full h-auto object-cover rounded-xl"
              />
              {/* userPlan && userPermissions.canEditImage && (
                <div className="absolute top-2 left-2 z-10">
                  <ButtonSmallPurple
                    onClick={() => handleEditImageClick("Gallery", "image2")}
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Image"}
                  </ButtonSmallPurple>
                  <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current["Gallery-image2"] = ref)
                    }
                    onChange={(e) => handleImageChange(e, "Gallery", "image2")}
                    style={{ display: "none" }}
                  />
                </div>
              )*/}
            </div>
            <div className="col-span-3 space-y-4 relative">
              <div className="relative">
                <img
                  src={galleryImages[2].src}
                  alt={galleryImages[2].alt}
                  className="w-full h-auto object-cover rounded-xl"
                />
                {/* userPlan && userPermissions.canEditImage && (
                  <div className="absolute top-2 left-2 z-10">
                    <ButtonSmallPurple
                      onClick={() => handleEditImageClick("Gallery", "image2")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                    <input
                      type="file"
                      ref={(ref) =>
                        (fileInputRefs.current["Gallery-image2"] = ref)
                      }
                      onChange={(e) =>
                        handleImageChange(e, "Gallery", "image2")
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                )*/}
              </div>
              <div className="relative">
                <img
                  src={galleryImages[3].src}
                  alt={galleryImages[3].alt}
                  className="w-full h-auto object-cover rounded-xl"
                />
                {/* userPlan && userPermissions.canEditImage && (
                  <div className="absolute top-2 left-2 z-10">
                    <ButtonSmallPurple
                      onClick={() => handleEditImageClick("Gallery", "image3")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                    <input
                      type="file"
                      ref={(ref) =>
                        (fileInputRefs.current["Gallery-image3"] = ref)
                      }
                      onChange={(e) =>
                        handleImageChange(e, "Gallery", "image3")
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                )*/}
              </div>
            </div>
            <div className="col-span-2 space-y-4">
              <div className="relative">
                <img
                  src={galleryImages[4].src}
                  alt={galleryImages[4].alt}
                  className="w-full h-auto object-cover rounded-xl"
                />
                {/* userPlan && userPermissions.canEditImage && (
                  <div className="absolute top-2 left-2 z-10">
                    <ButtonSmallPurple
                      onClick={() => handleEditImageClick("Gallery", "image4")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                    <input
                      type="file"
                      ref={(ref) =>
                        (fileInputRefs.current["Gallery-image4"] = ref)
                      }
                      onChange={(e) =>
                        handleImageChange(e, "Gallery", "image4")
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                )*/}
              </div>
              <div className="relative">
                <img
                  src={galleryImages[5].src}
                  alt={galleryImages[5].alt}
                  className="w-full h-auto object-cover rounded-xl"
                />
                {/* userPlan && userPermissions.canEditImage && (
                  <div className="absolute top-2 left-2 z-10">
                    <ButtonSmallPurple
                      onClick={() => handleEditImageClick("Gallery", "image5")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                    <input
                      type="file"
                      ref={(ref) =>
                        (fileInputRefs.current["Gallery-image5"] = ref)
                      }
                      onChange={(e) =>
                        handleImageChange(e, "Gallery", "image5")
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                )*/}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap lg:px-32 px-4 lg:py-12 justify-center items-center p-6">
        {/* Section 1: Time to Shine */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Image */}
          <div className="w-full lg:w-1/2 relative">
            <img
              src={details && details.Blog.image1}
              alt="Glamorous Nail Look"
              className="w-96 shadow-lg rounded-full"
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

          {/* Text and Accordion */}
          <div className="w-full lg:w-1/2">
            <span className="text-sm uppercase text-slate-50 font-medium">
              Time to Shine
            </span>
            <h2 className="text-3xl font-bold mt-2">
              {sanitizeContent(details && details.Blog.header1)}
            </h2>

            {/* Accordion */}
            <div className="mt-6">
              {[
                {
                  title: details && details.Blog.content1,
                  content: details && details.Blog.summary1,
                },
                {
                  title: details && details.Blog.content2,
                  content: details && details.Blog.summary2,
                },
                {
                  title: details && details.Blog.content3,
                  content: details && details.Blog.summary3,
                },
              ].map((item, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button
                    className="w-full flex justify-between items-center py-3 text-left font-medium text-gray-700 focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                  >
                    {sanitizeContent(item.title)}
                    <span>{activeAccordion === index ? "-" : "+"}</span>
                  </button>
                  {activeAccordion === index && (
                    <div className="py-2 text-gray-600">
                      {sanitizeContent(item.content)}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mb-16 px-4  lg:px- ">
              <h1>Edit About Us Section</h1>
              <div className="lg:flex gap-4">
                <div className="mt-7 flex-1">
                  <h1>Faq Section header 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Blog.content1)}
                    onChange={(event) =>
                      handleContentChange("Blog", "content1", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                </div>
                <div className="mt-7 flex-1">
                  <h1>Faq Section content 1</h1>
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

              <div className="lg:flex gap-4">
                <div className="mt-7 flex-1">
                  <h1>Faq Section header 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Blog.content2)}
                    onChange={(event) =>
                      handleContentChange("Blog", "content2", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                </div>
                <div className="mt-7 flex-1">
                  <h1>Faq Section content 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Blog.summary2)}
                    onChange={(event) =>
                      handleContentChange("Blog", "summary2", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                </div>
              </div>
              <div className="lg:flex gap-4">
                <div className="mt-7 flex-1">
                  <h1>Faq Section header 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Blog.content3)}
                    onChange={(event) =>
                      handleContentChange("Blog", "content3", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                </div>
                <div className="mt-7 flex-1">
                  <h1>Faq Section content 1</h1>
                  <EditTemplateLongInput
                    value={sanitizeContent(details && details.Blog.summary3)}
                    onChange={(event) =>
                      handleContentChange("Blog", "summary3", event)
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Booking Hours */}
        <div className="mt-12 flex flex-col lg:flex-row items-center gap-8">
          {/* Text */}
          <div className="w-full lg:w-1/2">
            <span className="text-sm uppercase text-slate-50 font-medium">
              Booking Schedule
            </span>
            <h2 className="text-3xl font-bold mt-2">
              {sanitizeContent(details && details.Blog.date3)}
            </h2>
            <p className="mt-4 text-gray-600">
              {sanitizeContent(details && details.Blog.author3)}
            </p>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Blog.date3)}
              onChange={(event) => handleContentChange("Blog", "date3", event)}
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <EditTemplateLongInput
              value={sanitizeContent(details && details.Blog.author3)}
              onChange={(event) =>
                handleContentChange("Blog", "author3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>

          {/* Table */}
          <div className="w-full lg:w-1/2">
            <table className="w-full text-left border-collapse">
              <tbody>
                {[
                  {
                    day: details && details.Blog.buttonText3,
                    time: details && details.Blog.date4,
                  },
                  {
                    day: details && details.Blog.image4,
                    time: details && details.Blog.author4,
                  },
                  {
                    day: details && details.Blog.header4,
                    time: details && details.Blog.content4,
                  },
                  {
                    day: details && details.Blog.summary4,
                    time: details && details.Blog.buttonText4,
                  },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="py-3 px-4 border-b border-gray-200">
                      {sanitizeContent(row.day)}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 text-right">
                      {sanitizeContent(row.time)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="lg:flex gap-4">
              <div className="mt-7 flex-1">
                <h1>Section header 1</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Blog.buttonText3)}
                  onChange={(event) =>
                    handleContentChange("Blog", "buttonText3", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
              <div className="mt-7 flex-1">
                <h1>Section header 2</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Blog.date4)}
                  onChange={(event) =>
                    handleContentChange("Blog", "date4", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>

              <div className="mt-7 flex-1">
                <h1>Section header 3</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Blog.image4)}
                  onChange={(event) =>
                    handleContentChange("Blog", "image4", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>

              <div className="mt-7 flex-1">
                <h1>Section header 4</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Blog.author4)}
                  onChange={(event) =>
                    handleContentChange("Blog", "author4", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
            </div>
            <div className="lg:flex gap-4">
              <div className="mt-7 flex-1">
                <h1>Section header 5</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Blog.header4)}
                  onChange={(event) =>
                    handleContentChange("Blog", "header4", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
              <div className="mt-7 flex-1">
                <h1>Section header 8</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Blog.content4)}
                  onChange={(event) =>
                    handleContentChange("Blog", "content4", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
              <div className="mt-7 flex-1">
                <h1>Section header 6</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Blog.summary4)}
                  onChange={(event) =>
                    handleContentChange("Blog", "summary4", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>

              <div className="mt-7 flex-1">
                <h1>Section header 7</h1>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Blog.buttonText4)}
                  onChange={(event) =>
                    handleContentChange("Blog", "buttonText4", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="about-section py-12 bg-pink-600">
        <div className="flex flex-wrap lg:px-32 px-4 justify-center items-center">
          {/* Section Title */}
          <div className="text-center mb-12">
            <span className="text-gray-400 uppercase tracking-wide text-sm">
              {sanitizeContent(details && details.Patrners.section2header)}
            </span>
            <h2 className="text-4xl font-bold text-slate-50 relative">
              <span className="absolute top-8 left-0 transform -translate-x-1/2 -translate-y-1/2 opacity-10 text-8xl">
                {sanitizeContent(details && details.Patrners.section1header)}
              </span>
              {sanitizeContent(details && details.Patrners.section3header)}
            </h2>
            <EditTemplateLongInput
              value={sanitizeContent(
                details && details.Patrners.section1header
              )}
              onChange={(event) =>
                handleContentChange("Patrners", "section1header", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <EditTemplateLongInput
              value={sanitizeContent(
                details && details.Patrners.section2header
              )}
              onChange={(event) =>
                handleContentChange("Patrners", "section2header", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <EditTemplateLongInput
              value={sanitizeContent(
                details && details.Patrners.section3header
              )}
              onChange={(event) =>
                handleContentChange("Patrners", "section3header", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Image */}
            <div className="flex justify-center relative">
              <img
                className="shadow-md object-cover h-auto w-full max-w-xs rounded-xl"
                src={details && details.Patrners.sectionImage1}
                alt="nail Tools"
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
                        handleEditImageClick("Patrners", "sectionImage1")
                      }
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null*/}
                </div>
                {/* <input
                  type="file"
                  ref={(ref) =>
                    (fileInputRefs.current["Patrners-sectionImage1"] = ref)
                  }
                  onChange={(e) =>
                    handleImageChange(e, "Patrners", "sectionImage1")
                  }
                  style={{ display: "none" }}
                /> */}
              </div>
            </div>

            {/* Text + Image */}
            <div className="bg-pink-500 p-6 rounded-lg">
              <h4 className="text-lg font-bold mb-4 text-white">
                {sanitizeContent(details && details.Patrners.section4header)}
              </h4>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.Patrners.section4header
                )}
                onChange={(event) =>
                  handleContentChange("Patrners", "section4header", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <p className="text-white mb-6">
                {sanitizeContent(details && details.Patrners.buttonText1)}
              </p>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Patrners.buttonText1)}
                onChange={(event) =>
                  handleContentChange("Patrners", "buttonText1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <div className="relative">
                <img
                  className="shadow-md object-cover h-auto w-full rounded-xl max-w-xs"
                  src={details && details.Patrners.sectionImage2}
                  alt="nail Application"
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
                          handleEditImageClick("Patrners", "sectionImage2")
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>
                  {/* <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current["Patrners-sectionImage2"] = ref)
                    }
                    onChange={(e) =>
                      handleImageChange(e, "Patrners", "sectionImage2")
                    }
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center relative">
              <img
                className="shadow-md object-cover h-auto w-full max-w-xs rounded-xl"
                src={details && details.Patrners.sectionImage3}
                alt="nail Products"
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
                        handleEditImageClick("Patrners", "sectionImage3")
                      }
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null*/}
                </div>
                {/* <input
                  type="file"
                  ref={(ref) =>
                    (fileInputRefs.current["Patrners-sectionImage3"] = ref)
                  }
                  onChange={(e) =>
                    handleImageChange(e, "Patrners", "sectionImage3")
                  }
                  style={{ display: "none" }}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        {/* Section Title */}
        <div className="text-center mb-10">
          <p className="uppercase text-slate-50 tracking-widest text-sm">
            Client Testimonials
          </p>
          <h2 className="text-2xl font-bold">What Our Clients Say</h2>
        </div>

        {/* Testimonials in a Single Column */}
        <div className="flex flex-col items-center md:px-32 px-4 space-y-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 border-2 relative w-full max-w-xl"
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
                            handleEditImageClick("Reviews", `image${index + 1}`)
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                      ) : null*/}
                    </div>
                    <input
                      type="file"
                      ref={(ref) =>
                        (fileInputRefs.current[`Reviews-image${(index = 1)}`] =
                          ref)
                      }
                      onChange={(e) =>
                        handleImageChange(e, "Patrners", `image${index + 1}`)
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold">{testimonial.name}</h3>
                <div className="text-pink-600 text-lg mb-2">
                  {testimonial.rating}
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {testimonial.content}
                </p>

                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Reviews?.[`header${index + 1}`]
                  )}
                  onChange={(event) =>
                    handleContentChange("Reviews", `header${index + 1}`, event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class mb-5"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Reviews?.[`title${index + 1}`]
                  )}
                  onChange={(event) =>
                    handleContentChange("Reviews", `title${index + 1}`, event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class mb-5"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Reviews?.[`summary${index + 1}`]
                  )}
                  onChange={(event) =>
                    handleContentChange("Reviews", `summary${index + 1}`, event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
            </div>
          ))}
          <div className="bg-white p-6 border-2 relative w-full max-w-xl">
            {/* Quote Icon */}
            <span className="absolute text-gray-200 text-6xl top-4 right-6">
              &#8220;
            </span>
            {/* Testimonial Content */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={details && details.contactUs.heading1}
                  alt={details && details.contactUs.heading2}
                  className="w-20 h-20 rounded-full object-cover mb-4"
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
                          handleEditImageClick("contactUs", "heading1")
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>
                  {/* <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current["contactUs-heading1"] = ref)
                    }
                    onChange={(e) =>
                      handleImageChange(e, "contactUs", "heading1")
                    }
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
              <h3 className="text-lg font-bold">
                {details && details.contactUs.heading2}
              </h3>
              <div className="text-pink-600 text-lg mb-2">
                {details && details.contactUs.heading3}
              </div>
              <p className="text-slate-700 leading-relaxed">
                {details && details.contactUs.heading4}
              </p>

              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading2)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-5"
              />
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading3)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading3", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-5"
              />
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading4)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading4", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          </div>
        </div>
      </section>

      <div>
        {/* Banner Section */}
        <section
          className="py-16 text-center text-white relative"
          style={{
            backgroundImage: `url(${details && details.LargeCta.image1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="px-4">
            <h2 className="text-4xl font-bold">
              <span className="block text-3xl font-bold uppercase mb-4">
                {details && details.LargeCta.header1}
              </span>
              <span className="text-yellow-400">
                {" "}
                {details && details.LargeCta.header2}
              </span>
            </h2>
            <h3 className="text-3xl mt-4">
              {" "}
              {details && details.LargeCta.header3}
            </h3>
            <button
              onClick={handleModalOpen}
              className="mt-8 inline-block rounded-lg bg-transparent border hover:bg-pink-600 border-white hover:border-pink-600 px-6 py-3 text-3xl text-white font-bold  hover:text-white transition"
            >
              Book an Appointment
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
                    onClick={() => handleEditImageClick("LargeCta", "image1")}
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Image"}
                  </ButtonSmallPurple>
                ) : null*/}
              </div>
              {/* <input
                type="file"
                ref={(ref) => (fileInputRefs.current["LargeCta-image1"] = ref)}
                onChange={(e) => handleImageChange(e, "LargeCta", "image1")}
                style={{ display: "none" }}
              /> */}
            </div>
          </div>
        </section>
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
        <EditTemplateLongInput
          value={sanitizeContent(details && details.LargeCta.header3)}
          onChange={(event) =>
            handleContentChange("LargeCta", "header3", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>

      <footer className="bg-gray-100 py-8">
        <div className="flex flex-wrap lg:px-32 justify-center items-center px-4">
          {/* Footer Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Footer Contacts */}
            <div className="flex-1">
              <h5 className="text-lg font-bold mb-4">
                {details && details.footer.header}
              </h5>
              <EditTemplateLongInput
                value={details && details.footer.header}
                onChange={(event) =>
                  handleContentChange("footer", "header", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <p>
                {userDetails && userDetails.address ? userDetails.address : ""}
              </p>

              <p className="mt-2">
                <a
                  href="tel:123456789"
                  className="text-gray-700 hover:text-black"
                >
                  {details && details.footer.title2}:{" "}
                  {userDetails && userDetails.phoneNumber
                    ? userDetails.phoneNumber
                    : ""}
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@yourdomain.com"
                  className="text-gray-700 hover:text-black"
                >
                  {userDetails && userDetails.email ? userDetails.email : ""}
                </a>
              </p>
            </div>

            {/* Footer Info */}
            <div className="flex-1">
              <h5 className="text-lg font-bold mb-4">
                {details && details.footer.title4}
              </h5>
              <EditTemplateLongInput
                value={details && details.footer.title4}
                onChange={(event) =>
                  handleContentChange("footer", "title4", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <p className="font-bold">
                {details && details.footer.paragraph3}
              </p>

              <p className="font-bold">
                {details && details.footer.paragraph4}
              </p>
              <p className="font-bold">
                {details && details.footer.paragraph5}
              </p>

              <EditTemplateLongInput
                value={details && details.footer.paragraph3}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph3", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <EditTemplateLongInput
                value={details && details.footer.paragraph4}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph4", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <EditTemplateLongInput
                value={details && details.footer.paragraph5}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph5", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>

            {/* Newsletter */}
            <div className="flex-1">
              <p className="mb-4">{details && details.footer.paragraph6}</p>
              <EditTemplateLongInput
                value={details && details.footer.paragraph6}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph6", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <button
                onClick={handleModalOpen}
                className="w-full p-2 bg-pink-600 b hover:border-pink-600 hover:bg-white hover:text-pink-600 text-white font-bold rounded-md"
              >
                Book an appointment
              </button>
            </div>
          </div>

          {/* Bottom Footer */}
        </div>{" "}
        <div className="mt-10 text-center text-gray-800 text-sm">
          <p>
            <span>
              © {new Date().getFullYear()}{" "}
              <a
                href="https://dimpified.com"
                className="hover:text-amber-600"
                target="_blank"
              >
                Dimpified.
              </a>{" "}
              All Rights Reserved
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};
export default SecondNail;
