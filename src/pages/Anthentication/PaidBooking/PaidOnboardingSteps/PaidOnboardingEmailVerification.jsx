// pages/auth/PaidOnboardingEmailVerification.jsx
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import PaidOnboardingLayout from "./PaidOnboardingLayout";
import OTPImage from "../../../../assets/FreeBooking/otp-lock.png";
import { ButtonLongPurple } from "../../../../component/Buttons";
import { showToast } from "../../../../component/ShowToast";
import api from "../../../../api/authApis"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import mixpanel from "../../../../analytics/mixpanel";

// Validation schema
const schema = yup.object().shape({
  otp: yup
    .string()
    .required("Please enter the 6-digit code")
    .matches(/^\d{6}$/, "Code must be exactly 6 digits"),
});

const PaidOnboardingEmailVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const creatorEmail = useSelector((state) => state.auth.user?.email || "");
  const creatorPhoneNumber = useSelector(
    (state) => state.auth.user?.phoneNumber || ""
  );
  const userId = useSelector((state) => state.auth.user?.creatorId || "");

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Sync OTP array → hidden form field
  useEffect(() => {
    setValue("otp", otp.join(""));
  }, [otp, setValue]);

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer === 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle digit input
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace & navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextFocus = Math.min(pasted.length, 5);
    inputRefs.current[nextFocus]?.focus();
  };

  // Resend OTP
  const handleResend = async () => {
    setIsResending(true);
    try {
      const res = await api.creatorResendVerifyToken({
        email: creatorEmail,
        phoneNumber: creatorPhoneNumber,
      });
      showToast(res.data.message || "New code sent!", "success");
      setResendTimer(60);
    } catch (err) {
      showToast("Failed to resend code. Try again.", "error");
    } finally {
      setIsResending(false);
    }
  };

  // Submit OTP
  const onSubmit = async (data) => {
    setIsVerifying(true);
    try {
      const response = await api.creatorVerifyToken({
        email: creatorEmail,
        OTP: data.otp,
      });

      showToast(
        response.data.message || "Email verified successfully!",
        "success"
      );

      // Mixpanel tracking
      mixpanel.track("Registration", {
        action: "submit",
        step: "verify_email",
        step_index: 2,
        step_label: "Verify Email (OTP)",
      });

      // Identify user in Mixpanel
      if (userId) {
        mixpanel.alias(userId); // Call ONCE per user
        mixpanel.identify(userId);
        mixpanel.people.set({ $email: creatorEmail });
      }

      // Navigate to next step
      navigate("/Paid/auth/business-identity");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid or expired code";
      showToast(msg, "error");

      mixpanel.track("Registration", {
        action: "error",
        step: "verify_email",
        error_fields: ["otp"],
        error_message: msg,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <PaidOnboardingLayout currentStep={2} rightImage={OTPImage}>
      <div className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
          OTP Verification
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-10 max-w-xs mx-auto">
          We’ve sent a 6-digit code to <br />
          <span className="font-semibold text-purple-700">
            {creatorEmail || "your email"}
          </span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* OTP Boxes */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-10">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-50 border-2 rounded-2xl text-2xl sm:text-3xl font-bold text-center transition-all focus:outline-none focus:border-purple-600 focus:bg-white ${
                  errors.otp && isSubmitted
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                inputMode="numeric"
                autoComplete="one-time-code"
              />
            ))}
          </div>

          {/* Hidden field for react-hook-form */}
          <input type="hidden" {...{ name: "otp", ref: () => {} }} />

          {/* Error message */}
          {errors.otp && (
            <p className="text-red-500 text-sm mb-6">{errors.otp.message}</p>
          )}

          {/* Resend */}
          <div className="mb-10">
            <p className="text-sm text-gray-500 mb-2">
              Didn’t receive the code?
            </p>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendTimer > 0 || isResending}
              className="text-purple-600 font-medium text-sm sm:text-base underline hover:text-purple-700 disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed transition"
            >
              Resend Code
              {resendTimer > 0 && (
                <span className="font-mono ml-1">
                  in 0:{resendTimer.toString().padStart(2, "0")}
                </span>
              )}
            </button>
          </div>

          {/* Submit Button */}
          <ButtonLongPurple
            type="submit"
            width="w-full max-w-xs"
            disabled={!isComplete || isVerifying}
            className="bg-purple-600 h-14 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            {isVerifying ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                  />
                </svg>
                Verifying...
              </div>
            ) : (
              "Verify & Continue"
            )}
          </ButtonLongPurple>
        </form>
      </div>
    </PaidOnboardingLayout>
  );
};

export default PaidOnboardingEmailVerification;
