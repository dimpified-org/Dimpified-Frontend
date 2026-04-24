// pages/auth/FreeOnboardingSetupOne.jsx
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import FreeOnboardingLayout from "../FreeOnboardingLayout";
import SubStepWrapper from "./SubStepWrapper";
import { LongInputWithPlaceholder } from "../../../../../component/Inputs";
import { ButtonLongPurple } from "../../../../../component/Buttons";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../../../component/ShowToast";
import api from "../../../../../api/verifyDomain";

export const businessTypesData = [
  { name: "Hair Salon", icon: "", active: true, visible: true },
  { name: "Barber Shop", icon: "", active: false, visible: true },
  { name: "Nail Salon", icon: "", active: false, visible: true },
  { name: "Massage Therapy", icon: "", active: false, visible: true },
  { name: "Spa and Wellness Center", icon: "", active: false, visible: true },
  { name: "Skincare Clinic", icon: "", active: false, visible: true },
  { name: "Makeup Artist Services", icon: "", active: false, visible: true },
  {
    name: "Personal Training and Fitness Coaching",
    icon: "",
    active: false,
    visible: true,
  },
  { name: "Yoga and Pilates Studio", icon: "", active: false, visible: true },
  {
    name: "Weight Loss and Nutrition Counseling",
    icon: "",
    active: false,
    visible: true,
  },
  { name: "Chiropractic Services", icon: "", active: false, visible: true },
  { name: "Mental Health Counseling", icon: "", active: false, visible: true },
  {
    name: "Tattoo and Piercing Studio",
    icon: "",
    active: false,
    visible: true,
  },
  { name: "Aromatherapy Services", icon: "", active: false, visible: true },
  { name: "Dental Hygiene Services", icon: "", active: false, visible: true },
  { name: "Reflexology Services", icon: "", active: false, visible: true },
  { name: "Life Coaching", icon: "", active: false, visible: true },
  {
    name: "Eyelash Extension Services",
    icon: "",
    active: false,
    visible: true,
  },
  { name: "Cosmetic Dentistry", icon: "", active: false, visible: true },
  {
    name: "Personal Stylist and Image Consulting",
    icon: "",
    active: false,
    visible: true,
  },

  // Trade Services
  { name: "Plumbing Services", icon: "", active: false, visible: true },
  { name: "Electrical Services", icon: "", active: false, visible: true },
  { name: "Carpentry Services", icon: "", active: false, visible: true },
  { name: "Roofing Services", icon: "", active: false, visible: true },
  { name: "HVAC Services", icon: "", active: false, visible: true },
  { name: "Landscaping and Lawn Care", icon: "", active: false, visible: true },
  { name: "Painting Services", icon: "", active: false, visible: true },
  { name: "Masonry Services", icon: "", active: false, visible: true },
  { name: "Flooring Installation", icon: "", active: false, visible: true },
  { name: "Auto Repair", icon: "", active: false, visible: true },
  {
    name: "Welding and Metal Fabrication",
    icon: "",
    active: false,
    visible: true,
  },
  { name: "Appliance Repair", icon: "", active: false, visible: true },
  { name: "Locksmith Services", icon: "", active: false, visible: true },
  { name: "Pest Control Services", icon: "", active: false, visible: true },
  { name: "Waste Management", icon: "", active: false, visible: true },
  { name: "Moving Services", icon: "", active: false, visible: true },
  { name: "Handyman Services", icon: "", active: false, visible: true },
  { name: "Cleaning Services", icon: "", active: false, visible: true },

  // Creative Services
  { name: "Graphic Design", icon: "", active: false, visible: true },
  { name: "Fashion Design", icon: "", active: false, visible: true },
  { name: "Web Design", icon: "", active: false, visible: true },
  { name: "Branding Services", icon: "", active: false, visible: true },
  { name: "UX/UI Design", icon: "", active: false, visible: true },
  { name: "Photography", icon: "", active: false, visible: true },
  { name: "Videography", icon: "", active: false, visible: true },
  { name: "Animation & Illustration", icon: "", active: false, visible: true },
  { name: "SEO Consulting", icon: "", active: false, visible: true },
  { name: "Copywriting", icon: "", active: false, visible: true },
  { name: "Content Creation", icon: "", active: false, visible: true },
  { name: "Social Media Management", icon: "", active: false, visible: true },
  { name: "Interior Design", icon: "", active: false, visible: true },
  { name: "Music Production", icon: "", active: false, visible: true },
  { name: "Voiceover Services", icon: "", active: false, visible: true },
  { name: "Podcast Production", icon: "", active: false, visible: true },

  // Event Services
  { name: "Event Planning", icon: "", active: false, visible: true },
  { name: "Wedding Planning", icon: "", active: false, visible: true },
  { name: "Catering Services", icon: "", active: false, visible: true },
  { name: "DJ Services", icon: "", active: false, visible: true },
  { name: "Live Band Services", icon: "", active: false, visible: true },
  { name: "Photography Services", icon: "", active: false, visible: true },
  { name: "Videography Services", icon: "", active: false, visible: true },
  { name: "Florist Services", icon: "", active: false, visible: true },
  { name: "Event Rentals", icon: "", active: false, visible: true },
  {
    name: "Lighting and Sound Services",
    icon: "",
    active: false,
    visible: true,
  },
  { name: "Event Coordination", icon: "", active: false, visible: true },
  { name: "Bartending Services", icon: "", active: false, visible: true },
  { name: "Security Services", icon: "", active: false, visible: true },
  { name: "Decoration Services", icon: "", active: false, visible: true },

  // Educational Services
  { name: "Tutoring", icon: "", active: false, visible: true },
  { name: "Test Preparation", icon: "", active: false, visible: true },
  { name: "Language Lessons", icon: "", active: false, visible: true },
  { name: "Music Lessons", icon: "", active: false, visible: true },
  { name: "Art Lessons", icon: "", active: false, visible: true },
  { name: "Dance Lessons", icon: "", active: false, visible: true },
  { name: "Cooking Classes", icon: "", active: false, visible: true },
  { name: "Coding Bootcamps", icon: "", active: false, visible: true },
  { name: "Corporate Training", icon: "", active: false, visible: true },
  { name: "Public Speaking Coaching", icon: "", active: false, visible: true },
  { name: "STEM Education", icon: "", active: false, visible: true },
  {
    name: "College Admissions Counseling",
    icon: "",
    active: false,
    visible: true,
  },
  { name: "Career Coaching", icon: "", active: false, visible: true },
  { name: "Online Courses", icon: "", active: false, visible: true },

  // Technology Services
  { name: "Software Development", icon: "", active: false, visible: true },
  { name: "IT Support", icon: "", active: false, visible: true },
  { name: "Cloud Computing", icon: "", active: false, visible: true },
  { name: "Data Analytics", icon: "", active: false, visible: true },
  { name: "Cybersecurity Services", icon: "", active: false, visible: true },
  { name: "Database Management", icon: "", active: false, visible: true },
  { name: "Web Development", icon: "", active: false, visible: true },
  { name: "Mobile App Development", icon: "", active: false, visible: true },
  { name: "Digital Marketing", icon: "", active: false, visible: true },
  { name: "Technical Writing", icon: "", active: false, visible: true },
  { name: "ERP Solutions", icon: "", active: false, visible: true },
  { name: "AI and Machine Learning", icon: "", active: false, visible: true },
];

