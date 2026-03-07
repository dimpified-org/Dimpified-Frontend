import React, { useEffect, useState } from "react";
import axios from "axios";
import FloatingContactButton from "../LandingPages/FloatingContact";
import { Helmet } from "react-helmet";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "../../component/Blog/Navbar";
import Footer from "../../component/Blog/Footer";

import GradientBG from "../LandingPages/images/gradient-bg.png";
import { showToast } from "../../component/ShowToast";
import { motion } from "motion/react";

// Validation Schema
const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\d{10,11}$/, "Phone Number must be 10 or 11 digits"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  enquire: yup.string().required("Enquiry type is required"),
  message: yup.string().required("Message is required"),
});

const LandingHelpCenter = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.body.className = "bg-white";
    return () => {
      document.body.className = "";
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/make-an-enquiry`,
        data,
      );
      showToast(response.data.message || "Form submitted successfully!");
      reset();
    } catch (error) {
      setLoading(false);
      showToast(
        error.response?.data?.message ||
          "Error submitting the form. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {" "}
      <div className="font-jak">
        <Navbar />
        <FloatingContactButton />
        <section
          className="py-24 font-jak px-0 relative bg-cover  bg-center"
          style={{ backgroundImage: `url(${GradientBG})` }}
        >
          <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
            <div className="flex flex-wrap md:flex-row items-center h-full">
              <div className=" md:w-1/2 px-3 justify-center  h-full">
                <h1 className="lg:text-5xl text-[3rem] text-dark font-normal leading-tight my-6">
                  <span className="font-bold bg-gradient-to-r from-[#9810FA] to-purple-600 hover:from-purple-600 hover:to-[#3F0994] text-transparent bg-clip-text">
                    Help Center
                  </span>
                </h1>
                <p className="text-lg  text-dark leading-relaxed mb-8 w-4/5">
                  We'd love to hear from you
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-14 lg:py-16 px-3">
          <div className="container mx-auto px-4">
            <p className="text-lg  text-dark leading-relaxed mb-8 w-4/5">
              Kindly check the{" "}
              <a
                className="underline font-bold text-purple-600 hover:text-yellow-400"
                href="#faq"
              >
                FAQs
              </a>{" "}
              first to see if you intended questions has been answered
            </p>
            <div className="flex flex-wrap gap-7">
              {/* Form Section */}
              <div className="w-full lg:w-7/12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                  {/* Name Fields */}
                  <div className="flex flex-col md:flex-row gap-7">
                    <div className="flex flex-col flex-grow gap-2">
                      <label
                        htmlFor="firstName"
                        className="text-lg font-semibold text-gray-800"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-purple-600"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <span className="text-red-500 text-sm">
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-grow gap-2">
                      <label
                        htmlFor="lastName"
                        className="text-lg font-semibold text-gray-800"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-purple-600"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <span className="text-red-500 text-sm">
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone and Email Fields */}
                  <div className="flex flex-col md:flex-row gap-7">
                    <div className="flex flex-col flex-grow gap-2">
                      <label
                        htmlFor="phoneNumber"
                        className="text-lg font-semibold text-gray-800"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        placeholder="XXX XXX XXXX"
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-purple-600"
                        {...register("phoneNumber")}
                      />
                      {errors.phoneNumber && (
                        <span className="text-red-500 text-sm">
                          {errors.phoneNumber.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-grow gap-2">
                      <label
                        htmlFor="email"
                        className="text-lg font-semibold text-gray-800"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-purple-600"
                        {...register("email")}
                      />
                      {errors.email && (
                        <span className="text-red-500 text-sm">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Enquiry Type */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="enquire"
                      className="text-lg font-semibold text-gray-800"
                    >
                      Enquires related to *
                    </label>
                    <select
                      id="enquire"
                      className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-purple-600"
                      {...register("enquire")}
                    >
                      <option value="">Select Enquiry Type</option>
                      <option value="general-enquiry">General Enquiry</option>
                      <option value="customer-enquiry">
                        Customer Service Enquiry
                      </option>
                      <option value="website-enquiry">Website Enquiries</option>
                      <option value="subscription-enquiry">
                        Subscription Enquiry
                      </option>
                      <option value="payment-enquiry">Payment Enquiry</option>
                      <option value="other-enquiry">Other Enquiry</option>
                    </select>
                    {errors.enquire && (
                      <span className="text-red-500 text-sm">
                        {errors.enquire.message}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-lg font-semibold text-gray-800"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-purple-600"
                      {...register("message")}
                    ></textarea>
                    {errors.message && (
                      <span className="text-red-500 text-sm">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`w-full md:w-auto bg-purple-600 text-white py-3 px-8 rounded-md hover:bg-primary4 focus:outline-none ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    disabled={loading} // Disable button during loading
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>

              {/* Contact Details Section */}
              <div className="w-full lg:w-4/12">
                <div className="bg-purple-600 p-7 rounded-lg text-white">
                  <div className="border-b border-white/10 pb-6 mb-6">
                    <h3 className="text-xl font-bold mb-2">Get in touch</h3>
                    <p className="text-md">
                      Have questions or need assistance? We're just a message
                      away.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Our Physical Location
                    </h3>
                    <p className="text-md">
                      2nd Floor, Wing-C, Ogun Tech Hub, Abeokuta
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="font-jak px-4 py-12 lg:px-12 lg:py-18 bg-white"
          id="faq"
        >
          <div className="">
            <div className="flex items-center justify-center text-center mb-6">
              <div className="w-full max-w-2xl">
                <h2 className="alt-font text-5xl font-light text-dark tracking-tight mb-0">
                  Frequently asked questions
                </h2>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="container mx-auto px-6">
                <div className="space-y-4">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            What is the purpose of your Dimpified as a platform?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Our platform is designed to help businesses manage
                          their online presence, client interactions, and
                          business growth efficiently. It integrates tools for
                          website building, booking module, payment management,
                          and more, all in one place.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            How can your platform help me build a professional
                            website?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Our fast, intuitive onboarding process, along with
                          customizable no-code templates, allows you to create a
                          polished and professional website quickly. You can
                          showcase your services, expertise, and set up a
                          booking page to attract more customers or clients.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            Can I customize the templates to fit my brand?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Yes, our no-code templates are customizable. You can
                          tailor the description and services to match your
                          brand’s identity and specific needs, ensuring a
                          consistent and professional look.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            How does the booking feature benefit my business
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          The booking feature allows your clients to easily
                          schedule appointments online, reducing no-shows and
                          double bookings. It automates appointment management,
                          sends reminders, and helps you maintain a full
                          schedule, which leads to higher efficiency and
                          customer satisfaction.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            What kind of payment methods does your platform
                            support?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Our platform supports a variety of payment methods,
                          including credit/debit cards, Flutterwave, Paystack,
                          and users can pay directly to your bank account. This
                          flexibility ensures a convenient and secure
                          transaction experience for your clients.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            What kind of support do you offer?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          We offer continuous support to our users. Whether you
                          need technical assistance or business advice, our
                          dedicated support team is here to help you succeed and
                          make the most of our platform.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            How can I get started with your platform?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Getting started is easy! Simply click "Get Started
                          Now" above, choose the plan that best fits your needs,
                          and begin exploring the features. Our user-friendly
                          interface and comprehensive onboarding resources will
                          guide you through the setup process.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </motion.div>
  );
};

export default LandingHelpCenter;
