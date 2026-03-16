import { Mail } from "lucide-react";
import FreeOnboardingImage from "../../../assets/FreeBooking/FreeAuthImage.png";
import Logo from "../../../assets/NewAuthImage/NewLogo.png";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { creatorLoginWithGoogle } from "../../../features/authentication";
import { showToast } from "../../../component/ShowToast";
import { setEcosystemDomain } from "../../../features/ecosystemDomain";
import { setEcosystemPlan } from "../../../features/ecosystemPlan";
import { setEcosystemStatus } from "../../../features/ecosystemStatus";
import axios from "axios";
import { useEffect } from "react";

export default function FreeOnboardingPreSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading } = useSelector((state) => state.auth);

  // Get refcode from URL if it exists
  const getRefCodeFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get("ref") || params.get("refcode") || null;
  };

  // Store refcode in session storage when component mounts
  useEffect(() => {
    const urlRefcode = getRefCodeFromURL();
    if (urlRefcode) {
      sessionStorage.setItem('signupRefcode', urlRefcode);
      console.log('✅ Refcode stored in session:', urlRefcode);
    } else {
      // Check if we have a refcode in session from previous step
      const sessionRefcode = sessionStorage.getItem('signupRefcode');
      if (sessionRefcode) {
        console.log('📝 Using refcode from session:', sessionRefcode);
      }
    }
  }, [location]);

  // Helper function to set auth headers
  const setAuthHeaders = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

  // Navigation function - same as in login page
  const handleNavigation = (step, plan) => {
    const isFreePlan = !plan || plan?.toLowerCase() === "free";
    console.log(`handleNavigation called: step=${step}, plan=${plan}, isFreePlan=${isFreePlan}`);

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
        console.log(`Default navigation for step ${step}: /free/auth/personal-information`);
        navigate("/free/auth/personal-information");
        break;
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("=== Google Signup Debug ===");
    
    const idToken = credentialResponse.credential;
    
    // Get refcode from URL or session storage
    const urlRefcode = getRefCodeFromURL();
    const sessionRefcode = sessionStorage.getItem('signupRefcode');
    const refcode = urlRefcode || sessionRefcode;
    
    console.log('🔍 Refcode debug:', {
      fromURL: urlRefcode,
      fromSession: sessionRefcode,
      used: refcode
    });

    if (!idToken) {
      console.error("No ID token received from Google");
      showToast("Google authentication failed: No ID token received", "error");
      return;
    }

    console.log("Sending ID token to backend for signup...");

    try {
      const resultAction = await dispatch(
        creatorLoginWithGoogle({
          token: idToken,
          refcode: refcode,
        })
      );

      if (creatorLoginWithGoogle.rejected.match(resultAction)) {
        const errorPayload = resultAction.payload;
        const errorMessage = errorPayload?.message || errorPayload || "Google signup failed";

        console.error("Google signup rejected:", errorMessage);

        if (errorMessage.includes("timeout") || errorMessage.includes("cannot connect")) {
          showToast("Connection issue. Please try again or use email signup.", "error");
          return;
        }

        if (errorMessage.includes("Wrong number of segments") || 
            errorMessage.includes("Invalid token") || 
            errorMessage.includes("JWT")) {
          showToast("Google authentication failed: Invalid token format", "error");
          return;
        }

        if (errorMessage.toLowerCase().includes("already exists") ||
            errorMessage.toLowerCase().includes("user exists") ||
            errorMessage.toLowerCase().includes("account exists") ||
            errorMessage.toLowerCase().includes("not found")) {
          showToast("Account already exists. Please login instead.", "error");

          localStorage.setItem("googleCredential", idToken);
          localStorage.setItem("googleIdToken", idToken);
          sessionStorage.setItem("googleIdToken", idToken);

          localStorage.setItem("googleUserData", JSON.stringify({
            token: idToken,
            timestamp: new Date().toISOString(),
          }));

          // Preserve refcode when navigating to login
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

        if (!responseData) {
          showToast("Invalid response from server", "error");
          return;
        }

        const accessToken = responseData.accessToken || responseData.token;
        const refreshToken = responseData.refreshToken;

        if (accessToken) {
          console.log("Storing access token...");
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("jwtToken", accessToken);

          console.log("Storing Google ID token for future API calls...");
          localStorage.setItem("googleIdToken", idToken);
          localStorage.setItem("googleCredential", idToken);
          sessionStorage.setItem("googleIdToken", idToken);

          setAuthHeaders(accessToken);
        }

        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }

        if (responseData.user?.id) {
          localStorage.setItem("userId", responseData.user.id.toString());
        }

        const isNewUser = responseData.isNewUser || responseData.isNewUser === true;
        const userData = responseData.user || responseData;
        const message = responseData.message ||
          (isNewUser ? "Welcome! Account created successfully." : "Welcome back!");

        showToast(message, "success");

        if (userData.ecosystemDomain) {
          dispatch(setEcosystemDomain(userData.ecosystemDomain));
        }

        const userPlan = userData.plan || "free";
        dispatch(setEcosystemPlan(userPlan));

        if (userData.status) {
          dispatch(setEcosystemStatus(userData.status));
        }

        if (userData.subCategory) {
          sessionStorage.setItem("subCategory", userData.subCategory);
        }

        // Clear refcode from session after successful signup
        sessionStorage.removeItem('signupRefcode');

        console.log("=== TOKEN STORAGE VERIFICATION ===");
        console.log("googleIdToken stored:", localStorage.getItem("googleIdToken") ? "✅" : "❌");

        const userStep = userData.step || 1;
        console.log(`User step: ${userStep}, isNewUser: ${isNewUser}, plan: ${userPlan}`);

        handleNavigation(userStep, userPlan);
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

  // Get refcode for the email signup link
  const refcode = getRefCodeFromURL() || sessionStorage.getItem('signupRefcode');
  const emailSignupLink = `/free/auth/personal-information${refcode ? `?ref=${refcode}` : ''}`;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex">
      {/* ... (keep all your existing SVG and background elements) ... */}

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
            {/* {refcode && (
              <p className="text-sm text-green-600 mb-4">
                ✓ Referral code applied: {refcode}
              </p>
            )} */}
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

            {/* Email Sign Up - With refcode */}
            <RouterLink to={emailSignupLink} className="block">
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

          {/* Already have an account? - Preserve refcode */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <RouterLink
                to={`/auth/login${refcode ? `?ref=${refcode}` : ''}`}
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