// pages/auth/PaidOnboardingSetupOne.jsx
import React, { useState, useEffect } from "react";
import PaidOnboardingLayout from "../PaidOnboardingLayout";
import SubStepWrapper from "./SubStepWrapper";
import { LongInputWithPlaceholder } from "../../../../../component/Inputs";
import { ButtonLongPurple } from "../../../../../component/Buttons";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../../../component/ShowToast";

export const businessTypesData = [
  { name: "Hair Salon", icon: "💇‍♀️", active: true, visible: true },
  { name: "Barber Shop", icon: "💈", active: false, visible: true },
  { name: "Nail Salon", icon: "💅", active: false, visible: true },
  { name: "Spa and Wellness Center", icon: "🧖‍♀️", active: false, visible: true },
  { name: "Massage Therapy", icon: "💆‍♀️", active: false, visible: true },
  { name: "Skincare Clinic", icon: "🧴", active: false, visible: true },
  { name: "Makeup Artist Services", icon: "💄", active: false, visible: true },
  {
    name: "Personal Training and Fitness Coaching",
    icon: "🏋️‍♂️",
    active: false,
    visible: true,
  },
  {
    name: "Yoga and Pilates Studio",
    icon: "🧘‍♀️",
    active: false,
    visible: true,
  },
  {
    name: "Weight Loss and Nutrition Counseling",
    icon: "🥗",
    active: false,
    visible: true,
  },
  { name: "Chiropractic Services", icon: "🦴", active: false, visible: true },
  {
    name: "Mental Health Counseling",
    icon: "🧠",
    active: false,
   visible: true,
  },
  {
    name: "Tattoo and Piercing Studio",
    icon: "💉",
    active: false,
   visible: true,
  },
  { name: "Aromatherapy Services", icon: "🌿", active: false, visible: true },
  { name: "Dental Hygiene Services", icon: "🦷", active: false, visible: true },
  { name: "Reflexology Services", icon: "🦶", active: false, visible: true },
  { name: "Life Coaching", icon: "🌟", active: false, visible: true },
  {
    name: "Eyelash Extension Services",
    icon: "👁️‍🗨️",
    active: false,
    visible: true,
  },
  { name: "Cosmetic Dentistry", icon: "😁", active: false, visible: true },
  {
    name: "Personal Stylist and Image Consulting",
    icon: "👗",
    active: false,
    visible: true,
  },
];

const PaidOnboardingSetupOne = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem("businessIdentity");
    if (saved) return JSON.parse(saved);
    return {
      pageName: "",
      businessType: "Hair Salon",
      description: "",
      address: "",
    };
  });

  // Auto-save to sessionStorage on change
  useEffect(() => {
    if (formData.pageName || formData.description || formData.address) {
      sessionStorage.setItem("businessIdentity", JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValid =
    formData.pageName.trim() &&
    formData.businessType &&
    formData.description.trim().length >= 10 &&
    formData.address.trim();

  const handleNext = () => {
    if (!isValid) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    // Generate clean websiteAddress
    const raw = formData.pageName.trim();
    const websiteAddress = raw
      .toLowerCase()
      .replace(/\s+/g, "") // remove spaces
      .replace(/[^a-z0-9]/g, ""); // remove special chars & digits not allowed

    // Save final version with generated websiteAddress
    const finalData = {
      ...formData,
      websiteAddress: websiteAddress || "mybookingpage", // fallback
    };

    sessionStorage.setItem("businessIdentity", JSON.stringify(finalData));
    sessionStorage.setItem("selectedCategory", finalData.businessType);
    showToast("Business info saved! Proceed to set availability", "success");
    navigate("/Paid/auth/availability");
  };

  return (
    <PaidOnboardingLayout currentStep={3}>
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SubStepWrapper currentSubStep={1} />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center sm:text-left">
          Business Identity
        </h1>
        <p className="text-gray-600 mb-8 sm:mb-10 text-center sm:text-left text-base sm:text-lg">
          Tell us about your business
        </p>

        <div className="space-y-7 sm:space-y-8">
          {/* Booking Page Name */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Booking Page Name <span className="text-red-500">*</span>
            </label>
            <LongInputWithPlaceholder
              name="pageName"
              placeholder="e.g Emmanuel Barbing Salon"
              value={formData.pageName}
              onChange={handleChange}
              className="h-14 rounded-2xl bg-gray-50 border-gray-200 text-base"
            />
            <p className="text-xs text-gray-500 mt-2">
              Your booking link will be:{" "}
              <strong>
                {formData.pageName.toLowerCase().replace(/[^a-z0-9]/g, "") ||
                  "yourname"}
              </strong>
              .dimpified.com
            </p>
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Business Type <span className="text-red-500">*</span>
            </label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full h-14 px-5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-700 focus:border-purple-500 focus:outline-none transition appearance-none cursor-pointer text-base"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 1rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "12px",
              }}
            >
              {businessTypesData
                .filter((item) => item.visible)
                .map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.icon} {item.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Description (Max 250 characters){" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={4}
              maxLength={250}
              placeholder="Briefly describe what you do..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none transition text-base"
            />
            <p className="text-xs text-gray-500 text-right mt-1">
              {formData.description.length}/250
            </p>
          </div>

          {/* Business Address */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Business Address <span className="text-red-500">*</span>
            </label>
            <LongInputWithPlaceholder
              name="address"
              placeholder="Enter Business Address"
              value={formData.address}
              onChange={handleChange}
              className="h-14 rounded-2xl bg-gray-50 border-gray-200 text-base"
            />
          </div>

          {/* Next Button */}
          <div className="pt-4 sm:pt-6">
            <ButtonLongPurple
              width="w-full"
              onClick={handleNext}
              disabled={!isValid}
              className="bg-purple-600 h-14 text-lg font-semibold  hover:bg-purple-700 disabled:opacity-60"
            >
              Next
            </ButtonLongPurple>
          </div>
        </div>
      </div>
    </PaidOnboardingLayout>
  );
};

export default PaidOnboardingSetupOne;
