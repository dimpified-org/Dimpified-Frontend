import { Link, Globe } from "lucide-react";
import LoginImage from "../../../assets/NewAuthImage/Step134.png";
import Logo from "../../../assets/NewAuthImage/NewLogo.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import {
  creatorLogin,
  creatorLoginWithGoogle,
} from "../../../features/authentication";
import { showToast } from "../../../component/ShowToast";
import { setEcosystemDomain } from "../../../features/ecosystemDomain";
import { setEcosystemPlan } from "../../../features/ecosystemPlan";
import { setEcosystemStatus } from "../../../features/ecosystemStatus";
import { LongInputWithPlaceholder } from "../../../component/Inputs";
import { ButtonLongPurple } from "../../../component/Buttons";
import axios from "axios";

const GoogleLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.20-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.31 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.28 7.68 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.68 1 4 3.72 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      fill="#EA4335"
    />
  </svg>
);

// Get refcode from URL if it exists
const getRefCodeFromURL = () => {
  const params = new URLSearchParams(location.search);
  // Try "ref" first (new format), then "refcode" (old format)
  return params.get("ref") || params.get("refcode") || null;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Helper function to set axios auth headers
const setAuthHeaders = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Also update the api client if it exists
    try {
      const authApis = require("../../../api/authApis");
      if (authApis.default && authApis.default.apiClient) {
        authApis.default.apiClient.defaults.headers.common["Authorization"] =
          `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("Could not update api client headers:", error);
    }
  }
};

export default function UserLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);

  // Get refcode from URL if it exists
  const refcode = getRefCodeFromURL();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleNavigation = (step, plan) => {
    // Treat undefined/null plan as "free"
    const isFreePlan = !plan || plan?.toLowerCase() === "free";

    switch (step) {
      case 1:
        const step1Path = isFreePlan
          ? "/free/auth/email-verification"
          : "/auth/email-verification";

        navigate(step1Path);
        break;

      case 2:
        const step2Path = isFreePlan
          ? "/free/auth/business-identity"
          : "/auth/business-type";

        navigate(step2Path);
        break;

      case 3:
        const step3Path = isFreePlan
          ? "/free/auth/availability"
          : "/auth/business-info";

        navigate(step3Path);
        break;

      case 4:
        const step4Path = isFreePlan
          ? "/free/auth/service-payment"
          : "/auth/select-template";

        navigate(step3Path);
        break;
      case 5:
        navigate("/auth/select-template");
        break;

      case 6:
        navigate("/auth/edit-template");
        break;

      case 7:
        const dashboardPath = isFreePlan
          ? "/free/creator/dashboard/overview"
          : "/creator/dashboard/overview";

        navigate(dashboardPath);
        break;

      default:
        navigate("/auth/personal-information");
        break;
    }
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        creatorLogin({
          email: data.email,
          password: data.password,
        }),
      );
      console.log("Login resultAction:", resultAction);

      if (creatorLogin.rejected.match(resultAction)) {
        const errorPayload = resultAction.payload;
        showToast(errorPayload);
      } else if (creatorLogin.fulfilled.match(resultAction)) {
        showToast(resultAction.payload.message);

        if (resultAction.payload.user.ecosystemDomain) {
          dispatch(
            setEcosystemDomain(resultAction.payload.user.ecosystemDomain),
          );
        }
        if (resultAction.payload.user.plan) {
          dispatch(setEcosystemPlan(resultAction.payload.user.plan));
        } else {
          // Handle undefined plan by setting as "free"
          dispatch(setEcosystemPlan("free"));
        }
        if (resultAction.payload.user.status) {
          dispatch(setEcosystemStatus(resultAction.payload.user.status));
        }
        if (resultAction.payload.user.subCategory) {
          sessionStorage.setItem(
            "subCategory",
            resultAction.payload.user.subCategory,
          );
        }

        handleNavigation(
          resultAction.payload.user.step,
          resultAction.payload.user.plan || "free", // Pass "free" if plan is undefined
        );
      }
    } catch (error) {
      showToast("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("=== Google Auth Debug ===");
    console.log("Full Google response:", credentialResponse);

    // Debug token types
    if (credentialResponse.credential) {
      console.log("✓ ID Token (credential) received");
      console.log(
        "ID Token starts with eyJ:",
        credentialResponse.credential.startsWith("eyJ"),
      );
      console.log(
        "ID Token segments:",
        credentialResponse.credential.split(".").length,
      );
    }

    // Always use the ID token (credential) for backend authentication
    const idToken = credentialResponse.credential;
    localStorage.setItem("googleCredential", idToken);

    if (!idToken) {
      console.error("No ID token (credential) received from Google");
      showToast("Google authentication failed: No ID token received", "error");
      return;
    }

    console.log("Sending ID token to backend...");

    try {
      const resultAction = await dispatch(
        creatorLoginWithGoogle({
          token: idToken, // Send ID token (JWT)
          refcode: refcode || null,
        }),
      );

      if (creatorLoginWithGoogle.rejected.match(resultAction)) {
        const errorPayload = resultAction.payload;
        const errorMessage =
          errorPayload?.message || errorPayload || "Google login failed";

        console.error("Google auth rejected:", errorMessage);

        // Handle timeout/connection errors
        if (
          errorMessage.includes("timeout") ||
          errorMessage.includes("cannot connect")
        ) {
          showToast(
            "Connection issue. Please try again or use email login.",
            "error",
          );
          return;
        }

        // Handle token validation errors
        if (
          errorMessage.includes("Wrong number of segments") ||
          errorMessage.includes("Invalid token") ||
          errorMessage.includes("JWT")
        ) {
          showToast(
            "Google authentication failed: Invalid token format",
            "error",
          );
          return;
        }

        // Check if user doesn't exist
        if (
          errorMessage.toLowerCase().includes("not found") ||
          errorMessage.toLowerCase().includes("user not found") ||
          errorMessage.toLowerCase().includes("no user found")
        ) {
          showToast("Account not found. Please sign up first.", "error");

          // Store Google credential for signup flow
          localStorage.setItem("googleCredential", idToken);
          localStorage.setItem(
            "googleUserData",
            JSON.stringify({
              token: idToken,
              timestamp: new Date().toISOString(),
            }),
          );

          if (refcode) {
            localStorage.setItem("pendingRefcode", refcode);
          }

          // Navigate to signup page
          if (refcode) {
            navigate(`/auth/landing?refcode=${refcode}&googleAuth=true`);
          } else {
            navigate("/auth/landing?googleAuth=true");
          }
          return;
        }

        showToast(errorMessage, "error");
      } else if (creatorLoginWithGoogle.fulfilled.match(resultAction)) {
        const responseData = resultAction.payload;
        console.log("✓ Backend Google auth success:", responseData);

        // Validate response structure
        if (!responseData) {
          showToast("Invalid response from server", "error");
          return;
        }

        // Store tokens and set headers HERE in the component
        const accessToken = responseData.accessToken || responseData.token;
        const refreshToken = responseData.refreshToken;

        if (accessToken) {
          console.log("Storing access token...");
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("jwtToken", accessToken);

          // Set axios headers
          setAuthHeaders(accessToken);
        }

        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }

        // Check if this is a new user or existing user
        const isNewUser =
          responseData.isNewUser || responseData.isNewUser === true;
        const userData = responseData.user || responseData;
        const message =
          responseData.message || (isNewUser ? "Welcome!" : "Login successful");

        showToast(message, "success");

        // Set user data in Redux
        if (userData.ecosystemDomain) {
          dispatch(setEcosystemDomain(userData.ecosystemDomain));
        }

        // Set plan (default to 'free' if undefined)
        const userPlan = userData.plan || "free";
        dispatch(setEcosystemPlan(userPlan));

        if (userData.status) {
          dispatch(setEcosystemStatus(userData.status));
        }

        if (userData.subCategory) {
          sessionStorage.setItem("subCategory", userData.subCategory);
        }

        // Navigate based on user's current step
        if (isNewUser) {
          // New user - navigate to onboarding
          console.log("New user detected, navigating to onboarding");
          showToast("Welcome! Please complete your profile.", "success");
          navigate("/auth/email-verification");
        } else {
          // Existing user - navigate based on their step
          const userStep = userData.step || 1;
          console.log(`Existing user, step ${userStep}, plan ${userPlan}`);
          handleNavigation(userStep, userPlan);
        }
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      showToast("An unexpected error occurred during Google login.", "error");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
    showToast("Google Sign-In Failed. Please try again.", "error");
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative stars */}
      <div className="absolute top-[40%] left-[-50px] w-32 h-32 md:w-48 md:h-48">
        <svg
          className="w-full h-full opacity-80"
          viewBox="0 0 100 196"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-16.9349 12.5146C-11.8105 -4.1717 11.8105 -4.1717 16.9349 12.5146C20.3869 23.7549 33.6304 28.5751 43.4998 22.1835C58.1511 12.6949 76.2459 27.8782 69.4456 43.9546C64.8649 54.784 71.9116 66.9893 83.5805 68.4369C100.903 70.586 105.005 93.8481 89.462 101.792C78.9919 107.144 76.5446 121.023 84.553 129.633C96.4415 142.414 84.631 162.87 67.618 158.965C56.1577 156.334 45.3615 165.393 45.9622 177.136C46.8538 194.569 24.6573 202.648 14.1349 188.72C7.04672 179.339 -7.04674 179.339 -14.1349 188.72C-24.6573 202.648 -46.8538 194.569 -45.9622 177.136C-45.3615 165.393 -56.1577 156.334 -67.618 158.965C-84.631 162.87 -96.4415 142.414 -84.553 129.632C-76.5446 121.023 -78.9919 107.144 -89.462 101.792C-105.005 93.8481 -100.903 70.586 -83.5805 68.4369C-71.9116 66.9893 -64.8649 54.784 -69.4456 43.9546C-76.2459 27.8782 -58.1511 12.6949 -43.4998 22.1835C-33.6304 28.5751 -20.3869 23.7549 -16.9349 12.5146Z"
            fill="#9F68FE"
          />
        </svg>
      </div>

      <div className="absolute top-[-20px] right-2/4 w-24 h-24 md:w-32 md:h-32 transform translate-x-12">
        <svg
          className="w-full h-full opacity-90"
          viewBox="0 0 203 98"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M83.9168 -89.6991C89.1488 -106.736 113.265 -106.736 118.497 -89.6991C122.022 -78.223 135.543 -73.3017 145.619 -79.8274C160.578 -89.5151 179.052 -74.0132 172.11 -57.5995C167.433 -46.543 174.627 -34.0816 186.541 -32.6036C204.227 -30.4095 208.415 -6.65933 192.546 1.45146C181.856 6.91505 179.357 21.0856 187.534 29.8758C199.672 42.925 187.614 63.8105 170.244 59.8233C158.543 57.1375 147.52 66.3866 148.133 78.376C149.044 96.1744 126.382 104.423 115.638 90.2032C108.402 80.6246 94.0125 80.6246 86.7756 90.2032C76.0324 104.423 53.3703 96.1744 54.2806 78.376C54.8939 66.3866 43.8712 57.1375 32.1704 59.8233C14.8005 63.8105 2.74224 42.925 14.8802 29.8758C23.0566 21.0856 20.558 6.91505 9.86825 1.45146C-6.00081 -6.65933 -1.81302 -30.4095 15.8731 -32.6036C27.7868 -34.0816 34.9813 -46.543 30.3045 -57.5995C23.3616 -74.0132 41.836 -89.515 56.7946 -79.8274C66.8711 -73.3017 80.3925 -78.223 83.9168 -89.6991Z"
            fill="#FDC700"
          />
        </svg>
      </div>

      <div className="w-full gap-8 lg:gap-12 flex flex-col lg:flex-row items-center mx-auto">
        {/* Left Content Section */}
        <div className="w-full lg:w-2/3 px-4 py-8 md:py-12 lg:py-16 mx-auto">
          <div className="flex items-center gap-2 top-0 left-0 ml-4 sm:ml-8 md:ml-16 lg:ml-28 mb-8">
            <RouterLink to="/">
              <img
                src={Logo}
                alt="Dimipified Logo"
                className="h-6 w-auto object-contain"
              />
            </RouterLink>
          </div>

          <div className="relative z-10 space-y-6 md:space-y-8 lg:space-y-10 mx-auto px-4 py-8 md:py-12 lg:py-16 items-center justify-center flex flex-col">
            <div className="w-full max-w-sm ">
              {/* Main Heading */}
              <div>
                <h1 className="text-2xl md:text-3xl text-center lg:text-4xl font-bold text-gray-900 leading-tight mb-4 lg:mb-8">
                  <span className="text-purple-600"> Hola!</span> Welcome.
                </h1>
              </div>

              {/* Subheading */}
              <p className="text-gray-600 text-sm md:text-base lg:text-lg text-center max-w-lg mb-6 lg:mb-8">
                Login to your account
              </p>

              {/* Login Form */}
              <div className="space-y-4 w-full">
                {/* Google Login Button */}
                <div className="w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                    useOneTap={false}
                    shape="rectangular"
                    size="large"
                    width="100%"
                    text="signin_with"
                    theme="outline"
                    logo_alignment="center"
                    locale="en"
                    context="signin"
                    ux_mode="popup"
                    render={(renderProps) => (
                      <button
                        type="button"
                        onClick={() => {
                          console.log("Google button clicked");
                          renderProps.onClick();
                        }}
                        disabled={renderProps.disabled || isLoading}
                        className="w-full h-12 font-bold rounded-lg border-2 border-gray-400 p-2 flex items-center justify-center mb-4 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin h-4 w-4 mr-2"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                              ></path>
                            </svg>
                            Processing...
                          </div>
                        ) : (
                          <>
                            <GoogleLogo />
                            Continue with Google
                          </>
                        )}
                      </button>
                    )}
                  />
                </div>

                <div className="flex gap-3 w-full items-center my-4">
                  <hr className="flex-1 bg-[#E5E5E5]" />
                  <p className="text-center text-gray-500">Or</p>
                  <hr className="flex-1 bg-[#E5E5E5]" />
                </div>

                <p className="text-gray-500 mb-2 text-center">
                  Please enter your details
                </p>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 w-full"
                >
                  <div className="w-full">
                    <label htmlFor="email" className="text-black mb-1 block">
                      Email *
                    </label>
                    <LongInputWithPlaceholder
                      id="email"
                      placeholder="johndoe@mail.com"
                      {...register("email")}
                      className="rounded-xl w-full border-2 border-gray-200 focus:border-purple-300 focus:ring-0 px-4 py-3 text-base"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <label htmlFor="password" className="text-black mb-1 block">
                      Password *
                    </label>
                    <LongInputWithPlaceholder
                      id="password"
                      placeholder="••••••••"
                      type="password"
                      {...register("password")}
                      className="rounded-xl w-full border-2 border-gray-200 focus:border-purple-300 focus:ring-0 px-4 py-3 text-base"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end items-center mb-6">
                    <RouterLink
                      to="/forgot-password"
                      className="text-sm text-purple-600 hover:underline"
                    >
                      Forgot Password?
                    </RouterLink>
                  </div>

                  <ButtonLongPurple
                    type="submit"
                    width="w-full"
                    disabled={isLoading}
                    className="bg-purple-600 h-14 text-lg font-semibold rounded-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                          ></path>
                        </svg>
                        Logging In...
                      </div>
                    ) : (
                      "Continue"
                    )}
                  </ButtonLongPurple>
                </form>

                <p className="text-center text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <RouterLink
                    to="/auth/landing"
                    className="text-purple-600 font-medium"
                  >
                    Sign Up here
                  </RouterLink>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Section - Hidden on mobile and tablet */}
        <div className="hidden lg:block relative w-1/3">
          <div className="overflow-hidden shadow-2xl">
            <img
              src={LoginImage}
              alt="Login illustration"
              className="w-full h-screen object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
