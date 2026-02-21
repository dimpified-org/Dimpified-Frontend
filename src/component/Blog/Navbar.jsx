import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "../../pages/LandingPages/images/dimp-blue.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-full bg-white fixed top-0 left-0 z-50 ">
        <nav className="w-full py-4 flex items-center justify-between px-6 lg:px-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={Logo} className="h-6" alt="Logo" />
            </Link>
          </div>

          <ul className="hidden lg:flex items-center gap-10 text-gray-700 font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-[#9810FA] font-semibold cursor-pointer"
              >
              Home
              </Link>
            </li><li>
              <Link
                to="/features"
                className="hover:text-[#9810FA] font-semibold cursor-pointer"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/subscriptions"
                className="hover:text-[#9810FA] cursor-pointer transition-colors duration-200"
              >
                Subscriptions
              </Link>
            </li>
            <li>
              <Link
                to="/about-dimpified"
                className="hover:text-[#9810FA] cursor-pointer transition-colors duration-200"
              >
                About Dimpified
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Link
                to="/blog"
                className="hover:text-[#9810FA] cursor-pointer transition-colors duration-200"
              >
                Blog
              </Link>
            </li>
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth/login">
              <button className="text-gray-600 hover:text-[#9810FA] font-medium transition-colors duration-200">
                Log in
              </button>
            </Link>
            <Link to="/auth/landing">
              <button className="px-6 py-2.5 bg-gradient-to-r from-[#9810FA] to-purple-600 hover:from-purple-700 hover:to-[#3F0994] text-white rounded-full font-semibold transition-all duration-300 hover:">
                Get Started Now
              </button>
            </Link>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <div className="w-6 h-6 text-[#9810FA]">×</div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-[#9810FA]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden shadow-2xl`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img src={Logo} className="h-6" alt="Logo" />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-[#9810FA]"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <ul className="flex flex-col gap-6 text-gray-700 font-medium">
            <li>
              <Link
                to="/features"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-[#9810FA] font-semibold"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/subscriptions"
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:text-[#9810FA]"
              >
                Subscriptions
              </Link>
            </li>
            <li>
              <Link
                to="/about-dimpified"
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:text-[#9810FA]"
              >
                About Dimpified
              </Link>
            </li>
            <li className="flex items-center justify-between">
              <Link
                to="/blog"
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:text-[#9810FA]"
              >
                Blog
              </Link>
            </li>
          </ul>

          <div className="my-8 border-t border-gray-100"></div>

          <div className="flex flex-col gap-4">
            <Link to="/auth/login" onClick={() => setIsOpen(false)}>
              <button className="w-full py-3 text-center border-2 border-[#9810FA] text-[#9810FA] hover:bg-[#9810FA] hover:text-white rounded-full font-semibold transition-all">
                Log in
              </button>
            </Link>
            <Link
              to="/auth/landing"
              onClick={() => setIsOpen(false)}
            >
              <button className="w-full py-3 bg-gradient-to-r from-[#9810FA] to-purple-600 hover:from-purple-700 hover:to-[#3F0994] text-white rounded-full font-semibold transition-all">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
