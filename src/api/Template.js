import axios from "axios";
import AxiosInterceptor from "../component/AxiosInterceptor";

// Define your API endpoints
const API_URL = `${import.meta.env.VITE_API_URL}`;

const getTemplateDetails = async ({ templateId}) => {
 
  try {
    const response = await axios.get(
      `${API_URL}/reserved-template/${templateId}`
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Could not get Template Details"
    );
  }
};

// get business info
const getBusinessInfo = async ({ creatorId }) => {
  
  try {
    const response = await axios.get(
      `${API_URL}/get-business-info/${creatorId}`
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Could not get business Details"
    );
  }
};

const createTemplate = async ({
  creatorId,
  ecosystemDomain,
  templateId,
  navbar,
  hero,
  aboutUs,
  Vision,
  Statistics,
  Patrners,
  Events,
  Gallery,
  LargeCta,
  Team,
  Blog,
  Reviews,
  contactUs,
  faq,
  faqStyles,
  footer,
  accessToken,
  refreshToken
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(`${API_URL}/create-template`, {
      creatorId,
      ecosystemDomain,
      templateId,
      navbar,
      hero,
      aboutUs,
      Vision,
      Statistics,
      Patrners,
      Events,
      Gallery,
      LargeCta,
      Team,
      Blog,
      Reviews,
      contactUs,
      faq,
      faqStyles,
      footer,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Could not create Business site"
    );
  }
};

const editTemplate = async ({
  navbar,
  hero,
  aboutUs,
  Vision,
  Statistics,
  Patrners,
  Events,
  Gallery,
  LargeCta,
  Team,
  Blog,
  Reviews,
  contactUs,
  faq,
  faqStyles,
  footer,
  accessToken,
  refreshToken,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.put(
      `${API_URL}/creator-edit-template/${ecosystemDomain}`,
      {
        navbar,
        hero,
        aboutUs,
        Vision,
        Statistics,
        Patrners,
        Events,
        Gallery,
        LargeCta,
        Team,
        Blog,
        Reviews,
        contactUs,
        faq,
        faqStyles,
        footer,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating template");
  }
};

const userContactForm = async ({
  email,
  reason,
  message,
  name,
  phoneNumber,
  ecosystemDomain,
}) => {
  try {
    const response = await axios.post(`${API_URL}/create/support-ticket`, {
      email,
      reason,
      message,
      name,
      phoneNumber,
      ecosystemDomain,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error posting support Tickets");
  }
};

const createEcosystemTemplate = async ({
  creatorId,
  ecosystemDomain,
  templateNumber,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(
      `${API_URL}/creator/create-ecosystem-template`,
      {
        creatorId,
        ecosystemDomain,
        templateNumber,
      }
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Could not create ecosystem template"
    );
  }
};

export default {
  getTemplateDetails,
  getBusinessInfo,
  createTemplate,
  createEcosystemTemplate,
  editTemplate,
  userContactForm
};
