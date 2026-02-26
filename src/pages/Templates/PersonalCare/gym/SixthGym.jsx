import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faDribbble,
} from "@fortawesome/free-brands-svg-icons";
import {
  FaChevronDown,
  FaCheck,
  FaArrowRight,
  FaDumbbell,
  FaChevronLeft,
  FaChevronRight,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { gym } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

import { BlackContactForm } from "../../../../features/ContactForm/ContactForm";

const SixthGym = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "US"; // Fallback to 'NG'

  // Counter animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate loading time

    return () => clearTimeout(timer);
  }, []);
  const testimonials = [
    {
      text: "Joining FitWell Gym changed my life! I’ve dropped 10kg, built confidence, and the trainers treat me like family. As someone who sits in front of a computer all day running my startup, this gym gave me a new lease on life. I even recommended it to my entire dev team.",
      name: "Chinedu Okafor",
      profession: "Tech Entrepreneur – Lagos",
      image: "https://gfa-tech.com/dimp-template-images/barber/instructor4.jpg",
    },
    {
      text: "The classes are always fun and challenging. As a banker, it’s the perfect stress relief after work. I especially love the weekend HIIT and Zumba sessions – they help me stay sane in this hustle-heavy city. My colleagues now join me every Saturday!",
      name: "Amarachi Nwosu",
      profession: "Banker – Abuja",
      image: "https://gfa-tech.com/dimp-template-images/barber/instructor3.jpg",
    },
    {
      text: "After my third child, I needed a serious comeback. Thanks to this gym, I'm fitter than ever at 42! The postpartum program was exactly what I needed. The female coaches made me feel seen, and now I even run short marathons with my kids cheering me on!",
      name: "Mojisola Adetayo",
      profession: "Fashion Designer – Ibadan",
      image: "https://gfa-tech.com/dimp-template-images/barber/instructor2.jpg",
    },
    {
      text: "Na here I gain biceps wey dey burst shirt! The energy here is on another level, no cap! The gym dey motivate person – loud music, correct trainers, and gengen equipment. My guys from work don join too because dem see say I don dey ripped!",
      name: "Tunde Agbaje",
      profession: "Logistics Manager – Port Harcourt",
      image: "https://gfa-tech.com/dimp-template-images/barber/instructor1.jpg",
    },
  ];

  const fitnessClasses = [
    {
      title: "GROUP WORKOUT",
      image: "https://gfa-tech.com/dimp-template-images/gym/gym6.5.jpg",
    },
    {
      title: "PERSONAL TRAINING",
      image: "https://gfa-tech.com/dimp-template-images/gym/gym6.6.jpg",
    },
    {
      title: "MUSCLE BUILDING",
      image: "https://gfa-tech.com/dimp-template-images/gym/gym6.7.jpg",
    },
  ];

  const faqs = [
    {
      question: "What types of fitness classes do you offer?",
      answer:
        "We offer a wide variety of fitness classes including HIIT, yoga, spin, strength training, cardio, and more.",
    },
    {
      question: "Do I need to be a member to attend a class?",
      answer:
        "No, you don't need to be a member to try our classes. We offer drop-in rates for all our classes.",
    },
    {
      question: "What should I bring to my first workout?",
      answer:
        "We recommend bringing a water bottle, towel, and comfortable workout clothes.",
    },
    {
      question: "Are the classes suitable for beginners?",
      answer:
        "Yes! Our instructors provide modifications and support to accommodate all fitness levels.",
    },
  ];

  useEffect(() => {
    const counters = document.querySelectorAll(".counter");
    const speed = 200;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;

          const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(updateCount, 10);
            } else {
              counter.innerText = target;
            }
          };

          updateCount();
          observer.unobserve(counter);
        }
      });
    });

    counters.forEach((counter) => {
      observer.observe(counter);
    });

    return () => {
      counters.forEach((counter) => {
        observer.unobserve(counter);
      });
    };
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="font-sans text-white">
      {/* Preloader */}
      {isLoading && (
        <div className="fixed inset-0 bg-[#171E2E] z-50 flex items-center justify-center">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-[#171E2E] shadow-md z-50 w-full">
        <div className="flex flex-col md:px-32 px-4 py-4">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <a href="#home" className="flex items-center">
              <FaDumbbell className="text-[#D7FB00] text-2xl" />
              <span className="text-white font-bold ml-2">FITWELL</span>
            </a>

            {/* Hamburger Icon */}
            <button
              className="lg:hidden flex flex-col space-y-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <ul className="flex space-x-8 text-white font-medium">
                <li>
                  <a className="hover:text-[#D7FB00]" href="#home">
                    Home
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#D7FB00]" href="#about">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#D7FB00]" href="#services">
                    Services
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#D7FB00]" href="#why-choose-us">
                    Why choose us?
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#D7FB00]" href="#plans">
                    Membership Plans
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#D7FB00]" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>

              <div className="ml-6">
                <button
                  onClick={handleModalOpen}
                  className="bg-[#D7FB00] text-black px-6 py-2 rounded hover:bg-white hover:text-black transition"
                >
                  Become a Member
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Menu (toggles visibility and pushes content) */}
        {isMenuOpen && (
          <div className="bg-[#171E2E] lg:hidden px-4 pb-4">
            <ul className="flex flex-col space-y-4 text-white font-medium">
              <li>
                <a className="hover:text-[#D7FB00]" href="#home">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-[#D7FB00]" href="#about">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-[#D7FB00]" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:text-[#D7FB00]" href="#why-choose-us">
                  Why choose us?
                </a>
              </li>
              <li>
                <a className="hover:text-[#D7FB00]" href="#plans">
                  Membership Plans
                </a>
              </li>
              <li>
                <a className="hover:text-[#D7FB00]" href="#contact">
                  Contact
                </a>
              </li>
            </ul>

            <div className="mt-4">
              <a
                href="#plans"
                className="bg-[#D7FB00] text-black px-6 py-2 rounded hover:bg-white hover:text-black transition block text-center"
              >
                Explore Plans ↗
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-30 pb-20 bg-[#171E2E]">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24 ">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left */}
            <div className="lg:w-1/2 relative">
              <img
                src="https://gfa-tech.com/dimp-template-images/gym/gym6.1.png"
                alt="Fitness hero"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="lg:w-1/2 lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 uppercase text-white">
                Your body can{" "}
                <span className="text-[#D7FB00]">
                  stand <br />
                  almost
                </span>{" "}
                anything.
              </h1>
              <p className="text-lg text-white mb-8">
                It's your mind that needs convincing. Push past your limits,
                stay committed, and watch as your body transforms.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mb-10 justify-center lg:justify-start">
                <div>
                  <h3 className="text-3xl font-bold text-white">1200+</h3>
                  <p className="text-white">Active Members</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">12+</h3>
                  <p className="text-white">Certified Trainers</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">20+</h3>
                  <p className="text-white">Years of Experience</p>
                </div>
              </div>
              {isModalOpen && (
                <BookingModal
                  isOpen={isModalOpen}
                  handleClose={handleModalClose}
                />
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="#plans"
                  className="bg-[#D7FB00] text-black px-8 py-3 rounded hover:bg-white hover:text-black transition"
                >
                  Get Started ↗
                </a>
                <a
                  href="#about"
                  className="border-2 border-[#D7FB00] text-[#D7FB00] px-8 py-3 rounded hover:bg-[#D7FB00] hover:text-black transition"
                >
                  Explore Services ↗
                </a>
              </div>
            </div>

            {/* Right */}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-[#D7FB00] text-black py-4 overflow-hidden uppercase">
        <div className="whitespace-nowrap">
          <div className="inline-block animate-[marquee_30s_linear_infinite]">
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="inline-flex items-center mx-8">
                  <span className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></span>
                  Personal Trainers
                </span>
                <span className="inline-flex items-center mx-8">
                  <span className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></span>
                  Live Classes
                </span>
                <span className="inline-flex items-center mx-8">
                  <span className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></span>
                  Outdoor & Online Trainers
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <section className="py-20 bg-gradient-to-br from-[#0f111f] to-[#1c2433] text-white">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24 lg:flex-row items-center">
          {/* Left - Image Group */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 relative flex justify-center items-center">
            <img
              src="https://gfa-tech.com/dimp-template-images/gym/gym6.2.jpg"
              alt="Fitness 1"
              className="rounded-2xl z-99 relative shadow-lg"
            />
            <img
              src="https://gfa-tech.com/dimp-template-images/gym/gym6.3.jpg"
              alt="Fitness 2"
              className="w-40 rounded-2xl absolute top-4 right-16 transform translate-x-1/3 -translate-y-1/3 shadow-md"
            />
            <img
              src="https://gfa-tech.com/dimp-template-images/gym/gym6.4.jpg"
              alt="Fitness 3"
              className="w-40 rounded-2xl absolute bottom-16 left-4 transform translate-y-2/3 shadow-md"
            />
          </div>

          {/* Right - Text Content */}
          <div id="about" className="lg:w-1/2 lg:pl-12">
            <div className="flex items-center gap-2 mb-2 text-[#D7FB00] font-bold">
              <FaDumbbell />
              <span>About Us</span>
            </div>

            <h2 className="text-4xl font-extrabold leading-tight mb-6">
              EMPOWERING YOU TO ACHIEVE <br />
              <span className="text-[#D7FB00]">YOUR FITNESS</span> GOALS
            </h2>

            <p className="text-white-300 mb-8">
              We believe fitness is more than just a workout—it's a lifestyle.
              With top-of-the-line facilities, certified trainers, and a
              supportive community, we're here to inspire and guide you every
              step of the way.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                {
                  title: "Personal Trainer",
                  desc: "Achieve your fitness goals with the guidance of our certified trainers.",
                },
                {
                  title: "Cardio Programs",
                  desc: "From steady-state runs to interval sprints, our treadmill programs.",
                },
                {
                  title: "Quality Equipment",
                  desc: "Our gym is equipped with the latest cardio & strength machines.",
                },
                {
                  title: "Healthy Nutritions",
                  desc: "Fuel your fitness journey with customized meal plans for you.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FaCheck className="text-[#D7FB00] mt-1" />
                  <div>
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <p className="text-white text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleModalOpen}
              className="inline-flex items-center bg-[#D7FB00] text-black font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              Be a member <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#202737] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Icon + Subtitle */}
          <div className="flex justify-center items-center gap-2 text-[#D7FB00] font-semibold mb-2">
            <FaDumbbell />
            <span>Fitness Class</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 leading-tight">
            TRANSFORM YOUR BODY WITH OUR <br />
            <span className="text-[#D7FB00]">DYNAMIC FITNESS</span> CLASSES
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
            {fitnessClasses.map((cls, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden bg-[#1a1e2d] shadow-md hover:scale-[1.02] transition duration-300"
              >
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 flex flex-col items-start">
                  <h3 className="font-extrabold text-lg mb-2">{cls.title}</h3>
                  <button
                    onClick={handleModalOpen}
                    className="text-[#D7FB00] font-semibold inline-flex items-center gap-2"
                  >
                    Be a member <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="mt-12 flex justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D7FB00] block" />
            <span className="h-2 w-8 rounded-full bg-[#D7FB00] block" />
            <span className="h-2 w-2 rounded-full bg-[#D7FB00] block" />
          </div>

          {/* Bottom text */}
          <p className="text-sm text-white mt-8">
            Expert guidance for your fitness journey,{" "}
            <button
              onClick={handleModalOpen}
              className="text-[#D7FB00] font-bold underline hover:text-[#D7FB00]-300"
            >
              Join Us Today And Start Transforming!
            </button>
          </p>
        </div>
      </section>

      <section id="why-choose-us" className="bg-[#171E2E] py-20 text-white">
        <div className=" flex flex-col h-full  py-4 px-4 lg:px-32 ">
          <div className="flex flex-col lg:flex-row items-center justify-center">
            {/* Left Content */}
            <div className="lg:w-1/2 mb-12 lg:mb-0 relative">
              {/* Background Title */}
              <h1 className="absolute text-[120px] font-black opacity-5 -top-10 z-0 uppercase">
                WHY US
              </h1>

              {/* Heading & Description */}
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <FaDumbbell className="text-[#D7FB00] text-xl mr-2" />
                  <span className="text-[#D7FB00] uppercase font-semibold tracking-wide">
                    Why Choose Us
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight mb-6">
                  Elevate Fitness With The{" "}
                  <span className="text-[#D7FB00]">Best Way</span> Possible
                </h2>

                <p className="text-white text-base mb-10 leading-relaxed">
                  We offer a fitness journey that's tailored to your goals,
                  supported by professional trainers and a welcoming community.
                  Whether it's weight loss, strength building, or overall
                  wellness, our proven methods.
                </p>

                {/* Steps */}
                <div className="space-y-10 border-white px-8">
                  {[
                    {
                      id: "01",
                      title: "Personalized Fitness Plans",
                      desc: "We tailor every workout to fit your unique goals and fitness level ensuring that you make the most progress.",
                    },
                    {
                      id: "02",
                      title: "Results-Driven Focus",
                      desc: "Everything we do is designed to help you achieve measurable results, whether you’re aiming for weight loss.",
                    },
                    {
                      id: "03",
                      title: "State-Of-The-Art Equipment",
                      desc: "We provide the latest in gym equipment, from cardio machines to free weights, designed to support every type.",
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-6 relative"
                    >
                      <div className="bg-[#101828] border border-white text-white w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold absolute -left-20 top-1">
                        {step.id}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                        <p className="text-white text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Images */}
            <div className="lg:w-1/2 justify-center items-center grid grid-cols-2 gap-6 relative">
              <img
                src="https://gfa-tech.com/dimp-template-images/gym/gym6.3.jpg"
                alt="img"
                className="rounded-lg w-full h-auto object-cover"
              />
              <img
                src="https://gfa-tech.com/dimp-template-images/gym/gym6.9.jpg"
                alt="img"
                className="rounded-lg w-full h-auto object-cover"
              />
              <img
                src="https://gfa-tech.com/dimp-template-images/gym/gym6.11.jpg"
                alt="img"
                className="rounded-lg w-full h-auto object-cover"
              />
              <img
                src="https://gfa-tech.com/dimp-template-images/gym/gym6.8.jpg"
                alt="img"
                className="rounded-lg w-full h-auto object-cover"
              />

              {/* Floating Contact Circle */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                <img
                  src="https://gfa-tech.com/dimp-template-images/gym/gym-circle.svg"
                  alt="Contact Us"
                  className="w-24 h-24 animate-spin-slow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Pricing Section */}
      <section id="plans" className="our-pricing py-20 bg-[#202737]">
        <div className="flex flex-col  md:px-24 lg:px-32 px-4">
          <div className="text-center mb-16">
            <div className="section-title">
              <div className="section-bg-title opacity-10 text-8xl font-bold mb-4">
                <span>Membership</span>
              </div>
              <h3 className=" text-lg font-semibold mb-2 text-[#D7FB00]">
                Memmbership Plans
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white uppercase">
                Transform Your Body with Our <br />
                <span className="text-[#D7FB00]">Dynamic Fitness</span> Plans
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Pricing Item 1 */}
            {gym.map((service, index) => (
              <div
                key={index}
                className="pricing-item bg-[#202737] rounded-lg shadow-lg p-4 hover:bg-[#171E2E] transform hover:scale-105 transition-transform"
              >
                <div className="pricing-header mb-8">
                  <h3 className="text-xl font-semibold mb-2 text-white uppercase">
                    {service.name}
                  </h3>

                  <h2 className="text-4xl font-bold text-[#D7FB00]">
                    {getFormattedPrice(service.price, countryCode)}
                  </h2>
                </div>
                {/* <img
                  src={service.serviceImage}
                  alt={service.name}
                  className="w-full h-48 mb-4  object-cover relative rounded-xl"
                /> */}

                <div className="space-y-2 mb-6">
                  <p className="flex items-center mb-2 pe-6 text-gray-100">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="pricing-btn">
                  <button
                    onClick={handleModalOpen}
                    className="btn-default bg-[#D7FB00] text-black px-6 py-3 rounded-lg w-full block text-center hover:bg-white transition"
                  >
                    Get Membership
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-white pricing-benefit-list flex flex-wrap justify-center gap-8">
            <div className="flex items-center">
              <img
                src="https://gfa-tech.com/dimp-template-images/gym/gym6.12.svg"
                alt="Benefit"
                className="mr-2 ml-3"
              />
              Get 30 day free trial
            </div>
            <div className="flex items-center">
              <img
                src="https://gfa-tech.com/dimp-template-images/gym/gym6.12.svg"
                alt="Benefit"
                className="mr-2 ml-3"
              />
              No any hidden fees pay
            </div>
            <div className="flex items-center">
              <img
                src="https://gfa-tech.com/dimp-template-images/gym/gym6.12.svg"
                alt="Benefit"
                className="mr-2 ml-3"
              />
              You can cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="team" className="bg-[#171E2E] our-team py-20">
        <div className="flex flex-col  md:px-24 lg:px-32 px-4">
          <div className="text-center mb-16">
            <div className="section-title">
              <div className="section-bg-white opacity-10 text-8xl font-bold mb-4">
                <span>Trainers</span>
              </div>
              <h3 className="text-[#D7FB00] text-lg font-semibold mb-2">
                Our Trainers
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase text-white">
                Your Fitness Journey Starts <br />
                with <span className="text-[#D7FB00]">Our Expert</span> Trainers
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Daniel Ayomide",
                image:
                  "https://gfa-tech.com/dimp-template-images/gym/gym13.jpg",
              },
              {
                name: "Ruth Johnson",
                image:
                  "https://gfa-tech.com/dimp-template-images/gym/gym16.jpg",
              },
              {
                name: "Oladele Faruq",
                image:
                  "https://gfa-tech.com/dimp-template-images/gym/gym17.jpg",
              },
              {
                name: "Christiana Benson",
                image:
                  "https://gfa-tech.com/dimp-template-images/gym/gym15.jpg",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="team-item relative rounded-lg overflow-hidden shadow-lg h-96 group"
                style={{
                  backgroundImage: `url(${member.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute bottom-0 w-full bg-black bg-opacity-70 text-center p-4 transition-all duration-300 group-hover:bg-opacity-90">
                  <p className="text-[#D7FB00] uppercase text-sm">
                    Fitness Coach
                  </p>
                  <h3 className="text-xl font-bold mt-1 text-white">
                    <a href="team-single.html">{member.name}</a>
                  </h3>
                  <div className="team-social-list flex justify-center space-x-4 mt-2">
                    <a
                      href="#"
                      className="text-white hover:text-[#D7FB00] transition"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      href="#"
                      className="text-white hover:text-[#D7FB00] transition"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href="#"
                      className="text-white hover:text-[#D7FB00] transition"
                    >
                      <i className="fab fa-dribbble"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-[#202737]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left image stack */}
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
              <div className="relative h-96 w-full">
                <div
                  className="absolute top-0 left-0 w-3/4 h-64 bg-cover bg-center rounded-xl shadow-xl rotate-[-6deg] z-10"
                  style={{
                    backgroundImage:
                      "url('https://gfa-tech.com/dimp-template-images/gym/gym6.17.jpg')",
                  }}
                ></div>
                <div
                  className="absolute bottom-0 right-0 w-3/4 h-64 bg-cover bg-center rounded-xl shadow-xl rotate-[6deg] z-0"
                  style={{
                    backgroundImage:
                      "url('https://gfa-tech.com/dimp-template-images/gym/gym6.7.jpg')",
                  }}
                ></div>
              </div>
            </div>

            {/* Right content */}
            <div className="lg:w-1/2">
              <div className="section-title mb-8">
                <h3 className="text-[#D7FB00] text-xs uppercase font-semibold tracking-wide mb-2">
                  Frequently Asked Questions
                </h3>
                <h2 className="text-3xl text-white md:text-4xl font-extrabold leading-tight mb-6 text-white uppercase">
                  Answers to your{" "}
                  <span className="text-[#D7FB00]">most common</span> questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white border border-white rounded-lg transition-all duration-300"
                  >
                    <button
                      className="bg-[#D7FB00] flex justify-between items-center w-full p-5 text-left font-medium text-black"
                      onClick={() => toggleAccordion(index)}
                    >
                      <span>{faq.question}</span>
                      <FaChevronDown
                        className={`text-[#4CAF50] transition-transform duration-300 ${
                          activeAccordion === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeAccordion === index && (
                      <div className="p-5 pt-0 text-black text-xl">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="testimonials"
        className="bg-[#0B1021] text-white py-16 px-4 text-center relative"
      >
        <div className="max-w-5xl mx-auto">
          {/* Subheading */}
          <p className="text-lg text-[#D7FB00] font-semibold mb-2 flex justify-center items-center gap-2">
            <FaDumbbell className="text-[#D7FB00] text-xl" />
            Client Testimonials
          </p>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold uppercase">
            Inspiring Journeys:{" "}
            <span className="text-[#D7FB00]">Client Testimonials</span>
          </h2>

          {/* Swiper */}
          <div className="mt-10">
            <Swiper
              spaceBetween={30}
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
              autoplay={{ delay: 2000 }}
              className="!px-2"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center">
                    <p className="text-lg md:text-xl leading-relaxed max-w-2xl">
                      "{testimonial.text}"
                    </p>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover mt-8 border-4 border-white"
                    />
                    <p className="font-bold text-white mt-4">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {testimonial.profession}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <section id="contact">
        <BlackContactForm />
      </section>

      {/* CTA Section */}
      <section
        className="cta-box relative py-20 bg-white text-white overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/gym/gym6.2.jpg')",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-2/3 mb-12 lg:mb-0 lg:pr-12 order-2 lg:order-1">
              <div className="cta-box-image"></div>
            </div>

            <div className="lg:w-1/3 order-1 lg:order-2">
              <div className="cta-box-content">
                <div className="section-title mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">
                    Get 30% off in{" "}
                    <span className="text-[#D7FB00]">Fitwell Gym</span>
                  </h2>
                </div>

                <div className="cta-box-body mb-8">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[#D7FB00] mr-2 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      Unlimited Access to All Gym Facilities
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[#D7FB00] mr-2 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      Book a Personal Training Session
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[#D7FB00] mr-2 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      Experience the Best in Fitness
                    </li>
                  </ul>
                </div>

                <div className="cta-btn">
                  <button
                    onClick={handleModalOpen}
                    className="btn-default bg-[#D7FB00] text-black px-8 py-3 rounded hover:bg-white transition"
                  >
                    Get Membership
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-[#D7FB00] text-black py-4 overflow-hidden uppercase">
        <div className="whitespace-nowrap">
          <div className="inline-block animate-[marquee_30s_linear_infinite]">
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="inline-flex items-center mx-8">
                  <span className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></span>
                  Personal Trainers
                </span>
                <span className="inline-flex items-center mx-8">
                  <span className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></span>
                  Live Classes
                </span>
                <span className="inline-flex items-center mx-8">
                  <span className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></span>
                  Outdoor & Online Trainers
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 bg-[#202737] text-white">
        <div className="flex flex-col md:px-32  px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="h-10 w-40 bg-primary flex items-center justify-center text-white font-bold rounded mb-6">
                <a href="#home" className="flex items-center">
                  <FaDumbbell className="text-[#D7FB00] text-2xl" />
                  <span className="text-white font-bold ml-2">FITWELL</span>
                </a>
              </div>

              <p className="text-white mb-6">
                Push harder, go further. Your fitness journey starts today!
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="mr-4 mt-1">📞</span>
                  <p className="text-white">
                    <a
                      href="tel:+2348012345678"
                      className="hover:text-white transition"
                    >
                      +234 80 1234 5678
                    </a>
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mr-4 mt-1">✉️</span>
                  <p className="text-white">
                    <a
                      href="mailto:info@domainname.com"
                      className="hover:text-white transition"
                    >
                      info@domainname.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Our Gym Session</h3>
              <ul className="space-y-2 text-white">
                <li>Mon - Fri : 08:00 AM - 10:00 PM</li>
                <li>Sat - Sun : 08:00 AM - 09:00 PM</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6"> Our location</h3>
              <ul className="space-y-2 text-white">
                <li>FCT, Nigeria</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white">
            <div className="mb-4 md:mb-0">
              <p className="text-white">
                &copy; {new Date().getFullYear()} Built with{" "}
                <a href="https://dimpified.com" className="hover:text-gray-200">
                  Dimpified
                </a>{" "}
                . All Rights Reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-white transition">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-white hover:text-white transition">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-white hover:text-white transition">
                <FontAwesomeIcon icon={faDribbble} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SixthGym;
