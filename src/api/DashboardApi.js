import AxiosInterceptor from "../component/AxiosInterceptor";
import axios from "axios";

// Define your API endpoints

const PLAIN_API_URL = `${import.meta.env.VITE_API_URL}`;

const creatorBookingDate = async ({
  ecosystemDomain,
  date,
  accessToken,
  refreshToken,
  creatorId,
  userType,
  // navigate,
  // dispatch
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/bookings-per-date`,
      {
        ecosystemDomain,
        date,
        creatorId,
        userType,
      },
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/creator/signin");
    } else {
      throw new Error(
        error.response?.data?.message || "Error getting Booking Date",
      );
    }
  }
};

const creatorEarning = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate,
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/ecosystem-earnings/${ecosystemDomain}`,
      {},
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/creator/signin");
    } else {
      throw new Error(
        error.response?.data?.message || "Error creating service",
      );
    }
  }
};

const creatorMonthlyBooking = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  userType,
  creatorId,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate,
  );
  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/booking-stats`, {
      ecosystemDomain,
      creatorId,
      userType,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/creator/signin");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching monthly booking",
      );
    }
  }
};

const creatorMonthlyIncome = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate,
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/income-stats/${ecosystemDomain}`,
      {},
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/creator/signin");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching Monthly Income",
      );
    }
  }
};

const creatorBookingActivities = async ({
  ecosystemDomain,
  creatorId,
  userType,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate,
  );
  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/booking-overview`, {
      ecosystemDomain,
      creatorId,
      userType,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching Booking Activities",
      );
    }
  }
};

const creatorWithdrawHistory = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate,
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/get-withdrawal-requests/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching Withdraw History ",
      );
    }
  }
};

const creatorTransactionHistory = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate,
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/transaction-history/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching transaction History ",
      );
    }
  }
};

const creatorTodaySales = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate,
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/daily-successful/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching daily successful transactions",
      );
    }
  }
};

const creatorPaymentCharts = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate,
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/total-monthly-sales/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching daily successful transactions",
      );
    }
  }
};

const creatorEcosystemServices = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate,
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/get-all-services/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching daily successful transactions",
      );
    }
  }
};

const creatorAllBanks = async ({ accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(`${PLAIN_API_URL}/get-all-banks`);
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(error.response?.data?.message || "Error  All banks");
    }
  }
};

const creatorVerifyAccount = async ({
  accessToken,
  refreshToken,
  account,
  bankCode,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/verify-bank-details`,
      {
        account,
        bankCode,
      },
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error verifying Account Number",
      );
    }
  }
};

const creatorAddAccount = async ({
  accessToken,
  refreshToken,
  creatorId,
  accountName,
  accountNumber,
  bankName,
  currency,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/save-bank-details`,
      {
        creatorId,
        accountName,
        accountNumber,
        bankName,
        currency,
        ecosystemDomain,
      },
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error verifying Account Number",
      );
    }
  }
};

const creatorAllBankDetails = async ({
  accessToken,
  refreshToken,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/bank-details/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(error.response?.data?.message || "Error  All banks");
    }
  }
};

const creatorWithDraw = async ({
  accessToken,
  refreshToken,
  creatorId,
  accountId,
  amount,
  currency,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/withdrawal-request`,
      {
        creatorId,
        accountId,
        amount,
        currency,
        ecosystemDomain,
      },
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Withdrawing Earning",
      );
    }
  }
};

const creatorEditService = async ({
  accessToken,
  refreshToken,
  serviceId,
  name,
  shortDescription,
  price,
  deliveryTime,
  priceFormat,
  serviceImage,
  subServiceId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.put(`${PLAIN_API_URL}/edit-service`, {
      serviceId,
      name,
      shortDescription,
      price,
      deliveryTime,
      priceFormat,
      serviceImage,
      subServiceId,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Withdrawing Earning",
      );
    }
  }
};

const creatorUpdateProfile = async ({
  accessToken,
  refreshToken,
  fullname,
  dateOfBirth,
  gender,
  phoneNumber,
  localGovernment,
  state,
  country,
  creatorId,
  email,
  businessName,
  websiteName,
  category,
  subcategory,
  description,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.patch(
      `${PLAIN_API_URL}/creator/edit-profile`,
      {
        fullname,
        dateOfBirth,
        gender,
        phoneNumber,
        localGovernment,
        state,
        country,
        creatorId,
        email,
        businessName,
        websiteName,
        category,
        subcategory,
        description,
      },
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Updating Profile",
      );
    }
  }
};

