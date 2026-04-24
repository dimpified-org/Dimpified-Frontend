// pages/auth/PaidOnboardingPersonalInfo.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import countryCodes from "../../../../data/countryCodes.json";
import PaidOnboardingLayout from "./PaidOnboardingLayout";
import RightImage from "../../../../assets/FreeBooking/FreeAuthImage.png";
import { LongInputWithPlaceholder } from "../../../../component/Inputs";
import { ButtonLongPurple } from "../../../../component/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { newCreatorRegister } from "../../../../features/authentication"; // Adjust path as needed
import { showToast } from "../../../../component/ShowToast"; // Adjust path
import { useNavigate, useSearchParams } from "react-router-dom";
import mixpanel from "../../../../analytics/mixpanel"; // Optional

// Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  countryCode: yup.string().required("Country code is required"),
  phone: yup
    .string()
    .matches(/^\d{1,14}$/, "Invalid phone number")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  referralId: yup
    .string()
    .test(
      "referral-length",
      "Referral code must be at least 6 characters",
      (value) => !value || value.trim().length >= 6
    ),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms")
    .required(),
  receiveMarketing: yup.boolean(),
});

const PaidOnboardingPersonalInfo = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+234",
      phone: "",
      password: "",
      confirmPassword: "",
      referralId: "",
      agreeTerms: false,
      receiveMarketing: true,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();

  const countryCode = watch("countryCode");

  // Auto-set default country code
  useEffect(() => {
    setValue("countryCode", "+234");
  }, [setValue]);

  // Capture referral from URL
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      sessionStorage.setItem("referralCode", ref);
      setValue("referralId", ref);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data) => {
    // Save referral code if entered
    if (data.referralId) {
      sessionStorage.setItem("referralCode", data.referralId);
    }

    // Mixpanel tracking (optional)
    mixpanel.track("Registration", {
      action: "submit",
      step: "personal_info",
      step_index: 1,
      step_label: "Personal Information",
    });

    try {
      const resultAction = await dispatch(
        newCreatorRegister({
          email: data.email,
          password: data.password,
          phoneNumber: `${data.countryCode}${data.phone}`,
          firstName: data.firstName,
          lastName: data.lastName,
          acceptTerms: data.agreeTerms,
          acceptMarketing: data.receiveMarketing,
          refCode:
            data.referralId ||
            sessionStorage.getItem("referralCode") ||
            null,
        })
      );

      if (newCreatorRegister.fulfilled.match(resultAction)) {
        const userStep = resultAction.payload.user?.step;

        showToast("Account created successfully!", "success");
        // Navigate based on onboarding step
        if (userStep === 1) {
          navigate("/Paid/auth/email-verification");
        } else if (userStep === 2) {
          navigate("/Paid/auth/business-identity");
        } else if (userStep === 3) {
          navigate("/paid/auth/subcription");
        } else if (userStep === 7) {
          navigate("/creator/dashboard/overview");
        } else {
          navigate("/Paid/auth/personal-Information");
        }
      }

      if (newCreatorRegister.rejected.match(resultAction)) {
        const errorMsg =
          resultAction.payload || "Registration failed. Please try again.";
        showToast(errorMsg, "error");
      }
    } catch (err) {
      showToast("An unexpected error occurred. Please try again.", "error");
    }
  };

  const countryOptions = countryCodes.map((country) => ({
    value: country.phoneCode,
    label: (
      <div className="flex items-center">
        <img
          src={country.url}
          alt={country.country}
          className="w-6 h-4 mr-3 object-cover rounded-sm"
        />
        <span className="text-sm">
          {country.country} ({country.phoneCode})
        </span>
      </div>
    ),
  }));

  const selectedCountry = countryOptions.find(
    (opt) => opt.value === countryCode
  );

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 56,
      borderRadius: "12px",
      borderColor: errors.countryCode ? "#6B7280" : "#6B7280",
      boxShadow: "none",
      "&:hover": { borderColor: errors.countryCode ? "#ef4444" : "#9979d1" },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "12px",
      marginTop: 4,
      zIndex: 50,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#9979d1"
        : state.isFocused
        ? "#f3e8ff"
        : "white",
      color: state.isSelected ? "white" : "black",
    }),
  };

  return (
    <PaidOnboardingLayout
      currentStep={1}
      rightImage={RightImage}
      backDisabled={false}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left mb-8 text-gray-900">
          Personal Information
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6 sm:space-y-8"
        >
          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                First Name *
              </label>
              <LongInputWithPlaceholder
                placeholder="Emmanuel"
                type="text"
                {...register("firstName")}
                className="h-14 rounded-xl text-base"
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Last Name *
              </label>
              <LongInputWithPlaceholder
                placeholder="Kelvin"
                type="text"
                {...register("lastName")}
                className="h-14 rounded-xl text-base"
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Email *
            </label>
            <LongInputWithPlaceholder
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="h-14 rounded-xl text-base"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Phone Number *
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full sm:w-60">
                <Select
                  value={selectedCountry}
                  onChange={(opt) =>
                    setValue("countryCode", opt.value, { shouldValidate: true })
                  }
                  options={countryOptions}
                  styles={customStyles}
                  isSearchable
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  placeholder="Code"
                />
              </div>
              <div className="flex-1">
                <LongInputWithPlaceholder
                  placeholder="7053953692"
                  {...register("phone")}
                  type="tel"
                  inputMode="numeric"
                  className="h-14 rounded-xl text-base"
                  aria-invalid={errors.phone ? "true" : "false"}
                />
              </div>
            </div>
            {(errors.countryCode || errors.phone) && (
              <p className="text-red-500 text-xs mt-1">
                {errors.countryCode?.message || errors.phone?.message}
              </p>
            )}
          </div>

          {/* Password & Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Password *
            </label>
            <LongInputWithPlaceholder
              type="password"
              placeholder="********"
              {...register("password")}
              className="h-14 rounded-xl text-base"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Confirm Password *
            </label>
            <LongInputWithPlaceholder
              type="password"
              placeholder="********"
              {...register("confirmPassword")}
              className="h-14 rounded-xl text-base"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Referral Code */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Referral Code <span className="text-gray-500">(Optional)</span>
            </label>
            <LongInputWithPlaceholder
              placeholder="Enter referral code"
              {...register("referralId")}
              className="h-14 rounded-xl text-base"
            />
          </div>

          {/* Terms & Marketing */}
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("agreeTerms")}
                className="mt-1 w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">
                I agree to the{" "}
                <span className="text-[#9979d1] font-medium">
                  General Terms of Use, Merchant Terms of Use & Privacy Policy
                </span>{" "}
                of Dimpified.
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-red-500 text-xs -mt-2">
                {errors.agreeTerms.message}
              </p>
            )}

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("receiveMarketing")}
                className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">
                I’d like to receive marketing tips and updates from Dimpified
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-6">
            <ButtonLongPurple
              type="submit"
              width="w-full"
              disabled={isSubmitting || isLoading}
              className="bg-purple-600 h-14 text-lg font-semibold rounded-xl"
            >
              {isSubmitting || isLoading ? "Creating Account..." : "Continue"}
            </ButtonLongPurple>
          </div>
        </form>
      </div>
    </PaidOnboardingLayout>
  );
};

export default PaidOnboardingPersonalInfo;
