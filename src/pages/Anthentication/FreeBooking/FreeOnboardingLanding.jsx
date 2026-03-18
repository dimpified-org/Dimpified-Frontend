import { Link, Globe } from "lucide-react";
import FreeOnboardingImage from "../../../assets/FreeBooking/FreeAuthImage.png";
import Logo from "../../../assets/NewAuthImage/NewLogo.png";
import { Link as Route } from "react-router-dom";

export default function FreeOnboardingLanding() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative stars */}
      <div className="absolute top-[40%] left-[-50px] w-32 h-32 md:w-48 md:h-48">
        <svg
          className="w-full h-full opacity-80"
          viewBox="0 0 100 196"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-16.9349 12.5146C-11.8105 -4.1717 11.8105 -4.1717 16.9349 12.5146C20.3869 23.7549 33.6304 28.5751 43.4998 22.1835C58.1511 12.6949 76.2459 27.8782 69.4456 43.9546C64.8649 54.784 71.9116 66.9893 83.5805 68.4369C100.903 70.586 105.005 93.8481 89.462 101.792C78.9919 107.144 76.5446 121.023 84.553 129.633C96.4415 142.414 84.631 162.87 67.618 158.965C56.1577 156.334 45.3615 165.393 45.9622 177.136C46.8538 194.569 24.6573 202.648 14.1349 188.72C7.04672 179.339 -7.04674 179.339 -14.1349 188.72C-24.6573 202.648 -46.8538 194.569 -45.9622 177.136C-45.3615 165.393 -56.1577 156.334 -67.618 158.965C-84.631 162.87 -96.4415 142.414 -84.553 129.632C-76.5446 121.023 -78.9919 107.144 -89.462 101.792C-105.005 93.8481 -100.903 70.586 -83.5805 68.4369C-71.9116 66.9893 -64.8649 54.784 -69.4456 43.9546C-76.2459 27.8782 -58.1511 12.6949 -43.4998 22.1835C-33.6304 28.5751 -20.3869 23.7549 -16.9349 12.5146Z"
            fill="#9F68FE"
          />
        </svg>
      </div>

      <div className="absolute top-[-20px] right-2/4 w-24 h-24 md:w-32 md:h-32 transform translate-x-12">
        <svg
          className="w-full h-full opacity-90"
          viewBox="0 0 203 98"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M83.9168 -89.6991C89.1488 -106.736 113.265 -106.736 118.497 -89.6991C122.022 -78.223 135.543 -73.3017 145.619 -79.8274C160.578 -89.5151 179.052 -74.0132 172.11 -57.5995C167.433 -46.543 174.627 -34.0816 186.541 -32.6036C204.227 -30.4095 208.415 -6.65933 192.546 1.45146C181.856 6.91505 179.357 21.0856 187.534 29.8758C199.672 42.925 187.614 63.8105 170.244 59.8233C158.543 57.1375 147.52 66.3866 148.133 78.376C149.044 96.1744 126.382 104.423 115.638 90.2032C108.402 80.6246 94.0125 80.6246 86.7756 90.2032C76.0324 104.423 53.3703 96.1744 54.2806 78.376C54.8939 66.3866 43.8712 57.1375 32.1704 59.8233C14.8005 63.8105 2.74224 42.925 14.8802 29.8758C23.0566 21.0856 20.558 6.91505 9.86825 1.45146C-6.00081 -6.65933 -1.81302 -30.4095 15.8731 -32.6036C27.7868 -34.0816 34.9813 -46.543 30.3045 -57.5995C23.3616 -74.0132 41.836 -89.515 56.7946 -79.8274C66.8711 -73.3017 80.3925 -78.223 83.9168 -89.6991Z"
            fill="#FDC700"
          />
        </svg>
      </div>
      <div className=" ">
        <div className="w-full gap-8 lg:gap-12 flex flex-col lg:flex-row items-center  mx-auto">
          {/* Left Content Section */}
          <div className="w-full lg:w-2/3 px-4  mx-auto ">
            <div className="flex items-center gap-2 top-0 left-0 ml-4 sm:ml-8 md:ml-16 lg:ml-28 my-8">
              <Route to="/">
                <img
                  src={Logo}
                  alt="Dimipified Logo"
                  className="h-6  w-auto object-contain"
                />
              </Route>
            </div>
            <div className="relative z-10  space-y-6 md:space-y-8 lg:space-y-10 mx-auto px-4 py-8 md:py-12 lg:py-16 items-center justify-center flex flex-col">
              {/* Logo */}
              <div>
                {/* Main Heading */}
                <div>
                  <h1 className="text-2xl md:text-3xl text-center lg:text-4xl font-bold text-gray-900 leading-tight mb-4 lg:mb-8">
                    <span className="text-purple-600">Dimipified</span> for
                    Business.
                  </h1>
                </div>

                {/* Subheading */}
                <p className="text-gray-600 text-sm md:text-base lg:text-lg text-center max-w-lg mb-6 lg:mb-8">
                  Start your stress free business management journey here.
                  <br />
                  Select your choice to continue
                </p>

                {/* Options Cards */}
                <div className="space-y-4 max-w-md w-full">
                  {/* Option 1 - Basic Booking Link */}
                  <Route to="/free/auth/pre-signup" className="block">
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 md:p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <div className=" items-center justify-center flex flex-col">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors mb-3">
                          <Link className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                        </div>

                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 text-center">
                          Get a Free Basic Booking Link
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 text-center">
                          Perfect for getting started quickly. Share a simple
                          link for clients to book you.
                        </p>
                      </div>
                    </div>
                  </Route>

                  {/* Option 2 - Stunning Website */}
                  <Route to="/paid/auth/pre-signup" className="block">
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 md:p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <div className=" items-center justify-center flex flex-col">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors mb-3">
                          <Globe className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                        </div>

                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 text-center">
                          Create a Stunning Booking Website
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 text-center">
                          Build a custom website to showcase your brand and take
                          payments directly
                        </p>
                      </div>
                    </div>
                  </Route>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Section - Hidden on mobile and tablet */}
          <div className="hidden lg:block relative w-1/3">
            <div className=" overflow-hidden shadow-2xl">
              <img
                src={FreeOnboardingImage}
                alt="Hair styling professional at work"
                className="w-full h-screen object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
