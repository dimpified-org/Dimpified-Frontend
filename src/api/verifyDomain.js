import axios from "axios";
import AxiosInterceptor from "../component/AxiosInterceptor";

// Define your API endpoints
const API_URL = `${import.meta.env.VITE_API_URL}`;

const creatorVerifyDomain = async ({
  domainName,
  accessToken,
  refreshToken,
  businesstype,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(`${API_URL}/check-domain`, {
      domainName,
      businesstype,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "domain name Verification failed",
    );
  }
};

export default {
  creatorVerifyDomain,
};
