import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaQuoteLeft,
  FaArrowLeft,
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaCut,
} from "react-icons/fa";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import { HairSalon } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { GiHairStrands } from "react-icons/gi";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import { EditTemplateLongInput } from "../../../../component/Inputs";
import { updateContent } from "../../../../features/Template/editTemplate";
import { ButtonSmallPurple } from "../../../../component/Buttons";
// import { useImageEditor } from "../../../../helper/UploadImage";
import { PERMISSIONS } from "../../../../component/Permission/Creator";
import { LoadingSmall } from "../../../../component/LoadingSpinner";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

const EditTemplate48 = ({ userDetails, subdomain }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [currency, setCurrency] = useState([]);
  const [eServices, setEServices] = useState([]);

  const userPlan = useSelector((state) => state.ecosystemPlan.plan);
  const userPermissions = PERMISSIONS[userPlan] || {};
  const dispatch = useDispatch();
  const details = useSelector(
    (state) => state.editTemplate.editcurrentTemplate
  );

  const { country } = useCountry();
  const countryCode = country || "NG";

//   const {
//     fileInputRefs,
//     handleEditImageClick,
//     handleImageChange,
//     loadingImage,
//   } = useImageEditor();

  // Fetch services
  useEffect(() => {
    const getServiceDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`
        );
        const userCurrency = response.data.flatMap((item) => item.currency);
        const allServices = response.data.flatMap((item) => item.services);
        setCurrency(userCurrency);
        setEServices(allServices);
      } catch (error) {
        console.log("Error fetching services", error);
      }
    };
    getServiceDetails();
  }, [subdomain]);
  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sanitizeContent = (html) => {
    return sanitizeHtml(html, {
      allowedTags: [],
      allowedAttributes: {},
    });
  };

  const handleContentChange = (section, field, event, index = null) => {
    const value = event.target.value;
    dispatch(updateContent({ section, field, value, index }));
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonialsData.length);
  };

  const prev = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  // Map JSON data to sections
  const navLinks = ["Home", "About", "Services", "Gallery", "Contact"];

  const testimonialsData = [
    {
      quote: details?.Reviews?.summary1 || "not available",
      name: details?.Reviews?.header1 || "not available",
      role: details?.Reviews?.title1 || "not available",
      image: details?.Reviews?.image1 || "",
    },
    {
      quote: details?.Reviews?.summary2 || "not available",
      name: details?.Reviews?.header2 || "not available",
      role: details?.Reviews?.title2 || "not available",
      image: details?.Reviews?.image2 || "",
    },
    {
      quote: details?.Reviews?.summary3 || "not available",
      name: details?.Reviews?.header3 || "not available",
      role: details?.Reviews?.title3 || "not available",
      image: details?.Reviews?.image3 || "",
    },
  ].filter((testimonial) => testimonial.quote !== "not available");

  const galleryImages = [
    { url: details?.Gallery?.image1 },
    { url: details?.Gallery?.image2 },
    { url: details?.Gallery?.image3 },
    { url: details?.Gallery?.image4 },
    { url: "https://i.imghippo.com/files/pF2187MIk.jpg" },
    { url: "https://i.imghippo.com/files/AnBh4680GqM.jpg" },
  ].filter(({ url }) => url && url !== "not available");

  return (
    <>
      {/* Navbar */}
      <nav
        className={`w-full z-50 transition-colors duration-300 ${
          scrolled ? "bg-[#D6B981]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <a
              href="#home"
              className="text-white text-2xl flex items-center gap-2"
            >
              <GiHairStrands className="text-white" />
              {sanitizeContent(userDetails?.ecosystemName)}
            </a>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 text-lg items-center">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white hover:text-[#d5b46c] font-medium"
              >
                {link}
              </a>
            ))}
          </div>
          <div
            className="md:hidden text-2xl text-white cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-transparent w-full px-4 pb-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block text-white hover:text-[#d5b46c] font-medium"
              >
                {link}
              </a>
            ))}
            <div className="flex space-x-6 mt-2 text-white">
              <i className="fas fa-shopping-cart cursor-pointer"></i>
              <i className="fas fa-search cursor-pointer"></i>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-[60vh] md:min-h-[100vh]"
        style={{
          backgroundImage:
            details?.hero?.backgroundImage1 !== "not available"
              ? `url(${details?.hero?.backgroundImage1})`
              : "none",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 w-full text-center px-6">
          <div className="max-w-4xl mx-auto">
            {details?.hero?.title1 !== "not available" && (
              <>
                <p className="text-white text-xl font-bold md:text-xl mb-4">
                  {sanitizeContent(details?.hero?.title1)}
                </p>
              </>
            )}
            {details?.hero?.title2 !== "not available" && (
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
                  {sanitizeContent(details?.hero?.title2)}
                </h1>
              </>
            )}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <>
                <button
                  onClick={handleModalOpen}
                  className="bg-[#D6B981] text-white font-semibold px-8 py-3 rounded hover:bg-white hover:text-black transition"
                >
                  Book Appointment
                </button>
              </>
            </div>
            {/* userPermissions.canEditImage &&
              details?.hero?.backgroundImage1 !== "not available" && (
                <div
                  style={{
                    width: "120px",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    zIndex: 1000,
                  }}
                >
                  <ButtonSmallPurple
                    onClick={() =>
                      handleEditImageClick("hero", "backgroundImage1")
                    }
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Image"}
                  </ButtonSmallPurple>
                  <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current["hero-backgroundImage1"] = ref)
                    }
                    onChange={(e) =>
                      handleImageChange(e, "hero", "backgroundImage1")
                    }
                    style={{ display: "none" }}
                  />
                </div>
              )*/}
          </div>
        </div>
        {isModalOpen && (
          <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
        )}
      </section>

      {/* Edit Hero Section */}

      <div className="mb-10 px-4 md:px-16">
        <h1>Edit Hero Section</h1>
        <div className="mt-7">
          <div className="md:flex gap-4">
            <div className="flex-1">
              <h1>Header Text 1</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details?.hero?.title1)}
                onChange={(e) => handleContentChange("hero", "title1", e)}
                placeholder="Edit title..."
                className="custom-input-class text-black"
              />
            </div>
            <div className="flex-1">
              <h1>Header Text 2</h1>
              <EditTemplateLongInput
                value={sanitizeContent(details?.hero?.title2)}
                onChange={(e) => handleContentChange("hero", "title2", e)}
                placeholder="Edit title..."
                className="custom-input-class text-black"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="w-full bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-8 mb-14">
            <div>
              {details?.aboutUs?.title1 !== "not available" && (
                <>
                  <h4 className="text-[#D6B981] text-xl font-semibold mb-2">
                    {sanitizeContent(details?.aboutUs?.title1)}

                    <EditTemplateLongInput
                      value={sanitizeContent(details?.aboutUs?.title1)}
                      onChange={(e) =>
                        handleContentChange("aboutUs", "title1", e)
                      }
                      placeholder="Edit title..."
                      className="custom-input-class text-black"
                    />
                  </h4>
                </>
              )}
              {details?.aboutUs?.title2 !== "not available" && (
                <>
                  <h2 className="text-4xl md:text-5xl text-black leading-tight">
                    {sanitizeContent(details?.aboutUs?.title2)}

                    <EditTemplateLongInput
                      value={sanitizeContent(details?.aboutUs?.title2)}
                      onChange={(e) =>
                        handleContentChange("aboutUs", "title2", e)
                      }
                      placeholder="Edit title..."
                      className="custom-input-class text-black"
                    />
                  </h2>
                </>
              )}
            </div>
            <div className="max-w-xl">
              {details?.aboutUs?.text1 !== "not available" && (
                <>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {sanitizeContent(details?.aboutUs?.text1)}

                    <EditTemplateLongInput
                      value={sanitizeContent(details?.aboutUs?.text1)}
                      onChange={(e) =>
                        handleContentChange("aboutUs", "text1", e)
                      }
                      placeholder="Edit text..."
                      className="custom-input-class text-black"
                    />
                  </p>
                </>
              )}
              {details?.aboutUs?.buttonText1 !== "not available" && (
                <>
                  <a
                    href="#services"
                    className="text-[#D6B981] font-semibold border-b border-[#D6B981] hover:opacity-80"
                  >
                    {sanitizeContent(details?.aboutUs?.buttonText1)}

                    <EditTemplateLongInput
                      value={sanitizeContent(details?.aboutUs?.buttonText1)}
                      onChange={(e) =>
                        handleContentChange("aboutUs", "buttonText1", e)
                      }
                      placeholder="Edit button text..."
                      className="custom-input-class text-black"
                    />
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { image: details?.aboutUs?.image1, title: "Hair Cutting" },
              {
                image: "https://i.imghippo.com/files/JP8890tA.jpg",
                title: "Hair Styling",
              },
              {
                image: "https://i.imghippo.com/files/ECLe1506HWA.jpg",
                title: "Hair Curling",
              },
            ].map(
              (item, index) =>
                item.image !== "not available" && (
                  <div key={index} className="relative group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                    {userPermissions.canEditImage && (
                      <div
                        style={{
                          width: "120px",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          zIndex: 1000,
                        }}
                      >
                        <ButtonSmallPurple
                          onClick={() =>
                            handleEditImageClick("aboutUs", `image${index + 1}`)
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                        <input
                          type="file"
                          ref={(ref) =>
                            (fileInputRefs.current[
                              `aboutUs-image${index + 1}`
                            ] = ref)
                          }
                          onChange={(e) =>
                            handleImageChange(e, "aboutUs", `image${index + 1}`)
                          }
                          style={{ display: "none" }}
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition rounded"></div>
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm">Beauty Hair & Spa Salon</p>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </section>

      {/* Working Hours Section */}
      <section className="w-full bg-white text-[#1d1d1d] font-sans mt-9">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <div className="w-full h-full">
            <img
              src="https://i.imghippo.com/files/Omp6603YUQ.jpg"
              alt="Hair Wash"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative flex items-center px-6 py-16 lg:px-16 bg-[#f8f8f8]">
            <div className="relative z-10 w-full max-w-xl">
              {details?.contactUs?.heading1 !== "not available" && (
                <>
                  <p className="text-[#c7ae85] font-medium text-xl mb-2">
                    {sanitizeContent(details?.contactUs?.heading1)}

                    <EditTemplateLongInput
                      value={sanitizeContent(details?.contactUs?.heading1)}
                      onChange={(e) =>
                        handleContentChange("contactUs", "heading1", e)
                      }
                      placeholder="Edit title..."
                      className="custom-input-class text-black"
                    />
                  </p>
                </>
              )}
              {details?.Events?.summary !== "not available" && (
                <>
                  <h2 className="text-4xl font-semibold mb-4">
                    {sanitizeContent(details?.Events?.summary)}

                    <EditTemplateLongInput
                      value={sanitizeContent(details?.Events?.summary)}
                      onChange={(e) =>
                        handleContentChange("Events", "summary", e)
                      }
                      placeholder="Edit title..."
                      className="custom-input-class text-black"
                    />
                  </h2>
                </>
              )}
              {details?.Events?.section1paragraphy !== "not available" && (
                <>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {sanitizeContent(details?.Events?.section1paragraphy)}

                    <EditTemplateLongInput
                      value={sanitizeContent(
                        details?.Events?.section1paragraphy
                      )}
                      onChange={(e) =>
                        handleContentChange("Events", "section1paragraphy", e)
                      }
                      placeholder="Edit text..."
                      className="custom-input-class text-black"
                    />
                  </p>
                </>
              )}
              <div className="space-y-4">
                {details?.contactUs?.heading3 !== "not available" && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">
                      {sanitizeContent(details?.contactUs?.heading3)}

                      <EditTemplateLongInput
                        value={sanitizeContent(details?.contactUs?.heading3)}
                        onChange={(e) =>
                          handleContentChange("contactUs", "heading3", e)
                        }
                        placeholder="Edit text..."
                        className="custom-input-class text-black"
                      />
                    </span>
                    <span className="text-gray-800 font-medium">
                      {sanitizeContent(details?.contactUs?.heading4)}

                      <EditTemplateLongInput
                        value={sanitizeContent(details?.contactUs?.heading4)}
                        onChange={(e) =>
                          handleContentChange("contactUs", "heading4", e)
                        }
                        placeholder="Edit text..."
                        className="custom-input-class text-black"
                      />
                    </span>
                  </div>
                )}
                {details?.contactUs?.heading5 !== "not available" && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">
                      {sanitizeContent(details?.contactUs?.heading5)}

                      <EditTemplateLongInput
                        value={sanitizeContent(details?.contactUs?.heading5)}
                        onChange={(e) =>
                          handleContentChange("contactUs", "heading5", e)
                        }
                        placeholder="Edit text..."
                        className="custom-input-class text-black"
                      />
                    </span>
                    <span className="text-gray-800 font-medium">
                      {sanitizeContent(details?.contactUs?.heading4)}

                      <EditTemplateLongInput
                        value={sanitizeContent(details?.contactUs?.heading4)}
                        onChange={(e) =>
                          handleContentChange("contactUs", "heading4", e)
                        }
                        placeholder="Edit text..."
                        className="custom-input-class text-black"
                      />
                    </span>
                  </div>
                )}
              </div>
              {details?.Events?.buttonText1 !== "not available" && (
                <>
                  <button
                    onClick={handleModalOpen}
                    className="mt-8 bg-[#D6B981] text-white font-medium px-6 py-3 border border-black rounded hover:bg-white hover:text-black transition"
                  >
                    {sanitizeContent(details?.Events?.buttonText1)}

                    <EditTemplateLongInput
                      value={sanitizeContent(details?.Events?.buttonText1)}
                      onChange={(e) =>
                        handleContentChange("Events", "buttonText1", e)
                      }
                      placeholder="Edit button text..."
                      className="custom-input-class text-black"
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 px-4 md:px-16 bg-white">
        <h1 className="absolute text-[80px] md:text-[200px] font-bold opacity-5 left-1/2 top-10 transform -translate-x-1/2 select-none pointer-events-none">
          Services
        </h1>
        <div className="text-center mb-12 z-10 relative">
          {details?.Events?.heading !== "not available" && (
            <>
              <p className="text-[#D6B981] font-semibold text-xl mb-2">
                {sanitizeContent(details?.Events?.heading)}
                <EditTemplateLongInput
                  value={sanitizeContent(details?.Events?.heading)}
                  onChange={(e) => handleContentChange("Events", "heading", e)}
                  placeholder="Edit title..."
                  className="custom-input-class text-black"
                />
                =
              </p>
            </>
          )}
          {details?.Events?.summary !== "not available" && (
            <>
              <h2 className="text-4xl md:text-5xl text-gray-900">
                {sanitizeContent(details?.Events?.summary)}

                <EditTemplateLongInput
                  value={sanitizeContent(details?.Events?.summary)}
                  onChange={(e) => handleContentChange("Events", "summary", e)}
                  placeholder="Edit title..."
                  className="custom-input-class text-black"
                />
              </h2>
            </>
          )}
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 z-10 relative">
          {eServices.map((service, index) => (
            <div
              key={index}
              className="relative p-6 text-center border rounded shadow bg-white"
            >
              {/* service.serviceImage && (
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow"
                  />
                  <div className="absolute -top-2 -right-2 bg-white hover:bg-[#D6B981] transition rounded-full shadow-md p-2">
                    <FaCut className="text-[#D6B981] hover:text-white transition" />
                  </div>
                </div>
              ) */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {service.shortDescription}
              </p>
              <p className="price font-semibold text-gray-800">
                {getCurrencySymbol(currency)}
                {service.price}
              </p>
              <button
                onClick={handleModalOpen}
                className="inline-block uppercase mt-4 text-[#D6B981] hover:text-gray-700 font-medium"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
        <div className="fixed bottom-5 right-5 z-50">
          <button className="bg-[#D6B981] text-white w-10 h-10 flex items-center justify-center rounded">
            ▲
          </button>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="bg-[#f8f8f8] relative overflow-hidden py-20 px-4 md:px-16"
      >
        <h1 className="absolute text-[80px] md:text-[200px] font-bold opacity-5 left-1/2 top-10 transform -translate-x-1/2 select-none pointer-events-none">
          Gallery
        </h1>
        <div className="text-center mb-12 z-10 relative">
          {details?.Gallery?.summary1 !== "not available" && (
            <>
              <p className="text-[#D6B981] font-semibold text-xl mb-2">
                {sanitizeContent(details?.Gallery?.summary1)}

                <EditTemplateLongInput
                  value={sanitizeContent(details?.Gallery?.summary1)}
                  onChange={(e) =>
                    handleContentChange("Gallery", "summary1", e)
                  }
                  placeholder="Edit summary..."
                  className="custom-input-class text-black"
                />
              </p>
            </>
          )}
          {details?.Gallery?.summary5 !== "not available" && (
            <>
              <h2 className="text-4xl md:text-5xl text-gray-900">
                {sanitizeContent(details?.Gallery?.summary5)}

                <EditTemplateLongInput
                  value={sanitizeContent(details?.Gallery?.summary5)}
                  onChange={(e) =>
                    handleContentChange("Gallery", "summary5", e)
                  }
                  placeholder="Edit title..."
                  className="custom-input-class text-black"
                />
              </h2>
            </>
          )}
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
          {galleryImages.map(({ url }, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`Salon Gallery ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
              {/* userPermissions.canEditImage && (
                <div
                  style={{
                    width: "120px",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    zIndex: 1000,
                  }}
                >
                  <ButtonSmallPurple
                    onClick={() =>
                      handleEditImageClick("Gallery", `image${index + 1}`)
                    }
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Image"}
                  </ButtonSmallPurple>
                  <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current[`Gallery-image${index + 1}`] = ref)
                    }
                    onChange={(e) =>
                      handleImageChange(e, "Gallery", `image${index + 1}`)
                    }
                    style={{ display: "none" }}
                  />
                </div>
              )*/}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-white w-full mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          <div className="flex flex-col justify-between p-10 bg-[#f8f8f8] min-h-[600px] relative">
            <div className="flex flex-col justify-center items-center text-center mt-6">
              <h2 className="absolute text-[80px] text-gray-200 top-6 left-1/2 transform -translate-x-1/2 z-0 pointer-events-none">
                Feedback
              </h2>
              <FaQuoteLeft className="text-4xl text-[#D6B981] mb-4 z-10" />
              <p className="text-lg font-medium mb-6 z-10 max-w-xl leading-relaxed text-center">
                {sanitizeContent(testimonialsData[current].quote)}

                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Reviews?.[`summary${current + 1}`]
                  )}
                  onChange={(e) =>
                    handleContentChange("Reviews", `summary${current + 1}`, e)
                  }
                  placeholder="Edit testimonial text..."
                  className="custom-input-class text-black"
                />
              </p>
              <div className="flex items-center space-x-3 z-10 mt-2">
                {testimonialsData[current].image !== "not available" && (
                  <>
                    <img
                      src={testimonialsData[current].image}
                      alt={testimonialsData[current].name}
                      className="w-10 h-10 rounded-full"
                    />
                    {userPermissions.canEditImage && (
                      <div
                        style={{
                          width: "120px",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          zIndex: 1000,
                        }}
                      >
                        <ButtonSmallPurple
                          onClick={() =>
                            handleEditImageClick(
                              "Reviews",
                              `image${current + 1}`
                            )
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                        <input
                          type="file"
                          ref={(ref) =>
                            (fileInputRefs.current[
                              `Reviews-image${current + 1}`
                            ] = ref)
                          }
                          onChange={(e) =>
                            handleImageChange(
                              e,
                              "Reviews",
                              `image${current + 1}`
                            )
                          }
                          style={{ display: "none" }}
                        />
                      </div>
                    )}
                  </>
                )}
                <div className="text-left">
                  <h4 className="font-semibold text-sm">
                    {sanitizeContent(testimonialsData[current].name)}

                    <EditTemplateLongInput
                      value={sanitizeContent(
                        details?.Reviews?.[`header${current + 1}`]
                      )}
                      onChange={(e) =>
                        handleContentChange(
                          "Reviews",
                          `header${current + 1}`,
                          e
                        )
                      }
                      placeholder="Edit name..."
                      className="custom-input-class text-black"
                    />
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {sanitizeContent(testimonialsData[current].role)}

                    <EditTemplateLongInput
                      value={sanitizeContent(
                        details?.Reviews?.[`title${current + 1}`]
                      )}
                      onChange={(e) =>
                        handleContentChange("Reviews", `title${current + 1}`, e)
                      }
                      placeholder="Edit role..."
                      className="custom-input-class text-black"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="bg-white shadow border px-3 py-2 hover:bg-gray-100"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={next}
                className="bg-white shadow border px-3 py-2 hover:bg-gray-100"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
          {details?.Reviews?.image1 !== "not available" && (
            <div className="h-[600px] w-full">
              <img
                src={details?.Reviews?.image1}
                alt="client"
                className="w-full h-full object-cover"
              />
              {/* userPermissions.canEditImage && (
                <div
                  style={{
                    width: "120px",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    zIndex: 1000,
                  }}
                >
                  <ButtonSmallPurple
                    onClick={() => handleEditImageClick("Reviews", "image1")}
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Image"}
                  </ButtonSmallPurple>
                  <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current["Reviews-image1"] = ref)
                    }
                    onChange={(e) => handleImageChange(e, "Reviews", "image1")}
                    style={{ display: "none" }}
                  />
                </div>
              )*/}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white">
        <WhiteContactForm />
      </section>

      {/* Footer */}
      <footer className="bg-[#1c1c1c] text-white px-4 md:px-10 py-16 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h4 className="text-white font-semibold text-xl mb-5">About</h4>
            <ul className="space-y-3 text-gray-400 text-lg">
              {["Home", "About", "Services", "Gallery", "Contact"].map(
                (item, i) => (
                  <li
                    key={i}
                    className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:rounded-full before:bg-[#D6B981]"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xl mb-5">Services</h4>
            <ul className="space-y-3 text-gray-400 text-lg">
              {eServices.slice(0, 6).map((service, index) => (
                <li
                  key={index}
                  className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:rounded-full before:bg-[#D6B981]"
                >
                  <button onClick={handleModalOpen}>{service.name}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xl mb-5">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              {details?.footer?.paragraph2 !== "not available" && (
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-[#D6B981] mt-1" />
                  <div>
                    <p className="text-white">Location</p>
                    <p>
                      {sanitizeContent(
                        details?.footer?.paragraph2 || userDetails?.address
                      )}

                      <EditTemplateLongInput
                        value={sanitizeContent(details?.footer?.paragraph2)}
                        onChange={(e) =>
                          handleContentChange("footer", "paragraph2", e)
                        }
                        placeholder="Edit address..."
                        className="custom-input-class text-black"
                      />
                    </p>
                  </div>
                </li>
              )}
              {details?.footer?.paragraph4 !== "not available" && (
                <li className="flex items-start gap-3">
                  <FaPhoneAlt className="text-[#D6B981] mt-1" />
                  <div>
                    <p className="text-white">Hotline</p>
                    <p>
                      {sanitizeContent(details?.footer?.paragraph4)}

                      <EditTemplateLongInput
                        value={sanitizeContent(details?.footer?.paragraph4)}
                        onChange={(e) =>
                          handleContentChange("footer", "paragraph4", e)
                        }
                        placeholder="Edit phone..."
                        className="custom-input-class text-black"
                      />
                    </p>
                  </div>
                </li>
              )}
              {details?.footer?.paragraph3 !== "not available" && (
                <li className="flex items-start gap-3">
                  <FaEnvelope className="text-[#D6B981] mt-1" />
                  <div>
                    <p className="text-white">Email</p>
                    <p>
                      {sanitizeContent(details?.footer?.paragraph3)}

                      <EditTemplateLongInput
                        value={sanitizeContent(details?.footer?.paragraph3)}
                        onChange={(e) =>
                          handleContentChange("footer", "paragraph3", e)
                        }
                        placeholder="Edit email..."
                        className="custom-input-class text-black"
                      />
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xl mb-5">Socials</h4>
            <div className="flex gap-4">
              {details?.footer?.footerTags?.split(", ").map((tag, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 border border-gray-500 flex items-center justify-center rounded-full hover:bg-gray-700"
                >
                  {tag === "Facebook" && <FaFacebookF />}
                  {tag === "Twitter" && <FaTwitter />}
                  {tag === "LinkedIn" && <FaLinkedinIn />}
                  {tag === "Instagram" && <FaYoutube />}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 flex flex-col h-full py-4 px-3 lg:px-20 md:flex-row justify-between items-center text-gray-400 text-xl">
          <p>{sanitizeContent(details?.footer?.privacy)}</p>
        </div>
      </footer>
    </>
  );
};

export default EditTemplate48;
