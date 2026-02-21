// components/layouts/PaidOnboardingLayout.jsx
import React from "react";
import PropTypes from "prop-types";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RightImage from "../../../../assets/FreeBooking/FreeAuthImage.png";
import Logo from "../../../../assets/NewAuthImage/NewLogo.png";
import { Link as Route } from "react-router-dom";
const PaidOnboardingLayout = ({
  children,
  currentStep = 1,
  onBack,
  backDisabled = false,
  rightImage = RightImage,
}) => {
  const navigate = useNavigate();
  const handleBack = () => (onBack ? onBack() : navigate(-1));

  // STATIC STEP LABELS – no props
  const STEP_LABELS = ["Basic Info", "Verify", "Setup", "Review",  "Subscription", "Template",];
  const totalSteps = STEP_LABELS.length;
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* LEFT PANE */}
      <div
        className={`flex-1 flex flex-col px-5 py-8 sm:px-8 lg:px-12 xl:px-20 2xl:px-32 ${
          !rightImage ? "lg:max-w-full lg:mx-auto" : ""
        }`}
      >
        <div className="mb-6 lg:mb-8">
          <Route to="/">
            <img
              src={Logo}
              alt="Dimipified Logo"
              className="h-6  w-auto object-contain"
            />
          </Route>
        </div>
        {/* Back Button */}
        <button
          onClick={handleBack}
          disabled={backDisabled}
          className={`mb-8 sm:mb-10 flex items-center gap-2 text-gray-700 font-medium text-base sm:text-lg transition-all ${
            backDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:text-purple-700 hover:gap-3"
          }`}
        >
          <ChevronLeft size={28} />
          <span>Back</span>
        </button>

        {/* STEPPER */}
        <div className="mb-3 sm:mb-3">
          {/* Mobile progress bar */}
          <div className="sm:hidden flex justify-center px-4 mb-8">
            <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 transition-all duration-500 ease-out"
                style={{
                  width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Desktop / Tablet numbered bubbles with labels */}
          <div className="hidden sm:flex items-center justify-center gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-sm lg:text-lg font-bold transition-all shadow-md ${
                      step === currentStep
                        ? "bg-purple-600 text-white scale-110 ring-4 ring-purple-200"
                        : step < currentStep
                        ? "bg-purple-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  <span className="text-base text-gray-600 text-center max-w-20">
                    {STEP_LABELS[step - 1]}
                  </span>
                </div>
                {index < totalSteps - 1 && (
                  <div
                    className={`flex-1 h-1 rounded-full transition-all max-w-32 ${
                      step < currentStep ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* FORM CONTENT */}
        <div className="w-full  mx-auto flex-1 flex flex-col justify-start">
          {children}
        </div>
      </div>

      {/* RIGHT IMAGE (desktop only) */}
      {rightImage && (
        <div className="hidden lg:block lg:w-2/5 xl:w-1/3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          <img
            src={rightImage}
            alt="Onboarding"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

PaidOnboardingLayout.propTypes = {
  children: PropTypes.node.isRequired,
  currentStep: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  onBack: PropTypes.func,
  backDisabled: PropTypes.bool,
  rightImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

PaidOnboardingLayout.defaultProps = {
  currentStep: 1,
  onBack: null,
  backDisabled: false,
  rightImage: RightImage,
};

export default PaidOnboardingLayout;