const TeamMemberUpdateProfile = async ({
  accessToken,
  refreshToken,
  fullName,
  dateOfBirth,
  gender,
  phoneNumber,
  localGovernment,
  state,
  creatorId,
  address,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.patch(
      `${PLAIN_API_URL}/edit-team-member-profile`,
      {
        fullName,
        dateOfBirth,
        gender,
        phoneNumber,
        localGovernment,
        state,
        creatorId,
        address,
      },
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Updating Team Member Profile",
      );
    }
  }
};

const creatorSupportRequest = async ({
  accessToken,
  refreshToken,
  reason,
  message,
  creatorId,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/creator-support`, {
      reason,
      message,
      creatorId,
      ecosystemDomain,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Posting Support Request",
      );
    }
  }
};

const creatorAllTimeBooking = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/monthly-booking-stats/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching all time booking ",
      );
    }
  }
};

const creatorProfile = async ({ creatorId, accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/creator/profile/${creatorId}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching creator profile ",
      );
    }
  }
};

const TeamMemberProfile = async ({ creatorId, accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/team-member-profile/${creatorId}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching team Member profile ",
      );
    }
  }
};

const creatorSupportBlock = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/support-request-by-a-creator/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching creator profile ",
      );
    }
  }
};

const creatorSupportTable = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/all-creator-support-requests/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching creator profile",
      );
    }
  }
};

const creatorUpdateProfileImage = async ({
  accessToken,
  refreshToken,
  userType,
  creatorId,
  image,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  const formData = new FormData();
  formData.append("image", image);
  formData.append("creatorId", creatorId);
  formData.append("userType", userType);

  try {
    const response = await authFetch.patch(
      `${PLAIN_API_URL}/creator/update-profile-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Updating Profile Image",
      );
    }
  }
};

const creatorWebsiteDetails = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/website-details/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching website details",
      );
    }
  }
};

const creatorNotification = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/notifications/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching notification",
      );
    }
  }
};

const creatorMarkAsReadNotification = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  notificationId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.put(
      `${PLAIN_API_URL}/marked-as-read/${ecosystemDomain}/${notificationId}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error marking as read notification",
      );
    }
  }
};

const creatorAddCustomer = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  fullName,
  phoneNumber,
  email,
  gender,
  address,
  dob,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/add-customer`, {
      ecosystemDomain,
      fullName,
      phoneNumber,
      email,
      gender,
      address,
      dob,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Adding Customers",
      );
    }
  }
};

const creatorEditCustomer = async ({
  id,
  accessToken,
  refreshToken,
  fullName,
  phoneNumber,
  email,
  gender,
  address,
  dob,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.patch(`${PLAIN_API_URL}/update-customer`, {
      id,
      fullName,
      phoneNumber,
      email,
      gender,
      address,
      dob,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Updating Customers Profile",
      );
    }
  }
};

const creatorGetAllCustomer = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/customers/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching Customers",
      );
    }
  }
};

const creatorGetACustomer = async ({ id, accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/customer-details/${id}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching a Customers",
      );
    }
  }
};

const creatorGetACustomerAppointment = async ({
  email,
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/get-appointments/${email}/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching a Customers Appointment",
      );
    }
  }
};

const creatorDeleteCustomer = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  ids,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.delete(
      `${PLAIN_API_URL}/delete-customer`,
      {
        params: {
          ecosystemDomain,
          ids: ids.join(","), // Convert array to a comma-separated string if needed
        },
      },
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error deleting Customers",
      );
    }
  }
};

const creatorSupportMetrics = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/support-box/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching Support Metrics",
      );
    }
  }
};

const creatorGetAllSupport = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/support-tickets/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching all Support",
      );
    }
  }
};
const creatorGetASupport = async ({ ticketId, accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/support-ticket/${ticketId}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching a Support",
      );
    }
  }
};
const creatorEcosystemSwitchOnOff = async ({
  ecosystemDomain,
  creatorId,
  status,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.put(
      `${PLAIN_API_URL}/update-ecosystem-status`,
      {
        creatorId,
        ecosystemDomain,
        status,
      },
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Switching Ecosystem On or Off",
      );
    }
  }
};
const creatorMarkBooking = async ({ bookingId, accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.patch(
      `${PLAIN_API_URL}/complete-booking/${bookingId}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Switching Ecosystem On or Off",
      );
    }
  }
};

const creatorReplySupport = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  ticketId,
  replyMessage,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/reply-ticket`, {
      ecosystemDomain,
      ticketId,
      replyMessage,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Replying Support Ticket",
      );
    }
  }
};

