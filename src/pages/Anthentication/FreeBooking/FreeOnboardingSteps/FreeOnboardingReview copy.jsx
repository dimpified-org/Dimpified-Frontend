import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CheckCircle2,
  Copy,
  Share2,
  Loader2,
  Edit,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Mail,
} from "lucide-react";
import FreeOnboardingLayout from "./FreeOnboardingLayout";
import SubStepWrapper from "./FreeBookingSetup/SubStepWrapper";
import { ButtonLongPurple } from "../../../../component/Buttons";
import api from "../../../../api/authApis";
import dashboardApi from "../../../../api/DashboardApi";
import { showToast } from "../../../../component/ShowToast";
import { setEcosystemDomain } from "../../../../features/ecosystemDomain";
import axios from "axios";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const FreeOnboardingReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { creatorId } = useSelector((state) => state.auth.user || {});
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const ecosystemDomain = useSelector(
    (state) => state.ecosystemDomain?.domain || "dimpified.com",
  );

  const [businessData, setBusinessData] = useState(null);
  const [availabilityData, setAvailabilityData] = useState(null);
  const [servicesData, setServicesData] = useState(null);
  const [bankData, setBankData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Load all data from sessionStorage on mount
  useEffect(() => {
    const business = sessionStorage.getItem("businessIdentity");
    const availability = sessionStorage.getItem("availability");
    const services = sessionStorage.getItem("services");
    const bank = sessionStorage.getItem("bankDetails");

    if (!business || !availability || !services || !bank) {
      showToast("Please complete all steps first", "error");
      // Redirect to the first incomplete step
      if (!business) navigate("/free/auth/business-identity");
      else if (!availability) navigate("/free/auth/availability");
      else if (!services) navigate("/free/auth/service-payment");
      return;
    }

    setBusinessData(JSON.parse(business));
    setAvailabilityData(JSON.parse(availability));
    setServicesData(JSON.parse(services));
    setBankData(JSON.parse(bank));
  }, [navigate]);

  const handleEdit = (step) => {
    const routes = {
      business: "/free/auth/business-identity",
      availability: "/free/auth/availability",
      services: "/free/auth/service-payment",
    };
    navigate(routes[step]);
  };

  const handleSubmitAll = async () => {
    if (!businessData || !availabilityData || !servicesData || !bankData) {
      showToast("Missing required data", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Create Business Identity
      const week = daysOfWeek.map((day) => ({
        day: day.toLowerCase(),
        enabled: availabilityData.selectedDays[day],
        slots: availabilityData.selectedDays[day]
          ? [
              {
                start: availabilityData.timeSlots[day].from,
                end: availabilityData.timeSlots[day].to,
              },
            ]
          : [],
      }));

      const businessPayload = {
        creatorId: creatorId.toString(),
        businessName: businessData.pageName,
        websiteAddress: businessData.websiteAddress,
        businessAddress: businessData.address,
        description: businessData.description,
        category: businessData.businessType,
        timezone: availabilityData.timezone,
        week,
        accessToken,
        refreshToken,
      };

      const businessResult = await api.createBusinessIdentity(businessPayload);

      // Set ecosystem domain
      if (businessResult.data?.businessDetails?.websiteAddress) {
        dispatch(
          setEcosystemDomain(
            businessResult.data.businessDetails.websiteAddress,
          ),
        );
      } else {
        dispatch(setEcosystemDomain(businessData.websiteAddress));
      }

      // Step 2: Create Services
      const servicePayload = {
        accessToken,
        refreshToken,
        creatorId: creatorId.toString(),
        ecosystemDomain: businessData.websiteAddress,
        category: "Personal Care Service",
        subCategory: businessData.businessType,
        prefix: "I will",
        header: servicesData.services[0].name,
        description: businessData.description,
        format: "Onsite",
        currency: "NGN",
        services: servicesData.services.map((service) => ({
          name: service.name,
          shortDescription: `Professional ${service.name.toLowerCase()} service`,
          price: parseFloat(service.amount) || 0,
          deliveryTime: service.duration,
          priceFormat: "Fixed",
          serviceImage: "null",
        })),
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/create-service`,
        servicePayload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      // Step 3: Add Bank Account
      await dashboardApi.creatorAddAccount({
        accessToken,
        refreshToken,
        creatorId,
        accountName: bankData.accountName,
        accountNumber: bankData.accountNumber,
        bankName: bankData.bankName,
        currency: "NGN",
        ecosystemDomain: businessData.websiteAddress,
      });

      showToast("Setup completed successfully!", "success");

      // Clear all session storage
      sessionStorage.removeItem("businessIdentity");
      sessionStorage.removeItem("availability");
      sessionStorage.removeItem("services");
      sessionStorage.removeItem("bankDetails");

      setShowSuccess(true);
    } catch (err) {
      console.error("Setup error:", err);
      showToast(
        err.response?.data?.message ||
          err.message ||
          "Failed to complete setup",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Share functionality
  const bookingLink = `https://dimpified.com/${businessData?.websiteAddress || ecosystemDomain}`;
  const shareMessage = `Check out my booking page! Book your appointments with ${businessData?.pageName || "me"} here: ${bookingLink}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bookingLink);
    showToast("Link copied to clipboard!", "success");
  };

  const handleShare = (platform) => {
    const encodedMessage = encodeURIComponent(shareMessage);
    const encodedUrl = encodeURIComponent(bookingLink);

    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodedMessage}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=Book with ${businessData?.pageName}&body=${encodedMessage}`,
      sms: `sms:?body=${encodedMessage}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
      showToast(`Sharing on ${platform}...`, "info");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Book with ${businessData?.pageName}`,
          text: shareMessage,
          url: bookingLink,
        });
        showToast("Shared successfully!", "success");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };

  // Success Modal
  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 sm:p-10 text-center shadow-2xl">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2
              className="w-12 h-12 text-purple-600"
              strokeWidth={3}
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Congratulations!
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-8">
            Your free booking page is live and ready to accept bookings!
          </p>

          <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 mb-8">
            <p className="text-sm text-gray-600 mb-3">Your booking link</p>
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-4 border border-gray-200 mb-4">
              <span className="text-purple-600 font-medium text-sm sm:text-base truncate flex-1 text-left">
                {bookingLink}
              </span>
              <button
                onClick={handleCopyLink}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Copy link"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleNativeShare}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Share link"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {showShareOptions && (
              <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-lg">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Share via:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="flex flex-col items-center p-3 hover:bg-green-50 rounded-xl transition"
                  >
                    <MessageCircle className="w-6 h-6 text-green-600 mb-1" />
                    <span className="text-xs text-gray-600">WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="flex flex-col items-center p-3 hover:bg-blue-50 rounded-xl transition"
                  >
                    <Facebook className="w-6 h-6 text-blue-600 mb-1" />
                    <span className="text-xs text-gray-600">Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex flex-col items-center p-3 hover:bg-blue-50 rounded-xl transition"
                  >
                    <Twitter className="w-6 h-6 text-blue-400 mb-1" />
                    <span className="text-xs text-gray-600">Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="flex flex-col items-center p-3 hover:bg-blue-50 rounded-xl transition"
                  >
                    <Linkedin className="w-6 h-6 text-blue-700 mb-1" />
                    <span className="text-xs text-gray-600">LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleShare("email")}
                    className="flex flex-col items-center p-3 hover:bg-red-50 rounded-xl transition"
                  >
                    <Mail className="w-6 h-6 text-red-600 mb-1" />
                    <span className="text-xs text-gray-600">Email</span>
                  </button>
                  <button
                    onClick={() => handleShare("sms")}
                    className="flex flex-col items-center p-3 hover:bg-purple-50 rounded-xl transition"
                  >
                    <MessageCircle className="w-6 h-6 text-purple-600 mb-1" />
                    <span className="text-xs text-gray-600">SMS</span>
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => window.open(bookingLink, "_blank")}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition"
              >
                Visit Your Page
              </button>
              <button
                onClick={handleCopyLink}
                className="flex-1 px-4 py-2 border border-purple-600 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition"
              >
                Copy Link
              </button>
            </div>
          </div>

          <div className="flex gap-3 w-full items-center mb-4">
            <hr className="flex-1 bg-gray-300" />
            <p className="text-center text-gray-500">Or</p>
            <hr className="flex-1 bg-gray-300" />
          </div>

          <ButtonLongPurple
            onClick={() => navigate("/free/creator/dashboard/overview")}
            width="w-full"
            className="h-14 text-lg font-semibold"
          >
            Go to Dashboard
          </ButtonLongPurple>

          <p className="text-sm text-gray-500 mt-6">
            Share your booking link with clients to start receiving bookings!
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (!businessData || !availabilityData || !servicesData || !bankData) {
    return (
      <FreeOnboardingLayout currentStep={3}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      </FreeOnboardingLayout>
    );
  }

  return (
    <FreeOnboardingLayout currentStep={4} rightImage={null}>
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center sm:text-left">
          Review Your Information
        </h1>
        <p className="text-gray-600 mb-8 sm:mb-10 text-center sm:text-left text-base sm:text-lg">
          Please review all details before creating your booking page
        </p>

        <div className="space-y-6">
          {/* Business Identity Section */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">
                Business Identity
              </h2>
              <button
                onClick={() => handleEdit("business")}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Booking Page Name</p>
                <p className="font-semibold text-gray-900">
                  {businessData.pageName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="text-gray-800">{businessData.description}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Business Address</p>
                <p className="text-gray-800">{businessData.address}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Your Prospective Booking Link</p>
                <p className="text-purple-600 font-medium break-all">
                  dimpified.com/{businessData.websiteAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Availability Section */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Availability</h2>
              <button
                onClick={() => handleEdit("availability")}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-2">Available Days</p>
                {daysOfWeek.map((day) => {
                  const isSelected = availabilityData.selectedDays[day];
                  if (!isSelected) return null;

                  return (
                    <div
                      key={day}
                      className="flex flex-wrap items-center justify-between bg-white rounded-xl p-4 mb-2 border border-gray-200"
                    >
                      <span className="font-medium text-gray-900 min-w-[100px]">
                        {day}
                      </span>
                      <span className="text-gray-700">
                        {availabilityData.timeSlots[day].from} -{" "}
                        {availabilityData.timeSlots[day].to}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div>
                <p className="text-sm text-gray-600">Timezone</p>
                <p className="font-medium text-gray-900">
                  {availabilityData.timezone}
                </p>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Services</h2>
              <button
                onClick={() => handleEdit("services")}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 pb-2 border-b border-gray-300">
                <span>Service</span>
                <span>Amount</span>
                <span>Duration</span>
              </div>

              {servicesData.services.map((service, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 items-center bg-white rounded-xl p-4 border border-gray-200"
                >
                  <span className="font-medium text-gray-900">
                    {service.name}
                  </span>
                  <span className="text-gray-800">₦ {service.amount}</span>
                  <span className="text-gray-800">{service.duration} mins</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">
                Payment Details
              </h2>
              <button
                onClick={() => handleEdit("services")}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Bank Name</p>
                <p className="font-semibold text-gray-900">
                  {bankData.bankName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Bank Account Number</p>
                <p className="font-mono text-gray-900 font-semibold">
                  {bankData.accountNumber}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Account Name</p>
                <p className="text-gray-900 font-semibold">
                  {bankData.accountName}
                </p>
              </div>

              {bankData.verified && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10">
          <ButtonLongPurple
            width="w-full"
            onClick={handleSubmitAll}
            disabled={isSubmitting}
            className="bg-purple-600 h-14 text-lg font-semibold"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                Creating Your Business...
              </div>
            ) : (
              "Confirm & Proceed"
            )}
          </ButtonLongPurple>
        </div>
      </div>
    </FreeOnboardingLayout>
  );
};

export default FreeOnboardingReview;
