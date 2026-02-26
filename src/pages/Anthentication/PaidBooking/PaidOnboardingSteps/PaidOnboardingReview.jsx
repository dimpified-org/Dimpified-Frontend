import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CheckCircle2,
  Loader2,
  Edit,
} from "lucide-react";
import PaidOnboardingLayout from "./PaidOnboardingLayout";
import SubStepWrapper from "./PaidBookingSetup/SubStepWrapper";
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

const PaidOnboardingReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { creatorId } = useSelector((state) => state.auth.user || {});
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const [businessData, setBusinessData] = useState(null);
  const [availabilityData, setAvailabilityData] = useState(null);
  const [servicesData, setServicesData] = useState(null);
  const [bankData, setBankData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load all data from sessionStorage on mount
  useEffect(() => {
    const business = sessionStorage.getItem("businessIdentity");
    const availability = sessionStorage.getItem("availability");
    const services = sessionStorage.getItem("services");
    const bank = sessionStorage.getItem("bankDetails");

    if (!business || !availability || !services || !bank) {
      showToast("Please complete all steps first", "error");
      // Redirect to the first incomplete step
      if (!business) navigate("/Paid/auth/business-identity");
      else if (!availability) navigate("/Paid/auth/availability");
      else if (!services) navigate("/Paid/auth/service-payment");
      return;
    }

    setBusinessData(JSON.parse(business));
    setAvailabilityData(JSON.parse(availability));
    setServicesData(JSON.parse(services));
    setBankData(JSON.parse(bank));
  }, [navigate]);

  const handleEdit = (step) => {
    const routes = {
      business: "/Paid/auth/business-identity",
      availability: "/Paid/auth/availability",
      services: "/Paid/auth/service-payment",
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
      if (
        businessResult.data?.businessDetails?.websiteAddress
      ) {
        dispatch(
          setEcosystemDomain(businessResult.data.businessDetails.websiteAddress)
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
        description: `Professional services including ${servicesData.services
          .map((s) => s.name)
          .join(", ")}`,
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
        }
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
      navigate("/paid/auth/subcription");
    } catch (err) {
      console.error("Setup error:", err);
      showToast(
        err.response?.data?.message || err.message || "Failed to complete setup",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (!businessData || !availabilityData || !servicesData || !bankData) {
    return (
      <PaidOnboardingLayout currentStep={3} >
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      </PaidOnboardingLayout>
    );
  }

  return (
    <PaidOnboardingLayout currentStep={4} rightImage={null}>
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
                <p className="text-sm text-gray-600">Your Booking Link</p>
                <p className="text-purple-600 font-medium break-all">
                  {businessData.websiteAddress}.dimpified.com
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
    </PaidOnboardingLayout>
  );
};

export default PaidOnboardingReview;