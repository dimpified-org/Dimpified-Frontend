// components/onboarding/SubStepWrapper.jsx
import React from "react";
import PropTypes from "prop-types";

const SubStepWrapper = ({ currentSubStep, totalSubSteps = 3, children }) => {
  const steps = ["Business Identity", "Availability", "Service & Payment"];

  const isActive = (idx) => idx + 1 === currentSubStep;
  const isCompleted = (idx) => idx + 1 < currentSubStep;

  return (
    <div className="mb-10 sm:mb-12 mt-6">
      {/* ==================== MOBILE: Only Numbers 1 2 3 ==================== */}
      <div className="block sm:hidden">
        <div className="flex justify-center items-center gap-6 py-4">
          {steps.slice(0, totalSubSteps).map((_, index) => {
            const step = index + 1;
            return (
              <div
                key={step}
                className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm ${
                  isActive(index)
                    ? "bg-purple-600 text-white scale-110 ring-4 ring-purple-200"
                    : isCompleted(index)
                    ? "bg-purple-600 text-white"
                    : "bg-[#0000001A] text-gray-600"
                }`}
              >
                {step}
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================== TABLET & DESKTOP: Text Pills ==================== */}
      <div className="hidden sm:flex items-center justify-center gap-6 lg:gap-8">
        {steps.slice(0, totalSubSteps).map((label, index) => (
          <React.Fragment key={index}>
            <div
              className={`px-6 py-3 rounded-full text-sm lg:text-base font-medium transition-all duration-300 whitespace-nowrap shadow-sm ${
                isActive(index) || isCompleted(index)
                  ? "bg-[#9F68FE33] text-purple-700 ring-2 ring-purple-300"
                  : "bg-[#0000001A] text-gray-500"
              }`}
            >
              {label}
            </div>

            {index < totalSubSteps - 1 && (
              <div
                className={`w-12 lg:w-20 h-1 rounded-full transition-all duration-500 ${
                  isCompleted(index) ? "bg-purple-600" : "bg-[#0000001A]"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <div className="mt-10 sm:mt-12">{children}</div>
    </div>
  );
};

SubStepWrapper.propTypes = {
  currentSubStep: PropTypes.oneOf([1, 2, 3]).isRequired,
  totalSubSteps: PropTypes.oneOf([1, 2, 3]),
  children: PropTypes.node.isRequired,
};

SubStepWrapper.defaultProps = {
  totalSubSteps: 3,
};

export default SubStepWrapper;