const editProfileAutoLogin = async ({ email, token }) => {
  try {
    const response = await axios.post(`${PLAIN_API_URL}/creator/auto-login`, {
      email,
      token,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

const creatorAddTeamMember = async ({
  accessToken,
  refreshToken,
  fullName,
  gender,
  phoneNumber,
  email,
  services,
  ecosystemDomain,
  creatorId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/add-team-member`, {
      fullName,
      gender,
      phoneNumber,
      email,
      services,
      ecosystemDomain,
      creatorId,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Adding Team Member",
      );
    }
  }
};
const creatorGetAddedTeamMember = async ({
  accessToken,
  refreshToken,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/get-team-members/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Getting Team Members",
      );
    }
  }
};

const creatorDeleteTeamMember = async ({
  ids, // Array of IDs
  accessToken,
  refreshToken,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.patch(
      `${PLAIN_API_URL}/delete-team-member`, // No trailing slash
      null, // No request body needed
      {
        params: {
          ecosystemDomain,
          ids, // Axios automatically serializes arrays as `?ids=1&ids=2`
        },
        paramsSerializer: (params) => {
          return new URLSearchParams(params).toString();
        },
      },
    );

    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error deleting team members",
      );
    }
  }
};

const creatorGetTeamProfile = async ({
  creatorId,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/team-member-profile/${creatorId}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching a Teams profile",
      );
    }
  }
};

const creatorEditTeamMemberServices = async ({
  accessToken,
  refreshToken,
  services,
  ecosystemDomain,
  teamMemberId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.put(
      `${PLAIN_API_URL}/edit-team-member-services`,
      {
        services,
        ecosystemDomain,
        teamMemberId,
      },
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Editing Team Member Services",
      );
    }
  }
};

const creatorGetBusinessHours = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/get-businessHours/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching a Business Hours",
      );
    }
  }
};

const creatorEditBusinessHours = async ({
  creatorId,
  ecosystemDomain,
  week,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.put(`${PLAIN_API_URL}/edit-businessHour`, {
      creatorId,
      ecosystemDomain,
      week,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Editing Business Hours",
      );
    }
  }
};

const creatorGetFreeOverviewMetrics = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/free-plan-overview/${ecosystemDomain}`,
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching a Free plan overview",
      );
    }
  }
};

export default {
  creatorBookingDate,
  creatorEarning,
  creatorBookingActivities,
  creatorMonthlyBooking,
  creatorMonthlyIncome,
  creatorWithdrawHistory,
  creatorTransactionHistory,
  creatorTodaySales,
  creatorPaymentCharts,
  creatorAllBanks,
  creatorVerifyAccount,
  creatorAddAccount,
  creatorAllBankDetails,
  creatorWithDraw,
  creatorEcosystemServices,
  creatorEditService,
  creatorAllTimeBooking,
  creatorProfile,
  creatorUpdateProfile,
  creatorSupportRequest,
  creatorSupportBlock,
  creatorSupportTable,
  creatorUpdateProfileImage,
  creatorWebsiteDetails,
  creatorNotification,
  creatorMarkAsReadNotification,
  creatorAddCustomer,
  creatorGetAllCustomer,
  creatorDeleteCustomer,
  creatorGetACustomer,
  creatorEditCustomer,
  creatorGetACustomerAppointment,
  creatorSupportMetrics,
  creatorGetAllSupport,
  creatorGetASupport,
  creatorEcosystemSwitchOnOff,
  creatorMarkBooking,
  creatorReplySupport,
  editProfileAutoLogin,
  creatorAddTeamMember,
  creatorGetAddedTeamMember,
  creatorDeleteTeamMember,
  creatorGetTeamProfile,
  creatorEditTeamMemberServices,
  TeamMemberProfile,
  TeamMemberUpdateProfile,
  creatorGetBusinessHours,
  creatorEditBusinessHours,
  creatorGetFreeOverviewMetrics,
};
