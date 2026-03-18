// PaidSubscription.jsx
import React, { useState, useEffect } from "react";
import PaidOnboardingLayout from "./PaidOnboardingLayout";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { showToast } from "../../../../component/ShowToast";
import {
  subscriptionPlans,
  oneTimePaymentPlan,
} from "../../../../data/Pricing";
import { setEcosystemDomain } from "../../../../features/ecosystemDomain";
import { setEcosystemPlan } from "../../../../features/ecosystemPlan";
import AxiosInterceptor from "../../../../component/AxiosInterceptor";
import Lottie from "lottie-react";
import LoadingAnimation from "../../../../assets/affliate-img/LoadingAnimation.json";
import { motion } from "framer-motion";
import api2 from "../../../../api/Template";
import { FaCheck } from "react-icons/fa";

// Lite plan features
const litePlanFeatures = [
  {
    title: "Website Landing Page",
    description:
      "Show your brand, let customers book, view your hours and location",
  },
  {
    title: "Booking link",
    description: "Share on socials to get bookings, not DMs.",
  },
  {
    title: "Calendar sync",
    description: "Sync with your google calendar to stay organized.",
  },
  {
    title: "Unlimited Auto Booking Reminder",
    description: "Customers get auto reminders about appointment.",
  },
  {
    title: "Recurring appointments",
    description: "Customers can set recurring booking appointments.",
  },
  {
    title: "Staff onboarding",
    description: "Allow customers to select who cares for them.",
  },
  {
    title: "Group Appointment",
    description:
      "Schedule services for friends, family, or staff in one booking.",
  },
];

// ----------------------- Loading Component -----------------------
const LoadingPage = ({ message }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-white z-[9999] font-body"
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    >
      <Lottie
        animationData={LoadingAnimation}
        loop
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-60 xl:h-60 text-primary4"
      />
    </motion.div>
    <motion.h2
      className="mt-4 text-xl font-semibold text-gray-700 text-center px-4"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    >
      {message}
    </motion.h2>
  </motion.div>
);

