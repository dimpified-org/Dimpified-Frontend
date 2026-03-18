import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MinimalistTemplate from "./MinimalistTemplate";

const PaidBookingPage = () => {
  const { subdomain } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subdomain) return;

    const controller = new AbortController();

    const fetchEcosystem = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-ecosystem-by-domain/${subdomain}`,
          { signal: controller.signal }
        );
        setUserDetails(response.data.getEcosystem || response.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching ecosystem:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEcosystem();
    return () => controller.abort();
  }, [subdomain]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <MinimalistTemplate subdomain={subdomain} userDetails={userDetails} />
  );
};

export default PaidBookingPage;
