import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function HomePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [email, setEmail] = useState("");

  const toggleNav = () => setNavOpen(!navOpen);
  const closeNav = () => setNavOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email.");
    alert(`Thanks for joining, ${email}!`);
    setEmail("");
  };

  const teamMembers = [
    {
      name: "Jane Doe",
      role: "Lead Stylist",
      bio: "Passionate about creating stunning hairstyles that empower women.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Emily Smith",
      role: "Color Specialist",
      bio: "Expert in vibrant colors and personalized hair care.",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "Texture Expert",
      bio: "Transforming curls and waves into beautiful styles.",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Lisa Brown",
      role: "Makeup Artist",
      bio: "Enhancing beauty with expert makeup techniques for every occasion.",
      img: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    {
      name: "Maya Green",
      role: "Hair Consultant",
      bio: "Providing personalized consultations to achieve your dream look.",
      img: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      name: "Anna White",
      role: "Salon Manager",
      bio: "Ensuring a seamless experience for every client from start to finish.",
      img: "https://randomuser.me/api/portraits/women/52.jpg",
    },
  ];
  const testimonials = [
    {
      stars: 5,
      text: "I’ve worked in the beauty industry for over a decade, and I’ve never come across a product line so elegant and effective. Their foundation blends effortlessly and provides all-day coverage without feeling heavy.",
      name: "Elena Martinez",
      title: "Beauty Editor, LuxeLook Magazine",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      stars: 5,
      text: "Their makeup artistry is second to none. I had my wedding makeup done by their team, and not only did it look flawless, but it stayed perfect for over 12 hours without a single touch-up. Highly recommended!",
      name: "Jessica Moore",
      title: "Bridal Stylist, EverGlow Studio",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      stars: 5,
      text: "From their packaging to the formulas, everything screams luxury. I particularly love their hydrating lip gloss—it’s a staple in my kit now. My clients constantly compliment the final look!",
      name: "Amanda Lewis",
      title: "Freelance Makeup Artist",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      stars: 5,
      text: "The best hairstylist experience I’ve ever had! They truly understand how to match a look to your personality and face shape. I left feeling more confident and radiant than ever.",
      name: "Rachel Kim",
      title: "Senior Stylist, Mirror & Mane",
      avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    },
    {
      stars: 5,
      text: "I use their skincare line daily, and I’ve noticed a dramatic improvement in my skin’s texture and brightness. It’s clear they’ve put a lot of thought and science into their formulations.",
      name: "Monica Patel",
      title: "Dermatologist, GlowSkin Clinic",
      avatar: "https://randomuser.me/api/portraits/women/71.jpg",
    },
    {
      stars: 5,
      text: "As someone constantly in front of the camera, I need makeup that lasts under lights. Their setting spray and primer combo is magic—my makeup doesn’t budge during long shoots.",
      name: "Tiffany Greene",
      title: "Content Creator & Beauty Influencer",
      avatar: "https://randomuser.me/api/portraits/women/85.jpg",
    },
  ];
  return (
    <div className="font-sans">
      {/* Navbar */}
      <header className="w-full bg-white shadow-md z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
          <nav className="hidden md:flex space-x-6 text-gray-700">
            <a href="#" className="hover:text-indigo-600">
              Home Page
            </a>
            <a href="#" className="hover:text-indigo-600">
              About Us
            </a>
            <a href="#" className="hover:text-indigo-600">
              Our Services
            </a>
            <a href="#" className="hover:text-indigo-600">
              Contact Us
            </a>
          </nav>
          <a
            href="#book"
            className="bg-[#9F68FE] text-white px-4 py-2 rounded hidden md:block hover:bg-purple-700 transition"
          >
            Book Appointment
          </a>
          <div className="md:hidden text-2xl text-gray-700" onClick={toggleNav}>
            {navOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Mobile Menu */}
        {navOpen && (
          <div className="bg-white px-6 py-4 space-y-4 md:hidden">
            <a href="#" onClick={closeNav} className="block text-gray-700">
              Home Page
            </a>
            <a href="#" onClick={closeNav} className="block text-gray-700">
              About Us
            </a>
            <a href="#" onClick={closeNav} className="block text-gray-700">
              Our Services
            </a>
            <a href="#" onClick={closeNav} className="block text-gray-700">
              Contact Us
            </a>
            <a
              href="#book"
              onClick={closeNav}
              className="bg-[#9F68FE] text-white w-full py-2 rounded hover:bg-purple-700 transition block text-center"
            >
              Book Appointment
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="relative w-full sm:min-h-screen py-20 sm:py-0 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/hairstylist/hair-01.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white max-w-3xl px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Transform Your Look with <br className="hidden sm:block" />
            Our Expert Stylists
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-200">
            At our salon, we specialize in creating stunning hairstyles tailored
            just for you. Experience the ultimate in beauty and relaxation with
            our dedicated team.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition w-fit mx-auto sm:mx-0">
              Book Appointment
            </button>
            <button className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black transition w-fit mx-auto sm:mx-0">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="px-6 py-20 bg-white md:flex md:items-center md:gap-10"
      >
        <img
          src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-02.jpg"
          alt="Hair Wash"
          className="w-full md:w-1/2 rounded shadow-md object-cover"
        />
        <div className="mt-6 md:mt-0 md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">
            Welcome to Your Premier Destination for Exceptional Women's Hair
            Styling in Nigeria
          </h3>
          <p className="text-gray-700">
            At our salon, we believe every woman deserves to feel beautiful and
            confident. Our talented stylists are dedicated to providing
            personalized services that enhance your unique style and
            personality.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-pink-100 px-4 md:px-10 lg:px-20 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          Exceptional Hair Services
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6">
          Tailored for You
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          At our salon, we specialize in providing a wide range of hair services
          designed to enhance your beauty and confidence. Our skilled stylists
          are dedicated to delivering personalized experiences that cater to
          your unique style.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className=" p-4 rounded-lg  hover:shadow-md transition">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-03.jpg"
              alt="Signature Hair Services"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h4 className="font-semibold text-lg mb-2">
              Our Signature Hair Services
            </h4>
            <p className="text-sm text-gray-600">
              From trims to total transformations, we redefine your
              beauty—strand by strand.
            </p>
          </div>

          {/* Card 2 */}
          <div className=" p-4 rounded-lg hover:shadow-md transition">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-04.jpg"
              alt="Styling That Transforms"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h4 className="font-semibold text-lg mb-2">
              Styling That Transforms Your Look
            </h4>
            <p className="text-sm text-gray-600">
              Whether bold or subtle, our styles are curated to complement your
              natural beauty.
            </p>
          </div>

          {/* Card 3 */}
          <div className=" p-4 rounded-lg hover:shadow-md transition">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-05.jpg"
              alt="Luxury Treatments"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h4 className="font-semibold text-lg mb-2">
              Luxury Treatments for Every Hair Type
            </h4>
            <p className="text-sm text-gray-600">
              Using high-end products, we revitalize your hair to leave it
              glossy and nourished.
            </p>
          </div>

          {/* Card 4 */}
          <div className=" p-4 rounded-lg hover:shadow-md transition">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-06.jpg"
              alt="Medium Length Styles"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h4 className="font-semibold text-lg mb-2">
              Versatile Medium-Length Styles
            </h4>
            <p className="text-sm text-gray-600">
              Perfect for your lifestyle—chic, stylish, and effortlessly
              manageable.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("Booking form coming soon!")}
          className="mt-12 bg-[#9F68FE] hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-full transition"
        >
          Book Appointment
        </button>
      </section>
      {/* Features Section */}
      <section className="relative text-white py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105 z-0"
          style={{
            backgroundImage:
              "url('https://gfa-tech.com/dimp-template-images/hairstylist/hair-07.jpg')",
          }}
        ></div>
        <div className="relative max-w-6xl mx-auto text-start z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Experience Unmatched Hair <br /> Care and Styling Tailored Just{" "}
            <br className="md:hidden" /> <br />
            for You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 text-left">
            {/* Column 1 */}
            <div className="flex flex-col items-start">
              <div className="mb-4">
                <img
                  src="https://gfa-tech.com/dimp-template-images/hairstylist/vector-icon.png"
                  alt="Salon Icon"
                  className="w-10 h-10"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Why Choose Our Salon for Your Hair Needs?
              </h3>
              <p className="text-sm text-white opacity-90">
                We deliver exceptional results with a focus on customer
                satisfaction and personalized hair care.
              </p>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-start">
              <div className="mb-4">
                <img
                  src="https://gfa-tech.com/dimp-template-images/hairstylist/vector-icon.png"
                  alt="Quality Icon"
                  className="w-10 h-10"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Our Commitment to Quality and Care in Every Service
              </h3>
              <p className="text-sm text-white opacity-90">
                Your hair deserves the best, and we are here to provide it with
                top-tier tools and treatments.
              </p>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-start">
              <div className="mb-4">
                <img
                  src="https://gfa-tech.com/dimp-template-images/hairstylist/vector-icon.png"
                  alt="Transform Icon"
                  className="w-10 h-10"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Transform Your Look with Our Professional Hair Services
              </h3>
              <p className="text-sm text-white opacity-90">
                Join countless satisfied clients who trust us to enhance their
                beauty with tailored hair designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-[#fff5ed] py-20 px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold mb-2">Our Gallery</h2>
        <p className="text-center max-w-xl mx-auto mb-10 text-sm text-gray-700">
          Explore our stunning collection of hairstyling transformations.
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-4">
          {/* Row 1 */}
          <div className="sm:col-span-6">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-08.jpg"
              alt="Braiding in salon"
              className="w-full h-72 object-cover rounded-lg"
            />
          </div>
          <div className="sm:col-span-6">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-09.jpg"
              alt="Hair rollers preparation"
              className="w-full h-72 object-cover rounded-lg"
            />
          </div>

          {/* Row 2 */}
          <div className="sm:col-span-4">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-10.jpg"
              alt="Salon stylist at work"
              className="w-full h-56 object-cover rounded-lg"
            />
          </div>
          <div className="sm:col-span-4">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-11.jpg"
              alt="Natural curly style"
              className="w-full h-56 object-cover rounded-lg"
            />
          </div>
          <div className="sm:col-span-4">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-12.jpg"
              alt="Hair drying session"
              className="w-full h-56 object-cover rounded-lg"
            />
          </div>

          {/* Row 3 */}
          <div className="sm:col-span-6">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-13.jpg"
              alt="Short buzz haircut"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="sm:col-span-6">
            <img
              src="https://gfa-tech.com/dimp-template-images/hairstylist/hair-14.jpg"
              alt="Braided updo beauty"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20 px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase text-gray-500">Stylists</p>
          <h2 className="text-3xl font-bold mb-2">Our Team</h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Meet the talented professionals behind our services.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-12 max-w-6xl mx-auto text-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-full sm:w-[45%] md:w-[28%]">
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600 font-medium">{member.role}</p>
              <p className="text-sm mt-2 text-gray-600">{member.bio}</p>
              <div className="flex justify-center gap-4 mt-3 text-gray-500">
                <a href="#">
                  <FaFacebookF className="hover:text-black text-sm" />
                </a>
                <a href="#">
                  <FaTwitter className="hover:text-black text-sm" />
                </a>
                <a href="#">
                  <FaInstagram className="hover:text-black text-sm" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => alert("Loading more team members...")}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            See More
          </button>
        </div>
      </section>
      <section className="relative w-full text-white py-24 px-6 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm scale-105 z-0"
          style={{
            backgroundImage: `url('https://gfa-tech.com/dimp-template-images/hairstylist/hair-16.jpg')`,
          }}
        ></div>

        <div className="relative text-center max-w-3xl z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Join Our Beauty Community Today
          </h2>
          <p className="text-lg sm:text-xl mb-6">
            Experience the ultimate in hairstyling tailored just for you. Book
            your appointment now!
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-transparent border border-white px-5 py-3 rounded-full text-white w-full sm:w-80 outline-none"
              required
            />
            <button
              type="submit"
              className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm font-bold mt-3">
            By clicking Sign Up you're confirming that you agree with our{" "}
            <a href="/terms" className="underline hover:text-gray-300">
              Terms and Conditions
            </a>
            .
          </p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Customer testimonials
          </h2>
          <p className="mt-2 text-gray-600">
            Discover how our beauty solutions are transforming lives and looks.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-left flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex mb-2 text-black">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09L5.824 12 1 7.91l6.06-.88L10 2l2.94 5.03L19 7.91 14.176 12l1.702 6.09z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    “{testimonial.text}”
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-4">
          {/* Logo */}
          <div className="md:col-span-1">
            <span className="text-2xl font-bold">{userDetails?.ecosystemName || ""}</span>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest updates on exclusive
              beauty launches and promotions.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your Email Here"
                className="w-full bg-gray-900 border border-white/30 px-4 py-2 rounded-md text-black focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2 border border-white/30 text-white rounded-md font-bold hover:bg-gray-200"
              >
                Join
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-2">
              By joining, you consent to receive updates and agree to our{" "}
              <a href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline">
                  Home Page
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:underline">
                  Our Services
                </a>
              </li>
              <li>
                <a href="/book" className="hover:underline">
                  Book Now
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/blog" className="hover:underline">
                  Blog Posts
                </a>
              </li>
              <li>
                <a href="/faqs" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="/testimonials" className="hover:underline">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-white text-xl">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-300"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-300"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 GlamAura. All rights reserved.</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>
            <a href="/cookies" className="hover:underline">
              Cookie Settings
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