const FreeOnboardingSetupOne = () => {
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

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

  // Domain validation states
  const [isDomainValid, setIsDomainValid] = useState(false);
  const [domainMessage, setDomainMessage] = useState("");
  const [domainErrorMessage, setDomainErrorMessage] = useState("");
  const [domainSuggestions, setDomainSuggestions] = useState([]);
  const [isValidatingDomain, setIsValidatingDomain] = useState(false);
  const [hasCheckedDomain, setHasCheckedDomain] = useState(false);

  // Auto-save to sessionStorage on change
  useEffect(() => {
    if (formData.pageName || formData.description || formData.address) {
      sessionStorage.setItem("businessIdentity", JSON.stringify(formData));
    }
  }, [formData]);

  // validate business name exist
  const validateDomain = useCallback(
    async (domainName) => {
      if (!domainName || !accessToken || !refreshToken) {
        setDomainErrorMessage(
          "Please enter a domain name and ensure you are logged in.",
        );
        setIsDomainValid(false);
        setDomainMessage("");
        setDomainSuggestions([]);
        return;
      }

      setIsValidatingDomain(true);

      try {
        const sanitizedDomain = domainName
          .toLowerCase()
          .replace(/\s+/g, "")
          .replace(/[^a-z0-9-]/g, "");

        const response = await api.creatorVerifyDomain({
          domainName: sanitizedDomain,
          businesstype: formData.businessType,
          accessToken,
          refreshToken,
        });

        if (response) {
          const { message, suggestions = [] } = response.data;

          if (message === "Domain name is available") {
            setIsDomainValid(true);
            setDomainMessage("✓ This domain is available!");
            setDomainErrorMessage("");
            setDomainSuggestions([]);
          } else if (message === "Domain name not available") {
            setIsDomainValid(false);
            setDomainErrorMessage("This domain is already taken");
            setDomainMessage("");
            setDomainSuggestions(suggestions || []);
          }
        }
      } catch (error) {
        setIsDomainValid(false);
        setDomainErrorMessage(
          error.response?.data?.message ||
            "Error checking domain availability.",
        );
        setDomainMessage("");
        setDomainSuggestions([]);
      } finally {
        setIsValidatingDomain(false);
      }
    },
    [accessToken, refreshToken, formData.businessType],
  );

  // Auto-validate domain when pageName changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.pageName.trim()) {
        validateDomain(formData.pageName.trim());
        setHasCheckedDomain(true);
      } else {
        setIsDomainValid(false);
        setDomainMessage("");
        setDomainErrorMessage("");
        setDomainSuggestions([]);
        setHasCheckedDomain(false);
      }
    }, 800); // 800ms debounce

    return () => clearTimeout(timer);
  }, [formData.pageName, validateDomain]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValid =
    formData.pageName.trim() &&
    formData.businessType &&
    formData.description.trim().length >= 10 &&
    formData.address.trim() &&
    isDomainValid; // Domain must be verified

  const handleNext = () => {
    if (!isValid) {
      if (!isDomainValid && hasCheckedDomain) {
        showToast(
          "Please select an available domain or use a suggestion",
          "error",
        );
      } else {
        showToast("Please fill in all required fields", "error");
      }
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
    showToast("Business info saved! Proceed to set availability", "success");
    navigate("/free/auth/availability");
  };

  // Handle domain suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setFormData((prev) => ({ ...prev, pageName: suggestion }));
  };

  return (
    <FreeOnboardingLayout currentStep={3}>
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SubStepWrapper currentSubStep={1} />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center sm:text-left">
          Business Identity
        </h1>
        <p className="text-gray-600 mb-8 sm:mb-10 text-center sm:text-left text-base sm:text-lg">
          Tell us about your business
        </p>

        <div className="space-y-7 sm:space-y-8">
          {/* Business Type - FIRST */}
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

          {/* Booking Page Name - SECOND */}
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
              Your booking link will be: dimpified.com/
              <strong>
                {formData.pageName.toLowerCase().replace(/[^a-z0-9]/g, "") ||
                  "yourname"}
              </strong>
            </p>

            {/* Domain Validation Status */}
            {formData.pageName.trim() && (
              <div className="mt-3 space-y-2">
                {isValidatingDomain && (
                  <div className="flex items-center text-blue-600 text-sm">
                    <div className="animate-spin inline-block w-4 h-4 mr-2 border-2 border-blue-600 border-t-transparent rounded-full" />
                    Checking availability...
                  </div>
                )}

                {!isValidatingDomain && hasCheckedDomain && isDomainValid && (
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {domainMessage}
                  </div>
                )}

                {!isValidatingDomain && hasCheckedDomain && !isDomainValid && (
                  <div className="space-y-2">
                    <div className="flex items-center text-red-600 text-sm font-medium">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {domainErrorMessage}
                    </div>

                    {/* Domain Suggestions */}
                    {domainSuggestions && domainSuggestions.length > 0 && (
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 mb-2">
                          Try these available alternatives:
                        </p>
                        <div className="space-y-1">
                          {domainSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="w-full text-left px-3 py-2 text-sm text-blue-700 bg-white hover:bg-blue-100 rounded border border-blue-300 transition"
                            >
                              <span className="font-medium">
                                dimpified.com/
                              </span>
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
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
    </FreeOnboardingLayout>
  );
};

export default FreeOnboardingSetupOne;
