import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-16 lg:px-32 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center">
            <img
              src="https://i.imghippo.com/files/EI2275rJE.png"
              alt="Dimpified Logo"
              className="h-6 w-auto object-contain"
            />
          </div>

          <p className="text-sm text-gray-300 mt-3">
            The No. 1 booking solution for service businesses. Get booked
            faster, manage time smarter, and grow your business.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold text-lg">Product</h3>
          <ul className="space-y-2 text-gray-300 mt-3">
            <li>
              <a className="hover:text-purple-600" href="/features">
                Features
              </a>
            </li>
            <li>
              <a className="hover:text-purple-600" href="/subscriptions">
                Subscriptions
              </a>
            </li>
            {/* <li>
              <a className="hover:text-purple-600" href="#testimonials">
                Testimonials
              </a>
            </li> */}
            <li>
              Integrations{" "}
              <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full border border-purple-200">
                Coming Soon
              </span>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg">Company</h3>
          <ul className="space-y-2 text-gray-300 mt-3">
            <li>
              <a className="hover:text-purple-600" href="/about-dimpified">
                About Dimpified
              </a>
            </li>
            <li>
              <a className="hover:text-purple-600" href="/blog">
                Blog
              </a>
            </li>
            <li>
              Academy{" "}
              <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full border border-purple-200">
                Coming Soon
              </span>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg">Support</h3>
          <ul className="space-y-2 text-gray-300 mt-3">
            <li>
              <a className="hover:text-purple-600" href="/help">
                Help Centre
              </a>
            </li>
            <li>
              Documentation{" "}
              <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full border border-purple-200">
                Coming Soon
              </span>
            </li>
            <li>
              <a className="hover:text-purple-600" href="/privacy-policy">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="hover:text-purple-600" href="/terms-of-service">
                Terms of service
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <hr className="mt-10 border-gray-700 opacity-50" />

      <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-gray-500">
        {/* Dynamic Year */}
        <div className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Dimpified. All rights reserved.
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5 mt-4 md:mt-0">
          <a
            href="https://www.facebook.com/share/17q9nMqKQh/"
            className="text-gray-400 hover:text-white transition"
          >
            <i className="fab fa-facebook-f text-lg"></i>
          </a>
          <a
            href="https://x.com/UseDimpified"
            className="text-gray-400 hover:text-white transition"
          >
            <i className="fab fa-x-twitter text-lg"></i>
          </a>
          <a
            href="https://www.instagram.com/use.dimpified?igsh=bGZndmE1Y2RkYnYx"
            className="text-gray-400 hover:text-white transition"
          >
            <i className="fab fa-instagram text-lg"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/dimpified/?viewAsMember=true"
            className="text-gray-400 hover:text-white transition"
          >
            <i className="fab fa-linkedin-in text-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