// ----------------------- Subscription Modal -----------------------
const SubscriptionModal = ({ isOpen, onClose, onConfirm }) => {
  const [selectedMode, setSelectedMode] = useState(null);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Choose your subscription mode
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="mb-4 space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="subscriptionMode"
              value="recurring"
              onChange={() => setSelectedMode("recurring")}
              className="mr-2"
            />
            Recurring Subscription (Billed Monthly - Card Payment)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="subscriptionMode"
              value="oneTime"
              onChange={() => setSelectedMode("oneTime")}
              className="mr-2"
            />
            One-Time Subscription (Minimum of 3 months - Bank Transfer)
          </label>
        </div>
        <button
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          onClick={() => onConfirm(selectedMode)}
          disabled={!selectedMode}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// ----------------------- Paid Subscription Page -----------------------
const PaidSubscription = () => {
  const [selectedInterval, setSelectedInterval] = useState("Monthly");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "🔍 Verifying your payment... Just a sec! 😊"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetailEco, setUserDetailEco] = useState(null);

  const userDetails = useSelector((state) => state.auth.user || {});
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const referralCode = sessionStorage.getItem("referralCode");

  const intervals = ["Monthly", "Quarterly", "Biannually", "Yearly"];

  const loadingMessages = [
    "🔍 Verifying your payment... Just a sec! 😊",
    "🚀 Checking your subscription status... Almost ready! 🎉",
    "🌐 Syncing with our servers... Stay tuned! ⚡",
    "🛠️ Processing your awesome plan... Hang on tight! 🔥",
    "🎯 Finalizing your subscription... You're nearly set! ✨",
  ];

  const price =
    subscriptionPlans[selectedInterval]?.["Lite"]?.amount || 2500;

  const getReferralAmount = () => {
    const referralDiscounts = { "2R0873": 0.925, "6LS937": 0.85 };
    return Math.round(price * (referralDiscounts[referralCode] || 1));
  };
  const referralAmount = getReferralAmount();

  // Flutterwave config for recurring payment
  const handleFlutterwavePaymentRecurring = useFlutterwave({
    public_key: import.meta.env.VITE_TEST_FLW_PUBLIC_KEY,
    tx_ref: `tx-${Date.now()}-${userDetails?.creatorId}`,
    amount: price,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userDetails?.email,
      name: userDetails?.fullName,
    },
    customizations: {
      title: "Lite Subscription",
      description: `${selectedInterval} Lite plan subscription`,
    },
    payment_plan:
      subscriptionPlans[selectedInterval]?.["Lite"]?.code,
  });

  // One-time payment amount
  // Map subscription intervals to oneTimePaymentPlan keys
  const oneTimeIntervalMap = {
    Monthly: "Quarterly",
    Quarterly: "Quarterly",
    Biannually: "Half-Yearly",
    Yearly: "Annually",
  };
  const getOneTimeAmount = () => {
    const mappedInterval = oneTimeIntervalMap[selectedInterval] || "Quarterly";
    return (
      oneTimePaymentPlan[mappedInterval]?.["Lite"]?.amount || price * 3
    );
  };
  const oneTimeAmount = getOneTimeAmount();

  const handleFlutterwavePaymentOneTime = useFlutterwave({
    public_key: import.meta.env.VITE_TEST_FLW_PUBLIC_KEY,
    tx_ref: `tx-${Date.now()}-${userDetails?.creatorId}`,
    amount: oneTimeAmount,
    currency: "NGN",
    payment_options: "banktransfer,card,mobilemoney,ussd",
    customer: {
      email: userDetails?.email,
      fullName: userDetails?.fullName,
    },
    customizations: {
      title: "Lite One-Time Subscription",
      description: `One-time Lite plan subscription for ${
        oneTimeIntervalMap[selectedInterval] || "Quarterly"
      }`,
    },
  });

  const handleFlutterwavePaymentReferral = useFlutterwave({
    public_key: import.meta.env.VITE_TEST_FLW_PUBLIC_KEY,
    tx_ref: `tx-ref-${Date.now()}-${userDetails?.creatorId}`,
    amount: referralAmount,
    currency: "NGN",
    payment_options: "card",
    customer: {
      email: userDetails?.email,
      fullName: userDetails?.fullName,
    },
    customizations: {
      title: "Lite Referral One-Time Subscription",
      description:
        "One-time Lite plan subscription with referral discount",
    },
    meta: {
      discount: true,
      creatorId: userDetails?.creatorId,
      planType: "Lite",
      interval: selectedInterval,
      ecosystemDomain: userDetailEco?.ecosystemDomain || "UNKNOWN",
    },
  });

  const initiatePayment = (mode) => {
    const handler =
      mode === "recurring"
        ? handleFlutterwavePaymentRecurring
        : handleFlutterwavePaymentOneTime;
    handler({
      callback: (res) => {
        setLoading(true);
        closePaymentModal();
        verifyPayment(res);
      },
      onClose: () => showToast("Transaction canceled."),
    });
  };

  const initiateReferralPayment = () => {
    handleFlutterwavePaymentReferral({
      callback: (res) => {
        setLoading(true);
        closePaymentModal();
        verifyReferralPayment(res);
      },
      onClose: () => showToast("Transaction canceled."),
    });
  };

  const verifyPayment = (paymentResponse) => {
    let attempts = 0;
    const maxAttempts = 5;
    const intervalId = setInterval(async () => {
      attempts++;
      setLoadingMessage(
        loadingMessages[attempts - 1] || "Verifying..."
      );
      const authFetch = AxiosInterceptor(accessToken, refreshToken);
      try {
        const result = await authFetch.get(
          `${import.meta.env.VITE_API_URL}/check-subscription-status/${userDetails?.email}`
        );
        if (
          result.status === 201 &&
          result.data.message === "Subscription verified successfully"
        ) {
          clearInterval(intervalId);
          showToast(result.data.message);
          if (result.data.ecosystemDomain)
            dispatch(setEcosystemDomain(result.data.ecosystemDomain));
          if (result.data.planType)
            dispatch(setEcosystemPlan(result.data.planType));
          setLoading(false);
          navigate("/paid/auth/select-template");
        }
      } catch (error) {
        if (attempts >= maxAttempts) {
          clearInterval(intervalId);
          showToast(
            "Subscription verification timed out. Please try again."
          );
          setLoading(false);
        }
      }
    }, 10000);
  };

  const verifyReferralPayment = (paymentResponse) => {
    let attempts = 0;
    const maxAttempts = 5;
    const intervalId = setInterval(async () => {
      attempts++;
      setLoadingMessage(
        loadingMessages[attempts - 1] || "Verifying..."
      );
      const authFetch = AxiosInterceptor(accessToken, refreshToken);
      try {
        const result = await authFetch.get(
          `${import.meta.env.VITE_API_URL}/check-subscription-status/${userDetails?.email}`
        );
        if (
          result.status === 201 &&
          result.data.message === "Subscription verified successfully"
        ) {
          clearInterval(intervalId);
          showToast(result.data.message);
          if (result.data.ecosystemDomain)
            dispatch(setEcosystemDomain(result.data.ecosystemDomain));
          if (result.data.planType)
            dispatch(setEcosystemPlan(result.data.planType));
          sessionStorage.removeItem("referralCode");
          setLoading(false);
          navigate("/paid/auth/select-template");
        }
      } catch (error) {
        if (attempts >= maxAttempts) {
          clearInterval(intervalId);
          showToast(
            "Subscription verification timed out. Please try again."
          );
          setLoading(false);
        }
      }
    }, 10000);
  };

  const getEcosystem = async () => {
    try {
      const response = await api2.getBusinessInfo({
        creatorId: userDetails.creatorId,
        accessToken,
        refreshToken,
      });
      setUserDetailEco(response.data.getEcosystem);
    } catch {
      console.log("Could not get ecosystem info");
    }
  };

  useEffect(() => {
    getEcosystem();
  }, []);

  const handleGetStarted = () => {
    if (!userDetailEco?.ecosystemDomain)
      return showToast("Ecosystem details missing.");
    setIsModalOpen(true);
  };

  if (loading) return <LoadingPage message={loadingMessage} />;

  return (
    <PaidOnboardingLayout currentStep={5} rightImage={null}>
      <div className="w-full mx-auto px-4 sm:px-6 py-8">
        {/* Interval Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 flex-wrap justify-center gap-y-2">
            {intervals.map((period) => (
              <label
                key={period}
                className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer border transition-all ${
                  selectedInterval === period
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white border-gray-300 text-gray-600 hover:border-purple-300"
                }`}
              >
                <input
                  type="radio"
                  name="pricingInterval"
                  value={period}
                  checked={selectedInterval === period}
                  onChange={() => setSelectedInterval(period)}
                  className="hidden"
                />
                {period}
              </label>
            ))}
          </div>
        </div>

        {/* Single Lite Plan Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl border-2 border-purple-200 overflow-hidden shadow-lg">
            {/* Card Header */}
            <div className="px-6 pt-8 pb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Lite Plan
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Solopreneur with physical store and multiple staffs.
              </p>

              {/* Price */}
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  N{" "}
                  {referralCode
                    ? referralAmount.toLocaleString()
                    : price.toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm ml-2">
                  Per {selectedInterval === "Monthly" ? "Month" : selectedInterval === "Quarterly" ? "Quarter" : selectedInterval === "Biannually" ? "6 Months" : "Year"}
                </span>
              </div>
            </div>

            {/* Get Started Button */}
            <div className="px-6 pb-4">
              <button
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transition-all flex items-center justify-center gap-2"
                onClick={handleGetStarted}
              >
                Get Started
                <span className="text-lg">→</span>
              </button>
            </div>

            {/* Features */}
            <div className="px-6 pb-8">
              <p className="font-semibold text-gray-800 text-sm mb-3">
                What you get:
              </p>
              <ul className="space-y-3">
                {litePlanFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <FaCheck className="text-gray-500 mt-1 flex-shrink-0 text-xs" />
                    <span className="text-sm text-gray-700">
                      <strong>{feature.title}:</strong>{" "}
                      {feature.description}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-4 ml-6">
                And more feature to come
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Mode Modal */}
        <SubscriptionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={(mode) => {
            setIsModalOpen(false);
            if (referralCode) {
              initiateReferralPayment();
            } else {
              initiatePayment(mode);
            }
          }}
        />
      </div>
    </PaidOnboardingLayout>
  );
};

export default PaidSubscription;
