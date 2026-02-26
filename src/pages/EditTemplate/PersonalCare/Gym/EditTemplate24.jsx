import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "react-modal-video/css/modal-video.css";
import { FiMenu, FiSearch } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from "motion/react";
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
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaStar,
  FaQuoteRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

// App Component
const SecondGym = ({ userDetails, subdomain }) => {
  const [isOpen, setIsOpen] = useState(false);
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
        setEServices(allServices);
         setCurrency(userCurrency);
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
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Gender");
  const [activity, setActivity] = useState("Select an activity factor");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!height || !weight) return;

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setStatus("Underweight");
    else if (bmiValue >= 18.5 && bmiValue <= 24.9) setStatus("Healthy");
    else if (bmiValue >= 25 && bmiValue <= 29.9) setStatus("Overweight");
    else setStatus("Obese");
  };

  const [open, setOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };
  const coaches = [
    {
      name: details && details.Team.header1,
      fullName: details && details.Blog.header1,
      experience: details && details.Blog.summary1,
      image: details && details.Blog.image1,
      socialLinks: {
        facebook: details && details.Blog.date1,
        twitter: details && details.Blog.author1,
        youtube: details && details.Blog.buttonText1,
        instagram: "https://instagram.com/",
      },
    },
    {
      name: details && details.Team.header2,
      fullName: details && details.Blog.header2,
      experience: details && details.Blog.summary2,
      image: details && details.Blog.image2,
      socialLinks: {
        facebook: details && details.Blog.date2,
        twitter: details && details.Blog.author2,
        youtube: details && details.Blog.buttonText2,
        instagram: "https://instagram.com/",
      },
    },
    {
      name: details && details.Team.header3,
      fullName: details && details.Blog.header3,

      experience: details && details.Blog.summary3,
      image: details && details.Blog.image3,
      socialLinks: {
        facebook: details && details.Blog.date3,
        twitter: details && details.Blog.author3,
        youtube: details && details.Blog.buttonText3,
        instagram: "https://instagram.com/",
      },
    },
    {
      name: details && details.Team.header4,
      fullName: details && details.Blog.header4,
      experience: details && details.Blog.summary4,
      image: details && details.Blog.image4,
      socialLinks: {
        facebook: details && details.Blog.date4,
        twitter: details && details.Blog.author4,
        youtube: details && details.Blog.buttonText4,
        instagram: "https://instagram.com/",
      },
    },
  ];

  const about = [
    details && details.aboutUs.title1,
    details && details.aboutUs.title2,
    details && details.aboutUs.text1,
  ];

  const services = [
    {
      title: details && details.Statistics.section1span,
      image: details && details.Statistics.section1icon,
    },
    {
      title: details && details.Statistics.section2span,
      image: details && details.Statistics.section2icon,
    },
    {
      title: details && details.Statistics.section3span,
      image: details && details.Statistics.section3icon,
    },
    {
      title: details && details.Statistics.section4span,
      image: details && details.Statistics.section4icon,
    },
  ];

  const galleryImages = [
    { key: "image1", src: details?.Gallery?.image1 },
    { key: "image2", src: details?.Gallery?.image2 },
    { key: "image3", src: details?.Gallery?.image3 },
    { key: "image4", src: details?.Gallery?.image4 },
    { key: "image5", src: details?.Gallery?.image5 },
    { key: "image6", src: details?.Gallery?.image6 },
    { key: "summary1", src: details?.Gallery?.summary1 },
    { key: "summary2", src: details?.Gallery?.summary2 },
  ].filter((item) => item.src);

  const testimonials = [
    {
      id: 1,
      image: details && details.Reviews.image1,
      text: details && details.Reviews.summary1,
      name: details && details.Reviews.header1,
      title: details && details.Reviews.title1,
    },
    {
      id: 2,
      image: details && details.Reviews.image2,
      text: details && details.Reviews.summary2,
      name: details && details.Reviews.header2,
      title: details && details.Reviews.title2,
    },
    {
      id: 3,
      image: details && details.Reviews.image3,
      text: details && details.Reviews.summary3,
      name: details && details.Reviews.header3,
      title: details && details.Reviews.title3,
    },
  ];

  const items = ["DUMBBELL ROWS", "MEDICINE BALL", "KETTLEBELL", "JUMP ROPE"];

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="font-Raj">
      <div>
        {/* Navbar */}
        <nav className=" top-0 left-0 w-full text-white px-6 py-4 flex justify-between items-center bg-black z-50">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-full">
              <img
                src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-icon-01.png"
                alt="Icon"
                className="h-6"
              />
            </div>
            <h1 className="text-2xl font-bold">
              {userDetails && userDetails.ecosystemName}
            </h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden text-2xl md:flex space-x-6 font-semibold">
            {[
              "Home",
              "About",
              "Services",
              "Membership",
              "Portfolio",
              "BMI Calculator",
            ].map((item) => (
              <a href={`#${item}`}>
                <li key={item} className="hover:text-red-500 cursor-pointer">
                  {item}
                </li>{" "}
              </a>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BsTelephone className="text-red-500" />
              <span className="hidden md:inline text-2xl">
                {userDetails && userDetails.phoneNumber}
              </span>
            </div>

            <FiMenu
              className="text-xl cursor-pointer md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <ul className="absolute text-lg top-16 left-0 w-full bg-black text-white flex flex-col items-center space-y-4 py-4 md:hidden">
              {[
                "Home",
                "About",
                "Services",
                "Membership",
                "Portfolio",
                "BMI Calculator",
              ].map((item) => (
                <a href={`#${item}`}>
                  <li key={item} className="hover:text-red-500 cursor-pointer">
                    {item}
                  </li>{" "}
                </a>
              ))}
            </ul>
          )}
        </nav>

        {/* Hero Slider */}
        <div id="Home" className="relative ">
          {/* Swiper Slider */}
          <Swiper
            modules={[Autoplay, Navigation]}
            loop={true}
            autoplay={{ delay: 4000 }}
            navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
            className="h-screen "
          >
            <SwiperSlide>
              <div
                className="relative md:h-screen h-[80vh] bg-cover bg-center flex items-center"
                style={{
                  backgroundImage: `url(${
                    details && details.hero.backgroundImage1
                  })`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="container mx-auto px-6 relative z-10 text-white text-center">
                  <h2 className="text-red-500 text-2xl font-semibold">
                    {sanitizeContent(details && details.hero.title1)}
                    <span className="uppercase">
                      {userDetails && userDetails.ecosystemName}
                    </span>
                  </h2>
                  <h1 className="md:text-7xl text-5xl font-bold mt-2">
                    {sanitizeContent(details && details.hero.title2)}
                  </h1>

                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleModalOpen}
                      className="hover:bg-white hover:text-black font-semibold px-6 py-3 text-xl bg-red-500 text-white transition"
                    >
                      {sanitizeContent(details && details.hero.buttonText1)}
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
                    onChange={(e) =>
                      handleImageChange(e, "hero", "backgroundImage1")
                    }
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          {/* {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )} */}
        </div>
      </div>
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
        <div className="mt-7 flex-1">
          <h1>Section header 5</h1>
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

      <section
        id="About"
        className="px-6 bg-white text-center md:py-10 w-full max-w-screen-xl"
      >
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4">
          {about.map((text, index) => (
            <div key={index} className="col-span-1">
              <div className="px-6">
                <span className="text-3xl">“</span>
                <p className="text-3xl font-semibold">{text}</p>
                <span className="text-3xl">”</span>
              </div>

              <EditTemplateLongInput
                value={sanitizeContent(
                  details?.aboutUs?.[`title${index + 1}`] ||
                    details?.aboutUs?.text1 ||
                    ""
                )}
                onChange={(event) =>
                  handleContentChange(
                    "aboutUs",
                    details?.aboutUs?.[`title${index + 1}`]
                      ? `title${index + 1}`
                      : "text1",
                    event
                  )
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="Services" className="px-6 py-10 bg-white text-white">
        <div className="flex flex-col h-full py-4 px-4 lg:px-24">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index}>
                {/* Service Image & Title in Opacity Layout */}
                <div className="relative group">
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full object-cover transition-transform transform group-hover:scale-105"
                    />
                    {/* Edit Image Button */}
                    {userPlan && userPermissions.canEditImage && (
                      <div
                        style={{
                          width: "250px",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          zIndex: 1000,
                        }}
                      >
                        <ButtonSmallPurple
                          onClick={() =>
                            handleEditImageClick(
                              "Statistics",
                              `section${index + 1}icon`
                            )
                          }
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit Image"}
                        </ButtonSmallPurple>
                        <input
                          type="file"
                          ref={(ref) =>
                            (fileInputRefs.current[
                              `Statistics-section${index + 1}icon`
                            ] = ref)
                          }
                          onChange={(e) =>
                            handleImageChange(
                              e,
                              "Statistics",
                              `section${index + 1}icon`
                            )
                          }
                          style={{ display: "none" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Service Title Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h4 className="text-xl font-bold">{service.title}</h4>
                  </div>
                </div>

                {/* Separated EditTemplateLongInput (Now Fully Outside the Black Overlay) */}
                <div className="mt-4 bg-white p-4">
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
                    className="custom-input-class text-black"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="Membership"
        className="px-6 bg-black text-white py-16 relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-red-500 uppercase">Our Membership</p>
            <h2 className="text-7xl font-bold">Membership Plans</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {eServices.map((service, index) => (
              <div
                key={index}
                className="relative border border-gray-500 p-8 text-center"
              >
                <p className="mb-6 text-gray-600 font-bold uppercase tracking-widest">
                  {service.name}
                </p>

                <p className="mb-2 text-gray-300">{service.shortDescription}</p>

                <div className="text-3xl font-bold">{getCurrencySymbol(currency)}{service.price}</div>
                <button
                  onClick={handleModalOpen}
                  className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-6 font-bold uppercase rounded"
                >
                  Subcribe Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="" className="px-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Counter Block 1 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center h-48 border border-gray-300 rounded-lg shadow-lg"
            >
              <p className="text-3xl text-black mx-10 flex items-center justify-center mt-2 font-bold uppercase">
                {sanitizeContent(details && details.Statistics.section1header)}
              </p>
              <EditTemplateLongInput
                value={sanitizeContent(details.Statistics.section1header)}
                onChange={(event) =>
                  handleContentChange("Statistics", "section1header", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-6 text-black"
              />
            </motion.div>

            {/* Counter Block 2 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center h-48 border border-gray-300 rounded-lg shadow-lg"
            >
              <p className="text-3xl text-black mx-10 flex items-center justify-center mt-2 font-bold uppercase">
                {sanitizeContent(details && details.Statistics.section2header)}
              </p>

              <EditTemplateLongInput
                value={sanitizeContent(details.Statistics.section2header)}
                onChange={(event) =>
                  handleContentChange("Statistics", "section2header", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-6 text-black"
              />
            </motion.div>

            {/* Counter Block 3 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center h-48 border border-gray-300 rounded-lg shadow-lg"
            >
              <p className="text-3xl text-black mx-10 flex items-center justify-center mt-2 font-bold uppercase">
                {sanitizeContent(details && details.Statistics.section3header)}
              </p>
              <EditTemplateLongInput
                value={sanitizeContent(details.Statistics.section3header)}
                onChange={(event) =>
                  handleContentChange("Statistics", "section3header", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-6 text-black"
              />
            </motion.div>

            {/* Counter Block 4 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center h-48 border border-gray-300 rounded-lg shadow-lg"
            >
              <p className="text-3xl text-black mx-10 flex items-center justify-center mt-2 font-bold uppercase">
                {sanitizeContent(details && details.Statistics.section4header)}
              </p>
              <EditTemplateLongInput
                value={sanitizeContent(details.Statistics.section4header)}
                onChange={(event) =>
                  handleContentChange("Statistics", "section4header", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class mb-6 text-black"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <section id="Portfolio" className="px-6 py-10 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map(({ key, src }, index) => (
              <div
                key={key}
                className="relative group cursor-pointer overflow-hidden rounded-lg"
              >
                <div className="relative">
                  <img
                    src={src}
                    alt={`Gallery ${key}`}
                    className="w-full h-full object-cover transform transition duration-300 group-hover:scale-110"
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
                        onClick={() => handleEditImageClick("Gallery", key)}
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null*/}
                  </div>

                  {/* <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current[`Gallery-${key}`] = ref)
                    }
                    onChange={(e) => handleImageChange(e, "Gallery", key)}
                    style={{ display: "none" }}
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={galleryImages.map((img) => ({ src: img }))}
          index={currentIndex}
        />
      </section>
      <section id="coaches" className="px-6 bg-gray-900 py-12">
        <div className="container mx-auto text-center w-full max-w-screen-xl">
          <div className="mb-8">
            <h3 className="text-xl font-bold uppercase text-red-600">
              Our Team
            </h3>
            <h2 className="text-5xl font-extrabold text-white">Our Coaches</h2>
          </div>

          {/* Swiper Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coaches.map((coach, index) => (
              <div
                key={coach.key}
                className="relative rounded-lg overflow-hidden shadow-lg p-4"
              >
                {/* Editable Image */}
                <div className="relative w-full h-96">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* userPlan && userPermissions.canEditImage && (
                    <div className="absolute top-2 left-2">
                      <ButtonSmallPurple
                        onClick={() =>
                          handleEditImageClick("Blog", `image${index + 1}`)
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    </div>
                  )*/}
                  {/* <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current[`Blog-image${index + 1}`] = ref)
                    }
                    onChange={(e) =>
                      handleImageChange(e, "Blog", `image${index + 1}`)
                    }
                    style={{ display: "none" }}
                  /> */}
                </div>

                {/* Editable Name */}
                <EditTemplateLongInput
                  value={sanitizeContent(details?.Team?.[`header${index + 1}`])}
                  onChange={(event) =>
                    handleContentChange("Team", `header${index + 1}`, event)
                  }
                  placeholder="Enter coach name..."
                  className="custom-input-class mt-3"
                />

                {/* Editable Description */}
                <EditTemplateLongInput
                  value={sanitizeContent(details?.Blog?.[`header${index + 1}`])}
                  onChange={(event) =>
                    handleContentChange("Blog", `header${index + 1}`, event)
                  }
                  placeholder="Enter full name..."
                  className="custom-input-class mt-3"
                />

                {/* Editable Experience */}
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Blog?.[`summary${index + 1}`]
                  )}
                  onChange={(event) =>
                    handleContentChange("Blog", `summary${index + 1}`, event)
                  }
                  placeholder="Enter experience..."
                  className="custom-input-class mt-3"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="BMI Calculator" className="px-6 bg-white py-12  lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-left mb-8">
            <p className="text-red-600 font-semibold">// Body Mass Index</p>
            <h2 className="text-4xl font-bold">What Is Your BMI</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <form className="space-y-4" onSubmit={calculateBMI}>
              <input
                type="number"
                placeholder="185 Cm"
                className="w-full p-3 border rounded-lg"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Weight / kg"
                className="w-full p-3 border rounded-lg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Age"
                className="w-full p-3 border rounded-lg"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <select
                className="w-full p-3 border rounded-lg"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <select
                className="w-full p-3 border rounded-lg"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option>Select an activity factor</option>
                <option>Factor 01</option>
                <option>Factor 02</option>
              </select>
              <button
                type="submit"
                className="w-32 bg-black text-white font-semibold border border-red-600 py-3 rounded-lg hover:bg-red-600 transition"
              >
                Calculate Now +
              </button>
            </form>

            <div className="border rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">BMI & Weight Status</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">BMI</th>
                    <th className="border border-gray-300 p-2">
                      Weight Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Below 18.5</td>
                    <td className="border border-gray-300 p-2">Underweight</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">18.5-24.9</td>
                    <td className="border border-gray-300 p-2">Healthy</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">25.0-29.9</td>
                    <td className="border border-gray-300 p-2">Overweight</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      30.0 and Above
                    </td>
                    <td className="border border-gray-300 p-2">Obese</td>
                  </tr>
                </tbody>
              </table>
              {bmi && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                  <p className="text-lg font-bold">Your BMI: {bmi}</p>
                  <p className="text-md">Status: {status}</p>
                </div>
              )}
              <div className="mt-6 text-sm">
                <p>
                  <strong>BMR</strong> - Metabolic Rate
                </p>
                <p>
                  <strong>BMI</strong> - Body Mass Index
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="testimonial-section bg-black bg-center py-16 text-white"
        style={{
          backgroundImage: "url('assets/images/background/testimonial-1.jpg')",
        }}
      >
        <div className="container mx-auto px-4 w-full max-w-screen-xl">
          <div className="text-center mb-12">
            <p className="text-red-500 font-bold text-sm">REVIEWS</p>
            <h2 className="text-4xl font-bold">Happy Members Thoughts</h2>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="flex flex-wrap items-center bg-gray-800 p-6 rounded-lg"
              >
                {/* Editable Image */}
                <div className="w-full md:w-1/4 mb-6 md:mb-0 relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-full w-32 md:w-48 mx-auto"
                  />
                  {/* userPlan && userPermissions.canEditImage && (
                    <div className="absolute top-2 left-2">
                      <ButtonSmallPurple
                        onClick={() =>
                          handleEditImageClick("Reviews", `image${index + 1}`)
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    </div>
                  )*/}
                  {/* <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current[`Reviews-image${index + 1}`] = ref)
                    }
                    onChange={(e) =>
                      handleImageChange(e, "Reviews", `image${index + 1}`)
                    }
                    style={{ display: "none" }}
                  /> */}
                </div>
                <div className="w-full md:w-3/4 ps-10">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className="text-yellow-400 mr-1" />
                    ))}
                  </div>
                  <p className="mb-4">{testimonial.text}</p>
                  <p className="font-bold">
                    {testimonial.name}{" "}
                    <span className="text-red-500">- {testimonial.title}</span>
                  </p>
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
                    placeholder="Enter review text..."
                    className="custom-input-class mb-4 text-black"
                  />
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
                    placeholder="Enter reviewer name..."
                    className="custom-input-class mb-2 text-black"
                  />
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details?.Reviews?.[`title${index + 1}`]
                    )}
                    onChange={(event) =>
                      handleContentChange("Reviews", `title${index + 1}`, event)
                    }
                    placeholder="Enter reviewer title..."
                    className="custom-input-class text-black"
                  />
                  <FaQuoteRight className="text-4xl text-red-500 mt-4" />
                </div>
              </div>
            ))}

            <div className="testimonial-navigation flex justify-center space-x-8 mt-8">
              <button className="custom-prev text-white text-2xl">
                <FaAngleLeft />
              </button>
              <button className="custom-next text-white text-2xl">
                <FaAngleRight />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* <NewsSection /> */}
      <section id="" className="relative w-full bg-white">
        {/* Scrolling Text Banner with Swiper */}
        {/* <div className="relative overflow-hidden bg-red-600 py-3">
          <Swiper
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
            }}
            speed={5000}
            modules={[Autoplay]}
            className="flex items-center text-white font-bold text-lg uppercase"
          >
            {items.map((item, index) => (
              <SwiperSlide key={index} className="w-auto px-16 text-4xl">
                <span className="flex items-center">
                  {item} <span className="mx-4">💪</span>
                </span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div> */}

        {/* Discuss Section */}
        <div className="relative flex flex-col items-center justify-center text-center my-10">
          <h1 className="text-[8vw] font-extrabold uppercase tracking-wide text-black stroke-text">
            {sanitizeContent(details && details.LargeCta.summary2)}
          </h1>
        </div>
        <EditTemplateLongInput
          value={sanitizeContent(details && details.LargeCta.summary2)}
          onChange={(event) =>
            handleContentChange("LargeCta", "summary2", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </section>
      <footer className="bg-black text-white py-10 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/assets/images/background/footer-bg.jpg')",
          }}
        ></div>
        <div className="relative container mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Socials */}
            <div>
              <div className="flex items-center space-x-2">
                <div className="bg-white p-2 rounded-full">
                  <img
                    src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-icon-01.png"
                    alt="Icon"
                    className="h-6"
                  />
                </div>
                <h1 className="text-2xl font-bold uppercase">
                  {userDetails && userDetails.ecosystemName}
                </h1>
              </div>
              <p className="mb-4">
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

              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/"
                  className="text-white text-xl hover:text-red-500"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com/"
                  className="text-white text-xl hover:text-red-500"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://youtube.com/"
                  className="text-white text-xl hover:text-red-500"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://instagram.com/"
                  className="text-white text-xl hover:text-red-500"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
            {/* Our Services */}
            <div>
              <h3 className="text-red-500 text-lg font-bold mb-4">
                // Our Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-red-500">
                    Personal Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Group Workout
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Muscle Building
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Virtual Gym Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Body Stretching
                  </a>
                </li>
              </ul>
            </div>
            {/* Links */}
            <div>
              <h3 className="text-red-500 text-lg font-bold mb-4">// Links</h3>
              <ul className="space-y-2">
                {[
                  "Home",
                  "About",
                  "Services",
                  "Membership",
                  "Portfolio",
                  "BMI Calculator",
                ].map((item) => (
                  <a href={`#${item}`}>
                    <li
                      key={item}
                      className="hover:text-red-500 cursor-pointer"
                    >
                      {item}
                    </li>{" "}
                  </a>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h3 className="text-red-500 text-lg font-bold mb-4">
                // CONTACT
              </h3>
              <p className="mb-2">{userDetails && userDetails.address}</p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+12031230606"
                  className="text-white hover:text-red-500"
                >
                  {userDetails && userDetails.phoneNumber}
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@nostop.com"
                  className="text-white hover:text-red-500"
                >
                  {userDetails && userDetails.address}
                </a>
              </p>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className="text-center mt-8 border-t border-gray-700 pt-4">
            © {new Date().getFullYear()} Bulit with {""}
            <a
              href="https://www.dimpified.com/"
              target="_blank"
              rel="noreferrer"
              class="text-white underline hover:text-white"
            >
              Dimpified.
            </a>{" "}
            All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};
export default SecondGym;
