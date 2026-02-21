import { useForm } from "react-hook-form";
import { useState } from "react";
import { showToast } from "../../../component/ShowToast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LabelImportant } from "../../../component/Label";
import { ButtonLongPurple } from "../../../component/Buttons";
import { LoadingSmall } from "../../../component/LoadingSpinner";
import api from "../../../api/Afiliate";
import { Heading, Text } from "../../../component/Text";
import { LongInputWithPlaceholder } from "../../../component/Inputs";
import { AgreementModal } from "./AgreementModal";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false); // Track if user has agreed after reading
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Watch the agreement checkbox value
  const agreementChecked = watch("agreement", false);

  // Handle agreement checkbox click
  const handleAgreementClick = (e) => {
    const isChecked = e.target.checked;
    setValue("agreement", isChecked);
    
    if (isChecked && !hasAgreed) {
      // If checking without having agreed yet, show the modal
      setShowAgreement(true);
    } else if (!isChecked) {
      // If unchecking, reset agreement status
      setHasAgreed(false);
    }
  };

  // Handle agreement modal close
  const handleAgreementClose = (userAgreed) => {
    setShowAgreement(false);
    
    if (userAgreed) {
      // User clicked "I understand" - mark as agreed
      setHasAgreed(true);
      setValue("agreement", true);
    } else {
      // User closed without agreeing - uncheck the box
      setHasAgreed(false);
      setValue("agreement", false);
    }
  };

  // Handle agreement link click (when user clicks the text)
  const handleAgreementLinkClick = () => {
    setShowAgreement(true);
  };

  const onSubmit = async (data) => {
    // Validate that user has actually agreed after reading
    if (!hasAgreed || !data.agreement) {
      showToast("Please read and agree to the Partner Agreement before registering.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.affiliateRegister({
        userName: data.username,
        password: data.password,
        email: data.email,
        phoneNumber: data.phoneNumber,
        agreement: hasAgreed, // Send the actual agreement status
      });

      if (response.status === 201) {
        showToast(response.data.message);
        navigate("/registration-success", { state: { email: data.email } });
      }
    } catch (error) {
      if (error.response?.data?.message) {
        showToast(error.response.data.message);
      } else {
        showToast(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-4 bg-white shadow-md rounded">
      <AgreementModal
        isOpen={showAgreement}
        onClose={handleAgreementClose}
      />
      
      <Heading
        level="2"
        className="text-2xl font-semibold mb-4 font-body"
        size=""
        color="black"
        weight="font-medium"
        font="font-body"
        lineHeight="leading-1"
        htmlFor="bankSelect"
      >
        Create your Partner Account
      </Heading>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <LabelImportant htmlFor="username">Username</LabelImportant>
          <LongInputWithPlaceholder
            type="text"
            {...register("username", { required: "Username is required" })}
            placeholder="Enter your username"
            className={`w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-500 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <Text className="text-red-500 text-sm">
              {errors.username.message}
            </Text>
          )}
        </div>
        
        <div className="mb-4">
          <LabelImportant htmlFor="phoneNumber">Phone Number</LabelImportant>
          <LongInputWithPlaceholder
            type="number"
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
            placeholder="Enter your phoneNumber"
            className={`w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-500 ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phoneNumber && (
            <Text className="text-red-500 text-sm">
              {errors.phoneNumber.message}
            </Text>
          )}
        </div>

        <div className="mb-4">
          <LabelImportant htmlFor="email">Email</LabelImportant>
          <LongInputWithPlaceholder
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Enter your email"
            className={`w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm">{errors.email.message}</Text>
          )}
        </div>

        <div className="mb-4">
          <LabelImportant htmlFor="password">Password</LabelImportant>
          <div className="relative">
            <LongInputWithPlaceholder
              type={showNewPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className={`w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mb-4 flex text-sm items-center justify-start space-x-2">
          <input
            type="checkbox"
            id="agreement"
            className="accent-primary3"
            checked={agreementChecked}
            onChange={handleAgreementClick}
          />
          <div className="flex items-center">
            <span>I agree to the </span>
            <button
              type="button"
              onClick={handleAgreementLinkClick}
              className="text-primary3 hover:underline cursor-pointer ml-1"
            >
              Dimpified Independent Sales Partner Agreement
            </button>
          </div>
        </div>
        
        {!hasAgreed && agreementChecked && (
          <Text className="text-amber-600 text-sm mb-2">
            Please read the agreement above by clicking the link.
          </Text>
        )}
        
        {errors.agreement && (
          <Text className="text-red-500 text-sm">
            You must agree before registering.
          </Text>
        )}

        <ButtonLongPurple
          type="submit"
          className="w-full bg-primary3 text-white py-2 rounded hover:bg-primary4 transition duration-300"
          disabled={loading}
        >
          {loading ? (
            <Text className="flex ml-2 items-center justify-center">
              <LoadingSmall /> Registering...
            </Text>
          ) : (
            "Register"
          )}
        </ButtonLongPurple>
      </form>
    </div>
  );
};

export default Register;