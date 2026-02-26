import React, { Fragment, useState } from "react";
import { FaPlay, FaCheckCircle, FaMapPin, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import { gym } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

const GymTemplate = ({ userDetails }) => {
  const testimonials = [
    {
      name: "Emeka Okafor",
      role: "Fitness Enthusiast",
      rating: 5,
      image: "https://gfa-tech.com/dimp-template-images/barber/instructor4.jpg",
      review:
        "This gym is top-notch! The trainers really know their stuff, and the energy here keeps me pushing harder every session. No dull moment!",
    },
    {
      name: "Aisha Bello",
      role: "Personal Trainer",
      rating: 5,
      image: "https://gfa-tech.com/dimp-template-images/barber/instructor3.jpg",
      review:
        "I’ve trained in many gyms, but this one stands out. The equipment is solid, and the vibe here makes every workout feel like a challenge worth taking.",
    },
    {
      name: "Bolu Adeyemi",
      role: "Bodybuilder",
      rating: 5,
      image: "https://gfa-tech.com/dimp-template-images/barber/instructor1.jpg",
      review:
        "This is the best gym I’ve trained in Naija. The weights section is well-equipped, and the people here push you to do better. No slacking!",
    },
    {
      name: "Chidinma Uche",
      role: "Yoga & Fitness Coach",
      rating: 5,
      image: "https://gfa-tech.com/dimp-template-images/barber/instructor2.jpg",
      review:
        "I love the diversity of workouts here. Whether it’s yoga, aerobics, or strength training, there’s always something new to try. The community is amazing!",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const handleLinkClick = () => {
    setIsOpen(false); // Close the mobile menu when a link is clicked
  };
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="font-Urbanist">
      {/* Navbar */}
      <nav className="w-full z-10 bg-white text-black top-0 left-0">
        <div className="py-4 px-6 md:px-32 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="#home" className="flex items-center">
              <img
                src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-icon-01.png"
                alt="Icon"
                className="h-6"
              />
              <span className="text-lime-600 font-bold ml-2">
                {userDetails && userDetails.ecosystemName}
              </span>
            </Link>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex space-x-8 text-lg font-semibold ml-24">
            <a href="#about" className="hover:text-lime-600">
              About
            </a>
            <a href="#services" className="hover:text-lime-600">
              Services
            </a>
            <a href="#testimonials" className="hover:text-lime-600">
              Testimonials
            </a>
            <a href="#membership" className="hover:text-lime-600">
              Membership
            </a>
          </div>

          {/* Join Us Button */}
          <button
            onClick={handleModalOpen}
            className="hidden md:inline items-center px-3 py-2 bg-lime-600 text-white rounded shadow-md hover:bg-lime-700 transition w-auto max-w-[140px]"
          >
            Join Us!
          </button>

          {/* Hamburger Icon for Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
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

        {/* Mobile Navigation Links */}
        {isOpen && (
          <div className="md:hidden bg-lime-600 text-white w-full flex flex-col items-center space-y-4 py-4">
            {["about", "services", "testimonials", "membership"].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="block text-xl font-semibold py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
            <button
              onClick={handleModalOpen}
              className="block text-white border border-white text-center font-semibold py-2 px-6 rounded-lg hover:bg-lime-700"
            >
              Join Us!
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col md:flex-row md:h-screen bg-gray-50 "
      >
        {/* Left Section */}
        <div className="flex flex-col justify-center items-start px-8 py-6 md:py-0 md:w-1/2 md:px-32 md:px-24">
          <span className="text-lg font-Raj font-semibold text-lime-600 mb-2 relative">
            Upstanding Strength
            <span className="absolute left-0 -bottom-1 w-40 border-b-4 border-lime-600"></span>
          </span>
          <h2 className="text-3xl font-Raj md:text-7xl font-bold text-gray-900 leading-tight mb-4 ">
            Strength Training <br /> Benefits for You
            <span className="text-lime-500">.</span>
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-4 ">
            Our primary goal is to create awareness <br /> and easy access to
            keep your body, mind, <br /> and spirit at peak performance.
          </p>
          <p className="text-gray-700 mb-6 r">
            Get your{" "}
            <span className="font-bold text-gray-900">
              first membership today
            </span>{" "}
            and start now.
          </p>
          <button
            onClick={handleModalOpen}
            className="flex items-center px-3 py-2 bg-lime-600 text-white rounded shadow-md hover:bg-lime-700 transition w-auto max-w-[140px]"
          >
            Join today!
          </button>
        </div>
        {isModalOpen && (
          <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
        )}

        {/* Right Section (Image) */}
        <div
          className="md:w-1/2 w-full md:h-full h-96 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://gfa-tech.com/dimp-template-images/gym/gym1.jpg')",
          }}
        ></div>
      </section>

      {/* Counter Section */}
      <section className="bg-white py-10">
        <div className="h-full mx-auto py-4 px-6 md:px-32 grid grid-cols-2 md:grid-cols-4 gap-8 ">
          {[
            { count: 4566, label: "Hours of Exercise" },
            { count: 5635, label: "Total Equipment" },
            { count: 6546, label: "People Trained" },
            { count: 6365, label: "Expert Trainers" },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <h1 className="text-5xl font-Raj font-bold text-lime-600">
                {item.count}
              </h1>
              <span className="block text-gray-700 text-sm font-semibold uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section class="flex flex-col h-full py-4 px-6 md:px-24">
        <div class="flex flex-col md:flex-row items-center">
          {/* <!-- Image Section --> */}
          <div class="relative md:w-1/2 order-2 md:order-1">
            <div class="absolute left-5 top-0 hidden md:inline-block transform -rotate-10 translate-y-12">
              <img
                src="https://craftohtml.themezaa.com/images/demo-gym-and-fitness-home-02.png"
                alt="Fitness Program"
              />
            </div>
            <img
              src="https://craftohtml.themezaa.com/images/demo-gym-and-fitness-home-01.jpg"
              alt="Gym Session"
              class="w-full"
            />
            <div class="absolute right-[-100px] bottom-0 md:right-[-30px] hidden md:inline-block transform translate-y-12">
              <img
                src="https://craftohtml.themezaa.com/images/demo-gym-and-fitness-home-03.png"
                alt="Workout Plan"
              />
            </div>
          </div>

          {/* <!-- Text Section --> */}
          <div
            id="about"
            class="md:w-5/12 md:ml-8 mb-12 mt-10 md:mt-0 order-1 md:order-2  md:text-left"
          >
            <span class="text-xl font-Raj font-semibold text-gray-800 inline-block border-b-4 border-lime-500 mb-6">
              Elevate Your Fitness Journey
            </span>
            <h2 class="text-4xl font-Raj font-bold text-gray-800 mb-4">
              Personalized Workout Programs<span class="text-lime-500">.</span>
            </h2>
            <p class="md:w-11/12 mb-4">
              {userDetails && userDetails.ecosystemDescription}
            </p>
            <p class="md:w-10/12 mb-6">
              Our tailored workout plans are designed to match your fitness
              goals. Whether you're a beginner or a pro, our programs will help
              you reach new heights.
            </p>

            {/* <!-- Buttons --> */}
            <div class="flex flex-col md:flex-row  md:items-start gap-4">
              <a
                href="#services"
                className="flex items-center px-3 py-2 bg-lime-600 text-white rounded shadow-md hover:bg-lime-700 transition w-auto max-w-[140px]"
              >
                Gym Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" class="bg-white font-primary relative pt-1">
        <div class="flex flex-col h-full  py-4 px-6 md:px-32 mt-10">
          <div class="flex flex-col md:flex-row mb-7 xs:mb-10">
            <div class="xl:w-5/12 md:w-6/12 flex flex-col md:mb-5">
              <span class="text-lg font-semibold text-dark-gray inline-block mb-6 border-b-2 border-base-color">
                Our Services
              </span>
              <h2 class="text-5xl font-Raj font-bold text-dark-gray mb-2">
                Enhancing your health
                <br /> and well-being<span class="text-base-color">.</span>
              </h2>
              <div class="font-medium text-dark-gray mt-auto flex items-center">
                <img
                  src="https://craftohtml.themezaa.com/images//demo-elearning-03.png"
                  alt=""
                />
                <span>
                  Fitness courses from{" "}
                  <span class="font-semibold underline">top experts.</span>
                </span>
              </div>
            </div>
            <div class="md:w-6/12 xl:w-6/12 xl:ml-6 mt-10 md:mt-0">
              <div class="grid grid-cols-12 gap-0 border-b border-gray-300">
                <div class="col-span-3 flex justify-center items-center">
                  <img
                    src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-icon-01.png"
                    class="w-14"
                    alt=""
                  />
                </div>
                <div class="col-span-8 pl-10 pr-10 py-8 border-l border-gray-300 xs:pl-6 xs:pr-6">
                  <span class="text-2xl font-Raj font-medium text-dark-gray">
                    Professional Trainers
                  </span>
                  <p>Get guidance from certified professionals.</p>
                </div>
                <div class="col-span-1 flex justify-center items-center">
                  <button onClick={handleModalOpen}>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-12 gap-0 border-b border-gray-300">
                <div class="col-span-3 flex justify-center items-center">
                  <img
                    src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-icon-02.png"
                    class="w-14"
                    alt=""
                  />
                </div>
                <div class="col-span-8 pl-10 pr-10 py-8 border-l border-gray-300 xs:pl-6 xs:pr-6">
                  <span class="text-2xl font-Raj font-medium text-dark-gray">
                    Practice Videos
                  </span>
                  <p>Access on-demand training sessions anytime.</p>
                </div>
                <div class="col-span-1 flex justify-center items-center">
                  <button onClick={handleModalOpen}>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-12 gap-0 border-b border-gray-300">
                <div class="col-span-3 flex justify-center items-center">
                  <img
                    src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-icon-03.png"
                    class="w-14"
                    alt=""
                  />
                </div>
                <div class="col-span-8 pl-10 pr-10 py-8 border-l border-gray-300 xs:pl-6 xs:pr-6">
                  <span class="text-2xl font-Raj font-medium text-dark-gray">
                    Progress Reports
                  </span>
                  <p>Track your fitness journey and see your growth.</p>
                </div>
                <div class="col-span-1 flex justify-center items-center">
                  <button onClick={handleModalOpen}>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute left-0 -bottom-24 z-10 hidden md:flex flex-col items-center justify-center w-[320px] h-[320px] md:w-[150px] md:h-[150px] md:w-[180px] md:h-[180px] rounded-full md:-bottom-16 md:-left-8 md:-left-5 md:-bottom-14">
          <img
            src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-05.png"
            class="absolute top-1/2 -translate-y-1/2 md:w-11"
            alt=""
          />
          <img
            src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-04.png"
            alt=""
          />
        </div>
      </section>

      <section
        id="membership"
        className=" flex flex-col h-full px-6 md:px-32 py-12"
      >
        <div className=" ">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 lg:pr-4 md:mb-8">
              <h2 className="font-bold text-5xl text-dark-gray font-Raj mb-4">
                Membership<span className="text-lime-500"> Plans</span>
              </h2>
            </div>
            <div className="w-full lg:w-8/12 lg:pl-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ul className="list-none p-0 m-0">
                    <li className="pb-2 flex items-center">
                      <i className="feather icon-feather-arrow-right-circle text-xl text-base-color mr-3"></i>
                      30% off for family membership.
                    </li>
                    <li className="pb-2 flex items-center">
                      <i className="feather icon-feather-arrow-right-circle text-xl text-base-color mr-3"></i>
                      25% off when you purchase gold services.
                    </li>
                    <li className="pb-2 flex items-center">
                      <i className="feather icon-feather-arrow-right-circle text-xl text-base-color mr-3"></i>
                      Every session is booked in advance.
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="list-none p-0 m-0">
                    <li className="pb-2 flex items-center">
                      <i className="feather icon-feather-arrow-right-circle text-xl text-base-color mr-3"></i>
                      Top-tier fitness programs.
                    </li>
                    <li className="pb-2 flex items-center">
                      <i className="feather icon-feather-arrow-right-circle text-xl text-base-color mr-3"></i>
                      Unlimited access to all equipment.
                    </li>
                    <li className="pb-2 flex items-center">
                      <i className="feather icon-feather-arrow-right-circle text-xl text-base-color mr-3"></i>
                      Complimentary personal training.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col h-full px-6 md:px-32 py-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gym.map((service, index) => (
              <div
                key={index}
                className="relative bg-gray-100 py-8 px-12 rounded-sm overflow-hidden "
              >
                <span className="text-sm font-semibold uppercase bg-white shadow-md rounded-full px-4 py-1 mb-4 inline-block">
                  {service.name}
                </span>
                <h2 className="text-4xl py-3 font-Raj font-bold text-gray-800">
                  <sub className="text-2xl">#</sub>
                  {getFormattedPrice(service.price, countryCode)}
                </h2>
                {/* <span className="block text-sm font-semibold uppercase text-gray-700 mb-4">
                {services.}
              </span> */}
                <div className="space-y-2 mb-6">
                  <p className="flex items-center mb-2 pe-6 text-gray-700">
                    {service.shortDescription}
                  </p>
                </div>

                <button
                  onClick={handleModalOpen}
                  className="inline-block bg-lime-500 text-white py-2 px-6 rounded-sm hover:bg-gray-700 transition"
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
      <section class="bg-cultured font-primary relative overflow-hidden mt-12">
        <div class="flex flex-col h-full  py-4 px-6 md:px-24">
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-6/12 mb-4 md:mb-0 relative">
              <figure class=" w-4/5 ml-auto">
                <img
                  src="https://gfa-tech.com/dimp-template-images/gym/gym3.jpg"
                  class="rounded-lg w-full"
                  alt="Fitness"
                />
                <figcaption class="absolute bottom-20 left-2 w-[180px] text-center rounded-lg shadow-lg overflow-hidden animate-float">
                  <div class="bg-white p-3">
                    <div class="relative mb-10">
                      <img
                        src="https://gfa-tech.com/dimp-template-images/gym/gym2.jpg"
                        class="rounded-lg"
                        alt="Morning Run"
                      />
                      <a
                        href="https://www.youtube.com/watch?v=cfXHhfNy7tU"
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
                      >
                        <FaPlay class="text-dark-gray" />
                      </a>
                    </div>
                    <div class="flex items-center text-start">
                      <div class="text-lg font-Raj font-medium text-dark-gray">
                        Everyday Morning Run
                      </div>
                      <div class="ml-auto">
                        <img
                          src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-13.jpg"
                          alt="Runner"
                        />
                      </div>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div class="xl:w-5/12 md:w-6/12 xl:ml-8  md:text-left">
              <span class="text-lg font-Raj font-semibold text-dark-gray inline-block mb-3 border-b-2 border-base-color">
                Flexibility and Patience
              </span>
              <h2 class="text-5xl font-Raj mb-4 font-bold text-dark-gray">
                Fitness You’ll Enjoy with Our Workouts
                <span class="text-lime-600">.</span>
              </h2>
              <ul class="list-none text-start">
                <li className="mb-4">
                  <div className="flex items-start">
                    <FaCheckCircle className="mr-2 text-lime-600" />
                    <div>
                      <strong className="text-lg font-medium text-dark-gray">
                        How to Raise Overall Fitness Level?
                      </strong>
                      <p className="mt-2">
                        Our mission is to provide you with the ultimate fitness
                        experience, tailored to your needs.
                      </p>
                    </div>
                  </div>
                </li>

                <li className="mb-4 flex items-start">
                  <FaCheckCircle className="mr-2 text-lime-600" />
                  <div>
                    <strong className="text-lg font-medium text-dark-gray">
                      How Can We Achieve Health Naturally?
                    </strong>
                    <p className="mt-2">
                      We focus on natural methods to help you achieve a healthy
                      lifestyle.
                    </p>
                  </div>
                </li>
                <li className="mb-4 flex items-start">
                  <FaCheckCircle className="mr-2 text-lime-600" />
                  <div>
                    <strong className="text-lg font-medium text-dark-gray">
                      Can I Get a Personal Trainer for Yoga?
                    </strong>
                    <p className="mt-2">
                      Yes, our expert yoga trainers are available to guide you
                      on your fitness journey.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* <div class="absolute bottom-0 left-0 z-[-1] hidden md:block text-6xl font-bold uppercase text-gradient-light-gray-white">
            Exercise
          </div> */}
        </div>
      </section>

      <section id="testimonials" className="bg-white py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className=" md:text-left mb-6 md:mb-0">
              <span className="text-lg font-Raj font-medium text-gray-700 mb-2 block underline decoration-lime-500">
                Member Reviews
              </span>
              <h2 className="text-3xl font-Raj text-start font-bold text-gray-800 mb-2">
                What our members say about our facilities
                <span className="text-indigo-600">.</span>
              </h2>
            </div>
            <div className="relative overflow-hidden w-full max-w-lg md:max-w-2xl">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-transform duration-500 transform ${
                    index === activeIndex
                      ? "translate-x-0"
                      : "translate-x-full absolute top-0 left-0 w-full"
                  }`}
                >
                  <div className="border p-6 rounded-lg shadow-lg bg-white">
                    <div className="flex items-center mb-4">
                      <img
                        className="w-20 h-20 rounded-full mr-4"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <div>
                        <h4 className="text-xl font-Raj font-semibold">
                          {testimonial.name}
                        </h4>
                        <p>{testimonial.role}</p>
                      </div>
                      <div className="ml-auto bg-lime-600 text-white text-sm font-bold px-6 py-1 rounded-full">
                        {Array(testimonial.rating)
                          .fill()
                          .map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                      </div>
                    </div>
                    <p>{testimonial.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="justify-center items-center space-x-2 mt-4">
            <button
              className="border p-2 rounded-full text-gray-700"
              onClick={prevSlide}
            >
              &lt;
            </button>
            <button
              className="border p-2 rounded-full text-gray-700"
              onClick={nextSlide}
            >
              &gt;
            </button>
          </div>
          {/* Rating Section */}
          <div className="mt-10 text-center">
            <h2 className="inline-block ml-4 text-gray-700">
              Rated 4.8 out of 5.0 based on members'{" "}
              <span className="font-bold underline decoration-black-500">
                1058 reviews!
              </span>
            </h2>
          </div>
        </div>
      </section>

      <section id="instructors" className="py-12 bg-white">
        <div className="flex flex-col h-full  py-4 px-6 md:px-32">
          <div className="flex flex-wrap items-end mb-12">
            <div className="w-full md:w-7/12 md:text-left mb-6 md:mb-0">
              <div className="inline-block mb-3">
                <span className="text-base  font-Raj font-semibold underline underline-offset-[10px] decoration-lime-600">
                  Experienced Instructors
                </span>
              </div>
              <h2 className="text-4xl font-Raj text-lime-600 font-bold leading-tight mb-3">
                We have amazing Instructors
              </h2>
            </div>
            <div className="w-full md:w-5/12  md:text-left">
              <p className="text-gray-700">
                Our team is highly skilled and experienced in various workouts,
                ensuring quality training and support.
              </p>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
            <div className="text-center">
              <div className="bg-white overflow-hidden">
                <img
                  className="w-full h-64 rounded-md object-cover"
                  src="https://gfa-tech.com/dimp-template-images/barber/instructor3.jpg"
                  alt="Amina Yusuf"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold font-Raj">
                    Amina Yusuf
                  </h3>
                  <p className="text-gray-500">Strength & Conditioning Coach</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white overflow-hidden">
                <img
                  className="w-full rounded-md h-64 object-cover"
                  src="https://gfa-tech.com/dimp-template-images/barber/instructor1.jpg"
                  alt="Chinedu Okafor"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold font-Raj">
                    Chinedu Okafor
                  </h3>
                  <p className="text-gray-500">
                    Personal Trainer & Fitness Coach
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white overflow-hidden">
                <img
                  className="w-full rounded-md h-64 object-cover"
                  src="https://gfa-tech.com/dimp-template-images/barber/instructor2.jpg"
                  alt="Bolu Adeyemi"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold font-Raj">
                    Bolu Adeyemi
                  </h3>
                  <p className="text-gray-500">
                    Bodybuilding & Weightlifting Coach
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-md overflow-hidden">
                <img
                  className="w-full h-64 object-cover"
                  src="https://gfa-tech.com/dimp-template-images/barber/instructor4.jpg"
                  alt="Tope Balogun"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold font-Raj">
                    Tope Balogun
                  </h3>
                  <p className="text-gray-500">Cardio & HIIT Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    href="#about"
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
                    href="#instructors"
                    class="alt-font text-[#706F6B] hover:underline"
                  >
                    Instructors
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

export default GymTemplate;
