import axios from "axios";
import { updateAccessToken } from "../features/authentication";
import AxiosInterceptor from "../component/AxiosInterceptor";

// Define your API endpoints
const API_URL = `${import.meta.env.VITE_API_URL}/creator`;
const PLAIN_API_URL = `${import.meta.env.VITE_API_URL}`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Helper function to update headers
export const setAuthHeader = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Clear auth header
export const clearAuthHeader = () => {
  delete apiClient.defaults.headers.common['Authorization'];
  delete axios.defaults.headers.common['Authorization'];
};

const GoogleSignUp = async ({ token, refcode = null }) => {
  try {
    console.log("Sending Google auth request with payload:", { token, refcode });
    
     let processedRefcode = refcode;
    
    // If refcode is "null" string, treat it as empty
    if (processedRefcode === "null" || processedRefcode === null) {
      processedRefcode = "";
    }
    
    const payload = {
      token: token,
     refCode: refcode
    };
    
    const response = await apiClient.post(`${API_URL}/google-auth`, payload, {
      timeout: 15000,
    });
    
    console.log("Google auth response:", response.data);
    return response;
  } catch (error) {
    console.error("Google auth API error:", error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error("Connection timeout. Please try again.");
    } else if (error.response) {
      const errorData = error.response.data;
      console.error("Server error response:", errorData);
      throw new Error(
        errorData?.message || 
        errorData?.error || 
        "Google authentication failed"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("Cannot connect to server. Please check your connection.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Registration API call
const creatorRegister = async ({
  fullName,
  email,
  password,
  phoneNumber,
  gender,
  dateOfBirth,
  role,
  refCode,
  organizationName,
}) => {
  try {
    const response = await apiClient.post(`${API_URL}/signup`, {
      fullName,
      email,
      password,
      phoneNumber,
      gender,
      dateOfBirth,
      role,
      refCode,
      organizationName,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

const newCreatorRegister = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  acceptTerms,
  acceptMarketing,
  refCode,
}) => {
  try {
    const response = await axios.post(`${API_URL}/new/signup`, {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      acceptTerms,
      acceptMarketing,
      refCode,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || " New Registration failed"
    );
  }
};

const creatorVerifyToken = async ({ email, OTP }) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, {
      email,
      OTP,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

const creatorResendVerifyToken = async ({ email, phoneNumber }) => {
  try {
    const response = await axios.post(`${API_URL}/resend-otp`, {
      email,
      phoneNumber,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

const creatorLogin = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/sign-in`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

//affiliateLogin
const affiliateLogin = async ({ email, password }) => {
  try {
    const response = await axios.post(`${PLAIN_API_URL}/affiliate/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "SignIn failed");
  }
};

const emailLogin = async ({ email }) => {
  try {
    const response = await axios.get(
      `${PLAIN_API_URL}/gfa-creator-login/${email}`,
      {}
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

const creatorForgetPassword = async ({ email }) => {
  try {
    const response = await axios.post(`${API_URL}/forgot/password`, {
      email,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

const creatorResetPassword = async ({ email, password }) => {
  try {
    const response = await axios.patch(`${API_URL}/reset/password`, {
      email,
      password,
    });
    console.log("response for reset", response);
    return response;
  } catch (error) {
    console.log("error for reset", error.response);
    throw new Error(
      error.response?.data?.data?.message || "Password reset failed"
    );
  }
};

const creatorResetPasswordOtp = async ({ email, OTP }) => {
  try {
    const response = await axios.post(`${API_URL}/verify-reset-otp`, {
      email,
      OTP,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password reset failed");
  }
};

const teamMemberOnboarding = async ({
  email,
  dateOfBirth,
  state,
  localGovernment,
  address,
  password,
  country,
}) => {
  try {
    const response = await axios.post(`${PLAIN_API_URL}/onboard-team-member`, {
      email,
      dateOfBirth,
      state,
      localGovernment,
      address,
      password,
      country,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password reset failed");
  }
};

export const refreshAccessToken = async (refreshToken, dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/refresh-token`, {
      creatorToken: refreshToken,
    });
    const { accessToken } = response.data;

    console.log("this is the new access token", accessToken);

    if (accessToken) {
      console.log("this is here 12");
      dispatch(updateAccessToken(accessToken));
      console.log("this is here 13");
      return accessToken;
    }
  } catch (error) {
    console.error("Failed to refresh token", error);
  }
  return null;
};

const CreatorSelectBusinessType = async ({
  creatorId,
  category,
  subCategory,
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/new/select-business-category`,
      {
        creatorId,
        category,
        subCategory,
      }
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Select Business Type failed"
    );
  }
};
export const createBusinessIdentity = async ({
  creatorId,
  businessAddress,
  businessName,
  websiteAddress,
  description,
  category,
  timezone,
  week,
  dispatch,
  navigate
}) => {
  // Create axios instance with interceptors
  const authFetch = AxiosInterceptor(dispatch, navigate);
  
  try {
    const response = await authFetch.post(
      `${import.meta.env.VITE_API_URL}/creator/create-business-identity`,
      {
        creatorId,
        businessName,
        websiteAddress,
        businessAddress,
        description,
        category,
        timezone,
        week,
      }
    );

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to create business identity";

    throw new Error(message);
  }
};
export default {
  newCreatorRegister,
  CreatorSelectBusinessType,
  GoogleSignUp,
  creatorRegister,
  creatorVerifyToken,
  creatorLogin,
  affiliateLogin,
  // creatorLogin,
  creatorResendVerifyToken,
  creatorForgetPassword,
  creatorResetPassword,
  emailLogin,
  creatorResetPasswordOtp,
  refreshAccessToken,
  teamMemberOnboarding,
  createBusinessIdentity,
};
