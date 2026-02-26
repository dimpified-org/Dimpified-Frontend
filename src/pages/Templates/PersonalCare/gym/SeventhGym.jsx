import React, { useState } from "react";
import { FaBars, FaTimes, FaDumbbell } from "react-icons/fa";
import { gym } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

export default function SeventhGym() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "US"; // Fallback to 'NG'

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center text-purple-700 text-2xl font-bold">
            <FaDumbbell className="mr-2 text-3xl" />
            <span>i-Fitwell</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center text-sm font-medium">
            {[
              { label: "Home", href: "#home" },
              { label: "About Us", href: "#about" },
              { label: "Membership Plans", href: "#membership" },
              { label: "Why Choose Us", href: "#why-choose-us" },
              { label: "Contact Us", href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-purple-700 transition"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={handleModalOpen}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition font-semibold"
            >
              Become a Member
            </button>
          </div>

          {/* Mobile Toggle */}
          <div
            className="md:hidden text-2xl text-gray-700 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md px-6 pb-6 pt-2 space-y-4 text-sm font-medium transition-all">
            {[
              { label: "Home", href: "#home" },
              { label: "About Us", href: "#about" },
              { label: "Membership Plans", href: "#membership" },
              { label: "Why Choose Us", href: "#why-choose-us" },
              { label: "Contact Us", href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)} // auto-close
                className="block text-gray-700 hover:text-purple-700 transition"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                handleModalOpen();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition font-semibold"
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>

      <div className="relative px-6 pt-[100px]">
        {/* Hero Card */}
        <section
          id="home"
          className="bg-cover bg-center min-h-[80vh] flex items-center justify-center relative rounded-[30px] overflow-hidden"
          style={{
            backgroundImage:
              "url('https://gfa-tech.com/dimp-template-images/gym/gym7.1.png')",
          }}
        >
          {/* Overlay */}
          <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full z-0 rounded-[30px]" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl text-center text-white px-6 py-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Transform Your Body with Our <br className="hidden md:block" />
              <span className="text-white">Expert Trainers</span>
            </h1>
            <p className="mb-6 text-sm sm:text-base">
              At our gym, we specialize in sculpting bodies and fitness plans
              tailored just for you. <br />
              Experience peak performance and total wellness with our dedicated
              team of trainers.
            </p>
            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )}
            <a href="#membership">
              {" "}
              <button
                onClick={handleModalOpen}
                className="bg-white text-black px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-gray-200"
              >
                Get Started
              </button>{" "}
            </a>
          </div>
        </section>

        {/* Know More Floating Box */}
        <a href="#why-choose-us">
          {" "}
          <div className="absolute bottom-6 hover:bg-purple-300  right-6 bg-[#E9ECF5] text-black py-4 px-6 rounded-[30px] shadow-lg flex items-start gap-4 w-fit">
            <div className="font-semibold hover:underline text-sm mt-1">
              Know More
            </div>
            <div className="flex -space-x-4">
              {[
                "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=200&q=80",
                "https://gfa-tech.com/dimp-template-images/gym/gym6.7.jpg",
                "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=200&q=80",
                "https://gfa-tech.com/dimp-template-images/gym/gym6.6.jpg",
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=200&q=80",
              ].map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Trainer ${idx + 1}`}
                  className="w-12 h-12 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            {/* Arrow */}
            <div className="text-black text-xl ml-2 mt-1">&#8594;</div>
          </div>
        </a>
      </div>

      <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 mb-16">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            {/* Top Image */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-0 w-72 h-48 sm:w-80 sm:h-56 md:w-96 md:h-64 rounded-3xl overflow-hidden shadow-xl z-10">
              <img
                src="https://gfa-tech.com/dimp-template-images/gym/gym7.2.png"
                alt="Trainer guiding a trainee in gym"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Image */}
            <div className="relative top-40 left-10 sm:left-20 w-72 h-48 sm:w-80 sm:h-56 md:w-96 md:h-64 rounded-3xl overflow-hidden shadow-2xl z-0">
              <img
                src="https://gfa-tech.com/dimp-template-images/gym/gym7.3.jpg"
                alt="Women practicing yoga"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Text Section */}
          <div className="w-full lg:w-1/2" id="about">
            <p className="text-sm text-purple-600 font-medium mb-2 border-l-4 border-purple-600 pl-3">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
              Revolutionizing Fitness & <br className="hidden md:block" />
              Wellness Practices
            </h2>
            <p className="text-gray-600 mb-8 text-base md:text-lg leading-relaxed">
              We believe every body holds the potential for transformation—not
              just in terms of physical fitness, but as a foundation for
              personal empowerment and opportunity. Our mission is to help
              individuals and communities unlock their strength, achieve
              wellness goals, and build a lifestyle that fuels both body and
              mind. Through expert guidance and a supportive environment, we
              connect people to the tools and trainers they need to thrive.
            </p>
            <button
              onClick={handleModalOpen}
              className="px-6 py-3 rounded-lg text-purple-600 border border-purple-600 hover:bg-purple-50 font-semibold transition-all duration-200"
            >
              Become a Member
            </button>
          </div>
        </div>
      </section>

      {/* Section: What We Are Offering */}
      <section id="membership" className="px-6 md:px-12 lg:px-24 py-16 bg-white">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
          <div>
            <p className="text-sm text-gray-500 mb-2">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              What We Are Offering
            </h2>
          </div>
          <button
            onClick={handleModalOpen}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
          >
            Become a member now!
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          {gym.map((service, index) => (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* <img
                src={service.serviceImage}
                alt={service.name}
                className="w-full h-48 object-cover"
              /> */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 hover:text-purple-700 mb-2">
                  <button onClick={handleModalOpen}>{service.name}</button>
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {service.shortDescription}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {getFormattedPrice(service.price, countryCode)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Simplified Wellness */}
      <section
        id="why-choose-us"
        className="bg-[#F1E9FF] px-6 md:px-12 lg:px-24 py-20"
      >
        <div className="text-center mb-14">
          <p className="text-sm text-gray-500 mb-2">Why i-Fitwell</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Simplified Wellness and Body Care
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Features */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            <div className="flex gap-4">
              <div className="text-purple-600 font-bold text-lg">01</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  User-Friendly Interface
                </h4>
                <p className="text-sm text-gray-600">
                  Our website is designed with simplicity and ease of use in mind.
                  You can easily manage your customers and transactions with
                  just a few taps.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-purple-600 font-bold text-lg">02</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Secure Transactions
                </h4>
                <p className="text-sm text-gray-600">
                  Rest assured that your transactions within the website are safe
                  and secure. Your payments are protected using robust security
                  measures.
                </p>
              </div>
            </div>
          </div>

          {/* website Image */}
          <div className="flex justify-center lg:col-span-1">
            <img
              src="https://gfa-tech.com/dimp-template-images/gym/gym6.7.jpg"
              alt="website Interface"
              className="max-w-full h-[450px] rounded-xl"
            />
          </div>

          {/* Features */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            <div className="flex gap-4">
              <div className="text-purple-600 font-bold text-lg">03</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Real-Time Notifications
                </h4>
                <p className="text-sm text-gray-600">
                  Stay informed and connected with real-time notifications from
                  the website. Receive instant alerts on notifications when your
                  scheduled ones are confirmed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-purple-600 font-bold text-lg">04</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  24/7 Support
                </h4>
                <p className="text-sm text-gray-600">
                  Have questions or need assistance at any time? We offer 24/7
                  support to address your queries and provide assistance
                  whenever you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="bg-white px-6 md:px-12 lg:px-24 py-16">
        <div className="mb-8">
          <p className="text-sm text-gray-500">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            What Our Users Say
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Chinedu Okafor",
              text: "This website na lifesaver! I no dey miss my gym sessions again, even with my tight work schedule.",
              avatar:
                "https://gfa-tech.com/dimp-template-images/gym/gym-testi2.jpg",
            },
            {
              name: "Zainab Yusuf",
              text: "Very clean website. Booking my fitness classes now takes just seconds. I love how easy everything is.",
              avatar:
                "https://gfa-tech.com/dimp-template-images/gym/gym6.18.jpg",
            },
            {
              name: "Tunde Akinwale",
              text: "Finding a good trainer used to be wahala. But with this website, I just pick who I want and boom — done!",
              avatar:
                "https://gfa-tech.com/dimp-template-images/gym/gym-testi1.jpg",
            },
            {
              name: "Ngozi Eze",
              text: "Since I started using this website, I've been more consistent and motivated. The reminders dey help well well.",
              avatar:
                "https://gfa-tech.com/dimp-template-images/gym/Gym4.3.jpg",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#f9f7fd] p-5 rounded-xl shadow-sm">
              <div className="flex items-center gap-1 mb-3 text-yellow-500 text-sm">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <p className="text-sm text-gray-700 mb-4">{item.text}</p>
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-900">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stronger You Section */}
      <section
        className="relative bg-cover bg-center text-white py-[250px] px-6 md:px-12 lg:px-24"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/gym/gym7.7.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            The Stronger You Is Just Ahead
          </h2>
          <p className="mb-8 text-sm md:text-base">
            Transform Your Body and Boost Your Confidence with Our Expert
            Training Programs Today!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={handleModalOpen}
              className="bg-white hover:text-purple-700 text-black p-4  rounded-lg flex items-center gap-2 text-sm font-medium"
            >
              <FaDumbbell className="text-3xl" />
              <div className="flex flex-col text-xl leading-tight">
                Join Us Now
              </div>
            </button>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <section id="contact">
        <WhiteContactForm />
      </section>
      <footer className="bg-[#2d0243] text-white py-14 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand & Description */}
          <div>
            <div className="flex items-center text-white text-2xl font-bold mb-4">
              <FaDumbbell className="mr-2 text-3xl" />
              <span>i-Fitwell</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              At i-Fitwell, we help you build strength, discipline, and
              confidence. Whether you're just starting or pushing limits, our
              trainers and programs have you covered.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#home" className="hover:text-purple-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-purple-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-300">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#membership" className="hover:text-purple-300">
                  Membership Plans
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-purple-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-purple-300">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300">
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Monday – Friday: 6:00 AM – 9:00 PM</li>
              <li>Saturday: 7:00 AM – 7:00 PM</li>
              <li>Sunday: 10:00 AM – 4:00 PM</li>
              <li>Public Holidays: 10:00 AM – 2:00 PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-white border-opacity-20 pt-6 flex items-center justify-center text-xs text-gray-400 gap-y-4">
          <p className="text-white">
            &copy; {new Date().getFullYear()} Built with{" "}
            <a href="https://dimpified.com" className="hover:text-gray-200">
              Dimpified
            </a>{" "}
            . All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
