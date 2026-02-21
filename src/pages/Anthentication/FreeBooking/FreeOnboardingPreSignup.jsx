import { Mail } from "lucide-react";
import FreeOnboardingImage from "../../../assets/FreeBooking/FreeAuthImage.png";
import Logo from "../../../assets/NewAuthImage/NewLogo.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { creatorLoginWithGoogle } from "../../../features/authentication";
import { showToast } from "../../../component/ShowToast";
import { setEcosystemDomain } from "../../../features/ecosystemDomain";
import { setEcosystemPlan } from "../../../features/ecosystemPlan";
import { setEcosystemStatus } from "../../../features/ecosystemStatus";
import axios from "axios";

export default function FreeOnboardingPreSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  // Helper function to set auth headers
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

  // Get refcode from URL if it exists
  const getRefCodeFromURL = () => {
    const params = new URLSearchParams(location.search);
    // Try "ref" first (new format), then "refcode" (old format)
    return params.get("ref") || params.get("refcode") || null;
  };

  // Navigation function - same as in login page
  const handleNavigation = (step, plan) => {
    // Treat undefined/null plan as "free"
    const isFreePlan = !plan || plan?.toLowerCase() === "free";
    console.log(
      `handleNavigation called: step=${step}, plan=${plan}, isFreePlan=${isFreePlan}`,
    );

    switch (parseInt(step)) {
      case 1:
        const step1Path = isFreePlan
          ? "/free/auth/email-verification"
          : "/auth/email-verification";
        console.log(`Navigating to step 1: ${step1Path}`);
        navigate(step1Path);
        break;

      case 2:
        const step2Path = isFreePlan
          ? "/free/auth/business-identity"
          : "/auth/business-type";
        console.log(`Navigating to step 2: ${step2Path}`);
        navigate(step2Path);
        break;

      case 3:
        const step3Path = isFreePlan
          ? "/free/auth/availability"
          : "/auth/business-info";
        console.log(`Navigating to step 3: ${step3Path}`);
        navigate(step3Path);
        break;

      case 4:
        const step4Path = isFreePlan
          ? "/free/auth/service-payment"
          : "/auth/select-template";
        console.log(`Navigating to step 4: ${step4Path}`);
        navigate(step4Path);
        break;
      case 5:
        console.log("Navigating to step 5: /auth/select-template");
        navigate("/auth/select-template");
        break;

      case 6:
        console.log("Navigating to step 6: /auth/edit-template");
        navigate("/auth/edit-template");
        break;

      case 7:
        const dashboardPath = isFreePlan
          ? "/free/creator/dashboard/overview"
          : "/creator/dashboard/overview";
        console.log(`Navigating to dashboard: ${dashboardPath}`);
        navigate(dashboardPath);
        break;

      default:
        console.log(
          `Default navigation for step ${step}: /free/auth/personal-information`,
        );
        // For signup flow, default to personal information
        navigate("/free/auth/personal-information");
        break;
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("=== Google Signup Debug ===");
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
      console.log(
        "ID Token (first 50 chars):",
        credentialResponse.credential.substring(0, 50) + "...",
      );
    }

    // Always use the ID token (credential) for backend authentication
    const idToken = credentialResponse.credential;
    const refcode = getRefCodeFromURL();

    if (!idToken) {
      console.error("No ID token (credential) received from Google");
      showToast("Google authentication failed: No ID token received", "error");
      return;
    }

    console.log("Sending ID token to backend for signup...");

    try {
      const resultAction = await dispatch(
        creatorLoginWithGoogle({
          token: idToken, // Send ID token (JWT)
          refcode: refcode,
        }),
      );

      if (creatorLoginWithGoogle.rejected.match(resultAction)) {
        const errorPayload = resultAction.payload;
        const errorMessage =
          errorPayload?.message || errorPayload || "Google signup failed";

        console.error("Google signup rejected:", errorMessage);

        // Handle timeout/connection errors
        if (
          errorMessage.includes("timeout") ||
          errorMessage.includes("cannot connect")
        ) {
          showToast(
            "Connection issue. Please try again or use email signup.",
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

        // If user already exists, redirect to login
        if (
          errorMessage.toLowerCase().includes("already exists") ||
          errorMessage.toLowerCase().includes("user exists") ||
          errorMessage.toLowerCase().includes("account exists") ||
          errorMessage.toLowerCase().includes("not found") // Sometimes "not found" means user exists but password is wrong
        ) {
          showToast("Account already exists. Please login instead.", "error");

          // Store Google credential for login flow - IMPORTANT FOR FUTURE API CALLS
          console.log("Storing Google ID token for future login...");
          localStorage.setItem("googleCredential", idToken);
          localStorage.setItem("googleIdToken", idToken);
          sessionStorage.setItem("googleIdToken", idToken);

          localStorage.setItem(
            "googleUserData",
            JSON.stringify({
              token: idToken,
              timestamp: new Date().toISOString(),
            }),
          );

          // Navigate to login page
          if (refcode) {
            navigate(`/auth/login?refcode=${refcode}&googleAuth=true`);
          } else {
            navigate("/auth/login?googleAuth=true");
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

        // Store tokens and set headers
        const accessToken = responseData.accessToken || responseData.token;
        const refreshToken = responseData.refreshToken;

        if (accessToken) {
          console.log("Storing access token...");
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("jwtToken", accessToken);

          // CRITICAL: Store the Google ID token for future API calls
          console.log("Storing Google ID token for future API calls...");
          localStorage.setItem("googleIdToken", idToken);
          localStorage.setItem("googleCredential", idToken);
          sessionStorage.setItem("googleIdToken", idToken);

          console.log("Google ID token stored successfully");
          console.log(
            "JWT token stored for authentication:",
            accessToken.substring(0, 30) + "...",
          );

          // Set axios headers
          setAuthHeaders(accessToken);
        }

        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }

        // Store user ID for future API calls
        if (responseData.user?.id) {
          localStorage.setItem("userId", responseData.user.id.toString());
          console.log("User ID stored:", responseData.user.id);
        }

        // Check if this is a new user or existing user
        const isNewUser =
          responseData.isNewUser || responseData.isNewUser === true;
        const userData = responseData.user || responseData;
        const message =
          responseData.message ||
          (isNewUser
            ? "Welcome! Account created successfully."
            : "Welcome back!");

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

        // Debug: Show what tokens are stored
        console.log("=== TOKEN STORAGE VERIFICATION ===");
        console.log(
          "googleIdToken stored:",
          localStorage.getItem("googleIdToken") ? "✅" : "❌",
        );
        console.log(
          "googleCredential stored:",
          localStorage.getItem("googleCredential") ? "✅" : "❌",
        );
        console.log(
          "accessToken stored:",
          localStorage.getItem("accessToken") ? "✅" : "❌",
        );
        console.log(
          "jwtToken stored:",
          localStorage.getItem("jwtToken") ? "✅" : "❌",
        );
        console.log(
          "Google token (first 30 chars):",
          localStorage.getItem("googleIdToken")?.substring(0, 30) + "...",
        );

        // Handle navigation based on user's current step
        const userStep = userData.step || 1;
        console.log(
          `User step: ${userStep}, isNewUser: ${isNewUser}, plan: ${userPlan}`,
        );

        if (isNewUser) {
          // New user - use the handleNavigation function for consistent routing
          console.log("New user detected, using handleNavigation function");
          handleNavigation(userStep, userPlan);
        } else {
          // Existing user - navigate based on their step
          console.log("Existing user, navigating based on step");
          handleNavigation(userStep, userPlan);
        }
      }
    } catch (error) {
      console.error("Google Sign-Up Error:", error);
      showToast("An unexpected error occurred during Google signup.", "error");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Sign-Up Failed:", error);
    showToast("Google Sign-Up Failed. Please try again.", "error");
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex">
      {/* Purple decorative blob - left */}
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

      {/* Green decorative blob - bottom right */}
      <div className="absolute bottom-60 right-1/3 w-20 h-24 md:w-24 md:h-32 hidden lg:block">
        <svg
          width="233"
          height="231"
          viewBox="0 0 233 231"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M96.5614 14.7026C102.582 -4.90097 130.332 -4.90097 136.353 14.7026C140.408 27.9079 155.967 33.5708 167.562 26.0617C184.774 14.9144 206.033 32.7521 198.044 51.639C192.662 64.3617 200.941 78.7007 214.65 80.4015C235.001 82.9262 239.819 110.255 221.559 119.588C209.259 125.875 206.384 142.181 215.792 152.296C229.759 167.311 215.884 191.344 195.896 186.756C182.433 183.665 169.749 194.308 170.455 208.104C171.502 228.584 145.425 238.076 133.063 221.713C124.736 210.691 108.178 210.691 99.851 221.713C87.489 238.076 61.412 228.584 62.4595 208.104C63.1652 194.308 50.4815 183.665 37.0177 186.756C17.0304 191.344 3.15508 167.311 17.1221 152.296C26.5305 142.181 23.6554 125.875 11.3549 119.588C-6.90542 110.255 -2.08659 82.9262 18.2645 80.4015C31.9735 78.7007 40.2521 64.3617 34.8705 51.639C26.8815 32.7521 48.1396 14.9144 65.3524 26.0617C76.9472 33.5708 92.506 27.9079 96.5614 14.7026Z"
            fill="#3D8753"
          />
        </svg>
      </div>

      <div className="w-full lg:w-2/3 flex flex-col px-6 sm:px-12 md:px-16 lg:px-20 py-8 relative z-10">
        {/* Logo */}
        <div className="mb-12 lg:mb-16">
          <RouterLink to="/">
            <img
              src={Logo}
              alt="Dimipified Logo"
              className="h-6 w-auto object-contain"
            />
          </RouterLink>
        </div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-10">
              Create a Free Dimpified Business Account.
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Kindly choose a sign-up option
            </p>
          </div>

          {/* Auth Buttons */}
          <div className="space-y-4">
            {/* Google Sign Up */}
            <div className="w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                useOneTap={false}
                shape="rectangular"
                size="large"
                width="100%"
                text="signup_with"
                theme="outline"
                logo_alignment="center"
                locale="en"
                context="signup"
                ux_mode="popup"
                render={(renderProps) => (
                  <button
                    type="button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled || isLoading}
                    className="relative w-full h-14 px-6 bg-white border border-gray-300 rounded-xl flex items-center justify-center gap-3 font-medium text-gray-700 text-sm hover:border-gray-400 hover:shadow-lg hover:text-gray-900 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                  >
                    {/* Background shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                    {/* Google logo */}
                    <div className="relative z-10">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform group-hover:rotate-12 duration-300"
                      >
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
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
                    </div>

                    {/* Text */}
                    <span className="relative z-10">
                      {isLoading
                        ? "Creating Account..."
                        : "Continue with Google"}
                    </span>

                    {/* Hover arrow */}
                    <svg
                      className="relative z-10 w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                )}
              />
            </div>

            {/* Email Sign Up - Wrapped with RouterLink */}
            <RouterLink to="/free/auth/personal-information" className="block">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 sm:py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 border border-purple-600 hover:shadow-lg active:scale-[0.98] group">
                <Mail className="w-5 h-5" />
                <span className="text-sm sm:text-base">Sign Up with Email</span>
                <svg
                  className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </RouterLink>
          </div>

          {/* Already have an account? */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <RouterLink
                to="/auth/login"
                className="text-purple-600 font-medium hover:text-purple-700 hover:underline transition-colors duration-300"
              >
                Log in here
              </RouterLink>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-500 text-center">
            This site is protected by reCAPTCHA Google Privacy Policy and Terms
            of Service apply
          </p>
        </div>
      </div>

      {/* Right Image Section - Hidden on mobile and tablet */}
      <div className="hidden lg:block lg:w-1/3 relative">
        <img
          src={FreeOnboardingImage}
          alt="Hair styling professional at work"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
}
